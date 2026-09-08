"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

const distances = [
  "Alle afstanden...",
  "< 3 km",
  "< 5 km",
  "< 10 km",
  "< 15 km",
  "< 25 km",
  "< 50 km",
  "< 75 km",
] as const;

export function DistanceSlider() {
  const [postcode, setPostcode] = useState("");
  const [distance, setDistance] = useState<(typeof distances)[number]>(
    "Alle afstanden..."
  );
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div className="mb-6 font-[Arial,Helvetica,sans-serif]">
      <h2 className="mb-3 text-[13px] font-semibold text-[#222]">
        Afstand
      </h2>
      <div className="flex items-start gap-1">
        <input
          type="text"
          value={postcode}
          onChange={(event) => setPostcode(event.target.value.toUpperCase())}
          placeholder="Postcode"
          aria-label="Postcode"
          className="h-9 w-[88px] shrink-0 border border-[#d0d0d0] bg-white px-2 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
        />
        <div ref={rootRef} className="relative min-w-0 flex-1">
          <button
            type="button"
            aria-expanded={open}
            aria-haspopup="listbox"
            onClick={() => setOpen((value) => !value)}
            className={`flex h-9 w-full items-center justify-between gap-1 border bg-white px-2 text-left text-[13px] ${
              open
                ? "border-[#1d5fd1] text-[#1d5fd1]"
                : "border-[#d0d0d0] text-[#222]"
            }`}
          >
            <span className="min-w-0 truncate">{distance}</span>
            {open ? (
              <ChevronUp className="size-4 shrink-0" strokeWidth={2} />
            ) : (
              <ChevronDown className="size-4 shrink-0" strokeWidth={2} />
            )}
          </button>
          {open ? (
            <ul
              role="listbox"
              className="absolute top-full right-0 left-0 z-50 min-w-[10.5rem] border border-[#e6e6e6] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
            >
            {distances.map((option) => (
              <li key={option}>
                <button
                  type="button"
                  role="option"
                  aria-selected={option === distance}
                  onClick={() => {
                    setDistance(option);
                    setOpen(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-[#222] hover:bg-[#f5f7fa]"
                >
                  {option}
                  {option === distance ? (
                    <Check className="size-4 text-[#555]" strokeWidth={2} />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
