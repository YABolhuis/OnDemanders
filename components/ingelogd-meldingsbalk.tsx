"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { APP_SHELL } from "@/lib/site-width";

const DISMISS_KEY = "optisend-login-bar-dismissed";

export function IngelogdMeldingsbalk({
  insetClassName,
}: {
  insetClassName?: string;
}) {
  const [zichtbaar, setZichtbaar] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      setZichtbaar(sessionStorage.getItem(DISMISS_KEY) !== "1");
    } catch {
      setZichtbaar(true);
    }
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
    <div className="w-full bg-[#00C878] text-[#171717]">
      <div
        className={`flex min-h-7 items-center justify-between gap-3 py-1 ${
          insetClassName ?? APP_SHELL
        }`}
      >
        <p className="min-w-0 flex-1 text-center text-[12px] font-medium leading-tight">
          Je bent ingelogd. Nieuwe opdrachten in jouw vakgebied staan klaar.{" "}
          <Link
            href="/klussen"
            className="underline underline-offset-2 hover:opacity-80"
          >
            Bekijk opdrachten
          </Link>
        </p>
        <button
          type="button"
          aria-label="Melding sluiten"
          onClick={sluiten}
          className="flex size-6 shrink-0 items-center justify-center text-[#171717] hover:opacity-70"
        >
          <X className="size-3.5" strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}
