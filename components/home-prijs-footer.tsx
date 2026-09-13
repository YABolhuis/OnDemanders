import Link from "next/link";
import { ArrowRight, Shield, Star, Zap } from "lucide-react";

export function HomePrijsFooter() {
  return (
    <section className="home-prijs-footer mt-auto px-6 py-16 text-center lg:px-10 lg:py-20">
      <h2 className="text-[28px] leading-tight font-semibold tracking-tight text-white sm:text-[32px]">
        Benieuwd wat jouw schilderklus kost?
      </h2>
      <p className="mt-3 text-[14px] text-[#9b9b97]">
        Bereken binnen 1 minuut jouw richtprijs
      </p>
      <Link
        href="/inloggen"
        className="mt-6 inline-flex h-10 items-center gap-2 rounded-lg bg-[#e2b48a] px-5 text-[14px] font-medium text-[#1a1a1a] hover:bg-[#d9a878]"
      >
        Bereken direct je prijs
        <ArrowRight className="size-4" strokeWidth={2} aria-hidden />
      </Link>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-2 gap-y-2 text-[13px] text-[#c5c5c3]">
        <span className="inline-flex items-center gap-1.5">
          <span className="inline-flex" aria-hidden>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className="size-3.5 fill-[#fbbc04] text-[#fbbc04]"
              />
            ))}
          </span>
          4.9/5 op basis van 40+ projecten
        </span>
        <span className="text-[#6b6b6b]" aria-hidden>
          /
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Shield className="size-3.5 text-[#5b8def]" strokeWidth={2} aria-hidden />
          Tot 5 jaar garantie op buitenwerk
        </span>
        <span className="text-[#6b6b6b]" aria-hidden>
          /
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Zap className="size-3.5 text-[#a78bfa]" strokeWidth={2} aria-hidden />
          Reactie binnen 24 uur
        </span>
      </div>
    </section>
  );
}
