"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  LIDMAATSCHAP_DEALS,
  type LidmaatschapDeal,
  type AbonnementPlan,
} from "@/lib/abonnement";

export type Facturatie = "maand" | "jaar";

type Cel = { soort: "vink" } | { soort: "tekst"; waarde: string };

const SECTIES: { titel: string; rijen: { label: string; cellen: Cel[] }[] }[] = [
  {
    titel: "Voordelen",
    rijen: [
      {
        label: "Tegoed per maand",
        cellen: LIDMAATSCHAP_DEALS.map((deal) => ({
          soort: "tekst" as const,
          waarde: `€ ${deal.tegoed} p.m.`,
        })),
      },
      {
        label: "Looptijd",
        cellen: LIDMAATSCHAP_DEALS.map((deal) => ({
          soort: "tekst" as const,
          waarde: `${deal.maanden} maanden`,
        })),
      },
      {
        label: "Persoonlijke opdrachtmeldingen",
        cellen: LIDMAATSCHAP_DEALS.map(() => ({ soort: "vink" as const })),
      },
      {
        label: "Als eerste zicht op nieuwe leads",
        cellen: LIDMAATSCHAP_DEALS.map(() => ({ soort: "vink" as const })),
      },
      {
        label: "Mobiele app",
        cellen: LIDMAATSCHAP_DEALS.map(() => ({ soort: "vink" as const })),
      },
    ],
  },
];

function GroenVinkje() {
  return (
    <span className="inline-flex size-[22px] items-center justify-center rounded-full bg-[#00c853]">
      <Check className="size-3.5 text-white" strokeWidth={3} aria-hidden />
    </span>
  );
}

export function PrijsTabel({
  plan,
  facturatie,
  onFacturatie,
  onKies,
}: {
  plan: AbonnementPlan;
  facturatie: Facturatie;
  onFacturatie: (waarde: Facturatie) => void;
  onKies: (deal: LidmaatschapDeal) => void;
}) {
  const jaarlijks = facturatie === "jaar";

  return (
    <div className="mt-8 max-w-[980px]">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
        <div
          className="inline-flex rounded-full bg-[#eef1f0] p-1"
          role="group"
          aria-label="Facturatieperiode"
        >
          <button
            type="button"
            onClick={() => onFacturatie("maand")}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
              !jaarlijks
                ? "bg-white text-[#1a1a1a] shadow-sm"
                : "text-[#5c5c5c]"
            }`}
          >
            Maandelijks
          </button>
          <button
            type="button"
            onClick={() => onFacturatie("jaar")}
            className={`rounded-full px-4 py-1.5 text-[13px] font-medium ${
              jaarlijks
                ? "bg-white text-[#1a1a1a] shadow-sm"
                : "text-[#5c5c5c]"
            }`}
          >
            Jaarlijks
          </button>
        </div>
        {jaarlijks ? (
          <span className="rounded-full bg-[#e3f8ea] px-3 py-1 text-[13px] font-medium text-[#008f3b]">
            Bespaar tot 31%
          </span>
        ) : null}
      </div>

      <div className="-mx-4 overflow-x-auto px-4 md:mx-0 md:px-0">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr>
              <th className="w-[28%] pb-6 pr-4 align-bottom">
                <span className="sr-only">Kenmerken</span>
              </th>
              {LIDMAATSCHAP_DEALS.map((deal) => {
                const gekozen = plan === deal.id;
                const prijs = jaarlijks ? deal.prijs : deal.oudPrijs;
                return (
                  <th
                    key={deal.id}
                    className="w-[24%] px-3 pb-6 align-bottom text-center"
                  >
                    <p className="text-[17px] font-semibold text-[#1a1a1a]">
                      {deal.maanden} maanden
                    </p>
                    <p className="mt-3 text-[32px] font-bold leading-none tracking-tight text-[#1a1a1a]">
                      € {prijs}
                    </p>
                    <p className="mt-2 text-[13px] font-normal text-[#6b6b6b]">
                      {jaarlijks
                        ? "per maand, bij jaarbetaling"
                        : "per maand, maandelijks opgezegd"}
                    </p>
                    <Button
                      type="button"
                      disabled={gekozen}
                      aria-pressed={gekozen}
                      onClick={() => onKies(deal)}
                      className={
                        deal.uitgelicht || gekozen
                          ? "mt-4 h-10 w-full rounded-md bg-[#00c853] text-[14px] font-semibold text-white hover:bg-[#00b34a] disabled:opacity-100"
                          : "mt-4 h-10 w-full rounded-md border-2 border-[#00c853] bg-white text-[14px] font-semibold text-[#00a844] hover:bg-[#f3fbf6] disabled:opacity-100"
                      }
                    >
                      {gekozen ? "Gekozen" : "Kies"}
                    </Button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {SECTIES.map((sectie) => (
              <SectieRijen key={sectie.titel} sectie={sectie} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SectieRijen({
  sectie,
}: {
  sectie: (typeof SECTIES)[number];
}) {
  return (
    <>
      <tr>
        <th
          colSpan={4}
          className="border-b-[3px] border-[#00c853] pb-2 pt-4 text-[15px] font-semibold text-[#1a1a1a]"
        >
          {sectie.titel}
        </th>
      </tr>
      {sectie.rijen.map((rij) => (
        <tr key={rij.label} className="border-b border-[#ececec]">
          <th className="py-3.5 pr-4 text-left text-[14px] font-normal text-[#333]">
            {rij.label}
          </th>
          {rij.cellen.map((cel, index) => (
            <td key={`${rij.label}-${index}`} className="px-3 py-3.5 text-center">
              {cel.soort === "vink" ? (
                <span className="inline-flex justify-center">
                  <GroenVinkje />
                  <span className="sr-only">Inbegrepen</span>
                </span>
              ) : (
                <span className="text-[14px] text-[#555]">{cel.waarde}</span>
              )}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
