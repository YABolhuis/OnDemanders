import { AppHeader } from "@/components/app-header";
import { MijnProfielPagina } from "@/components/mijn-profiel-pagina";

export default function MijnProfielPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#24333d]">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <MijnProfielPagina />
    </div>
  );
}
