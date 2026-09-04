import { AppHeader } from "@/components/app-header";
import { AgendaSidebar } from "@/components/agenda-sidebar";
import { AgendaWeekView } from "@/components/agenda-week-view";

export default function AgendaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <div className="flex min-h-0 flex-1">
        <AgendaSidebar />
        <AgendaWeekView />
      </div>
    </div>
  );
}
