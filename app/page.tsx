import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/components/site-chrome";
import { HomeHero } from "@/components/home-hero";
import { HomeReviews } from "@/components/home-reviews";
import { HomeHeroForm } from "@/components/home-hero-form";
import { HomePrijsFooter } from "@/components/home-prijs-footer";
import { LANDING_SHELL } from "@/lib/site-width";

export default function Home() {
  return (
    <SiteChrome
      landing
      header={
        <header className="relative z-50 w-full border-b border-[#f0f0f0] bg-white">
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
            <div className="flex items-center gap-3">
              <Link
                href="/inloggen"
                className="inline-flex h-8 items-center rounded-full px-3 text-[13px] font-medium text-[#171717] hover:bg-[#f5f5f5]"
              >
                Inloggen
              </Link>
              <Link
                href="/inloggen"
                className="landing-pill inline-flex h-8 items-center rounded-full bg-[#16a34a] px-3.5 text-[13px] font-medium text-white hover:bg-[#15803d]"
              >
                Account openen
              </Link>
            </div>
          </div>
        </header>
      }
    >
      <main className="flex flex-1 flex-col bg-white">
        <div
          className={`${LANDING_SHELL} flex min-h-[calc(100dvh-4rem)] flex-col pt-16 pb-10 lg:pt-24 lg:pb-12`}
        >
          <HomeHero />
          <HomeReviews />
        </div>
        <div className={`${LANDING_SHELL} pb-16`}>
          <div className="flex justify-end">
            <HomeHeroForm />
          </div>
        </div>
        <HomePrijsFooter />
      </main>
    </SiteChrome>
  );
}
