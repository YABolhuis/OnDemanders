import Image from "next/image";
import { LanguageMenu } from "@/components/language-menu";

export default function DashboardPage() {
  const gebruiker = "Y.A. Bolhuis";

  return (
    <div className="flex min-h-full flex-col bg-white">
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
            <span className="h-7 flex items-center rounded-none border border-[#d91222] px-3 font-[Arial,Helvetica,sans-serif] text-[13px] font-normal text-[#d91222]">
              {gebruiker}
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-white" />
    </div>
  );
}
