import { AppShell } from "@/components/app-shell";
import { KlusLijst } from "@/components/klus-lijst";
import { getVakgebied, klussenVoorVakgebied } from "@/lib/vakgebieden";

export default function KlussenPage() {
  const vak = getVakgebied("schilder");
  const items = klussenVoorVakgebied(vak?.slug ?? "schilder");

  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#fbfbfb]" spanRightRail>
      <main className="min-w-0 flex-1 bg-[#fbfbfb]">
        <KlusLijst items={items} vakSlug={vak?.slug ?? "schilder"} />
      </main>
    </AppShell>
  );
}
