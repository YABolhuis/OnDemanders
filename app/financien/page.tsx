import { AppHeader } from "@/components/app-header";
import { FinancienPagina } from "@/components/financien-pagina";

export default function FinancienPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <FinancienPagina />
    </div>
  );
}
