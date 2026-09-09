import { notFound } from "next/navigation";
import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DistanceSlider } from "@/components/distance-slider";
import { FilterSidebar } from "@/components/filter-sidebar";
import { VakgebiedList } from "@/components/vakgebied-list";
import { KlusLijst } from "@/components/klus-lijst";
import {
  getVakgebied,
  klussenVoorVakgebied,
  vakgebieden,
} from "@/lib/vakgebieden";

export function generateStaticParams() {
  return vakgebieden.map((vak) => ({ vakgebied: vak.slug }));
}

export default async function KlussenVakPage({
  params,
}: {
  params: Promise<{ vakgebied: string }>;
}) {
  const { vakgebied } = await params;
  const vak = getVakgebied(vakgebied);
  if (!vak) {
    notFound();
  }

  const items = klussenVoorVakgebied(vak.slug);

  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#f4f6f8]">
      <div className="flex flex-1 bg-[#f4f6f8]">
        <FilterSidebar>
          {vak.heeftFilters ? (
            <>
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
                  className="sidebar-zoek h-9 w-full rounded-full border border-[#d0d0d0] bg-white pr-3 pl-8 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
                />
              </div>
              <DistanceSlider />
              <VakgebiedList />
            </>
          ) : null}
        </FilterSidebar>
        <main className="min-w-0 flex-1 bg-[#f4f6f8]">
          <KlusLijst items={items} />
        </main>
      </div>
    </AppShell>
  );
}
