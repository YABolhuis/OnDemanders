import Image from "next/image";
import { Menu } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { DistanceSlider } from "@/components/distance-slider";

export default function DashboardPage() {
  const gebruiker = "Y.A. Bolhuis";

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="relative z-10 w-full shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <div className="flex h-8 w-full items-center justify-end bg-[#111111] pr-4">
          <LanguageMenu />
        </div>
        <div className="flex h-14 w-full items-center border-b border-[#e6e6e6] bg-white pl-6 pr-4">
          <Image
            src="/optisend-logo.png"
            alt="Optisend"
            width={954}
            height={210}
            className="h-6 w-auto"
            priority
          />
          <nav className="ml-8 hidden items-center gap-7 lg:flex">
            {["Klussen", "Agenda", "Financiën"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-[Arial,Helvetica,sans-serif] text-[14px] text-[#333] hover:text-[#d91222]"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              aria-label="Accountmenu"
              className="flex h-9 items-center gap-3 rounded-md border border-[#d8d8d8] bg-white px-4 font-[Arial,Helvetica,sans-serif] text-[14px] font-semibold text-[#222] hover:bg-[#fafafa]"
            >
              {gebruiker}
              <Menu className="size-4" strokeWidth={2} aria-hidden />
            </button>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="min-h-[calc(100vh-88px)] w-[280px] shrink-0 border-r border-[#e6e6e6] bg-[#fbfbfb] px-4 py-5">
          <div className="font-[Arial,Helvetica,sans-serif]">
            <DistanceSlider />
            <h2 className="mb-3 text-[16px] font-semibold text-[#1f2f46]">
              Vakgebied
            </h2>
            <div className="space-y-3">
              {["Schilder", "Stukadoor", "Dakdekker", "Loodgieter"].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-2 text-[15px] text-[#163a6b]"
                >
                  <input
                    type="checkbox"
                    className="size-3.5 rounded-sm border border-[#bfc4cc] bg-white accent-[#1d5fd1]"
                  />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>
        <main className="flex-1 bg-white" />
      </div>
    </div>
  );
}
