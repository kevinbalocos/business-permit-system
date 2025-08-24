const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const businessController = require("../controllers/businessController");

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

router.post(
  "/submit",
  upload.array("documents", 10), 
  businessController.submitApplication
);

module.exports = router;
