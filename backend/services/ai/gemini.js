const { GoogleGenerativeAI } = require("@google/generative-ai");

let genAI = null;
let model = null;

if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 0.2,       
      topP: 0.8,
      maxOutputTokens: 2048,
    },
  });
}

/**
 * Generate a detailed explanation of a scheme
 */
async function generateSchemeExplanation(scheme) {
  if (!model) throw new Error("Gemini API key not configured");

  const prompt = `
You are an expert advisor on Indian Government Schemes.
Please explain the following scheme in simple terms.

Scheme Details:
Name: ${scheme.name}
Description: ${scheme.description}
Benefits: ${JSON.stringify(scheme.benefits)}
Eligibility: ${JSON.stringify(scheme.eligibility)}

Return STRICT JSON matching exactly this format:
{
  "summary": "Brief summary",
  "benefits": ["Benefit 1", "Benefit 2"],
  "eligibilityExplanation": "Simple explanation of who can apply",
  "requiredDocuments": ["Doc 1", "Doc 2"],
  "applicationSteps": ["Step 1", "Step 2"],
  "importantTips": ["Tip 1"]
}
`;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { responseMimeType: "application/json" }
  });
  
  const text = result.response.text();
  return JSON.parse(text);
}

/**
 * Chat about a specific scheme
 */
async function chatAboutScheme(scheme, question) {
  if (!model) throw new Error("Gemini API key not configured");

  const prompt = `
You are a helpful assistant answering questions about the following Indian Government Scheme.

Scheme Name: ${scheme.name}
Scheme Details:
${scheme.description}
Benefits: ${JSON.stringify(scheme.benefits)}
Eligibility: ${JSON.stringify(scheme.eligibility)}

User Question: ${question}

Provide a clear, helpful, and concise answer based ONLY on the scheme details provided. Do not use markdown. Return plain text response.
`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = {
  generateSchemeExplanation,
  chatAboutScheme
};
