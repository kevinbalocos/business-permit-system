import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SidebarCitizen from "./LeftSidebar";
import NavbarCitizen from "./Navbar";
import RightSidebar from "./RightSidebar";

const MOBILE_ICON_SIZE = 44;

const PermitRelease = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showMobileFooter, setShowMobileFooter] = useState(true);
  const [mobileIconPos, setMobileIconPos] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  
  const navigate = useNavigate();
  const draggingRef = useRef(false);
  const dragStateRef = useRef(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Mobile footer and icon position logic
  useEffect(() => {
    try {
      const saved = localStorage.getItem("permitReleaseMobileFooterVisible");
      if (saved !== null) setShowMobileFooter(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "permitReleaseMobileFooterVisible",
        JSON.stringify(showMobileFooter)
      );
    } catch (e) {}
  }, [showMobileFooter]);

  const getDefaultIconPos = () => {
    const padding = 16;
    const defaultX = Math.max(
      (typeof window !== "undefined" ? window.innerWidth : 360) -
        MOBILE_ICON_SIZE -
        padding,
      padding
    );
    const defaultY = Math.max(
      (typeof window !== "undefined" ? window.innerHeight : 760) -
        MOBILE_ICON_SIZE -
        (padding + 24),
      padding
    );
    return { x: defaultX, y: defaultY };
  };

  useEffect(() => {
    try {
      const saved = localStorage.getItem("permitReleaseMobileIconPos");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (typeof parsed.x === "number" && typeof parsed.y === "number") {
          setMobileIconPos(parsed);
          return;
        }
      }
    } catch (e) {}

    const setDefault = () => {
      setMobileIconPos(getDefaultIconPos());
    };

    if (typeof window !== "undefined") setDefault();
  }, []);

  const clampToViewport = (x, y) => {
    const padding = 8;
    const maxX = Math.max(
      (typeof window !== "undefined" ? window.innerWidth : 360) -
        MOBILE_ICON_SIZE -
        padding,
      padding
    );
    const maxY = Math.max(
      (typeof window !== "undefined" ? window.innerHeight : 760) -
        MOBILE_ICON_SIZE -
        padding,
      padding
    );
    const nx = Math.min(Math.max(x, padding), maxX);
    const ny = Math.min(Math.max(y, padding), maxY);
    return { x: nx, y: ny };
  };

  useEffect(() => {
    const onResize = () => {
      if (!mobileIconPos) return;
      const clamped = clampToViewport(mobileIconPos.x, mobileIconPos.y);
      if (clamped.x !== mobileIconPos.x || clamped.y !== mobileIconPos.y) {
        setMobileIconPos(clamped);
        try {
          localStorage.setItem(
            "permitReleaseMobileIconPos",
            JSON.stringify(clamped)
          );
        } catch (e) {}
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileIconPos]);

  // Drag handlers
  const onPointerDownIcon = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (!mobileIconPos) return;
    e.currentTarget.setPointerCapture &&
      e.currentTarget.setPointerCapture(e.pointerId);
    draggingRef.current = true;
    dragStateRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      origX: mobileIconPos.x,
      origY: mobileIconPos.y,
      moved: false,
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  };

  const onPointerMove = (e) => {
    if (!dragStateRef.current) return;
    const dx = e.clientX - dragStateRef.current.startX;
    const dy = e.clientY - dragStateRef.current.startY;
    if (!dragStateRef.current.moved) {
      const dist = Math.hypot(dx, dy);
      if (dist > 4) dragStateRef.current.moved = true;
    }
    const newX = dragStateRef.current.origX + dx;
    const newY = dragStateRef.current.origY + dy;
    const clamped = clampToViewport(newX, newY);
    setMobileIconPos(clamped);
  };

  const onPointerUp = (e) => {
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);

    const moved = dragStateRef.current?.moved;
    draggingRef.current = false;
    dragStateRef.current = null;

    try {
      if (mobileIconPos)
        localStorage.setItem(
          "permitReleaseMobileIconPos",
          JSON.stringify(mobileIconPos)
        );
    } catch (err) {}

    if (!moved) {
      setShowMobileFooter(true);
    }
  };

  // Sidebar data
  const recentActivities = [
    {
      type: "permit",
      action: "Permit released",
      user: "Admin",
      time: "2h ago",
    },
    {
      type: "application",
      action: "Application approved",
      user: "You",
      time: "1d ago",
    },
    {
      type: "payment",
      action: "Payment confirmed",
      user: "System",
      time: "2d ago",
    },
  ];

  const upcomingEvents = [
    { title: "Business Fair", date: "Sept 15", time: "9:00 AM" },
    { title: "Permit Renewal Deadline", date: "Dec 31", time: "11:59 PM" },
  ];

  const reminders = [
    "Check permit status", 
    "Download released permits",
    "Renew before expiration"
  ];

  // Sample permit data
  const permits = [
    {
      id: "PER-2024-001",
      businessName: "ABC Trading Corp",
      type: "Business Permit",
      status: "READY_FOR_RELEASE",
      dateApplied: "2024-01-15",
      dateReleased: null,
      expiryDate: "2024-12-31",
    },
    {
      id: "PER-2024-002", 
      businessName: "XYZ Restaurant",
      type: "Business Permit",
      status: "RELEASED",
      dateApplied: "2024-01-20",
      dateReleased: "2024-02-01",
      expiryDate: "2024-12-31",
    },
    {
      id: "PER-2024-003",
      businessName: "Tech Solutions Inc",
      type: "Business Permit", 
      status: "PROCESSING",
      dateApplied: "2024-02-01",
      dateReleased: null,
      expiryDate: "2024-12-31",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "RELEASED":
        return <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />;
      case "READY_FOR_RELEASE":
        return <Download className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />;
      case "PROCESSING":
        return <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "RELEASED":
        return `${baseClasses} bg-green-100 text-green-800`;
      case "READY_FOR_RELEASE":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "PROCESSING":
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  const filteredPermits = permits.filter((permit) => {
    const matchesSearch = permit.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         permit.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || permit.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDownload = (permitId) => {
    // Placeholder for download functionality
    console.log(`Downloading permit: ${permitId}`);
    // In a real app, you would fetch and download the permit file
  };

  return (
    <div className="flex h-screen bg-white">
      <SidebarCitizen isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        <div className="shrink-0">
          <NavbarCitizen toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 flex flex-col mb-20 sm:mb-0">
            <div className="flex-1">
              {/* Header */}
              <div className="mb-4 sm:mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Permit Release
                </h1>
                <p className="text-sm sm:text-base text-gray-600">
                  View and download your business permits
                </p>
              </div>

              {/* Search and Filter */}
              <div className="mb-4 sm:mb-6 flex flex-col gap-3 sm:gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <input
                    type="text"
                    placeholder="Search permits..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
                
                <div className="relative sm:w-auto">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full sm:w-auto pl-10 pr-8 py-2.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent appearance-none bg-white text-sm sm:text-base"
                  >
                    <option value="ALL">All Status</option>
                    <option value="RELEASED">Released</option>
                    <option value="READY_FOR_RELEASE">Ready for Release</option>
                    <option value="PROCESSING">Processing</option>
                  </select>
                </div>
              </div>

              {/* Permits List - Desktop Table */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden hidden sm:block">
                {filteredPermits.length === 0 ? (
                  <div className="p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No permits found
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm || statusFilter !== "ALL" 
                        ? "Try adjusting your search or filters"
                        : "You don't have any permits yet"}
                    </p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Permit Details
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Dates
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredPermits.map((permit) => (
                          <tr key={permit.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4">
                              <div>
                                <div className="text-sm font-medium text-gray-900">
                                  {permit.businessName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {permit.id} • {permit.type}
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {getStatusIcon(permit.status)}
                                <span className={getStatusBadge(permit.status)}>
                                  {permit.status.replace(/_/g, " ")}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              <div>Applied: {permit.dateApplied}</div>
                              {permit.dateReleased && (
                                <div>Released: {permit.dateReleased}</div>
                              )}
                              <div>Expires: {permit.expiryDate}</div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                {permit.status === "RELEASED" && (
                                  <button
                                    onClick={() => handleDownload(permit.id)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                                  >
                                    <Download className="w-4 h-4" />
                                    Download
                                  </button>
                                )}
                                {permit.status === "READY_FOR_RELEASE" && (
                                  <button
                                    onClick={() => handleDownload(permit.id)}
                                    className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                  >
                                    <Download className="w-4 h-4" />
                                    Collect
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Permits List - Mobile Cards */}
              <div className="sm:hidden space-y-4">
                {filteredPermits.length === 0 ? (
                  <div className="p-6 text-center bg-white rounded-lg border border-gray-200">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      No permits found
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {searchTerm || statusFilter !== "ALL" 
                        ? "Try adjusting your search or filters"
                        : "You don't have any permits yet"}
                    </p>
                  </div>
                ) : (
                  filteredPermits.map((permit) => (
                    <div key={permit.id} className="bg-white rounded-lg border border-gray-200 shadow-sm p-4">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {permit.businessName}
                          </h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {permit.id} • {permit.type}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          {getStatusIcon(permit.status)}
                        </div>
                      </div>

                      {/* Status Badge */}
                      <div className="mb-3">
                        <span className={getStatusBadge(permit.status)}>
                          {permit.status.replace(/_/g, " ")}
                        </span>
                      </div>

                      {/* Dates */}
                      <div className="space-y-1 mb-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Applied:</span>
                          <span className="text-gray-900">{permit.dateApplied}</span>
                        </div>
                        {permit.dateReleased && (
                          <div className="flex justify-between text-xs">
                            <span className="text-gray-500">Released:</span>
                            <span className="text-gray-900">{permit.dateReleased}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Expires:</span>
                          <span className="text-gray-900">{permit.expiryDate}</span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        {permit.status === "RELEASED" && (
                          <button
                            onClick={() => handleDownload(permit.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Download
                          </button>
                        )}
                        {permit.status === "READY_FOR_RELEASE" && (
                          <button
                            onClick={() => handleDownload(permit.id)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <Download className="w-4 h-4" />
                            Collect
                          </button>
                        )}
                        {permit.status === "PROCESSING" && (
                          <div className="flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm bg-gray-100 text-gray-500 rounded-lg">
                            <Clock className="w-4 h-4" />
                            Processing...
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </main>

          <aside className="bg-white w-72 hidden lg:flex flex-col overflow-y-auto p-3 sm:p-4">
            <RightSidebar
              recentActivities={recentActivities}
              upcomingEvents={upcomingEvents}
              reminders={reminders}
            />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default PermitRelease;