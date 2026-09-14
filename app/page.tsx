import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteChrome } from "@/components/site-chrome";
import { HomeHero } from "@/components/home-hero";
import { HomeKenmerken } from "@/components/home-kenmerken";
import { HomeUitleg } from "@/components/home-uitleg";
import { HomeReviews } from "@/components/home-reviews";
import { HomeFaq } from "@/components/home-faq";
import { HomePrijsFooter } from "@/components/home-prijs-footer";
import { LandingThemeToggle } from "@/components/landing-theme-toggle";
import { LanguageMenu } from "@/components/language-menu";
import { LANDING_SHELL } from "@/lib/site-width";

export default function Home() {
  return (
    <SiteChrome
      landing
      header={
        <header className="relative z-50 w-full border-b border-white/10 bg-[#171717]">
          <div className={`${LANDING_SHELL} flex h-16 items-center justify-between`}>
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
            <div className="flex items-center gap-1">
              <LanguageMenu variant="icon" />
              <LandingThemeToggle />
              <Link
                href="/inloggen"
                className="inline-flex h-8 items-center gap-1 rounded-full px-2.5 text-[13px] font-medium text-[#e8e8e6] hover:bg-[#2c2c2c]"
              >
                Inloggen
                <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
              </Link>
            </div>
          </div>
        </header>
      }
    >
      <main className="flex flex-1 flex-col bg-[#171717]">
        <div className={`${LANDING_SHELL} flex flex-col pt-16 sm:pt-20 lg:pt-24`}>
          <HomeHero />
          <div className="mt-20 flex flex-col gap-20 sm:mt-24 sm:gap-24 lg:mt-32 lg:gap-32">
            <HomeKenmerken />
            <HomeUitleg />
            <HomeReviews />
            <HomeFaq />
          </div>
        </div>
        <HomePrijsFooter />
      </main>
    </SiteChrome>
  );
}
