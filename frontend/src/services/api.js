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
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err.response?.data?.message || err.message || "Network error";
    return Promise.reject(new Error(message));
  }
);

// ── API helpers ───────────────────────────────────────────────────────────────

/** Fetch all/popular schemes; optionally pass a search string */
export const getAllSchemes = async (search = "") => {
  const params = search ? { search } : {};
  const { data } = await api.get("/schemes", { params });
  return data;
};

/** Fetch detailed info about a specific scheme by name */
export const getSchemeDetails = async (id) => {
  const { data } = await api.get(`/schemes/${id}`);
  return data;
};

/** Legacy: Fetch scheme by ID/slug (backward compatible) */
export const getSchemeById = async (id) => {
  const { data } = await api.get(`/schemes/${encodeURIComponent(id)}`);
  return data;
};

/**
 * Filter schemes based on user profile.
 * @param {{ age, gender, annualIncome, state, occupation, category }} filters
 */
export const filterSchemes = async (filters) => {
  const { data } = await api.post("/schemes/filter", filters);
  return data;
};

/** Get user favourites from backend */
export const getUserFavourites = async () => {
  const { data } = await api.get("/auth/favourites");
  return data;
};

/** Toggle a scheme in user favourites */
export const toggleUserFavourite = async (schemeId) => {
  const { data } = await api.post("/auth/favourites/toggle", { schemeId });
  return data;
};

export default api;
