import Link from "next/link";
import { GoogleMark } from "@/components/google-mark";
import { HomeHeroForm } from "@/components/home-hero-form";

export function HomeHero() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:gap-16">
      <div className="max-w-[34rem]">
        <h1 className="text-[28px] leading-[1.15] font-medium tracking-tight text-[#1a1a1a] sm:text-[32px] lg:text-[36px]">
          Vind werk in een weekend
          <span className="mt-0.5 block text-[#3ecf8e]">Groei naar heel Nederland</span>
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href="/inloggen"
            className="inline-flex h-8 items-center rounded-[var(--radius-control)] bg-[#16a34a] px-3.5 text-[13px] font-medium text-white hover:bg-[#15803d]"
          >
            Account openen
          </Link>
          <Link
            href="/inloggen"
            className="inline-flex h-8 items-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-transparent px-3.5 text-[13px] font-medium text-[#1a1a1a] hover:border-[#1a1a1a]"
          >
            Bekijk opdrachten
          </Link>
        </div>
        <div className="mt-8 flex items-start gap-3">
          <GoogleMark className="mt-0.5 size-9 shrink-0" />
          <div className="min-w-0">
            <p className="text-[18px] leading-6 font-semibold text-[#1a1a1a]">
              4.9/5 Google reviews
            </p>
            <p className="mt-0.5 text-[13px] text-[#777]">Gebaseerd op 2K+ reviews</p>
            <p className="mt-2 text-[13px] leading-5 text-[#555]">
              Meer dan 2.000 tevreden klanten achter ons, leveren we met trots
              professionele oplossingen van topkwaliteit.
            </p>
          </div>
        </div>
      </div>
      <HomeHeroForm />
    </section>
  );
}
