import React from 'react';
import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  Calendar,
  MapPin,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: Users, label: 'Citizens' },
    { icon: FileText, label: 'Documents' },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Calendar, label: 'Events' },
    { icon: MapPin, label: 'Location Services' },
    { icon: Bell, label: 'Announcements' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col h-full`}>
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">AL</span>
            </div>
            {!isCollapsed && (
              <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-800">Alaminos</h2>
                <p className="text-xs text-gray-600">Municipality</p>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <a
                  href="#"
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    item.active
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && (
                    <span className="ml-3 font-medium">{item.label}</span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">AD</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-800">Admin</p>
              <p className="text-xs text-gray-600">Municipality Officer</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;