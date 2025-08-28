const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const businessController = require("../controllers/businessController");

// Destructure the actual middleware functions from the exported object
const { authenticateToken } = require("../middleware/authenticateToken");

const router = express.Router();

const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Ensure the controller functions exist before wiring the routes
const submitApplicationOnlyHandler = businessController && typeof businessController.submitApplicationOnly === "function"
  ? businessController.submitApplicationOnly
  : (req, res) => res.status(500).json({ message: "Server misconfiguration: submitApplicationOnly handler missing." });

const getApplicationStatusHandler = businessController && typeof businessController.getApplicationStatus === "function"
  ? businessController.getApplicationStatus
  : (req, res) => res.status(500).json({ message: "Server misconfiguration: getApplicationStatus handler missing." });

const submitPaymentHandler = businessController && typeof businessController.submitPayment === "function"
  ? businessController.submitPayment
  : (req, res) => res.status(500).json({ message: "Server misconfiguration: submitPayment handler missing." });

const submitApplicationHandler = businessController && typeof businessController.submitApplication === "function"
  ? businessController.submitApplication
  : (req, res) => res.status(500).json({ message: "Server misconfiguration: submitApplication handler missing." });

// 🚀 NEW ROUTES FOR SEPARATE FLOW

// 1️⃣ Submit Application Only (Step 4 - NEW applications)
router.post(
  "/submit-application",
  authenticateToken, 
  upload.array("documents", 10), 
  submitApplicationOnlyHandler
);

// 2️⃣ Get Application Status (for polling)
router.get(
  "/status/:applicationId",
  authenticateToken,
  getApplicationStatusHandler
);

// 3️⃣ Submit Payment (Step 6 - NEW applications)
router.post(
  "/submit-payment",
  authenticateToken,
  submitPaymentHandler
);

// 4️⃣ Regular Submit (for non-NEW applications) - Original route
router.post(
  "/submit",
  authenticateToken, 
  upload.array("documents", 10), 
  submitApplicationHandler
);

module.exports = router;