import { notFound } from "next/navigation";
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
              <DistanceSlider />
              <VakgebiedList />
            </>
          ) : null}
        </FilterSidebar>
        <main className="min-w-0 flex-1 bg-[#f4f6f8]">
          <KlusLijst items={items} vakSlug={vak.slug} />
        </main>
      </div>
    </AppShell>
  );
}
