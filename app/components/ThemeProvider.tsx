"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "cosmic" | "matrix" | "sunset" | "arctic";

interface ThemeContextType {
  theme: Theme;
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "cosmic",
  setTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("cosmic");

  const setTheme = (t: Theme) => {
    setThemeState(t);
    // Apply to <html> tag so CSS [data-theme] selectors work
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem("vibe-theme", t);
  };

  useEffect(() => {
    const saved = localStorage.getItem("vibe-theme") as Theme | null;
    const initial = saved || "cosmic";
    setThemeState(initial);
    document.documentElement.setAttribute("data-theme", initial);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};