import { AppHeader } from "@/components/app-header";
import { AbonementCreditsPagina } from "@/components/abonement-credits-pagina";

export default function AbonementCreditsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#24333d]">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <AbonementCreditsPagina />
    </div>
  );
}
