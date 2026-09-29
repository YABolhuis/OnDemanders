"use client";

import { useEffect, useState } from "react";
import { sluitTijdVoorKlus } from "@/lib/klussen";

function tweeCijfers(waarde: number) {
  return String(waarde).padStart(2, "0");
}

function splits(resterendMs: number) {
  const total = Math.max(0, Math.floor(resterendMs / 1000));
  return {
    uren: Math.floor(total / 3600),
    minuten: Math.floor((total % 3600) / 60),
    seconden: total % 60,
    gesloten: total <= 0,
    spoed: total > 0 && total < 3600,
  };
}

const LEEG = splits(0);

export function BiedAfteller({ klusId }: { klusId: string }) {
  const [rest, setRest] = useState(LEEG);

  useEffect(() => {
    const einde = sluitTijdVoorKlus(klusId);
    const tick = () => setRest(splits(einde - Date.now()));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [klusId]);

  const titel = rest.gesloten ? "Bieden gesloten" : "Bieden sluit over";

  return (
    <div className="-mx-5 -mt-5 mb-4 border-b border-[#2e2e2e] px-5 pb-3.5 pt-3">
      <p className="mb-2.5 text-center text-[11px] font-medium text-[#9b9b97]">
        {titel}
      </p>
      <div
        className="flex items-start justify-center gap-2"
        role="timer"
        aria-live="polite"
        aria-label={`${titel} ${rest.uren} uren, ${rest.minuten} minuten en ${rest.seconden} seconden`}
      >
        <TijdBlok waarde={rest.uren} label="uren" spoed={rest.spoed} />
        <Scheiding />
        <TijdBlok waarde={rest.minuten} label="minuten" spoed={rest.spoed} />
        <Scheiding />
        <TijdBlok waarde={rest.seconden} label="seconden" spoed={rest.spoed} />
      </div>
    </div>
  );
}

function Scheiding() {
  return (
    <span
      className="mt-px font-mono text-[20px] font-bold leading-none text-[#6b6b6b]"
      aria-hidden
    >
      :
    </span>
  );
}

function TijdBlok({
  waarde,
  label,
  spoed,
}: {
  waarde: number;
  label: string;
  spoed: boolean;
}) {
  return (
    <div className="flex min-w-[3.4rem] flex-col items-center">
      <span
        className={`font-mono text-[22px] font-bold tabular-nums leading-none ${
          spoed ? "text-[#f87171]" : "text-[#e8e8e6]"
        }`}
      >
        {tweeCijfers(waarde)}
      </span>
      <span className="mt-1.5 text-[10px] uppercase tracking-wider text-[#9b9b97]">
        {label}
      </span>
    </div>
  );
}
