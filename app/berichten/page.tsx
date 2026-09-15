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
      <div className={`${LANDING_SHELL} flex h-full min-h-0 flex-1 flex-col py-6`}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-[16px] border border-[#2e2e2e] bg-[#1c1c1c] p-5">
          <div className="min-h-0 min-w-0 flex-1 overflow-hidden rounded-lg">
            <BerichtenPagina />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
