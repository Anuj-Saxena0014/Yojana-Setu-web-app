// ─────────────────────────────────────────────────────────────────────────────
// routes/schemes.js  –  Gemini-powered scheme API endpoints
// ─────────────────────────────────────────────────────────────────────────────

const express = require("express");
const router = express.Router();
const {
  getPopularSchemes,
  getMatchingSchemes,
  getSchemeDetails,
} = require("../services/gemini");

// ─── GET /api/schemes  ────────────────────────────────────────────────────────
// Returns popular/trending schemes. Supports optional ?search= query param.
// Data is fetched dynamically from Gemini AI.
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    const schemes = await getPopularSchemes(search || "");
    return res.json({
      success: true,
      count: schemes.length,
      data: schemes,
      source: "gemini-ai",
    });
  } catch (err) {
    console.error("GET /api/schemes error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/schemes/filter  ────────────────────────────────────────────────
// Body: { age, gender, annualIncome, state, occupation, category }
// Returns schemes matching this specific user profile via Gemini AI.
router.post("/filter", async (req, res) => {
  try {
    const {
      age = 0,
      gender = "",
      annualIncome = 0,
      state = "",
      occupation = "",
      category = "",
    } = req.body;

    const schemes = await getMatchingSchemes({
      age,
      gender,
      annualIncome,
      state,
      occupation,
      category,
    });

    return res.json({
      success: true,
      count: schemes.length,
      data: schemes,
      source: "gemini-ai",
    });
  } catch (err) {
    console.error("POST /api/schemes/filter error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/schemes/details  ───────────────────────────────────────────────
// Body: { name: "scheme name" }
// Returns detailed information about a specific scheme via Gemini AI.
router.post("/details", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Scheme name is required",
      });
    }

    const scheme = await getSchemeDetails(name);
    return res.json({
      success: true,
      data: scheme,
      source: "gemini-ai",
    });
  } catch (err) {
    console.error("POST /api/schemes/details error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/schemes/:id  ────────────────────────────────────────────────────
// Backward-compatible: treats the :id param as a scheme name slug
// and fetches details from Gemini.
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Convert slug back to a readable name (replace hyphens with spaces)
    const schemeName = decodeURIComponent(id).replace(/-/g, " ");
    const scheme = await getSchemeDetails(schemeName);
    return res.json({
      success: true,
      data: scheme,
      source: "gemini-ai",
    });
  } catch (err) {
    console.error("GET /api/schemes/:id error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
