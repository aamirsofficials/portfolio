"use client";

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { isTheme, THEME_PROMPT_SEEN_KEY, THEME_STORAGE_KEY, type Theme } from "../theme";
import { ThemePreferenceCard } from "./ThemePreferenceCard";

type ThemeContextValue = {
  theme: Theme;
  selectTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme | null {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(savedTheme) ? savedTheme : null;
  } catch {
    return null;
  }
}

function hasSeenPreferenceCard() {
  try {
    return window.localStorage.getItem(THEME_PROMPT_SEEN_KEY) === "true";
  } catch {
    return false;
  }
}

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [showPreferenceCard, setShowPreferenceCard] = useState(false);
  const transitionTimer = useRef<number | null>(null);

  useLayoutEffect(() => {
    const documentTheme = document.documentElement.dataset.theme;
    const initialTheme: Theme = documentTheme === "dark" || documentTheme === "light"
      ? documentTheme
      : readStoredTheme() ?? getSystemTheme();
    document.documentElement.dataset.theme = initialTheme;
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    let revealTimer: number | null = null;

    const revealCard = () => {
      revealTimer = window.setTimeout(() => {
        if (!hasSeenPreferenceCard()) setShowPreferenceCard(true);
      }, 300);
    };

    if (!hasSeenPreferenceCard()) {
      if (document.readyState === "complete") revealCard();
      else window.addEventListener("load", revealCard, { once: true });
    }

    const systemPreference = window.matchMedia("(prefers-color-scheme: dark)");
    const followSystemPreference = (event: MediaQueryListEvent) => {
      if (readStoredTheme()) return;
      const systemTheme: Theme = event.matches ? "dark" : "light";
      document.documentElement.dataset.theme = systemTheme;
      setTheme(systemTheme);
    };
    systemPreference.addEventListener("change", followSystemPreference);

    return () => {
      window.removeEventListener("load", revealCard);
      systemPreference.removeEventListener("change", followSystemPreference);
      if (revealTimer !== null) window.clearTimeout(revealTimer);
    };
  }, []);

  useEffect(() => () => {
    if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
    document.documentElement.classList.remove("theme-transitioning");
  }, []);

  const selectTheme = useCallback((nextTheme: Theme) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduceMotion) {
      document.documentElement.classList.add("theme-transitioning");
      if (transitionTimer.current !== null) window.clearTimeout(transitionTimer.current);
      transitionTimer.current = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transitioning");
      }, 320);
    }

    document.documentElement.dataset.theme = nextTheme;
    setTheme(nextTheme);
    setShowPreferenceCard(false);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
      window.localStorage.setItem(THEME_PROMPT_SEEN_KEY, "true");
    } catch {
      // The theme still applies for this visit when storage is unavailable.
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, selectTheme }}>
      {children}
      <ThemePreferenceCard theme={theme} visible={showPreferenceCard} onSelect={selectTheme} />
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
