// ─────────────────────────────────────────────────────────────────────────────
// server.js  –  Yojana Setu Express Server
// ─────────────────────────────────────────────────────────────────────────────

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./middleware/db");
const schemesRouter = require("./routes/schemes");
const authRouter = require("./routes/auth");
const aiRouter = require("./routes/ai");
const Scheme = require("./models/Scheme");
const seedDatabase = require("./data/seed");
const { startExpiryService } = require("./services/schemeExpiryService");

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────────────────────────
const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());


// ── Connect to MongoDB and Initialize Services ───────────────────────────────
connectDB().then(async () => {
  try {
    const count = await Scheme.countDocuments({});
    if (count === 0) {
      console.log("⚠️ Schemes collection empty. Running seeding service...");
      await seedDatabase();
    } else {
      console.log(`ℹ️ Schemes collection contains ${count} records.`);
    }
    // Start node-cron expiry cleanup service
    startExpiryService();
  } catch (err) {
    console.error("❌ Failed to initialize scheme services:", err.message);
  }
});

// ── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/schemes", schemesRouter);
app.use("/api/auth", authRouter);
app.use("/api/ai", aiRouter);

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
  console.log(`    GET  /api/schemes          (MongoDB)`);
  console.log(`    GET  /api/schemes/:id      (MongoDB)`);
  console.log(`    POST /api/schemes/filter   (MongoDB Rule Engine)`);
  console.log(`    POST /api/schemes/details  (MongoDB)`);
  console.log(`    POST /api/ai/explain       (Gemini AI)`);
  console.log(`    POST /api/ai/chat          (Gemini AI)`);
  console.log(`    POST /api/auth/signup      (MongoDB)`);
  console.log(`    POST /api/auth/login       (MongoDB)`);
  console.log(`    GET  /api/auth/me          (MongoDB)`);
  console.log(`    GET  /api/health\n`);
});

