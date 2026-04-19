// ─────────────────────────────────────────────────────────────────────────────
// src/services/api.js  –  Centralised Axios instance + API helpers
// ─────────────────────────────────────────────────────────────────────────────

import axios from "axios";

// Base URL uses Vite proxy in dev, so "/api" works for both environments.
const api = axios.create({
  baseURL: "/api",
  timeout: 30000,   // 30s timeout — Gemini AI can take 3-8s to respond
  headers: { "Content-Type": "application/json" },
});

// ── Interceptors ──────────────────────────────────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || err.message || "Network error";
    return Promise.reject(new Error(message));
  }
);

// ── API helpers ───────────────────────────────────────────────────────────────

/** Fetch all/popular schemes from Gemini AI; optionally pass a search string */
export const getAllSchemes = async (search = "") => {
  const params = search ? { search } : {};
  const { data } = await api.get("/schemes", { params });
  return data;
};

/** Fetch detailed info about a specific scheme by name (via Gemini AI) */
export const getSchemeDetails = async (schemeName) => {
  const { data } = await api.post("/schemes/details", { name: schemeName });
  return data;
};

/** Legacy: Fetch scheme by ID/slug (backward compatible) */
export const getSchemeById = async (id) => {
  const { data } = await api.get(`/schemes/${encodeURIComponent(id)}`);
  return data;
};

/**
 * Filter schemes based on user profile via Gemini AI.
 * @param {{ age, gender, annualIncome, state, occupation, category }} filters
 */
export const filterSchemes = async (filters) => {
  const { data } = await api.post("/schemes/filter", filters);
  return data;
};

export default api;
