import React from "react";

const ChangeRequestForm = ({ formData, handleInputChange, applicationNumber }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-yellow-700">
        Change Request
      </h2>
      <p className="mb-4 text-gray-600">
        Application No: <strong>{applicationNumber}</strong>
      </p>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Type of Change
        </label>
        <select
          value={formData.changeType || ""}
          onChange={(e) => handleInputChange("changeType", e.target.value)}
          className="border rounded-lg p-2 w-full"
        >
          <option value="">Select Change Type</option>
          <option value="NAME_CHANGE">Business Name Change</option>
          <option value="ADDRESS_CHANGE">Address Modification</option>
          <option value="OWNERSHIP_TRANSFER">Ownership Transfer</option>
        </select>
      </div>
    </div>
  );
};

export default ChangeRequestForm;
