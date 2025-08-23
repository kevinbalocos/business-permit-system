import React, { useState } from 'react';
import SidebarCitizen from './Sidebar';
import NavbarCitizen from './Navbar';

const BusinessApplication = () => {
  const [step, setStep] = useState(1);
  const [applicationType, setApplicationType] = useState('');
  const [applicationNumber, setApplicationNumber] = useState('');
  const [profile, setProfile] = useState({
    businessName: '',
    ownershipType: '',
    address: '',
    nature: '',
    capitalization: '',
    employees: ''
  });
  const [documents, setDocuments] = useState({});

  // Sidebar toggle state
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const generateApplicationNumber = () => {
    const number = `APP-${Date.now().toString().slice(-6)}`;
    setApplicationNumber(number);
  };

  const handleProfileChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleFileUpload = (field, file) => {
    setDocuments({ ...documents, [field]: file });
  };

  const nextStep = () => {
    if (step === 2) generateApplicationNumber();
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = () => {
    alert(`Application ${applicationNumber} submitted successfully!`);
    console.log('Profile:', profile);
    console.log('Type:', applicationType);
    console.log('Documents:', documents);
  };

  const requiredDocs =
    applicationType === 'NEW'
      ? ['DTI/SEC/CDA', 'Barangay Clearance', 'Lease/Tax Dec', 'Occupancy Permit', 'Zoning', 'Sanitary', 'FSIC', 'Valid ID']
      : ['Last Year Permit', 'Official Receipt (OR)', 'Gross Sales Declaration', 'Updated Barangay Clearance', 'Sanitary', 'FSIC'];

  const fieldLabels = {
    businessName: 'Business Name / Trade Name',
    ownershipType: 'Type of Ownership',
    address: 'Business Address',
    nature: 'Nature of Business',
    capitalization: 'Capitalization Amount (₱)',
    employees: 'Number of Employees'
  };

  const ownershipOptions = ['Sole Proprietorship', 'Partnership', 'Corporation', 'Cooperative'];

  return (
    <div className="flex h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <SidebarCitizen isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <NavbarCitizen toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-lg border-l-4 border-green-600 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Business Permit Application</h1>
                <p className="text-gray-600">Local Government Unit - Electronic Business Permit System</p>
              </div>
              <div className="text-right">
                <div className="bg-green-100 px-4 py-2 rounded-lg">
                  <span className="text-sm font-medium text-green-600">Step {step} of 3</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-700">Application Progress</span>
              <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span className={step >= 1 ? 'text-green-600 font-medium' : ''}>Business Profile</span>
              <span className={step >= 2 ? 'text-green-600 font-medium' : ''}>Application Type</span>
              <span className={step >= 3 ? 'text-green-600 font-medium' : ''}>Document Upload</span>
            </div>
          </div>

          {/* Step 1: Business Profile */}
          {step === 1 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="bg-gradient-to-r from-green-600 to-green-600 text-white p-6 rounded-t-xl">
                <h2 className="text-2xl font-semibold mb-2">Step 1: Business Profile Information</h2>
                <p className="opacity-90">Please provide accurate information about your business</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(fieldLabels).map(([field, label]) => (
                    <div key={field} className="space-y-2">
                      <label className="block text-sm font-semibold text-gray-700">{label}</label>
                      {field === 'ownershipType' ? (
                        <select
                          value={profile[field]}
                          onChange={(e) => handleProfileChange(field, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                        >
                          <option value="">Select Ownership Type</option>
                          {ownershipOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field === 'nature' ? (
                        <textarea
                          placeholder="Describe the nature of your business..."
                          value={profile[field]}
                          onChange={(e) => handleProfileChange(field, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all h-24 resize-none"
                        />
                      ) : (
                        <input
                          type={field === 'capitalization' || field === 'employees' ? 'number' : 'text'}
                          placeholder={`Enter ${label.toLowerCase()}`}
                          value={profile[field]}
                          onChange={(e) => handleProfileChange(field, e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-8">
                  <button 
                    onClick={nextStep} 
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg"
                  >
                    Continue to Next Step →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Application Type */}
          {step === 2 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="bg-green-600 text-white p-6 rounded-t-xl">
                <h2 className="text-2xl font-semibold mb-2">Step 2: Application Type</h2>
                <p className="opacity-90">Select the type of business permit application</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div 
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      applicationType === 'NEW' 
                        ? 'border-green-600 bg-green-50 shadow-lg' 
                        : 'border-gray-300 hover:border-green-600 hover:shadow-md'
                    }`}
                    onClick={() => setApplicationType('NEW')}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        applicationType === 'NEW' ? 'bg-green-600 border-green-600' : 'border-gray-400'
                      }`}></div>
                      <h3 className="text-lg font-semibold text-gray-800">New Application</h3>
                    </div>
                    <p className="text-gray-600">For businesses applying for their first permit</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>• Complete document requirements</p>
                      <p>• Initial business registration</p>
                      <p>• Full compliance verification</p>
                    </div>
                  </div>

                  <div 
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all duration-200 ${
                      applicationType === 'RENEWAL' 
                        ? 'border-green-600 bg-green-50 shadow-lg' 
                        : 'border-gray-300 hover:border-green-600 hover:shadow-md'
                    }`}
                    onClick={() => setApplicationType('RENEWAL')}
                  >
                    <div className="flex items-center mb-4">
                      <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                        applicationType === 'RENEWAL' ? 'bg-green-600 border-green-600' : 'border-gray-400'
                      }`}></div>
                      <h3 className="text-lg font-semibold text-gray-800">Renewal</h3>
                    </div>
                    <p className="text-gray-600">For existing businesses renewing their permit</p>
                    <div className="mt-4 text-sm text-gray-500">
                      <p>• Simplified requirements</p>
                      <p>• Previous permit required</p>
                      <p>• Updated documentation only</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button 
                    onClick={prevStep} 
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={nextStep}
                    disabled={!applicationType}
                    className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 ${
                      applicationType 
                        ? 'bg-green-600 text-white hover:bg-green-700 shadow-lg' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    Continue to Documents →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Document Checklist */}
          {step === 3 && (
            <div className="bg-white rounded-xl shadow-lg border border-gray-200">
              <div className="bg-green-600 text-white p-6 rounded-t-xl">
                <h2 className="text-2xl font-semibold mb-2">Step 3: Document Requirements</h2>
                <p className="opacity-90">Upload all required documents for your {applicationType.toLowerCase()} application</p>
              </div>
              <div className="p-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center">
                    <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                      #
                    </div>
                    <div>
                      <span className="text-gray-700 font-medium">Application Number: </span>
                      <span className="text-green-600 font-bold text-lg">{applicationNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {requiredDocs.map((doc, index) => (
                    <div key={doc} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{doc}</h4>
                            <p className="text-sm text-gray-500">
                              {doc.includes('ID') ? 'Valid government-issued ID' : 
                               doc.includes('Clearance') ? 'Original or certified true copy' :
                               'Required document'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <input 
                            type="file" 
                            id={`file-${index}`}
                            onChange={(e) => handleFileUpload(doc, e.target.files[0])}
                            className="hidden"
                            accept=".pdf,.jpg,.jpeg,.png"
                          />
                          <label 
                            htmlFor={`file-${index}`}
                            className={`px-4 py-2 rounded-lg cursor-pointer transition-all font-medium ${
                              documents[doc] 
                                ? 'bg-green-600 text-white border border-green-600' 
                                : 'bg-green-100 text-green-600 border border-green-600 hover:bg-green-600 hover:text-white'
                            }`}
                          >
                            {documents[doc] ? '✓ Uploaded' : 'Choose File'}
                          </label>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <div className="flex items-start">
                    <div className="text-yellow-600 mr-3 mt-1">⚠️</div>
                    <div className="text-sm text-yellow-800">
                      <p className="font-semibold mb-1">Important Notes:</p>
                      <ul className="space-y-1">
                        <li>• All documents must be in PDF, JPG, JPEG, or PNG format</li>
                        <li>• File size should not exceed 5MB per document</li>
                        <li>• Ensure documents are clear and readable</li>
                        <li>• Original or certified true copies are required</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <button 
                    onClick={prevStep} 
                    className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-all duration-200 font-semibold"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default BusinessApplication;