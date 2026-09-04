import { AppHeader } from "@/components/app-header";
import { AgendaSidebar } from "@/components/agenda-sidebar";

export default function AgendaPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <div className="flex flex-1">
        <AgendaSidebar />
        <main className="flex-1 bg-white" />
      </div>
    </div>
  );
}
