/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        saffron: {
          50:  "#fff8f0",
          100: "#ffecd1",
          200: "#ffd49e",
          300: "#ffb85c",
          400: "#ff9520",
          500: "#ff7800",
          600: "#e85d00",
          700: "#c04500",
          800: "#993800",
          900: "#7a2f00",
        },
        navy: {
          50:  "#f0f4ff",
          100: "#dde6ff",
          200: "#c2d1ff",
          300: "#97b0ff",
          400: "#6484ff",
          500: "#3955ff",
          600: "#1f2fff",
          700: "#1420e6",
          800: "#1e3a5f",
          900: "#1e3a5f",
          950: "#16273f",
        },
        blue: {
          50:  "#f3f8fc",
          100: "#e6f0f9",
          200: "#cce1f2",
          300: "#99c7e5",
          400: "#66add8",
          500: "#4a9fd8",
          600: "#2e7ab8",
          700: "#1e5a9e",
          800: "#1e3a5f",
          900: "#122e47",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        body:    ['"DM Sans"', "system-ui", "sans-serif"],
        mono:    ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "fade-up":    "fadeUp 0.6s ease forwards",
        "fade-in":    "fadeIn 0.4s ease forwards",
        "spin-slow":  "spin 3s linear infinite",
        shimmer:      "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: 0, transform: "translateY(24px)" },
          to:   { opacity: 1, transform: "translateY(0)" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to:   { opacity: 1 },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
