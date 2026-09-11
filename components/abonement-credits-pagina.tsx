"use client";

import { useEffect, useState } from "react";
import { AccountSidebar } from "@/components/account-sidebar";
import { useCredits } from "@/components/credits-provider";
import {
  abonnementLabel,
  dealVoorPlan,
  leesAbonnement,
  slaAbonnementOp,
  type AbonnementPlan,
  type LidmaatschapDeal,
} from "@/lib/abonnement";
import {
  PrijsTabel,
  type Facturatie,
} from "@/components/prijs-tabel";

export function AbonementCreditsPagina() {
  const { saldo, addCredits } = useCredits();
  const [plan, setPlan] = useState<AbonnementPlan>("starter");
  const [facturatie, setFacturatie] = useState<Facturatie>("jaar");

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

  const deal = dealVoorPlan(plan);
  const prijs = deal
    ? facturatie === "jaar"
      ? deal.prijs
      : deal.oudPrijs
    : null;

  return (
    <div className="flex min-h-[calc(100vh-57px)] bg-[#24333d] text-white">
      <AccountSidebar />
      <div className="min-w-0 flex-1 px-8 py-10">
        <div className="mx-auto max-w-[1100px]">
          <h1 className="text-[32px] font-bold">Abonement & credits</h1>
          <p className="mt-1 text-[15px] text-[#c5ced4]">
            Bekijk je abonnement en het aantal credits op je account.
          </p>

          <hr className="mt-8 border-0 border-t border-white/15" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Huidig abonnement</h2>
            <p className="mt-2 text-[15px] text-[#d5dde2]">
              {abonnementLabel(plan)}
            </p>
            <div className="mt-6 overflow-hidden rounded-md bg-white p-6 text-[#1a1a1a]">
              <PrijsTabel
                plan={plan}
                facturatie={facturatie}
                onFacturatie={setFacturatie}
                onKies={kiesDeal}
                className="mt-0 max-w-none"
              />
            </div>
          </section>

          <hr className="border-0 border-t border-white/15" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Beschikbare credits</h2>
            <p className="mt-2 text-[15px] text-[#d5dde2]">
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
                className="text-[14px] font-medium text-[#8fd14f] hover:underline"
              >
                Creditsgeschiedenis bekijken
              </button>
            </div>
          </section>

          <hr className="border-0 border-t border-white/15" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Credits bij abonnement</h2>
            <p className="mt-2 text-[15px] text-[#d5dde2]">
              {deal
                ? `€ ${deal.tegoed} tegoed per maand`
                : "10 per maand"}
            </p>
            <p className="mt-3 max-w-xl text-[13px] leading-5 text-[#9aa8b0]">
              Ongebruikte credits aan het einde van je factuurperiode gaan mee
              naar de volgende maand (tot 200).{" "}
              <button
                type="button"
                className="font-medium text-[#8fd14f] hover:underline"
              >
                Meer informatie
              </button>
            </p>
          </section>

          <hr className="border-0 border-t border-white/15" />

          <section className="py-8">
            <h2 className="text-[16px] font-semibold">Abonnementskosten</h2>
            <p className="mt-2 text-[15px] text-[#d5dde2]">
              {prijs != null ? `€ ${prijs} per maand` : "Gratis"}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
