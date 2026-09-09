"use client";

import { useState } from "react";
import Link from "next/link";
import { Briefcase, ChevronDown, Clock, Info } from "lucide-react";
import { vakgebieden, klussenVoorVakgebied } from "@/lib/vakgebieden";
import { klussen } from "@/lib/klussen";

const legeVelden = [
  { label: "Soort werk", options: ["Alle"] },
  { label: "Type pand", options: ["Alle"] },
  { label: "Prijs (tot)", options: ["Alle"] },
  { label: "Omvang", options: ["Alle"] },
] as const;

const schilderVelden = [
  { label: "Soort werk", options: ["Alle", "Binnen", "Buiten", "Gevel"] },
  { label: "Type pand", options: ["Alle", "Woning", "Nieuwbouw", "Bedrijfspand / kantoor"] },
  { label: "Prijs (tot)", options: ["Alle", "€ 500", "€ 1.000", "€ 2.500"] },
  { label: "Omvang", options: ["Alle", "< 1 dag", "1 - 5 dagen", "> 1 week"] },
] as const;

export function OpdrachtenStart() {
  const [slug, setSlug] = useState(vakgebieden[0].slug);
  const vak = vakgebieden.find((item) => item.slug === slug) ?? vakgebieden[0];
  const aantal = klussenVoorVakgebied(vak.slug).length;
  const velden = vak.heeftFilters ? schilderVelden : legeVelden;

  return (
    <div className="relative min-h-[calc(100vh-57px)] overflow-hidden bg-[#f3eee6]">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-40 size-[520px] rounded-[45%] bg-[#fbf8f2]"
      />
      <div className="relative mx-auto grid max-w-[1200px] gap-12 px-8 py-16 lg:grid-cols-2 lg:items-center lg:py-24">
        <div>
          <h1 className="text-[40px] leading-tight font-bold text-[#163a6b]">
            Vind opdrachten in jouw{" "}
            <span className="underline decoration-[#e8772e] decoration-2 underline-offset-4">
              vakgebied
            </span>
          </h1>
          <p className="mt-5 max-w-md text-[16px] leading-7 text-[#3d4f63]">
            Kies een vakgebied om opdrachten te zien. Schilders hebben al
            filters in de sidebar; andere vakken starten met een lege sidebar
            zodat je per beroep eigen filters kunt opbouwen.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-[#1f2f46]">
            <li className="flex items-center gap-3">
              <Briefcase className="size-5 text-[#e8772e]" strokeWidth={2} />
              <span>
                Meer dan{" "}
                <strong>{klussen.length.toLocaleString("nl-NL")}</strong>{" "}
                opdrachten beschikbaar
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Clock className="size-5 text-[#e8772e]" strokeWidth={2} />
              <span>
                Dagelijks <strong>nieuwe</strong> advertenties
              </span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl bg-white p-5 shadow-[0_8px_28px_rgba(0,0,0,0.12)]">
          <div className="flex flex-wrap gap-2">
            {vakgebieden.map((item) => {
              const actief = item.slug === vak.slug;
              return (
                <button
                  key={item.slug}
                  type="button"
                  onClick={() => setSlug(item.slug)}
                  className={`h-9 rounded-full px-3.5 text-[13px] ${
                    actief
                      ? "border border-[#1d5fd1] bg-white font-medium text-[#1d5fd1]"
                      : "border border-[#d0d0d0] bg-white text-[#222] hover:border-[#1d5fd1]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#e8f3fb] px-3 py-2.5 text-[13px] text-[#163a6b]">
            <Info className="size-4 shrink-0 text-[#1d5fd1]" strokeWidth={2} />
            <span>
              <strong>Ga door met zoeken</strong>
              {" / "}
              <Link
                href={`/klussen/vak/${vak.slug}`}
                className="text-[#1d5fd1] hover:underline"
              >
                {vak.label}
              </Link>
            </span>
          </div>

          <div key={vak.slug} className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {velden.map((veld) => (
              <label key={veld.label} className="block text-[12px] font-semibold text-[#222]">
                {veld.label}
                <span className="relative mt-1.5 block">
                  <select
                    defaultValue="Alle"
                    disabled={!vak.heeftFilters}
                    className="h-11 w-full appearance-none rounded-lg border border-[#d0d0d0] bg-white px-3 pr-9 text-[14px] font-normal text-[#222] outline-none focus:border-[#1d5fd1] disabled:bg-[#f7f7f7] disabled:text-[#8a8a8a]"
                  >
                    {veld.options.map((optie) => (
                      <option key={optie} value={optie}>
                        {optie}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#555]"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </label>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <Link
              href={`/klussen/vak/${vak.slug}`}
              className="text-[14px] font-medium text-[#1d5fd1] hover:underline"
            >
              Meer filters
            </Link>
            <Link
              href={`/klussen/vak/${vak.slug}`}
              className="inline-flex h-11 items-center rounded-lg bg-[#1d5fd1] px-5 text-[15px] font-semibold text-white hover:bg-[#184fb3]"
            >
              {aantal} {vak.meervoud}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
