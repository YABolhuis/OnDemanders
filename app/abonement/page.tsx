import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import { AbonnementKopenPagina } from "@/components/abonnement-kopen-pagina";

export const metadata: Metadata = {
  title: "Freelancer Plus",
  description: "Koop een Optisend-abonnement",
};

export default function AbonnementPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#f4f6f8]">
      <AbonnementKopenPagina />
    </AppShell>
  );
}
