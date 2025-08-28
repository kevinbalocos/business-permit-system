import React, { useState, useEffect } from 'react';
import { Calculator, FileText, Building, DollarSign, AlertCircle } from 'lucide-react';

const Assessment = ({ applicationNumber, formData, onAssessmentGenerated }) => {
  const [assessmentData, setAssessmentData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);

  // Fixed assessment fees based on Electronic Statement of Account
  const getFixedAssessmentFees = () => {
    return {
      business_permit_fee: 1000.00, // BUSINESS TAX - SERVICE ACTIVITIES
      mayors_permit_fee: 100.00, // MAYOR'S PERMIT FEE - SERVICE ACTIVITIES
      sanitary_permit_fee: 60.00, // ANNUAL INSPECTION FEE - SANITARY
      fire_safety_fee: 536.00, // ANNUAL INSPECTION FEE - ELECTRICAL
      environmental_fee: 120.00, // ANNUAL INSPECTION FEE - MECHANICAL
      capitalization_fee: 120.00, // ANNUAL INSPECTION FEE - BUILDING
      employee_fee: 72.00, // ANNUAL BUILDING INSPECTION FEE - SIGNAGE
      delivery_vehicle_fee: 350.00, // BARANGAY CLEARANCE FEE
      late_penalty: 0.00,
      interest_charges: 0.00,
      additional_fees: {
        garbage_fee: 360.00,
        health_cert_fee: 8.00,
        occupational_fee: 100.00,
        sanitary_inspection_fee: 300.00,
        solid_waste_certification_fee: 80.00,
        verification_fee: 100.00,
        zoning_fee: 600.00
      }
    };
  };

  useEffect(() => {
    // Simulate assessment generation
    const timer = setTimeout(() => {
      const fees = getFixedAssessmentFees();
      
      // Calculate totals
      const baseFees = fees.business_permit_fee + fees.mayors_permit_fee + 
                      fees.sanitary_permit_fee + fees.fire_safety_fee + 
                      fees.environmental_fee + fees.capitalization_fee + 
                      fees.employee_fee + fees.delivery_vehicle_fee;
      
      const additionalFeesTotal = Object.values(fees.additional_fees).reduce((sum, val) => sum + val, 0);
      const subtotal = baseFees + additionalFeesTotal;
      const tax_amount = 0; // No tax shown in the statement
      const total_amount = subtotal;

      const assessment = {
        applicationNumber,
        dateGenerated: new Date().toISOString(),
        businessName: formData.businessName,
        businessType: formData.businessType,
        lineOfBusiness: formData.lineOfBusiness,
        fees: {
          ...fees,
          subtotal,
          tax_amount,
          total_amount
        },
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        validUntil: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      };
      
      setAssessmentData(assessment);
      setIsGenerating(false);
      onAssessmentGenerated(assessment);
    }, 2000);

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
              Please wait while we prepare your Electronic Statement of Account...
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
            <h2 className="text-2xl font-bold">Electronic Statement of Account</h2>
            <p className="text-teal-100">Application #{assessmentData.applicationNumber}</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-teal-200">Status</p>
            <p className="font-semibold">NEW</p>
          </div>
          <div>
            <p className="text-teal-200">Billing Date</p>
            <p className="font-semibold">{new Date(assessmentData.dateGenerated).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-teal-200">Period</p>
            <p className="font-semibold">3rd - 4th Quarter 2025</p>
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
          Fee Breakdown (Based on Electronic Statement of Account)
        </h3>
        
        <div className="space-y-3">
          {/* Main Fees */}
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Business Tax - Service Activities</p>
              <p className="text-sm text-gray-600">Related to printing, N.E.C.</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.business_permit_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Mayor's Permit Fee - Service</p>
              <p className="text-sm text-gray-600">Activities related to printing, N.E.C.</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.mayors_permit_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Annual Inspection Fee - Building</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.capitalization_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Annual Inspection Fee - Electrical</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.fire_safety_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Annual Inspection Fee - Mechanical</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.environmental_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Annual Inspection Fee - Sanitary</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.sanitary_permit_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Annual Building Inspection Fee - Signage</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.employee_fee.toFixed(2)}</p>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <div>
              <p className="font-medium">Barangay Clearance Fee</p>
            </div>
            <p className="font-semibold">₱{assessmentData.fees.delivery_vehicle_fee.toFixed(2)}</p>
          </div>

          {/* Additional Fees */}
          <div className="pt-4">
            <h4 className="font-semibold text-gray-800 mb-2">Additional Required Fees</h4>
            
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <p className="font-medium">Garbage Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.garbage_fee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <p className="font-medium">Health Cert/Sworn Statement Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.health_cert_fee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <p className="font-medium">Occupational Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.occupational_fee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <p className="font-medium">Sanitary Inspection Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.sanitary_inspection_fee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <p className="font-medium">Solid Waste Certification Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.solid_waste_certification_fee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <p className="font-medium">Verification Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.verification_fee.toFixed(2)}</p>
            </div>

            <div className="flex justify-between items-center py-2 border-b-2 border-gray-300">
              <p className="font-medium">Zoning Fee</p>
              <p className="font-semibold">₱{assessmentData.fees.additional_fees.zoning_fee.toFixed(2)}</p>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between items-center py-4 bg-teal-50 px-4 rounded-lg mt-4">
            <div>
              <p className="text-xl font-bold text-teal-900">TOTAL AMOUNT DUE</p>
              <p className="text-sm text-teal-700">All fees inclusive</p>
            </div>
            <p className="text-2xl font-bold text-teal-900">
              ₱{assessmentData.fees.total_amount.toFixed(2)}
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
              <li>• This Electronic Statement of Account is for NEW business permit application</li>
              <li>• Payment must be made by {assessmentData.dueDate} to avoid penalties</li>
              <li>• All fees are based on City of San Pablo official rates for 2025</li>
              <li>• Period covered: 3rd - 4th Quarter 2025</li>
              <li>• Additional requirements may apply based on business classification</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;