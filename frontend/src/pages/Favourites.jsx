// ─────────────────────────────────────────────────────────────────────────────
// src/pages/Favourites.jsx  –  Saved / bookmarked schemes
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import SchemeCard from "../components/SchemeCard";

export default function Favourites() {
  const { favourites } = useFavourites();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy-900">
          Saved Schemes
        </h1>
        <p className="text-slate-500 font-body mt-1">
          {favourites.length > 0
            ? `You have saved ${favourites.length} scheme${favourites.length !== 1 ? "s" : ""}.`
            : "No saved schemes yet."}
        </p>
      </div>

      {favourites.length === 0 ? (
        /* Empty state */
        <div className="card p-16 text-center max-w-lg mx-auto">
          <div className="text-6xl mb-5">☆</div>
          <h2 className="font-display font-bold text-navy-900 text-2xl mb-3">
            No saved schemes yet
          </h2>
          <p className="text-slate-500 font-body text-sm mb-8">
            When you find a scheme you like, tap the ☆ on the card to save it
            here for quick access later.
          </p>
          <Link to="/find-schemes" className="btn-saffron">
            Browse Schemes
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {favourites.map((scheme, i) => (
            <SchemeCard
              key={scheme._id || scheme.id}
              scheme={scheme}
              delay={i * 80}
            />
          ))}
        </div>
      )}
    </div>
  );
}
