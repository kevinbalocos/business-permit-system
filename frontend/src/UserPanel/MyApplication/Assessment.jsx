import React, { useState, useEffect } from 'react';
import { Calculator, FileText, Building, DollarSign, AlertCircle } from 'lucide-react';

const Assessment = ({ applicationNumber, formData, onAssessmentGenerated }) => {
  const [assessmentData, setAssessmentData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);

  // Calculate fees based on business data
  const calculateFees = () => {
    const baseFee = 500; // Base application fee
    const businessAreaFee = parseFloat(formData.businessArea || 0) * 10; // Per sqm
    const employeeFee = (
      (parseInt(formData.maleEmployees || 0) + parseInt(formData.femaleEmployees || 0)) * 50
    ); // Per employee
    const vehicleFee = (
      (parseInt(formData.vanDeliveryVehicles || 0) * 200) +
      (parseInt(formData.truckDeliveryVehicles || 0) * 300) +
      (parseInt(formData.motorcycleDeliveryVehicles || 0) * 100)
    );
    
    const capitalizationFee = Math.min(parseFloat(formData.totalCapitalization || 0) * 0.001, 5000);
    
    const processingFee = 150;
    const documentStampTax = 30;
    
    const subtotal = baseFee + businessAreaFee + employeeFee + vehicleFee + capitalizationFee;
    const vat = subtotal * 0.12; // 12% VAT
    const total = subtotal + vat + processingFee + documentStampTax;

    return {
      baseFee,
      businessAreaFee,
      employeeFee,
      vehicleFee,
      capitalizationFee,
      subtotal,
      vat,
      processingFee,
      documentStampTax,
      total: Math.round(total * 100) / 100, // Round to 2 decimal places
    };
  };

  useEffect(() => {
    // Simulate assessment generation
    const timer = setTimeout(() => {
      const fees = calculateFees();
      const assessment = {
        applicationNumber,
        dateGenerated: new Date().toISOString(),
        businessName: formData.businessName,
        businessType: formData.businessType,
        lineOfBusiness: formData.lineOfBusiness,
        fees,
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 30 days from now
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(), // 60 days from now
      };
      
      setAssessmentData(assessment);
      setIsGenerating(false);
      onAssessmentGenerated(assessment);
    }, 2000); // 2 second delay for loading effect

    return () => clearTimeout(timer);
  }, [applicationNumber, formData, onAssessmentGenerated]);

  if (isGenerating) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 relative">
              <div className="w-16 h-16 border-4 border-teal-200 rounded-full animate-spin">
                <div className="w-4 h-4 bg-teal-600 rounded-full absolute top-0 left-1/2 transform -translate-x-1/2"></div>
              </div>
              <Calculator className="w-8 h-8 text-teal-600 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Generating Assessment
            </h3>
            <p className="text-gray-600">
              Please wait while we calculate your permit fees...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!assessmentData) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Step 2: Business Permit Assessment</h2>
            <p className="text-teal-100">Application #{assessmentData.applicationNumber}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-teal-200">Date Generated</p>
            <p className="font-semibold">{new Date(assessmentData.dateGenerated).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-teal-200">Due Date</p>
            <p className="font-semibold">{assessmentData.dueDate}</p>
          </div>
          <div>
            <p className="text-teal-200">Valid Until</p>
            <p className="font-semibold">{assessmentData.validUntil}</p>
          </div>
        </div>
      </div>

      {/* Business Information Summary */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building className="w-5 h-5 text-teal-600" />
          Business Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-600">Business Name</p>
            <p className="font-semibold">{assessmentData.businessName}</p>
          </div>
          <div>
            <p className="text-gray-600">Business Type</p>
            <p className="font-semibold">{assessmentData.businessType}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-gray-600">Line of Business</p>
            <p className="font-semibold">{assessmentData.lineOfBusiness}</p>
          </div>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600" />
          Fee Breakdown
        </h3>
        
        <div className="space-y-3">
          {/* Base Fee */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Base Application Fee</p>
              <p className="text-sm text-gray-600">Standard processing fee</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.baseFee.toFixed(2)}</p>
          </div>

          {/* Business Area Fee */}
          {assessmentData.fees.businessAreaFee > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Business Area Fee</p>
                <p className="text-sm text-gray-600">
                  {formData.businessArea} sqm × ₱10.00
                </p>
              </div>
              <p className="font-semibold">₱{assessmentData.fees.businessAreaFee.toFixed(2)}</p>
            </div>
          )}

          {/* Employee Fee */}
          {assessmentData.fees.employeeFee > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Employee Fee</p>
                <p className="text-sm text-gray-600">
                  {(parseInt(formData.maleEmployees || 0) + parseInt(formData.femaleEmployees || 0))} employees × ₱50.00
                </p>
              </div>
              <p className="font-semibold">₱{assessmentData.fees.employeeFee.toFixed(2)}</p>
            </div>
          )}

          {/* Vehicle Fee */}
          {assessmentData.fees.vehicleFee > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Delivery Vehicle Fee</p>
                <p className="text-sm text-gray-600">
                  Van: {formData.vanDeliveryVehicles || 0}, Truck: {formData.truckDeliveryVehicles || 0}, 
                  Motorcycle: {formData.motorcycleDeliveryVehicles || 0}
                </p>
              </div>
              <p className="font-semibold">₱{assessmentData.fees.vehicleFee.toFixed(2)}</p>
            </div>
          )}

          {/* Capitalization Fee */}
          {assessmentData.fees.capitalizationFee > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <div>
                <p className="font-medium">Capitalization Fee</p>
                <p className="text-sm text-gray-600">
                  0.1% of ₱{parseFloat(formData.totalCapitalization || 0).toLocaleString()} (max ₱5,000)
                </p>
              </div>
              <p className="font-semibold">₱{assessmentData.fees.capitalizationFee.toFixed(2)}</p>
            </div>
          )}

          {/* Subtotal */}
          <div className="flex justify-between items-center py-2 border-b-2 border-gray-300">
            <p className="font-semibold">Subtotal</p>
            <p className="font-semibold">₱{assessmentData.fees.subtotal.toFixed(2)}</p>
          </div>

          {/* VAT */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Value Added Tax (12%)</p>
              <p className="text-sm text-gray-600">Applicable to taxable fees</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.vat.toFixed(2)}</p>
          </div>

          {/* Processing Fee */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Processing Fee</p>
              <p className="text-sm text-gray-600">Document processing</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.processingFee.toFixed(2)}</p>
          </div>

          {/* Document Stamp Tax */}
          <div className="flex justify-between items-center py-2 border-b-2 border-gray-300">
            <div>
              <p className="font-medium">Document Stamp Tax</p>
              <p className="text-sm text-gray-600">Government tax</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.documentStampTax.toFixed(2)}</p>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-4 bg-teal-50 px-4 rounded-lg">
            <div>
              <p className="text-xl font-bold text-teal-900">TOTAL AMOUNT DUE</p>
              <p className="text-sm text-teal-700">All fees inclusive</p>
            </div>
            <p className="text-2xl font-bold text-teal-900">
              ₱{assessmentData.fees.total.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Important Notice */}
      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="font-semibold text-amber-900 mb-2">Important Notice</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• This assessment is valid until {assessmentData.validUntil}</li>
              <li>• Payment must be made by {assessmentData.dueDate} to avoid penalties</li>
              <li>• All fees are subject to local government regulations</li>
              <li>• Additional requirements may apply based on business classification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;