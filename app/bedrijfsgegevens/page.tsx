import { AppShell } from "@/components/app-shell";
import { BedrijfsgegevensPagina } from "@/components/bedrijfsgegevens-pagina";

export default function BedrijfsgegevensPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="ingelogd-canvas">
      <BedrijfsgegevensPagina />
    </AppShell>
  );
}
