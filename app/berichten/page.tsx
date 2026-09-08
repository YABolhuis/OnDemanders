import { AppShell } from "@/components/app-shell";
import { BerichtenPagina } from "@/components/berichten-pagina";

export default function BerichtenPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#f4f6f8]">
      <BerichtenPagina />
    </AppShell>
  );
}
