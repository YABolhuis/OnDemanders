"use client";

import { useState } from "react";
import { GoogleMark } from "@/components/google-mark";
import { HomeSectionTitle } from "@/components/home-section-title";
import { ChevronLeft, ChevronRight, Star, Check } from "lucide-react";

const recensies = [
  {
    quote:
      "Van advies tot oplevering: alles verliep soepel. Het schilderwerk is strak, netjes en precies zoals we hadden gehoopt.",
    klus: "Binnenschilderwerk",
  },
  {
    quote:
      "Een echte vakman die afspraken nakomt. Hij werkte schoon, dacht mee en het resultaat ziet er prachtig uit.",
    klus: "Buitenonderhoud",
  },
  {
    quote:
      "Fijne communicatie en een prachtig eindresultaat. Ons huis ziet er weer verzorgd en fris uit.",
    klus: "Schilderproject woning",
  },
  {
    quote:
      "Kozijnen netjes geschuurd en in de juiste RAL gezet. Duidelijke planning en geen gedoe achteraf.",
    klus: "Kozijnen buitenzijde",
  },
  {
    quote:
      "De gevel ziet er weer als nieuw uit. Snel geschakeld, nette prijs en keurig opgeruimd na afloop.",
    klus: "Gevelreiniging",
  },
  {
    quote:
      "Woonkamer overgeschilderd in één week. Rustig in huis, strakke randen en precies de kleur die we wilden.",
    klus: "Woonkamer schilderen",
  },
] as const;

const ZICHTBAAR = 3;

export function HomeReviews() {
  const [start, setStart] = useState(0);
  const zichtbaar = Array.from(
    { length: ZICHTBAAR },
    (_, index) => recensies[(start + index) % recensies.length]
  );

  function vorige() {
    setStart((huidig) => (huidig - 1 + recensies.length) % recensies.length);
  }

  function volgende() {
    setStart((huidig) => (huidig + 1) % recensies.length);
  }

  return (
    <section aria-labelledby="recensies-titel" className="pt-8 lg:pt-12">
      <HomeSectionTitle id="recensies-titel" muted="Wat opdrachtgevers">
        zeggen over hun project
      </HomeSectionTitle>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {zichtbaar.map((recensie, index) => (
          <article
            key={`${recensie.klus}-${start}-${index}`}
            className={`flex min-h-[220px] flex-col rounded-[16px] border border-white/10 bg-[#171717] px-6 py-6 ${
              index === 0
                ? ""
                : index === 1
                  ? "hidden md:flex"
                  : "hidden lg:flex"
            }`}
          >
            <p className="text-[15px] leading-6 text-[#e8e8e6]">
              “{recensie.quote}”
            </p>
            <div className="mt-auto pt-8">
              <span
                className="mb-4 block size-12 rounded-full bg-[#e8f0fe]"
                aria-hidden
              />
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="text-[13px] text-[#555]">{recensie.klus}</p>
                  <p className="mt-1 flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, ster) => (
                      <Star
                        key={ster}
                        className="size-3.5 fill-[#fbbc04] text-[#fbbc04]"
                        aria-hidden
                      />
                    ))}
                    <span
                      className="ml-0.5 inline-flex size-3.5 items-center justify-center rounded-full bg-[#1a73e8]"
                      aria-label="Geverifieerde Google-recensie"
                    >
                      <Check className="size-2.5 text-white" strokeWidth={3} />
                    </span>
                  </p>
                </div>
                <GoogleMark />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        <button
          type="button"
          aria-label="Vorige recensies"
          onClick={vorige}
          className="landing-pill flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#171717] text-[#9b9b97] hover:border-white/25"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Volgende recensies"
          onClick={volgende}
          className="landing-pill flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#171717] text-[#9b9b97] hover:border-white/25"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
