"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export function LandingThemeToggle() {
  const { theme, setTheme } = useTheme();
  const donker = theme === "donker";

  return (
    <button
      type="button"
      aria-label={donker ? "Donker thema, schakel naar licht" : "Licht thema, schakel naar donker"}
      onClick={() => setTheme(donker ? "licht" : "donker")}
      className="landing-pill inline-flex size-8 shrink-0 items-center justify-center text-[#171717] hover:bg-[#f5f5f5]"
    >
      {donker ? (
        <Moon className="size-5" strokeWidth={1.75} aria-hidden />
      ) : (
        <Sun className="size-5" strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
