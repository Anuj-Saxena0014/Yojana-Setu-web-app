// ─────────────────────────────────────────────────────────────────────────────
// server.js  –  Yojana Setu Express Server
// ─────────────────────────────────────────────────────────────────────────────

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/db");
const schemesRouter = require("./routes/schemes");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// ── Connect to MongoDB (used for auth only; schemes come from Gemini AI) ─────
connectDB();

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/schemes", schemesRouter);
app.use("/api/auth", authRouter);

// Health check
app.get("/api/health", (req, res) =>
  res.json({
    status: "ok",
    message: "Yojana Setu API is running 🚀",
    geminiEnabled: !!process.env.GEMINI_API_KEY,
  })
);

// 404 handler
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);

// Global error handler
app.use((err, req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🌐  Yojana Setu API running at http://localhost:${PORT}`);
  console.log(`🤖  Gemini AI: ${process.env.GEMINI_API_KEY ? "Enabled ✅" : "Not configured ❌"}`);
  console.log(`📋  Endpoints:`);
  console.log(`    GET  /api/schemes          (Gemini AI — popular schemes)`);
  console.log(`    GET  /api/schemes/:id      (Gemini AI — scheme by slug)`);
  console.log(`    POST /api/schemes/filter   (Gemini AI — eligibility match)`);
  console.log(`    POST /api/schemes/details  (Gemini AI — scheme details)`);
  console.log(`    POST /api/auth/signup      (MongoDB)`);
  console.log(`    POST /api/auth/login       (MongoDB)`);
  console.log(`    GET  /api/auth/me          (MongoDB)`);
  console.log(`    GET  /api/health\n`);
});
