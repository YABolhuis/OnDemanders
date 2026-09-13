import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteChrome } from "@/components/site-chrome";
import { HomeHero } from "@/components/home-hero";
import { HomeReviews } from "@/components/home-reviews";
import { HomePrijsFooter } from "@/components/home-prijs-footer";

export default function Home() {
  return (
    <SiteChrome
      landing
      header={
        <header className="relative z-50 w-full border-b border-[#d0d0d0] bg-[#fbfbfb]">
          <div className="flex h-14 w-full items-center justify-between px-14 lg:px-16">
            <Link href="/">
              <Image
                src="/optisend-logo.png"
                alt="Optisend"
                width={954}
                height={210}
                className="theme-logo h-6 w-auto"
                priority
              />
            </Link>
            <div className="flex items-center gap-4">
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
        </header>
      }
    >
      <main className="flex flex-1 flex-col bg-[#fbfbfb]">
        <div className="px-14 pt-12 pb-14 lg:px-16 lg:pt-16 lg:pb-16">
          <HomeHero />
          <HomeReviews />
        </div>
        <HomePrijsFooter />
      </main>
    </SiteChrome>
  );
}
