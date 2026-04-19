// ─────────────────────────────────────────────────────────────────────────────
// src/components/Navbar.jsx  –  Modern government portal navigation
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useFavourites } from "../context/FavouritesContext";
import { useAuth } from "../context/AuthContext";

import emblemImg from "../assets/images/emblem-india.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { favourites } = useFavourites();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const profileRef = useRef(null);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [location]);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinks = [
    { to: "/", label: "Home", icon: "🏠" },
    { to: "/find-schemes", label: "Find Schemes", icon: "🔍" },
    {
      to: "/favourites",
      label: "Saved",
      icon: "⭐",
      badge: favourites.length,
    },
    { to: "/about", label: "About", icon: "ℹ️" },
  ];

  return (
    <header className="relative z-40">
      {/* ━━━ TOP BAR  –  Government identity strip ━━━ */}
      <div className="bg-navy-950 text-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-1.5 text-xs font-body">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline tracking-wide">
              🇮🇳 भारत सरकार | Government of India
            </span>
            <span className="sm:hidden tracking-wide">🇮🇳 GOV.IN</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="text-[10px] sm:text-xs text-white/50 hidden md:inline">
              Ministry of Electronics & IT
            </span>
            {/* Language toggle placeholder */}
            <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
              <span className="text-[10px]">A+</span>
            </button>
            <button className="flex items-center gap-1 text-white/70 hover:text-white transition-colors">
              <span className="text-[10px]">हिं</span>
            </button>
          </div>
        </div>
      </div>

      {/* ━━━ Tricolor strip ━━━ */}
      <div className="h-[3px] tricolor-strip" />

      {/* ━━━ MAIN NAVBAR ━━━ */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-navy-950/5"
            : "bg-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[72px]">
            {/* ── Logo area ── */}
            <Link
              to="/"
              className="flex items-center gap-3 group no-underline shrink-0"
              aria-label="Yojana Setu — Home"
            >
              {/* Emblem */}
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-saffron-400 shadow-md shadow-saffron-200/40 group-hover:shadow-lg group-hover:shadow-saffron-300/50 transition-shadow duration-300 bg-white flex items-center justify-center">
                <img
                  src={emblemImg}
                  alt="National Emblem of India"
                  className="w-9 h-9 object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-[10px] text-saffron-600 font-body font-semibold tracking-widest uppercase leading-none">
                  योजना सेतु
                </span>
                <span className="text-xl sm:text-2xl font-display font-bold text-navy-950 leading-tight tracking-tight">
                  YOJANA <span className="text-saffron-600">SETU</span>
                </span>
                <span className="text-[9px] text-slate-400 font-body leading-none hidden sm:block">
                  Government Schemes Discovery Portal
                </span>
              </div>
            </Link>

            {/* ── Desktop navigation links ── */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map(({ to, label, badge }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  className={({ isActive }) =>
                    `relative px-4 py-2 rounded-lg font-body text-sm font-semibold transition-all duration-200 no-underline ${
                      isActive
                        ? "text-saffron-700 bg-saffron-50"
                        : "text-slate-700 hover:text-navy-800 hover:bg-slate-50"
                    }`
                  }
                >
                  {label}
                  {badge > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full ring-2 ring-white animate-pulse">
                      {badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>

            {/* ── Right side: Auth + mobile toggle ── */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Desktop auth */}
              <div className="hidden lg:flex items-center gap-2">
                {isAuthenticated ? (
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-50 transition-colors"
                      aria-expanded={profileOpen}
                      aria-label="Account menu"
                    >
                      {/* Avatar */}
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-saffron-500 to-navy-700 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                        {user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <span className="text-sm font-semibold text-slate-700 max-w-[100px] truncate">
                        {user?.name}
                      </span>
                      <svg
                        className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                          profileOpen ? "rotate-180" : ""
                        }`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Profile dropdown */}
                    {profileOpen && (
                      <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl shadow-slate-200/80 border border-slate-100 py-2 animate-fade-in">
                        <div className="px-4 py-2 border-b border-slate-100">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {user?.name}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {user?.email}
                          </p>
                        </div>
                        <Link
                          to="/favourites"
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 no-underline"
                        >
                          ⭐ Saved Schemes
                        </Link>
                        <button
                          onClick={logout}
                          className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          🚪 Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="px-5 py-2 rounded-lg text-sm font-semibold text-navy-800 hover:bg-navy-50 transition-all duration-200 no-underline"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="px-5 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-700 hover:to-saffron-600 shadow-md shadow-saffron-200/50 hover:shadow-lg active:scale-95 transition-all duration-200 no-underline"
                    >
                      Register Free
                    </Link>
                  </>
                )}
              </div>

              {/* ── Mobile hamburger ── */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden flex items-center justify-center w-10 h-10 rounded-lg hover:bg-slate-100 transition-colors"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                <div className="flex flex-col items-center justify-center gap-[5px]">
                  <span
                    className={`block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 ${
                      mobileOpen
                        ? "rotate-45 translate-y-[7px]"
                        : ""
                    }`}
                  />
                  <span
                    className={`block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 ${
                      mobileOpen ? "opacity-0 scale-0" : ""
                    }`}
                  />
                  <span
                    className={`block w-5 h-[2px] bg-slate-700 rounded-full transition-all duration-300 ${
                      mobileOpen
                        ? "-rotate-45 -translate-y-[7px]"
                        : ""
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* ── Bottom accent line ── */}
        <div
          className={`h-[2px] transition-all duration-500 ${
            scrolled
              ? "bg-gradient-to-r from-saffron-500 via-saffron-400 to-transparent"
              : "bg-slate-100"
          }`}
        />
      </nav>

      {/* ━━━ MOBILE DRAWER ━━━ */}
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-navy-950/40 backdrop-blur-sm z-40 transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Drawer panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[300px] bg-white shadow-2xl z-50 transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-saffron-600 font-semibold tracking-widest">
              योजना सेतु
            </div>
            <div className="font-display font-bold text-lg text-navy-950">
              YOJANA SETU
            </div>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="w-9 h-9 rounded-lg flex items-center justify-center hover:bg-slate-100 transition-colors"
            aria-label="Close menu"
          >
            <svg
              className="w-5 h-5 text-slate-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Drawer links */}
        <div className="py-3 px-3 flex flex-col gap-1">
          {navLinks.map(({ to, label, icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl font-body text-sm font-semibold transition-all duration-200 no-underline ${
                  isActive
                    ? "bg-saffron-50 text-saffron-700"
                    : "text-slate-700 hover:bg-slate-50"
                }`
              }
            >
              <span className="text-lg">{icon}</span>
              {label}
              {badge > 0 && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full">
                  {badge}
                </span>
              )}
            </NavLink>
          ))}
        </div>

        {/* Drawer divider */}
        <div className="mx-3 border-t border-slate-100" />

        {/* Drawer auth */}
        <div className="p-4 flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl mb-1">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-saffron-500 to-navy-700 flex items-center justify-center text-white font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800 truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-full py-3 rounded-xl text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="w-full py-3 rounded-xl text-sm font-semibold text-center text-navy-800 bg-slate-50 hover:bg-slate-100 transition-colors no-underline"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="w-full py-3 rounded-xl text-sm font-semibold text-center text-white bg-gradient-to-r from-saffron-600 to-saffron-500 hover:from-saffron-700 hover:to-saffron-600 shadow-md transition-all no-underline"
              >
                Register Free
              </Link>
            </>
          )}
        </div>

        {/* Gov badge at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100 bg-slate-50/50">
          <p className="text-[10px] text-slate-400 text-center font-body">
            🇮🇳 भारत सरकार | Government of India
          </p>
          <p className="text-[9px] text-slate-400 text-center font-body mt-0.5">
            Ministry of Electronics & Information Technology
          </p>
        </div>
      </div>
    </header>
  );
}
