// ─────────────────────────────────────────────────────────────────────────────
// src/components/HeroSlider.jsx  –  Full-width hero image carousel
// ─────────────────────────────────────────────────────────────────────────────

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import heroSlide1 from "../assets/images/hero-slide-1.png";
import heroSlide2 from "../assets/images/hero-slide-2.png";
import heroSlide3 from "../assets/images/hero-slide-3.png";

const SLIDES = [
  {
    image: heroSlide1,
    title: "Discover Government Schemes You Deserve",
    titleHi: "आपके लिए सरकारी योजनाएं खोजें",
    subtitle:
      "AI-powered matching across 2,340+ central & state schemes. Get personalized results in under 2 minutes.",
    cta: "Find Your Schemes",
    ctaLink: "/find-schemes",
  },
  {
    image: heroSlide2,
    title: "Empowering Every Citizen of India",
    titleHi: "भारत के हर नागरिक को सशक्त बनाना",
    subtitle:
      "From farmers to students, women to senior citizens — access benefits designed for you.",
    cta: "Explore Categories",
    ctaLink: "/find-schemes",
  },
  {
    image: heroSlide3,
    title: "One Nation, One Portal for Welfare",
    titleHi: "एक राष्ट्र, कल्याण के लिए एक पोर्टल",
    subtitle:
      "Bridging the gap between government schemes and eligible citizens through smart technology.",
    cta: "Create Free Account",
    ctaLink: "/signup",
  },
];

const INTERVAL = 5000; // ms between auto-slides

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index) => {
    setCurrent((index + SLIDES.length) % SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(next, INTERVAL);
    return () => clearInterval(timer);
  }, [next, isPaused]);

  return (
    <section
      className="relative w-full h-[420px] sm:h-[500px] lg:h-[560px] overflow-hidden group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-roledescription="carousel"
      aria-label="Government scheme highlights"
    >
      {/* ── Slides ── */}
      {SLIDES.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            i === current
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105 pointer-events-none"
          }`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${SLIDES.length}`}
          aria-hidden={i !== current}
        >
          {/* Background image */}
          <img
            src={slide.image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading={i === 0 ? "eager" : "lazy"}
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/90 via-navy-950/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-navy-950/30" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              {/* Hindi tagline */}
              <p
                className={`text-saffron-400 font-body text-sm sm:text-base tracking-wider mb-3 transition-all duration-700 delay-200 ${
                  i === current
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                {slide.titleHi}
              </p>

              {/* Heading */}
              <h2
                className={`font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight mb-4 transition-all duration-700 delay-300 ${
                  i === current
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {slide.title}
              </h2>

              {/* Subtitle */}
              <p
                className={`text-blue-100 font-body text-base sm:text-lg max-w-xl mb-6 leading-relaxed transition-all duration-700 delay-[400ms] ${
                  i === current
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                {slide.subtitle}
              </p>

              {/* CTA */}
              <div
                className={`flex flex-wrap gap-3 transition-all duration-700 delay-500 ${
                  i === current
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0"
                }`}
              >
                <Link
                  to={slide.ctaLink}
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-saffron-600 text-white font-semibold rounded-lg
                             hover:bg-saffron-700 hover:shadow-lg hover:shadow-saffron-600/30
                             active:scale-95 transition-all duration-200 text-base"
                >
                  {slide.cta}
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/40 text-white font-semibold rounded-lg
                             hover:bg-white/10 hover:border-white/70 active:scale-95 transition-all duration-200 text-base"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* ── Dark gradient at bottom for smooth transition ── */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

      {/* ── Arrow buttons ── */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20 text-white
                   hover:bg-white/25 active:scale-90 transition-all duration-200
                   opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full
                   bg-white/10 backdrop-blur-md border border-white/20 text-white
                   hover:bg-white/25 active:scale-90 transition-all duration-200
                   opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "w-8 h-2.5 bg-saffron-500"
                : "w-2.5 h-2.5 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
