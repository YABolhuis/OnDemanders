import { AppShell } from "@/components/app-shell";
import { AbonementCreditsPagina } from "@/components/abonement-credits-pagina";

export default function AbonementCreditsPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#fbfbfb]">
      <AbonementCreditsPagina />
    </AppShell>
  );
}
