import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Calendar, 
  Building,
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { MapContainer, TileLayer, Marker, Popup, Polygon } from "react-leaflet";
import { Icon } from "leaflet";

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import "leaflet/dist/leaflet.css";

// Custom landmark icon
const landmarkIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
  iconSize: [30, 30],
});

// ✅ Real Interactive Map Component (Leaflet)
const InteractiveMapComponent = () => {
  const [selectedBarangay, setSelectedBarangay] = useState(null);

  // Example barangay polygons (replace with real coordinates later)
  const barangays = [
    {
      id: 1,
      name: "Barangay Poblacion",
      population: 2500,
      area: 15.2,
      coords: [
        [14.0648, 121.252],
        [14.066, 121.256],
        [14.063, 121.258],
        [14.061, 121.253],
      ],
    },
    {
      id: 2,
      name: "Barangay San Antonio",
      population: 3200,
      area: 22.1,
      coords: [
        [14.06, 121.26],
        [14.062, 121.265],
        [14.058, 121.268],
        [14.056, 121.262],
      ],
    },
  ];

  // Example landmarks
  const landmarks = [
    { name: "Municipal Hall", position: [14.0645, 121.255] },
    { name: "Public Market", position: [14.063, 121.257] },
    { name: "Health Center", position: [14.065, 121.254] },
  ];

  return (
    <div className="w-full h-full">
      <MapContainer
        center={[14.0645, 121.255]} // Center at Alaminos, Laguna
        zoom={14}
        style={{ height: "100%", width: "100%", borderRadius: "12px" }}
      >
        {/* Base tiles */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Barangay polygons */}
        {barangays.map((brgy) => (
          <Polygon
            key={brgy.id}
            positions={brgy.coords}
            pathOptions={{
              color: selectedBarangay === brgy.id ? "green" : "blue",
              weight: 2,
              fillOpacity: 0.4,
            }}
            eventHandlers={{
              click: () => setSelectedBarangay(brgy.id),
            }}
          >
            <Popup>
              <h4>{brgy.name}</h4>
              <p>Population: {brgy.population.toLocaleString()}</p>
              <p>Area: {brgy.area} km²</p>
              <p>
                Density: {Math.round(brgy.population / brgy.area)} /km²
              </p>
            </Popup>
          </Polygon>
        ))}

        {/* Landmarks */}
        {landmarks.map((lm, index) => (
          <Marker key={index} position={lm.position} icon={landmarkIcon}>
            <Popup>{lm.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

const AdminLandingPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Sample data for charts
  const monthlyData = [
    { month: 'Jan', permits: 45, certificates: 78, complaints: 12 },
    { month: 'Feb', permits: 52, certificates: 85, complaints: 8 },
    { month: 'Mar', permits: 48, certificates: 92, complaints: 15 },
    { month: 'Apr', permits: 61, certificates: 87, complaints: 10 },
    { month: 'May', permits: 55, certificates: 94, complaints: 7 },
    { month: 'Jun', permits: 67, certificates: 89, complaints: 11 },
  ];

  const populationData = [
    { name: 'Barangay 1', value: 2500, color: '#16a34a' },
    { name: 'Barangay 2', value: 3200, color: '#22c55e' },
    { name: 'Barangay 3', value: 1800, color: '#4ade80' },
    { name: 'Barangay 4', value: 2900, color: '#86efac' },
    { name: 'Others', value: 4100, color: '#bbf7d0' },
  ];

  const stats = [
    {
      title: 'Total Citizens',
      value: '14,523',
      change: '+5.2%',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Pending Documents',
      value: '342',
      change: '-12%',
      icon: FileText,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Events',
      value: '28',
      change: '+8.1%',
      icon: Calendar,
      color: 'bg-purple-500'
    },
    {
      title: 'Service Requests',
      value: '156',
      change: '+15.3%',
      icon: Building,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-br from-green-600/80 via-green-600/75 to-green-700/80 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                      <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Monthly Activity Chart */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Activity</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="permits" fill="#16a34a" name="Permits" />
                  <Bar dataKey="certificates" fill="#22c55e" name="Certificates" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Population Distribution */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Population by Barangay</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={populationData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    dataKey="value"
                  >
                    {populationData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activities */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activities</h3>
              <div className="space-y-4">
                {[
                  { action: 'New permit application', user: 'Juan Dela Cruz', time: '2 hours ago' },
                  { action: 'Certificate issued', user: 'Maria Santos', time: '4 hours ago' },
                  { action: 'Event registration', user: 'Pedro Garcia', time: '6 hours ago' },
                  { action: 'Service request', user: 'Ana Lopez', time: '1 day ago' },
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3 py-2 border-b border-gray-100 last:border-b-0">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">{activity.action}</p>
                      <p className="text-xs text-gray-600">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Section */}
            <div className="lg:col-span-2 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-white/20">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Municipality Map - Interactive Areas</h3>
              <div className="h-80">
                <InteractiveMapComponent />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLandingPage;
