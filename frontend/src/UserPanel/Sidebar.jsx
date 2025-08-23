import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Home, 
  FileText, 
  CreditCard, 
  ClipboardList, 
  Bell, 
  Settings, 
  HelpCircle, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';

const SidebarCitizen = ({ isCollapsed, toggleSidebar }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/user-dashboard' },
    { icon: FileText, label: 'My Applications', path: '/business-application' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: ClipboardList, label: 'Requirements', path: '/requirements' },
    { icon: Bell, label: 'Notifications', path: '/notifications' },
    { icon: HelpCircle, label: 'Help & Support', path: '/help' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle smooth page transitions on mobile
  useEffect(() => {
    if (isMobile && !isCollapsed) {
      setIsTransitioning(true);
      // Close sidebar smoothly after a brief delay on mobile
      const timer = setTimeout(() => {
        toggleSidebar();
        setIsTransitioning(false);
      }, 150);
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, isMobile]);

  const handleNavClick = (e) => {
    if (isMobile) {
      setIsTransitioning(true);
      // Add a slight delay for smoother transition
      setTimeout(() => {
        toggleSidebar();
        setIsTransitioning(false);
      }, 100);
    }
  };

  return (
    <>
      {/* Mobile Edge Toggle Area */}
      {isMobile && isCollapsed && (
        <div
          onClick={toggleSidebar}
          className={`fixed left-0 top-0 w-6 h-full z-60 cursor-pointer
            transition-all duration-300 ease-out
            ${isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'}
            hover:bg-green-500/10 active:bg-green-500/20`}
          aria-label="Toggle sidebar"
        >
          {/* Visual indicator - subtle edge line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-16 bg-green-500/30 rounded-r-full 
            transition-all duration-300 hover:bg-green-500/60 hover:h-24"></div>
          
          {/* Arrow indicator */}
          <div className="absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-300 opacity-0 hover:opacity-100">
            <ChevronRight className="w-4 h-4 text-green-600" />
          </div>
        </div>
      )}

      {/* Mobile Backdrop Overlay with Blur Effect */}
      {!isCollapsed && (
        <div 
          className={`fixed inset-0 bg-white/20 backdrop-blur-md z-40 md:hidden transition-all duration-300 ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`${
          isCollapsed ? 'w-16' : 'w-64'
        } bg-white shadow-lg transition-all duration-300 ease-out flex flex-col h-full
        fixed md:relative z-50 md:z-auto
        ${isCollapsed ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        md:${isCollapsed ? 'w-16' : 'w-64'}
        ${isTransitioning && isMobile ? 'pointer-events-none' : 'pointer-events-auto'}`}
        style={{
          transform: isMobile && isTransitioning 
            ? 'translateX(-100%)' 
            : isCollapsed 
              ? (isMobile ? 'translateX(-100%)' : 'translateX(0)')
              : 'translateX(0)',
          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s ease-out'
        }}
      >
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`flex items-center transition-all duration-300 ease-out ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-sm">AL</span>
              </div>
              <div 
                className={`ml-3 transition-all duration-300 ease-out overflow-hidden ${
                  isCollapsed 
                    ? 'w-0 opacity-0 transform scale-95' 
                    : 'w-auto opacity-100 transform scale-100'
                }`}
              >
                <h2 className="text-lg font-bold text-gray-800 whitespace-nowrap">Applicant User</h2>
                <p className="text-xs text-gray-600 whitespace-nowrap">Citizen Portal</p>
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

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <li key={index}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-lg transition-all duration-200 ease-out relative ${
                        isActive
                          ? 'bg-green-100 text-green-700 shadow-sm'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      } ${
                        isActive ? 'before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-8 before:bg-green-600 before:rounded-r-full' : ''
                      } ${
                        isTransitioning ? 'pointer-events-none' : 'pointer-events-auto'
                      }`
                    }
                    onClick={handleNavClick}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span 
                      className={`ml-3 font-medium whitespace-nowrap transition-all duration-300 ease-out overflow-hidden ${
                        isCollapsed 
                          ? 'w-0 opacity-0 transform scale-95' 
                          : 'w-auto opacity-100 transform scale-100'
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

        {/* User Info */}
        <div className="p-4 border-t border-gray-200">
          <div className={`flex items-center transition-all duration-300 ease-out ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-medium">CU</span>
            </div>
            <div 
              className={`ml-3 transition-all duration-300 ease-out overflow-hidden ${
                isCollapsed 
                  ? 'w-0 opacity-0 transform scale-95' 
                  : 'w-auto opacity-100 transform scale-100'
              }`}
            >
              <p className="text-sm font-medium text-gray-800 whitespace-nowrap">Citizen User</p>
              <p className="text-xs text-gray-600 whitespace-nowrap">Applicant</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SidebarCitizen;