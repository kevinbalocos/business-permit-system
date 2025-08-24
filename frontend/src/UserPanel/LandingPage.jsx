import React, { useState, useEffect } from "react";
import SidebarCitizen from "./Sidebar";
import NavbarCitizen from "./Navbar";
import LoadingScreen from "./Components/UserLoadingScreen";
import {
  FilePlus,
  ClipboardList,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Download,
  TrendingUp,
  Calendar,
  Eye,
  Bell,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // loader state
  const navigate = useNavigate();

  // load user and hide loading screen after small delay
  useEffect(() => {
    let mounted = true;

    try {
      const storedUser =
        JSON.parse(localStorage.getItem("user")) ||
        JSON.parse(localStorage.getItem("authUser")) ||
        null;
      if (mounted) setUser(storedUser);
    } catch (e) {
      if (mounted) setUser(null);
    }

    // Keep the loader up briefly so it doesn't flash too fast.
    // Adjust the timeout (ms) to taste.
    const MINIMUM_LOADER_MS = 700;
    const t = setTimeout(() => {
      if (mounted) setIsLoading(false);
    }, MINIMUM_LOADER_MS);

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, []);

  const applications = [
    {
      id: "APP-2025-001",
      type: "Business Permit",
      status: "For Assessment",
      date: "2025-08-10",
      progress: 60,
    },
    {
      id: "APP-2025-002",
      type: "Renewal",
      status: "Pending Payment",
      date: "2025-08-12",
      progress: 80,
    },
    {
      id: "APP-2025-003",
      type: "Amendment",
      status: "Approved",
      date: "2025-08-15",
      progress: 100,
    },
  ];

  const recentActivities = [
    {
      action: "New permit application submitted",
      user: "You",
      time: "2 hours ago",
      type: "application",
    },
    {
      action: "Payment confirmation received",
      user: "System",
      time: "4 hours ago",
      type: "payment",
    },
    {
      action: "Document uploaded successfully",
      user: "You",
      time: "1 day ago",
      type: "document",
    },
    {
      action: "Inspection scheduled",
      user: "Admin",
      time: "2 days ago",
      type: "inspection",
    },
  ];

  const upcomingEvents = [
    { title: "Business Inspection", date: "2025-08-25", time: "10:00 AM" },
    { title: "Permit Renewal Deadline", date: "2025-12-31", time: "All day" },
    { title: "Document Submission Due", date: "2025-08-28", time: "5:00 PM" },
  ];

  // Desktop sidebar toggle
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getDisplayName = () => {
    if (!user) return "Citizen User";
    const first =
      user.first_name ?? user.firstName ?? user.fname ?? user.givenName ?? "";
    const last =
      user.last_name ?? user.lastName ?? user.lname ?? user.familyName ?? "";
    const name = `${first} ${last}`.trim();
    return name || "Citizen User";
  };

  // Show loading screen until isLoading is false
  if (isLoading) {
    return <LoadingScreen message="Loading dashboard..." showLogo={true} />;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar Container */}
      <SidebarCitizen
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        isMobileMenuOpen={isMobileMenuOpen}
        toggleMobileMenu={toggleMobileMenu}
        closeMobileMenu={closeMobileMenu}
        user={user}
      />

      {/* Main content */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:ml-0" : "lg:ml-0"
        }`}
      >
        {/* Navbar */}
        <NavbarCitizen
          toggleMobileMenu={toggleMobileMenu}
          toggleSidebar={toggleSidebar}
          isCollapsed={isCollapsed}
          user={user}
        />

        {/* Dashboard content */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 bg-gradient-to-br from-teal-50 to-emerald-100">
          {/* Welcome Header */}
          <div className="mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Welcome, {getDisplayName()}
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              Here's your current business permit activities and updates.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Total Applications
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    12
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <FilePlus className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-teal-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-teal-600 flex items-center">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                +2 from last month
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Pending Review
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    3
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-blue-600">
                2 require action
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">Approved</p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    8
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-purple-600">
                +81% from last month
              </p>
            </div>

            <div className="bg-white rounded-lg lg:rounded-xl p-3 sm:p-4 lg:p-6 shadow-sm">
              <div className="flex items-center justify-between mb-2 sm:mb-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Payments Due
                  </p>
                  <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">
                    1
                  </p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-orange-600" />
                </div>
              </div>
              <p className="text-xs sm:text-sm text-orange-600">
                +15.3% from last month
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
            {/* Application Status - Left 2 columns */}
            <div className="xl:col-span-2 space-y-4 sm:space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
                  <FilePlus className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    New Application
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    Start a new business permit application.
                  </p>
                  <button
                    onClick={() => navigate("/business-application")}
                    className="px-3 py-2 sm:px-4 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                  >
                    Apply Now
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
                  <ClipboardList className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Track Applications
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    View the status of your applications.
                  </p>
                  <button className="px-3 py-2 sm:px-4 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Track Now
                  </button>
                </div>

                <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6 flex flex-col items-center text-center hover:shadow-lg transition-all duration-200">
                  <CreditCard className="w-8 h-8 sm:w-10 sm:h-10 text-teal-600 mb-2 sm:mb-3" />
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    Pay Fees
                  </h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                    Pay your pending permit fees online.
                  </p>
                  <button className="px-3 py-2 sm:px-4 sm:py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm">
                    Pay Now
                  </button>
                </div>
              </div>

              {/* Application Status Table */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-md p-4 sm:p-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">
                  Recent Applications
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {applications.map((app, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 bg-gray-50 rounded-lg gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 sm:gap-3 mb-2">
                          <span className="font-medium text-gray-800 text-sm sm:text-base truncate">
                            {app.id}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                            • {app.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mb-2 sm:mb-3 flex-wrap">
                          {app.status === "Approved" && (
                            <span className="flex items-center text-teal-600 text-xs sm:text-sm">
                              <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                              Approved
                            </span>
                          )}
                          {app.status === "For Assessment" && (
                            <span className="flex items-center text-yellow-600 text-xs sm:text-sm">
                              <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                              For Assessment
                            </span>
                          )}
                          {app.status === "Pending Payment" && (
                            <span className="flex items-center text-red-600 text-xs sm:text-sm">
                              <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                              Pending Payment
                            </span>
                          )}
                          <span className="text-xs text-gray-500">
                            • {app.date}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${app.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex gap-2 sm:ml-4 flex-shrink-0">
                        <button className="px-2 py-1 sm:px-3 sm:py-1 bg-teal-100 text-teal-700 rounded-lg text-xs sm:text-sm hover:bg-teal-200 flex items-center transition-colors">
                          <Eye className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> View
                        </button>
                        {app.status === "Approved" && (
                          <button className="px-2 py-1 sm:px-3 sm:py-1 bg-teal-100 text-teal-700 rounded-lg text-xs sm:text-sm hover:bg-teal-200 flex items-center transition-colors">
                            <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />{" "}
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4 sm:space-y-6">
              {/* Recent Activities */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Recent Activities
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="flex gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          activity.type === "application"
                            ? "bg-teal-500"
                            : activity.type === "payment"
                            ? "bg-blue-500"
                            : activity.type === "document"
                            ? "bg-purple-500"
                            : "bg-orange-500"
                        }`}
                      ></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs sm:text-sm text-gray-800">
                          {activity.action}
                        </p>
                        <p className="text-xs text-gray-500">
                          {activity.user} • {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Events */}
              <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 sm:mb-4">
                  Upcoming Events
                </h2>
                <div className="space-y-3 sm:space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 text-xs sm:text-sm">
                          {event.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {event.date} at {event.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reminders Section */}
              <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
                  <h2 className="text-base sm:text-lg font-semibold text-teal-800">
                    Reminders
                  </h2>
                </div>
                <ul className="list-disc list-inside text-teal-700 text-xs sm:text-sm space-y-1">
                  <li>
                    Renew your business permit before January 20, 2026 to avoid
                    penalties.
                  </li>
                  <li>Check your email regularly for inspection schedules.</li>
                  <li>
                    Update your business profile to keep your information
                    accurate.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
