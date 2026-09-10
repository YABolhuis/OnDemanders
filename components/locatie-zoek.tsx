"use client";

import { useEffect, useRef, useState } from "react";

export function LocatieZoek({
  value,
  onChange,
  onderdrukt = false,
  onTyp,
}: {
  value: string;
  onChange: (waarde: string) => void;
  onderdrukt?: boolean;
  onTyp?: () => void;
}) {
  const [voorstellen, setVoorstellen] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [laden, setLaden] = useState(false);
  const verzoekRef = useRef(0);

  useEffect(() => {
    const term = value.trim();
    if (term.length < 2) {
      setVoorstellen([]);
      setLaden(false);
      return;
    }

    const id = window.setTimeout(async () => {
      const volgnummer = ++verzoekRef.current;
      setLaden(true);
      try {
        const antwoord = await fetch(
          `/api/plaatsen?q=${encodeURIComponent(term)}`
        );
        const data = (await antwoord.json()) as { plaatsen?: string[] };
        if (volgnummer !== verzoekRef.current) {
          return;
        }
        setVoorstellen(data.plaatsen ?? []);
        setOpen(true);
      } catch {
        if (volgnummer === verzoekRef.current) {
          setVoorstellen([]);
        }
      } finally {
        if (volgnummer === verzoekRef.current) {
          setLaden(false);
        }
      }
    }, 250);

    return () => window.clearTimeout(id);
  }, [value]);

  const toonLijst = open && !onderdrukt && value.trim().length >= 2;

  return (
    <div className="relative mb-2">
      <input
        type="text"
        value={value}
        onChange={(event) => {
          onTyp?.();
          onChange(event.target.value);
          setOpen(true);
        }}
        onFocus={() => {
          if (voorstellen.length > 0) {
            setOpen(true);
          }
        }}
        placeholder="Locatie"
        aria-label="Locatie"
        aria-autocomplete="list"
        autoComplete="off"
        className="h-9 w-full rounded-[3px] border border-[#d0d0d0] bg-white px-2 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
      />
      {toonLijst ? (
        <ul
          role="listbox"
          className="absolute top-full right-0 left-0 z-50 mt-1 max-h-52 overflow-y-auto rounded-[3px] border border-[#e6e6e6] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
        >
          {laden && voorstellen.length === 0 ? (
            <li className="px-3 py-2 text-[13px] text-[#6b6b6b]">Zoeken…</li>
          ) : voorstellen.length === 0 ? (
            <li className="px-3 py-2 text-[13px] text-[#6b6b6b]">
              Geen plaats gevonden
            </li>
          ) : (
            voorstellen.map((plaats) => (
              <li key={plaats}>
                <button
                  type="button"
                  role="option"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => {
                    onChange(plaats);
                    setOpen(false);
                    setVoorstellen([]);
                  }}
                  className="flex w-full px-3 py-2 text-left text-[13px] text-[#222] hover:bg-[#f5f7fa]"
                >
                  {plaats}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
