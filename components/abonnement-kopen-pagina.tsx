"use client";

import { useEffect, useState } from "react";
import {
  abonnementLabel,
  dealVoorPlan,
  heeftFreelancerPlus,
  leesAbonnement,
  slaAbonnementOp,
  type AbonnementPlan,
  type LidmaatschapDeal,
} from "@/lib/abonnement";
import { useCredits } from "@/components/credits-provider";
import {
  PrijsTabel,
  type Facturatie,
} from "@/components/prijs-tabel";

export function AbonnementKopenPagina() {
  const [plan, setPlan] = useState<AbonnementPlan>("starter");
  const [facturatie, setFacturatie] = useState<Facturatie>("jaar");
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
  const actievePrijs =
    actieveDeal && facturatie === "jaar"
      ? actieveDeal.prijs
      : actieveDeal?.oudPrijs;

  return (
    <div className="px-10 py-10">
      <p className="text-[13px] font-medium text-[#6b6b6b]">Abonnement</p>
      <h1 className="mt-1 text-[28px] font-bold text-[#1a1a1a]">
        Freelancer Plus
      </h1>
      <p className="mt-2 max-w-xl text-[15px] leading-6 text-[#555]">
        Vergelijk de lidmaatschappen en kies de looptijd die bij je past.
      </p>

      <PrijsTabel
        plan={plan}
        facturatie={facturatie}
        onFacturatie={setFacturatie}
        onKies={kiesDeal}
      />

      {heeftFreelancerPlus(plan) && actieveDeal && actievePrijs != null ? (
        <p className="mt-6 max-w-[980px] text-[14px] text-[#555]">
          Je lidmaatschap is {abonnementLabel(plan)} voor € {actievePrijs} per
          maand, met € {actieveDeal.tegoed} tegoed per maand.
        </p>
      ) : null}
    </div>
  );
}
