const db = require("../db");
const path = require("path");

const calculateFixedAssessmentFees = () => {
  const fees = {
    business_permit_fee: 1000.0, // BUSINESS TAX - SERVICE ACTIVITIES
    mayors_permit_fee: 100.0, // MAYOR'S PERMIT FEE - SERVICE ACTIVITIES
    sanitary_permit_fee: 60.0, // ANNUAL INSPECTION FEE - SANITARY
    fire_safety_fee: 536.0, // ANNUAL INSPECTION FEE - ELECTRICAL
    environmental_fee: 120.0, // ANNUAL INSPECTION FEE - MECHANICAL
    capitalization_fee: 120.0, // ANNUAL INSPECTION FEE - BUILDING
    employee_fee: 72.0, // ANNUAL BUILDING INSPECTION FEE - SIGNAGE
    delivery_vehicle_fee: 350.0, // BARANGAY CLEARANCE FEE
    late_penalty: 0.0,
    interest_charges: 0.0,
  };

  // Additional fees from the statement
  const additional_fees = {
    garbage_fee: 360.0,
    health_cert_fee: 8.0,
    occupational_fee: 100.0,
    sanitary_inspection_fee: 300.0,
    solid_waste_certification_fee: 80.0,
    verification_fee: 100.0,
    zoning_fee: 600.0,
  };

  // Calculate totals
  const baseFees = Object.values(fees).reduce((sum, val) => sum + val, 0);
  const additionalFeesTotal = Object.values(additional_fees).reduce(
    (sum, val) => sum + val,
    0
  );
  const subtotal = baseFees + additionalFeesTotal;
  const tax_amount = 0.0; // No tax shown in the Electronic Statement
  const total_amount = subtotal;

  return {
    ...fees,
    subtotal: parseFloat(subtotal.toFixed(2)),
    tax_amount: parseFloat(tax_amount.toFixed(2)),
    total_amount: parseFloat(total_amount.toFixed(2)),
    additional_fees,
  };
};

// Helper: Generate receipt number
function generateReceiptNumber() {
  const prefix = "RCP";
  const timestamp = Date.now().toString().slice(-8);
  const random = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, "0");
  return `${prefix}-${timestamp}-${random}`;
}

// 1️⃣ Submit Application Only (Step 4 - NEW applications)
exports.submitApplicationOnly = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID not found." });
  }

  const {
    transactionType = "NEW",
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
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("❌ Transaction start error:", err);
      return res.status(500).json({ message: "Failed to start transaction." });
    }

    // Insert Business Application with 'pending' status
    const insertAppSQL = `
  INSERT INTO business_applications 
  (user_id, application_number, transaction_type, business_type, dti_sec_cda_number, business_name, 
   tax_id_number, trade_name, first_name, middle_name, last_name, extension, sex, email, telephone, 
   mobile, region, province, city, barangay, address_line_1, taxpayer_zip_code, business_area, 
   employees_in_area, male_employees, female_employees, van_delivery_vehicles, truck_delivery_vehicles, 
   motorcycle_delivery_vehicles, same_as_business_address, taxpayer_region, taxpayer_province, 
   taxpayer_city, taxpayer_barangay, taxpayer_address_line_1, own_property, lessor_name, 
   monthly_rental, tax_incentives, business_activity, line_of_business, products_services, 
   number_of_units, total_capitalization)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
`;

    const appValues = [
      userId,
      applicationNumber,
      transactionType,
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
    ];

    db.query(insertAppSQL, appValues, (err, result) => {
      if (err) {
        console.error("❌ Application insert error:", err);
        return db.rollback(() => {
          res.status(500).json({ message: "Failed to save application." });
        });
      }

      const applicationId = result.insertId;

      // Insert Documents (if any)
      if (req.files && req.files.length > 0) {
        const docSQL = `INSERT INTO application_documents (application_id, document_type, file_path) VALUES ?`;
        const docValues = req.files.map((file) => [
          applicationId,
          file.originalname,
          file.path,
        ]);

        db.query(docSQL, [docValues], (docErr) => {
          if (docErr) {
            console.error("❌ Document insert error:", docErr);
          }
        });
      }

      db.commit(() => {
        res.status(201).json({
          message:
            "✅ Application submitted successfully! Awaiting admin approval.",
          applicationId,
          status: "pending",
        });
      });
    });
  });
};

// 2️⃣ Check Application Status (for polling)
exports.getApplicationStatus = (req, res) => {
  const userId = req.user?.id;
  const { applicationId } = req.params;

  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID not found." });
  }

  const query = `
    SELECT id, status, rejection_reason, approved_at, rejected_at 
    FROM business_applications 
    WHERE id = ? AND user_id = ?
  `;

  db.query(query, [applicationId, userId], (err, results) => {
    if (err) {
      console.error("❌ Status check error:", err);
      return res
        .status(500)
        .json({ message: "Failed to check application status." });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Application not found." });
    }

    const application = results[0];
    res.json({
      status: application.status,
      message:
        application.status === "rejected" ? application.rejection_reason : null,
      approvedAt: application.approved_at,
      rejectedAt: application.rejected_at,
    });
  });
};

// 3️⃣ Submit Payment (Step 6 - NEW applications)
exports.submitPayment = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID not found." });
  }

  const { applicationId, paymentMethod, paymentDetails } = req.body;

  if (!applicationId || !paymentMethod) {
    return res.status(400).json({
      message: "Missing required fields: applicationId or paymentMethod.",
    });
  }

  // Generate fixed assessment data
  const assessmentData = calculateFixedAssessmentFees();

  db.beginTransaction((err) => {
    if (err) {
      console.error("❌ Transaction start error:", err);
      return res.status(500).json({ message: "Failed to start transaction." });
    }

    // First, verify the application is approved and belongs to the user
    const checkAppSQL = `
      SELECT id FROM business_applications 
      WHERE id = ? AND user_id = ? AND status = 'approved'
    `;

    db.query(checkAppSQL, [applicationId, userId], (checkErr, checkResults) => {
      if (checkErr) {
        console.error("❌ Application check error:", checkErr);
        return db.rollback(() => {
          res.status(500).json({ message: "Failed to verify application." });
        });
      }

      if (checkResults.length === 0) {
        return db.rollback(() => {
          res
            .status(400)
            .json({ message: "Application not found or not approved." });
        });
      }

      // Insert Assessment with fixed fees (using existing schema only)
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
        `Electronic Statement of Account - Fixed Assessment for NEW application (San Pablo City). Additional fees included: Garbage Fee ₱${assessmentData.additional_fees.garbage_fee}, Health Cert ₱${assessmentData.additional_fees.health_cert_fee}, Occupational ₱${assessmentData.additional_fees.occupational_fee}, Sanitary Inspection ₱${assessmentData.additional_fees.sanitary_inspection_fee}, Solid Waste ₱${assessmentData.additional_fees.solid_waste_certification_fee}, Verification ₱${assessmentData.additional_fees.verification_fee}, Zoning ₱${assessmentData.additional_fees.zoning_fee}`,
      ];

      db.query(
        insertAssessmentSQL,
        assessmentValues,
        (assessErr, assessResult) => {
          if (assessErr) {
            console.error("❌ Assessment insert error:", assessErr);
            console.error("❌ SQL Query:", insertAssessmentSQL);
            console.error("❌ Values:", assessmentValues);
            return db.rollback(() => {
              res.status(500).json({
                message: "Failed to create assessment.",
                error: assessErr.message,
              });
            });
          }

          const assessmentId = assessResult.insertId;

          // Insert Payment
          const insertPaymentSQL = `
          INSERT INTO business_payments 
          (application_id, assessment_id, user_id, payment_method, payment_amount, 
           reference_number, payment_details, receipt_number, notes)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

          const details = paymentDetails || {};
          const paymentValues = [
            applicationId,
            assessmentId,
            userId,
            paymentMethod,
            assessmentData.total_amount,
            details.referenceNumber || null,
            JSON.stringify(details),
            generateReceiptNumber(),
            `Payment for NEW application - Electronic Statement of Account (₱${assessmentData.total_amount.toFixed(
              2
            )})`,
          ];

          db.query(insertPaymentSQL, paymentValues, (payErr, payResult) => {
            if (payErr) {
              console.error("❌ Payment insert error:", payErr);
              return db.rollback(() => {
                res
                  .status(500)
                  .json({ message: "Failed to save payment information." });
              });
            }

            // Update application status to 'completed'
            const updateStatusSQL = `
            UPDATE business_applications 
            SET status = 'completed', completed_at = NOW() 
            WHERE id = ?
          `;

            db.query(updateStatusSQL, [applicationId], (updateErr) => {
              if (updateErr) {
                console.error("❌ Status update error:", updateErr);
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ message: "Failed to update application status." });
                });
              }

              db.commit(() => {
                res.status(201).json({
                  message:
                    "✅ Payment submitted successfully! Electronic Statement of Account processed.",
                  applicationId,
                  assessmentId,
                  paymentId: payResult.insertId,
                  receiptNumber: paymentValues[7],
                  totalAmount: assessmentData.total_amount,
                  assessmentData: {
                    ...assessmentData,
                    breakdown: {
                      main_fees: {
                        business_tax: assessmentData.business_permit_fee,
                        mayors_permit: assessmentData.mayors_permit_fee,
                        building_inspection: assessmentData.capitalization_fee,
                        electrical_inspection: assessmentData.fire_safety_fee,
                        mechanical_inspection: assessmentData.environmental_fee,
                        sanitary_inspection: assessmentData.sanitary_permit_fee,
                        signage_fee: assessmentData.employee_fee,
                        barangay_clearance: assessmentData.delivery_vehicle_fee,
                      },
                      additional_fees: assessmentData.additional_fees,
                    },
                  },
                });
              });
            });
          });
        }
      );
    });
  });
};

// 4️⃣ Regular Submit (for non-NEW applications) - Original function
exports.submitApplication = (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "Unauthorized: User ID not found." });
  }

  const {
    transactionType = "RENEWAL",
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
    paymentDetails,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("❌ Transaction start error:", err);
      return res.status(500).json({ message: "Failed to start transaction." });
    }

    // Insert Business Application
    const insertAppSQL = `
      INSERT INTO business_applications 
      (user_id, application_number, transaction_type, business_type, dti_sec_cda_number, business_name, 
       tax_id_number, trade_name, first_name, middle_name, last_name, extension, sex, email, telephone, 
       mobile, region, province, city, barangay, address_line_1, taxpayer_zip_code, business_area, 
       employees_in_area, male_employees, female_employees, van_delivery_vehicles, truck_delivery_vehicles, 
       motorcycle_delivery_vehicles, same_as_business_address, taxpayer_region, taxpayer_province, 
       taxpayer_city, taxpayer_barangay, taxpayer_address_line_1, own_property, lessor_name, 
       monthly_rental, tax_incentives, business_activity, line_of_business, products_services, 
       number_of_units, total_capitalization, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'completed')
    `;

    const appValues = [
      userId,
      applicationNumber,
      transactionType,
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
    ];

    db.query(insertAppSQL, appValues, (err, result) => {
      if (err) {
        console.error("❌ Application insert error:", err);
        return db.rollback(() => {
          res.status(500).json({ message: "Failed to save application." });
        });
      }

      const applicationId = result.insertId;

      // Insert Documents (if any)
      if (req.files && req.files.length > 0) {
        const docSQL = `INSERT INTO application_documents (application_id, document_type, file_path) VALUES ?`;
        const docValues = req.files.map((file) => [
          applicationId,
          file.originalname,
          file.path,
        ]);

        db.query(docSQL, [docValues], (docErr) => {
          if (docErr) {
            console.error("❌ Document insert error:", docErr);
          }
        });
      }

      // Calculate and Insert Assessment
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
        `Auto-generated assessment for ${transactionType} application`,
      ];

      db.query(
        insertAssessmentSQL,
        assessmentValues,
        (assessErr, assessResult) => {
          if (assessErr) {
            console.error("❌ Assessment insert error:", assessErr);
            return db.rollback(() => {
              res.status(500).json({ message: "Failed to create assessment." });
            });
          }

          const assessmentId = assessResult.insertId;

          // Insert Payment if provided
          if (paymentMethod) {
            const details =
              typeof paymentDetails === "string"
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
              `Payment for ${transactionType} application - ${applicationNumber}`,
            ];

            db.query(insertPaymentSQL, paymentValues, (payErr) => {
              if (payErr) {
                console.error("❌ Payment insert error:", payErr);
                return db.rollback(() => {
                  res
                    .status(500)
                    .json({ message: "Failed to save payment information." });
                });
              }

              db.commit(() => {
                res.status(201).json({
                  message:
                    "✅ Application, assessment, and payment submitted successfully!",
                  applicationId,
                  assessmentId,
                });
              });
            });
          } else {
            db.commit(() => {
              res.status(201).json({
                message:
                  "✅ Application and assessment submitted successfully!",
                applicationId,
                assessmentId,
              });
            });
          }
        }
      );
    });
  });
};
