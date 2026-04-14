"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type BackgroundTheme = "galaxy" | "fluid" | "flux";

interface ThemeContextType {
  theme: BackgroundTheme;
  setTheme: (theme: BackgroundTheme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<BackgroundTheme>("galaxy");

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-background-theme");
    if (saved === "default" || !saved) {
      setThemeState("galaxy");
      localStorage.setItem("portfolio-background-theme", "galaxy");
    } else if (["galaxy", "fluid", "flux"].includes(saved)) {
      setThemeState(saved as BackgroundTheme);
    }
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
