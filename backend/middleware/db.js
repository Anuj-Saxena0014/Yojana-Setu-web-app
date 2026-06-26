// ─────────────────────────────────────────────────────────────────────────────
// middleware/db.js  –  MongoDB connection (resilient)
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

/**
 * Connects to MongoDB.
 * Required for schemes and user auth.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅  MongoDB connected: ${conn.connection.host}`);
  } catch (err) {
    console.error("❌  MongoDB connection error:", err.message);
    console.log("⚠️   Application requires MongoDB to function.");
    // Don't crash immediately but log the failure

  }
};

module.exports = connectDB;
