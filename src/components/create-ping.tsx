"use client";
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CardContent, Card } from "@/components/ui/card";
import Link from "next/link";
import { redirect } from "next/navigation";

function LocationPicker({ onLocationSelect }) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    },
  });

  return null; // No visual component needed here, just the event handler
}

export default function CreatePing() {
  const [formData, setFormData] = useState({
    campusLocation: '',
    specificLocation: '',
    description: '',
    time: '',
    date: '',
    happeningNow: false,
  });
  const [showModal, setShowModal] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showTimeDateInputs, setShowTimeDateInputs] = useState(true);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleHappeningNowChange = (event) => {
    const checked = event.target.checked;
    setFormData({
      ...formData,
      happeningNow: checked,
      time: checked ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '',
      date: checked ? new Date().toISOString().split('T')[0] : ''
    });
    setShowTimeDateInputs(!checked);
  }; 

  const handleLocationSelect = (latlng) => {
    setFormData({
      ...formData,
      specificLocation: `Latitude: ${latlng.lat}, Longitude: ${latlng.lng}`
    });
    setShowMap(false); // Close the map after selection
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/pings', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.ok) {
        setShowModal(true);
      } else {
        throw new Error(data.message || 'Failed to submit form');
      }
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    window.location.replace("/intro")
  };

  return (
    <>
    {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg text-center">
            <h3 className="text-lg font-bold text-green-500">Success!</h3>
            <p>Your ping has been created successfully.</p>
            <Button onClick={handleClose} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              OK
            </Button>
          </div>
        </div>
      )}

      {showMap && (
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <MapContainer center={[40.522564, -74.458488]} zoom={15} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <LocationPicker onLocationSelect={handleLocationSelect} />
          </MapContainer>
          <Button onClick={() => setShowMap(false)} className="absolute top-2 right-2 bg-red-500 text-white p-2">
            Close Map
          </Button>
        </div>
      )}

      <section className="bg-gray-50 py-10 md:py-15 lg:py-18">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-3">
              <h2 className="text-4xl font-bold text-red-600">Create a Ping</h2>
              <p className="text-lg text-gray-600">
                Let your fellow Rutgers students know about your upcoming activity.
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
                    <div className="flex items-center">
                      <Input
                        name="specificLocation"
                        className="flex-1 block w-full rounded-md border-gray-300 focus:border-red-500 focus:ring-red-500 sm:text-sm"
                        placeholder="Enter a building or location"
                        value={formData.specificLocation}
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="ml-2 text-gray-500"
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
                  <div className="flex justify-center">
                    <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Create Ping</Button>
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

function MapIcon(props) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" />
      <path d="M15 5.764v15" />
      <path d="M9 3.236v15" />
    </svg>
  );
}
