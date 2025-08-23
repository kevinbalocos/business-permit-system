import React from "react";

const RetirementForm = ({ formData, handleInputChange, applicationNumber }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-700">
        Business Retirement
      </h2>
      <p className="mb-4 text-gray-600">
        Application No: <strong>{applicationNumber}</strong>
      </p>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Reason for Retirement
        </label>
        <textarea
          value={formData.retirementReason || ""}
          onChange={(e) =>
            handleInputChange("retirementReason", e.target.value)
          }
          className="border rounded-lg p-2 w-full"
        ></textarea>
      </div>
    </div>
  );
};

export default RetirementForm;
