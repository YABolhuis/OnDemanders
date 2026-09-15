import { AppShell } from "@/components/app-shell";
import { BerichtenPagina } from "@/components/berichten-pagina";
import { LANDING_SHELL } from "@/lib/site-width";

export default function BerichtenPage() {
  return (
    <AppShell
      gebruiker="Y.A. Bolhuis"
      contentClassName="bg-[#fbfbfb]"
      insetClassName={LANDING_SHELL}
    >
      <div className={`${LANDING_SHELL} flex min-h-0 flex-1 flex-col`}>
        <BerichtenPagina />
      </div>
    </AppShell>
  );
}
