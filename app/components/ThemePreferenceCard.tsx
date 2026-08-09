"use client";

import type { Theme } from "../theme";

type ThemePreferenceCardProps = {
  theme: Theme;
  visible: boolean;
  onSelect: (theme: Theme) => void;
};

const options: Array<{ theme: Theme; label: string; icon: string }> = [
  { theme: "dark", label: "Dark Mode", icon: "◐" },
  { theme: "light", label: "Keep Light", icon: "☼" },
];

export function ThemePreferenceCard({ theme, visible, onSelect }: ThemePreferenceCardProps) {
  if (!visible) return null;

  return (
    <aside className="theme-preference-card" aria-labelledby="theme-preference-title" aria-describedby="theme-preference-question theme-preference-note">
      <h2 id="theme-preference-title">I care about your experience.</h2>
      <p id="theme-preference-question">Which feels better to you?</p>
      <div className="theme-preference-options" role="group" aria-label="Choose your appearance preference">
        {options.map(option => {
          const selected = theme === option.theme;
          return (
            <button
              className={selected ? "is-selected" : ""}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.theme)}
              key={option.theme}
            >
              <span className="theme-preference-icon" aria-hidden="true">{option.icon}</span>
              <span>{option.label}</span>
              <span className="theme-preference-check" aria-hidden="true">{selected ? "✓" : ""}</span>
            </button>
          );
        })}
      </div>
      <p className="theme-preference-note" id="theme-preference-note">Your preference will be remembered.</p>
    </aside>
  );
}

