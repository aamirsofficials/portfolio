export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "portfolio-theme";
export const THEME_PROMPT_SEEN_KEY = "portfolio-theme-prompt-seen";

export function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}
