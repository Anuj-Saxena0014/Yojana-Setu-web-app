// ─────────────────────────────────────────────────────────────────────────────
// routes/auth.js  –  Authentication routes
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const { signup, login, getMe, forgotPassword, resetPassword } = require("../controllers/auth");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// ── SIGNUP ─────────────────────────────────────────────────────────────────
router.post("/signup", signup);

// ── LOGIN ──────────────────────────────────────────────────────────────────
router.post("/login", login);

// ── GET CURRENT USER ───────────────────────────────────────────────────────
router.get("/me", authMiddleware, getMe);

// ── FORGOT PASSWORD ────────────────────────────────────────────────────────
router.post("/forgot-password", forgotPassword);

// ── RESET PASSWORD ──────────────────────────────────────────────────────────
router.post("/reset-password/:token", resetPassword);

// ── LOGOUT (frontend handles this by deleting token) ─────────────────────
router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

module.exports = router;
