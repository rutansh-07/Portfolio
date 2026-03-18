import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["Syne", "sans-serif"],
        dm: ["DM Sans", "sans-serif"],
      },
      colors: {
        accent1: "#7c6aff",
        accent2: "#00e5ff",
        accent3: "#ff6af0",
        bgprimary: "#050510",
        bgsecondary: "#080820",
      },
      backdropBlur: {
        xs: "4px",
        xl: "20px",
        "2xl": "40px",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
        glow1: "0 0 40px rgba(124, 106, 255, 0.3)",
        glow2: "0 0 40px rgba(0, 229, 255, 0.2)",
        glow3: "0 0 40px rgba(255, 106, 240, 0.2)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease forwards",
        "orb-float": "orbFloat 12s ease-in-out infinite",
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "border-glow": "borderGlow 3s ease-in-out infinite",
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        orbFloat: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(30px, -40px) scale(1.05)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(124, 106, 255, 0.3)" },
          "50%": { borderColor: "rgba(0, 229, 255, 0.5)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;