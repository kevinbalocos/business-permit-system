import React from "react";
import { Building, User, MapPin, Briefcase, FileText } from "lucide-react";

const BusinessInformationForm = ({
  formData,
  handleInputChange,
  applicationNumber,
}) => {
  const businessTypeOptions = [
    "Sole Proprietorship",
    "Partnership",
    "Corporation",
    "Cooperative",
  ];
  const barangayOptions = [
    "ANASTACIA",
    "AQUINO",
    "AYUSAN I",
    "AYUSAN II",
    "BEHIA",
    "BUKAL",
    "BULA",
  ];

  const regionOptions = [
    "REGION IV-A (CALABARZON)",
    "NCR",
    "REGION I (ILOCOS REGION)",
    "REGION II (CAGAYAN VALLEY)",
    "REGION III (CENTRAL LUZON)",
    "REGION IV-B (MIMAROPA)",
    "REGION V (BICOL REGION)",
  ];

  const provinceOptions = {
    "REGION IV-A (CALABARZON)": [
      "QUEZON",
      "BATANGAS",
      "CAVITE",
      "LAGUNA",
      "RIZAL",
    ],
    NCR: ["METRO MANILA"],
    "REGION I (ILOCOS REGION)": [
      "ILOCOS NORTE",
      "ILOCOS SUR",
      "LA UNION",
      "PANGASINAN",
    ],
    "REGION II (CAGAYAN VALLEY)": [
      "BATANES",
      "CAGAYAN",
      "ISABELA",
      "NUEVA VIZCAYA",
      "QUIRINO",
    ],
    "REGION III (CENTRAL LUZON)": [
      "AURORA",
      "BATAAN",
      "BULACAN",
      "NUEVA ECIJA",
      "PAMPANGA",
      "TARLAC",
      "ZAMBALES",
    ],
    "REGION IV-B (MIMAROPA)": [
      "MARINDUQUE",
      "OCCIDENTAL MINDORO",
      "ORIENTAL MINDORO",
      "PALAWAN",
      "ROMBLON",
    ],
    "REGION V (BICOL REGION)": [
      "ALBAY",
      "CAMARINES NORTE",
      "CAMARINES SUR",
      "CATANDUANES",
      "MASBATE",
      "SORSOGON",
    ],
  };

  const cityOptions = {
    QUEZON: [
      "TIAONG",
      "LUCENA CITY",
      "TAYABAS",
      "CANDELARIA",
      "SARIAYA",
      "PAGBILAO",
      "PADRE BURGOS",
    ],
    BATANGAS: [
      "BATANGAS CITY",
      "LIPA CITY",
      "TANAUAN CITY",
      "SANTO TOMAS",
      "MALVAR",
    ],
    CAVITE: [
      "CAVITE CITY",
      "DASMARINAS CITY",
      "BACOOR CITY",
      "IMUS CITY",
      "GENERAL TRIAS",
    ],
    LAGUNA: [
      "CALAMBA CITY",
      "SAN PEDRO CITY",
      "BINAN CITY",
      "SANTA ROSA CITY",
      "CABUYAO CITY",
      "ALAMINOS",
    ],
    RIZAL: ["ANTIPOLO CITY", "CAINTA", "TAYTAY", "ANGONO", "BINANGONAN"],
  };

  const lineOfBusinessOptions = [
    "Retail Trade",
    "Wholesale Trade",
    "Manufacturing",
    "Food Service",
    "Professional Services",
    "Construction",
    "Transportation",
    "Agriculture",
    "Tourism",
    "Information Technology",
    "Healthcare",
    "Education",
    "Real Estate",
    "Financial Services",
    "Others",
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="bg-gradient-to-r from-green-600 to-green-600 text-white p-4 sm:p-6 rounded-t-xl">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Step 2: Business Information
        </h2>
        <p className="opacity-90 text-sm sm:text-base">
          Please provide the required business information
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
          {/* Business Information and Registration */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Building className="w-5 h-5 mr-2 text-green-600" />
              Business Information and Registration
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">Select Business Type</option>
                  {businessTypeOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  DTI/SEC/CDA Registration No.
                </label>
                <input
                  type="text"
                  value={formData.dtiSecCdaNumber}
                  onChange={(e) =>
                    handleInputChange("dtiSecCdaNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter registration number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter business name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tax Identification No. <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.taxIdNumber}
                  onChange={(e) =>
                    handleInputChange("taxIdNumber", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter TIN"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Trade Name/Franchise (if applicable)
                </label>
                <input
                  type="text"
                  value={formData.tradeName}
                  onChange={(e) =>
                    handleInputChange("tradeName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter trade name or franchise"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    handleInputChange("firstName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter first name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Middle Name (optional)
                </label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) =>
                    handleInputChange("middleName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter middle name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    handleInputChange("lastName", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter last name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Extension Name
                </label>
                <input
                  type="text"
                  value={formData.extension}
                  onChange={(e) =>
                    handleInputChange("extension", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Jr., Sr., III, etc."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sex <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.sex}
                  onChange={(e) => handleInputChange("sex", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  required
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-green-600" />
              Contact Information
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter email address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Telephone Number
                </label>
                <input
                  type="text"
                  value={formData.telephone}
                  onChange={(e) =>
                    handleInputChange("telephone", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter telephone number"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter mobile number"
                  required
                />
              </div>
            </div>
          </div>

          {/* Business Address */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Business Address
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* REGION */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Region
                </label>
                <select
                  value={formData.region}
                  onChange={(e) => {
                    handleInputChange("region", e.target.value);
                    handleInputChange("province", "");
                    handleInputChange("city", "");
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="">Select Region</option>
                  {regionOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* PROVINCE */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Province
                </label>
                <select
                  value={formData.province}
                  onChange={(e) => {
                    handleInputChange("province", e.target.value);
                    handleInputChange("city", "");
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  disabled={!formData.region}
                >
                  <option value="">Select Province</option>
                  {formData.region &&
                    provinceOptions[formData.region]?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>

              {/* CITY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  City/Municipality
                </label>
                <select
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  disabled={!formData.province}
                >
                  <option value="">Select City/Municipality</option>
                  {formData.province &&
                    cityOptions[formData.province]?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>

              {/* BARANGAY */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Barangay
                </label>
                <select
                  value={formData.barangay}
                  onChange={(e) =>
                    handleInputChange("barangay", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="">Select Barangay</option>
                  {barangayOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              {/* LOCATION */}
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Location
                </label>
                <textarea
                  value={formData.addressLine1}
                  onChange={(e) =>
                    handleInputChange("addressLine1", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all h-24 resize-none text-sm sm:text-base"
                  placeholder="Enter complete business address/location"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={formData.taxpayerZipCode}
                  onChange={(e) =>
                    handleInputChange("taxpayerZipCode", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter ZIP code"
                />
              </div>
            </div>
          </div>

          {/* Business Operation */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-green-600" />
              Business Operation
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Business Area/Total Floor Area (sq.m){" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.businessArea}
                  onChange={(e) =>
                    handleInputChange("businessArea", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter area in square meters"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. of Employees Residing Within Area{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.employeesInArea}
                  onChange={(e) =>
                    handleInputChange("employeesInArea", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter number of employees"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total No. of Male Employees{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.maleEmployees}
                  onChange={(e) =>
                    handleInputChange("maleEmployees", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter number of male employees"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total No. of Female Employees{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.femaleEmployees}
                  onChange={(e) =>
                    handleInputChange("femaleEmployees", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter number of female employees"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. of Van Delivery Vehicles{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.vanDeliveryVehicles}
                  onChange={(e) =>
                    handleInputChange("vanDeliveryVehicles", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter 0 if not applicable"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. of Truck Delivery Vehicles{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.truckDeliveryVehicles}
                  onChange={(e) =>
                    handleInputChange("truckDeliveryVehicles", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter 0 if not applicable"
                  required
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  No. of Motorcycle Delivery Vehicles{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={formData.motorcycleDeliveryVehicles}
                  onChange={(e) =>
                    handleInputChange(
                      "motorcycleDeliveryVehicles",
                      e.target.value
                    )
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                  placeholder="Enter 0 if not applicable"
                  required
                />
              </div>
            </div>
          </div>

          {/* Taxpayer's Address */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="w-5 h-5 mr-2 text-green-600" />
              Taxpayer's Address
            </h3>

            <div className="mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.sameAsBusinessAddress}
                  onChange={(e) =>
                    handleInputChange("sameAsBusinessAddress", e.target.checked)
                  }
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                />
                <span className="ml-2 text-sm font-semibold text-gray-700">
                  Same as Business Address
                </span>
              </label>
            </div>

            {!formData.sameAsBusinessAddress && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Region
                  </label>
                  <input
                    type="text"
                    value={formData.taxpayerRegion}
                    onChange={(e) =>
                      handleInputChange("taxpayerRegion", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter region"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Province
                  </label>
                  <input
                    type="text"
                    value={formData.taxpayerProvince}
                    onChange={(e) =>
                      handleInputChange("taxpayerProvince", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter province"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    City/Municipality
                  </label>
                  <input
                    type="text"
                    value={formData.taxpayerCity}
                    onChange={(e) =>
                      handleInputChange("taxpayerCity", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter city/municipality"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Barangay
                  </label>
                  <input
                    type="text"
                    value={formData.taxpayerBarangay}
                    onChange={(e) =>
                      handleInputChange("taxpayerBarangay", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter barangay"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Address Line 1
                  </label>
                  <input
                    type="text"
                    value={formData.taxpayerAddressLine1}
                    onChange={(e) =>
                      handleInputChange("taxpayerAddressLine1", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    value={formData.taxpayerZipCode}
                    onChange={(e) =>
                      handleInputChange("taxpayerZipCode", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter ZIP code"
                  />
                </div>
              </div>
            )}

            {/* Property Details */}
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Do you own this place? <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ownProperty"
                      checked={formData.ownProperty === true}
                      onChange={() => handleInputChange("ownProperty", true)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="ownProperty"
                      checked={formData.ownProperty === false}
                      onChange={() => handleInputChange("ownProperty", false)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>

              {formData.ownProperty === false && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Lessor Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.lessorName}
                      onChange={(e) =>
                        handleInputChange("lessorName", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Enter lessor/landlord name"
                      required={formData.ownProperty === false}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Monthly Rental
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyRental}
                      onChange={(e) =>
                        handleInputChange("monthlyRental", e.target.value)
                      }
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                      placeholder="Enter monthly rental amount"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Tax Incentives from any Government Entity{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="taxIncentives"
                      checked={formData.taxIncentives === true}
                      onChange={() => handleInputChange("taxIncentives", true)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">Yes</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="taxIncentives"
                      checked={formData.taxIncentives === false}
                      onChange={() => handleInputChange("taxIncentives", false)}
                      className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">No</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Business Activity */}
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-green-600" />
              Business Activity
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Check one:
                </label>
                <div className="space-y-2">
                  {[
                    "Main Office",
                    "Branch Office",
                    "Admin Office Only",
                    "Warehouse",
                    "Others",
                  ].map((activity) => (
                    <label key={activity} className="flex items-center">
                      <input
                        type="radio"
                        name="businessActivity"
                        value={activity}
                        checked={formData.businessActivity === activity}
                        onChange={(e) =>
                          handleInputChange("businessActivity", e.target.value)
                        }
                        className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {activity}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Line of Business
                </label>
                <select
                  value={formData.lineOfBusiness}
                  onChange={(e) =>
                    handleInputChange("lineOfBusiness", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                >
                  <option value="">Select Line of Business</option>
                  {lineOfBusinessOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Products/Services
                </label>
                <textarea
                  value={formData.productsServices}
                  onChange={(e) =>
                    handleInputChange("productsServices", e.target.value)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all h-24 resize-none text-sm sm:text-base"
                  placeholder="Describe your products and/or services"
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    No. of Units
                  </label>
                  <input
                    type="number"
                    value={formData.numberOfUnits}
                    onChange={(e) =>
                      handleInputChange("numberOfUnits", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter number of units"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Capitalization (₱){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.totalCapitalization}
                    onChange={(e) =>
                      handleInputChange("totalCapitalization", e.target.value)
                    }
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-transparent transition-all text-sm sm:text-base"
                    placeholder="Enter total capitalization"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessInformationForm;
