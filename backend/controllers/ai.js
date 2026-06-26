const mongoose = require("mongoose");
const Scheme = require("../models/Scheme");
const { generateSchemeExplanation, chatAboutScheme } = require("../services/ai/gemini");

// ─── POST /api/ai/explain ──────────────────────────────────────────────────
exports.explainScheme = async (req, res) => {
  try {
    const { schemeId } = req.body;
    
    if (!schemeId) {
      return res.status(400).json({ success: false, message: "schemeId is required" });
    }

    let scheme = null;
    if (mongoose.Types.ObjectId.isValid(schemeId)) {
      scheme = await Scheme.findById(schemeId).lean();
    }
    
    if (!scheme) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }

    try {
      const explanation = await generateSchemeExplanation(scheme);
      
      return res.json({
        success: true,
        message: "AI explanation generated",
        data: explanation
      });
    } catch (aiError) {
      console.error("AI Explain Error:", aiError.message);
      return res.json({
        success: true,
        aiAvailable: false,
        message: "AI service temporarily unavailable.",
        data: scheme
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// ─── POST /api/ai/chat ─────────────────────────────────────────────────────
exports.chatScheme = async (req, res) => {
  try {
    const { schemeId, question } = req.body;
    
    if (!schemeId || !question) {
      return res.status(400).json({ success: false, message: "schemeId and question are required" });
    }

    let scheme = null;
    if (mongoose.Types.ObjectId.isValid(schemeId)) {
      scheme = await Scheme.findById(schemeId).lean();
    }
    
    if (!scheme) {
      return res.status(404).json({ success: false, message: "Scheme not found" });
    }

    try {
      const answer = await chatAboutScheme(scheme, question);
      
      return res.json({
        success: true,
        message: "AI chat response generated",
        data: { answer }
      });
    } catch (aiError) {
      console.error("AI Chat Error:", aiError.message);
      return res.json({
        success: true,
        aiAvailable: false,
        message: "AI service temporarily unavailable.",
        data: scheme
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
