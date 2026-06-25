// ─────────────────────────────────────────────────────────────────────────────
// src/context/FavouritesContext.jsx  –  Global saved-schemes store
// ─────────────────────────────────────────────────────────────────────────────

import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getUserFavourites, toggleUserFavourite } from "../services/api";

const FavouritesContext = createContext(null);

export const FavouritesProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [favourites, setFavourites] = useState([]);

  // Fetch favourites when user logs in
  useEffect(() => {
    if (isAuthenticated) {
      fetchFavourites();
    } else {
      setFavourites([]);
    }
  }, [isAuthenticated, user]);

  const fetchFavourites = async () => {
    try {
      const data = await getUserFavourites();
      if (data.success) {
        setFavourites(data.favourites || []);
      }
    } catch (error) {
      console.error("Failed to fetch favourites", error);
    }
  };

  const isFavourite = (id) => favourites.some((s) => s.id === id || s._id === id);

  const toggleFavourite = async (scheme) => {
    if (!isAuthenticated) {
      toast.error("Please login to save favourites");
      navigate("/login");
      return;
    }

    const id = scheme.id || scheme._id;
    // Optimistic update for better UX
    setFavourites((prev) =>
      prev.some((s) => (s.id || s._id) === id)
        ? prev.filter((s) => (s.id || s._id) !== id)
        : [...prev, scheme]
    );

    try {
      const data = await toggleUserFavourite(id);
      if (data.success) {
        if (data.added) {
          toast.success("Added to favourites");
        } else {
          toast.success("Removed from favourites");
        }
      }
    } catch (error) {
      toast.error("Failed to update favourites");
      // Revert optimistic update
      fetchFavourites();
    }
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
