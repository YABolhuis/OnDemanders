"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, User } from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import { BerichtComposer } from "@/components/bericht-composer";
import { useCredits } from "@/components/credits-provider";
import type { Klus } from "@/lib/klussen";

const CHAT_KOST = 1;

export function AdvertentiePagina({ klus }: { klus: Klus }) {
  const router = useRouter();
  const { spendCredits, isChatUnlocked, unlockChat } = useCredits();
  const [saved, setSaved] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [highlight, setHighlight] = useState(false);
  const [shakeGroen, setShakeGroen] = useState(false);
  const openTimer = useRef<number | null>(null);
  const unlocked = isChatUnlocked(klus.id);

  useEffect(() => {
    return () => {
      if (openTimer.current != null) {
        window.clearTimeout(openTimer.current);
      }
    };
  }, []);

  function wijsNaarGroeneKnop() {
    setShakeGroen(false);
    window.requestAnimationFrame(() => {
      setShakeGroen(true);
    });
  }

  function directReageren() {
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
    <div className="flex min-h-[calc(100vh-88px)] flex-col bg-white font-[Arial,Helvetica,sans-serif] lg:flex-row lg:items-stretch">
      <div className="flex min-h-[calc(100vh-88px)] min-w-0 flex-1 flex-col px-6 py-6">
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
        <p className="mt-5 max-w-2xl pb-24 text-[15px] leading-6 text-[#333]">
          {klus.description}
        </p>
        <BerichtComposer
          naam={klus.seller}
          unlocked={unlocked}
          open={chatOpen}
          highlight={highlight}
          onOpenChange={setChatOpen}
          onLockedClick={wijsNaarGroeneKnop}
        />
      </div>

      <aside className="w-full shrink-0 border-[#e6e6e6] lg:w-[320px] lg:border-l">
        <div className="border-b border-[#e6e6e6] px-5 py-5">
          <button
            type="button"
            onClick={directReageren}
            onAnimationEnd={() => setShakeGroen(false)}
            className={`flex h-8 w-full items-center justify-center rounded-[var(--radius-control)] bg-[#14a800] px-3 text-[13px] font-semibold text-white hover:bg-[#108a00] ${
              shakeGroen ? "groene-shake" : ""
            }`}
          >
            Direct reageren
          </button>
          {!unlocked ? (
            <p className="mt-1.5 text-center text-[11px] text-[#777]">
              Kost {CHAT_KOST} credit
            </p>
          ) : null}
          <button
            type="button"
            aria-pressed={saved}
            onClick={() => setSaved((value) => !value)}
            className="mt-2 flex h-8 w-full items-center justify-center gap-1.5 rounded-[var(--radius-control)] border border-[#14a800] bg-white px-3 text-[13px] font-semibold text-[#14a800] hover:bg-[#14a800]/5"
          >
            <Heart
              className={`size-3.5 ${saved ? "fill-[#14a800]" : ""}`}
              strokeWidth={2}
              aria-hidden
            />
            {saved ? "Advertentie bewaard" : "Advertentie bewaren"}
          </button>
        </div>
        <div className="flex items-start gap-3 px-5 py-5">
          <span
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]"
            aria-hidden
          >
            <User className="size-5 text-[#6a6a6a]" strokeWidth={2} />
          </span>
          <div className="min-w-0">
            <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
            <p className="mt-1 flex items-center gap-1 text-[13px] text-[#555]">
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
      </aside>
    </div>
  );
}
