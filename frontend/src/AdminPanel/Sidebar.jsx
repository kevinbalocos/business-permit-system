import React, { useEffect, useState } from "react";
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
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin-dashboard" },
    { icon: FileText, label: "Documents", path: "/documents" },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleNavClick = (label) => {
    setActiveItem(label);

    if (isMobile) {
      setIsTransitioning(true);
      setTimeout(() => {
        toggleSidebar();
        setIsTransitioning(false);
      }, 100);
    }
  };

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <ul className="flex justify-around">
          {menuItems.slice(0, 4).map((item, index) => {
            const Icon = item.icon;

            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center py-2 px-3 text-xs transition-colors duration-200 ${
                      isActive
                        ? "text-teal-600 font-semibold"
                        : "text-gray-600 hover:text-gray-900"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mb-1" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  // Desktop Sidebar
  return (
    <div
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } bg-white shadow-lg transition-all duration-300 ease-out flex flex-col h-full
      ${isTransitioning ? "pointer-events-none" : "pointer-events-auto"}`}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div
            className={`flex items-center transition-all duration-300 ease-out ${
              isCollapsed ? "justify-center" : ""
            }`}
          >
            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-sm">AL</span>
            </div>
            <div
              className={`ml-3 transition-all duration-300 ease-out overflow-hidden ${
                isCollapsed
                  ? "w-0 opacity-0 transform scale-95"
                  : "w-auto opacity-100 transform scale-100"
              }`}
            >
              <h2 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                Alaminos
              </h2>
              <p className="text-xs text-gray-500 whitespace-nowrap">
                Municipality
              </p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
            disabled={isTransitioning}
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
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <li key={index}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ease-out ${
                      isActive
                        ? "bg-teal-100 text-teal-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                    } ${
                      isTransitioning
                        ? "pointer-events-none"
                        : "pointer-events-auto"
                    }`
                  }
                  onClick={(e) => handleNavClick(e, item.label)}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span
                    className={`font-medium whitespace-nowrap transition-all duration-300 ease-out overflow-hidden ${
                      isCollapsed
                        ? "w-0 opacity-0 transform scale-95"
                        : "w-auto opacity-100 transform scale-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-200">
        <div
          className={`flex items-center gap-3 transition-all duration-300 ease-out ${
            isCollapsed ? "justify-center" : ""
          }`}
        >
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-sm font-medium">AD</span>
          </div>
          <div
            className={`transition-all duration-300 ease-out overflow-hidden ${
              isCollapsed
                ? "w-0 opacity-0 transform scale-95"
                : "w-auto opacity-100 transform scale-100"
            }`}
          >
            <h2 className="text-sm font-semibold text-gray-800 whitespace-nowrap">
              BPLO
            </h2>
            <p className="text-xs text-gray-500 whitespace-nowrap">
              Municipality Officer
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
