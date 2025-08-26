const db = require("../db");
const path = require("path");

// Helper: Calculate assessment fees
const calculateAssessmentFees = (formData, transactionType = 'NEW') => {
  const fees = {
    business_permit_fee: 500.00,
    mayors_permit_fee: 200.00,
    sanitary_permit_fee: 150.00,
    fire_safety_fee: 300.00,
    environmental_fee: 100.00,
    capitalization_fee: 0.00,
    employee_fee: 0.00,
    delivery_vehicle_fee: 0.00,
    late_penalty: 0.00,
    interest_charges: 0.00
  };

  // Capitalization-based fees (0.1% or minimum ₱50)
  if (formData.totalCapitalization) {
    const capitalization = parseFloat(formData.totalCapitalization) || 0;
    fees.capitalization_fee = Math.max(capitalization * 0.001, 50.00);
  }

  // Employee-based fees (₱25 per employee)
  const totalEmployees = (parseInt(formData.maleEmployees) || 0) +
                        (parseInt(formData.femaleEmployees) || 0);
  if (totalEmployees > 0) {
    fees.employee_fee = totalEmployees * 25.00;
  }

  // Delivery vehicle fees
  const vanCount = parseInt(formData.vanDeliveryVehicles) || 0;
  const truckCount = parseInt(formData.truckDeliveryVehicles) || 0;
  const motorcycleCount = parseInt(formData.motorcycleDeliveryVehicles) || 0;
  fees.delivery_vehicle_fee = (vanCount * 100) + (truckCount * 150) + (motorcycleCount * 50);

  // Penalties for renewal or delinquent
  if (transactionType === 'RENEWAL') {
    fees.late_penalty = (fees.business_permit_fee + fees.mayors_permit_fee) * 0.05;
  } else if (transactionType === 'DELINQUENT') {
    const baseFees = fees.business_permit_fee + fees.mayors_permit_fee;
    fees.late_penalty = baseFees * 0.10;
    fees.interest_charges = baseFees * 0.02 * 6; // 6 months overdue
  }

  // Calculate totals
  const subtotal = Object.values(fees).reduce((sum, val) => sum + val, 0);
  const tax_amount = subtotal * 0.12; // 12% VAT
  const total_amount = subtotal + tax_amount;

  return {
    ...fees,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax_amount: parseFloat(tax_amount.toFixed(2)),
    total_amount: parseFloat(total_amount.toFixed(2)),
  };
};

// Helper: Generate receipt number
const generateReceiptNumber = () => {
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  return `RCP-${timestamp}${random}`;
};

// Main submit function
exports.submitApplication = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized: User ID not found." });
  }

  const {
    transactionType = 'NEW',
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
    totalCapitalization,
    paymentMethod,
    paymentDetails
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("❌ Transaction start error:", err);
      return res.status(500).json({ message: "Failed to start transaction." });
    }

    // 1️⃣ Insert Business Application
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
        console.error("❌ Application insert error:", err);
        return db.rollback(() => {
          res.status(500).json({ message: "Failed to save application." });
        });
      }

      const applicationId = result.insertId;

      // 2️⃣ Insert Documents (if any)
      if (req.files && req.files.length > 0) {
        const docSQL = `INSERT INTO application_documents (application_id, document_type, file_path) VALUES ?`;
        const docValues = req.files.map(file => [applicationId, file.originalname, file.path]);

        db.query(docSQL, [docValues], (docErr) => {
          if (docErr) {
            console.error("❌ Document insert error:", docErr);
          }
        });
      }

      // 3️⃣ Calculate and Insert Assessment
      const assessmentData = calculateAssessmentFees(req.body, transactionType);
      const insertAssessmentSQL = `
        INSERT INTO business_assessments 
        (application_id, user_id, business_permit_fee, mayors_permit_fee, sanitary_permit_fee,
         fire_safety_fee, environmental_fee, capitalization_fee, employee_fee, delivery_vehicle_fee,
         late_penalty, interest_charges, subtotal, tax_amount, total_amount, notes)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const assessmentValues = [
        applicationId,
        userId,
        assessmentData.business_permit_fee,
        assessmentData.mayors_permit_fee,
        assessmentData.sanitary_permit_fee,
        assessmentData.fire_safety_fee,
        assessmentData.environmental_fee,
        assessmentData.capitalization_fee,
        assessmentData.employee_fee,
        assessmentData.delivery_vehicle_fee,
        assessmentData.late_penalty,
        assessmentData.interest_charges,
        assessmentData.subtotal,
        assessmentData.tax_amount,
        assessmentData.total_amount,
        `Auto-generated assessment for ${transactionType} application`
      ];

      db.query(insertAssessmentSQL, assessmentValues, (assessErr, assessResult) => {
        if (assessErr) {
          console.error("❌ Assessment insert error:", assessErr);
          return db.rollback(() => {
            res.status(500).json({ message: "Failed to create assessment." });
          });
        }

        const assessmentId = assessResult.insertId;

        // 4️⃣ Insert Payment if provided
        if (paymentMethod) {
          const details = typeof paymentDetails === 'string'
            ? JSON.parse(paymentDetails)
            : paymentDetails || {};

          const insertPaymentSQL = `
            INSERT INTO business_payments 
            (application_id, assessment_id, user_id, payment_method, payment_amount, 
             reference_number, payment_details, receipt_number, notes)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          const paymentValues = [
            applicationId,
            assessmentId,
            userId,
            paymentMethod,
            assessmentData.total_amount,
            details.referenceNumber || null,
            JSON.stringify(details),
            generateReceiptNumber(),
            `Payment for ${transactionType} application - ${applicationNumber}`
          ];

          db.query(insertPaymentSQL, paymentValues, (payErr) => {
            if (payErr) {
              console.error("❌ Payment insert error:", payErr);
              return db.rollback(() => {
                res.status(500).json({ message: "Failed to save payment information." });
              });
            }

            db.commit(() => {
              res.status(201).json({
                message: "✅ Application, assessment, and payment submitted successfully!",
                applicationId,
                assessmentId,
              });
            });
          });
        } else {
          db.commit(() => {
            res.status(201).json({
              message: "✅ Application and assessment submitted successfully!",
              applicationId,
              assessmentId,
            });
          });
        }
      });
    });
  });
};
