// ─────────────────────────────────────────────────────────────────────────────
// src/components/Footer.jsx  –  Footer with government info (UX4G compliant)
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 font-body" role="contentinfo">
      {/* Tricolor strip */}
      <div className="h-1 tricolor-strip w-full" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div>
              <span className="font-display text-3xl font-bold text-white">Yojana</span>
              <span className="font-display text-3xl font-bold text-saffron-400">Setu</span>
            </div>
            <p className="text-base leading-relaxed text-slate-300">
              Bridging the gap between citizens and government welfare schemes.
              Find schemes you're eligible for instantly.
            </p>
            <p className="text-sm text-slate-400 font-semibold">
              🇮🇳 Made for every Indian
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-base uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                ["/", "Home"],
                ["/find-schemes", "Find Schemes"],
                ["/favourites", "Saved Schemes"],
                ["/about", "About"],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="text-base text-slate-300 hover:text-saffron-400 transition-colors font-body focus:outline-2 focus:outline-offset-2 focus:outline-white rounded"
                    aria-label={`Go to ${label}`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h4 className="text-white font-semibold mb-5 text-base uppercase tracking-wider">
              Disclaimer
            </h4>
            <p className="text-sm text-slate-400 leading-relaxed">
              Yojana Setu is an informational platform. All scheme data is for
              demonstration purposes. For official and accurate scheme
              information, please visit the respective government portals.
            </p>
            <p className="text-sm text-slate-500 mt-4 font-semibold">
              Data sourced from public government records.
            </p>
          </div>
        </div>

        <div className="border-t border-navy-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <span className="font-body">
            © {new Date().getFullYear()} Yojana Setu. For educational use only.
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="font-body">API Status: Operational</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
