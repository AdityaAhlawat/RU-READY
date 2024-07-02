"use client";
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Button } from "@/components/ui/button"; // Assuming this uses Tailwind classes

// Fix the default icon problems in React-Leaflet
// delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export default function DisplayAvailablePings() {
  const [pings, setPings] = useState([]);
  const [expandedPing, setExpandedPing] = useState(null);

  useEffect(() => {
    async function fetchPings() {
      try {
        const response = await fetch('/api/pings');
        const data = await response.json();
        if (response.ok) {
          setPings(data);
        } else {
          throw new Error('Failed to fetch pings');
        }
      } catch (error) {
        console.error('Error fetching pings:', error);
      }
    }
    fetchPings();
  }, []);

  const mapStyle = { height: '150px', width: '100%' };
  const expandedMapStyle = { height: '400px', width: '100%' };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4">
      <main className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {pings.map((ping) => (
            <div key={ping._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="bg-red-500 text-white p-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <MapPinIcon className="h-8 w-8" />
                  <div>
                    <h5 className="font-bold">{ping.campusLocation}</h5>
                    <p className="text-sm">{ping.description || 'No description'}</p>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="flex items-center space-x-1">
                    <MapIcon className="h-5 w-5" />
                    <span>{ping.specificLocation}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ClockIcon className="h-5 w-5" />
                    <span>{ping.time}</span>
                  </span>
                </div>
                {ping.latitude && ping.longitude && (
                  <div className="mt-4">
                    <MapContainer
                      center={[ping.latitude, ping.longitude]}
                      zoom={13}
                      scrollWheelZoom={false}
                      style={expandedPing === ping._id ? expandedMapStyle : mapStyle}
                      // onClick={() => setExpandedPing(expandedPing === ping._id ? null : ping._id)}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      />
                      <Marker position={[ping.latitude, ping.longitude]}>
                        <Popup>{ping.specificLocation}</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                )}
                <Button className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded transition duration-300">
                  Join
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

// Icons (These should be in a separate file ideally, but included here for completeness)
function ClockIcon(props : any) {
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

function FrameIcon(props : any) {
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

function MapIcon(props: any) {
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

function MapPinIcon(props : any) {
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

function SearchIcon(props : any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function UserIcon(props: any) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props : any) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
