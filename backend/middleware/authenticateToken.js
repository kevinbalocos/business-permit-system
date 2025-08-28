const jwt = require("jsonwebtoken");

function optionalAuthenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    if (!authHeader) return next();
    const token = authHeader.split(" ")[1];
    if (!token) return next();

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        // don't block; treat as unauthenticated
        console.warn("Token invalid/expired (optional auth):", err.message);
        return next();
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("optionalAuthenticateToken error:", error);
    next();
  }
}

function authenticateToken(req, res, next) {
  try {
    const authHeader = req.headers["authorization"] || req.headers["Authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid or expired token" });
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(500).json({ message: "Server error during authentication" });
  }
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    const role = req.user?.role;
    if (!role || !allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: insufficient role" });
    }
    next();
  };
}

module.exports = {
  authenticateToken,
  optionalAuthenticateToken,
  requireRole,
};
