const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Scheme = require("../models/Scheme");
const { rankSchemesWithGemini } = require("../services/gemini");

/**
 * Strict rule-based filtering logic.
 * Checks age, income, gender, state, occupation, and category.
 */
function matchesProfile(scheme, profile) {
  const e = scheme.eligibility;
  if (!e) return true;

  // 1. Age check
  const age = Number(profile.age);
  if (profile.age !== undefined && !isNaN(age) && age > 0) {
    if (e.minAge !== undefined && age < e.minAge) return false;
    if (e.maxAge !== undefined && age > e.maxAge) return false;
  }

  // 2. Income check
  const annualIncome = Number(profile.annualIncome);
  if (profile.annualIncome !== undefined && !isNaN(annualIncome) && annualIncome > 0) {
    // If maxIncome is 0 or 99999999, it implies no income ceiling, otherwise enforce it
    if (e.maxIncome !== undefined && e.maxIncome > 0 && e.maxIncome < 99999999) {
      if (annualIncome > e.maxIncome) return false;
    }
  }

  // 3. Gender check
  if (profile.gender && e.gender && e.gender.length > 0) {
    const userGenderLower = profile.gender.trim().toLowerCase();
    const schemeGendersLower = e.gender.map(g => g.toLowerCase());
    if (!schemeGendersLower.includes("all") && !schemeGendersLower.includes("any") && !schemeGendersLower.includes(userGenderLower)) {
      return false;
    }
  }

  // 4. State check
  if (profile.state && e.states && e.states.length > 0) {
    const userStateLower = profile.state.trim().toLowerCase();
    const schemeStatesLower = e.states.map(s => s.toLowerCase());
    if (!schemeStatesLower.includes("all") && !schemeStatesLower.includes("any") && !schemeStatesLower.includes(userStateLower)) {
      return false;
    }
  }

  // 5. Occupation check
  if (profile.occupation && e.occupation && e.occupation.length > 0) {
    const userOccLower = profile.occupation.trim().toLowerCase();
    const schemeOccsLower = e.occupation.map(o => o.toLowerCase());
    if (!schemeOccsLower.includes("any") && !schemeOccsLower.includes("all") && !schemeOccsLower.includes(userOccLower)) {
      return false;
    }
  }

  // 6. Social Category check
  if (profile.category && e.category && e.category.length > 0) {
    const userCatLower = profile.category.trim().toLowerCase();
    const schemeCatsLower = e.category.map(c => c.toLowerCase());
    if (!schemeCatsLower.includes("all") && !schemeCatsLower.includes("any") && !schemeCatsLower.includes(userCatLower)) {
      return false;
    }
  }

  return true;
}

/**
 * Enriches scheme objects with verification warning details and days remaining.
 */
function enrichSchemeData(schemesList) {
  const currentDate = new Date();
  return schemesList.map(s => {
    const sObj = s.toObject ? s.toObject() : { ...s };
    
    // Check if lastVerified is older than 180 days
    if (sObj.lastVerified) {
      const lastVerifiedDate = new Date(sObj.lastVerified);
      const diffTime = Math.abs(currentDate - lastVerifiedDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      sObj.needsReview = diffDays > 180;
      sObj.daysSinceVerification = diffDays;
    } else {
      sObj.needsReview = false;
      sObj.daysSinceVerification = 0;
    }

    // Calculate days remaining until deadline
    if (sObj.deadline) {
      const deadlineDate = new Date(sObj.deadline);
      const diffTime = deadlineDate - currentDate;
      sObj.daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } else {
      sObj.daysRemaining = null;
    }

    return sObj;
  });
}

// ─── GET /api/schemes  ────────────────────────────────────────────────────────
// Returns all active schemes. Optionally filters by ?search= query param.
router.get("/", async (req, res) => {
  try {
    const { search } = req.query;
    
    // Load counts for debug logging
    const totalLoaded = await Scheme.countDocuments({});
    
    // Query only active schemes from MongoDB
    let query = { isActive: true };
    
    if (search) {
      const qRegex = new RegExp(search.trim(), "i");
      query.$or = [
        { name: qRegex },
        { category: qRegex },
        { ministry: qRegex },
        { shortDescription: qRegex }
      ];
    }
    
    const schemes = await Scheme.find(query);
    const totalActive = await Scheme.countDocuments({ isActive: true });
    
    // Enrich with lifecycle status and alerts
    const enriched = enrichSchemeData(schemes);
    
    console.log("\n📊 --- [DEBUG] GET /api/schemes ---");
    console.log(`Total Schemes Loaded (DB): ${totalLoaded}`);
    console.log(`Total Active Schemes (DB): ${totalActive}`);
    console.log(`Total after search filtering: ${enriched.length}`);
    console.log(`Total returned to frontend: ${enriched.length}`);
    console.log("------------------------------------\n");
    
    return res.json({
      success: true,
      count: enriched.length,
      data: enriched,
      source: "mongodb-db",
    });
  } catch (err) {
    console.error("GET /api/schemes error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/schemes/filter  ────────────────────────────────────────────────
// Body: { age, gender, annualIncome, state, occupation, category }
// Returns schemes matching this profile.
router.post("/filter", async (req, res) => {
  try {
    const profile = req.body;
    
    // Load counts for debug logging
    const totalLoaded = await Scheme.countDocuments({});
    const totalActive = await Scheme.countDocuments({ isActive: true });
    
    // 1. Load all active schemes from MongoDB
    const activeSchemes = await Scheme.find({ isActive: true });
    
    // 2. Perform strict rule-based filtering
    const candidates = activeSchemes.filter(s => matchesProfile(s, profile));
    
    // 3. Call Gemini to rank the results
    const rankedIds = await rankSchemesWithGemini(profile, candidates);
    
    // 4. Sort candidates based on Gemini ranking order
    const rankedCandidates = [...candidates].sort((a, b) => {
      const indexA = rankedIds.indexOf(a._id.toString());
      const indexB = rankedIds.indexOf(b._id.toString());
      if (indexA === -1 && indexB === -1) return 0;
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });
    
    // Enrich cards with warning notifications and remaining days
    const enriched = enrichSchemeData(rankedCandidates);
    
    console.log("\n📊 --- [DEBUG] POST /api/schemes/filter ---");
    console.log(`Total Schemes Loaded (DB): ${totalLoaded}`);
    console.log(`Total Active Schemes (DB): ${totalActive}`);
    console.log(`Total after rule-based filtering: ${candidates.length}`);
    console.log(`Total returned to frontend: ${enriched.length}`);
    console.log("-------------------------------------------\n");
    
    return res.json({
      success: true,
      count: enriched.length,
      data: enriched,
      source: "mongodb-db-gemini-ranked",
    });
  } catch (err) {
    console.error("POST /api/schemes/filter error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── POST /api/schemes/details  ───────────────────────────────────────────────
// Body: { name }
// Returns details about a scheme by name from MongoDB.
router.post("/details", async (req, res) => {
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
    });
    
    if (!scheme) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }
    
    const enriched = enrichSchemeData([scheme])[0];
    
    return res.json({
      success: true,
      data: enriched,
      source: "mongodb-db",
    });
  } catch (err) {
    console.error("POST /api/schemes/details error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ─── GET /api/schemes/:id  ────────────────────────────────────────────────────
// Fetch a single scheme by ObjectId or slug/name
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let scheme = null;
    
    if (mongoose.Types.ObjectId.isValid(id)) {
      scheme = await Scheme.findById(id);
    }
    
    if (!scheme) {
      const decoded = decodeURIComponent(id).replace(/-/g, " ");
      scheme = await Scheme.findOne({
        $or: [
          { name: new RegExp(`^${decoded}$`, "i") },
          { name: new RegExp(decoded, "i") }
        ]
      });
    }
    
    if (!scheme) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }
    
    const enriched = enrichSchemeData([scheme])[0];
    
    return res.json({
      success: true,
      data: enriched,
      source: "mongodb-db",
    });
  } catch (err) {
    console.error("GET /api/schemes/:id error:", err.message);
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
