"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Building2, Database, Heart, Menu, Settings } from "lucide-react";

const TOKEN_SALDO = 1250;

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
        <div className="absolute top-[calc(100%+10px)] right-0 z-[60] w-[260px]">
          <span className="absolute -top-2 right-8 size-4 rotate-45 bg-white shadow-[-1px_-1px_2px_rgba(0,0,0,0.06)]" />
          <div className="relative flex min-h-[260px] flex-col rounded-sm bg-white p-4 shadow-[0_4px_18px_rgba(0,0,0,0.16)]">
            <div
              className="mb-3 flex items-center gap-2.5 px-1 font-[Arial,Helvetica,sans-serif]"
              aria-label={`${TOKEN_SALDO.toLocaleString("nl-NL")} tokens`}
            >
              <Image
                src="/token-logo.png"
                alt=""
                width={28}
                height={28}
                className="size-7 shrink-0"
              />
              <span className="text-[16px] font-semibold text-[#222]">
                {TOKEN_SALDO.toLocaleString("nl-NL")}
              </span>
              <span className="text-[13px] text-[#666]">tokens</span>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="/profiel"
                className="flex h-10 w-full items-center gap-2 rounded-md bg-[#d7e8fb] px-3 text-left font-[Arial,Helvetica,sans-serif] text-[13px] font-medium text-[#1d5fd1] hover:bg-[#c9dff8]"
              >
                <span className="relative size-5 shrink-0">
                  <Database className="size-5" strokeWidth={2} aria-hidden />
                  <Settings
                    className="absolute -right-0.5 -bottom-0.5 size-2.5 fill-[#d7e8fb]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </span>
                profiel & instellingen
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
