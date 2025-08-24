import React from "react";

const DelinquentForm = ({ formData, handleInputChange, applicationNumber }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-red-700">
        Delinquent Processing
      </h2>
      <p className="mb-4 text-gray-600">
        Application No: <strong>{applicationNumber}</strong>
      </p>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Reason for Delinquency
        </label>
        <textarea
          value={formData.delinquencyReason || ""}
          onChange={(e) =>
            handleInputChange("delinquencyReason", e.target.value)
          }
          className="border rounded-lg p-2 w-full"
        ></textarea>
      </div>
    </div>
  );
};

export default DelinquentForm;
