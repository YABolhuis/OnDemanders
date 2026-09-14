import type { ReactNode } from "react";
import Link from "next/link";
import { LANDING_SHELL } from "@/lib/site-width";

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
      className="flex size-7 items-center justify-center rounded-full border border-[#d0d0d0] text-current hover:border-[#e8e8e6]"
    >
      {children}
    </a>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M16.37 12.64c.03 3.24 2.84 4.32 2.87 4.33-.02.07-.45 1.54-1.47 3.05-.89 1.31-1.81 2.61-3.26 2.64-1.43.03-1.89-.85-3.52-.85-1.64 0-2.15.82-3.5.88-1.4.06-2.47-1.41-3.37-2.71C2.25 17.3.86 13.27 2.76 10.55c.94-1.35 2.63-2.21 4.46-2.23 1.39-.03 2.71.94 3.52.94.81 0 2.33-1.16 3.93-.99.67.03 2.55.27 3.76 2.04-.1.06-2.24 1.31-2.06 3.33M14.5 6.4c.75-.91 1.26-2.17 1.12-3.43-1.08.04-2.39.72-3.16 1.63-.7.81-1.31 2.11-1.15 3.35 1.21.09 2.45-.62 3.19-1.55" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-3.5" fill="currentColor" aria-hidden>
      <path d="M17.6 9.48 19.1 7c.16-.27.07-.62-.2-.78s-.62-.07-.78.2l-1.57 2.6A10.9 10.9 0 0 0 12 7.5c-1.64 0-3.18.4-4.55 1.1L5.88 6.42c-.16-.27-.51-.36-.78-.2s-.36.51-.2.78L6.4 9.48C4.37 11.07 3 13.64 3 16.5v.5h18v-.5c0-2.86-1.37-5.43-3.4-7.02M8.25 14.25a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5m7.5 0a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5" />
    </svg>
  );
}

export function SiteFooter({
  showEdge = true,
  inset = false,
}: {
  showEdge?: boolean;
  inset?: boolean;
}) {
  return (
    <footer
      className={`site-rail mt-auto lg:col-span-2 ${
        inset
          ? "bg-[#171717] text-[#9b9b97]"
          : "bg-[#fbfbfb] text-[#555]"
      } ${showEdge ? "border-t border-[#d0d0d0]" : ""}`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-2 py-2.5 ${
          inset ? LANDING_SHELL : "px-14"
        }`}
      >
        <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px]">
          <span>© 2026 Optisend</span>
          <Link href="/privacy" className="hover:text-[#1a1a1a] hover:underline">
            Privacy Policy
          </Link>
          <Link
            href="/voorwaarden"
            className="hover:text-[#1a1a1a] hover:underline"
          >
            Terms and Conditions
          </Link>
        </p>
        <div className="flex items-center gap-2.5">
          <span className="text-[13px] text-[#222]">Mobile app</span>
          <CircleIcon href="https://apps.apple.com/" label="App Store">
            <AppleIcon />
          </CircleIcon>
          <CircleIcon href="https://play.google.com/store" label="Google Play">
            <AndroidIcon />
          </CircleIcon>
        </div>
      </div>
    </footer>
  );
}
