import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { SiteFooter } from "@/components/site-footer";
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
            <div className="ml-auto flex items-center gap-4">
              <Link
                href="/inloggen"
                className="inline-flex items-center gap-1 border-b border-[#111] pb-px text-[14px] font-medium text-[#111] hover:opacity-70"
              >
                Inloggen
                <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
              </Link>
              <Link
                href="/inloggen"
                className="inline-flex h-9 items-center rounded-[3px] bg-[#171717] px-4 text-[14px] font-medium text-white hover:bg-[#0a0a0a]"
              >
                Account openen
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-white" />
      <SiteFooter />
    </div>
  );
}
