import { AppShell } from "@/components/app-shell";
import { AbonementCreditsPagina } from "@/components/abonement-credits-pagina";

export default function AbonementCreditsPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#24333d]">
      <AbonementCreditsPagina />
    </AppShell>
  );
}
