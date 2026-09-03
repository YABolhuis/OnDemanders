"use client";

import { useState } from "react";
import { Bell, Search, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const PRIMARY_SLOTS = [
  { id: "n1", width: "w-16" },
  { id: "n2", width: "w-12" },
  { id: "n3", width: "w-16" },
  { id: "n4", width: "w-24" },
  { id: "n5", width: "w-36" },
  { id: "n6", width: "w-20" },
];

const SECONDARY_SLOTS = [
  { id: "t1", width: "w-20" },
  { id: "t2", width: "w-20" },
  { id: "t3", width: "w-24" },
  { id: "t4", width: "w-16" },
  { id: "t5", width: "w-28" },
  { id: "t6", width: "w-24" },
];

export function TopBar() {
  const [activeTab, setActiveTab] = useState(SECONDARY_SLOTS[0].id);

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      <div className="flex h-14 items-center gap-6 border-b border-[#e6e6e6] px-4">
        <a
          href="/"
          aria-label="Home"
          className="flex h-7 w-[168px] shrink-0 items-center"
        >
          <span className="block h-full w-full rounded-sm" />
        </a>

        <nav
          aria-label="Hoofdmenu"
          className="hidden min-w-0 flex-1 items-center gap-7 lg:flex"
        >
          {PRIMARY_SLOTS.map((slot) => (
            <a
              key={slot.id}
              href="#"
              aria-label="Navigatie"
              className={cn("h-4 shrink-0 rounded-sm", slot.width)}
            />
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="relative hidden h-9 w-[260px] items-center rounded-full border border-[#d0d0d0] bg-white px-3 sm:flex">
            <Search
              className="size-4 shrink-0 text-[#6b6b6b]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              aria-label="Zoeken"
              className="h-full min-w-0 flex-1 bg-transparent px-2 text-sm outline-none"
            />
            <span
              aria-hidden
              className="h-5 w-12 shrink-0 rounded-md border border-[#e0e0e0] bg-[#f7f7f7]"
            />
          </div>

          <button
            type="button"
            aria-label="Account"
            className="size-8 shrink-0 overflow-hidden rounded-full"
          >
            <span
              className="block size-full"
              style={{
                background:
                  "conic-gradient(from 210deg, #5b8def, #7c5cbf, #3ecfcf, #5b8def)",
              }}
            />
          </button>

          <button
            type="button"
            aria-label="Meldingen"
            className="relative flex size-8 shrink-0 items-center justify-center text-[#1f4fa0]"
          >
            <Bell className="size-5" strokeWidth={1.75} aria-hidden />
            <span
              aria-hidden
              className="absolute top-0.5 right-0.5 size-2.5 rounded-full bg-[#e11d2e]"
            />
          </button>

          <Button
            aria-label="Actie"
            className="h-9 w-[76px] rounded-md border-0 bg-[#2f6fed] hover:bg-[#255ed4]"
          />
        </div>
      </div>

      <div className="flex h-11 items-center gap-1 border-b border-[#e6e6e6] px-3">
        <button
          type="button"
          aria-label="Zijbalk"
          className="mr-2 flex size-8 shrink-0 items-center justify-center text-[#4a4a4a]"
        >
          <PanelLeft className="size-[18px]" strokeWidth={1.75} aria-hidden />
        </button>

        <nav aria-label="Secties" className="flex h-full min-w-0 flex-1 items-stretch gap-1 overflow-x-auto">
          {SECONDARY_SLOTS.map((slot) => {
            const active = slot.id === activeTab;
            return (
              <button
                key={slot.id}
                type="button"
                aria-label="Tab"
                aria-current={active ? "page" : undefined}
                onClick={() => setActiveTab(slot.id)}
                className="relative flex h-full shrink-0 items-center px-3"
              >
                <span className={cn("block h-3.5 rounded-sm", slot.width)} />
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-2 bottom-0 h-[3px] rounded-t-sm bg-[#2f6fed]"
                  />
                ) : null}
              </button>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Actie"
          className="ml-auto hidden h-3.5 w-28 shrink-0 sm:block"
        />
      </div>
    </header>
  );
}
