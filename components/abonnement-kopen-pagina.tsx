"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  leesAbonnement,
  slaAbonnementOp,
  type AbonnementPlan,
} from "@/lib/abonnement";

const voordelen = [
  "Persoonlijke opdrachtmeldingen",
  "Als eerste zicht op nieuwe leads",
  "50 extra credits per maand",
];

export function AbonnementKopenPagina() {
  const [plan, setPlan] = useState<AbonnementPlan>("starter");
  const [bevestigd, setBevestigd] = useState(false);

  useEffect(() => {
    setPlan(leesAbonnement());
  }, []);

  const heeftPlus = plan === "plus";

  function kopen() {
    slaAbonnementOp("plus");
    setPlan("plus");
    setBevestigd(true);
  }

  return (
    <div className="px-10 py-10">
      <p className="text-[13px] font-medium text-[#6b6b6b]">Abonnement</p>
      <h1 className="mt-1 text-[28px] font-bold text-[#1a1a1a]">
        Freelancer Plus
      </h1>
      <p className="mt-2 max-w-xl text-[15px] leading-6 text-[#555]">
        Ontvang persoonlijke meldingen en zie nieuwe opdrachten als eerste, zodat
        jij de beste leads sneller pakt.
      </p>

      <div className="mt-8 max-w-md rounded-[3px] border border-[#e6e6e6] bg-white p-6 shadow-[0_4px_18px_rgba(0,0,0,0.08)]">
        <p className="text-[13px] font-medium text-[#6b6b6b]">Plus</p>
        <p className="mt-1 text-[28px] font-bold text-[#1a1a1a]">
          € 29,95
          <span className="ml-1 text-[14px] font-normal text-[#6b6b6b]">
            per maand
          </span>
        </p>
        <ul className="mt-5 space-y-2">
          {voordelen.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-[14px] text-[#333]"
            >
              <Check className="size-4 text-[#1d5fd1]" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>
        {heeftPlus ? (
          <p className="mt-6 text-[14px] font-medium text-[#1a1a1a]">
            {bevestigd
              ? "Je hebt Freelancer Plus. Je ontvangt nu persoonlijke meldingen."
              : "Je hebt al Freelancer Plus."}
          </p>
        ) : (
          <Button
            type="button"
            onClick={kopen}
            className="mt-6 h-10 w-full bg-[#1d5fd1] text-[14px] font-medium text-white hover:bg-[#1853b8]"
          >
            Abonnement kopen
          </Button>
        )}
      </div>
    </div>
  );
}
