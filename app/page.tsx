import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="relative z-10 flex h-14 w-full items-center border-b border-[#e6e6e6] bg-white pl-6 pr-4 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <Image
          src="/optisend-logo.png"
          alt="Optisend"
          width={954}
          height={210}
          className="h-6 w-auto"
          priority
        />
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="outline"
            className="h-9 rounded-none border-[#d91222] bg-white px-4 text-sm font-normal text-[#d91222] hover:bg-[#d91222]/5 hover:text-[#d91222]"
          >
            Inloggen
          </Button>
          <Button className="h-9 rounded-none border-0 bg-[#d91222] px-4 text-sm font-normal text-white hover:bg-[#c0101e]">
            Account openen
          </Button>
        </div>
      </header>
      <main className="flex-1 bg-white" />
    </div>
  );
}
