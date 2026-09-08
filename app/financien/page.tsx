import { AppShell } from "@/components/app-shell";
import { FinancienPagina } from "@/components/financien-pagina";

export default function FinancienPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <FinancienPagina />
    </AppShell>
  );
}
