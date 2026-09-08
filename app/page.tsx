import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LanguageMenu } from "@/components/language-menu";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="relative z-10 w-full shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <div className="w-full bg-[#111111]">
          <div
            className={`${SITE_WIDTH_CLASS} flex h-8 items-center justify-end px-4`}
          >
            <LanguageMenu />
          </div>
        </div>
        <div className="w-full border-b border-[#e6e6e6] bg-white">
          <div className={`${SITE_WIDTH_CLASS} flex h-14 items-center px-4`}>
            <Image
              src="/optisend-logo.png"
              alt="Optisend"
              width={954}
              height={210}
              className="theme-logo h-6 w-auto"
              priority
            />
            <div className="ml-auto flex items-center gap-2">
              <Button
                nativeButton={false}
                render={<Link href="/inloggen" />}
                variant="outline"
                className="h-7 border-[#d91222] bg-white px-3 text-[13px] font-normal font-[Arial,Helvetica,sans-serif] text-[#d91222] hover:bg-[#d91222]/5 hover:text-[#d91222]"
              >
                Inloggen
              </Button>
              <Button className="h-7 border-0 bg-[#d91222] px-3 text-[13px] font-normal font-[Arial,Helvetica,sans-serif] text-white hover:bg-[#c0101e]">
                Account openen
              </Button>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-white" />
    </div>
  );
}
