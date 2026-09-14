"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import { BerichtComposer } from "@/components/bericht-composer";
import { useCredits } from "@/components/credits-provider";
import type { Klus } from "@/lib/klussen";
import { vakSlugVanKlus } from "@/lib/vakgebieden";

const CHAT_KOST = 10;

export function AdvertentiePagina({ klus }: { klus: Klus }) {
  const router = useRouter();
  const { spendCredits, isChatUnlocked, unlockChat } = useCredits();
  const [chatOpen, setChatOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [bod, setBod] = useState("");
  const [shakeActie, setShakeActie] = useState(false);
  const openTimer = useRef<number | null>(null);
  const unlocked = isChatUnlocked(klus.id);

  useEffect(() => {
    return () => {
      if (openTimer.current != null) {
        window.clearTimeout(openTimer.current);
      }
    };
  }, []);

  function wijsNaarActieKnoppen() {
    setShakeActie(false);
    window.requestAnimationFrame(() => {
      setShakeActie(true);
    });
  }

  function startContact() {
    if (chatOpen) {
      return;
    }

    if (!unlocked) {
      if (!spendCredits(CHAT_KOST)) {
        router.push("/abonement-credits");
        return;
      }
      unlockChat(klus.id);
    }

    setHighlight(true);
    openTimer.current = window.setTimeout(() => {
      setHighlight(false);
      setChatOpen(true);
    }, 1100);
  }

  return (
    <div className="relative min-h-[calc(100vh-57px)] bg-[#fbfbfb] px-14 py-14 text-[#1a1a1a] lg:pr-14">
      <div
        aria-hidden
        className="pointer-events-none absolute top-6 bottom-6 hidden w-px bg-[#e5e7eb] lg:block lg:right-[calc(3.5rem+300px)]"
      />
      <Link
        href={`/klussen/vak/${vakSlugVanKlus(klus)}`}
        className="inline-flex items-center gap-2.5 text-[13px] text-[#222]"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-white">
          <ArrowLeft className="size-4 text-[#6b6b6b]" strokeWidth={2} aria-hidden />
        </span>
        <span className="hover:underline">terug naar opdrachten</span>
      </Link>

      <div className="mt-6 grid grid-cols-1 items-start lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="lg:pr-8">
          <h1 className="max-w-3xl text-[22px] font-medium leading-snug tracking-tight text-[#171717] sm:text-[24px]">
            <span>{klus.titleLead} </span>
            <span className="text-[#8a8a8a]">{klus.titleRest}</span>
          </h1>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eceff1] px-3 py-1.5 text-[13px] text-[#333]">
            <span className="size-1.5 shrink-0 rounded-full bg-[#5b8def]" aria-hidden />
            <span>Geplaatst</span>
            <span className="text-[#555]">{klus.when}</span>
          </p>
          <div className="relative mt-6 border-t border-[#e5e7eb] pt-5 lg:border-t-0">
            <div
              aria-hidden
              className="pointer-events-none absolute top-0 right-[-1.5rem] left-0 hidden h-px bg-[#e5e7eb] lg:block"
            />
            <h2 className="text-[15px] font-medium text-[#555]">Beschrijving</h2>
            <p className="mt-3 pb-16 text-[15px] leading-6 text-[#333]">
              {klus.description}
            </p>
          </div>
        </div>

          <aside className="mt-8 border-t border-[#e5e7eb] pt-6 lg:mt-0 lg:w-[300px] lg:border-t-0 lg:pt-0 lg:pl-8">
            <div
              className={shakeActie ? "groene-shake" : ""}
              onAnimationEnd={() => setShakeActie(false)}
            >
              <div>
                <p className="text-[13px] text-[#777]">Budget</p>
                <p className="text-[20px] font-bold">{klus.price}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={startContact}
                  className="h-11 min-w-0 flex-1 whitespace-nowrap bg-[#16a34a] px-3 font-sans text-[13px] font-medium text-white hover:bg-[#15803d]"
                >
                  Bieden
                </button>
                <button
                  type="button"
                  onClick={startContact}
                  className="h-11 min-w-0 flex-1 whitespace-nowrap bg-[#dc2626] px-3 font-sans text-[13px] font-medium text-white hover:bg-[#b91c1c]"
                >
                  Direct aannemen
                </button>
              </div>
              <p className="mt-2 text-center text-[12px] text-[#555]">
                Deze klus kost {CHAT_KOST} credits
              </p>
              <label className="mt-3 block">
                <span className="sr-only">Jouw bod</span>
                <span className="flex h-11 items-center gap-3 overflow-hidden rounded-[var(--radius-control)] border border-[#e5e7eb] bg-[#fbfbfb] px-3">
                  <span className="text-[15px] font-bold">€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={bod}
                    onChange={(event) => setBod(event.target.value)}
                    placeholder="Jouw bod"
                    className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6]"
                  />
                </span>
              </label>
            </div>

            <div className="mt-5 border-t border-[#e5e7eb] pt-5">
              <h2 className="text-[15px] font-medium text-[#555]">
                Biedingen (0)
              </h2>
              <p className="mt-4 text-center text-[13px] text-[#555]">
                Geen biedingen geplaatst
              </p>
            </div>

            <div className="mt-5 border-t border-[#e5e7eb] pt-5">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]"
                  aria-hidden
                >
                  <User className="size-5 text-[#6a6a6a]" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[#555]">
                    <PlaatsPin />
                    {klus.city}
                    {klus.extra !== "Bezoek website" ? (
                      <span className="text-[#777]">· {klus.extra}</span>
                    ) : (
                      <span className="font-medium text-[#1d5fd1]">· {klus.extra}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-[168px] border-t border-[#e5e7eb] bg-[#eceff1]">
                <iframe
                  title={`Kaart van ${klus.city} in Google Maps`}
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(`${klus.city}, Nederland`)}&z=12&hl=nl&output=embed`}
                  className="size-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </div>
          </aside>
        </div>
      <BerichtComposer
        naam={klus.seller}
        unlocked={unlocked}
        open={chatOpen}
        highlight={highlight}
        onOpenChange={setChatOpen}
        onLockedClick={wijsNaarActieKnoppen}
      />
    </div>
  );
}
