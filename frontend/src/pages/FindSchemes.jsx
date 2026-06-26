// ─────────────────────────────────────────────────────────────────────────────
// src/pages/FindSchemes.jsx  –  Filter + browse schemes page
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useCallback, useState } from "react";
import FilterForm   from "../components/FilterForm";
import SchemeCard   from "../components/SchemeCard";
import SearchBar    from "../components/SearchBar";
import Spinner, { SkeletonCard } from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";
import { useAllSchemes, useFilterSchemes } from "../hooks/useSchemes";

export default function FindSchemes() {
  // ── Two modes: "all / search" vs "filtered" ───────────────────────────────
  const {
    schemes: allSchemes,
    loading:  allLoading,
    error:    allError,
    fetch:    fetchAll,
  } = useAllSchemes();

  const {
    schemes:    filtered,
    loading:    filterLoading,
    error:      filterError,
    filter:     runFilter,
    hasSearched,  
  } = useFilterSchemes();

  const [mode, setMode] = useState("browse"); // "browse" | "filtered"
  const [activeCategory, setActiveCategory] = useState("All");
  const [formCollapsed, setFormCollapsed] = useState(false);

  // Fetch all on mount
  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleSearch = useCallback(
    (q) => {
      setMode("browse");
      fetchAll(q);
    },
    [fetchAll]
  );

  const handleFilter = useCallback(
    (params) => {
      setMode("filtered");
      setFormCollapsed(true); // Collapse form after filtering to show results
      runFilter(params);
    },
    [runFilter]
  );

  const handleShowAll = () => {
    setMode("browse");
    setActiveCategory("All");
    setFormCollapsed(false);
    fetchAll();
  };

  // ── Derived data ──────────────────────────────────────────────────────────
  const displaySchemes = mode === "filtered" ? filtered : allSchemes;
  const loading  = mode === "filtered" ? filterLoading : allLoading;
  const error    = mode === "filtered" ? filterError   : allError;

  // Category filter (client-side, only in "browse" mode)
  const categories = ["All", ...new Set(allSchemes.map((s) => s.category).filter(Boolean))];
  const visibleSchemes =
    mode === "browse" && activeCategory !== "All"
      ? displaySchemes.filter((s) => s.category === activeCategory)
      : displaySchemes;
console.log("allSchemes:", allSchemes.length);
console.log("visibleSchemes:", visibleSchemes.length);
  return (
    <div className="min-h-screen bg-slate-50">
      {/* ══════════════════════════════════════════════════════════════════════
          ELIGIBILITY FORM — Full-width hero-style section
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          {/* Collapsible toggle when in filtered mode */}
          {mode === "filtered" && formCollapsed ? (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-display font-bold text-navy-900 text-lg">
                    Eligibility Check Complete
                  </h2>
                  <p className="text-sm text-slate-500 font-body">
                    Found {filtered.length} matching scheme{filtered.length !== 1 ? "s" : ""} for your profile
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFormCollapsed(false)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-navy-800 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors font-body"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit Filters
                </button>
                <button
                  onClick={handleShowAll}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors font-body"
                >
                  ← Show All
                </button>
              </div>
            </div>
          ) : (
            <FilterForm
              onSubmit={handleFilter}
              loading={filterLoading}
              layout="full"
            />
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          RESULTS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Search + category bar */}
        {mode === "browse" && (
          <div className="space-y-4 mb-6">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search by scheme name or keyword…"
            />

            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold font-body border transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-navy-800 text-white border-navy-800 shadow-sm"
                      : "bg-white text-slate-600 border-slate-200 hover:border-navy-300 hover:text-navy-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results header */}
        <div className="flex items-center justify-between mb-5">
          <p className="text-sm font-body text-slate-500">
            {mode === "filtered" && hasSearched && !loading
              ? `Found ${visibleSchemes.length} matching scheme${visibleSchemes.length !== 1 ? "s" : ""} for your profile`
              : loading
              ? "Searching…"
              : `Showing ${visibleSchemes.length} scheme${visibleSchemes.length !== 1 ? "s" : ""}`}
          </p>

          <div className="flex gap-2">
            <span className="badge bg-blue-50 text-blue-600 border border-blue-200 text-xs flex items-center gap-1">
              <span>🧠</span>  Smart Eligibility Engine
            </span>
            {mode === "filtered" && (
              <span className="badge bg-saffron-100 text-saffron-700 text-xs">
                ✦ Filtered Results
              </span>
            )}
          </div>
        </div>

        {/* Error */}
        {error && <ErrorMessage message={error} onRetry={() => fetchAll()} />}

        {/* Loading skeletons */}
        {loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && visibleSchemes.length === 0 && (
          <div className="card p-12 text-center">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="font-display font-bold text-navy-800 text-xl mb-2">
              No schemes found
            </h3>
            <p className="text-slate-500 font-body text-sm mb-6">
              {mode === "filtered"
                ? "No schemes match your exact profile. Try broadening your search or changing the category."
                : "Try different search keywords."}
            </p>
            <button onClick={handleShowAll} className="btn-primary">
              Show All Schemes
            </button>
          </div>
        )}

        {/* Grid of scheme cards */}
        {!loading && !error && visibleSchemes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleSchemes.map((scheme, i) => (
              <SchemeCard
                key={scheme.id || scheme._id || i}
                scheme={scheme}
                delay={i * 60}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
