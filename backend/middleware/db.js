// ─────────────────────────────────────────────────────────────────────────────
// middleware/db.js  –  MongoDB connection (resilient)
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

/**
 * Connects to MongoDB.
 * Schemes are now fetched from Gemini AI — MongoDB is used only for user auth.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌  MongoDB connection error:", err.message);
    console.log("⚠️   Auth features (login/signup) require MongoDB.");
    console.log("     Scheme discovery via Gemini AI will still work.");
    // Don't crash — Gemini AI endpoints still work without MongoDB.
  }
};

module.exports = connectDB;
