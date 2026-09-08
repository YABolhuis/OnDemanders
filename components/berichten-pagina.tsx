"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BerichtenLijst } from "@/components/berichten-lijst";
import { BerichtenVenster } from "@/components/berichten-venster";
import { FilterSidebar } from "@/components/filter-sidebar";
import { gesprekken, gesprekOpId } from "@/lib/berichten";

export function BerichtenPagina() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const gesprek = selectedId ? gesprekOpId(selectedId) : null;

  return (
    <div className="flex flex-1 bg-[#f4f6f8]">
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
        <BerichtenLijst
          gesprekken={gesprekken}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      </FilterSidebar>
      <main className="flex min-h-[calc(100vh-57px)] min-w-0 flex-1 items-stretch justify-center bg-[#f4f6f8] px-20 py-8">
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
