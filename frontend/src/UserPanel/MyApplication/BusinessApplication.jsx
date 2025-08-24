import React, { useState } from "react";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Building,
  User,
} from "lucide-react";

import SidebarCitizen from "../LeftSidebar";
import NavbarCitizen from "../Navbar";
import RightSidebar from "../RightSidebar";

import BusinessInformationForm from "./BusinessInformationForm";
import RenewalForm from "./RenewalForm";
import QuarterlyReportForm from "./QuarterlyReportForm";
import ChangeRequestForm from "./ChangeRequestForm";
import RetirementForm from "./RetirementForm";
import DelinquentForm from "./DelinquentForm";
import DocumentUpload from "./DocumentUpload";
import ReviewSummary from "./ReviewSummary";

// ✅ Import images
import imgNew from "../../assets/authentication.jpg";
import imgRenewal from "../../assets/authentication2.jpg";
import imgQuarterly from "../../assets/authentication3.jpg";
import imgDelinquent from "../../assets/authentication4.jpg";
import imgChangeRequest from "../../assets/RANKINGsystemicon.jpg";
import imgRetirement from "../../assets/abstract-entrypage-bg.png";

const BusinessApplication = () => {
  const [step, setStep] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [formData, setFormData] = useState({
    businessType: "",
    businessName: "",
    firstName: "",
    lastName: "",
    city: "",
    addressLine1: "",
  });

  const [documents, setDocuments] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Sidebar sample data
  const recentActivities = [
    {
      type: "application",
      action: "Submitted new application",
      user: "You",
      time: "2h ago",
    },
    {
      type: "payment",
      action: "Paid renewal fee",
      user: "Admin",
      time: "1d ago",
    },
  ];
  const upcomingEvents = [
    { title: "Business Fair", date: "Sept 15", time: "9:00 AM" },
  ];
  const reminders = ["Submit quarterly report", "Renew before Dec 31"];

  // ✅ Assign specific images per transaction type
  const transactionTypes = [
    {
      id: "NEW",
      title: "New Application",
      description: "For businesses applying for their first permit",
      icon: FileText,
      image: imgNew,
    },
    {
      id: "RENEWAL",
      title: "Renewal",
      description: "For existing businesses renewing their permit",
      icon: CheckCircle,
      image: imgRenewal,
    },
    {
      id: "QUARTERLY",
      title: "Quarterly Report",
      description: "Submit quarterly reports",
      icon: FileText,
      image: imgQuarterly,
    },
    {
      id: "DELINQUENT",
      title: "Delinquent",
      description: "For overdue permits",
      icon: AlertCircle,
      image: imgDelinquent,
    },
    {
      id: "CHANGE_REQUEST",
      title: "Change Request",
      description: "Modify existing business info",
      icon: Building,
      image: imgChangeRequest,
    },
    {
      id: "RETIREMENT",
      title: "Retirement",
      description: "Cease operations permanently",
      icon: User,
      image: imgRetirement,
    },
  ];

  const generateApplicationNumber = () => {
    setApplicationNumber(`APP-${Date.now().toString().slice(-6)}`);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setDocuments({ ...documents, [field]: file });
  };

  // safer navigation helpers
  const nextStep = () => {
    if (step === 1) generateApplicationNumber();
    if (step < 4) setStep((s) => s + 1);
  };
  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleSubmit = () => {
    alert(`Application ${applicationNumber} submitted!`);
    console.log("Transaction Type:", transactionType);
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Left Sidebar */}
      <SidebarCitizen isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      {/* Main + Right */}
      <div className="flex flex-1 flex-col">
        {/* Navbar */}
        <div className="shrink-0">
          <NavbarCitizen toggleSidebar={toggleSidebar} />
        </div>

        {/* Content area fills remaining height */}
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 flex flex-col">
            <div className="flex-1">
              {step === 1 && (
                <div className="bg-white p-4 flex flex-col min-h-full">
                  <h2 className="text-xl font-bold mb-4">
                    Step 1: Select Transaction Type
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
                    {transactionTypes.map((t) => {
                      const Icon = t.icon;
                      return (
                        <div
                          key={t.id}
                          onClick={() => setTransactionType(t.id)}
                          className={`p-4 border rounded-lg cursor-pointer transition transform hover:scale-[1.02] ${
                            transactionType === t.id
                              ? "border-teal-600 bg-teal-50"
                              : "border-gray-200"
                          }`}
                        >
                          {/* ✅ Unique Image */}
                          <div className="mb-3">
                            <img
                              src={t.image}
                              alt={`${t.title} illustration`}
                              className="w-full h-56 object-cover rounded-md"
                            />
                          </div>

                          <div className="flex items-center gap-2 mb-2">
                            <Icon className="w-5 h-5 text-teal-600" />
                            <h3 className="font-semibold">{t.title}</h3>
                          </div>
                          <p className="text-sm text-gray-600">
                            {t.description}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ✅ Render different form based on selection */}
              {step === 2 && transactionType === "NEW" && (
                <BusinessInformationForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {step === 2 && transactionType === "RENEWAL" && (
                <RenewalForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {step === 2 && transactionType === "QUARTERLY" && (
                <QuarterlyReportForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 2 && transactionType === "DELINQUENT" && (
                <DelinquentForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 2 && transactionType === "CHANGE_REQUEST" && (
                <ChangeRequestForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 2 && transactionType === "RETIREMENT" && (
                <RetirementForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 3 && (
                <DocumentUpload
                  applicationNumber={applicationNumber}
                  documents={documents}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {step === 4 && (
                <ReviewSummary
                  applicationNumber={applicationNumber}
                  formData={formData}
                  documents={documents}
                  onSubmit={handleSubmit}
                />
              )}
            </div>

            {/* FOOTER / NAV CONTROLS */}
            <div className="mt-4 border-t pt-4 flex items-center justify-between">
              <div>
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`px-4 py-2 rounded-lg font-semibold mr-2 ${
                    step === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  ← Back
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setTransactionType("");
                  }}
                  className="px-4 py-2 rounded-lg font-semibold bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Start Over
                </button>
              </div>

              <div className="flex items-center gap-3">
                {/* On step 1 show Continue (disabled until transactionType) */}
                {step === 1 && (
                  <button
                    type="button"
                    onClick={nextStep}
                    disabled={!transactionType}
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      transactionType
                        ? "bg-teal-600 text-white hover:bg-teal-700"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue →
                  </button>
                )}

                {/* On steps 2 & 3 show Continue to next step */}
                {(step === 2 || step === 3) && (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-2 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700"
                  >
                    Continue →
                  </button>
                )}

                {/* On final step show Submit */}
                {step === 4 && (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-6 py-2 rounded-lg font-semibold bg-green-600 text-white hover:bg-green-700"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </div>
          </main>

          {/* Right Sidebar */}
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

export default BusinessApplication;
