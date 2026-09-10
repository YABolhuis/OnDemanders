import { notFound } from "next/navigation";
import { AppShell } from "@/components/app-shell";
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
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#fbfbfb]">
      <main className="min-w-0 flex-1 bg-[#fbfbfb]">
        <KlusLijst items={items} vakSlug={vak.slug} />
      </main>
    </AppShell>
  );
}
