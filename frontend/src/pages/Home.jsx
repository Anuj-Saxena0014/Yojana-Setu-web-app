// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Home.jsx  –  Landing page
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();
  const [showWelcomeBanner, setShowWelcomeBanner] = useState(!!location.state?.welcome);
  const [showLoginBanner, setShowLoginBanner] = useState(!!location.state?.loggedIn);
  const welcomeName = location.state?.name || "";

  useEffect(() => {
    fetch();
  }, [fetch]);

  const featured = schemes.slice(0, 3);

  return (
    <div>
      {/* 🌟 Welcome Banner (First-time Login / Registration) */}
      {showWelcomeBanner && (
        <div className="bg-emerald-50 border-b-2 border-emerald-400 py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-3">
              <span className="flex items-center justify-center p-2 rounded-lg bg-emerald-500 text-white text-lg leading-none">🎉</span>
              <p className="font-medium text-emerald-800 font-body text-base">
                <span className="font-bold">Welcome to Yojana Setu, {welcomeName}!</span> We've sent a welcome email to your registered inbox. Please check your spam/promotions folder if it doesn't appear.
              </p>
            </div>
            <button
              onClick={() => setShowWelcomeBanner(false)}
              className="p-1 rounded-md hover:bg-emerald-100 text-emerald-500 focus:outline-none transition-colors"
              aria-label="Close welcome notification"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 🔒 Standard Login Success Banner */}
      {showLoginBanner && (
        <div className="bg-blue-50 border-b-2 border-blue-400 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center gap-3">
              <span className="flex items-center justify-center p-2 rounded-lg bg-blue-500 text-white text-base leading-none">🔓</span>
              <p className="font-medium text-blue-800 font-body text-base">
                Signed in successfully! Welcome back to Yojana Setu.
              </p>
            </div>
            <button
              onClick={() => setShowLoginBanner(false)}
              className="p-1 rounded-md hover:bg-blue-100 text-blue-500 focus:outline-none transition-colors"
              aria-label="Close login notification"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {/* ══════════════════════════════════════════════════════════════════════
          STATISTICS SECTION
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-10 border-t border-saffron-500 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 lg:gap-y-0">
            
            {/* Card 1: Total Schemes */}
            <div className="flex items-center gap-4 py-2 justify-center lg:border-r lg:border-saffron-200/50">
              <div className="w-14 h-14 rounded-2xl bg-saffron-50 border border-saffron-100/60 flex items-center justify-center shadow-sm flex-shrink-0">
                <svg className="w-6 h-6 text-saffron-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="10" cy="7" r="3" />
                  <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                  <circle cx="17" cy="8" r="2.5" />
                  <path d="M3 18c4 3 10 3 14 0" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-none">2,340+</span>
                <div className="w-8 h-0.5 bg-saffron-500 my-1.5"></div>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-body">Total Schemes</span>
              </div>
            </div>

            {/* Card 2: States Covered */}
            <div className="flex items-center gap-4 py-2 justify-center lg:border-r lg:border-saffron-200/50">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-100/60 flex items-center justify-center shadow-sm flex-shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <circle cx="12" cy="11" r="3" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-none">28</span>
                <div className="w-8 h-0.5 bg-emerald-500 my-1.5"></div>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-body">States Covered</span>
              </div>
            </div>

            {/* Card 3: Citizens Benefited */}
            <div className="flex items-center gap-4 py-2 justify-center lg:border-r lg:border-saffron-200/50">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100/60 flex items-center justify-center shadow-sm flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-none">48L+</span>
                <div className="w-8 h-0.5 bg-blue-500 my-1.5"></div>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-body">Citizens Benefited</span>
              </div>
            </div>

            {/* Card 4: Match Accuracy */}
            <div className="flex items-center gap-4 py-2 justify-center">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 border border-purple-100/60 flex items-center justify-center shadow-sm flex-shrink-0">
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" fill="currentColor" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 8l4-4m0 0h-4m4 0v4" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 leading-none">98%</span>
                <div className="w-8 h-0.5 bg-purple-500 my-1.5"></div>
                <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase font-body">Match Accuracy</span>
              </div>
            </div>

          </div>

          {/* Last Updated Footer */}
          <div className="flex items-center justify-center gap-2 mt-8 text-xs font-body text-slate-400">
            <span className="w-8 h-px bg-slate-200"></span>
            <span className="text-emerald-600">🛡️</span>
            <span>* Last updated: 16 April 2026 | Data from MyScheme.gov.in</span>
            <span className="w-8 h-px bg-slate-200"></span>
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
