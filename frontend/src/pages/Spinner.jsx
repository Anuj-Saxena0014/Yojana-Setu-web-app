// ─────────────────────────────────────────────────────────────────────────────
// src/components/Spinner.jsx  –  Ashoka-Chakra-inspired loading spinner
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";

export default function Spinner({ message = "Loading schemes…" }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-6">
      {/* Animated Ashoka wheel */}
      <div className="relative w-16 h-16">
        <svg
          viewBox="0 0 100 100"
          className="w-16 h-16 animate-spin-slow"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="50" cy="50" r="46" stroke="#dde6ff" strokeWidth="4" />
          <circle cx="50" cy="50" r="8" fill="#1420e6" />
          {[...Array(24)].map((_, i) => {
            const angle = (i * 360) / 24;
            const rad   = (angle * Math.PI) / 180;
            const x1    = 50 + 12 * Math.cos(rad);
            const y1    = 50 + 12 * Math.sin(rad);
            const x2    = 50 + 42 * Math.cos(rad);
            const y2    = 50 + 42 * Math.sin(rad);
            return (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={i % 2 === 0 ? "#1420e6" : "#97b0ff"}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            );
          })}
          <circle cx="50" cy="50" r="46" stroke="#1420e6" strokeWidth="4"
            strokeDasharray="72 217" strokeLinecap="round" />
        </svg>
      </div>

      <p className="text-slate-500 font-body text-sm animate-pulse">{message}</p>
    </div>
  );
}

// ── Skeleton card for loading state ──────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="card p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="skeleton w-12 h-12 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-3 w-16 rounded" />
          <div className="skeleton h-4 w-3/4 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="skeleton h-3 w-full rounded" />
        <div className="skeleton h-3 w-5/6 rounded" />
        <div className="skeleton h-3 w-4/6 rounded" />
      </div>
      <div className="space-y-1.5">
        <div className="skeleton h-3 w-1/2 rounded" />
        <div className="skeleton h-3 w-2/5 rounded" />
      </div>
      <div className="border-t border-slate-100 pt-4 flex justify-between">
        <div className="skeleton h-3 w-24 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
      </div>
    </div>
  );
}
