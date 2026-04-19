// ─────────────────────────────────────────────────────────────────────────────
// models/Scheme.js  –  Mongoose schema for a government scheme
// ─────────────────────────────────────────────────────────────────────────────

const mongoose = require("mongoose");

const EligibilitySchema = new mongoose.Schema(
  {
    occupation: { type: [String], default: [] },
    minAge: { type: Number, default: 0 },
    maxAge: { type: Number, default: 99 },
    maxIncome: { type: Number, default: 1000000 },
    gender: { type: [String], default: ["Male", "Female", "Other"] },
    category: { type: [String], default: [] },
    states: { type: [String], default: ["All"] },
  },
  { _id: false }
);

const SchemeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    description: { type: String, required: true },
    ministry: { type: String, default: "" },
    launchedYear: { type: Number },
    category: { type: String, default: "General" },
    imageEmoji: { type: String, default: "🏛️" },
    benefits: { type: [String], default: [] },
    applicationUrl: { type: String, default: "" },
    eligibility: { type: EligibilitySchema, required: true },
  },
  { timestamps: true }
);

// Text index for full-text search
SchemeSchema.index({ name: "text", shortDescription: "text", description: "text" });

module.exports = mongoose.model("Scheme", SchemeSchema);
