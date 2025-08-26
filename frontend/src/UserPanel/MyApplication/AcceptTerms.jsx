import React, { useState } from "react";
import { Shield, FileText, Info, AlertTriangle } from "lucide-react";

const AcceptTerms = ({ onAccept, onDecline, transactionType }) => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const handleContinue = () => {
    if (acceptedTerms && acceptedPrivacy) {
      onAccept();
    }
  };

  const getTransactionTitle = () => {
    const types = {
      NEW: "New Business Application",
      RENEWAL: "Business Renewal",
      QUARTERLY: "Quarterly Report Submission",
      DELINQUENT: "Delinquent Account Resolution",
      CHANGE_REQUEST: "Business Information Change",
      RETIREMENT: "Business Retirement Application"
    };
    return types[transactionType] || "Business Application";
  };

  return (
    <div className="bg-white p-4 sm:p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8 text-teal-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Terms and Conditions</h2>
        <p className="text-gray-600">
          Please review and accept the terms before proceeding with your {getTransactionTitle().toLowerCase()}
        </p>
      </div>

      {/* Terms Content */}
      <div className="bg-gray-50 rounded-lg p-6 mb-6 max-h-96 overflow-y-auto">
        <div className="space-y-4 text-sm text-gray-700">
          <div className="flex items-start gap-3">
            <FileText className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Data Collection and Processing</h3>
              <p>
                By proceeding with this application, you acknowledge that we will collect, process, and store 
                personal information including but not limited to: business details, contact information, 
                financial data, and supporting documents. This information is necessary for processing your 
                business application and ensuring compliance with local regulations.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Information Usage</h3>
              <p>
                Your personal and business information will be used exclusively for:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Processing your business permit application</li>
                <li>Verification and validation of submitted documents</li>
                <li>Communication regarding your application status</li>
                <li>Compliance with government regulations and requirements</li>
                <li>Statistical purposes (anonymized data only)</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Data Protection</h3>
              <p>
                We are committed to protecting your personal information through:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Secure encryption of all data transmissions</li>
                <li>Restricted access to authorized personnel only</li>
                <li>Regular security audits and updates</li>
                <li>Compliance with Data Privacy Act and related regulations</li>
              </ul>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-2">Your Rights and Responsibilities</h3>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Access your personal data</li>
                <li>Request corrections to inaccurate information</li>
                <li>Withdraw consent (where applicable)</li>
                <li>File complaints regarding data handling</li>
              </ul>
              <p className="mt-3">You are responsible for:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Providing accurate and truthful information</li>
                <li>Updating information when changes occur</li>
                <li>Maintaining confidentiality of your account credentials</li>
              </ul>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Important Notice</h3>
            <p className="text-blue-800 text-sm">
              Providing false information or fraudulent documents is punishable by law. 
              All information submitted will be verified against official records. 
              Processing fees are non-refundable once the application has been submitted.
            </p>
          </div>
        </div>
      </div>

      {/* Checkbox Agreements */}
      <div className="space-y-4 mb-6">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedTerms}
            onChange={(e) => setAcceptedTerms(e.target.checked)}
            className="w-5 h-5 text-teal-600 rounded mt-0.5"
          />
          <span className="text-sm text-gray-700">
            I have read, understood, and agree to the <strong>Terms and Conditions</strong> 
            outlined above. I consent to the collection and processing of my personal information 
            for the purpose of this business application.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={acceptedPrivacy}
            onChange={(e) => setAcceptedPrivacy(e.target.checked)}
            className="w-5 h-5 text-teal-600 rounded mt-0.5"
          />
          <span className="text-sm text-gray-700">
            I acknowledge that I have been informed about my rights regarding my personal data 
            and agree to the <strong>Privacy Policy</strong>. I understand that my information 
            will be handled in accordance with the Data Privacy Act.
          </span>
        </label>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          onClick={onDecline}
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Decline & Go Back
        </button>
        
        <button
          onClick={handleContinue}
          disabled={!acceptedTerms || !acceptedPrivacy}
          className={`px-8 py-3 rounded-lg font-medium transition-colors ${
            acceptedTerms && acceptedPrivacy
              ? "bg-teal-600 text-white hover:bg-teal-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Accept & Continue →
        </button>
      </div>

      {/* Contact Information */}
      <div className="mt-6 pt-6 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          For questions about data privacy or these terms, contact us at{" "}
          <a href="mailto:privacy@businesspermit.gov" className="text-teal-600 hover:underline">
            privacy@alaminosbusinesspermit.gov
          </a>
        </p>
      </div>
    </div>
  );
};

export default AcceptTerms;