// ─────────────────────────────────────────────────────────────────────────────
// src/hooks/useSchemes.js  –  Reusable hook for scheme API calls
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { getAllSchemes, filterSchemes } from "../services/api";

/**
 * Hook for fetching ALL schemes (with optional search).
 * Usage:  const { schemes, loading, error, fetch } = useAllSchemes();
 */
export function useAllSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const fetch = useCallback(async (search = "") => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllSchemes(search);
      setSchemes(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { schemes, loading, error, fetch };
}

/**
 * Hook for filtering schemes by user profile.
 * Usage:  const { schemes, loading, error, filter, hasSearched } = useFilterSchemes();
 */
export function useFilterSchemes() {
  const [schemes,    setSchemes]    = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [error,      setError]      = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  const filter = useCallback(async (params) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);
    try {
      const data = await filterSchemes(params);
      setSchemes(data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { schemes, loading, error, filter, hasSearched };
}
