"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Building2, CircleUser, Heart, LogOut, Settings, User } from "lucide-react";

const TOKEN_SALDO = 25;

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
        className="flex h-9 items-center gap-2 rounded-md bg-white px-3 font-[Arial,Helvetica,sans-serif] text-[14px] font-medium text-[#222] hover:bg-[#fafafa]"
      >
        {gebruiker}
        <span className="relative inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]">
          <User className="size-3.5 text-[#6a6a6a]" strokeWidth={2} aria-hidden />
          <span
            className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-[#e31c3d] ring-2 ring-white"
            aria-hidden
          />
        </span>
      </button>
      {open ? (
        <div className="absolute top-[calc(100%+10px)] right-0 z-[60] w-[260px]">
          <span className="absolute -top-2 right-8 size-4 rotate-45 bg-white shadow-[-1px_-1px_2px_rgba(0,0,0,0.06)]" />
          <div className="relative flex min-h-[300px] flex-col rounded-sm bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.16)]">
            <div
              className="mb-3 flex items-center gap-1.5 px-1 font-[Arial,Helvetica,sans-serif] text-[13px] text-[#666]"
              aria-label={`${TOKEN_SALDO.toLocaleString("nl-NL")} credits`}
            >
              <Image
                src="/token-logo.png"
                alt=""
                width={16}
                height={16}
                className="size-4 shrink-0"
              />
              <span className="tracking-tight">
                {`${TOKEN_SALDO.toLocaleString("nl-NL")}\u2009credits`}
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/mijn-profiel"
                className="flex h-10 w-full items-center gap-2 rounded-md bg-[#d7e8fb] px-3 text-left font-[Arial,Helvetica,sans-serif] text-[13px] font-medium text-[#1d5fd1] hover:bg-[#c9dff8]"
              >
                <CircleUser className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Mijn profiel
              </a>
              <a
                href="/profiel"
                className="flex h-10 w-full items-center gap-2 rounded-md bg-[#d7e8fb] px-3 text-left font-[Arial,Helvetica,sans-serif] text-[13px] font-medium text-[#1d5fd1] hover:bg-[#c9dff8]"
              >
                <Settings className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Account instellingen
              </a>
              <a
                href="/bedrijfsgegevens"
                className="flex h-10 w-full items-center gap-2 rounded-md bg-[#d7e8fb] px-3 text-left font-[Arial,Helvetica,sans-serif] text-[13px] font-medium text-[#1d5fd1] hover:bg-[#c9dff8]"
              >
                <Building2 className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Bedrijfsgegevens
              </a>
              <button
                type="button"
                className="flex h-10 w-full items-center gap-2 rounded-md bg-[#d7e8fb] px-3 text-left font-[Arial,Helvetica,sans-serif] text-[13px] font-medium text-[#1d5fd1] hover:bg-[#c9dff8]"
              >
                <Heart className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Favoriete opdrachten
              </button>
            </div>
            <div className="flex-1" />
            <a
              href="/"
              className="flex h-10 items-center justify-center gap-2 rounded-[3px] bg-[#0055d4] font-[Arial,Helvetica,sans-serif] text-[14px] font-semibold text-white hover:bg-[#004bbd]"
            >
              <LogOut className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              Uitloggen
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
