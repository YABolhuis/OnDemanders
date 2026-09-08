"use client";

import { useRef, useState } from "react";
import { Paperclip, Send, Smile } from "lucide-react";
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
      className="flex h-full min-h-0 w-full flex-col overflow-hidden rounded-[4px] border border-[#e6e6e6] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
      aria-label={`Chat met ${gesprek.naam}`}
    >
      <header className="flex shrink-0 items-center gap-3 px-6 py-4">
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#dfe5e7] text-[13px] font-medium text-[#54656f]"
          aria-hidden
        >
          {initialen(gesprek.naam)}
        </span>
        <div className="min-w-0">
          <p className="truncate text-[15px] font-medium text-[#111b21]">
            {gesprek.naam}
          </p>
          <p className="text-[12px] text-[#667781]">Bericht</p>
        </div>
      </header>

      <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-white px-6 py-4">
        {berichten.map((bericht) => {
          const vanMij = bericht.van === "ik";
          return (
            <div
              key={bericht.id}
              className={`flex ${vanMij ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[72%] rounded-[4px] px-3.5 py-2.5 text-[13px] leading-5 ${
                  vanMij
                    ? "bg-[#dcf8c6] text-[#111b21]"
                    : "bg-[#f0f2f5] text-[#111b21]"
                }`}
              >
                <p>{bericht.tekst}</p>
                <p
                  className={`mt-1 text-[11px] ${
                    vanMij ? "text-right text-[#5b7a4e]" : "text-[#667781]"
                  }`}
                >
                  {bericht.tijd}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="shrink-0 border-t border-[#e6e6e6] px-4 py-3">
        <form
          className="flex items-end gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            verstuur();
          }}
        >
          <div className="relative">
            <button
              type="button"
              aria-label="Emoji"
              aria-expanded={emojiOpen}
              onClick={() => setEmojiOpen((open) => !open)}
              className="flex size-9 shrink-0 items-center justify-center text-[#74767e] hover:text-[#404145]"
            >
              <Smile className="size-[18px]" strokeWidth={2} aria-hidden />
            </button>
            {emojiOpen ? (
              <div className="absolute bottom-10 left-0 z-10 flex gap-1 rounded-md border border-[#e4e5e7] bg-white p-1.5 shadow-md">
                {["😊", "👍", "👋", "🙏"].map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    className="flex size-8 items-center justify-center text-[16px] hover:bg-[#f5f5f5]"
                    onClick={() => voegEmojiToe(emoji)}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <button
            type="button"
            aria-label="Bijlage"
            onClick={() => fileRef.current?.click()}
            className="flex size-9 shrink-0 items-center justify-center text-[#74767e] hover:text-[#404145]"
          >
            <Paperclip className="size-[18px]" strokeWidth={2} aria-hidden />
          </button>
          <input ref={fileRef} type="file" className="hidden" />
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
            className="min-h-10 max-h-32 flex-1 resize-none border-0 bg-transparent px-2 py-2 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6]"
          />
          <button
            type="submit"
            disabled={tekst.trim().length === 0}
            className={`flex h-9 shrink-0 items-center gap-1.5 px-3 text-[13px] font-medium ${
              tekst.trim().length > 0
                ? "bg-[#222] text-white hover:bg-[#000]"
                : "bg-[#f0f0f0] text-[#b0b0b0]"
            }`}
          >
            <Send className="size-3.5" strokeWidth={2} aria-hidden />
            Versturen
          </button>
        </form>
      </div>
    </section>
  );
}
