"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";

export type SiteTheme = "licht" | "donker";

const STORAGE_KEY = "optisend-theme";

type ThemeContextValue = {
  theme: SiteTheme;
  setTheme: (theme: SiteTheme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyTheme(theme: SiteTheme) {
  document.documentElement.classList.toggle("dark", theme === "donker");
  document.documentElement.style.colorScheme = theme === "donker" ? "dark" : "light";
}

function readStoredTheme(): SiteTheme {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "donker" || stored === "licht") {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return document.documentElement.classList.contains("dark") ? "donker" : "licht";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const landing = pathname === "/";
  const [theme, setThemeState] = useState<SiteTheme>("licht");

  useEffect(() => {
    const stored = readStoredTheme();
    setThemeState(stored);
    applyTheme(landing ? "licht" : stored);
  }, [landing]);

  const setTheme = useCallback(
    (next: SiteTheme) => {
      setThemeState(next);
      applyTheme(landing ? "licht" : next);
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* ignore */
      }
    },
    [landing]
  );

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme moet binnen ThemeProvider gebruikt worden");
  }
  return context;
}
