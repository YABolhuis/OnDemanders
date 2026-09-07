"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  Building2,
  ChevronDown,
  ChevronUp,
  CircleUser,
  CreditCard,
  Heart,
  LogOut,
  Moon,
  Settings,
  Sun,
  User,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

const TOKEN_SALDO = 25;

const itemClass =
  "flex h-10 w-full items-center gap-3 px-4 text-left font-[Arial,Helvetica,sans-serif] text-[13px] text-[#222] hover:bg-[#f5f5f5]";

export function AccountMenu({ gebruiker }: { gebruiker: string }) {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [theme, setTheme] = useState<"licht" | "donker">("licht");
  const [online, setOnline] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      setThemeOpen(false);
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
        <div className="absolute top-[calc(100%+10px)] right-0 z-[60] w-[280px]">
          <span className="absolute -top-2 right-8 size-4 rotate-45 bg-white shadow-[-1px_-1px_2px_rgba(0,0,0,0.06)]" />
          <div className="relative overflow-hidden rounded-md bg-white shadow-[0_4px_18px_rgba(0,0,0,0.16)]">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]">
                  <User className="size-5 text-[#6a6a6a]" strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="truncate font-[Arial,Helvetica,sans-serif] text-[14px] font-semibold text-[#222]">
                    Yan Bolhuis
                  </p>
                  <p className="font-[Arial,Helvetica,sans-serif] text-[12px] text-[#777]">
                    Ondernemer
                  </p>
                </div>
              </div>
              <div
                className="mt-3 flex items-center gap-1.5 font-[Arial,Helvetica,sans-serif] text-[13px] text-[#666]"
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
              <div className="mt-3 flex items-center justify-between gap-3 font-[Arial,Helvetica,sans-serif] text-[13px] text-[#222]">
                <span>Online voor berichten</span>
                <Switch
                  size="sm"
                  checked={online}
                  onCheckedChange={setOnline}
                  className="data-checked:bg-[#222] data-unchecked:bg-[#d0d0d0]"
                  aria-label="Online voor berichten"
                />
              </div>
            </div>

            <hr className="border-0 border-t border-[#e6e6e6]" />

            <div className="py-1">
              <a href="/mijn-profiel" className={itemClass}>
                <CircleUser className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Mijn profiel
              </a>
              <button type="button" className={itemClass}>
                <Heart className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Favoriete opdrachten
              </button>
            </div>

            <hr className="border-0 border-t border-[#e6e6e6]" />

            <div className="py-1">
              <a href="/bedrijfsgegevens" className={itemClass}>
                <Building2 className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Bedrijfsgegevens
              </a>
              <a href="/abonement-credits" className={itemClass}>
                <CreditCard className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Abonement & credits
              </a>
              <button
                type="button"
                aria-expanded={themeOpen}
                onClick={() => setThemeOpen((value) => !value)}
                className={itemClass}
              >
                {theme === "licht" ? (
                  <Sun className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                ) : (
                  <Moon className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                )}
                <span className="min-w-0 flex-1">
                  Thema: {theme === "licht" ? "Licht" : "Donker"}
                </span>
                {themeOpen ? (
                  <ChevronUp className="size-4 shrink-0 text-[#555]" strokeWidth={2} aria-hidden />
                ) : (
                  <ChevronDown className="size-4 shrink-0 text-[#555]" strokeWidth={2} aria-hidden />
                )}
              </button>
              {themeOpen ? (
                <div className="pb-1 pl-11">
                  <button
                    type="button"
                    onClick={() => setTheme("licht")}
                    className={`flex h-8 w-full items-center text-left font-[Arial,Helvetica,sans-serif] text-[13px] ${
                      theme === "licht" ? "font-medium text-[#1d5fd1]" : "text-[#333] hover:text-[#1d5fd1]"
                    }`}
                  >
                    Licht
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("donker")}
                    className={`flex h-8 w-full items-center text-left font-[Arial,Helvetica,sans-serif] text-[13px] ${
                      theme === "donker" ? "font-medium text-[#1d5fd1]" : "text-[#333] hover:text-[#1d5fd1]"
                    }`}
                  >
                    Donker
                  </button>
                </div>
              ) : null}
              <a href="/profiel" className={itemClass}>
                <Settings className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Account instellingen
              </a>
            </div>

            <hr className="border-0 border-t border-[#e6e6e6]" />

            <div className="py-1">
              <a href="/" className={itemClass}>
                <LogOut className="size-4 shrink-0" strokeWidth={2} aria-hidden />
                Uitloggen
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
