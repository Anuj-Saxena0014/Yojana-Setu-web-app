const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.2,       // Low temp = factual ranking
      topP: 0.8,
      maxOutputTokens: 2048,
      responseMimeType: "application/json",
    },
  });
}

const SYSTEM_INSTRUCTION = `
You are an expert advisor on Indian Government Schemes.
Your task is to rank candidate schemes for a citizen based on their profile.
`;

/**
 * Ranks candidate schemes based on user profile using Gemini AI.
 * @param {Object} profile - User demographic profile
 * @param {Array} candidates - Array of candidate scheme objects from MongoDB
 * @returns {Promise<Array<string>>} List of ranked scheme ID strings
 */
async function rankSchemesWithGemini(profile, candidates) {
  // If Gemini is not configured, return database default order
  if (!model || candidates.length === 0) {
    console.log("🤖 Gemini AI not configured/available. Using database default ranking.");
    return candidates.map(c => c._id.toString());
  }

  const prompt = `
${SYSTEM_INSTRUCTION}

User Demographic Profile:
- Age: ${profile.age} years
- Gender: ${profile.gender}
- Annual Income: ₹${Number(profile.annualIncome).toLocaleString("en-IN")}
- State: ${profile.state || "All India"}
- Occupation: ${profile.occupation}
- Social Category: ${profile.category}

Candidate Schemes:
${JSON.stringify(candidates.map(c => ({
  dbId: c._id.toString(),
  name: c.name,
  category: c.category,
  shortDescription: c.shortDescription,
  benefits: c.benefits
})))}

Task:
1. Compare the user profile with each candidate scheme.
2. Rank the schemes by relevance and total benefit value for this specific citizen.
3. Return STRICT JSON containing only an array of ranked database IDs (dbId) under the key "rankedIds".

Expected JSON Response Format:
{
  "rankedIds": ["<dbId_most_relevant>", "<dbId_second_most_relevant>", ...]
}
`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const parsed = JSON.parse(text);
    if (parsed && Array.isArray(parsed.rankedIds)) {
      return parsed.rankedIds;
    }
    throw new Error("Invalid response schema from Gemini");
  } catch (err) {
    console.error("⚠️ Gemini AI ranking failed/rate-limited:", err.message);
    // Graceful degradation: return original DB candidates order
    return candidates.map(c => c._id.toString());
  }
}

module.exports = {
  rankSchemesWithGemini
};
