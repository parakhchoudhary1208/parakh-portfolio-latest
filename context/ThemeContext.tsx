"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type BackgroundTheme = "default" | "fluid" | "flux";

interface ThemeContextType {
  theme: BackgroundTheme;
  setTheme: (theme: BackgroundTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<BackgroundTheme>("fluid");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-background-theme") as BackgroundTheme;
    if (saved) setThemeState(saved);
  }, []);

  const setTheme = (newTheme: BackgroundTheme) => {
    setThemeState(newTheme);
    localStorage.setItem("portfolio-background-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
