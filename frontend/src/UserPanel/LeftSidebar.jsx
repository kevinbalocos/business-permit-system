import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  FileCheck,
  ClipboardList,
  Bell,
  Settings,
  HelpCircle,
} from "lucide-react";

const LeftSidebar = ({ user: propUser = null }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [user, setUser] = useState(propUser);
  const location = useLocation();

  useEffect(() => {
    if (propUser) {
      setUser(propUser);
      return;
    }
    try {
      const stored =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("authUser")) ||
        null;
      setUser(stored);
    } catch (e) {
      setUser(null);
    }
  }, [propUser]);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/user-dashboard" },
    { icon: FileText, label: "Applications", path: "/business-application" },
    { icon: FileCheck, label: "Release", path: "/permit-release" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  // ✅ Detect if mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const getInitials = () => {
    if (!user) return "CU";
    const first = user.first_name ?? user.firstName ?? "";
    const last = user.last_name ?? user.lastName ?? "";
    return `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();
  };

  const getDisplayName = () => {
    if (!user) return "Applicant";
    const first = user.first_name ?? user.firstName ?? "";
    const last = user.last_name ?? user.lastName ?? "";
    return `${first} ${last}`.trim();
  };

  // ✅ Render Bottom Nav if mobile
  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <ul className="flex justify-around">
          {menuItems.slice(0, 4).map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center py-2 px-3 text-xs ${
                      isActive ? "text-teal-600 font-semibold" : "text-gray-600"
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

  // ✅ Desktop Sidebar
  return (
    <div className="w-64 bg-white shadow-lg h-full flex flex-col">
      {/* Logo + User */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-600 text-white rounded-full flex items-center justify-center">
          {getInitials()}
        </div>
        <div>
          <h2 className="text-sm font-semibold">{getDisplayName()}</h2>
          <p className="text-xs text-gray-500">Citizen Portal</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <li key={idx}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md transition ${
                      isActive
                        ? "bg-teal-100 text-teal-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`
                  }
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
