import type { ReactNode } from "react";
import Link from "next/link";

function CircleIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-10 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:border-white hover:bg-white/10"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M16.37 12.64c.03 3.24 2.84 4.32 2.87 4.33-.02.07-.45 1.54-1.47 3.05-.89 1.31-1.81 2.61-3.26 2.64-1.43.03-1.89-.85-3.52-.85-1.64 0-2.15.82-3.5.88-1.4.06-2.47-1.41-3.37-2.71C2.25 17.3.86 13.27 2.76 10.55c.94-1.35 2.63-2.21 4.46-2.23 1.39-.03 2.71.94 3.52.94.81 0 2.33-1.16 3.93-.99.67.03 2.55.27 3.76 2.04-.1.06-2.24 1.31-2.06 3.33M14.5 6.4c.75-.91 1.26-2.17 1.12-3.43-1.08.04-2.39.72-3.16 1.63-.7.81-1.31 2.11-1.15 3.35 1.21.09 2.45-.62 3.19-1.55" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
      <path d="M17.6 9.48 19.1 7c.16-.27.07-.62-.2-.78s-.62-.07-.78.2l-1.57 2.6A10.9 10.9 0 0 0 12 7.5c-1.64 0-3.18.4-4.55 1.1L5.88 6.42c-.16-.27-.51-.36-.78-.2s-.36.51-.2.78L6.4 9.48C4.37 11.07 3 13.64 3 16.5v.5h18v-.5c0-2.86-1.37-5.43-3.4-7.02M8.25 14.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5m7.5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[#001e00] text-white">
      <div className="flex flex-col gap-4 px-10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <CircleIcon href="https://www.instagram.com/" label="Instagram">
          <InstagramIcon />
        </CircleIcon>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-medium">Mobile app</span>
          <CircleIcon href="https://apps.apple.com/" label="App Store">
            <AppleIcon />
          </CircleIcon>
          <CircleIcon
            href="https://play.google.com/store"
            label="Google Play"
          >
            <AndroidIcon />
          </CircleIcon>
        </div>
      </div>
      <div className="border-t border-white/15 px-10 py-4">
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/80">
          <span>© 2026 Optisend</span>
          <Link href="/privacy" className="hover:text-white hover:underline">
            Privacy Policy
          </Link>
          <Link href="/voorwaarden" className="hover:text-white hover:underline">
            Terms and Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
}
