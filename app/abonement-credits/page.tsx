import { AppShell } from "@/components/app-shell";
import { AccountSidebar } from "@/components/account-sidebar";
import { AbonementCreditsPagina } from "@/components/abonement-credits-pagina";

export default function AbonementCreditsPage() {
  return (
    <AppShell
      gebruiker="Y.A. Bolhuis"
      contentClassName="ingelogd-canvas"
      leftRail={<AccountSidebar />}
    >
      <AbonementCreditsPagina />
    </AppShell>
  );
}
