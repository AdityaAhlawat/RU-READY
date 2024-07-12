"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Ensure this import is correct

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

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours} hour(s) and ${remainingMinutes} minute(s)`;
}

export default function DisplayAvailablePings() {
  const [pings, setPings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [recommendedPings, setRecommendedPings] = useState([]);
  const [message, setMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [user, setUser] = useState(null); // Replace with actual user retrieval logic

  useEffect(() => {
    fetchUser();
    fetchPings();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user'); // Adjust the endpoint as needed
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const fetchPings = async () => {
    try {
      const response = await fetch('/api/pings');
      const data = await response.json();
      setPings(data);
    } catch (error) {
      console.error('Error fetching pings:', error);
      setMessage('Failed to fetch pings');
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    setMessage('');
    setAiResponse('');
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });
      const data = await response.json();
      if (data.recommendedPings && data.recommendedPings.length > 0) {
        setRecommendedPings(data.recommendedPings);
        setShowAll(false);
        setMessage('Recommendations loaded successfully');
      } else {
        setRecommendedPings([]);
        setShowAll(false);
        setMessage('No relevant events found');
      }
      setAiResponse(data.rawResponse);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setMessage('Failed to fetch recommendations');
    }
    setLoading(false);
  };

  const handleShowAll = () => {
    setShowAll(true);
    setRecommendedPings([]);
    setMessage('');
  };

  const isValidLatLon = (location: string) => {
    const regex = /Latitude:\s*([-+]?\d*\.?\d+),\s*Longitude:\s*([-+]?\d*\.?\d+)/;
    return regex.test(location);
  };

  const getLatLon = (location: string): LatLngExpression | null => {
    const regex = /Latitude:\s*([-+]?\d*\.?\d+),\s*Longitude:\s*([-+]?\d*\.?\d+)/;
    const match = location.match(regex);
    return match ? [parseFloat(match[1]), parseFloat(match[2])] : null;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <main className="flex-grow">
        <div className="flex items-center mb-4">
          <Input
            type="text"
            placeholder="Describe the events you like..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow mr-2"
            style={{ fontFamily: 'Monospace', color: 'red', backgroundColor: 'white', border: '1px solid red' }}
          />
          <Button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2">Search</Button>
        </div>

        <div className="flex justify-center mb-4">
          <Button onClick={handleShowAll} className="bg-red-500 text-white px-4 py-2">Show All</Button>
        </div>

        {message && <div className="mb-4 text-center text-red-500" style={{ fontFamily: 'Monospace', color: 'red' }}>{message}</div>}
        {loading && <LoadingSpinner />}
        {aiResponse && (
          <div className="mb-4 p-4 bg-gray-200 rounded-md" style={{ fontFamily: 'Monospace', color: 'red' }}>
            <h3 className="font-bold">AI Response:</h3>
            <p>{aiResponse}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(recommendedPings.length > 0 ? recommendedPings : (showAll ? pings : [])).map((ping) => (
            <div key={ping._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`bg-red-500 text-white p-4 flex flex-col justify-between items-start ${ping.user === user?.id ? 'bg-yellow-200 text-black' : 'bg-red-500 text-white'}`}>
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-8 w-8" />
                  <div>
                    <h5 className="font-bold">{ping.campusLocation}</h5>
                    <p className="text-sm">{ping.description || 'No description'}</p>
                    {ping.user === user?.id && <span className="text-xs bg-yellow-200 text-black px-2 py-1 rounded">Your Ping</span>}
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
                      style={{ height: '150px', width: '100%' }}
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

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 text-gray-600"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C6.58 0 2 4.58 2 10h2zm2 5.3l1.42 1.42A8.064 8.064 0 014 12H2c0 2.68 1.05 5.1 2.76 6.9z"
        ></path>
      </svg>
    </div>
  );
}
