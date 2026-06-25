// ─────────────────────────────────────────────────────────────────────────────
// src/pages/SchemeDetails.jsx  –  Full scheme detail view (Gemini AI powered)
// ─────────────────────────────────────────────────────────────────────────────

import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getSchemeDetails } from "../services/api";
import { useFavourites } from "../context/FavouritesContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

function DetailRow({ label, value }) {
  return (
    <div className="flex gap-3 py-3 border-b border-slate-100 last:border-0">
      <span className="text-sm font-semibold text-slate-500 font-body w-36 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-800 font-body">{value}</span>
    </div>
  );
}

export default function SchemeDetails() {
  const { id }        = useParams();
  const navigate      = useNavigate();
  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);
  const { isFavourite, toggleFavourite } = useFavourites();

  useEffect(() => {
    window.scrollTo(0, 0);
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        // The :id param is a slug like "pm-kisan-samman-nidhi"
        // Convert slug to readable name for Gemini lookup
        const data = await getSchemeDetails(id);
        setScheme(data.data);
      } catch (err) {
        setError(err.message || "Failed to load scheme details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-12 h-12 border-4 border-saffron-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 font-body text-sm">
            Fetching scheme details from AI...
          </p>
        </div>
      </div>
    );
  }

  if (error)   return <ErrorMessage message={error} onRetry={() => navigate(-1)} />;
  if (!scheme) return null;

  const saved   = isFavourite(scheme.id || scheme._id);
  const eligKey = scheme.eligibility || {};

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm font-body text-slate-400 mb-6">
        <Link to="/" className="hover:text-navy-700 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/find-schemes" className="hover:text-navy-700 transition-colors">Schemes</Link>
        <span>/</span>
        <span className="text-slate-600 line-clamp-1">{scheme.name}</span>
      </nav>

      {/* Verification Warning Alert */}
      {scheme.needsReview ? (
        <div className="mb-4 px-4 py-3.5 bg-rose-50 border border-rose-200 rounded-xl flex items-start gap-2.5 text-sm text-rose-800 font-body animate-pulse">
          <span className="text-lg leading-none mt-0.5">⚠️</span>
          <div>
            <span className="font-bold">Needs Review:</span> This scheme details have not been verified in over 180 days ({scheme.daysSinceVerification} days ago) and details might have changed. Please verify with the official government portal.
          </div>
        </div>
      ) : (
        <div className="mb-4 px-4 py-2.5 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-2 text-xs text-blue-700 font-body">
          <span>🤖</span>
          <span>Matching and relevance ranked using Google Gemini AI. Always cross-verify on official government portals.</span>
        </div>
      )}

      {/* ── Hero card ── */}
      <div className="card p-8 mb-6 animate-fade-up">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-start gap-5">
            {/* Emoji icon */}
            <div className="w-16 h-16 rounded-2xl bg-navy-50 border border-navy-100 flex items-center justify-center text-3xl flex-shrink-0">
              {scheme.imageEmoji || "🏛️"}
            </div>
            <div>
              <span className="badge bg-navy-50 text-navy-700 text-xs mb-2">
                {scheme.category}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-navy-900 leading-tight">
                {scheme.name}
              </h1>
              <p className="text-slate-500 font-body text-sm mt-1">
                {scheme.ministry}
                {scheme.launchedYear ? ` · Est. ${scheme.launchedYear}` : ""}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => toggleFavourite(scheme)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold font-body transition-all ${
                saved
                  ? "bg-saffron-50 border-saffron-300 text-saffron-600"
                  : "bg-white border-slate-200 text-slate-600 hover:border-saffron-300"
              }`}
            >
              {saved ? "★ Saved" : "☆ Save"}
            </button>

            {scheme.applicationUrl && (
              <a
                href={scheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-saffron text-sm py-2 px-5"
              >
                Apply Now ↗
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ── Main content ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <div className="card p-6">
            <h2 className="font-display font-bold text-navy-800 text-lg mb-4">About This Scheme</h2>
            <p className="text-slate-600 font-body text-sm leading-relaxed">
              {scheme.description}
            </p>
          </div>

          {/* Benefits */}
          {scheme.benefits?.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display font-bold text-navy-800 text-lg mb-4">Key Benefits</h2>
              <ul className="space-y-3">
                {scheme.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-slate-700 font-body text-sm">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* How to Apply */}
          {scheme.howToApply?.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display font-bold text-navy-800 text-lg mb-4">How to Apply</h2>
              <ol className="space-y-3">
                {scheme.howToApply.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-saffron-100 text-saffron-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 font-body text-sm">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Documents Required */}
          {scheme.documentsRequired?.length > 0 && (
            <div className="card p-6">
              <h2 className="font-display font-bold text-navy-800 text-lg mb-4">Documents Required</h2>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {scheme.documentsRequired.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-700 font-body">
                    <span className="text-navy-600">📄</span>
                    {doc}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Application link */}
          {scheme.applicationUrl && (
            <div className="card p-6 bg-navy-50 border-navy-100">
              <h2 className="font-display font-bold text-navy-800 text-lg mb-2">Official Portal</h2>
              <p className="text-slate-600 font-body text-sm mb-4">
                Visit the official government portal to apply for this scheme. Make sure
                you have all required documents ready before applying.
              </p>
              <a
                href={scheme.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                Visit Official Portal ↗
              </a>
            </div>
          )}
        </div>

        {/* ── Sidebar: Eligibility ── */}
        <aside className="lg:col-span-1">
          <div className="sticky top-20 space-y-6">
            {/* Status & Lifecycle Card */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-navy-800 text-lg mb-4">Scheme Status</h2>
              <div className="space-y-3 font-body">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500">Status</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${scheme.isActive !== false ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"}`}>
                    {scheme.isActive !== false ? "Active" : "Expired"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500">Last Verified</span>
                  <span className="text-sm font-medium text-slate-800">
                    {scheme.lastVerified ? new Date(scheme.lastVerified).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}) : "Recently"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-500">Deadline</span>
                  <span className="text-sm font-medium text-slate-800">
                    {scheme.deadline ? new Date(scheme.deadline).toLocaleDateString('en-IN', {day: 'numeric', month: 'short', year: 'numeric'}) : "Ongoing"}
                  </span>
                </div>
                {scheme.deadline && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm font-semibold text-slate-500">Days Remaining</span>
                    <span className={`text-sm font-bold ${scheme.daysRemaining > 30 ? "text-blue-600" : "text-amber-600"}`}>
                      {scheme.daysRemaining} days
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Eligibility Card */}
            <div className="card p-6">
              <h2 className="font-display font-bold text-navy-800 text-lg mb-4">Eligibility</h2>

              <div>
                <DetailRow label="Age Range"    value={`${eligKey.minAge ?? 0} – ${eligKey.maxAge ?? 99} years`} />
                <DetailRow label="Max Income"   value={eligKey.maxIncome ? `₹${eligKey.maxIncome.toLocaleString("en-IN")} / year` : "No limit"} />
                <DetailRow label="Gender"       value={eligKey.gender?.join(", ") || "All"} />
                <DetailRow label="Occupation"   value={eligKey.occupation?.join(", ") || "All"} />
                <DetailRow label="Category"     value={eligKey.category?.join(", ") || "All"} />
                <DetailRow label="States"       value={eligKey.states?.includes("All") ? "All India" : eligKey.states?.join(", ") || "All India"} />
              </div>

              <div className="mt-5 pt-5 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-body">
                  ⚠️ Eligibility criteria may change. Always verify on the official portal.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Back button */}
      <div className="mt-8">
        <button
          onClick={() => navigate(-1)}
          className="btn-outline text-sm"
        >
          ← Back to Schemes
        </button>
      </div>
    </div>
  );
}
