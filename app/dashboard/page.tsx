import Image from "next/image";
import { LanguageMenu } from "@/components/language-menu";
import { DistanceSlider } from "@/components/distance-slider";
import { VakgebiedList } from "@/components/vakgebied-list";
import { AccountMenu } from "@/components/account-menu";

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
            <AccountMenu gebruiker={gebruiker} />
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="min-h-[calc(100vh-88px)] w-[280px] shrink-0 border-r border-[#e6e6e6] bg-[#fbfbfb] px-4 py-5">
          <div className="font-[Arial,Helvetica,sans-serif]">
            <DistanceSlider />
            <VakgebiedList />
          </div>
        </aside>
        <main className="flex-1 bg-white" />
      </div>
    </div>
  );
}
