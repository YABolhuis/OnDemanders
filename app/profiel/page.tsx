import { AppShell } from "@/components/app-shell";
import { AccountSidebar } from "@/components/account-sidebar";
import { ProfielInstellingen } from "@/components/profiel-instellingen";

export default function ProfielPage() {
  return (
    <AppShell
      gebruiker="Y.A. Bolhuis"
      contentClassName="ingelogd-canvas"
      leftRail={<AccountSidebar />}
    >
      <ProfielInstellingen />
    </AppShell>
  );
}
