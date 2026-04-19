// ─────────────────────────────────────────────────────────────────────────────
// src/components/SchemeCard.jsx  –  Reusable scheme card (UX4G compliant)
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";

// Category badge colors
const CATEGORY_COLORS = {
  Agriculture:         "bg-green-100 text-green-700",
  "Women Welfare":     "bg-pink-100 text-pink-700",
  Education:           "bg-blue-100 text-blue-700",
  Health:              "bg-red-100 text-red-700",
  Housing:             "bg-amber-100 text-amber-700",
  Entrepreneurship:    "bg-purple-100 text-purple-700",
  "Skill Development": "bg-teal-100 text-teal-700",
  "Social Security":   "bg-orange-100 text-orange-700",
  "Financial Inclusion":"bg-cyan-100 text-cyan-700",
};

export default function SchemeCard({ scheme, delay = 0 }) {
  const { isFavourite, toggleFavourite } = useFavourites();
  const id       = scheme.id || scheme._id || encodeURIComponent(scheme.name);
  const saved    = isFavourite(id);
  const catColor = CATEGORY_COLORS[scheme.category] || "bg-slate-100 text-slate-600";

  return (
    <article
      className="card flex flex-col animate-fade-up border-2 hover:border-navy-200 transition-all"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "both", opacity: 0 }}
      role="region"
      aria-label={`${scheme.name} scheme`}
    >
      {/* ── Card header ── */}
      <div className="p-6 pb-5 flex items-start justify-between gap-3">
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Emoji icon */}
          <div className="w-14 h-14 rounded-xl bg-navy-50 flex items-center justify-center text-3xl flex-shrink-0 border-2 border-navy-200">
            {scheme.imageEmoji || "🏛️"}
          </div>
          <div className="min-w-0">
            <span className={`badge text-xs font-semibold mb-1.5 block ${catColor}`}>
              {scheme.category}
            </span>
            <h3 className="font-display font-bold text-navy-900 text-lg leading-tight line-clamp-2">
              {scheme.name}
            </h3>
          </div>
        </div>

        {/* Favourite button */}
        <button
          onClick={() => toggleFavourite(scheme)}
          title={saved ? "Remove from saved schemes" : "Save this scheme"}
          className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center border-2 transition-all duration-200 text-xl ${
            saved
              ? "bg-saffron-50 border-saffron-300 text-saffron-500"
              : "bg-white border-slate-300 text-slate-400 hover:border-saffron-300 hover:text-saffron-400"
          }`}
          aria-label={saved ? "Remove from saved schemes" : "Save this scheme"}
          aria-pressed={saved}
        >
          {saved ? "★" : "☆"}
        </button>
      </div>

      {/* ── Description ── */}
      <div className="px-6 pb-5 flex-1">
        <p className="text-base text-slate-600 font-body leading-relaxed line-clamp-3">
          {scheme.shortDescription}
        </p>
      </div>

      {/* ── Benefits ── */}
      {scheme.benefits?.length > 0 && (
        <div className="px-6 pb-5">
          <p className="text-sm font-semibold text-slate-900 font-body mb-2.5">Key Benefits:</p>
          <ul className="space-y-1.5">
            {scheme.benefits.slice(0, 2).map((b, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-body">
                <span className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold">
                  ✓
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ── Footer ── */}
      <div className="px-6 py-4 border-t-2 border-slate-200 flex items-center justify-between gap-2">
        <div className="text-sm text-slate-600 font-body font-semibold truncate">
          {scheme.ministry?.split(",")[0] || "Government of India"}
        </div>
        <Link
          to={`/schemes/${id}`}
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-base font-bold text-navy-700 
                     hover:text-saffron-600 transition-colors duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-navy-600"
          aria-label={`View full details for ${scheme.name}`}
        >
          View Details
          <span className="text-lg leading-none">→</span>
        </Link>
      </div>
    </article>
  );
}
