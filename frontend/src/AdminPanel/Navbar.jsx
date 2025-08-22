import React, { useState } from 'react';
import { Bell, Search, Mail, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import Logo from '../assets/alaminos-logos.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    // Clear tokens / session if needed
    localStorage.removeItem("authToken"); // example

    console.log("Logging out...");

    // Redirect to home ("/")
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Page Title */}
        <div className="flex items-center space-x-3">
          <img 
            src={Logo} 
            alt="Alaminos Logo" 
            className="w-10 h-10 object-contain"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Municipality of Alaminos</h1>
            <p className="text-sm text-gray-600">Administrative Dashboard</p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-64"
            />
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative pl-3 border-l border-gray-200">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-3 hover:bg-gray-50 rounded-lg p-2 transition-colors"
              >
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">Municipal Officer</p>
                </div>
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <hr className="my-2" />
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay to close dropdown when clicking outside */}
      {isProfileMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsProfileMenuOpen(false)}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;