"use client";

import { useEffect, useRef, useState } from "react";
import {
  CheckCheck,
  MoreVertical,
  Paperclip,
  Search,
  Smile,
} from "lucide-react";
import type { Gesprek } from "@/lib/berichten";

function initialen(naam: string) {
  return naam
    .split(" ")
    .slice(0, 2)
    .map((deel) => deel[0])
    .join("")
    .toUpperCase();
}

export function BerichtenVenster({ gesprek }: { gesprek: Gesprek }) {
  const [tekst, setTekst] = useState("");
  const [berichten, setBerichten] = useState(gesprek.berichten);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const eindeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    eindeRef.current?.scrollIntoView({ block: "end" });
  }, [berichten]);

  function voegEmojiToe(emoji: string) {
    setTekst((huidig) => `${huidig}${emoji}`);
    setEmojiOpen(false);
  }

  function verstuur() {
    const inhoud = tekst.trim();
    if (!inhoud) {
      return;
    }
    setBerichten((huidig) => [
      ...huidig,
      {
        id: `${gesprek.id}-${huidig.length + 1}`,
        van: "ik",
        tekst: inhoud,
        tijd: "Nu",
      },
    ]);
    setTekst("");
  }

  return (
    <section
      className="wa-chat flex h-full min-h-0 w-full flex-col overflow-hidden"
      aria-label={`Chat met ${gesprek.naam}`}
    >
      <header className="flex h-[60px] shrink-0 items-center gap-3 border-b border-[#2e2e2e] bg-[#1c1c1c] px-4">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full text-[14px] font-medium"
          style={{ background: "color-mix(in srgb, var(--wa-icon) 22%, transparent)", color: "var(--wa-icon)" }}
          aria-hidden
        >
          {initialen(gesprek.naam)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[16px] font-medium" style={{ color: "var(--wa-text)" }}>
            {gesprek.naam}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-0.5" style={{ color: "var(--wa-icon)" }}>
          <button type="button" aria-label="Zoeken in chat" className="wa-reset inline-flex size-10 items-center justify-center">
            <Search className="size-5" strokeWidth={1.75} />
          </button>
          <button type="button" aria-label="Meer" className="wa-reset inline-flex size-10 items-center justify-center">
            <MoreVertical className="size-5" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <div className="wa-thread relative flex min-h-0 flex-1 flex-col">
        <div className="relative min-h-0 flex-1 overflow-y-auto px-8 py-3">
          {berichten.map((bericht, index) => {
            const vanMij = bericht.van === "ik";
            const grouped = index > 0 && berichten[index - 1].van === bericht.van;
            return (
              <div
                key={bericht.id}
                className={`flex ${vanMij ? "justify-end" : "justify-start"} ${
                  grouped ? "mt-0.5" : "mt-3"
                }`}
              >
                <div
                  className={`wa-bubble ${
                    vanMij ? "wa-bubble-out" : "wa-bubble-in"
                  } ${grouped ? "wa-grouped" : ""}`}
                >
                  {bericht.citaat ? (
                    <div
                      className="mb-1 overflow-hidden rounded-[6px] py-1.5 pr-2 pl-2"
                      style={{
                        background: "var(--wa-quote-bg)",
                        borderLeft: "4px solid var(--wa-quote)",
                      }}
                    >
                      <p
                        className="text-[13px] font-medium"
                        style={{ color: "var(--wa-quote)" }}
                      >
                        {bericht.citaat.label}
                      </p>
                      <p
                        className="mt-0.5 line-clamp-2 text-[13px]"
                        style={{ color: "var(--wa-muted)" }}
                      >
                        {bericht.citaat.tekst}
                      </p>
                    </div>
                  ) : null}
                  <span className="wa-bubble-meta">
                    <span>{bericht.tijd}</span>
                    {vanMij ? (
                      <CheckCheck
                        className="ml-1 inline-block size-3.5 align-[-2px]"
                        strokeWidth={2}
                        style={{ color: "var(--wa-tick)" }}
                        aria-label="Gelezen"
                      />
                    ) : null}
                  </span>
                  <span>{bericht.tekst}</span>
                </div>
              </div>
            );
          })}
          <div ref={eindeRef} />
        </div>

        <form
          className="relative flex shrink-0 items-center gap-2 px-3 pt-1 pb-3"
          onSubmit={(event) => {
            event.preventDefault();
            verstuur();
          }}
        >
          <div className="wa-composer flex min-w-0 flex-1 items-center gap-1 py-1 pr-2 pl-1.5">
            <button
              type="button"
              aria-label="Bijlage"
              onClick={() => fileRef.current?.click()}
              className="wa-reset inline-flex size-10 shrink-0 items-center justify-center"
              style={{ color: "var(--wa-icon)" }}
            >
              <Paperclip className="size-5" strokeWidth={1.75} />
            </button>
            <div className="relative">
              <button
                type="button"
                aria-label="Emoji"
                aria-expanded={emojiOpen}
                onClick={() => setEmojiOpen((open) => !open)}
                className="wa-reset inline-flex size-10 shrink-0 items-center justify-center"
                style={{ color: "var(--wa-icon)" }}
              >
                <Smile className="size-5" strokeWidth={1.75} />
              </button>
              {emojiOpen ? (
                <div
                  className="absolute bottom-11 left-0 z-10 flex gap-1 rounded-xl p-1.5 shadow-lg"
                  style={{ background: "var(--wa-header)" }}
                >
                  {["😊", "👍", "👋", "🙏"].map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      className="wa-reset inline-flex size-8 items-center justify-center text-[16px]"
                      onClick={() => voegEmojiToe(emoji)}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <label className="sr-only" htmlFor="chat-bericht">
              Bericht aan {gesprek.naam}
            </label>
            <textarea
              id="chat-bericht"
              value={tekst}
              onChange={(event) => setTekst(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  verstuur();
                }
              }}
              rows={1}
              placeholder="Typ een bericht"
              className="wa-reset max-h-24 min-h-10 min-w-0 flex-1 resize-none border-0 bg-transparent py-2.5 text-[15px] outline-none"
              style={{ color: "var(--wa-text)" }}
            />
            <input ref={fileRef} type="file" className="hidden" />
            <button
              type="submit"
              aria-label="Versturen"
              className="wa-reset ml-1 inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-[#006239] text-white shadow-[inset_0_0_0_1px_#138253]"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4 translate-x-px"
                fill="currentColor"
                aria-hidden
              >
                <path d="M3.4 20.2 21 12 3.4 3.8l.1 6.4L15 12 3.5 13.8z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
