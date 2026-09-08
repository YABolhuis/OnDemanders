"use client";

import { useRef, useState } from "react";
import { Paperclip, Send, Smile, User, X } from "lucide-react";

const MAX_LENGTH = 2500;

export function BerichtComposer({ naam }: { naam: string }) {
  const [open, setOpen] = useState(true);
  const [bericht, setBericht] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!open) {
    return null;
  }

  const suggestions = [
    `👋 Hey ${naam}, can you help me with...`,
    "Would it be possible to get a custom offer for...",
    "Do you think you can deliver an order by...",
  ];

  const canSend = bericht.trim().length > 0;

  function voegEmojiToe(emoji: string) {
    setBericht((current) => `${current}${emoji}`.slice(0, MAX_LENGTH));
    setEmojiOpen(false);
  }

  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-[12px] border border-[#e4e5e7] bg-white font-[Arial,Helvetica,sans-serif] shadow-[0_4px_18px_rgba(0,0,0,0.12)]">
      <div className="flex items-start gap-3 px-4 py-3">
        <span className="relative mt-0.5 inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-[#d9d9d9]">
          <User className="size-5 text-[#6a6a6a]" strokeWidth={2} aria-hidden />
          <span
            className="absolute right-0 bottom-0 size-2.5 rounded-full bg-[#b5b6ba] ring-2 ring-white"
            aria-hidden
          />
        </span>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="truncate text-[16px] font-bold text-[#404145]">
            Message {naam}
          </p>
          <p className="mt-0.5 text-[13px] text-[#74767e]">
            Away • Avg. response time: 1 Hour
          </p>
        </div>
        <button
          type="button"
          aria-label="Sluiten"
          onClick={() => setOpen(false)}
          className="mt-0.5 flex size-8 items-center justify-center text-[#74767e] hover:text-[#404145]"
        >
          <X className="size-5" strokeWidth={2} />
        </button>
      </div>

      <hr className="border-0 border-t border-[#e4e5e7]" />

      <div className="px-4 pt-4 pb-3">
        <label className="sr-only" htmlFor="advertentie-bericht">
          Bericht aan {naam}
        </label>
        <textarea
          id="advertentie-bericht"
          value={bericht}
          maxLength={MAX_LENGTH}
          onChange={(event) => setBericht(event.target.value)}
          placeholder={`Ask ${naam} a question or share your project details (requirements, timeline, budget, etc.)`}
          className="min-h-[56px] w-full resize-none border-0 bg-transparent text-[15px] leading-6 text-[#404145] outline-none placeholder:text-[#b2b2b8]"
        />
        {bericht.length === 0 ? (
          <div className="mt-3 flex flex-col items-start gap-2">
            {suggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => setBericht(suggestion)}
                className="max-w-full truncate rounded-full border border-[#e4e5e7] bg-white px-3 py-1.5 text-left text-[13px] text-[#404145] hover:bg-[#f5f5f5]"
              >
                {suggestion}
              </button>
            ))}
          </div>
        ) : null}
        <p className="mt-6 text-right text-[12px] text-[#b2b2b8]">
          {bericht.length}/{MAX_LENGTH}
        </p>
      </div>

      <hr className="border-0 border-t border-[#e4e5e7]" />

      <div className="flex items-center gap-1 px-3 py-2.5">
        <div className="relative">
          <button
            type="button"
            aria-label="Emoji"
            aria-expanded={emojiOpen}
            onClick={() => setEmojiOpen((value) => !value)}
            className="flex size-9 items-center justify-center text-[#74767e] hover:text-[#404145]"
          >
            <Smile className="size-[18px]" strokeWidth={2} />
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
          className="flex size-9 items-center justify-center text-[#74767e] hover:text-[#404145]"
        >
          <Paperclip className="size-[18px]" strokeWidth={2} />
        </button>
        <input ref={fileRef} type="file" className="hidden" />
        <button
          type="button"
          disabled={!canSend}
          onClick={() => setBericht("")}
          className={`ml-auto flex h-9 items-center gap-2 px-3.5 text-[14px] font-semibold ${
            canSend
              ? "bg-[#222325] text-white hover:bg-[#000]"
              : "bg-[#f5f5f5] text-[#b5b6ba]"
          }`}
        >
          <Send className="size-3.5" strokeWidth={2} aria-hidden />
          Send message
        </button>
      </div>
    </div>
  );
}
