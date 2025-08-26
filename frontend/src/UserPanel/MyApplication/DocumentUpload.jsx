import React from "react";
import { Upload, FileText, CheckCircle } from "lucide-react";

const DocumentUpload = ({ applicationNumber, documents, handleFileUpload }) => {
  const businessRequirements = [
    {
      id: "sec_articles",
      name: "SEC (Article of Incorporation/By-laws/GIS)",
      description: "Securities and Exchange Commission documents",
      required: true,
    },
    {
      id: "dti_registration",
      name: "DTI Registration",
      description: "Department of Trade and Industry registration",
      required: true,
    },
    {
      id: "cda_registration",
      name: "CDA (Cooperative Development Authority)",
      description: "For cooperative business types only",
      required: false,
    },
    {
      id: "barangay_clearance",
      name: "Barangay Clearance for Business Permit",
      description: "Valid barangay business clearance",
      required: true,
    },
    {
      id: "lease_contract",
      name: "Lease Contract (Updated)",
      description: "Current lease agreement or property documents",
      required: true,
    },
    {
      id: "business_photo",
      name: "Picture of Business Establishment with Signage",
      description: "Clear photo showing business signage",
      required: true,
    },
    {
      id: "capital_statement",
      name: "Statement of Capital Investment (Notarized)",
      description: "Notarized statement of business capital",
      required: true,
    },
    {
      id: "market_clearance",
      name: "Market Clearance",
      description: "Market clearance certificate if applicable",
      required: false,
    },
    {
      id: "nawasa_clearance",
      name: "Clearance from NAWASA",
      description: "Water service clearance certificate",
      required: false,
    },
    {
      id: "tax_exemption",
      name: "Certificate of Tax Exemption from BIR",
      description: "If applicable for tax-exempt businesses",
      required: false,
    },
  ];

  const requiredDocs = businessRequirements.filter((doc) => doc.required);
  const optionalDocs = businessRequirements.filter((doc) => !doc.required);

  const uploadedCount = businessRequirements.filter(
    (doc) => documents[doc.id]
  ).length;
  const requiredUploadedCount = requiredDocs.filter(
    (doc) => documents[doc.id]
  ).length;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 ">
      <div className="bg-teal-600 text-white p-4 sm:p-6 rounded-t-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Business Requirements
        </h2>
        <p className="opacity-90 text-sm sm:text-base">
          Upload your documents - Complete attachments required
        </p>
      </div>

      <div className="p-4 sm:p-6">
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-teal-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 flex-shrink-0">
                #
              </div>
              <div className="min-w-0">
                <span className="text-gray-700 font-medium text-sm sm:text-base">
                  Application Number:{" "}
                </span>
                <span className="text-teal-600 font-bold text-base sm:text-lg break-all">
                  {applicationNumber}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">
                Progress: {uploadedCount}/{businessRequirements.length} uploaded
              </div>
              <div className="text-xs text-gray-500">
                Required: {requiredUploadedCount}/{requiredDocs.length}
              </div>
            </div>
          </div>
        </div>

        {/* Upload Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Document Upload Progress
            </span>
            <span className="text-sm text-gray-500">
              {Math.round((uploadedCount / businessRequirements.length) * 100)}%
              Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-teal-600 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${
                  (uploadedCount / businessRequirements.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Required Documents Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Required Documents
            </h3>
            <span className="ml-2 bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {requiredUploadedCount}/{requiredDocs.length} uploaded
            </span>
          </div>

          <div className="space-y-4">
            {requiredDocs.map((doc, index) => (
              <div
                key={doc.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base flex items-center">
                        {doc.name}
                        <span className="text-red-500 ml-1">*</span>
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <input
                      type="file"
                      id={`file-${doc.id}`}
                      onChange={(e) =>
                        handleFileUpload(doc.id, e.target.files[0])
                      }
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor={`file-${doc.id}`}
                      className={`px-4 py-2 rounded-lg cursor-pointer transition-all font-medium text-sm sm:text-base whitespace-nowrap flex items-center gap-2 ${
                        documents[doc.id]
                          ? "bg-teal-600 text-white border border-teal-600"
                          : "bg-red-50 text-red-600 border border-red-300 hover:bg-red-600 hover:text-white"
                      }`}
                    >
                      {documents[doc.id] ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Uploaded
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Choose File
                        </>
                      )}
                    </label>
                  </div>
                </div>
                {documents[doc.id] && (
                  <div className="mt-3 ml-12 p-2 bg-teal-50 rounded text-sm text-teal-700">
                    📎 {documents[doc.id].name} (
                    {Math.round(documents[doc.id].size / 1024)} KB)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Optional Documents Section */}
        <div className="mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800">
              Optional Documents
            </h3>
            <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              If applicable
            </span>
          </div>

          <div className="space-y-4">
            {optionalDocs.map((doc, index) => (
              <div
                key={doc.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all opacity-75"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                        {doc.name}
                        <span className="text-blue-500 ml-1 text-xs">
                          (Optional)
                        </span>
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        {doc.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-end">
                    <input
                      type="file"
                      id={`file-${doc.id}`}
                      onChange={(e) =>
                        handleFileUpload(doc.id, e.target.files[0])
                      }
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <label
                      htmlFor={`file-${doc.id}`}
                      className={`px-4 py-2 rounded-lg cursor-pointer transition-all font-medium text-sm sm:text-base whitespace-nowrap flex items-center gap-2 ${
                        documents[doc.id]
                          ? "bg-teal-600 text-white border border-teal-600"
                          : "bg-blue-50 text-blue-600 border border-blue-300 hover:bg-blue-600 hover:text-white"
                      }`}
                    >
                      {documents[doc.id] ? (
                        <>
                          <CheckCircle className="w-4 h-4" />
                          Uploaded
                        </>
                      ) : (
                        <>
                          <Upload className="w-4 h-4" />
                          Choose File
                        </>
                      )}
                    </label>
                  </div>
                </div>
                {documents[doc.id] && (
                  <div className="mt-3 ml-12 p-2 bg-teal-50 rounded text-sm text-teal-700">
                    📎 {documents[doc.id].name} (
                    {Math.round(documents[doc.id].size / 1024)} KB)
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <div className="flex items-start">
            <div className="text-yellow-600 mr-3 mt-1 text-lg">⚠️</div>
            <div className="text-sm text-yellow-800">
              <p className="font-semibold mb-2">Important Notes:</p>
              <ul className="space-y-1 text-xs sm:text-sm">
                <li>
                  • All documents must be in PDF, JPG, JPEG, or PNG format
                </li>
                <li>• File size should not exceed 5MB per document</li>
                <li>• Ensure documents are clear and readable</li>
                <li>• Original or certified true copies are required</li>
                <li>
                  • Required documents marked with (*) are mandatory for
                  processing
                </li>
                <li>
                  • Optional documents should be uploaded if applicable to your
                  business
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Upload Status Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-gray-800">
                {uploadedCount}
              </div>
              <div className="text-sm text-gray-600">Total Uploaded</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div
                className={`text-2xl font-bold ${
                  requiredUploadedCount === requiredDocs.length
                    ? "text-teal-600"
                    : "text-red-600"
                }`}
              >
                {requiredUploadedCount}/{requiredDocs.length}
              </div>
              <div className="text-sm text-gray-600">Required Documents</div>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <div className="text-2xl font-bold text-blue-600">
                {optionalDocs.filter((doc) => documents[doc.id]).length}
              </div>
              <div className="text-sm text-gray-600">Optional Documents</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;
