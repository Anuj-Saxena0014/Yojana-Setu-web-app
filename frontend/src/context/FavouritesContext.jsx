// ─────────────────────────────────────────────────────────────────────────────
// src/context/FavouritesContext.jsx  –  Global saved-schemes store
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useEffect } from "react";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
  // Persist to localStorage so favourites survive page refresh
  const [favourites, setFavourites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ys_favourites") || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("ys_favourites", JSON.stringify(favourites));
  }, [favourites]);

  const isFavourite = (id) => favourites.some((s) => s.id === id || s._id === id);

  const toggleFavourite = (scheme) => {
    const id = scheme.id || scheme._id;
    setFavourites((prev) =>
      prev.some((s) => (s.id || s._id) === id)
        ? prev.filter((s) => (s.id || s._id) !== id)
        : [...prev, scheme]
    );
  };

  return (
    <FavouritesContext.Provider value={{ favourites, isFavourite, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const ctx = useContext(FavouritesContext);
  if (!ctx) throw new Error("useFavourites must be inside FavouritesProvider");
  return ctx;
};
