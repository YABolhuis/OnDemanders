"use client";

import { useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { BerichtenLijst } from "@/components/berichten-lijst";
import { BerichtenVenster } from "@/components/berichten-venster";
import { FilterSidebar } from "@/components/filter-sidebar";
import { gesprekken, gesprekOpId } from "@/lib/berichten";

export function BerichtenPagina() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [favorieten, setFavorieten] = useState(true);
  const [ongelezen, setOngelezen] = useState(false);
  const gesprek = selectedId ? gesprekOpId(selectedId) : null;

  const zichtbareGesprekken = useMemo(
    () =>
      gesprekken.filter((item) => {
        if (favorieten && !item.favoriet) {
          return false;
        }
        if (ongelezen && item.ongelezen === 0) {
          return false;
        }
        return true;
      }),
    [favorieten, ongelezen]
  );

  return (
    <div className="flex flex-1 bg-[#fbfbfb]">
      <FilterSidebar>
        <div className="relative">
          <Search
            className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6b6b6b]"
            strokeWidth={2}
            aria-hidden
          />
          <input
            type="search"
            placeholder="Zoeken"
            aria-label="Zoeken in berichten"
            className="sidebar-zoek h-9 w-full rounded-full border border-[#d0d0d0] bg-white pr-3 pl-8 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
          />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            aria-label="Filters"
            className="flex size-8 shrink-0 items-center justify-center text-[#5f6368] hover:text-[#1a1a1a]"
          >
            <SlidersHorizontal className="size-[18px]" strokeWidth={2} />
          </button>
          {favorieten ? (
            <button
              type="button"
              onClick={() => setFavorieten(false)}
              className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#e8eaed] px-3 text-[13px] text-[#1a1a1a]"
            >
              Favorieten
              <X className="size-3.5" strokeWidth={2} aria-hidden />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setFavorieten(true)}
              className="inline-flex h-8 items-center rounded-full border border-[#dadce0] bg-white px-3 text-[13px] text-[#1a1a1a]"
            >
              Favorieten
            </button>
          )}
          <button
            type="button"
            onClick={() => setOngelezen((value) => !value)}
            className={
              ongelezen
                ? "inline-flex h-8 items-center gap-1.5 rounded-full bg-[#e8eaed] px-3 text-[13px] text-[#1a1a1a]"
                : "inline-flex h-8 items-center rounded-full border border-[#dadce0] bg-white px-3 text-[13px] text-[#1a1a1a]"
            }
          >
            Ongelezen
            {ongelezen ? (
              <X className="size-3.5" strokeWidth={2} aria-hidden />
            ) : null}
          </button>
        </div>
        <BerichtenLijst
          gesprekken={zichtbareGesprekken}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </FilterSidebar>
      <main className="flex min-h-[calc(100vh-57px)] min-w-0 flex-1 items-stretch justify-center bg-[#f3f2f1] px-20 py-8">
        {gesprek ? (
          <div className="h-[calc(100vh-57px-4rem)] w-full">
            <BerichtenVenster key={gesprek.id} gesprek={gesprek} />
          </div>
        ) : (
          <p className="self-center text-[13px] text-[#667781]">
            Kies een gesprek in de lijst links.
          </p>
        )}
      </main>
    </div>
  );
}
