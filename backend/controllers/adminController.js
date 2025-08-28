const db = require("../db");
const path = require("path");
const fs = require("fs");

exports.getAllApplications = (req, res) => {
  const query = `
    SELECT 
      ba.id,
      ba.application_number,
      ba.business_name,
      ba.transaction_type,
      ba.business_type,
      ba.first_name,
      ba.middle_name,
      ba.last_name,
      ba.email,
      ba.mobile,
      ba.telephone,
      ba.status,
      ba.created_at,
      ba.approved_at,
      ba.rejected_at,
      ba.rejection_reason,
      CONCAT(u.first_name, ' ', u.last_name) AS submitted_by_username
    FROM business_applications ba
    LEFT JOIN users u ON ba.user_id = u.id
    ORDER BY 
      CASE 
        WHEN ba.status = 'pending' THEN 1
        WHEN ba.status = 'under_review' THEN 2
        WHEN ba.status = 'approved' THEN 3
        WHEN ba.status = 'rejected' THEN 4
        ELSE 5
      END,
      ba.created_at DESC
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("❌ Error fetching applications:", err);
      return res.status(500).json({
        message: "Failed to fetch applications",
        error: err.message,
      });
    }

    // Transform the data to match the frontend expectations
    const transformedResults = results.map((app) => ({
      id: app.id,
      name: `${app.business_name} - ${app.application_number}`,
      type: app.business_type || "Business Permit",
      submittedBy: `${app.first_name} ${
        app.middle_name ? app.middle_name + " " : ""
      }${app.last_name}`.trim(),
      email: app.email,
      contactNumber: app.mobile || app.telephone,
      dateSubmitted: app.created_at
        ? new Date(app.created_at).toISOString().split("T")[0]
        : null,
      status: app.status,
      priority: app.transaction_type === "NEW" ? "high" : "normal",
      attachments: [], // You can expand this to fetch actual documents
      description: `${app.transaction_type} application for ${app.business_type}`,
      adminNotes: app.rejection_reason || "",
      applicationNumber: app.application_number,
      transactionType: app.transaction_type,
      approvedAt: app.approved_at,
      rejectedAt: app.rejected_at,
      submittedByUsername: app.submitted_by_username,
    }));

    res.json({
      success: true,
      data: transformedResults,
      total: transformedResults.length,
    });
  });
};

// Get application documents
exports.getApplicationDocuments = (req, res) => {
  const { applicationId } = req.params;

  const query = `
    SELECT id, application_id, document_type, file_path, uploaded_at
    FROM application_documents
    WHERE application_id = ?
    ORDER BY uploaded_at DESC
  `;

  db.query(query, [applicationId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching documents:", err);
      return res.status(500).json({
        message: "Failed to fetch documents",
        error: err.message,
      });
    }

    res.json({
      success: true,
      data: results,
    });
  });
};

// Download application document
exports.downloadApplicationDocument = (req, res) => {
  const { applicationId } = req.params;
  const { documentId } = req.query; // Optional specific document ID

  // First, verify the application exists and user has access
  const verifyQuery = `
    SELECT ba.id, ba.application_number, ba.business_name
    FROM business_applications ba
    WHERE ba.id = ?
  `;

  db.query(verifyQuery, [applicationId], (verifyErr, verifyResults) => {
    if (verifyErr) {
      console.error("❌ Error verifying application:", verifyErr);
      return res.status(500).json({
        message: "Failed to verify application",
        error: verifyErr.message,
      });
    }

    if (verifyResults.length === 0) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const application = verifyResults[0];

    // Get documents for this application
    let docQuery = `
      SELECT id, document_type, file_path, uploaded_at
      FROM application_documents 
      WHERE application_id = ?
    `;
    let docParams = [applicationId];

    if (documentId) {
      docQuery += ` AND id = ?`;
      docParams.push(documentId);
    }

    docQuery += ` ORDER BY uploaded_at DESC`;

    db.query(docQuery, docParams, (docErr, docResults) => {
      if (docErr) {
        console.error("❌ Error fetching documents:", docErr);
        return res.status(500).json({
          message: "Failed to fetch documents",
          error: docErr.message,
        });
      }

      if (docResults.length === 0) {
        return res.status(404).json({
          message: "No documents found for this application",
        });
      }

      // If downloading a single document
      if (documentId && docResults.length === 1) {
        const document = docResults[0];
        const filePath = path.resolve(document.file_path);

        // Check if file exists
        if (!fs.existsSync(filePath)) {
          return res.status(404).json({
            message: "Document file not found on server",
          });
        }

        // Set headers for download
        const filename =
          document.original_filename || `document_${document.id}`;
        res.setHeader(
          "Content-Disposition",
          `attachment; filename="${filename}"`
        );
        res.setHeader("Content-Type", "application/octet-stream");

        // Stream the file
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        fileStream.on("error", (streamErr) => {
          console.error("❌ Error streaming file:", streamErr);
          if (!res.headersSent) {
            res.status(500).json({
              message: "Error downloading file",
              error: streamErr.message,
            });
          }
        });

        return;
      }

      // If downloading multiple documents, create a ZIP file
      const archiver = require("archiver");

      if (!archiver) {
        // If archiver is not installed, return document info instead
        return res.json({
          success: true,
          message:
            "Multiple documents found. Install 'archiver' package for ZIP download.",
          data: {
            application: {
              id: application.id,
              number: application.application_number,
              name: application.business_name,
            },
            documents: docResults.map((doc) => ({
              id: doc.id,
              type: doc.document_type,
              filename: doc.file_path,
              downloadUrl: `/api/admin/applications/${applicationId}/download?documentId=${doc.id}`,
            })),
          },
        });
      }

      // Create ZIP archive
      const archive = archiver("zip", {
        zlib: { level: 9 },
      });

      const zipFilename = `${application.business_name}_${application.application_number}_documents.zip`;
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${zipFilename}"`
      );
      res.setHeader("Content-Type", "application/zip");

      archive.pipe(res);

      // Add files to archive
      let filesAdded = 0;
      const totalFiles = docResults.length;

      docResults.forEach((document) => {
        const filePath = path.resolve(document.file_path);

        if (fs.existsSync(filePath)) {
          const filename =
            document.original_filename ||
            `${document.document_type}_${document.id}`;
          archive.file(filePath, { name: filename });
          filesAdded++;
        }
      });

      if (filesAdded === 0) {
        archive.destroy();
        return res.status(404).json({
          message: "No document files found on server",
        });
      }

      archive.finalize();

      archive.on("error", (archiveErr) => {
        console.error("❌ Error creating archive:", archiveErr);
        if (!res.headersSent) {
          res.status(500).json({
            message: "Error creating document archive",
            error: archiveErr.message,
          });
        }
      });
    });
  });
};

// View/Display application document (for in-browser viewing)
exports.viewApplicationDocument = (req, res) => {
  const { applicationId, documentId } = req.params;
  const { action } = req.query; // "view" or "download"

  // Verify the application exists
  const verifyQuery = `
    SELECT ba.id
    FROM business_applications ba
    WHERE ba.id = ?
  `;

  db.query(verifyQuery, [applicationId], (verifyErr, verifyResults) => {
    if (verifyErr) {
      console.error("❌ Error verifying application:", verifyErr);
      return res.status(500).json({
        message: "Failed to verify application",
        error: verifyErr.message,
      });
    }

    if (verifyResults.length === 0) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Get the document
    const docQuery = `
      SELECT id, document_type, file_path, uploaded_at
      FROM application_documents 
      WHERE application_id = ? AND id = ?
    `;

    db.query(docQuery, [applicationId, documentId], (docErr, docResults) => {
      if (docErr) {
        console.error("❌ Error fetching document:", docErr);
        return res.status(500).json({
          message: "Failed to fetch document",
          error: docErr.message,
        });
      }

      if (docResults.length === 0) {
        return res.status(404).json({
          message: "Document not found",
        });
      }

      const document = docResults[0];
      const filePath = path.resolve(document.file_path);

      // Check if file exists
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({
          message: "Document file not found on server",
        });
      }

      // Get file details
      const stats = fs.statSync(filePath);
      const fileExtension = path.extname(filePath).toLowerCase();

      // Detect file type
      let contentType = "application/octet-stream";
      switch (fileExtension) {
        case ".pdf":
          contentType = "application/pdf";
          break;
        case ".jpg":
        case ".jpeg":
          contentType = "image/jpeg";
          break;
        case ".png":
          contentType = "image/png";
          break;
        case ".gif":
          contentType = "image/gif";
          break;
        case ".txt":
          contentType = "text/plain";
          break;
        case ".doc":
          contentType = "application/msword";
          break;
        case ".docx":
          contentType =
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          break;
      }

      // Set headers: Inline for "view", Attachment for "download"
      res.setHeader("Content-Type", contentType);
      res.setHeader("Content-Length", stats.size);
      res.setHeader(
        "Content-Disposition",
        action === "download"
          ? `attachment; filename="${
              document.original_filename || "document_" + document.id
            }"`
          : "inline"
      );

      // Stream file
      const fileStream = fs.createReadStream(filePath);
      fileStream.pipe(res);

      fileStream.on("error", (streamErr) => {
        console.error("❌ Error streaming file:", streamErr);
        if (!res.headersSent) {
          res.status(500).json({
            message: "Error streaming file",
            error: streamErr.message,
          });
        }
      });
    });
  });
};

// Approve application
exports.approveApplication = (req, res) => {
  const { applicationId } = req.params;
  const { adminNotes } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("❌ Transaction start error:", err);
      return res.status(500).json({ message: "Failed to start transaction." });
    }

    const updateQuery = `
      UPDATE business_applications 
      SET status = 'approved', 
          approved_at = NOW(),
          rejection_reason = ?
      WHERE id = ? AND status IN ('pending', 'under_review')
    `;

    db.query(
      updateQuery,
      [adminNotes || null, applicationId],
      (updateErr, result) => {
        if (updateErr) {
          console.error("❌ Error approving application:", updateErr);
          return db.rollback(() => {
            res.status(500).json({
              message: "Failed to approve application",
              error: updateErr.message,
            });
          });
        }

        if (result.affectedRows === 0) {
          return db.rollback(() => {
            res.status(404).json({
              message: "Application not found or cannot be approved",
            });
          });
        }

        db.commit(() => {
          res.json({
            success: true,
            message: "Application approved successfully",
            applicationId: parseInt(applicationId),
            status: "approved",
            approvedAt: new Date().toISOString(),
            adminNotes,
          });
        });
      }
    );
  });
};

// Reject application
exports.rejectApplication = (req, res) => {
  const { applicationId } = req.params;
  const { adminNotes, rejectionReason } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      console.error("❌ Transaction start error:", err);
      return res.status(500).json({ message: "Failed to start transaction." });
    }

    const updateQuery = `
      UPDATE business_applications 
      SET status = 'rejected', 
          rejected_at = NOW(),
          rejection_reason = ?
      WHERE id = ? AND status IN ('pending', 'under_review')
    `;

    const reason =
      rejectionReason || adminNotes || "Application rejected by admin";

    db.query(updateQuery, [reason, applicationId], (updateErr, result) => {
      if (updateErr) {
        console.error("❌ Error rejecting application:", updateErr);
        return db.rollback(() => {
          res.status(500).json({
            message: "Failed to reject application",
            error: updateErr.message,
          });
        });
      }

      if (result.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({
            message: "Application not found or cannot be rejected",
          });
        });
      }

      db.commit(() => {
        res.json({
          success: true,
          message: "Application rejected successfully",
          applicationId: parseInt(applicationId),
          status: "rejected",
          rejectedAt: new Date().toISOString(),
          rejectionReason: reason,
          adminNotes,
        });
      });
    });
  });
};

// Update application status (for setting under review)
exports.updateApplicationStatus = (req, res) => {
  const { applicationId } = req.params;
  const { status, adminNotes } = req.body;

  // Validate status
  const allowedStatuses = ["pending", "under_review", "approved", "rejected"];
  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Allowed values: " + allowedStatuses.join(", "),
    });
  }

  const updateQuery = `
    UPDATE business_applications 
    SET status = ?,
        rejection_reason = ?,
        ${status === "approved" ? "approved_at = NOW()" : ""}
        ${status === "rejected" ? "rejected_at = NOW()" : ""}
        ${
          status === "approved" || status === "rejected"
            ? ""
            : "approved_at = NULL, rejected_at = NULL"
        }
    WHERE id = ?
  `;

  // Clean up the query
  const cleanQuery = updateQuery.replace(/,\s*WHERE/g, " WHERE");

  db.query(
    cleanQuery,
    [status, adminNotes || null, applicationId],
    (err, result) => {
      if (err) {
        console.error("❌ Error updating application status:", err);
        return res.status(500).json({
          message: "Failed to update application status",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Application not found",
        });
      }

      res.json({
        success: true,
        message: `Application status updated to ${status}`,
        applicationId: parseInt(applicationId),
        status,
        adminNotes,
      });
    }
  );
};

// Get application details
exports.getApplicationDetails = (req, res) => {
  const { applicationId } = req.params;

  const query = `
    SELECT 
      ba.*,
      CONCAT(u.first_name, ' ', u.last_name) AS submitted_by_username,
      u.email as user_email
    FROM business_applications ba
    LEFT JOIN users u ON ba.user_id = u.id
    WHERE ba.id = ?
  `;

  db.query(query, [applicationId], (err, results) => {
    if (err) {
      console.error("❌ Error fetching application details:", err);
      return res.status(500).json({
        message: "Failed to fetch application details",
        error: err.message,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    const application = results[0];

    // Also fetch documents for this application
    const docQuery = `
      SELECT id, document_type, file_path, uploaded_at
      FROM application_documents 
      WHERE application_id = ?
      ORDER BY uploaded_at DESC
    `;

    db.query(docQuery, [applicationId], (docErr, docResults) => {
      if (docErr) {
        console.error("❌ Error fetching documents:", docErr);
      }

      // Transform application data to match frontend expectations
      const transformedApplication = {
        id: application.id,
        name: `${application.business_name} - ${application.application_number}`,
        businessName: application.business_name,
        businessAddress: application.business_address,
        businessType: application.business_type,
        type: application.business_type || "Business Permit",
        submittedBy: `${application.first_name} ${
          application.middle_name ? application.middle_name + " " : ""
        }${application.last_name}`.trim(),
        email: application.email,
        contactNumber: application.mobile || application.telephone,
        dateSubmitted: application.created_at
          ? new Date(application.created_at).toISOString().split("T")[0]
          : null,
        status: application.status,
        priority: application.transaction_type === "NEW" ? "high" : "normal",
        applicationNumber: application.application_number,
        transactionType: application.transaction_type,
        purpose: `${application.transaction_type} application for ${application.business_type}`,
        adminNotes: application.rejection_reason || "",
        rejectionReason: application.rejection_reason,
        approvedAt: application.approved_at,
        rejectedAt: application.rejected_at,
        submittedByUsername: application.submitted_by_username,
        documents: docResults
          ? docResults.map((doc) => ({
              id: doc.id,
              name: doc.original_filename || doc.document_type,
              type: doc.document_type,
              path: doc.file_path,
              createdAt: doc.created_at,
              viewUrl: `/api/admin/applications/${applicationId}/documents/${doc.id}/view`,
              downloadUrl: `/api/admin/applications/${applicationId}/download?documentId=${doc.id}`,
            }))
          : [],
      };

      res.json({
        success: true,
        data: transformedApplication,
      });
    });
  });
};
