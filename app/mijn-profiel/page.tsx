import { AppShell } from "@/components/app-shell";
import { MijnProfielPagina } from "@/components/mijn-profiel-pagina";

export default function MijnProfielPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#24333d]">
      <MijnProfielPagina />
    </AppShell>
  );
}
