import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DistanceSlider } from "@/components/distance-slider";
import { FilterSidebar } from "@/components/filter-sidebar";
import { VakgebiedList } from "@/components/vakgebied-list";
import { KlusLijst } from "@/components/klus-lijst";

export default function KlussenPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <div className="flex flex-1 items-start bg-white">
        <FilterSidebar>
          <div className="relative mb-6">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6b6b6b]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="Zoeken"
              aria-label="Zoeken"
              className="h-9 w-full rounded-[10px] border border-[#d0d0d0] bg-white pr-3 pl-8 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
            />
          </div>
          <DistanceSlider />
          <VakgebiedList />
        </FilterSidebar>
        <main className="min-w-0 flex-1 bg-white px-6 py-5">
          <KlusLijst />
        </main>
      </div>
    </AppShell>
  );
}
