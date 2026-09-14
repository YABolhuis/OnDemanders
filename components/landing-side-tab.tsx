import { LanguageMenu } from "@/components/language-menu";
import { LandingThemeToggle } from "@/components/landing-theme-toggle";

export function LandingSideTab() {
  return (
    <div className="fixed top-28 right-0 z-50 flex items-center gap-0.5 rounded-l-xl border border-r-0 border-white/15 bg-[#1c1c1c] px-1 py-1 shadow-[0_8px_24px_rgba(0,0,0,0.28)]">
      <LanguageMenu variant="icon" />
      <LandingThemeToggle />
    </div>
  );
}
