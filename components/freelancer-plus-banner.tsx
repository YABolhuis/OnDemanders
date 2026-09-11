"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Tag, X } from "lucide-react";
import { heeftFreelancerPlus, leesAbonnement } from "@/lib/abonnement";

const DISMISS_KEY = "optisend-plus-banner-dismissed";

export function FreelancerPlusBanner() {
  const [zichtbaar, setZichtbaar] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") {
        return;
      }
    } catch {
      /* ignore */
    }
    if (heeftFreelancerPlus(leesAbonnement())) {
      return;
    }
    setZichtbaar(true);
  }, []);

  if (!zichtbaar) {
    return null;
  }

  function sluiten() {
    setZichtbaar(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="flex w-full items-center gap-2 rounded-md bg-linear-to-r from-[#c8e86a] to-[#eef6b0] px-4 py-2.5 text-[#1a1a1a]">
      <Tag className="size-4 shrink-0" strokeWidth={2} aria-hidden />
      <p className="min-w-0 flex-1 text-[13px]">
        Vind opdrachten sneller: ontvang persoonlijke meldingen en pak de beste
        leads als eerste.{" "}
        <Link href="/abonement-credits" className="font-medium underline underline-offset-2">
          Word lid van Freelancer Plus
        </Link>
      </p>
      <button
        type="button"
        aria-label="Banner sluiten"
        onClick={sluiten}
        className="flex size-6 shrink-0 items-center justify-center text-[#1a1a1a] hover:opacity-70"
      >
        <X className="size-4" strokeWidth={2} />
      </button>
    </div>
  );
}
