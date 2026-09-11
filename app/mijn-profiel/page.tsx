import { AppShell } from "@/components/app-shell";
import { AccountSidebar } from "@/components/account-sidebar";
import { MijnProfielPagina } from "@/components/mijn-profiel-pagina";

export default function MijnProfielPage() {
  return (
    <AppShell
      gebruiker="Y.A. Bolhuis"
      contentClassName="bg-[#fbfbfb]"
      leftRail={<AccountSidebar />}
    >
      <MijnProfielPagina />
    </AppShell>
  );
}
