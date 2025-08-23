import React from "react";

const RenewalForm = ({ formData, handleInputChange, applicationNumber }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-blue-700">
        Renewal Application
      </h2>
      <p className="mb-4 text-gray-600">
        Application No: <strong>{applicationNumber}</strong>
      </p>

      <div className="mb-4">
        <label className="block font-medium text-gray-700 mb-2">
          Previous Permit Number
        </label>
        <input
          type="text"
          value={formData.previousPermitNumber || ""}
          onChange={(e) =>
            handleInputChange("previousPermitNumber", e.target.value)
          }
          className="border rounded-lg p-2 w-full"
        />
      </div>
    </div>
  );
};

export default RenewalForm;
