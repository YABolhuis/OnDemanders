"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import type { Klus } from "@/lib/klussen";

export function AdvertentiePagina({ klus }: { klus: Klus }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="flex min-h-[calc(100vh-88px)] bg-white font-[Arial,Helvetica,sans-serif]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-8 px-6 py-6 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
          <Link
            href="/klussen"
            className="text-[13px] text-[#1d5fd1] hover:underline"
          >
            Terug naar opdrachten
          </Link>
          <h1 className="mt-5 text-[26px] font-bold text-[#1a1a1a]">
            {klus.title}
          </h1>
          <p className="mt-2 text-[14px] text-[#555]">{klus.tags}</p>
          <div className="mt-4 flex flex-wrap items-end gap-x-8 gap-y-2">
            <div>
              <p className="text-[13px] text-[#777]">Budget</p>
              <p className="text-[20px] font-bold text-[#1a1a1a]">{klus.price}</p>
            </div>
            <div>
              <p className="text-[13px] text-[#777]">Geplaatst</p>
              <p className="text-[14px] text-[#333]">{klus.when}</p>
            </div>
            <p className="text-[14px] font-medium text-[#2f9e44]">{klus.badge}</p>
          </div>
          <p className="mt-5 max-w-2xl text-[15px] leading-6 text-[#333]">
            {klus.description}
          </p>
          <div className="mt-6 border-t border-[#e6e6e6] pt-4">
            <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
            <p className="mt-1 flex items-center gap-1 text-[13px] text-[#555]">
              <PlaatsPin />
              {klus.city}
              {klus.extra !== "Bezoek website" ? (
                <span className="text-[#777]">· {klus.extra}</span>
              ) : null}
            </p>
          </div>
        </div>

        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-[320px]">
          <Link
            href="/abonement-credits"
            className="flex h-11 w-full items-center justify-center rounded-[var(--radius-control)] bg-[#14a800] px-4 text-[15px] font-semibold text-white hover:bg-[#108a00]"
          >
            Direct reageren
          </Link>
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((value) => !value)}
            className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-[var(--radius-control)] border border-[#14a800] bg-white px-4 text-[15px] font-semibold text-[#14a800] hover:bg-[#14a800]/5"
          >
            <Heart
              className={`size-4 ${saved ? "fill-[#14a800]" : ""}`}
              strokeWidth={2}
              aria-hidden
            />
            {saved ? "Advertentie bewaard" : "Advertentie bewaren"}
          </button>
        </aside>
      </div>
    </div>
  );
}
