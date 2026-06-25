// ─────────────────────────────────────────────────────────────────────────────
// src/App.jsx  –  Root component with React Router setup
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { FavouritesProvider } from "./context/FavouritesContext";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

import Navbar      from "./components/Navbar";
import HeroSlider  from "./components/HeroSlider";
import Footer      from "./components/Footer";
import Home        from "./pages/Home";
import FindSchemes from "./pages/FindSchemes";
import SchemeDetails from "./pages/SchemeDetails";
import Favourites  from "./pages/Favourites";
import About       from "./pages/About";
import Login       from "./pages/Login";
import Signup      from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import NotFound    from "./pages/NotFound";
import schemes from "./data/schemes";


function AppContent() {
  const location = useLocation();
  const isHome = location.pathname === "/";
  

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Show hero slider only on the home page */}
      {isHome && <HeroSlider />}

      <main className="flex-1">
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/login"        element={<Login />} />
          <Route path="/signup"       element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/find-schemes" element={<FindSchemes />} />
          <Route path="/schemes/:id"  element={<SchemeDetails />} />
          <Route path="/favourites"   element={<Favourites />} />
          <Route path="/about"        element={<About />} />
          <Route path="*"             element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavouritesProvider>
        <Toaster position="top-right" />
        <AppContent />
      </FavouritesProvider>
    </AuthProvider>
  );
}
