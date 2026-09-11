"use client";

import Link from "next/link";
import {
  dealVoorPlan,
  heeftFreelancerPlus,
  type AbonnementPlan,
} from "@/lib/abonnement";

export function PlanBlokken({ plan }: { plan: AbonnementPlan }) {
  const plus = heeftFreelancerPlus(plan);
  const deal = dealVoorPlan(plan);
  const plusPrijs = deal?.prijs ?? 99;

  return (
    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
      <article className="relative rounded-xl border border-[#e6e8eb] bg-white px-6 pb-6 pt-7 text-[#1a1a1a]">
        {!plus ? (
          <span className="absolute -top-2.5 right-5 rounded-full bg-[#e8eaed] px-3 py-1 text-[11px] font-semibold tracking-wide text-[#5f6368]">
            HUIDIG PLAN
          </span>
        ) : null}
        <h3 className="text-[22px] font-semibold tracking-tight">Starter</h3>
        <p className="mt-1 text-[15px] text-[#5f6368]">Gratis</p>
        <hr className="mt-5 border-0 border-t border-[#ececec]" />
        <p className="mt-5 text-[14px] leading-6 text-[#3c4043]">
          Basisvoorzieningen om opdrachten te bekijken en te reageren.
        </p>
        <Link
          href="/abonement"
          className="mt-5 inline-block text-[14px] text-[#1a1a1a] underline underline-offset-4"
        >
          Bekijk de voordelen van je plan
        </Link>
      </article>

      <article className="relative rounded-xl border-2 border-[#8ee09a] bg-white px-6 pb-6 pt-7 text-[#1a1a1a] shadow-[0_0_20px_rgba(0,200,83,0.12)]">
        <span
          className={`absolute -top-2.5 right-5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
            plus
              ? "bg-[#e8eaed] text-[#5f6368]"
              : "bg-[#c8f0d0] text-[#1b7a38]"
          }`}
        >
          {plus ? "HUIDIG PLAN" : "POPULAIR"}
        </span>
        <h3 className="text-[22px] font-semibold tracking-tight">Plus</h3>
        <p className="mt-1 text-[15px] text-[#3c4043]">
          € {plusPrijs} per maand
        </p>
        <hr className="mt-5 border-0 border-t border-[#ececec]" />
        <p className="mt-5 text-[14px] leading-6 text-[#3c4043]">
          Win meer werk met persoonlijke meldingen en extra tegoed.
        </p>
        <Link
          href="/abonement"
          className="mt-5 inline-block text-[14px] font-medium text-[#1b7a38] underline underline-offset-4"
        >
          {plus ? "Wijzig je Plus-lidmaatschap" : "Kies Freelancer Plus"}
        </Link>
      </article>
    </div>
  );
}
