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
import { useTheme } from "@/components/theme-provider";
import { useCredits } from "@/components/credits-provider";

const itemClass =
  "flex h-10 w-full items-center gap-3 px-4 text-left text-[13px] text-[#222] hover:bg-[#f5f5f5]";

export function AccountMenu({ gebruiker }: { gebruiker: string }) {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { saldo } = useCredits();
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
        className="flex items-center gap-2.5 rounded-[3px] bg-transparent py-0.5 pr-0.5 pl-1 hover:bg-[#f5f5f5]"
      >
        <span className="header-account-type hidden text-right sm:block">
          <span className="block text-[12px] font-bold leading-[15px] text-[#1c1e21]">
            Yan Bolhuis
          </span>
          <span className="block text-[11px] font-normal leading-[14px] text-[#65676b]">
            bolhuisyan@gmail.com
          </span>
        </span>
        <span className="relative inline-flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#d9d9d9]">
          <User className="size-4 text-[#6a6a6a]" strokeWidth={2} aria-hidden />
        </span>
        {open ? (
          <ChevronUp className="size-4 shrink-0 text-[#333]" strokeWidth={2} aria-hidden />
        ) : (
          <ChevronDown className="size-4 shrink-0 text-[#333]" strokeWidth={2} aria-hidden />
        )}
      </button>
      {open ? (
        <div className="absolute top-[calc(100%+8px)] right-0 z-[60] w-[280px]">
          <div className="relative overflow-hidden rounded-md bg-white shadow-[0_4px_18px_rgba(0,0,0,0.16)]">
            <div className="px-4 py-3">
              <div className="flex items-center gap-3">
                <span className="relative inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]">
                  <User className="size-5 text-[#6a6a6a]" strokeWidth={2} aria-hidden />
                  <span
                    className={`absolute -top-0.5 -right-0.5 size-2.5 rounded-full ring-2 ring-white ${
                      online ? "bg-[#2d9b4f]" : "bg-[#e31c3d]"
                    }`}
                    aria-hidden
                  />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[14px] font-semibold text-[#222]">
                    Yan Bolhuis
                  </p>
                  <p className=" text-[12px] text-[#777]">
                    Ondernemer
                  </p>
                </div>
                <div
                  className="flex shrink-0 items-center gap-1 self-start pt-0.5 text-[13px] text-[#666]"
                  aria-label={`${saldo.toLocaleString("nl-NL")} credits`}
                >
                  <Image
                    src="/token-logo.png"
                    alt=""
                    width={12}
                    height={12}
                    className="token-logo size-3 shrink-0 [filter:brightness(0)_invert(40%)]"
                  />
                  <span className="tracking-tight">
                    {`${saldo.toLocaleString("nl-NL")}\u2009credits`}
                  </span>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-[13px] text-[#222]">
                <span>Online voor berichten</span>
                <Switch
                  size="xs"
                  checked={online}
                  onCheckedChange={setOnline}
                  className="[&_svg]:hidden data-checked:bg-[#2d9b4f] data-unchecked:bg-[#595959]"
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
                    className={`flex h-8 w-full items-center text-left text-[13px] ${
                      theme === "licht" ? "font-medium text-[#1d5fd1]" : "text-[#333] hover:text-[#1d5fd1]"
                    }`}
                  >
                    Licht
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme("donker")}
                    className={`flex h-8 w-full items-center text-left text-[13px] ${
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
