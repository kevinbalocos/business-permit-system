// backend/routes/businessRoutes.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const businessController = require("../controllers/businessController");

// destructure the actual middleware functions from the exported object:
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

// ensure the controller function exists before wiring the route (helpful safe-check)
const submitHandler = businessController && typeof businessController.submitApplication === "function"
  ? businessController.submitApplication
  : (req, res) => res.status(500).json({ message: "Server misconfiguration: submitApplication handler missing." });

router.post(
  "/submit",
  authenticateToken, 
  upload.array("documents", 10), 
  submitHandler
);

module.exports = router;
