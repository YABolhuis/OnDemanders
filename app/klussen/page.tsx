import { Search } from "lucide-react";
import { AppHeader } from "@/components/app-header";
import { DistanceSlider } from "@/components/distance-slider";
import { VakgebiedList } from "@/components/vakgebied-list";

export default function KlussenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
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
        <main className="flex-1 bg-white" />
      </div>
    </div>
  );
}
