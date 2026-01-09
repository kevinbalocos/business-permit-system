import React, { useState, useEffect } from "react";
import {
  FileText,
  Search,
  Filter,
  Download,
  Eye,
  Upload,
  Plus,
  MoreVertical,
  Calendar,
  User,
  FolderOpen,
  Trash2,
  Edit,
  Check,
  X,
  Clock,
  AlertCircle,
  MessageSquare,
  RefreshCw,
} from "lucide-react";
import Sidebar from "./Sidebar"; // Adjust path as needed
import Navbar from "./Navbar"; // Adjust path as needed

const DocumentsPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false); // New state for document viewing
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [approvalComment, setApprovalComment] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mobile-only: toggle right (payment) panel visibility
  const [showPaymentPanelMobile, setShowPaymentPanelMobile] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Fetch applications from the API
  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/admin/applications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setDocuments(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch applications");
      }
    } catch (err) {
      console.error("Error fetching applications:", err);
      setError(err.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  // Fetch single document details for viewing
  const fetchDocumentDetails = async (documentId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/applications/${documentId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        return data.data;
      } else {
        throw new Error(data.message || "Failed to fetch document details");
      }
    } catch (err) {
      console.error("Error fetching document details:", err);
      alert(`Failed to load document details: ${err.message}`);
      return null;
    }
  };

  // Load applications on component mount
  useEffect(() => {
    fetchApplications();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "under_review":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "normal":
        return "bg-blue-100 text-blue-800";
      case "low":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <Check className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "rejected":
        return <X className="w-4 h-4 text-red-600" />;
      case "under_review":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case "completed":
        return <Check className="w-4 h-4 text-purple-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (doc.applicationNumber &&
        doc.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesFilter =
      filterType === "all" ||
      doc.status === filterType ||
      doc.type.toLowerCase().includes(filterType.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  // Handle viewing a document
  const handleViewDocument = async (document) => {
    const detailedDocument = await fetchDocumentDetails(document.id);
    if (detailedDocument) {
      setSelectedDocument(detailedDocument);
      setShowDocumentModal(true);
    }
  };

  // Handle document actions (approve/reject)
  const handleDocumentAction = (document, action) => {
    setSelectedDocument(document);
    setApprovalComment("");

    if (action === "approve" || action === "reject") {
      setShowApprovalModal(true);
    }
  };

  const confirmDocumentAction = async (action) => {
    if (!selectedDocument) return;

    try {
      const endpoint = action === "rejected" ? "reject" : "approve";
      const response = await fetch(
        `http://localhost:5000/api/admin/applications/${selectedDocument.id}/${endpoint}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            adminNotes: approvalComment,
            rejectionReason:
              action === "rejected" ? approvalComment : undefined,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        // Update the local state
        setDocuments((prevDocs) =>
          prevDocs.map((doc) =>
            doc.id === selectedDocument.id
              ? {
                  ...doc,
                  status: action,
                  adminNotes: approvalComment,
                  reviewedDate: new Date().toISOString().split("T")[0],
                  approvedAt:
                    action === "approved" ? data.approvedAt : doc.approvedAt,
                  rejectedAt:
                    action === "rejected" ? data.rejectedAt : doc.rejectedAt,
                }
              : doc
          )
        );

        // Reset modal and inputs
        setShowApprovalModal(false);
        setSelectedDocument(null);
        setApprovalComment("");

        alert(`Application ${action} successfully!`);
      } else {
        throw new Error(data.message || `Failed to ${action} application`);
      }
    } catch (err) {
      console.error(`Error ${action}ing application:`, err);
      alert(`Failed to ${action} application: ${err.message}`);
    }
  };

  // Download document function
  const handleDownloadDocument = async (doc) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/applications/${doc.id}/download`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = window.document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `${doc.name}_${doc.applicationNumber}.pdf`;
      window.document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      window.document.body.removeChild(a);
    } catch (err) {
      console.error("Error downloading document:", err);
      alert(`Failed to download document: ${err.message}`);
    }
  };

  const pendingCount = documents.filter((d) => d.status === "pending").length;
  const underReviewCount = documents.filter(
    (d) => d.status === "under_review"
  ).length;
  const approvedCount = documents.filter((d) => d.status === "approved").length;
  const rejectedCount = documents.filter((d) => d.status === "rejected").length;

  // Loading state
  if (loading) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-teal-600 mx-auto mb-4" />
              <p className="text-gray-600">Loading applications...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />
        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-br from-teal-50 to-emerald-100 flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="w-8 h-8 text-red-600 mx-auto mb-4" />
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchApplications}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isCollapsed={sidebarCollapsed} toggleSidebar={toggleSidebar} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />

        {/* Main Content with Scroll */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-teal-50 to-emerald-100">
          {/* Header */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-0 z-10">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Document Management
                </h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">
                  Review and approve citizen document submissions
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={fetchApplications}
                  className="flex items-center gap-2 px-3 py-2 text-sm bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
                <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                  {pendingCount + underReviewCount} Pending Review
                </div>
              </div>
            </div>
          </div>

          {/* Filters and Search */}
          <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 sticky top-[73px] sm:top-[89px] z-10">
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search by applicant name, business name, application number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
                />
              </div>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent text-sm"
              >
                <option value="all">All Applications</option>
                <option value="pending">Pending</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="completed">Completed</option>
                <option value="business permit">Business Permits</option>
                <option value="barangay certificate">Certificates</option>
                <option value="building permit">Building Permits</option>
              </select>
            </div>
          </div>

          {/* Document Stats */}
          <div className="px-4 sm:px-6 py-4">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Pending Review</p>
                    <p className="text-lg sm:text-2xl font-semibold text-yellow-600">{pendingCount}</p>
                  </div>
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Under Review</p>
                    <p className="text-lg sm:text-2xl font-semibold text-blue-600">{underReviewCount}</p>
                  </div>
                  <AlertCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Approved</p>
                    <p className="text-lg sm:text-2xl font-semibold text-green-600">{approvedCount}</p>
                  </div>
                  <Check className="w-6 h-6 sm:w-8 sm:h-8 text-green-500" />
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-lg shadow-sm border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600">Rejected</p>
                    <p className="text-lg sm:text-2xl font-semibold text-red-600">{rejectedCount}</p>
                  </div>
                  <X className="w-6 h-6 sm:w-8 sm:h-8 text-red-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Documents List - Mobile Optimized */}
          <div className="px-4 sm:px-6 pb-6 mb-15 sm:mb-0">
            <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-sm border border-white/20 overflow-hidden">
              {filteredDocuments.length === 0 ? (
                <div className="p-8 text-center">
                  <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No applications found</p>
                  <p className="text-sm text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table View */}
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application Details</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Submitted</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {filteredDocuments.map((document) => (
                          <tr key={document.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0">{getStatusIcon(document.status)}</div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-gray-900">{document.name}</div>
                                  <div className="text-sm text-gray-500">{document.type} • {document.applicationNumber}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{document.submittedBy}</div>
                              <div className="text-sm text-gray-500">{document.email}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                                {getStatusIcon(document.status)}
                                {document.status.replace("_", " ").toUpperCase()}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(document.dateSubmitted).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(document.priority)}`}>{document.priority.toUpperCase()}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex items-center gap-2 justify-end">
                                <button onClick={() => handleViewDocument(document)} className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50" title="View Document"><Eye className="w-4 h-4" /></button>
                                <button onClick={() => handleDownloadDocument(document)} className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50" title="Download"><Download className="w-4 h-4" /></button>
                                {document.status === "pending" && (
                                  <>
                                    <button onClick={() => handleDocumentAction(document, "approve")} className="text-green-600 hover:text-green-900 p-1 rounded hover:bg-green-50" title="Approve"><Check className="w-4 h-4" /></button>
                                    <button onClick={() => handleDocumentAction(document, "reject")} className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50" title="Reject"><X className="w-4 h-4" /></button>
                                  </>
                                )}
                                <button className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50"><MoreVertical className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile Card View */}
                  <div className="lg:hidden divide-y divide-gray-200">
                    {filteredDocuments.map((document) => (
                      <div key={document.id} className="p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(document.status)}
                            <div>
                              <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{document.name}</h3>
                              <p className="text-xs text-gray-500">{document.applicationNumber}</p>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600"><MoreVertical className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-sm">
                            <User className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-900">{document.submittedBy}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{new Date(document.dateSubmitted).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-gray-400" />
                            <span className="text-gray-600">{document.type}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                              {getStatusIcon(document.status)}
                              {document.status.replace("_", " ").toUpperCase()}
                            </span>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(document.priority)}`}>{document.priority.toUpperCase()}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button onClick={() => handleViewDocument(document)} className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50" title="View Document"><Eye className="w-4 h-4" /></button>
                            <button onClick={() => handleDownloadDocument(document)} className="text-gray-600 hover:text-gray-700 p-1 rounded hover:bg-gray-50" title="Download"><Download className="w-4 h-4" /></button>
                            {document.status === "pending" && (
                              <>
                                <button onClick={() => handleDocumentAction(document, "approve")} className="text-green-600 hover:text-green-700 p-1 rounded hover:bg-green-50" title="Approve"><Check className="w-4 h-4" /></button>
                                <button onClick={() => handleDocumentAction(document, "reject")} className="text-red-600 hover:text-red-700 p-1 rounded hover:bg-red-50" title="Reject"><X className="w-4 h-4" /></button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Document View Modal - FULL VIEW with 70/30 split */}
      {showDocumentModal && selectedDocument && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-0 z-50">
          {/* full-screen modal container */}
          <div className="bg-white w-full h-full overflow-hidden md:rounded-lg shadow-xl flex flex-col">
            {/* top bar - close + mobile payment toggle */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{selectedDocument.name}</h3>
                <p className="text-sm text-gray-500 mt-0.5">{selectedDocument.applicationNumber} • {selectedDocument.type}</p>
              </div>

              <div className="flex items-center gap-2">
                {/* mobile-only toggle for right panel */}
                <button
                  onClick={() => setShowPaymentPanelMobile((s) => !s)}
                  className="md:hidden px-3 py-1 text-sm bg-gray-100 rounded-md border"
                >
                  {showPaymentPanelMobile ? 'Hide Payment' : 'Show Payment'}
                </button>

                <button
                  onClick={() => {
                    setShowDocumentModal(false);
                    setSelectedDocument(null);
                    setShowPaymentPanelMobile(false);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* content: left 70% / right 30% */}
            <div className="flex-1 flex flex-col md:flex-row h-full">
              {/* left - 70% (on md and up) - main details and inputs */}
              <div className="w-full md:w-[70%] p-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Application Info (inputs/read-only as requested) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Applicant Name</label>
                      <input
                        value={selectedDocument.submittedBy}
                        readOnly
                        className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        value={selectedDocument.email}
                        readOnly
                        className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Application Type</label>
                      <input value={selectedDocument.type} readOnly className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Submitted</label>
                      <input value={new Date(selectedDocument.dateSubmitted).toLocaleDateString()} readOnly className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <div className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(selectedDocument.status)}`}>
                        {getStatusIcon(selectedDocument.status)}
                        {selectedDocument.status.replace("_", " ").toUpperCase()}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedDocument.priority)}`}>
                        {selectedDocument.priority.toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Business Details (if applicable) */}
                  {selectedDocument.businessName && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Business Information</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                          <input value={selectedDocument.businessName} readOnly className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                        </div>
                        {selectedDocument.businessAddress && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                            <input value={selectedDocument.businessAddress} readOnly className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          </div>
                        )}
                        {selectedDocument.businessType && (
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                            <input value={selectedDocument.businessType} readOnly className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Purpose */}
                  {selectedDocument.purpose && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                      <textarea readOnly value={selectedDocument.purpose} className="text-sm text-gray-900 w-full px-3 py-2 border border-gray-300 rounded-md bg-white" rows={4} />
                    </div>
                  )}

                  {/* Documents/Attachments */}
                  {selectedDocument.documents && selectedDocument.documents.length > 0 && (
                    <div>
                      <h4 className="text-lg font-medium text-gray-900 mb-3">Attached Documents</h4>
                      <div className="space-y-2">
                        {selectedDocument.documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-gray-400" />
                              <div>
                                <p className="text-sm font-medium text-gray-900">{doc.name || `Document ${index + 1}`}</p>
                                <p className="text-xs text-gray-500">{doc.type || "File"}</p>
                              </div>
                            </div>
                            <button onClick={() => handleDownloadDocument(selectedDocument)} className="text-blue-600 hover:text-blue-700 p-1 rounded hover:bg-blue-50"><Download className="w-4 h-4" /></button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Admin Notes / Rejection Reason */}
                  {selectedDocument.adminNotes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Admin Notes</label>
                      <p className="text-sm text-gray-900 bg-blue-50 p-3 rounded-md">{selectedDocument.adminNotes}</p>
                    </div>
                  )}

                  {selectedDocument.rejectionReason && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Rejection Reason</label>
                      <p className="text-sm text-gray-900 bg-red-50 p-3 rounded-md">{selectedDocument.rejectionReason}</p>
                    </div>
                  )}

                  {/* Timeline */}
                  <div>
                    <h4 className="text-lg font-medium text-gray-900 mb-3">Timeline</h4>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">Application Submitted</p>
                          <p className="text-xs text-gray-500">{new Date(selectedDocument.dateSubmitted).toLocaleString()}</p>
                        </div>
                      </div>
                      {selectedDocument.reviewedDate && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Under Review</p>
                            <p className="text-xs text-gray-500">{new Date(selectedDocument.reviewedDate).toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                      {selectedDocument.approvedAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Approved</p>
                            <p className="text-xs text-gray-500">{new Date(selectedDocument.approvedAt).toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                      {selectedDocument.rejectedAt && (
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">Rejected</p>
                            <p className="text-xs text-gray-500">{new Date(selectedDocument.rejectedAt).toLocaleString()}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* right - 30% (on md and up) - payment / future data */}
              {/* hidden on small screens unless toggled */}
              <div className={`w-full md:w-[30%] bg-gray-50 border-l border-gray-200 p-6 overflow-y-auto ${showPaymentPanelMobile ? 'block' : 'hidden'} md:block`}>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-gray-900">Payment / Future Data</h4>
                  <span className="text-xs text-gray-500">Preview</span>
                </div>

                {/* placeholder fields for future payment info - replace with real fields later */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <div className="text-sm text-gray-700">{selectedDocument.paymentStatus || 'Not recorded'}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount Due</label>
                    <div className="text-sm text-gray-700">{selectedDocument.amountDue ? `₱ ${selectedDocument.amountDue}` : '—'}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Receipt / Reference</label>
                    <div className="text-sm text-gray-700">{selectedDocument.paymentReference || '—'}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <div className="text-sm text-gray-700">{selectedDocument.paymentMethod || '—'}</div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <div className="text-sm text-gray-700 bg-white p-3 rounded-md">{selectedDocument.paymentNotes || 'No notes'}</div>
                  </div>

                  {/* example action */}
                  <div className="pt-4 border-t border-gray-200">
                    <button onClick={() => alert('Open payment flow (placeholder)')} className="w-full px-4 py-2 rounded-md bg-teal-600 text-white text-sm">Open Payment Flow</button>
                  </div>
                </div>
              </div>
            </div>

            {/* footer actions - always visible */}
            <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end rounded-b-lg border-t border-gray-200">
              <button onClick={() => handleDownloadDocument(selectedDocument)} className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">
                <Download className="w-4 h-4" />
                Download
              </button>

              {selectedDocument.status === "pending" && (
                <>
                  <button onClick={() => { setShowDocumentModal(false); handleDocumentAction(selectedDocument, "reject"); }} className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700">Reject</button>
                  <button onClick={() => { setShowDocumentModal(false); handleDocumentAction(selectedDocument, "approve"); }} className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">Approve</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Approval/Rejection Modal (unchanged) */}
      {showApprovalModal && selectedDocument && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Review Application</h3>
              <p className="text-sm text-gray-500 mt-1">{selectedDocument.name}</p>
            </div>

            <div className="px-6 py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Notes / Comments</label>
                <textarea value={approvalComment} onChange={(e) => setApprovalComment(e.target.value)} placeholder="Add your comments or rejection reason..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent" rows={4} />
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 flex gap-3 justify-end rounded-b-lg">
              <button onClick={() => { setShowApprovalModal(false); setSelectedDocument(null); setApprovalComment(""); }} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50">Cancel</button>
              <button onClick={() => confirmDocumentAction("rejected")} className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700">Reject</button>
              <button onClick={() => confirmDocumentAction("approved")} className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700">Approve</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentsPage;
