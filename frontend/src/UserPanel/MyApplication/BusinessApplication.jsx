import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  CheckCircle,
  AlertCircle,
  Building,
  User,
  CreditCard,
  Calculator,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

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
import AcceptTerms from "./AcceptTerms";
import Assessment from "./Assessment"; // New component
import PaymentMethod from "./PaymentMethod"; // New component

// ✅ Import images
import imgNew from "../../assets/authentication.jpg";
import imgRenewal from "../../assets/authentication2.jpg";
import imgQuarterly from "../../assets/authentication3.jpg";
import imgDelinquent from "../../assets/authentication4.jpg";
import imgChangeRequest from "../../assets/RANKINGsystemicon.jpg";
import imgRetirement from "../../assets/abstract-entrypage-bg.png";

const MOBILE_ICON_SIZE = 44;

const BusinessApplication = () => {
  const [step, setStep] = useState(1);
  const [transactionType, setTransactionType] = useState("");
  const [applicationNumber, setApplicationNumber] = useState("");
  const [formData, setFormData] = useState({
    businessType: "",
    dtiSecCdaNumber: "",
    businessName: "",
    taxIdNumber: "",
    tradeName: "",
    firstName: "",
    middleName: "",
    lastName: "",
    extension: "",
    sex: "",
    email: "",
    telephone: "",
    mobile: "",
    region: "",
    province: "",
    city: "",
    barangay: "",
    addressLine1: "",
    taxpayerZipCode: "",
    businessArea: "",
    employeesInArea: "",
    maleEmployees: "",
    femaleEmployees: "",
    vanDeliveryVehicles: "",
    truckDeliveryVehicles: "",
    motorcycleDeliveryVehicles: "",
    sameAsBusinessAddress: false,
    taxpayerRegion: "",
    taxpayerProvince: "",
    taxpayerCity: "",
    taxpayerBarangay: "",
    taxpayerAddressLine1: "",
    ownProperty: false,
    lessorName: "",
    monthlyRental: "",
    taxIncentives: false,
    businessActivity: "",
    lineOfBusiness: "",
    productsServices: "",
    numberOfUnits: "",
    totalCapitalization: "",
    paymentMethod: "", // <-- ADD THIS
    paymentDetails: {},
  });

  const [documents, setDocuments] = useState({});
  const [assessmentData, setAssessmentData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({});
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMobileFooter, setShowMobileFooter] = useState(true);
  const [mobileIconPos, setMobileIconPos] = useState(null);
  const draggingRef = useRef(false);
  const dragStateRef = useRef(null);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Mobile footer and icon position logic (same as before)
  useEffect(() => {
    try {
      const saved = localStorage.getItem("businessAppMobileFooterVisible");
      if (saved !== null) setShowMobileFooter(JSON.parse(saved));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "businessAppMobileFooterVisible",
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
      const saved = localStorage.getItem("businessAppMobileIconPos");
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
            "businessAppMobileIconPos",
            JSON.stringify(clamped)
          );
        } catch (e) {}
      }
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [mobileIconPos]);

  // Drag handlers (same as before)
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
          "businessAppMobileIconPos",
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
    setDocuments((prev) => ({ ...prev, [field]: file }));
  };

  const handleAssessmentGenerated = (assessment) => {
    setAssessmentData(assessment);
  };

  const handlePaymentMethodSelect = (method, details) => {
    setFormData((prev) => ({
      ...prev,
      paymentMethod: method,
      paymentDetails: details,
    }));
  };

  // ✅ Updated navigation helpers for new flow
  const getMaxSteps = () => {
    if (transactionType === "NEW") {
      return 7; // 1:Select, 2:Terms, 3:Form+Docs, 4:Review, 5:Assessment, 6:Payment, 7:Success
    }
    return 5; // Other types: 1:Select, 2:Terms, 3:Form, 4:Documents, 5:Review
  };

  const nextStep = () => {
    const maxSteps = getMaxSteps();
    if (step === 1) {
      setStep(2); // Go to AcceptTerms
    } else if (step === 2) {
      generateApplicationNumber();
      setStep(3); // Go to form
    } else if (step < maxSteps) {
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) setStep((s) => s - 1);
  };

  const handleAcceptTerms = () => {
    nextStep();
  };

  const handleDeclineTerms = () => {
    setStep(1);
    setTransactionType("");
  };

  const showErrorToast = (message) => {
    const toast = document.createElement("div");
    toast.className =
      "fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
    toast.style.animation = "slideIn 0.3s ease-out";
    toast.innerHTML = `
      <div class="flex items-center gap-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <span>${message}</span>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 5000);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    navigate("/user-dashboard", { replace: true });
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);

      const formDataToSend = new FormData();

      // 1️⃣ Append all business application fields
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value ?? ""); // Ensure empty fields don't break
      });

      // 2️⃣ Append uploaded documents (if any)
      if (documents && Object.keys(documents).length > 0) {
        Object.values(documents).forEach((file) => {
          formDataToSend.append("documents", file);
        });
      }

      // 3️⃣ Append assessment and payment (if user already calculated)
      if (assessmentData) {
        formDataToSend.append("assessment", JSON.stringify(assessmentData));
      }

      if (paymentMethod) {
        formDataToSend.append("paymentMethod", paymentMethod);
        formDataToSend.append(
          "paymentDetails",
          JSON.stringify(paymentDetails || {})
        );
      }

      // 4️⃣ Attach JWT token for authentication
      const token = localStorage.getItem("token");
      if (!token) {
        showErrorToast("You are not logged in. Please log in first.");
        setIsSubmitting(false);
        return;
      }

      // 5️⃣ Send POST request to API
      const response = await fetch(
        "http://localhost:5000/api/business/submit",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      // 6️⃣ Handle response
      if (response.ok) {
        setShowSuccessModal(true);
        console.log("Submission successful:", data);
      } else {
        showErrorToast(data.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      showErrorToast(
        "Server error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const SuccessModal = () =>
    showSuccessModal && (
      <div className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-md flex items-center justify-center z-50 p-4 ">
        <div
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
          style={{ animation: "scaleIn 0.3s ease-out" }}
        >
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Application Submitted!
          </h3>

          <p className="text-gray-600 mb-2">
            Your business application has been successfully submitted.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Application Number:{" "}
            <span className="font-semibold text-teal-600">
              {applicationNumber}
            </span>
          </p>

          <button
            onClick={handleGoToDashboard}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );

  React.useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes scaleIn {
        from { transform: scale(0.9); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
    `;
    document.head.appendChild(style);

    return () => style.remove();
  }, []);

  return (
    <div className="flex h-screen bg-white ">
      <SidebarCitizen isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 flex-col">
        <div className="shrink-0">
          <NavbarCitizen toggleSidebar={toggleSidebar} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6 flex flex-col mb-23 sm:mb-0">
            <div className="flex-1">
              {/* Step 1: Select Transaction Type */}
              {step === 1 && (
                <div className="bg-white p-4 flex flex-col min-h-full">
                  <h2 className="text-xl font-bold mb-4">
                    Select Transaction Type
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

              {/* Step 2: Accept Terms */}
              {step === 2 && (
                <AcceptTerms
                  onAccept={handleAcceptTerms}
                  onDecline={handleDeclineTerms}
                  transactionType={transactionType}
                />
              )}

              {/* Step 3: Forms */}
              {step === 3 && transactionType === "NEW" && (
                <div className="space-y-8">
                  <BusinessInformationForm
                    formData={formData}
                    handleInputChange={handleInputChange}
                    applicationNumber={applicationNumber}
                  />
                  <DocumentUpload
                    applicationNumber={applicationNumber}
                    documents={documents}
                    handleFileUpload={handleFileUpload}
                  />
                </div>
              )}

              {step === 3 && transactionType === "RENEWAL" && (
                <RenewalForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  applicationNumber={applicationNumber}
                />
              )}

              {step === 3 && transactionType === "QUARTERLY" && (
                <QuarterlyReportForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 3 && transactionType === "DELINQUENT" && (
                <DelinquentForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 3 && transactionType === "CHANGE_REQUEST" && (
                <ChangeRequestForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {step === 3 && transactionType === "RETIREMENT" && (
                <RetirementForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                />
              )}

              {/* Step 4: Document Upload (for non-NEW types) or Review (for NEW) */}
              {step === 4 && transactionType !== "NEW" && (
                <DocumentUpload
                  applicationNumber={applicationNumber}
                  documents={documents}
                  handleFileUpload={handleFileUpload}
                />
              )}

              {step === 4 && transactionType === "NEW" && (
                <ReviewSummary
                  applicationNumber={applicationNumber}
                  formData={formData}
                  documents={documents}
                />
              )}

              {/* Step 5: Review Summary (for non-NEW) or Assessment (for NEW) */}
              {step === 5 && transactionType !== "NEW" && (
                <ReviewSummary
                  applicationNumber={applicationNumber}
                  formData={formData}
                  documents={documents}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}

              {step === 5 && transactionType === "NEW" && (
                <Assessment
                  applicationNumber={applicationNumber}
                  formData={formData}
                  onAssessmentGenerated={handleAssessmentGenerated}
                />
              )}

              {/* Step 6: Payment Method (NEW only) */}
              {step === 6 && transactionType === "NEW" && (
                <PaymentMethod
                  applicationNumber={applicationNumber}
                  assessmentData={assessmentData}
                  onPaymentMethodSelect={handlePaymentMethodSelect}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
              )}
            </div>

            {/* Navigation Footer */}
            <div className="mt-4 border-t pt-4">
              {/* Mobile Footer */}
              <div className="md:hidden">
                {!showMobileFooter && mobileIconPos && (
                  <button
                    aria-label="Show navigation"
                    onPointerDown={onPointerDownIcon}
                    onClick={() => {
                      if (!mobileIconPos) setMobileIconPos(getDefaultIconPos());
                      setShowMobileFooter(true);
                    }}
                    className="z-50 rounded-full bg-teal-600 text-white flex items-center justify-center shadow-lg"
                    style={{
                      position: "fixed",
                      left: `${mobileIconPos.x}px`,
                      top: `${mobileIconPos.y}px`,
                      width: MOBILE_ICON_SIZE,
                      height: MOBILE_ICON_SIZE,
                      touchAction: "none",
                    }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M5 12l5-5 5 5"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}

                {showMobileFooter && (
                  <div
                    className="fixed left-1/2 bottom-15 transform -translate-x-1/2 z-100 w-[calc(100%-2rem)] max-w-xl"
                    style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
                  >
                    <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-2 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={prevStep}
                          disabled={step === 1}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold ${
                            step === 1
                              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                              : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          ←
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setStep(1);
                            setTransactionType("");
                          }}
                          className="px-3 py-2 rounded-md text-sm font-semibold bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                        >
                          Start Over
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {/* Continue buttons for different steps */}
                          {step === 1 && (
                            <button
                              type="button"
                              onClick={nextStep}
                              disabled={!transactionType}
                              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                                transactionType
                                  ? "bg-teal-600 text-white hover:bg-teal-700"
                                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                              }`}
                            >
                              Continue →
                            </button>
                          )}

                          {((step === 3 && transactionType !== "NEW") ||
                            (step === 4 && transactionType !== "NEW") ||
                            (step === 3 && transactionType === "NEW") ||
                            (step === 4 && transactionType === "NEW") ||
                            (step === 5 && transactionType === "NEW")) && (
                            <button
                              type="button"
                              onClick={nextStep}
                              className="px-4 py-2 rounded-md text-sm font-semibold bg-teal-600 text-white hover:bg-teal-700"
                            >
                              Continue →
                            </button>
                          )}
                        </div>

                        <button
                          aria-label="Hide navigation"
                          type="button"
                          onClick={() => {
                            if (!mobileIconPos) {
                              setMobileIconPos(getDefaultIconPos());
                            }
                            setShowMobileFooter(false);
                          }}
                          className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm text-sm text-gray-600"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Desktop Layout */}
              <div className="hidden md:flex items-center justify-between">
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

                  {((step === 3 && transactionType !== "NEW") ||
                    (step === 4 && transactionType !== "NEW") ||
                    (step === 3 && transactionType === "NEW") ||
                    (step === 4 && transactionType === "NEW") ||
                    (step === 5 && transactionType === "NEW")) && (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="px-6 py-2 rounded-lg font-semibold bg-teal-600 text-white hover:bg-teal-700"
                    >
                      Continue →
                    </button>
                  )}
                </div>
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

      <SuccessModal />
    </div>
  );
};

export default BusinessApplication;
