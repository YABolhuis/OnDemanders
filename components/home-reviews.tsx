"use client";

import { useState } from "react";
import { Check, ChevronLeft, ChevronRight, Star } from "lucide-react";

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

function GoogleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden>
      <path
        fill="#4285F4"
        d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.4c-.3 1.5-1.1 2.7-2.4 3.5v2.9h3.9c2.3-2.1 3.6-5.2 3.6-8.5z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-2.9c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3c2 4 6.1 6.5 10.6 6.5z"
      />
      <path
        fill="#FBBC05"
        d="M5.4 14.5c-.2-.7-.4-1.4-.4-2.5s.1-1.8.4-2.5V6.5H1.4C.5 8.2 0 10 0 12s.5 3.8 1.4 5.5l4-3z"
      />
      <path
        fill="#EA4335"
        d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4C17.9 1.2 15.2 0 12 0 7.5 0 3.4 2.6 1.4 6.5l4 3c.9-2.8 3.5-4.7 6.6-4.7z"
      />
    </svg>
  );
}

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
    <section aria-label="Google-recensies" className="mt-16 lg:mt-20">
      <div className="flex items-center gap-3 lg:gap-5">
        <button
          type="button"
          aria-label="Vorige recensies"
          onClick={vorige}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#555] hover:border-[#cfcfcf]"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>

        <div className="grid min-w-0 flex-1 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {zichtbaar.map((recensie, index) => (
            <article
              key={`${recensie.klus}-${start}-${index}`}
              className={`flex min-h-[240px] flex-col rounded-[22px] bg-white px-6 py-6 shadow-[0_10px_40px_rgba(15,23,42,0.08)] ${
                index === 0
                  ? ""
                  : index === 1
                    ? "hidden md:flex"
                    : "hidden lg:flex"
              }`}
            >
              <p className="text-[15px] leading-6 text-[#1a1a1a]">
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

        <button
          type="button"
          aria-label="Volgende recensies"
          onClick={volgende}
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#555] hover:border-[#cfcfcf]"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
    </section>
  );
}
