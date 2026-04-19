// ─────────────────────────────────────────────────────────────────────────────
// middleware/auth.js  –  JWT authentication middleware
// ─────────────────────────────────────────────────────────────────────────────

const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token;

  // Check if token is in headers
  if (req.headers.authorization) {
    token = req.headers.authorization.startsWith("Bearer ")
      ? req.headers.authorization.split(" ")[1]
      : req.headers.authorization;
  }

  // Make sure token exists
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your_jwt_secret_key"
    );
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized to access this route",
    });
  }
};

module.exports = authMiddleware;
