// AdminPage.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  CheckCircle,
  ClipboardList,
  X,
  Sun,
  Moon,
  Menu,
  // Activity removed (not used anymore)
  ListChecks,
  FileCheck,
  Bell,
  AlertCircle,
  XCircle,
  Search,
  Settings,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Maximize2,
  Minimize2,
  Eye,
  EyeOff,
  Zap,
  TrendingUp,
  Users,
  FileText,
  Calendar,
  BarChart3,
  Clock, // added because metrics referenced Clock
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminAndSuperAdminUserApproval from "../authentication/Admin-SuperAdminUserApproval";
import AdminDashboard from "./AdminDashboard";
import RecordsRequest from "./AdminRecordsRequest";
import AdminRecordsReleased from "./AdminRecordsReleased";
import AdminRequestTypes from "./AdminRequestTypes";
import "./AdminLandingPage.css"; // <-- keep your CSS file
import dcsiLogo from "../assets/dcsi-logo-no-text-main.png"; // your logo path

// LoadingSplash now uses your logo (masked) and colors it white in dark mode / black in light mode
const LoadingSplash = ({ isVisible, isDarkMode }) => {
  const [loadingText, setLoadingText] = useState("Initializing System");

  useEffect(() => {
    if (isVisible) {
      const texts = [
        "Initializing System",
        "Loading Components",
        "Establishing Connections",
        "Finalizing Setup",
      ];
      let index = 0;
      const interval = setInterval(() => {
        index = (index + 1) % texts.length;
        setLoadingText(texts[index]);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-700
                  ${
                    isVisible
                      ? "opacity-100 scale-100"
                      : "opacity-0 scale-95 pointer-events-none"
                  }
                  ${isDarkMode ? "bg-black" : "bg-white"}`}
    >
      <div className="text-center space-y-6">
        <div className="relative">
          {/* Masked logo used as spinner; colors via backgroundColor */}
          <div
            className="w-96 h-96 mx-auto animate-spin"
            style={{
              WebkitMaskImage: `url(${dcsiLogo})`,
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              WebkitMaskPosition: "center",
              maskImage: `url(${dcsiLogo})`,
              maskRepeat: "no-repeat",
              maskSize: "contain",
              maskPosition: "center",
              backgroundColor: isDarkMode ? "#ffffff" : "#000000",
            }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 rounded-full animate-pulse-glow"></div>
        </div>
        <div className="space-y-2">
          <h2
            className={`text-4xl font-bold tracking-tight ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Staff Administrator
          </h2>
          <p
            className={`text-xl font-medium ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {loadingText}
          </p>
        </div>
        <div className="w-64 h-1 bg-gray-200 dark:bg-black rounded-full overflow-hidden">
          <div
            className={`h-full ${
              isDarkMode ? "bg-white" : "bg-black"
            } animate-pulse rounded-full`}
            style={{
              animation: "loading 2s ease-in-out infinite",
              width: "40%",
              transform: "translateX(-100%)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

// Enhanced System Alert Component
const SystemAlert = ({
  message,
  type,
  onClose,
  isVisible,
  isDarkMode = false,
  actions = null,
}) => {
  const getAlertStyles = () => {
    const baseStyles =
      "flex items-center p-5 rounded-2xl shadow-2xl backdrop-blur-md border max-w-md w-full";
    if (isDarkMode) {
      switch (type) {
        case "success":
          return `${baseStyles} bg-black/95 border-white/20 text-white`;
        case "error":
          return `${baseStyles} bg-black/95 border-white/20 text-white`;
        case "warning":
          return `${baseStyles} bg-black/95 border-white/20 text-white`;
        case "info":
          return `${baseStyles} bg-black/95 border-white/20 text-white`;
        default:
          return `${baseStyles} bg-black/95 border-white/20 text-white`;
      }
    } else {
      switch (type) {
        case "success":
          return `${baseStyles} bg-white/95 border-black/20 text-black`;
        case "error":
          return `${baseStyles} bg-white/95 border-black/20 text-black`;
        case "warning":
          return `${baseStyles} bg-white/95 border-black/20 text-black`;
        case "info":
          return `${baseStyles} bg-white/95 border-black/20 text-black`;
        default:
          return `${baseStyles} bg-white/95 border-black/20 text-black`;
      }
    }
  };

  const getIcon = () => {
    const iconClass = "w-7 h-7 mr-4 flex-shrink-0";
    const iconColor = isDarkMode ? "text-white" : "text-black";

    switch (type) {
      case "success":
        return <CheckCircle className={`${iconClass} ${iconColor}`} />;
      case "error":
        return <XCircle className={`${iconClass} ${iconColor}`} />;
      case "warning":
        return <AlertCircle className={`${iconClass} ${iconColor}`} />;
      case "info":
        return <Bell className={`${iconClass} ${iconColor}`} />;
      default:
        return <AlertCircle className={`${iconClass} ${iconColor}`} />;
    }
  };

  return (
    <div
      className={`fixed top-6 right-6 z-50 transform transition-all duration-500 ease-out
        ${
          isVisible
            ? "translate-x-0 opacity-100 scale-100"
            : "translate-x-full opacity-0 scale-95"
        }`}
    >
      <div className={getAlertStyles()}>
        {getIcon()}
        <div className="flex-1">
          <p className="font-semibold text-lg leading-tight">{message}</p>
          {actions && (
            <div className="mt-3 flex space-x-2">
              {actions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.onClick}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors
                    ${
                      isDarkMode
                        ? "bg-white text-black hover:bg-gray-200"
                        : "bg-black text-white hover:bg-black"
                    }`}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className={`ml-4 p-2 rounded-full transition-colors
            ${
              isDarkMode
                ? "text-white/60 hover:text-white hover:bg-white/10"
                : "text-black/60 hover:text-black hover:bg-black/10"
            }`}
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

// Enhanced System Alert Hook
const useSystemAlert = () => {
  const [alertState, setAlertState] = useState(null);
  const timeoutRef = useRef(null);

  const showAlert = useCallback(
    (
      message,
      type = "success",
      duration = 5000,
      isDarkMode = false,
      actions = null
    ) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      setAlertState({ message, type, isVisible: true, isDarkMode, actions });

      timeoutRef.current = setTimeout(() => {
        setAlertState((prev) => (prev ? { ...prev, isVisible: false } : null));
        setTimeout(() => setAlertState(null), 500);
      }, duration);
    },
    []
  );

  const hideAlert = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setAlertState((prev) => (prev ? { ...prev, isVisible: false } : null));
    setTimeout(() => setAlertState(null), 500);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { alert: alertState, showAlert, hideAlert };
};

// Mock Dashboard Component
const MockDashboard = ({ isDarkMode }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const metrics = [
    {
      title: "Total Requests",
      value: "2,847",
      change: "+12%",
      icon: FileText,
      trend: "up",
    },
    {
      title: "Active Users",
      value: "1,234",
      change: "+8%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Completed Today",
      value: "156",
      change: "+24%",
      icon: CheckCircle,
      trend: "up",
    },
    {
      title: "Pending Review",
      value: "89",
      change: "-5%",
      icon: Clock,
      trend: "down",
    },
  ];

  return (
    <div
      className={`p-8 space-y-8 ${isFullscreen ? "fixed inset-0 z-40" : ""} ${
        isDarkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className={`text-4xl font-bold ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            Dashboard Overview
          </h1>
          <p
            className={`text-lg mt-2 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Welcome back! Here's what's happening with your system.
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            } ${refreshing ? "animate-spin" : ""}`}
          >
            <RefreshCw className="w-5 h-5" />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            }`}
          >
            {isFullscreen ? (
              <Minimize2 className="w-5 h-5" />
            ) : (
              <Maximize2 className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div
              key={index}
              className={`metric-card p-6 rounded-2xl border ${
                isDarkMode
                  ? "bg-white/5 border-white/10 text-white"
                  : "bg-black/5 border-black/10 text-black"
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon className="w-8 h-8" />
                <span
                  className={`text-sm font-medium ${
                    metric.trend === "up"
                      ? isDarkMode
                        ? "text-green-400"
                        : "text-green-600"
                      : isDarkMode
                      ? "text-red-400"
                      : "text-red-600"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
              <div>
                <p className="text-3xl font-bold mb-1">{metric.value}</p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {metric.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div
        className={`p-6 rounded-2xl border ${
          isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-black/5 border-black/10"
        }`}
      >
        <h2
          className={`text-2xl font-bold mb-6 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            className={`p-4 rounded-xl text-left transition-all duration-200 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            }`}
          >
            <Upload className="w-6 h-6 mb-2" />
            <p className="font-semibold">Upload Documents</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Add new files to the system
            </p>
          </button>
          <button
            className={`p-4 rounded-xl text-left transition-all duration-200 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            }`}
          >
            <BarChart3 className="w-6 h-6 mb-2" />
            <p className="font-semibold">Generate Report</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Create detailed analytics
            </p>
          </button>
          <button
            className={`p-4 rounded-xl text-left transition-all duration-200 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            }`}
          >
            <Settings className="w-6 h-6 mb-2" />
            <p className="font-semibold">System Settings</p>
            <p
              className={`text-sm ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Configure preferences
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

// Mock component for other sections
const MockSection = ({ title, isDarkMode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState(false);

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1
          className={`text-4xl font-bold ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          {title}
        </h1>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search
              className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                isDarkMode ? "text-gray-400" : "text-gray-600"
              }`}
            />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`search-input pl-10 pr-4 py-3 rounded-xl border ${
                isDarkMode
                  ? "bg-white/10 border-white/20 text-white placeholder-gray-400"
                  : "bg-black/5 border-black/20 text-black placeholder-gray-600"
              } focus:outline-none`}
            />
          </div>
          <button
            onClick={() => setFilterActive(!filterActive)}
            className={`p-3 rounded-xl transition-all duration-200 ${
              filterActive
                ? isDarkMode
                  ? "bg-white text-black"
                  : "bg-black text-white"
                : isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            }`}
          >
            <Filter className="w-5 h-5" />
          </button>
          <button
            className={`p-3 rounded-xl transition-all duration-200 ${
              isDarkMode
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/10 hover:bg-black/20 text-black"
            }`}
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        className={`p-8 rounded-2xl border text-center ${
          isDarkMode
            ? "bg-white/5 border-white/10 text-white"
            : "bg-black/5 border-black/10 text-black"
        }`}
      >
        <Zap
          className={`w-16 h-16 mx-auto mb-4 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        />
        <h2 className="text-2xl font-bold mb-2">{title} Interface</h2>
        <p
          className={`text-lg ${
            isDarkMode ? "text-gray-400" : "text-gray-600"
          }`}
        >
          This section contains the {title.toLowerCase()} functionality with
          enhanced search and filtering capabilities.
        </p>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(() => {
    return localStorage.getItem("adminActiveMenuItem") || "dashboard";
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const [showSplash, setShowSplash] = useState(true);
  const { alert: systemAlert, showAlert, hideAlert } = useSystemAlert();
  const [userSettings, setUserSettings] = useState({
    notifications: true,
    autoSave: true,
    compactMode: false,
  });

  // Sync active item with localStorage
  useEffect(() => {
    localStorage.setItem("adminActiveMenuItem", activeItem);
  }, [activeItem]);

  // Theme management
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  // Enhanced splash screen with simulated loading states
  useEffect(() => {
    const minSplashTime = 2000;
    const startTime = Date.now();

    const timer = setTimeout(() => {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = minSplashTime - elapsedTime;

      if (remainingTime > 0) {
        setTimeout(() => setShowSplash(false), remainingTime);
      } else {
        setShowSplash(false);
      }

      // Enhanced login notification with actions
      const storedNotification = sessionStorage.getItem("loginNotification");
      if (storedNotification) {
        try {
          const { message, type } = JSON.parse(storedNotification);
          showAlert(message, type, 6000, isDarkMode, [
            { label: "View Profile", onClick: () => setActiveItem("profile") },
            { label: "Dismiss", onClick: hideAlert },
          ]);
          sessionStorage.removeItem("loginNotification");
        } catch (e) {
          console.error("Failed to parse stored notification:", e);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [showAlert, isDarkMode, hideAlert]);

  // Enhanced menu sections with more options
  const menuSections = [
    {
      title: "Main",
      items: [{ id: "dashboard", label: "Dashboard", icon: LayoutDashboard }],
    },
    {
      title: "Records Management",
      items: [
        {
          id: "records-request",
          label: "Records Request",
          icon: ClipboardList,
        },
        { id: "records-released", label: "Records Released", icon: FileCheck },
        { id: "analytics", label: "Analytics", icon: BarChart3 },
      ],
    },
    {
      title: "Administration",
      items: [
        {
          id: "manage-request-types",
          label: "Request Types",
          icon: ListChecks,
        },
        { id: "user-management", label: "User Management", icon: Users },
        { id: "system-settings", label: "System Settings", icon: Settings },
      ],
    },
  ];

  const handleLogout = () => {
    showAlert("Logging out...", "info", 2000, isDarkMode);
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      navigate("/");
    }, 2000);
  };

  const toggleSetting = (setting) => {
    setUserSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
    showAlert(
      `${setting} ${userSettings[setting] ? "disabled" : "enabled"}`,
      "success",
      2000,
      isDarkMode
    );
  };

  const renderContent = () => {
    switch (activeItem) {
      case "dashboard":
        return (
          <MockDashboard
            isDarkMode={isDarkMode}
            setActiveItem={setActiveItem}
          />
        );
      case "records-request":
        return <MockSection title="Records Request" isDarkMode={isDarkMode} />;
      case "records-released":
        return <MockSection title="Records Released" isDarkMode={isDarkMode} />;
      case "analytics":
        return <MockSection title="Analytics" isDarkMode={isDarkMode} />;
      case "manage-request-types":
        return (
          <MockSection
            title="Request Types Management"
            isDarkMode={isDarkMode}
          />
        );
      case "user-management":
        return <MockSection title="User Management" isDarkMode={isDarkMode} />;
      case "system-settings":
        return <MockSection title="System Settings" isDarkMode={isDarkMode} />;
      default:
        return (
          <MockDashboard
            isDarkMode={isDarkMode}
            setActiveItem={setActiveItem}
          />
        );
    }
  };

  return (
    <div
      className={`flex flex-col h-screen  lg:flex-row ${
        isDarkMode ? "dark bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* Enhanced Loading Splash Screen */}
      <LoadingSplash isVisible={showSplash} isDarkMode={isDarkMode} />

      {/* Enhanced System Alert Notification */}
      {systemAlert && (
        <SystemAlert
          message={systemAlert.message}
          type={systemAlert.type}
          onClose={hideAlert}
          isVisible={systemAlert.isVisible}
          isDarkMode={isDarkMode}
          actions={systemAlert.actions}
        />
      )}

      {/* Main Content - hidden during splash */}
      <div
        className={`${
          showSplash ? "hidden" : "flex flex-col flex-1 lg:flex-row"
        }`}
      >
        {/* Enhanced Sidebar for Larger Screens */}
        <div
          className={`${
            isCollapsed ? "lg:w-20" : "lg:w-80"
          } hidden lg:flex glass-sidebar shadow-2xl transition-all duration-300 flex-col relative z-20 border-r ${
            isDarkMode ? "border-white/10" : "border-black/10"
          } flex-shrink-0`}
        >
          {/* Enhanced Header */}
          <div
            className={`p-6  border-b ${
              isDarkMode ? "border-white/10" : "border-black/10"
            } flex items-center justify-between flex-shrink-0`}
          >
            {!isCollapsed && (
              <div className="flex  items-center space-x-4">
                <div
                  className={`w-12 h-12 ${
                    isDarkMode ? "bg-white" : "bg-black"
                  } rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <LayoutDashboard
                    className={`w-7 h-7 ${
                      isDarkMode ? "text-black" : "text-white"
                    }`}
                  />
                </div>
                <div>
                  <span
                    className={`font-black text-2xl tracking-tight ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    StaffHub
                  </span>
                  <p
                    className={`text-sm font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Administrator
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-black/10 text-black"
              } focus:outline-none`}
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-6 h-6" />
              ) : (
                <ChevronLeft className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Enhanced Navigation */}
          <nav className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
            {menuSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                {!isCollapsed && (
                  <h3
                    className={`text-xs font-bold uppercase tracking-widest ${
                      isDarkMode ? "text-gray-500" : "text-gray-500"
                    } mb-3 px-4`}
                  >
                    {section.title}
                  </h3>
                )}
                <div className="space-y-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.id;

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveItem(item.id);
                          if (!isCollapsed) {
                            showAlert(
                              `Switched to ${item.label}`,
                              "info",
                              2000,
                              isDarkMode
                            );
                          }
                        }}
                        className={`relative w-full flex items-center px-5 py-4 rounded-2xl transition-all duration-300 group font-medium
                          ${
                            isActive
                              ? `${
                                  isDarkMode
                                    ? "bg-white/15 text-white shadow-lg"
                                    : "bg-black/15 text-black shadow-lg"
                                } font-semibold nav-item-active scale-[1.02]`
                              : `${
                                  isDarkMode
                                    ? "text-gray-400 group-hover:text-white group-hover:scale-105"
                                    : "text-gray-600 group-hover:text-black group-hover:scale-105"
                                }`
                          }
                          ${isCollapsed ? "justify-center" : "space-x-4"}
                        `}
                        title={isCollapsed ? item.label : ""}
                      >
                        <Icon
                          className={`w-7 h-7 flex-shrink-0 transition-transform duration-200 ${
                            isActive
                              ? `${
                                  isDarkMode ? "text-white" : "text-black"
                                } scale-110`
                              : `${
                                  isDarkMode
                                    ? "text-gray-400 group-hover:text-white group-hover:scale-105"
                                    : "text-gray-600 group-hover:text-black group-hover:scale-105"
                                }`
                          }`}
                        />
                        {!isCollapsed && (
                          <span className="text-lg whitespace-nowrap overflow-hidden transition-all duration-300">
                            {item.label}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Enhanced User Profile and Controls */}
          <div
            className={`p-6 border-t ${
              isDarkMode ? "border-white/10" : "border-black/10"
            } flex-shrink-0 space-y-4`}
          >
            {/* User Profile */}
            <div
              className={`flex items-center ${
                isCollapsed ? "justify-center" : "space-x-4"
              } p-4 rounded-2xl ${isDarkMode ? "bg-white/5" : "bg-black/5"}`}
            >
              <div
                className={`w-14 h-14 ${
                  isDarkMode ? "bg-white" : "bg-black"
                } rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}
              >
                <User
                  className={`w-8 h-8 ${
                    isDarkMode ? "text-black" : "text-white"
                  }`}
                />
              </div>
              {!isCollapsed && (
                <div className="flex-1 overflow-hidden">
                  <p
                    className={`text-sm font-bold ${
                      isDarkMode ? "text-white" : "text-black"
                    } truncate`}
                  >
                    Staff Administrator
                  </p>
                  <p
                    className={`text-xs font-medium ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    } truncate`}
                  >
                    Congressional Staff
                  </p>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                setIsDarkMode(!isDarkMode);
                showAlert(
                  `Switched to ${!isDarkMode ? "dark" : "light"} mode`,
                  "success",
                  2000,
                  !isDarkMode
                );
              }}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-start space-x-3"
              } p-4 text-lg rounded-2xl transition-all duration-200 group font-medium ${
                isDarkMode
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-black/10 text-black"
              }`}
              title={
                isCollapsed
                  ? isDarkMode
                    ? "Switch to Light Mode"
                    : "Switch to Dark Mode"
                  : ""
              }
            >
              {isDarkMode ? (
                <Sun className="w-6 h-6 group-hover:text-yellow-400 transition-colors" />
              ) : (
                <Moon className="w-6 h-6 group-hover:text-indigo-600 transition-colors" />
              )}
              {!isCollapsed && (
                <span className=" whitespace-nowrap overflow-hidden text-md">
                  {isDarkMode ? "Light Theme" : "Dark Theme"}
                </span>
              )}
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center ${
                isCollapsed ? "justify-center" : "justify-start space-x-3"
              } p-4 text-lg rounded-2xl transition-all duration-200 group font-medium ${
                isDarkMode
                  ? "text-white hover:bg-red-500/20 hover:text-red-300"
                  : "text-black hover:bg-red-500/20 hover:text-red-600"
              }`}
              title={isCollapsed ? "Sign Out" : ""}
            >
              <LogOut
                className={`w-6 h-6 transition-colors ${
                  isDarkMode
                    ? "group-hover:text-red-400"
                    : "group-hover:text-red-600"
                }`}
              />
              {!isCollapsed && (
                <span className="font-semibold whitespace-nowrap overflow-hidden">
                  Sign Out
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div
          className={` flex-1 flex flex-col ${
            isDarkMode ? "bg-black" : "bg-white"
          } overflow-hidden `}
        >
          {/* Enhanced Top Bar for Mobile */}
          <div
            className={`glass-topbar p-5 flex items-center justify-between border-b ${
              isDarkMode ? "border-white/10" : "border-black/10"
            } lg:hidden shadow-lg z-10`}
          >
            <div className="flex items-center space-x-4">
              <div
                className={`w-10 h-10 ${
                  isDarkMode ? "bg-white" : "bg-black"
                } rounded-xl flex items-center justify-center shadow-md`}
              >
                <LayoutDashboard
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-black" : "text-white"
                  }`}
                />
              </div>
              <div>
                <span
                  className={`font-black text-xl tracking-tight ${
                    isDarkMode ? "text-white" : "text-black"
                  }`}
                >
                  StaffHub
                </span>
                <p
                  className={`text-xs font-medium ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  Professional
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className={`p-3 rounded-xl transition-all duration-200 ${
                isDarkMode
                  ? "hover:bg-white/10 text-white"
                  : "hover:bg-black/10 text-black"
              } focus:outline-none`}
              aria-label="Open menu"
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>

          {/* Enhanced Mobile Overlay Menu */}
          {isMobileMenuOpen && (
            <div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div
                className={`absolute top-0 right-0 w-80 h-full glass-sidebar shadow-2xl p-6 flex flex-col ${
                  isMobileMenuOpen
                    ? "animate-slide-in-right"
                    : "animate-slide-out-right"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-6">
                  <h2
                    className={`text-2xl font-bold ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    Menu
                  </h2>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`p-3 rounded-xl transition-colors ${
                      isDarkMode
                        ? "text-white hover:bg-white/10"
                        : "text-black hover:bg-black/10"
                    }`}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <nav className="flex-1 space-y-6 custom-scrollbar overflow-y-auto">
                  {menuSections.map((section, sectionIndex) => (
                    <div key={sectionIndex}>
                      <h3
                        className={`text-xs font-bold uppercase tracking-widest ${
                          isDarkMode ? "text-gray-500" : "text-gray-500"
                        } mb-3 px-4`}
                      >
                        {section.title}
                      </h3>
                      <div className="space-y-2">
                        {section.items.map((item) => {
                          const Icon = item.icon;
                          const isActive = activeItem === item.id;
                          return (
                            <button
                              key={item.id}
                              onClick={() => {
                                setActiveItem(item.id);
                                setIsMobileMenuOpen(false);
                                showAlert(
                                  `Switched to ${item.label}`,
                                  "info",
                                  2000,
                                  isDarkMode
                                );
                              }}
                              className={`relative w-full flex items-center space-x-4 px-5 py-4 rounded-2xl transition-all duration-300 group font-medium ${
                                isActive
                                  ? `${
                                      isDarkMode
                                        ? "bg-white/15 text-white shadow-lg"
                                        : "bg-black/15 text-black shadow-lg"
                                    } font-semibold nav-item-active`
                                  : `${
                                      isDarkMode
                                        ? "text-gray-300 hover:bg-white/10 hover:text-white"
                                        : "text-gray-700 hover:bg-black/10 hover:text-black"
                                    }`
                              }`}
                            >
                              <Icon
                                className={`w-7 h-7 flex-shrink-0 ${
                                  isActive
                                    ? `${
                                        isDarkMode ? "text-white" : "text-black"
                                      }`
                                    : `${
                                        isDarkMode
                                          ? "text-gray-400 group-hover:text-white"
                                          : "text-gray-600 group-hover:text-black"
                                      }`
                                }`}
                              />
                              <span className="text-lg">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </nav>

                {/* Mobile User Section */}
                <div
                  className={`p-5 border-t ${
                    isDarkMode ? "border-white/10" : "border-black/10"
                  } mt-4 flex-shrink-0 space-y-4`}
                >
                  <div
                    className={`flex items-center space-x-4 p-4 rounded-2xl ${
                      isDarkMode ? "bg-white/5" : "bg-black/5"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 ${
                        isDarkMode ? "bg-white" : "bg-black"
                      } rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}
                    >
                      <User
                        className={`w-7 h-7 ${
                          isDarkMode ? "text-black" : "text-white"
                        }`}
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p
                        className={`text-lg font-bold ${
                          isDarkMode ? "text-white" : "text-black"
                        } truncate`}
                      >
                        Staff Administrator
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          isDarkMode ? "text-gray-400" : "text-gray-600"
                        } truncate`}
                      >
                        Congressional Staff
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setIsDarkMode(!isDarkMode);
                      showAlert(
                        `Switched to ${!isDarkMode ? "dark" : "light"} mode`,
                        "success",
                        2000,
                        !isDarkMode
                      );
                    }}
                    className={`w-full flex items-center justify-start space-x-3 p-4 text-lg rounded-2xl transition-colors duration-200 group font-medium ${
                      isDarkMode
                        ? "hover:bg-white/10 text-white"
                        : "hover:bg-black/10 text-black"
                    }`}
                  >
                    {isDarkMode ? (
                      <Sun className="w-6 h-6 group-hover:text-yellow-400" />
                    ) : (
                      <Moon className="w-6 h-6 group-hover:text-indigo-600" />
                    )}
                    <span className="font-semibold">
                      {isDarkMode ? "Light Theme" : "Dark Theme"}
                    </span>
                  </button>

                  <button
                    onClick={handleLogout}
                    className={`w-full flex items-center justify-start space-x-3 p-4 text-lg rounded-2xl transition-colors duration-200 group font-medium ${
                      isDarkMode
                        ? "text-white hover:bg-red-500/20 hover:text-red-300"
                        : "text-black hover:bg-red-500/20 hover:text-red-600"
                    }`}
                  >
                    <LogOut
                      className={`w-6 h-6 ${
                        isDarkMode
                          ? "group-hover:text-red-400"
                          : "group-hover:text-red-600"
                      }`}
                    />
                    <span className="font-semibold">Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Page Content Area */}
          <main
            className={`flex-1 overflow-y-auto mb-[60px] sm:mb-0 ${
              isDarkMode ? "bg-black" : "bg-teal-50"
            }`}
          >
            {activeItem === "dashboard" && (
              <div className={isDarkMode ? "bg-black text-gray-100" : ""}>
                <AdminDashboard
                  isDarkMode={isDarkMode}
                  setActiveItem={setActiveItem}
                />
              </div>
            )}

            {activeItem === "records-request" && (
              <div
                className={`${
                  isDarkMode
                    ? "bg-black text-gray-100"
                    : "bg-white text-gray-900"
                } rounded-xl shadow-lg border ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                } p-4 sm:p-6 lg:p-8`}
              >
                <RecordsRequest isDarkMode={isDarkMode} />
              </div>
            )}
            {activeItem === "records-released" && (
              <div
                className={`${
                  isDarkMode
                    ? "bg-black text-gray-100"
                    : "bg-white text-gray-900"
                } rounded-xl shadow-lg border ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                } p-4 sm:p-6 lg:p-8`}
              >
                <AdminRecordsReleased isDarkMode={isDarkMode} />
              </div>
            )}
            {activeItem === "indigency" && (
              <div
                className={`${
                  isDarkMode
                    ? "bg-black text-gray-100"
                    : "bg-white text-gray-900"
                } rounded-xl shadow-lg border ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                } p-4 sm:p-6 lg:p-8`}
              >
                {/* If you have IndigencyAdmin component, import & use it here */}
                {/* <IndigencyAdmin isDarkMode={isDarkMode} /> */}
              </div>
            )}
            {activeItem === "correction" && (
              <div
                className={`${
                  isDarkMode
                    ? "bg-black text-gray-100"
                    : "bg-white text-gray-900"
                } rounded-xl shadow-lg border ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                } p-4 sm:p-6 lg:p-8`}
              >
                {/* If you have AdminCorrectionList component, import & use it here */}
                {/* <AdminCorrectionList isDarkMode={isDarkMode} /> */}
              </div>
            )}
            {activeItem === "manage-request-types" && (
              <div
                className={`${
                  isDarkMode
                    ? "bg-black text-gray-100"
                    : "bg-white text-gray-900"
                } rounded-xl shadow-lg border ${
                  isDarkMode ? "border-gray-700" : "border-gray-100"
                } p-4 sm:p-6 lg:p-8`}
              >
                <AdminRequestTypes isDarkMode={isDarkMode} />
              </div>
            )}
          </main>
        </div>

        {/* Enhanced Bottom Navigation for Mobile */}
        <div
          className={`fixed bottom-0 left-0 right-0 ${
            isDarkMode
              ? "bg-black/95 border-white/10"
              : "bg-white/95 border-black/10"
          } border-t backdrop-blur-md shadow-2xl z-30 flex justify-around p-3 lg:hidden`}
        >
          {menuSections
            .flatMap((section) => section.items)
            .slice(0, 4)
            .map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveItem(item.id);
                    showAlert(
                      `Switched to ${item.label}`,
                      "info",
                      1500,
                      isDarkMode
                    );
                  }}
                  className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 text-sm font-semibold min-w-0 flex-1 ${
                    isActive
                      ? `${
                          isDarkMode
                            ? "text-white bg-white/15 shadow-lg"
                            : "text-black bg-black/15 shadow-lg"
                        } scale-105`
                      : `${
                          isDarkMode
                            ? "text-gray-400 hover:bg-white/10 hover:text-white"
                            : "text-gray-600 hover:bg-black/10 hover:text-black"
                        }`
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 mb-1 ${
                      isActive
                        ? isDarkMode
                          ? "text-white"
                          : "text-black"
                        : isDarkMode
                        ? "text-gray-500"
                        : "text-gray-500"
                    }`}
                  />
                  <span className="truncate w-full text-center">
                    {item.label.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className={`flex flex-col items-center justify-center p-3 rounded-2xl transition-all duration-200 text-sm font-semibold ${
              isMobileMenuOpen
                ? `${
                    isDarkMode
                      ? "text-white bg-white/15 shadow-lg"
                      : "text-black bg-black/15 shadow-lg"
                  }`
                : `${
                    isDarkMode
                      ? "text-gray-400 hover:bg-white/10 hover:text-white"
                      : "text-gray-600 hover:bg-black/10 hover:text-black"
                  }`
            }`}
          >
            <Menu
              className={`w-6 h-6 mb-1 ${
                isDarkMode ? "text-gray-500" : "text-gray-500"
              }`}
            />
            More
          </button>
        </div>
      </div>
    </div>
  );
}
