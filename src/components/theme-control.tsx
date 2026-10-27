"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor } from "lucide-react";
import { themeKey, type ThemePreference } from "@/lib/theme";

function snapshot(): ThemePreference {
  const value = document.documentElement.dataset.themePreference;
  return value === "light" || value === "dark" ? value : "system";
}
function subscribe(callback: () => void) {
  window.addEventListener("workspace-theme-change", callback);
  return () => window.removeEventListener("workspace-theme-change", callback);
}
function apply(preference: ThemePreference) {
  document.documentElement.dataset.themePreference = preference;
  document.documentElement.dataset.theme =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;
  window.dispatchEvent(new Event("workspace-theme-change"));
}

export function ThemeControl() {
  const preference = useSyncExternalStore(
    subscribe,
    snapshot,
    () => "system" as ThemePreference,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      if (snapshot() === "system") apply("system");
    };
    media.addEventListener("change", update);
    update();
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <div className="theme-control">
      <Monitor size={16} aria-hidden="true" />
      <label className="sr-only" htmlFor="colour-theme">
        Colour theme
      </label>
      <select
        id="colour-theme"
        value={preference}
        onChange={(event) => {
          const next = event.target.value as ThemePreference;
          apply(next);
          try {
            localStorage.setItem(themeKey, next);
          } catch {
            /* Theme switching also works without storage. */
          }
        }}
      >
        <option value="system">System theme</option>
        <option value="light">Light theme</option>
        <option value="dark">Dark theme</option>
      </select>
    </div>
  );
}
