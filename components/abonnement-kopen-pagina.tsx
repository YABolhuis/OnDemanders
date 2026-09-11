"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  abonnementLabel,
  dealVoorPlan,
  heeftFreelancerPlus,
  leesAbonnement,
  LIDMAATSCHAP_DEALS,
  slaAbonnementOp,
  type AbonnementPlan,
  type LidmaatschapDeal,
} from "@/lib/abonnement";
import { useCredits } from "@/components/credits-provider";

export function AbonnementKopenPagina() {
  const [plan, setPlan] = useState<AbonnementPlan>("starter");
  const { addCredits } = useCredits();

  useEffect(() => {
    setPlan(leesAbonnement());
  }, []);

  function kiesDeal(deal: LidmaatschapDeal) {
    const vorige = dealVoorPlan(leesAbonnement());
    slaAbonnementOp(deal.id);
    setPlan(deal.id);
    if (vorige?.id !== deal.id) {
      addCredits(deal.tegoed);
    }
  }

  const actieveDeal = dealVoorPlan(plan);

  return (
    <div className="px-10 py-10">
      <p className="text-[13px] font-medium text-[#6b6b6b]">Abonnement</p>
      <h1 className="mt-1 text-[28px] font-bold text-[#1a1a1a]">
        Freelancer Plus
      </h1>
      <p className="mt-2 max-w-xl text-[15px] leading-6 text-[#555]">
        Kies een lidmaatschap met maandelijks tegoed. Hoe langer je vastzet, hoe
        lager de prijs per maand.
      </p>

      <div className="mt-8 grid max-w-[920px] grid-cols-1 gap-4 md:grid-cols-3 md:items-stretch">
        {LIDMAATSCHAP_DEALS.map((deal) => {
          const gekozen = plan === deal.id;
          return (
            <article
              key={deal.id}
              className="flex flex-col overflow-hidden rounded-[3px] border border-[#e6e6e6] bg-white"
            >
              <div
                className={`px-5 py-6 text-center ${
                  deal.uitgelicht
                    ? "bg-[#5c2188] text-white"
                    : "bg-[#f3eef8] text-[#1a1a1a]"
                }`}
              >
                <div className="flex items-baseline justify-center gap-3">
                  <span
                    className={`text-[18px] font-medium line-through ${
                      deal.uitgelicht ? "text-white/80" : "text-[#6b6b6b]"
                    }`}
                  >
                    € {deal.oudPrijs}
                  </span>
                  <span className="text-[40px] font-bold leading-none tracking-tight">
                    € {deal.prijs}
                  </span>
                </div>
                <p
                  className={`mt-2 text-[15px] font-medium ${
                    deal.uitgelicht ? "text-white" : "text-[#1a1a1a]"
                  }`}
                >
                  per maand
                </p>
              </div>

              <div className="flex flex-1 flex-col px-5 pb-5 pt-6 text-center">
                <p className="text-[15px] text-[#333]">
                  € {deal.tegoed} tegoed p.m.
                </p>
                <p className="mt-1 text-[15px] text-[#333]">
                  Lidmaatschap van {deal.maanden} maanden
                </p>
                <Button
                  type="button"
                  disabled={gekozen}
                  aria-pressed={gekozen}
                  onClick={() => kiesDeal(deal)}
                  className="mt-8 h-11 w-full rounded-[3px] bg-[#5c2188] text-[15px] font-medium text-white hover:bg-[#4d1b73] disabled:opacity-100"
                >
                  {gekozen ? "Gekozen" : "Kies"}
                </Button>
              </div>
            </article>
          );
        })}
      </div>

      {heeftFreelancerPlus(plan) && actieveDeal ? (
        <p className="mt-6 max-w-[920px] text-[14px] text-[#555]">
          Je lidmaatschap is {abonnementLabel(plan)} voor € {actieveDeal.prijs}{" "}
          per maand, met € {actieveDeal.tegoed} tegoed per maand.
        </p>
      ) : null}
    </div>
  );
}
