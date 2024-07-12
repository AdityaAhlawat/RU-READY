"use client";
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { Button } from "@/components/ui/button"; // Assuming this uses Tailwind classes

// Define the custom marker icon
const customMarkerIcon = new L.Icon({
  iconUrl: 'data:image/svg+xml;base64,' + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="red" viewBox="0 0 24 24">
      <path d="M12 2C8.14 2 5 5.14 5 9c0 1.1.22 2.16.61 3.13.92 2.16 2.63 4.26 5.34 6.7.39.35.9.35 1.29 0 2.71-2.44 4.42-4.54 5.34-6.7C18.78 11.16 19 10.1 19 9c0-3.86-3.14-7-7-7zm0 9.5C10.62 11.5 10 10.88 10 10s.62-1.5 1.5-1.5S13 9.12 13 10s-.62 1.5-1.5 1.5z"/>
    </svg>`),
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -24]
});

export default function DisplayMyAvailablePings() {
  const { data: session } = useSession();
  const router = useRouter();
  const [pings, setPings] = useState([]);

  useEffect(() => {
    if (session) {
      const fetchPings = async () => {
        try {
          const response = await fetch('/api/mypings', {
            headers: {
              'user-email': session.user.email,
            },
          });
          const data = await response.json();
          if (response.ok) {
            setPings(data);
          } else {
            throw new Error('Failed to fetch pings');
          }
        } catch (error) {
          console.error('Error fetching pings:', error);
        }
      };
      fetchPings();
    }
  }, [session]);

  const handleDelete = async (pingId) => {
    if (!confirm('Are you sure you want to delete this ping?')) return;

    try {
      const response = await fetch(`/api/pings`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: pingId,
          userEmail: session.user.email, // Include the user email in the request
        }),
      });
      if (response.ok) {
        setPings(pings.filter(ping => ping._id !== pingId));
      } else {
        throw new Error('Failed to delete ping');
      }
    } catch (error) {
      console.error('Error deleting ping:', error);
    }
  };

  const handleEdit = (pingId) => {
    router.push(`/editmyping?id=${pingId}`);
  };

  const mapStyle = { height: '150px', width: '100%' };

  const isValidLatLon = (location: string) => {
    const regex = /Latitude:\s*([-+]?\d*\.?\d+),\s*Longitude:\s*([-+]?\d*\.?\d+)/;
    return regex.test(location);
  };

  const getLatLon = (location: string): LatLngExpression | null => {
    const regex = /Latitude:\s*([-+]?\d*\.?\d+),\s*Longitude:\s*([-+]?\d*\.?\d+)/;
    const match = location.match(regex);
    return match ? [parseFloat(match[1]), parseFloat(match[2])] : null;
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const hoursStr = hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''}` : '';
    const minutesStr = remainingMinutes > 0 ? `${remainingMinutes} minute${remainingMinutes > 1 ? 's' : ''}` : '';
    return [hoursStr, minutesStr].filter(Boolean).join(' and ');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <main className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pings.map((ping) => (
            <div key={ping._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-red-500 text-white p-4 flex flex-col justify-between items-start">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-8 w-8" />
                  <div>
                    <h5 className="font-bold">{ping.campusLocation}</h5>
                    <p className="text-sm">{ping.description || 'No description'}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="text-gray-600">
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-1">
                      <MapIcon className="h-5 w-5" />
                      <span>
                        {isValidLatLon(ping.specificLocation) ? (
                          'Look at the map below for the specific location: '
                        ) : (
                          ping.specificLocation
                        )}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="flex items-center space-x-1">
                      <ClockIcon className="h-5 w-5" />
                      <span>{new Date(ping.date + 'T' + ping.time).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="flex items-center space-x-1">
                      <DurationIcon className="h-5 w-5" />
                      <span>{formatDuration(ping.duration)}</span>
                    </span>
                  </div>
                </div>
                {isValidLatLon(ping.specificLocation) && (
                  <div className="mt-4">
                    <MapContainer
                      center={getLatLon(ping.specificLocation) as LatLngExpression}
                      zoom={18}
                      scrollWheelZoom={false}
                      style={mapStyle}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={getLatLon(ping.specificLocation) as LatLngExpression} icon={customMarkerIcon}>
                        <Popup>{ping.specificLocation}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
                <Button
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded transition duration-300"
                  onClick={() => handleEdit(ping._id)}
                >
                  Edit Ping
                </Button>
                <Button
                  className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition duration-300"
                  onClick={() => handleDelete(ping._id)}
                >
                  Delete Ping
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Icons
function MapPinIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function ClockIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FrameIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" x2="2" y1="6" y2="6" />
      <line x1="22" x2="2" y1="18" y2="18" />
      <line x1="6" x2="6" y1="2" y2="22" />
      <line x1="18" x2="18" y1="2" y2="22" />
    </svg>
  );
}

function MapIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}

function DurationIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
