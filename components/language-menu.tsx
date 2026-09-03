"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

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
  const uid = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 60 30" className={className} aria-hidden>
      <clipPath id={`${uid}-s`}>
        <path d="M0 0h60v30H0z" />
      </clipPath>
      <clipPath id={`${uid}-t`}>
        <path d="M30 15h30v15zv15H30zH0V15zV0h30z" />
      </clipPath>
      <g clipPath={`url(#${uid}-s)`}>
        <path d="M0 0h60v30H0z" fill="#012169" />
        <path d="m0 0 60 30m0-30L0 30" stroke="#fff" strokeWidth="6" />
        <path
          d="m0 0 60 30m0-30L0 30"
          clipPath={`url(#${uid}-t)`}
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

function CircleFlag({ children }: { children: ReactNode }) {
  return (
    <span className="relative size-5 shrink-0 overflow-hidden rounded-full shadow-[0_0_0_1px_rgba(0,0,0,0.12)]">
      <span className="absolute inset-[-35%]">{children}</span>
    </span>
  );
}

const languages = [
  { id: "nl", label: "Nederlands", Flag: FlagNl },
  { id: "en", label: "English", Flag: FlagEn },
  { id: "de", label: "Deutsch", Flag: FlagDe },
  { id: "pl", label: "Polski", Flag: FlagPl },
  { id: "es", label: "Español", Flag: FlagEs },
] as const;

const dropdownLanguages = languages.filter((item) => item.id !== "nl");

export function LanguageMenu() {
  const [language, setLanguage] = useState<(typeof languages)[number]["id"]>("nl");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const current = languages.find((item) => item.id === language) ?? languages[0];

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        aria-label="Taal"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((value) => !value)}
        className="flex h-7 items-center gap-2 bg-transparent py-0 font-[Arial,Helvetica,sans-serif] text-[13px] text-white outline-none"
      >
        <CircleFlag>
          <current.Flag className="size-full" />
        </CircleFlag>
        <span>{current.label}</span>
        <ChevronDown className="size-3.5 text-white" strokeWidth={2} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute top-[calc(100%+4px)] right-0 z-50 min-w-[12rem] rounded-lg bg-white p-1 shadow-md ring-1 ring-black/10"
        >
          {dropdownLanguages.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                role="option"
                aria-selected={item.id === language}
                onClick={() => {
                  setLanguage(item.id);
                  setOpen(false);
                }}
                className="flex w-full items-center gap-2.5 rounded-md px-2 py-1.5 text-left font-[Arial,Helvetica,sans-serif] text-[13px] text-[#222] hover:bg-[#f4f4f4]"
              >
                <CircleFlag>
                  <item.Flag className="size-full" />
                </CircleFlag>
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
