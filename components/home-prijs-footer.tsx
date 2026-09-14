import Link from "next/link";
import { Check, Star } from "lucide-react";
import { LANDING_SHELL } from "@/lib/site-width";

export function HomePrijsFooter() {
  return (
    <section className="flex min-h-[320px] flex-col bg-[#171717] pt-20 pb-10 sm:pt-24 lg:min-h-[380px] lg:pt-32 lg:pb-14">
      <div className={`${LANDING_SHELL} flex flex-1 flex-col`}>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <h2 className="text-[22px] leading-snug font-medium tracking-tight sm:text-[26px] lg:text-[28px]">
            <span className="text-[#8a8a8a]">Benieuwd wat jouw </span>
            <span className="text-white">schilderklus kost?</span>
          </h2>
          <Link
            href="/inloggen"
            className="mt-7 inline-flex h-9 items-center rounded-[var(--radius-control)] bg-[#246b4d] px-4 text-[13px] font-medium text-white hover:bg-[#1f5e43]"
          >
            Bekijk opdrachten
          </Link>
        </div>

        <div className="flex w-full justify-center pt-16 text-[13px] text-[#9b9b97] lg:pt-10">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            <li className="inline-flex items-center gap-1.5">
              <Check
                className="size-3.5 text-[#3ecf8e]"
                strokeWidth={2.5}
                aria-hidden
              />
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
              <Check
                className="size-3.5 text-[#3ecf8e]"
                strokeWidth={2.5}
                aria-hidden
              />
              Tot 5 jaar garantie op buitenwerk
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Check
                className="size-3.5 text-[#3ecf8e]"
                strokeWidth={2.5}
                aria-hidden
              />
              Reactie binnen 24 uur
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
