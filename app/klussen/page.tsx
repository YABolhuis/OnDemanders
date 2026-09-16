import { AppShell } from "@/components/app-shell";
import { KlusLijst } from "@/components/klus-lijst";
import { getVakgebied, klussenVoorVakgebied } from "@/lib/vakgebieden";

export default function KlussenPage() {
  const vak = getVakgebied("schilder");
  const items = klussenVoorVakgebied(vak?.slug ?? "schilder");

  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="ingelogd-canvas" centered>
      <main className="ingelogd-canvas min-w-0 flex-1">
        <KlusLijst items={items} vakSlug={vak?.slug ?? "schilder"} />
      </main>
    </AppShell>
  );
}
