const express = require("express");
const router = express.Router();
const { explainScheme, chatScheme } = require("../controllers/ai");

// ─── POST /api/ai/explain  ────────────────────────────────────────────────
// Body: { schemeId }
// Returns AI generated explanation
router.post("/explain", explainScheme);

// ─── POST /api/ai/chat  ───────────────────────────────────────────────────
// Body: { schemeId, question }
// Returns AI generated response
router.post("/chat", chatScheme);

module.exports = router;
