// ─────────────────────────────────────────────────────────────────────────────
// services/gemini.js  –  Google Gemini AI wrapper for scheme discovery
//                       with retry logic and static fallback
// ─────────────────────────────────────────────────────────────────────────────

const { GoogleGenerativeAI } = require("@google/generative-ai");
const fallbackSchemes = require("../data/fallbackSchemes");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.3,       // Low temp = more factual
    topP: 0.8,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  },
});

// ── System instruction shared by all prompts ─────────────────────────────────
const SYSTEM_INSTRUCTION = `
You are an expert on Indian Government Schemes and Welfare Programs.
You have deep knowledge of all central and state government schemes in India,
including their eligibility criteria, benefits, application process, and official portals.

RULES:
1. ONLY return REAL, currently active Indian government schemes.
2. Every scheme MUST have a real, working official government website URL (gov.in, nic.in, etc.).
3. Do NOT invent or hallucinate any scheme. If unsure, omit it.
4. Return data in STRICT JSON format as specified.
5. Include both central and state-level schemes where applicable.
6. Be accurate about eligibility criteria (age, income, gender, category, occupation, states).
7. Use INR (₹) for all monetary values.
8. Be comprehensive — include lesser-known but genuine schemes.
`;

// ── Simple in-memory cache ───────────────────────────────────────────────────
const cache = new Map();
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

function getCached(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL) {
    cache.delete(key);
    return null;
  }
  return entry.data;
}

function setCache(key, data) {
  cache.set(key, { data, ts: Date.now() });
}

// ── Retry helper with exponential backoff ────────────────────────────────────
async function callGeminiWithRetry(prompt, maxRetries = 2) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      return JSON.parse(text);
    } catch (err) {
      const isRateLimit = err.message?.includes("429") || err.message?.includes("quota");
      const isLastAttempt = attempt === maxRetries;

      if (isRateLimit || isLastAttempt) {
        throw err; // Don't retry quota issues or on last attempt
      }

      // Wait before retrying (exponential backoff: 2s, 4s)
      const delay = Math.pow(2, attempt + 1) * 1000;
      console.log(`⏳ Gemini retry ${attempt + 1}/${maxRetries} in ${delay / 1000}s...`);
      await new Promise((r) => setTimeout(r, delay));
    }
  }
}

// ── JSON response schema ─────────────────────────────────────────────────────
const SCHEME_JSON_SHAPE = `
{
  "schemes": [
    {
      "id": "<unique-slug like pm-kisan-samman-nidhi>",
      "name": "<official scheme name>",
      "shortDescription": "<1-2 sentence summary>",
      "description": "<detailed 3-5 sentence description>",
      "ministry": "<parent ministry/department>",
      "launchedYear": <year as number>,
      "category": "<one of: Agriculture, Education, Health, Housing, Women Welfare, Entrepreneurship, Skill Development, Social Security, Financial Inclusion, Employment, Rural Development, Urban Development, Digital India>",
      "imageEmoji": "<relevant emoji>",
      "benefits": ["<benefit 1>", "<benefit 2>", "<benefit 3>"],
      "applicationUrl": "<official gov.in URL>",
      "eligibility": {
        "occupation": ["<matching occupations from: Student, Farmer, Employee, Self-Employed, Unemployed, Other>"],
        "minAge": <number>,
        "maxAge": <number>,
        "maxIncome": <number in INR>,
        "gender": ["<Male/Female/Other>"],
        "category": ["<General/OBC/SC/ST>"],
        "states": ["<state names or 'All' for nationwide>"]
      }
    }
  ]
}`;

// ── Fallback filtering logic ─────────────────────────────────────────────────
function filterFallbackSchemes(profile) {
  const { age, gender, annualIncome, state, occupation, category } = profile;

  return fallbackSchemes.filter((scheme) => {
    const e = scheme.eligibility;
    if (!e) return true;

    // Age check
    if (age && e.minAge && age < e.minAge) return false;
    if (age && e.maxAge && age > e.maxAge) return false;

    // Gender check
    if (gender && e.gender?.length > 0 && !e.gender.includes(gender)) return false;

    // Income check
    if (annualIncome && e.maxIncome && e.maxIncome > 0 && annualIncome > e.maxIncome) return false;

    // Occupation check
    if (occupation && e.occupation?.length > 0 && !e.occupation.includes(occupation)) return false;

    // Category check
    if (category && e.category?.length > 0 && !e.category.includes(category)) return false;

    // State check
    if (state && e.states?.length > 0 && !e.states.includes("All") && !e.states.includes(state)) return false;

    return true;
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// getPopularSchemes — Returns 12-15 popular/trending schemes
// ─────────────────────────────────────────────────────────────────────────────
async function getPopularSchemes(search = "") {
  const cacheKey = `popular:${search}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const searchClause = search
    ? `The user is searching for: "${search}". Return only schemes related to this search query.`
    : "Return a diverse mix of popular schemes across different categories.";

  const prompt = `
${SYSTEM_INSTRUCTION}

${searchClause}

Return exactly 12 to 15 REAL, currently active Indian government schemes in 2024-2025.
Include popular schemes like PM Kisan, Ayushman Bharat, PM Awas Yojana, MUDRA, etc. as well as some lesser-known ones.

Response format (strict JSON):
${SCHEME_JSON_SHAPE}
`;

  try {
    const parsed = await callGeminiWithRetry(prompt);

    if (!parsed.schemes || !Array.isArray(parsed.schemes)) {
      throw new Error("Invalid response structure from Gemini");
    }

    // Validate each scheme has required fields
    const validSchemes = parsed.schemes.filter(
      (s) => s.name && s.shortDescription && s.id
    );

    setCache(cacheKey, validSchemes);
    return validSchemes;
  } catch (err) {
    console.error("Gemini getPopularSchemes error:", err.message);
    console.log("📦 Using fallback scheme data");

    // Fallback: filter by search if provided, otherwise return all
    let schemes = fallbackSchemes;
    if (search) {
      const q = search.toLowerCase();
      schemes = fallbackSchemes.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDescription.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q) ||
          s.ministry.toLowerCase().includes(q)
      );
    }

    setCache(cacheKey, schemes);
    return schemes;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// getMatchingSchemes — Returns schemes matching user profile
// ─────────────────────────────────────────────────────────────────────────────
async function getMatchingSchemes(profile) {
  const { age, gender, annualIncome, state, occupation, category } = profile;

  const cacheKey = `filter:${age}:${gender}:${annualIncome}:${state}:${occupation}:${category}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  const prompt = `
${SYSTEM_INSTRUCTION}

A citizen of India is looking for government schemes they are ELIGIBLE for.
Here is their profile:

- Age: ${age} years
- Gender: ${gender}
- Annual Income: ₹${Number(annualIncome).toLocaleString("en-IN")}
- State: ${state || "Not specified (show nationwide schemes)"}
- Occupation: ${occupation}
- Social Category: ${category}

Based on this EXACT profile, return ALL real Indian government schemes (central + state level)
that this person is genuinely eligible for. Be thorough — check age limits, income limits,
gender restrictions, occupation requirements, and category reservations.

Return 8 to 20 matching schemes. Prioritize schemes where the user clearly qualifies.
If the state is specified, include both central and that state's schemes.

Response format (strict JSON):
${SCHEME_JSON_SHAPE}
`;

  try {
    const parsed = await callGeminiWithRetry(prompt);

    if (!parsed.schemes || !Array.isArray(parsed.schemes)) {
      throw new Error("Invalid response structure from Gemini");
    }

    const validSchemes = parsed.schemes.filter(
      (s) => s.name && s.shortDescription && s.id
    );

    setCache(cacheKey, validSchemes);
    return validSchemes;
  } catch (err) {
    console.error("Gemini getMatchingSchemes error:", err.message);
    console.log("📦 Using fallback scheme data with local filtering");

    // Fallback: use local filtering on static data
    const filtered = filterFallbackSchemes(profile);
    setCache(cacheKey, filtered);
    return filtered;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// getSchemeDetails — Returns detailed info about a specific scheme
// ─────────────────────────────────────────────────────────────────────────────
async function getSchemeDetails(schemeName) {
  const cacheKey = `details:${schemeName.toLowerCase()}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // First check fallback data for instant response
  const nameNorm = schemeName.toLowerCase().replace(/-/g, " ");
  const fallbackMatch = fallbackSchemes.find(
    (s) =>
      s.name.toLowerCase() === nameNorm ||
      s.id.replace(/-/g, " ") === nameNorm ||
      s.name.toLowerCase().includes(nameNorm) ||
      nameNorm.includes(s.name.toLowerCase())
  );

  const prompt = `
${SYSTEM_INSTRUCTION}

Provide COMPLETE and DETAILED information about this Indian government scheme:
"${schemeName}"

Include:
- Full official name
- Detailed description (5-8 sentences)
- Parent ministry/department
- Launch year
- Category
- All key benefits (at least 4-5)
- Official application URL
- Detailed eligibility criteria
- How to apply (step by step)
- Required documents

Response format (strict JSON):
{
  "scheme": {
    "id": "<slug>",
    "name": "<official name>",
    "shortDescription": "<1-2 sentences>",
    "description": "<detailed 5-8 sentence description>",
    "ministry": "<ministry>",
    "launchedYear": <year>,
    "category": "<category>",
    "imageEmoji": "<emoji>",
    "benefits": ["<benefit1>", "<benefit2>", ...],
    "applicationUrl": "<official URL>",
    "eligibility": {
      "occupation": [],
      "minAge": <number>,
      "maxAge": <number>,
      "maxIncome": <number>,
      "gender": [],
      "category": [],
      "states": []
    },
    "howToApply": ["<step 1>", "<step 2>", ...],
    "documentsRequired": ["<doc 1>", "<doc 2>", ...]
  }
}
`;

  try {
    const parsed = await callGeminiWithRetry(prompt);

    if (!parsed.scheme || !parsed.scheme.name) {
      throw new Error("Invalid scheme details from Gemini");
    }

    setCache(cacheKey, parsed.scheme);
    return parsed.scheme;
  } catch (err) {
    console.error("Gemini getSchemeDetails error:", err.message);

    // Fallback: return from static data if available
    if (fallbackMatch) {
      console.log("📦 Using fallback data for:", fallbackMatch.name);
      setCache(cacheKey, fallbackMatch);
      return fallbackMatch;
    }

    // If not in fallback data, create a minimal response
    console.log("📦 Scheme not found in fallback data, returning minimal info");
    const minimal = {
      id: schemeName.toLowerCase().replace(/\s+/g, "-"),
      name: schemeName,
      shortDescription: "Details are temporarily unavailable. The AI service is currently at capacity.",
      description: "Detailed information for this scheme could not be fetched at this time. The Gemini AI service has reached its rate limit. Please try again later or visit the official government portal for accurate information.",
      ministry: "Government of India",
      launchedYear: null,
      category: "Government Scheme",
      imageEmoji: "🏛️",
      benefits: ["Please visit the official government portal for detailed benefits information"],
      applicationUrl: "https://www.myscheme.gov.in",
      eligibility: {
        occupation: [],
        minAge: 0,
        maxAge: 99,
        maxIncome: 0,
        gender: ["Male", "Female", "Other"],
        category: ["General", "OBC", "SC", "ST"],
        states: ["All"],
      },
      howToApply: ["Visit the official government portal for application instructions"],
      documentsRequired: ["Please check the official portal for required documents"],
    };
    setCache(cacheKey, minimal);
    return minimal;
  }
}

module.exports = {
  getPopularSchemes,
  getMatchingSchemes,
  getSchemeDetails,
};
