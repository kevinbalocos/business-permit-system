import React from "react";

const QuarterlyReportForm = ({ formData, handleInputChange, applicationNumber }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6">
      <h2 className="text-xl font-bold mb-4 text-purple-700">
        Quarterly Business Report
      </h2>
      <p className="mb-4 text-gray-600">
        Application No: <strong>{applicationNumber}</strong>
      </p>

      <div>
        <label className="block font-medium text-gray-700 mb-2">
          Total Sales for Quarter
        </label>
        <input
          type="number"
          value={formData.totalQuarterlySales || ""}
          onChange={(e) =>
            handleInputChange("totalQuarterlySales", e.target.value)
          }
          className="border rounded-lg p-2 w-full"
        />
      </div>
    </div>
  );
};

export default QuarterlyReportForm;
