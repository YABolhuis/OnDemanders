"use client";

import { useEffect, useState } from "react";
import { PlanBlokken } from "@/components/plan-blokken";
import { useCredits } from "@/components/credits-provider";
import {
  dealVoorPlan,
  leesAbonnement,
  type AbonnementPlan,
} from "@/lib/abonnement";

export function AbonementCreditsPagina() {
  const { saldo } = useCredits();
  const [plan, setPlan] = useState<AbonnementPlan>("starter");
  const [kostenLabel, setKostenLabel] = useState("Gratis");
  const [creditsBijPlan, setCreditsBijPlan] = useState("10 per maand");

  useEffect(() => {
    const huidig = leesAbonnement();
    const deal = dealVoorPlan(huidig);
    setPlan(huidig);
    setKostenLabel(deal ? `€ ${deal.prijs} per maand` : "Gratis");
    setCreditsBijPlan(
      deal ? `€ ${deal.tegoed} tegoed per maand` : "10 per maand"
    );
  }, []);

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#fbfbfb] py-10 pr-10 pl-8 text-[#1a1a1a]">
        <div className="max-w-5xl">
          <h1 className="text-[32px] font-bold">Abonement & credits</h1>
          <p className="mt-1 text-[15px] text-[#555]">
            Bekijk je abonnement en het aantal credits op je account.
          </p>

          <hr className="mt-8 border-0 border-t border-[#e6e6e6]" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Huidig abonnement</h2>
            <PlanBlokken plan={plan} />
          </section>

          <hr className="border-0 border-t border-[#e6e6e6]" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Beschikbare credits</h2>
            <p className="mt-2 text-[15px] text-[#333]">
              {saldo.toLocaleString("nl-NL")}
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-5">
              <button
                type="button"
                className="h-9 bg-[#8fd14f] px-4 text-[14px] font-medium text-[#1b2730] hover:bg-[#7fc43f]"
              >
                Credits kopen
              </button>
              <button
                type="button"
                className="text-[14px] font-medium text-[#3d7a12] hover:underline"
              >
                Creditsgeschiedenis bekijken
              </button>
            </div>
          </section>

          <hr className="border-0 border-t border-[#e6e6e6]" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Credits bij abonnement</h2>
            <p className="mt-2 text-[15px] text-[#333]">{creditsBijPlan}</p>
            <p className="mt-3 max-w-xl text-[13px] leading-5 text-[#6b6b6b]">
              Ongebruikte credits aan het einde van je factuurperiode gaan mee
              naar de volgende maand (tot 200).{" "}
              <button
                type="button"
                className="font-medium text-[#3d7a12] hover:underline"
              >
                Meer informatie
              </button>
            </p>
          </section>

          <hr className="border-0 border-t border-[#e6e6e6]" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Abonnementskosten</h2>
            <p className="mt-2 text-[15px] text-[#333]">{kostenLabel}</p>
          </section>
        </div>
    </div>
  );
}
