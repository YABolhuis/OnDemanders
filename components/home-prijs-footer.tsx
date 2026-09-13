import Link from "next/link";
import { Check, Star } from "lucide-react";

export function HomePrijsFooter() {
  return (
    <section className="mt-auto flex min-h-[360px] flex-col bg-[#171717] px-8 pt-16 pb-10 lg:min-h-[400px] lg:px-16 lg:pt-20 lg:pb-12">
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <h2 className="text-[22px] leading-snug font-medium tracking-tight sm:text-[26px] lg:text-[28px]">
          <span className="text-[#8a8a8a]">Benieuwd wat jouw </span>
          <span className="text-white">schilderklus kost?</span>
        </h2>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
          <Link
            href="/inloggen"
            className="inline-flex h-9 items-center rounded-[var(--radius-control)] bg-[#246b4d] px-4 text-[13px] font-medium text-white hover:bg-[#1f5e43]"
          >
            Bereken direct je prijs
          </Link>
          <Link
            href="/inloggen"
            className="inline-flex h-9 items-center rounded-[var(--radius-control)] border border-[#3a3a3a] px-4 text-[13px] font-medium text-[#e8e8e6] hover:border-[#5a5a5a]"
          >
            Bekijk opdrachten
          </Link>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 pt-16 text-[13px] text-[#9b9b97] lg:flex-row lg:pt-10">
        <p>
          Bereken binnen 1 minuut jouw richtprijs.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
          <li className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-[#3ecf8e]" strokeWidth={2.5} aria-hidden />
            <span className="inline-flex items-center gap-1">
              <span className="inline-flex" aria-hidden>
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-3 fill-[#fbbc04] text-[#fbbc04]"
                  />
                ))}
              </span>
              4.9/5 op basis van 40+ projecten
            </span>
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-[#3ecf8e]" strokeWidth={2.5} aria-hidden />
            Tot 5 jaar garantie op buitenwerk
          </li>
          <li className="inline-flex items-center gap-1.5">
            <Check className="size-3.5 text-[#3ecf8e]" strokeWidth={2.5} aria-hidden />
            Reactie binnen 24 uur
          </li>
        </ul>
      </div>
    </section>
  );
}
