import { AppShell } from "@/components/app-shell";
import { FilterSidebar } from "@/components/filter-sidebar";

export default function BerichtenPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <div className="flex flex-1 bg-white">
        <FilterSidebar>
          <div className="min-h-[calc(100vh-8.5rem)]" aria-hidden />
        </FilterSidebar>
        <main className="flex min-w-0 flex-1 items-center justify-center px-6 py-10">
          <p className="font-[Arial,Helvetica,sans-serif] text-[13px] text-[#222]">
            nieuwe berichten pagina
          </p>
        </main>
      </div>
    </AppShell>
  );
}
