const db = require("../db");
const path = require("path");

exports.submitApplication = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID not found." });
  }

  const {
    transactionType,
    applicationNumber,
    businessType,
    dtiSecCdaNumber,
    businessName,
    taxIdNumber,
    tradeName,
    firstName,
    middleName,
    lastName,
    extension,
    sex,
    email,
    telephone,
    mobile,
    region,
    province,
    city,
    barangay,
    addressLine1,
    taxpayerZipCode,
    businessArea,
    employeesInArea,
    maleEmployees,
    femaleEmployees,
    vanDeliveryVehicles,
    truckDeliveryVehicles,
    motorcycleDeliveryVehicles,
    sameAsBusinessAddress,
    taxpayerRegion,
    taxpayerProvince,
    taxpayerCity,
    taxpayerBarangay,
    taxpayerAddressLine1,
    ownProperty,
    lessorName,
    monthlyRental,
    taxIncentives,
    businessActivity,
    lineOfBusiness,
    productsServices,
    numberOfUnits,
    totalCapitalization
  } = req.body;

  const insertAppSQL = `
    INSERT INTO business_applications 
    (user_id, business_type, dti_sec_cda_number, business_name, tax_id_number, trade_name, first_name, middle_name, last_name, extension, sex, email, telephone, mobile, region, province, city, barangay, address_line_1, taxpayer_zip_code, business_area, employees_in_area, male_employees, female_employees, van_delivery_vehicles, truck_delivery_vehicles, motorcycle_delivery_vehicles, same_as_business_address, taxpayer_region, taxpayer_province, taxpayer_city, taxpayer_barangay, taxpayer_address_line_1, own_property, lessor_name, monthly_rental, tax_incentives, business_activity, line_of_business, products_services, number_of_units, total_capitalization)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const appValues = [
    userId,
    businessType,
    dtiSecCdaNumber,
    businessName,
    taxIdNumber,
    tradeName,
    firstName,
    middleName,
    lastName,
    extension,
    sex,
    email,
    telephone,
    mobile,
    region,
    province,
    city,
    barangay,
    addressLine1,
    taxpayerZipCode,
    businessArea,
    employeesInArea,
    maleEmployees,
    femaleEmployees,
    vanDeliveryVehicles,
    truckDeliveryVehicles,
    motorcycleDeliveryVehicles,
    sameAsBusinessAddress,
    taxpayerRegion,
    taxpayerProvince,
    taxpayerCity,
    taxpayerBarangay,
    taxpayerAddressLine1,
    ownProperty,
    lessorName,
    monthlyRental,
    taxIncentives,
    businessActivity,
    lineOfBusiness,
    productsServices,
    numberOfUnits,
    totalCapitalization
  ];

  db.query(insertAppSQL, appValues, (err, result) => {
    if (err) {
      console.error("❌ Error inserting business application:", err);
      return res.status(500).json({ message: "Database error occurred." });
    }

    const applicationId = result.insertId;

    if (req.files && req.files.length > 0) {
      const docSQL = `
        INSERT INTO application_documents (application_id, document_type, file_path)
        VALUES ?
      `;
      const docValues = req.files.map(file => [
        applicationId,
        file.originalname,
        file.path
      ]);

      db.query(docSQL, [docValues], (docErr) => {
        if (docErr) {
          console.error("❌ Error saving documents:", docErr);
          return res.status(500).json({
            message: "Application saved, but failed to save documents."
          });
        }
      });
    }

    res.status(201).json({
      message: "✅ Business application submitted successfully!",
      applicationId,
    });
  });
};

