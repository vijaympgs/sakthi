"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "sakthi" | "light" | "dark";
type Typography = "editorial" | "modern" | "classic";

interface ThemeState {
  theme: Theme;
  typography: Typography;
  setTheme: (t: Theme) => void;
  setTypography: (t: Typography) => void;
  cycleTheme: () => void;
  cycleTypography: () => void;
}

const THEMES: Theme[] = ["sakthi", "light", "dark"];
const TYPOGRAPHIES: Typography[] = ["editorial", "modern", "classic"];

const ThemeContext = createContext<ThemeState | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("sakthi");
  const [typography, setTypographyState] = useState<Typography>("editorial");
  const [mounted, setMounted] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("sakthi-theme") as Theme | null;
    const savedTypo = localStorage.getItem("sakthi-typography") as Typography | null;
    if (saved && THEMES.includes(saved)) setThemeState(saved);
    if (savedTypo && TYPOGRAPHIES.includes(savedTypo)) setTypographyState(savedTypo);
    setMounted(true);
  }, []);

  // Apply theme/typography to <html> attributes
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("data-typography", typography);
    localStorage.setItem("sakthi-theme", theme);
    localStorage.setItem("sakthi-typography", typography);
  }, [theme, typography, mounted]);

  const setTheme = (t: Theme) => setThemeState(t);
  const setTypography = (t: Typography) => setTypographyState(t);

  const cycleTheme = () => {
    const idx = THEMES.indexOf(theme);
    setThemeState(THEMES[(idx + 1) % THEMES.length]);
  };

  const cycleTypography = () => {
    const idx = TYPOGRAPHIES.indexOf(typography);
    setTypographyState(TYPOGRAPHIES[(idx + 1) % TYPOGRAPHIES.length]);
  };

  return (
    <ThemeContext.Provider value={{ theme, typography, setTheme, setTypography, cycleTheme, cycleTypography }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeState {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
