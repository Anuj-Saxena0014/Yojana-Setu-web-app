const express = require("express");
const router = express.Router();
const {
  getAllSchemes,
  filterSchemes,
  getSchemeDetailsByName,
  getSchemeById
} = require("../controllers/schemes");

// ─── GET /api/schemes  ────────────────────────────────────────────────────────
// Returns all active schemes. Optionally filters by ?search= query param.
router.get("/", getAllSchemes);

// ─── POST /api/schemes/filter  ────────────────────────────────────────────────
// Body: { age, gender, annualIncome, state, occupation, category }
// Returns schemes matching this profile.
router.post("/filter", filterSchemes);

// ─── POST /api/schemes/details  ───────────────────────────────────────────────
// Body: { name }
// Returns details about a scheme by name from MongoDB.
router.post("/details", getSchemeDetailsByName);

// ─── GET /api/schemes/:id  ────────────────────────────────────────────────────
// Fetch a single scheme by ObjectId or slug/name
router.get("/:id", getSchemeById);

module.exports = router;
