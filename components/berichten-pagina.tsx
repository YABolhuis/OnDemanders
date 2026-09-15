"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BellOff,
  MoreVertical,
  Plus,
  Search,
  X,
} from "lucide-react";
import { BerichtenLijst } from "@/components/berichten-lijst";
import { BerichtenVenster } from "@/components/berichten-venster";
import { gesprekken, gesprekOpId } from "@/lib/berichten";
import {
  abonneerNotificaties,
  BERICHT_NOTIFICATIE_ID,
  leesNotificatie,
  schrijfNotificatie,
} from "@/lib/notificaties";

type FilterId = "alle" | "ongelezen" | "favorieten" | "groepen";

const DISMISS_KEY = "optisend-wa-banner-dismissed";

const vakBox =
  "flex min-h-0 min-w-0 flex-col overflow-hidden rounded-[16px] border border-[#2e2e2e] bg-[#1c1c1c] p-5";

export function BerichtenPagina() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterId>("alle");
  const [zoek, setZoek] = useState("");
  const [meldingenAan, setMeldingenAan] = useState(true);
  const [bannerWeg, setBannerWeg] = useState(false);
  const gesprek = selectedId ? gesprekOpId(selectedId) : null;

  useEffect(() => {
    function lees() {
      setMeldingenAan(leesNotificatie(BERICHT_NOTIFICATIE_ID, true));
      try {
        setBannerWeg(sessionStorage.getItem(DISMISS_KEY) === "1");
      } catch {
        /* ignore */
      }
    }
    lees();
    return abonneerNotificaties(lees);
  }, []);

  const ongelezenChats = gesprekken.filter((item) => item.ongelezen > 0).length;

  const zichtbareGesprekken = useMemo(() => {
    const term = zoek.trim().toLowerCase();
    return gesprekken.filter((item) => {
      if (filter === "favorieten" && !item.favoriet) {
        return false;
      }
      if (filter === "ongelezen" && item.ongelezen === 0) {
        return false;
      }
      if (filter === "groepen") {
        return false;
      }
      if (term && !`${item.naam} ${item.bericht}`.toLowerCase().includes(term)) {
        return false;
      }
      return true;
    });
  }, [filter, zoek]);

  const chips = [
    { id: "alle" as const, label: "Alle" },
    {
      id: "ongelezen" as const,
      label: ongelezenChats > 0 ? `Ongelezen ${ongelezenChats}` : "Ongelezen",
    },
    { id: "favorieten" as const, label: "Favorieten" },
    { id: "groepen" as const, label: "Groepen" },
  ];

  function zetMeldingenAan() {
    schrijfNotificatie(BERICHT_NOTIFICATIE_ID, true);
    setMeldingenAan(true);
  }

  function sluitBanner() {
    setBannerWeg(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  const toonBanner = !meldingenAan && !bannerWeg;

  return (
    <div className="grid h-full min-h-0 min-w-0 flex-1 grid-cols-[440px_minmax(0,1fr)] gap-5">
      <aside className={vakBox}>
        <div className="wa-list flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg">
          <div className="flex h-[60px] shrink-0 items-center gap-2 px-4">
            <h1 className="min-w-0 flex-1 truncate text-[22px] font-semibold">
              Berichten
            </h1>
            <button
              type="button"
              aria-label="Meer"
              className="wa-reset inline-flex size-10 items-center justify-center"
              style={{ color: "var(--wa-icon)" }}
            >
              <MoreVertical className="size-5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="px-3 pb-2">
            <div className="relative">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6b6b6b]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={zoek}
                onChange={(event) => setZoek(event.target.value)}
                placeholder="Zoek of start een nieuw gesprek"
                aria-label="Zoek of start een nieuw gesprek"
                className="wa-reset h-10 w-full rounded-[16px] border border-[#2e2e2e] bg-[#1c1c1c] pr-3 pl-10 text-[14px] text-[#e8e8e6] outline-none placeholder:text-[#6b6b6b] focus:border-[#5a5a5a]"
              />
            </div>
            <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {chips.map((chip) => {
                const aan = filter === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setFilter(chip.id)}
                    className={`wa-chip wa-reset h-8 shrink-0 px-3 text-[13px] ${
                      aan ? "wa-chip-on" : "wa-chip-off"
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
              <button
                type="button"
                aria-label="Meer filters"
                className="wa-chip wa-chip-off wa-reset flex size-8 shrink-0 items-center justify-center"
              >
                <Plus className="size-4" strokeWidth={2} />
              </button>
            </div>
          </div>

          {toonBanner ? (
            <div className="wa-banner mx-3 mb-2 flex items-start gap-3 rounded-lg px-3 py-3 text-[#e9edef]">
              <BellOff className="mt-0.5 size-5 shrink-0" strokeWidth={1.75} />
              <p className="min-w-0 flex-1 text-[14px] leading-5">
                Berichtmeldingen staan uit.{" "}
                <button
                  type="button"
                  onClick={zetMeldingenAan}
                  className="wa-reset font-medium text-[#25d366] underline-offset-2 hover:underline"
                >
                  Zet aan
                </button>
              </p>
              <button
                type="button"
                aria-label="Melding sluiten"
                onClick={sluitBanner}
                className="wa-reset inline-flex size-7 shrink-0 items-center justify-center text-[#e9edef]"
              >
                <X className="size-4" strokeWidth={2} />
              </button>
            </div>
          ) : null}

          <div className="min-h-0 flex-1 overflow-y-auto">
            <BerichtenLijst
              gesprekken={zichtbareGesprekken}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </aside>
      <main className={vakBox}>
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-lg bg-[#fbfbfb]">
          {gesprek ? (
            <div className="flex h-full min-h-0 w-full min-w-0 flex-col">
              <BerichtenVenster key={gesprek.id} gesprek={gesprek} />
            </div>
          ) : (
            <p className="m-auto text-[13px] text-[#667781]">
              Kies een gesprek in de lijst links.
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
