import { AppHeader } from "@/components/app-header";
import { BedrijfsgegevensPagina } from "@/components/bedrijfsgegevens-pagina";

export default function BedrijfsgegevensPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#24333d]">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <BedrijfsgegevensPagina />
    </div>
  );
}
