import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  FileText,
  User,
  MapPin,
  Building,
  Upload,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import SidebarCitizen from "./Sidebar";
import NavbarCitizen from "./Navbar";
import BusinessInformationForm from "./BusinessInformationForm";
import RenewalForm from "./RenewalForm";
import QuarterlyReportForm from "./QuarterlyReportForm";
import ChangeRequestForm from "./ChangeRequestForm";
import RetirementForm from "./RetirementForm";
import DelinquentForm from "./DelinquentForm";
import DocumentUpload from "./DocumentUpload";
import ReviewSummary from "./ReviewSummary";

const BusinessApplication = () => {
  const [step, setStep] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [formData, setFormData] = useState({
    // Business Information
    businessType: "",
    dtiSecCdaNumber: "",
    businessName: "",
    tradeName: "",
    taxIdNumber: "",

    // Owner Information
    firstName: "",
    middleName: "",
    lastName: "",
    extension: "",
    sex: "",
    email: "",
    telephone: "",
    mobile: "",

    // Business Address
    region: "",
    province: "",
    city: "",
    barangay: "",
    addressLine1: "",
    zipCode: "",

    // Business Operation
    businessArea: "",
    employeesInArea: "",
    maleEmployees: "",
    femaleEmployees: "",
    vanDeliveryVehicles: "",
    truckDeliveryVehicles: "",
    motorcycleDeliveryVehicles: "",

    // Taxpayer Address
    sameAsBusinessAddress: false,
    taxpayerRegion: "",
    taxpayerProvince: "",
    taxpayerCity: "",
    taxpayerBarangay: "",
    taxpayerAddressLine1: "",
    taxpayerZipCode: "",

    // Property Details
    ownProperty: null,
    lessorName: "",
    monthlyRental: "",
    taxIncentives: null,

    // Business Activity
    businessActivity: "",
    lineOfBusiness: "",
    productsServices: "",
    numberOfUnits: "",
    totalCapitalization: "",
  });

  const [documents, setDocuments] = useState({});

  // Sidebar toggle state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const transactionTypes = [
    {
      id: "NEW",
      title: "New Application",
      description: "For businesses applying for their first permit",
      icon: FileText,
      features: [
        "Complete document requirements",
        "Initial business registration",
        "Full compliance verification",
      ],
    },
    {
      id: "RENEWAL",
      title: "Renewal",
      description: "For existing businesses renewing their permit",
      icon: CheckCircle,
      features: [
        "Simplified requirements",
        "Previous permit required",
        "Updated documentation only",
      ],
    },
    {
      id: "QUARTERLY",
      title: "Quarterly Report",
      description: "Submit quarterly business reports",
      icon: FileText,
      features: [
        "Sales report submission",
        "Tax compliance update",
        "Operational status report",
      ],
    },
    {
      id: "DELINQUENT",
      title: "Delinquent",
      description: "For businesses with overdue permits",
      icon: AlertCircle,
      features: [
        "Penalty assessment",
        "Overdue permit processing",
        "Compliance restoration",
      ],
    },
    {
      id: "CHANGE_REQUEST",
      title: "Change Request",
      description: "Modify existing business information",
      icon: Building,
      features: [
        "Business name change",
        "Address modification",
        "Ownership transfer",
      ],
    },
    {
      id: "RETIREMENT",
      title: "Retirement",
      description: "Cease business operations permanently",
      icon: User,
      features: [
        "Business closure process",
        "Final tax clearance",
        "Permit termination",
      ],
    },
  ];

  const generateApplicationNumber = () => {
    const number = `APP-${Date.now().toString().slice(-6)}`;
    setApplicationNumber(number);
  };

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleFileUpload = (field, file) => {
    setDocuments({ ...documents, [field]: file });
  };

  const nextStep = () => {
    if (step === 1) generateApplicationNumber();
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    alert(`Application ${applicationNumber} submitted successfully!`);
    console.log("Transaction Type:", transactionType);
    console.log("Form Data:", formData);
    console.log("Documents:", documents);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Transaction Type Selection";
      case 2:
        return "Business Information";
      case 3:
        return "Document Upload";
      case 4:
        return "Review & Summary";
      default:
        return "Application";
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <SidebarCitizen isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <NavbarCitizen toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-600 p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                  Business Permit & Licensing System
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                  Local Government Unit - Electronic Business Permit System
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="bg-green-100 px-4 py-2 rounded-lg inline-block">
                  <span className="text-sm font-medium text-green-600">
                    Step {step} of 4
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">
                Application Progress
              </span>
              <span className="text-sm text-gray-500">
                {Math.round((step / 4) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span
                className={`${
                  step >= 3 ? "text-green-600 font-medium" : ""
                } text-center flex-1`}
              >
                Documents
              </span>
              <span
                className={`${
                  step >= 4 ? "text-green-600 font-medium" : ""
                } text-center flex-1`}
              >
                Review
              </span>
            </div>
          </div>

          {/* Step 1: Transaction Type Selection */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="bg-gradient-to-r from-green-600 to-green-600 text-white p-4 sm:p-6 rounded-t-xl">
                <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                  Step 1: Select Transaction Type
                </h2>
                <p className="opacity-90 text-sm sm:text-base">
                  Choose the type of business permit transaction
                </p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {transactionTypes.map((type) => {
                    const IconComponent = type.icon;
                    return (
                      <div
                        key={type.id}
                        className={`border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-200 ${
                          transactionType === type.id
                            ? "border-green-600 bg-green-50 shadow-lg"
                            : "border-gray-300 hover:border-green-600 hover:shadow-md"
                        }`}
                        onClick={() => setTransactionType(type.id)}
                      >
                        <div className="flex items-center mb-4">
                          <div
                            className={`w-4 h-4 rounded-full border-2 mr-3 flex-shrink-0 ${
                              transactionType === type.id
                                ? "bg-green-600 border-green-600"
                                : "border-gray-400"
                            }`}
                          ></div>
                          <IconComponent
                            className={`w-6 h-6 mr-2 ${
                              transactionType === type.id
                                ? "text-green-600"
                                : "text-gray-500"
                            }`}
                          />
                          <h3 className="text-lg font-semibold text-gray-800">
                            {type.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 text-sm sm:text-base mb-4">
                          {type.description}
                        </p>
                        <div className="text-sm text-gray-500 space-y-1">
                          {type.features.map((feature, index) => (
                            <p key={index}>• {feature}</p>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex justify-end mt-6 sm:mt-8">
                  <button
                    onClick={nextStep}
                    disabled={!transactionType}
                    className={`px-6 sm:px-8 py-3 rounded-lg font-semibold transition-all duration-200 text-sm sm:text-base ${
                      transactionType
                        ? "bg-green-600 text-white hover:bg-green-700 shadow-lg"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continue to Information →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {step === 2 && (
            <div>
              {transactionType === "NEW" && (
                <BusinessInformationForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {transactionType === "RENEWAL" && (
                <RenewalForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {transactionType === "QUARTERLY" && (
                <QuarterlyReportForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {transactionType === "DELINQUENT" && (
                <DelinquentForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {transactionType === "CHANGE_REQUEST" && (
                <ChangeRequestForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {transactionType === "RETIREMENT" && (
                <RetirementForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
                <button
                  onClick={prevStep}
                  className="order-2 sm:order-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold text-sm sm:text-base"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  className="order-1 sm:order-2 bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg text-sm sm:text-base"
                >
                  Continue to Documents →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Document Upload */}
          {step === 3 && (
            <div>
              <DocumentUpload
                applicationNumber={applicationNumber}
                documents={documents}
                handleFileUpload={handleFileUpload}
              />
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-6 sm:mt-8">
                <button
                  onClick={prevStep}
                  className="order-2 sm:order-1 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold text-sm sm:text-base"
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  className="order-1 sm:order-2 bg-green-600 text-white px-6 sm:px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg text-sm sm:text-base"
                >
                  Continue to Review →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review Summary */}
          {step === 4 && (
            <div>
              <ReviewSummary
                applicationNumber={applicationNumber}
                formData={formData}
                documents={documents}
                onSubmit={handleSubmit}
              />
              <div className="flex justify-start mt-6">
                <button
                  onClick={prevStep}
                  className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold text-sm sm:text-base"
                >
                  ← Back to Documents
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BusinessApplication;
