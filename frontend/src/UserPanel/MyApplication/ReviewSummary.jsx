import React, { useState } from "react";
import {
  FileText,
  User,
  Building,
  MapPin,
  Briefcase,
  CheckCircle2,
} from "lucide-react";

const ReviewSummary = ({
  applicationNumber,
  formData,
  documents,
  onSubmit,
}) => {
  const [declarationAccepted, setDeclarationAccepted] = useState(false);

  const getUploadedDocuments = () => {
    return Object.entries(documents).filter(([key, file]) => file).length;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
    }).format(amount || 0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-green-600 text-white p-4 sm:p-6 rounded-t-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Step 4: Review & Summary
        </h2>
        <p className="opacity-90 text-sm sm:text-base">
          Please review all information before submitting
        </p>
      </div>

      <div className="p-4 sm:p-6">
        {/* Application Number Display */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
              #
            </div>
            <div className="min-w-0">
              <span className="text-gray-700 font-medium text-sm sm:text-base">
                Application Number:{" "}
              </span>
              <span className="text-green-600 font-bold text-base sm:text-lg break-all">
                {applicationNumber}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Business Information Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Business Type:</span>{" "}
                {formData.businessType || "Not specified"}
              </div>
              <div>
                <span className="font-medium">DTI/SEC/CDA No.:</span>{" "}
                {formData.dtiSecCdaNumber || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Business Name:</span>{" "}
                {formData.businessName || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Tax ID No.:</span>{" "}
                {formData.taxIdNumber || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Trade Name:</span>{" "}
                {formData.tradeName || "Not applicable"}
              </div>
              <div>
                <span className="font-medium">Total Capitalization:</span>{" "}
                {formatCurrency(formData.totalCapitalization)}
              </div>
            </div>
          </div>

          {/* Owner Information Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Owner Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Name:</span>{" "}
                {`${formData.firstName || ""} ${formData.middleName || ""} ${
                  formData.lastName || ""
                } ${formData.extension || ""}`.trim() || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Sex:</span>{" "}
                {formData.sex || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Email:</span>{" "}
                {formData.email || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Mobile:</span>{" "}
                {formData.mobile || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Telephone:</span>{" "}
                {formData.telephone || "Not specified"}
              </div>
            </div>
          </div>

          {/* Business Address Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Business Address
            </h3>
            <div className="text-sm">
              <div>
                <span className="font-medium">Location:</span>
              </div>
              <div className="mt-1 text-gray-700">
                {formData.addressLine1 && <div>{formData.addressLine1}</div>}
                <div>
                  {formData.barangay && `Brgy. ${formData.barangay}, `}
                  {formData.city && `${formData.city.toUpperCase()}, `}
                  {formData.province && `${formData.province.toUpperCase()}, `}
                  {formData.region && formData.region.toUpperCase()}
                  {formData.taxpayerZipCode && ` ${formData.taxpayerZipCode}`}
                </div>
              </div>
            </div>
          </div>

          {/* Business Operation Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-green-600" />
              Business Operation
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Business Area:</span>{" "}
                {formData.businessArea
                  ? `${formData.businessArea} sq.m`
                  : "Not specified"}
              </div>
              <div>
                <span className="font-medium">Employees in Area:</span>{" "}
                {formData.employeesInArea || "0"}
              </div>
              <div>
                <span className="font-medium">Male Employees:</span>{" "}
                {formData.maleEmployees || "0"}
              </div>
              <div>
                <span className="font-medium">Female Employees:</span>{" "}
                {formData.femaleEmployees || "0"}
              </div>
              <div>
                <span className="font-medium">Van Vehicles:</span>{" "}
                {formData.vanDeliveryVehicles || "0"}
              </div>
              <div>
                <span className="font-medium">Truck Vehicles:</span>{" "}
                {formData.truckDeliveryVehicles || "0"}
              </div>
              <div>
                <span className="font-medium">Motorcycle Vehicles:</span>{" "}
                {formData.motorcycleDeliveryVehicles || "0"}
              </div>
            </div>
          </div>

          {/* Property Details Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              Property Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Owns Property:</span>{" "}
                {formData.ownProperty === true
                  ? "Yes"
                  : formData.ownProperty === false
                  ? "No"
                  : "Not specified"}
              </div>
              {formData.ownProperty === false && (
                <>
                  <div>
                    <span className="font-medium">Lessor Name:</span>{" "}
                    {formData.lessorName || "Not specified"}
                  </div>
                  <div>
                    <span className="font-medium">Monthly Rental:</span>{" "}
                    {formatCurrency(formData.monthlyRental)}
                  </div>
                </>
              )}
              <div>
                <span className="font-medium">Tax Incentives:</span>{" "}
                {formData.taxIncentives === true
                  ? "Yes"
                  : formData.taxIncentives === false
                  ? "No"
                  : "Not specified"}
              </div>
            </div>
          </div>

          {/* Business Activity Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Business Activity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Business Activity:</span>{" "}
                {formData.businessActivity || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Line of Business:</span>{" "}
                {formData.lineOfBusiness || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Products/Services:</span>{" "}
                {formData.productsServices || "Not specified"}
              </div>
              <div>
                <span className="font-medium">Number of Units:</span>{" "}
                {formData.numberOfUnits || "Not specified"}
              </div>
            </div>
          </div>

          {/* Document Upload Summary */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Documents Uploaded
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <div className="font-medium text-gray-700">
                  Total Documents Uploaded: {getUploadedDocuments()}
                </div>
                <div className="text-gray-500 text-xs mt-1">
                  {getUploadedDocuments() > 0
                    ? "Documents have been successfully uploaded and are ready for processing."
                    : "No documents uploaded yet."}
                </div>
              </div>
              <div className="flex items-center">
                <CheckCircle2
                  className={`w-6 h-6 ${
                    getUploadedDocuments() > 0
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Declaration Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Declaration
          </h3>
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="declaration"
              checked={declarationAccepted}
              onChange={(e) => setDeclarationAccepted(e.target.checked)}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 mt-1"
            />
            <label
              htmlFor="declaration"
              className="text-sm text-gray-700 leading-relaxed"
            >
              <span className="font-semibold">
                I declare that the information provided is true and correct.
              </span>{" "}
              I understand that any false information may result in the
              rejection of this application and may subject me to legal
              consequences under applicable laws. I also consent to the
              processing of my personal data in accordance with the Data Privacy
              Act of 2012.
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={onSubmit}
            disabled={!declarationAccepted}
            className={`px-12 py-4 rounded-lg font-bold text-lg transition-all duration-200 ${
              declarationAccepted
                ? "bg-green-600 text-white hover:bg-green-700 shadow-lg transform hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {declarationAccepted
              ? "Submit Application"
              : "Please Accept Declaration"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewSummary;
