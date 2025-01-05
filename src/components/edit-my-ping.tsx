"use client";
import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, Card } from "@/components/ui/card";
import { useSession } from 'next-auth/react';

const campusCoordinates: { [key: string]: { lat: number; lng: number } } = {
  "Busch Campus": { lat: 40.5236, lng: -74.4581 },
  "College Avenue Campus": { lat: 40.5004, lng: -74.4474 },
  "Livingston Campus": { lat: 40.5226, lng: -74.4371 },
  "Cook/Douglass Campus": { lat: 40.4815, lng: -74.4328 },
};


const defaultZoom = 15;

function LocationPicker({ onLocationSelect }: { onLocationSelect: (latlng: { lat: number, lng: number }) => void }) {
  return (
    <GoogleMap
      onClick={(e) => {
        if (e.latLng) {
          onLocationSelect({ lat: e.latLng.lat(), lng: e.latLng.lng() });
        }
      }}
      center={{ lat: 40.5236, lng: -74.4581 }} // Default to Busch Campus
      zoom={15}
      mapContainerStyle={{ width: '100%', height: '100%' }}
    >
      {/* Optionally, add a marker for the selected location */}
    </GoogleMap>
  );
}


function formatTime(timeString: string) {
  const [hours, minutes] = timeString.split(':');
  const period = +hours >= 12 ? 'PM' : 'AM';
  const formattedHours = +hours % 12 || 12;
  return `${formattedHours}:${minutes} ${period}`;
}

export default function EditMyPing() {
  const searchParams = useSearchParams();
  const pingId = searchParams.get('id');
  const { data: session } = useSession();
  const router = useRouter();
  const [formData, setFormData] = useState({
    campusLocation: '',
    specificLocation: '',
    description: '',
    time: '',
    date: '',
    durationHours: '',
    durationMinutes: '',
    happeningNow: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showTimeDateInputs, setShowTimeDateInputs] = useState(true);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>(campusCoordinates["Busch Campus"]);
  const [error, setError] = useState('');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });
  
  useEffect(() => {
    async function fetchPing() {
      try {
        const response = await fetch(`/api/pings/${pingId}`, {
          headers: {
            'user-email': session.user.email,
          },
        });
        const data = await response.json();
        if (response.ok) {
          const { campusLocation, specificLocation, description, time, date, duration } = data;
          const durationHours = Math.floor(duration / 60).toString();
          const durationMinutes = (duration % 60).toString();
          setFormData({
            campusLocation,
            specificLocation,
            description,
            time,
            date,
            durationHours,
            durationMinutes,
            happeningNow: false,
          });
          setMapCenter(campusCoordinates[campusLocation]);
        } else {
          throw new Error('Failed to fetch ping data');
        }
      } catch (error) {
        console.error('Error fetching ping data:', error);
      }
    }
    fetchPing();
  }, [pingId, session]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = event.target;

    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (event.target as HTMLInputElement).checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    if (name === 'campusLocation') {
      setMapCenter(campusCoordinates[value as keyof typeof campusCoordinates]);
    }
  };

  const handleHappeningNowChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    const now = new Date();
    const formattedTime = now.toTimeString().split(' ')[0].slice(0, 5); // 'HH:MM' format
    const formattedDate = now.toISOString().split('T')[0]; // 'YYYY-MM-DD' format
    setFormData({
      ...formData,
      happeningNow: checked,
      time: checked ? formattedTime : '',
      date: checked ? formattedDate : ''
    });
    setShowTimeDateInputs(!checked);
  };

  const handleLocationSelect = (latlng: { lat: number, lng: number }) => {
    setFormData({
      ...formData,
      specificLocation: `Latitude: ${latlng.lat}, Longitude: ${latlng.lng}`,
    });
    setMapCenter({ lat: latlng.lat, lng: latlng.lng });
    setShowMap(false);
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    const now = new Date();
    const selectedDate = new Date(`${formData.date}T${formData.time}`);
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    if (!formData.happeningNow && (selectedDate < now || selectedDate > threeMonthsLater)) {
      setError('Date and time must be between now and three months from now.');
      return;
    }

    if (!formData.date || !formData.time) {
      setError('Please select a valid date and time.');
      return;
    }

    try {
      const duration = (parseInt(formData.durationHours, 10) || 0) * 60 + (parseInt(formData.durationMinutes, 10) || 0);

      const response = await fetch(`/api/pings`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: pingId, userEmail: session?.user.email, ...formData, duration }),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    router.push("/intro");
  };

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-green-500">Success!</h3>
            <p>Your ping has been updated successfully.</p>
            <Button onClick={handleClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              OK
            </Button>
          </div>
        </div>
      )}

      {showMap && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <GoogleMap
            center={mapCenter}
            zoom={15}
            mapContainerStyle={{ height: '100%', width: '100%' }}
            onClick={(e) => handleLocationSelect({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
            mapTypeId="satellite" 
          >
            <Marker position={mapCenter} />
          </GoogleMap>
          <Button onClick={() => setShowMap(false)} className="absolute top-2 right-2 bg-red-500 text-white p-2">
            Close Map
          </Button>
        </div>
      )}

      <section className="bg-gray-50 py-10 md:py-15 lg:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-red-600">Edit Ping</h2>
              <p className="text-lg text-gray-600">
                Update your existing ping details.
              </p>
            </div>
            <Card className="bg-white shadow-xl rounded-xl">
              <CardContent className="p-6 md:p-10">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="campusLocation" className="block text-sm font-medium text-gray-700">Campus Location</Label>
                    <select name="campusLocation" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm rounded-md" value={formData.campusLocation} onChange={handleChange} required>
                      <option value="" disabled>Select a campus location</option>
                      <option value="Busch Campus">Busch Campus</option>
                      <option value="College Avenue Campus">College Avenue Campus</option>
                      <option value="Livingston Campus">Livingston Campus</option>
                      <option value="Cook/Douglass Campus">Cook/Douglass Campus</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="specificLocation" className="block text-sm font-medium text-gray-700">Specific Location</Label>
                    <div className="flex items-center space-x-2">
                      <Input
                        name="specificLocation"
                        className="flex-1 block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Enter a building or location"
                        value={formData.specificLocation}
                        onChange={handleChange}
                        required
                      />
                      <span className="text-gray-500">OR</span>
                      <button
                        type="button"
                        className="ml-2 p-1 border rounded text-gray-500 border-gray-300"
                        aria-label="Select location on map"
                        onClick={() => setShowMap(true)}
                      >
                        <MapIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</Label>
                    <Textarea name="description" className="mt-1 block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm" placeholder="Add a description of your activity" value={formData.description} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="durationHours" className="block text-sm font-medium text-gray-700">Duration</Label>
                    <div className="flex items-center space-x-2">
                      <Input name="durationHours" type="number" className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm" placeholder="Hours" value={formData.durationHours} onChange={handleChange} min="0" />
                      <span className="text-gray-500">hours</span>
                      <Input name="durationMinutes" type="number" className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm" placeholder="Minutes" value={formData.durationMinutes} onChange={handleChange} min="0" max="59" />
                      <span className="text-gray-500">minutes</span>
                    </div>
                  </div>
                  {showTimeDateInputs && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="time" className="block text-sm font-medium text-gray-700">Time</Label>
                        <Input name="time" type="time" className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm" value={formData.time} onChange={handleChange} required={!formData.happeningNow} />
                      </div>
                      <div>
                        <Label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</Label>
                        <Input name="date" type="date" className="mt-1 block w-full border-gray-300 focus:border-red-500 focus:ring-red-500 shadow-sm" value={formData.date} onChange={handleChange} required={!formData.happeningNow} />
                      </div>
                    </div>
                  )}
                  <div className="flex items-center">
                    <input type="checkbox" name="happeningNow" id="happeningNow" className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" checked={formData.happeningNow} onChange={handleHappeningNowChange} />
                    <Label htmlFor="happeningNow" className="ml-2 block text-sm text-gray-900">Happening Now</Label>
                  </div>
                  {error && <p className="text-red-500">{error}</p>}
                  <div className="flex justify-center">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update Ping</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}

function MapIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}
