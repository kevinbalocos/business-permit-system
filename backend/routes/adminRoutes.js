const express = require("express");
const adminController = require("../controllers/adminController");
const { authenticateToken, requireRole } = require("../middleware/authenticateToken");

const router = express.Router();

// Helper to check controller function existence
const safeHandler = (handler, name) => {
  return adminController && typeof adminController[handler] === "function"
    ? adminController[handler]
    : (req, res) =>
        res.status(500).json({
          message: `Server misconfiguration: ${name} handler missing.`,
        });
};

// Define route handlers safely
const getAllApplicationsHandler = safeHandler("getAllApplications", "getAllApplications");
const getApplicationDocumentsHandler = safeHandler("getApplicationDocuments", "getApplicationDocuments");
const approveApplicationHandler = safeHandler("approveApplication", "approveApplication");
const rejectApplicationHandler = safeHandler("rejectApplication", "rejectApplication");
const updateApplicationStatusHandler = safeHandler("updateApplicationStatus", "updateApplicationStatus");
const getApplicationDetailsHandler = safeHandler("getApplicationDetails", "getApplicationDetails");
const downloadApplicationDocumentHandler = safeHandler("downloadApplicationDocument", "downloadApplicationDocument");
const viewApplicationDocumentHandler = safeHandler("viewApplicationDocument", "viewApplicationDocument");

// ----------------- Admin Routes -----------------

// 1. Get all business applications for admin review
router.get(
  "/applications",
  authenticateToken,
  requireRole("admin"),
  getAllApplicationsHandler
);

// 2. Get specific application details
router.get(
  "/applications/:applicationId",
  authenticateToken,
  requireRole("admin"),
  getApplicationDetailsHandler
);

// 3. Get application documents
router.get(
  "/applications/:applicationId/documents",
  authenticateToken,
  requireRole("admin"),
  getApplicationDocumentsHandler
);

// 4. Download application documents
// Can download all documents as ZIP or specific document by ID
// Usage: GET /applications/123/download (all docs as ZIP)
//        GET /applications/123/download?documentId=456 (specific doc)
router.get(
  "/applications/:applicationId/download",
  authenticateToken,
  requireRole("admin"),
  downloadApplicationDocumentHandler
);

// 5. View/Display a specific document in browser (for PDFs, images, etc.)
// Usage: GET /applications/123/documents/456/view
router.get(
  "/applications/:applicationId/documents/:documentId/view",
  authenticateToken,
  requireRole("admin"),
  viewApplicationDocumentHandler
);

// 6. Approve application
router.put(
  "/applications/:applicationId/approve",
  authenticateToken,
  requireRole("admin"),
  approveApplicationHandler
);

// 7. Reject application
router.put(
  "/applications/:applicationId/reject",
  authenticateToken,
  requireRole("admin"),
  rejectApplicationHandler
);

// 8. Update application status
router.put(
  "/applications/:applicationId/status",
  authenticateToken,
  requireRole("admin"),
  updateApplicationStatusHandler
);

module.exports = router;