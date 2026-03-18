"use client";

import { useState } from "react";
import { useTheme, Theme } from "./ThemeProvider";

const themes: {
  id: Theme;
  label: string;
  emoji: string;
  desc: string;
  colors: string[];
}[] = [
  {
    id: "cosmic",
    label: "Cosmic",
    emoji: "🌌",
    desc: "Deep space vibes",
    colors: ["#7c6aff", "#00e5ff", "#ff6af0"],
  },
  {
    id: "matrix",
    label: "Matrix",
    emoji: "💚",
    desc: "Hacker mode",
    colors: ["#00ff41", "#00cc33", "#008f11"],
  },
  {
    id: "sunset",
    label: "Sunset",
    emoji: "🌅",
    desc: "Warm & creative",
    colors: ["#ff6b35", "#f7c59f", "#ff006e"],
  },
  {
    id: "arctic",
    label: "Arctic",
    emoji: "🧊",
    desc: "Clean & minimal",
    colors: ["#e0f7ff", "#b3ecff", "#4fc3f7"],
  },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const current = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="fixed bottom-6 right-6 z-[999]">
      {/* Panel */}
      <div
        className={`absolute bottom-14 right-0 w-56 glass border border-white/10 rounded-2xl p-3 flex flex-col gap-2 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <p className="text-xs font-syne text-white/30 uppercase tracking-widest px-2 pb-1">
          Vibe Mode
        </p>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTheme(t.id);
              setOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 text-left group ${
              theme === t.id
                ? "bg-white/10 border border-white/10"
                : "hover:bg-white/5"
            }`}
          >
            {/* Color dots */}
            <div className="flex gap-1">
              {t.colors.map((c) => (
                <span
                  key={c}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
            <div className="flex-1">
              <p className="font-syne text-sm text-white/80 font-semibold leading-none mb-0.5">
                {t.emoji} {t.label}
              </p>
              <p className="font-dm text-xs text-white/30">{t.desc}</p>
            </div>
            {theme === t.id && (
              <span className="text-accent2 text-xs">✓</span>
            )}
          </button>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-12 h-12 rounded-full glass border border-white/10 hover:border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110 group"
        aria-label="Change theme"
      >
        <div className="flex gap-0.5">
          {current.colors.map((c) => (
            <span
              key={c}
              className="w-1.5 h-1.5 rounded-full transition-all duration-300"
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </button>
    </div>
  );
};

export default ThemeSwitcher;