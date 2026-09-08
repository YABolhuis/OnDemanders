import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { AppHeader } from "@/components/app-header";
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
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <AdvertentiePagina klus={klus} />
    </div>
  );
}
