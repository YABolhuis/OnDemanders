import { Search } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DistanceSlider } from "@/components/distance-slider";
import { VakgebiedList } from "@/components/vakgebied-list";
import { KlusLijst } from "@/components/klus-lijst";

export default function KlussenPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <div className="flex flex-1">
        <aside className="min-h-[calc(100vh-88px)] w-[280px] shrink-0 border-r border-[#e6e6e6] bg-[#fbfbfb] px-4 py-5">
          <div className="font-[Arial,Helvetica,sans-serif]">
            <div className="relative mb-6">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6b6b6b]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                placeholder="Zoeken"
                aria-label="Zoeken"
                className="h-9 w-full border border-[#d0d0d0] bg-white pr-3 pl-8 text-[14px] text-[#333] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
              />
            </div>
            <DistanceSlider />
            <VakgebiedList />
          </div>
        </aside>
        <main className="min-w-0 flex-1 bg-white px-6 py-5">
          <KlusLijst />
        </main>
      </div>
    </AppShell>
  );
}
