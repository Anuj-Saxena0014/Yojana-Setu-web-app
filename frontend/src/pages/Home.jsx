// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Home.jsx  –  Landing page
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import SchemeCard from "../components/SchemeCard";
import { SkeletonCard } from "../components/Spinner";
import { useAllSchemes } from "../hooks/useSchemes";

// ── Stat tile ────────────────────────────────────────────────────────────────
function StatTile({ value, label, emoji }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-display font-bold text-navy-800">{value}</div>
      <div className="text-xs text-slate-500 font-body mt-0.5">{emoji} {label}</div>
    </div>
  );
}

// ── Category pill ─────────────────────────────────────────────────────────────
function CategoryPill({ emoji, label, color }) {
  return (
    <Link
      to={`/find-schemes`}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-body text-sm font-medium
                  transition-all hover:scale-105 hover:shadow-sm ${color}`}
    >
      <span>{emoji}</span>
      {label}
    </Link>
  );
}

const CATEGORIES = [
  { emoji: "🌾", label: "Agriculture",      color: "bg-green-50  border-green-200  text-green-700 hover:border-green-400"  },
  { emoji: "📚", label: "Education",         color: "bg-blue-50   border-blue-200   text-blue-700  hover:border-blue-400"   },
  { emoji: "🏥", label: "Health",            color: "bg-red-50    border-red-200    text-red-700   hover:border-red-400"    },
  { emoji: "🏠", label: "Housing",           color: "bg-amber-50  border-amber-200  text-amber-700 hover:border-amber-400"  },
  { emoji: "👧", label: "Women Welfare",     color: "bg-pink-50   border-pink-200   text-pink-700  hover:border-pink-400"   },
  { emoji: "💼", label: "Entrepreneurship",  color: "bg-purple-50 border-purple-200 text-purple-700 hover:border-purple-400"},
  { emoji: "⚙️", label: "Skill Development", color: "bg-teal-50   border-teal-200   text-teal-700  hover:border-teal-400"   },
  { emoji: "🛡️", label: "Social Security",  color: "bg-orange-50 border-orange-200 text-orange-700 hover:border-orange-400"},
];

export default function Home() {
  const { schemes, loading, fetch } = useAllSchemes();

  useEffect(() => {
    fetch();
  }, [fetch]);

  const featured = schemes.slice(0, 3);

  return (
    <div>
      {/* ══════════════════════════════════════════════════════════════════════
          STATISTICS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 border-b-4 border-saffron-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 border-t-4 border-saffron-600">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">2,340+</div>
              <div className="text-slate-600 font-body tracking-widest uppercase text-sm">Total Schemes</div>
            </div>
            <div className="text-center p-6 border-t-4 border-saffron-600">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">28</div>
              <div className="text-slate-600 font-body tracking-widest uppercase text-sm">States Covered</div>
            </div>
            <div className="text-center p-6 border-t-4 border-saffron-600">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">48L+</div>
              <div className="text-slate-600 font-body tracking-widest uppercase text-sm">Citizens Benefited</div>
            </div>
            <div className="text-center p-6 border-t-4 border-saffron-600">
              <div className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">98%</div>
              <div className="text-slate-600 font-body tracking-widest uppercase text-sm">Match Accuracy</div>
            </div>
          </div>
          <div className="text-center text-sm text-slate-500 mt-6 font-body">
            * Last updated: 16 April 2026 | Data from MyScheme.gov.in
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          BROWSE BY CATEGORY
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.label}
                to="/find-schemes"
                className="text-center p-8 bg-white border-t-4 border-blue-100 hover:shadow-lg transition-shadow rounded"
              >
                <div className="text-4xl mb-4">{cat.emoji}</div>
                <div className="font-semibold text-slate-800">{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          FEATURED SCHEMES
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="section bg-slate-50">
        <div className="container-max">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy-900">Featured Schemes</h2>
              <p className="text-slate-500 font-body mt-1 text-sm">Popular schemes you should know about</p>
            </div>
            <Link to="/find-schemes" className="text-sm font-semibold text-navy-700 hover:text-saffron-600 transition-colors hidden sm:block">
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading
              ? [0, 1, 2].map((i) => <SkeletonCard key={i} />)
              : featured.map((scheme, i) => (
                  <SchemeCard key={scheme.id || scheme._id || i} scheme={scheme} delay={i * 100} />
                ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/find-schemes" className="btn-primary">
              Find Schemes For Me →
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-gradient-to-r from-saffron-500 to-saffron-600 py-16 px-4">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Don't Miss Out on Benefits You Deserve
          </h2>
          <p className="font-body text-saffron-100 mb-8 text-lg">
            Millions of Indians are unaware of schemes they qualify for. Check your eligibility now — it's free and takes less than 2 minutes.
          </p>
          <Link to="/find-schemes" className="inline-flex items-center gap-2 bg-white text-saffron-600 font-body font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow text-base">
            ✦ Check Eligibility Now
          </Link>
        </div>
      </section>
    </div>
  );
}
