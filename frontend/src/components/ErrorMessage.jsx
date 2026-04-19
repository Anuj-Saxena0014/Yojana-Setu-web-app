// ─────────────────────────────────────────────────────────────────────────────
// src/components/ErrorMessage.jsx  –  Friendly error display (UX4G compliant)
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div 
      className="flex flex-col items-center justify-center py-24 px-4 text-center"
      role="alert"
      aria-live="polite"
    >
      <div className="text-7xl mb-6">⚠️</div>
      <h3 className="font-display font-bold text-navy-900 text-3xl mb-3">
        Something went wrong
      </h3>
      <p className="text-slate-600 font-body text-lg max-w-md mb-8">
        {message || "Unable to load schemes. Please check your connection and try again."}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="btn-primary"
          aria-label="Retry loading schemes"
        >
          Try Again
        </button>
      )}
    </div>
  );
}
