import type { ReactNode } from "react";
import { ChevronDown, Globe } from "lucide-react";

function FlagNl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 9 6" className={className} aria-hidden>
      <rect width="9" height="2" fill="#AE1C28" />
      <rect y="2" width="9" height="2" fill="#FFFFFF" />
      <rect y="4" width="9" height="2" fill="#21468B" />
    </svg>
  );
}

function FlagEn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <clipPath id="flag-en-s">
        <path d="M0 0h60v30H0z" />
      </clipPath>
      <clipPath id="flag-en-t">
        <path d="M30 15h30v15zv15H30zH0V15zV0h30z" />
      </clipPath>
      <g clipPath="url(#flag-en-s)">
        <path d="M0 0h60v30H0z" fill="#012169" />
        <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path
          d="m0 0 60 30m0-30L0 30"
          clipPath="url(#flag-en-t)"
          stroke="#C8102E"
          strokeWidth="4"
        />
        <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10" />
        <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

function FlagDe({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 5 3" className={className} aria-hidden>
      <rect width="5" height="1" fill="#000000" />
      <rect y="1" width="5" height="1" fill="#DD0000" />
      <rect y="2" width="5" height="1" fill="#FFCE00" />
    </svg>
  );
}

function FlagPl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 5" className={className} aria-hidden>
      <rect width="8" height="5" fill="#FFFFFF" />
      <rect y="2.5" width="8" height="2.5" fill="#DC143C" />
    </svg>
  );
}

function FlagEs({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 6 4" className={className} aria-hidden>
      <rect width="6" height="4" fill="#AA151B" />
      <rect y="1" width="6" height="2" fill="#F1BF00" />
    </svg>
  );
}

function RectFlag({ children }: { children: ReactNode }) {
  return (
    <span className="relative h-3.5 w-5 shrink-0 overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.15)]">
      <span className="absolute inset-0">{children}</span>
    </span>
  );
}

const dropdownLanguages = [
  { id: "en", label: "Engels", Flag: FlagEn },
  { id: "de", label: "Duits", Flag: FlagDe },
  { id: "pl", label: "Pools", Flag: FlagPl },
  { id: "es", label: "Spaans", Flag: FlagEs },
] as const;

export function LanguageMenu({
  variant = "bar",
}: {
  variant?: "bar" | "compact";
}) {
  const compact = variant === "compact";

  return (
    <details className="relative">
      <summary
        aria-label="Taal kiezen"
        className={
          compact
            ? "flex h-8 cursor-pointer list-none items-center gap-1 rounded-[3px] bg-[#eceff1] px-2 text-[#1a1a1a] outline-none hover:bg-[#e4e7ea] [&::-webkit-details-marker]:hidden"
            : "flex h-7 cursor-pointer list-none items-center gap-2 text-[13px] text-white outline-none [&::-webkit-details-marker]:hidden"
        }
      >
        {compact ? (
          <>
            <Globe className="size-4 text-[#1a1a1a]" strokeWidth={2} aria-hidden />
            <span className="text-[13px] font-medium">EN</span>
          </>
        ) : (
          <>
            <RectFlag>
              <FlagNl className="size-full" />
            </RectFlag>
            <span>Nederlands</span>
          </>
        )}
        <ChevronDown
          className={compact ? "size-3.5 text-[#1a1a1a]" : "size-3.5 text-white"}
          strokeWidth={2}
          aria-hidden
        />
      </summary>
      <ul className="absolute top-[calc(100%+4px)] right-0 z-50 min-w-[12rem] rounded-lg bg-white p-1 shadow-md ring-1 ring-black/10">
        {dropdownLanguages.map((item) => (
          <li key={item.id}>
            <span className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-[13px] text-[#222]">
              <RectFlag>
                <item.Flag className="size-full" />
              </RectFlag>
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </details>
  );
}
