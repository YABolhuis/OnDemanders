import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { BerichtenLijst } from "@/components/berichten-lijst";

export default function BerichtenPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <div className="flex flex-1 bg-white">
        <aside className="min-h-[calc(100vh-88px)] w-[288px] shrink-0 border-r border-[#c4c1bb] bg-[#f9fafb] px-4 py-5 font-[Arial,Helvetica,sans-serif]">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6b6b6b]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              placeholder="Zoeken"
              aria-label="Zoeken in berichten"
              className="h-9 w-full rounded-[3px] border border-[#d0d0d0] bg-white pr-3 pl-8 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
            />
          </div>
          <BerichtenLijst />
        </aside>
        <main className="flex min-w-0 flex-1 items-center justify-center px-6 py-10">
          <p className="font-[Arial,Helvetica,sans-serif] text-[13px] text-[#222]">
            nieuwe berichten pagina
          </p>
        </main>
      </div>
    </AppShell>
  );
}
