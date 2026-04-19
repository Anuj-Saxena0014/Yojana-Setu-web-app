// ─────────────────────────────────────────────────────────────────────────────
// src/components/SearchBar.jsx  –  Debounced search input
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect } from "react";

/**
 * SearchBar with built-in debounce.
 * @param {function} onSearch   – called with debounced value
 * @param {string}   placeholder
 * @param {number}   debounce  – ms to wait before firing (default 400)
 */
export default function SearchBar({
  onSearch,
  placeholder = "Search schemes…",
  debounce = 400,
  className = "",
}) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => onSearch(value.trim()), debounce);
    return () => clearTimeout(timer);
  }, [value, debounce, onSearch]);

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg pointer-events-none select-none">
        🔍
      </span>
      <input
        type="search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="form-input pl-12 pr-10"
      />
      {/* Clear button */}
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 
                     transition-colors text-lg leading-none"
          aria-label="Clear search"
        >
          ×
        </button>
      )}
    </div>
  );
}
