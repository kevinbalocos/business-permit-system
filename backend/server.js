// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db");
require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const transporter = require("./mailer");
const jwt = require("jsonwebtoken");

const {
  authenticateToken,
  optionalAuthenticateToken,
  requireRole,
} = require("./middleware/authenticateToken");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());



// mount business routes
const businessRoutes = require("./routes/businessRoutes");
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/business", businessRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/admin", adminRoutes);

/* ----------------------
   utility: create default superadmin
   ---------------------- */
const createDefaultSuperadmin = async () => {
  try {
    const superadminEmail = "superadmin@example.com";
    const superadminPassword = "superadminpassword";
    const hashedPassword = bcrypt.hashSync(superadminPassword, 10);

    const query = "SELECT * FROM users WHERE email = ? AND role = 'superadmin'";
    db.query(query, [superadminEmail], (err, results) => {
      if (err) {
        console.error("Error checking for superadmin:", err);
        return;
      }
      if (results.length === 0) {
        const insertQuery =
          "INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        db.query(
          insertQuery,
          [
            "Super",
            "Admin",
            superadminEmail,
            hashedPassword,
            "0000000000",
            "superadmin",
            "approved",
            1,
          ],
          (insertErr) => {
            if (insertErr) {
              console.error("Error creating default superadmin:", insertErr);
            } else {
              console.log("✅ Default superadmin account created.");
            }
          }
        );
      } else {
        console.log("Superadmin account already exists.");
      }
    });
  } catch (err) {
    console.error("createDefaultSuperadmin error:", err);
  }
};
createDefaultSuperadmin();

/* ----------------------
   POST /api/login
   ---------------------- */
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("Database error during login:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (!results || results.length === 0) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const user = results[0];
    const passwordMatch = bcrypt.compareSync(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (!user.verified) {
      return res.status(403).json({ message: "Please verify your email before logging in." });
    }
    if (user.status === "pending") return res.status(403).json({ message: "Your account is pending approval." });
    if (user.status === "denied") return res.status(403).json({ message: "Your account was denied." });

    const userPayload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: "1h" });
    return res.json({ message: "Login successful", token, user: userPayload });
  });
});

/* ----------------------
   PUBLIC REGISTER
   Only allow role = 'user' for public registration.
   New public users are created with status = 'approved' (no admin approval),
   but verified = 0 and a verification token is sent to their email.
   ---------------------- */
app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, role } = req.body;

  // Only allow public signup for role 'user'
  if (role && role !== "user") {
    return res.status(400).json({ message: "Public registration is only allowed for 'user' accounts." });
  }

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const verificationToken = crypto.randomBytes(32).toString("hex");

  // Public user -> approved immediately (no admin approval); but not verified until email clicked
  const initialStatus = "approved";
  const verified = 0;

  const query = `INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    query,
    [firstName, lastName, email, hashedPassword, phoneNumber || "", "user", initialStatus, verified, verificationToken],
    (err, result) => {
      if (err) {
        console.error("Registration failed:", err);
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ message: "Email already registered." });
        }
        return res.status(500).json({ message: "Registration failed due to server error." });
      }

      const verifyURL = `${process.env.BASE_URL}/verify?token=${verificationToken}`;

      transporter
        .sendMail({
          from: `"App Support" <${process.env.SMTP_EMAIL}>`,
          to: email,
          subject: "Verify your email",
          html: `<h3>Verify your account</h3>
                 <p>Hello ${firstName},</p>
                 <p>Click the link to verify your email address for your account: <a href="${verifyURL}">${verifyURL}</a></p>
                 <p>If you did not request this, please ignore this email.</p>`,
        })
        .then(() => {
          res.status(201).json({
            message: "Registered. Check your email for verification. Your account is active (no admin approval required).",
          });
        })
        .catch((mailErr) => {
          console.error("Error sending verification email:", mailErr);
          res.status(201).json({
            message:
              "Registered, but failed to send verification email. Your account is active (no admin approval required). Please contact support.",
          });
        });
    }
  );
});

/* ----------------------
   Protected user creation endpoint (admin/superadmin)
   - If creator makes a 'user' -> set status = 'approved'
   - If creator makes 'admin' or 'cashier' -> set status = 'pending' (requires superadmin approval)
   All new accounts get a verification token (verified = 0) and a verification email is sent.
   ---------------------- */
app.post("/api/users/create", authenticateToken, requireRole("admin", "superadmin"), (req, res) => {
  const { firstName, lastName, email, phoneNumber, role, password } = req.body;

  const allowedRoles = ["user", "admin", "cashier"];
  if (!allowedRoles.includes(role)) return res.status(400).json({ message: "Invalid role specified." });
  if (!firstName || !lastName || !email) return res.status(400).json({ message: "Missing required fields." });

  const tempPassword = password || crypto.randomBytes(6).toString("hex");
  const hashedPassword = bcrypt.hashSync(tempPassword, 10);

  // Decide status: public users auto-approved, admin/cashier require superadmin approval
  let statusForNew;
  if (role === "user") {
    statusForNew = "approved";
  } else {
    // admin or cashier -> pending approval by superadmin
    statusForNew = "pending";
  }

  const verificationToken = crypto.randomBytes(32).toString("hex");
  const verified = 0;

  const insertQuery =
    "INSERT INTO users (first_name, last_name, email, password, phone_number, role, status, verified, verification_token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(
    insertQuery,
    [firstName, lastName, email, hashedPassword, phoneNumber || "", role, statusForNew, verified, verificationToken],
    (err, result) => {
      if (err) {
        console.error("Error creating user:", err);
        if (err.code === "ER_DUP_ENTRY") return res.status(409).json({ message: "Email already registered." });
        return res.status(500).json({ message: "Failed to create user." });
      }

      // Send verification email (best effort)
      const verifyURL = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
      transporter.sendMail({
        from: `"App Support" <${process.env.SMTP_EMAIL}>`,
        to: email,
        subject: `Your ${role} account`,
        html: `<p>Hello ${firstName},</p>
               <p>An account has been created for you as <strong>${role}</strong>.</p>
               <p>Email: ${email}</p>
               <p>Password: ${tempPassword}</p>
               <p>Verify your email: <a href="${verifyURL}">${verifyURL}</a></p>`,
      }).catch((mailErr) => {
        console.warn("Failed to send credentials email:", mailErr);
      });

      return res.status(201).json({
        message: `${role} account created.`,
        userId: result.insertId,
        tempPassword: password ? undefined : tempPassword,
        status: statusForNew,
      });
    }
  );
});

/* ----------------------
   GET /api/users
   - optional auth: prefer token identity; fallback to query params
   ---------------------- */
app.get("/api/users", optionalAuthenticateToken, (req, res) => {
  // Prefer authenticated identity if provided
  let requestingUserRole = req.user?.role || req.query.role;
  let requestingUserId = req.user?.id || req.query.userId;

  requestingUserRole = requestingUserRole ? String(requestingUserRole) : null;

  let query = "SELECT id, first_name, last_name, email, phone_number, status, role, created_at, updated_at FROM users";
  let params = [];

  if (requestingUserRole === "admin") {
    // admin sees everyone except superadmin
    query += " WHERE role != 'superadmin'";
  } else if (requestingUserRole === "superadmin") {
    // superadmin sees everyone; optionally exclude themselves
    if (requestingUserId) {
      query += " WHERE id != ?";
      params.push(requestingUserId);
    }
  } else {
    return res.status(403).json({ message: "Unauthorized to view users." });
  }

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("Failed to fetch users:", err);
      return res.status(500).json({ message: "Failed to fetch users" });
    }
    res.json(results);
  });
});

/* ----------------------
   POST /api/users/:id/status
   Authorization rules updated:
   - If target role is admin or cashier -> ONLY superadmin may approve/deny
   - If target role is user -> admin and superadmin may change status (if desired)
   ---------------------- */
app.post("/api/users/:id/status", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const requestingUserRole = req.user?.role;

  if (!["approved", "denied"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const getUserRoleQuery = "SELECT role FROM users WHERE id = ?";
  db.query(getUserRoleQuery, [id], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const targetUserRole = userResults[0].role;

    if (["admin", "cashier"].includes(targetUserRole)) {
      // Only superadmin may change these roles' status
      if (requestingUserRole !== "superadmin") {
        return res.status(403).json({ message: "Only superadmin can change status of admin/cashier accounts." });
      }
    } else if (targetUserRole === "user") {
      // Admins and superadmins can change users if you want — keep this.
      if (!["admin", "superadmin"].includes(requestingUserRole)) {
        return res.status(403).json({ message: "Unauthorized to perform this action." });
      }
    } else {
      // fallback
      return res.status(403).json({ message: "Unauthorized to perform this action." });
    }

    const updateQuery = "UPDATE users SET status = ? WHERE id = ?";
    db.query(updateQuery, [status, id], (updateErr) => {
      if (updateErr) {
        console.error("Failed to update status:", updateErr);
        return res.status(500).json({ message: "Failed to update status" });
      }
      res.json({ message: `User status updated to ${status}` });
    });
  });
});

/* ----------------------
   Email verify endpoint
   ---------------------- */
app.get("/api/verify", (req, res) => {
  const { token } = req.query;

  const query =
    "UPDATE users SET verified = 1, verification_token = NULL WHERE verification_token = ?";
  db.query(query, [token], (err, result) => {
    if (err || result.affectedRows === 0) {
      return res.status(400).send("Invalid or expired token.");
    }
    res.send("Email verified successfully.");
  });
});

/* ----------------------
   Resend verification
   ---------------------- */
app.post("/api/resend-verification", (req, res) => {
  const { email } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err || results.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }
    const user = results[0];

    if (user.verified) {
      return res.status(400).json({ message: "Email already verified." });
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const updateTokenQuery =
      "UPDATE users SET verification_token = ? WHERE id = ?";
    db.query(updateTokenQuery, [verificationToken, user.id], (updateErr) => {
      if (updateErr) {
        console.error("Failed to update verification token:", updateErr);
        return res.status(500).json({ message: "Failed to update verification token." });
      }

      const verifyURL = `${process.env.BASE_URL}/verify?token=${verificationToken}`;
      transporter
        .sendMail({
          from: `"App Support" <${process.env.SMTP_EMAIL}>`,
          to: user.email,
          subject: "Verify your email",
          html: `<h3>Verify your account</h3>
                 <p>Hello ${user.first_name},</p>
                 <p>Click the link to verify your email address for your account: <a href="${verifyURL}">${verifyURL}</a></p>
                 <p>If you did not request this, please ignore this email.</p>`,
        })
        .then(() => {
          res.status(200).json({ message: "New verification email sent." });
        })
        .catch((mailErr) => {
          console.error("Error sending verification email:", mailErr);
          res.status(500).json({ message: "Failed to send verification email." });
        });
    });
  });
});

/* ---------------------- */
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
