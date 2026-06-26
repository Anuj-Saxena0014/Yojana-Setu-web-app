const mongoose = require("mongoose");
const Scheme = require("../models/Scheme");
const { matchesProfile, enrichSchemeData } = require("../utils/schemeUtils");

// ─── GET /api/schemes ────────────────────────────────────────────────────────
exports.getAllSchemes = async (req, res) => {
  try {
    const { search } = req.query;

    let query = { isActive: true };

    if (search) {
      // Use MongoDB text search
      query.$text = { $search: search.trim() };
    }

    // Sort by Active (isActive=true is filtered), Last Verified, Recently Updated
    // If text search is used, we could also sort by text score, but instructions ask for specific sort
    let sortObj = { isActive: -1, lastVerified: -1, updatedAt: -1 };
    
    // Using lean for performance
    const schemes = await Scheme.find(query).sort(sortObj).lean();

    // Enrich with lifecycle status and alerts
    const enriched = enrichSchemeData(schemes);

    return res.json({
      success: true,
      message: "Schemes retrieved successfully",
      count: enriched.length,
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/schemes/filter ────────────────────────────────────────────────
exports.filterSchemes = async (req, res) => {
  try {
    const profile = req.body;

    // Load active schemes and use lean for performance
    const activeSchemes = await Scheme.find({ isActive: true }).lean();

    // Rule-based filtering
    const candidates = activeSchemes.filter(s => matchesProfile(s, profile));

    // Enrich cards with warning notifications and remaining days
    const enriched = enrichSchemeData(candidates);

    // Sort by daysRemaining, lastVerified, launchDate
    enriched.sort((a, b) => {
      if (a.daysRemaining !== b.daysRemaining) {
        if (a.daysRemaining === null) return 1;
        if (b.daysRemaining === null) return -1;
        return a.daysRemaining - b.daysRemaining; // Ascending
      }
      
      const aVerified = a.lastVerified ? new Date(a.lastVerified).getTime() : 0;
      const bVerified = b.lastVerified ? new Date(b.lastVerified).getTime() : 0;
      if (aVerified !== bVerified) {
        return bVerified - aVerified; // Descending (most recent first)
      }

      const aLaunch = a.launchDate ? new Date(a.launchDate).getTime() : 0;
      const bLaunch = b.launchDate ? new Date(b.launchDate).getTime() : 0;
      return bLaunch - aLaunch; // Descending
    });

    return res.json({
      success: true,
      message: "Filtered schemes successfully",
      count: enriched.length,
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/schemes/details ───────────────────────────────────────────────
exports.getSchemeDetailsByName = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: "Scheme name is required" });
    }

    const normalized = name.trim().toLowerCase().replace(/-/g, " ");
    const scheme = await Scheme.findOne({
      $or: [
        { name: new RegExp(`^${normalized}$`, "i") },
        { name: new RegExp(normalized, "i") }
      ]
    }).lean();

    if (!scheme) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }

    const enriched = enrichSchemeData([scheme])[0];

    return res.json({
      success: true,
      message: "Scheme details retrieved",
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── GET /api/schemes/:id ────────────────────────────────────────────────────
exports.getSchemeById = async (req, res) => {
  try {
    const { id } = req.params;
    let scheme = null;

    if (mongoose.Types.ObjectId.isValid(id)) {
      scheme = await Scheme.findById(id).lean();
    }

    if (!scheme) {
      const decoded = decodeURIComponent(id).replace(/-/g, " ");
      scheme = await Scheme.findOne({
        $or: [
          { name: new RegExp(`^${decoded}$`, "i") },
          { name: new RegExp(decoded, "i") }
        ]
      }).lean();
    }

    if (!scheme) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }

    const enriched = enrichSchemeData([scheme])[0];

    return res.json({
      success: true,
      message: "Scheme retrieved successfully",
      data: enriched,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
