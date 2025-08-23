import React, { useState } from 'react';
import { Bell, Search, Mail, User, LogOut, Settings, ChevronDown } from 'lucide-react';
import Logo from '../assets/alaminos-logos.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleLogout = () => {
    // Clear tokens / session if needed
    localStorage.removeItem("authToken"); // example

    console.log("Logging out...");

    // Redirect to home ("/")
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Page Title */}
        <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
          <img 
            src={Logo} 
            alt="Alaminos Logo" 
            className="w-8 h-8 sm:w-10 sm:h-10 object-contain flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">
              <span className="hidden sm:inline">Municipality of Alaminos</span>
              <span className="sm:hidden">Alaminos</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate hidden sm:block">
              Administrative Dashboard
            </p>
          </div>
        </div>

        {/* Search and Actions */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Bar - Desktop */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none w-48 lg:w-64"
            />
          </div>

          {/* Search Button - Mobile */}
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-lg hover:bg-gray-100 md:hidden"
          >
            <Search className="w-5 h-5 text-gray-600" />
          </button>

          {/* Action Icons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 relative">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button className="p-2 rounded-lg hover:bg-gray-100 relative hidden sm:block">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full"></span>
            </button>

            {/* User Profile with Dropdown */}
            <div className="relative pl-2 sm:pl-3 border-l border-gray-200">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center space-x-1 sm:space-x-3 hover:bg-gray-50 rounded-lg p-1 sm:p-2 transition-colors"
              >
                {/* User Info - Hide text on small screens */}
                <div className="text-right hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">Admin User</p>
                  <p className="text-xs text-gray-600">Municipal Officer</p>
                </div>
                
                {/* Avatar */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
                
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hidden sm:block" />
              </button>

              {/* Dropdown Menu */}
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 lg:hidden">
                    <p className="text-sm font-medium text-gray-900">Admin User</p>
                    <p className="text-xs text-gray-600">Municipal Officer</p>
                  </div>
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

      {/* Mobile Search Bar - Expandable */}
      {isSearchOpen && (
        <div className="mt-3 md:hidden">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {(isProfileMenuOpen || isSearchOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsProfileMenuOpen(false);
            setIsSearchOpen(false);
          }}
        ></div>
      )}
    </nav>
  );
};

export default Navbar;