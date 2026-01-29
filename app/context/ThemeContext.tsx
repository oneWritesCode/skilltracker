"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme =
  | "rose"
  | "sky"
  | "amber"
  | "emerald"
  | "violet"
  | "black"
  | "yellow";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  availableThemes: { id: Theme; color: string; name: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEMES: { id: Theme; color: string; name: string }[] = [
  { id: "rose", color: "#FA5C5C", name: "Rose" },
  { id: "violet", color: "#8B5CF6", name: "Violet" },
  { id: "yellow", color: "#FBEF76", name: "Yellow" },
  { id: "black", color: "#000", name: "Black" },
];

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>("black");

  useEffect(() => {
    const savedTheme = localStorage.getItem("skilltracker-theme") as Theme;
    if (savedTheme && THEMES.find((t) => t.id === savedTheme)) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("skilltracker-theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, availableThemes: THEMES }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
