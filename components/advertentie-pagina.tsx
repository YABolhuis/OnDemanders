"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, User } from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import { BiedAfteller } from "@/components/bied-afteller";
import { BerichtComposer } from "@/components/bericht-composer";
import { useCredits } from "@/components/credits-provider";
import type { Klus } from "@/lib/klussen";
import { vakSlugVanKlus } from "@/lib/vakgebieden";

const CHAT_KOST = 10;

const AdvertentieKaart = dynamic(
  () =>
    import("@/components/advertentie-kaart").then((mod) => mod.AdvertentieKaart),
  {
    ssr: false,
    loading: () => <div className="size-full bg-[#eceff1]" />,
  }
);

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
    <div className="relative min-h-[calc(100vh-57px)] ingelogd-canvas px-14 py-14 text-[#1a1a1a] lg:pr-14">
      <Link
        href={`/klussen/vak/${vakSlugVanKlus(klus)}`}
        className="inline-flex items-center gap-2.5 text-[13px] text-[#222]"
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-white">
          <ArrowLeft className="size-4 text-[#6b6b6b]" strokeWidth={2} aria-hidden />
        </span>
        <span className="hover:underline">terug naar opdrachten</span>
      </Link>

      <div className="mt-6 grid grid-cols-1 items-start lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-10">
        <div>
          <h1 className="max-w-3xl text-[22px] font-medium leading-snug tracking-tight text-[#171717] sm:text-[24px]">
            <span>{klus.titleLead} </span>
            <span className="text-[#8a8a8a]">{klus.titleRest}</span>
          </h1>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#eceff1] px-3 py-1.5 text-[13px] text-[#333]">
            <span className="size-1.5 shrink-0 rounded-full bg-[#5b8def]" aria-hidden />
            <span>Geplaatst</span>
            <span className="text-[#555]">{klus.when}</span>
          </p>
          <div className="mt-6">
            <h2 className="text-[15px] font-medium text-[#555]">Beschrijving</h2>
            <p className="mt-3 pb-16 text-[15px] leading-6 text-[#333]">
              {klus.description}
            </p>
          </div>
        </div>

          <aside className="mt-8 lg:mt-0 lg:w-[300px]">
            <div
              className={`rounded-[16px] border border-[#2e2e2e] bg-[#1c1c1c] p-5 ${shakeActie ? "groene-shake" : ""}`}
              onAnimationEnd={() => setShakeActie(false)}
            >
              <BiedAfteller klusId={klus.id} />
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[13px] text-[#9b9b97]">Budget</p>
                  <p className="text-[20px] font-bold text-[#e8e8e6]">{klus.price}</p>
                </div>
                <p className="pt-0.5 text-right text-[12px] text-[#9b9b97]">
                  Deze klus kost {CHAT_KOST} credits
                </p>
              </div>
              <div className="mt-4 flex w-full items-center gap-2">
                <button
                  type="button"
                  onClick={startContact}
                  className="ad-cta inline-flex h-9 min-w-0 flex-1 items-center justify-center bg-[#006239] px-5 font-sans text-[14px] font-medium whitespace-nowrap text-white shadow-[inset_0_0_0_1px_#138253] hover:bg-[#007548]"
                >
                  Bieden
                </button>
                <button
                  type="button"
                  onClick={startContact}
                  className="ad-cta inline-flex h-9 shrink-0 items-center justify-center bg-[#dc2626] px-4 font-sans text-[14px] font-medium whitespace-nowrap text-white shadow-[inset_0_0_0_1px_#ef4444] hover:bg-[#b91c1c]"
                >
                  Direct aannemen
                </button>
              </div>
              <label className="mt-4 block">
                <span className="sr-only">Jouw bod</span>
                <span className="flex h-10 items-center gap-3 overflow-hidden rounded-lg border border-[#3a3a3a] bg-transparent px-3">
                  <span className="text-[15px] font-bold text-[#e8e8e6]">€</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={bod}
                    onChange={(event) => setBod(event.target.value)}
                    placeholder="Jouw bod"
                    className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#e8e8e6] outline-none placeholder:text-[#6b6b6b]"
                  />
                </span>
              </label>
              <div className="mt-5">
                <h2 className="text-[15px] font-medium text-[#e8e8e6]">
                  Biedingen (0)
                </h2>
                <p className="mt-1.5 text-[13px] text-[#9b9b97]">
                  Geen biedingen geplaatst
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-[16px] border border-[#2e2e2e] bg-[#1c1c1c] p-5">
              <div className="flex items-center gap-3">
                <span
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#2a2a2a]"
                  aria-hidden
                >
                  <User className="size-5 text-[#9b9b97]" strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-[13px] text-[#9b9b97]">
                    <PlaatsPin />
                    {klus.city}
                    {klus.extra !== "Bezoek website" ? (
                      <span>· {klus.extra}</span>
                    ) : (
                      <span className="font-medium text-[#1d5fd1]">· {klus.extra}</span>
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-4 h-[120px] overflow-hidden rounded-lg">
                <AdvertentieKaart stad={klus.city} />
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
