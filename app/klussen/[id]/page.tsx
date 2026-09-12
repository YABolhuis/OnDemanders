import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AdvertentiePagina } from "@/components/advertentie-pagina";
import { getKlus, klussen } from "@/lib/klussen";

export function generateStaticParams() {
  return klussen.map((klus) => ({ id: klus.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const klus = getKlus(id);
  return {
    title: klus ? klus.title : "Advertentie",
  };
}

export default async function AdvertentieRoute({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const klus = getKlus(id);
  if (!klus) {
    notFound();
  }

  return (
    <AppShell gebruiker="Y.A. Bolhuis" spanRightRail>
      <AdvertentiePagina klus={klus} />
    </AppShell>
  );
}
