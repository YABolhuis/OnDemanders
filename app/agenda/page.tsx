import { AppHeader } from "@/components/app-header";
import { AgendaSidebar } from "@/components/agenda-sidebar";
import { AgendaToolbar } from "@/components/agenda-toolbar";

export default function AgendaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <div className="flex flex-1">
        <AgendaSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AgendaToolbar />
          <main className="flex-1 bg-white" />
        </div>
      </div>
    </div>
  );
}
