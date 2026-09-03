"use client";

import { useEffect, useRef, useState } from "react";
import { Menu } from "lucide-react";

export function AccountMenu({ gebruiker }: { gebruiker: string }) {
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
        aria-label="Accountmenu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
        className="flex h-9 items-center gap-3 rounded-md border border-[#d8d8d8] bg-white px-4 font-[Arial,Helvetica,sans-serif] text-[14px] font-semibold text-[#222] hover:bg-[#fafafa]"
      >
        {gebruiker}
        <Menu className="size-4" strokeWidth={2} aria-hidden />
      </button>
      {open ? (
        <div className="absolute top-[calc(100%+10px)] right-0 z-50 w-[260px]">
          <span className="absolute -top-2 right-8 size-4 rotate-45 bg-white shadow-[-1px_-1px_2px_rgba(0,0,0,0.06)]" />
          <div className="relative flex h-[220px] flex-col rounded-sm bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.16)]">
            <div className="flex-1" />
            <a
              href="/"
              className="flex h-10 items-center justify-center rounded-[3px] bg-[#0055d4] font-[Arial,Helvetica,sans-serif] text-[14px] font-semibold text-white hover:bg-[#004bbd]"
            >
              Uitloggen
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
