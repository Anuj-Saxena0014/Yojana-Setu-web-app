// ─────────────────────────────────────────────────────────────────────────────
// src/pages/NotFound.jsx  –  404 page
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="text-8xl font-display font-black text-slate-100 select-none mb-2">
        404
      </div>
      <div className="text-5xl mb-6">🗺️</div>
      <h1 className="font-display text-2xl font-bold text-navy-900 mb-3">
        Page Not Found
      </h1>
      <p className="text-slate-500 font-body max-w-sm mb-8 text-sm leading-relaxed">
        The page you're looking for doesn't exist. It may have been moved or the
        URL might be wrong.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link to="/" className="btn-primary">
          ← Go Home
        </Link>
        <Link to="/find-schemes" className="btn-outline">
          Find Schemes
        </Link>
      </div>
    </div>
  );
}
