import { AppShell } from "@/components/app-shell";
import { AgendaSidebar } from "@/components/agenda-sidebar";
import { AgendaWeekView } from "@/components/agenda-week-view";

export default function AgendaPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <div className="flex min-h-0 flex-1">
        <AgendaSidebar />
        <AgendaWeekView />
      </div>
    </AppShell>
  );
}
