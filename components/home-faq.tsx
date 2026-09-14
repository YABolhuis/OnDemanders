"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { HomeSectionTitle } from "@/components/home-section-title";

const vragen = [
  {
    vraag: "Hoe meld ik me aan als vakman?",
    antwoord:
      "Open een account, vul je vak en werkgebied in en je ziet meteen opdrachten bij jou in de buurt. Bieden kan zodra je profiel compleet is.",
  },
  {
    vraag: "Wat kost het om op een opdracht te bieden?",
    antwoord:
      "Een bod kost credits. Het aantal staat bij de opdracht. Credits koop je via Abonement & credits; ongebruikte credits blijven op je saldo.",
  },
  {
    vraag: "Wanneer ontvang ik bericht van een opdrachtgever?",
    antwoord:
      "Als een opdrachtgever je bod accepteert of contact opneemt, krijg je een melding in Berichten. Reactie volgt meestal binnen 24 uur.",
  },
  {
    vraag: "Kan ik alleen klussen in mijn regio zien?",
    antwoord:
      "Ja. Filter op vakgebied, postcode en afstand. Je ziet dan alleen opdrachten die binnen die straal vallen.",
  },
] as const;

export function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section aria-labelledby="faq-titel" className="mt-16 lg:mt-20">
      <HomeSectionTitle id="faq-titel" muted="Antwoorden op">
        veelgestelde vragen
      </HomeSectionTitle>
      <div className="border-t border-[#ececec]">
        {vragen.map((item, index) => {
          const isOpen = open === index;
          return (
            <div key={item.vraag} className="border-b border-[#ececec]">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[15px] font-medium text-[#e8e8e6]">
                  {item.vraag}
                </span>
                {isOpen ? (
                  <Minus
                    className="size-5 shrink-0 text-[#f6821f]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                ) : (
                  <Plus
                    className="size-5 shrink-0 text-[#f6821f]"
                    strokeWidth={2.5}
                    aria-hidden
                  />
                )}
              </button>
              {isOpen ? (
                <p className="max-w-3xl pb-5 text-[14px] leading-6 text-[#737373]">
                  {item.antwoord}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
