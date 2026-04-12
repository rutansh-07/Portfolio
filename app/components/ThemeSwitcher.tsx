"use client";

import { useState } from "react";
import { useTheme, Theme } from "./ThemeProvider";

const themes: {
  id: Theme;
  label: string;
  emoji: string;
  colors: string[];
}[] = [
  { id: "midnight", label: "Midnight", emoji: "🌌", colors: ["#38bdf8", "#818cf8"] },
  { id: "emerald", label: "Emerald", emoji: "🌿", colors: ["#10b981", "#34d399"] },
  { id: "crimson", label: "Crimson", emoji: "🔥", colors: ["#ef4444", "#f87171"] },
  { id: "minimal", label: "Minimal", emoji: "☁️", colors: ["#0f172a", "#334155"] },
];

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const current = themes.find((t) => t.id === theme) || themes[0];

  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      {/* Panel */}
      <div
        className={`absolute bottom-16 right-0 w-48 glass rounded-2xl p-2 flex flex-col gap-1 transition-all duration-300 transform ${
          open
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-4 scale-95 pointer-events-none"
        }`}
      >
        <p className="text-[10px] font-syne opacity-40 uppercase tracking-widest px-3 py-1 font-bold">
          Theme
        </p>
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTheme(t.id);
              setOpen(false);
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 text-left ${
              theme === t.id ? "bg-white/10" : "hover:bg-white/5"
            }`}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: `linear-gradient(135deg, ${t.colors[0]}, ${t.colors[1]})` }}
            />
            <span className="font-syne text-sm font-semibold opacity-80">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full glass flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 shadow-xl group"
      >
        <div 
          className="w-6 h-6 rounded-full transition-transform duration-500 group-hover:rotate-180"
          style={{ background: `linear-gradient(135deg, ${current.colors[0]}, ${current.colors[1]})` }}
        />
      </button>
    </div>
  );
};

export default ThemeSwitcher;