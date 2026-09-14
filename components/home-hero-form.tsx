"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const veld =
  "h-10 w-full rounded-lg border border-[#3a3a3a] bg-transparent px-3 text-[14px] text-[#e8e8e6] outline-none placeholder:text-[#6b6b6b] focus:border-[#5a5a5a]";

const vakgebieden = [
  "Aannemer",
  "Badkamer specialist",
  "Behangers",
  "Dakdekker",
  "Domotica specialist",
  "Elektricien",
  "Gevelspecialist",
  "Glaszetter",
  "Hovenier",
  "Installatiebedrijf",
  "Isolatiebedrijf",
  "Keukenmonteur",
  "Klusbedrijf",
  "Kozijnspecialist",
  "Loodgieter",
  "Metselaar",
  "Ontwerper",
  "Schilder",
  "Schoonmaakbedrijf",
] as const;

export function HomeHeroForm() {
  const [verzonden, setVerzonden] = useState(false);

  function verstuur(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setVerzonden(true);
  }

  return (
    <div className="w-full lg:max-w-[360px] lg:justify-self-end">
      <div className="rounded-[16px] border border-[#2e2e2e] bg-[#1c1c1c] p-5">
      {verzonden ? (
        <p className="py-10 text-center text-[14px] leading-6 text-[#c5c5c3]">
          Bedankt. We hebben je gegevens ontvangen en nemen contact met je op.
        </p>
      ) : (
        <form className="flex flex-col" onSubmit={verstuur}>
          <div>
            <p className="text-[13px] text-[#e8e8e6]">Naam</p>
            <div className="mt-1.5 grid grid-cols-2 gap-2">
              <input
                name="voornaam"
                type="text"
                autoComplete="given-name"
                required
                aria-label="Voornaam"
                placeholder="Voornaam"
                className={veld}
              />
              <div className="relative min-w-0">
                <select
                  name="vakgebied"
                  required
                  defaultValue=""
                  aria-label="Vakgebied"
                  className={`${veld} appearance-none truncate pr-8 text-[#6b6b6b] valid:text-[#e8e8e6]`}
                >
                  <option value="" disabled>
                    Vakgebied
                  </option>
                  {vakgebieden.map((vak) => (
                    <option key={vak} value={vak} className="text-[#171717]">
                      {vak}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-[#9b9b97]"
                  strokeWidth={1.75}
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <label className="mt-3.5 text-[13px] text-[#e8e8e6]">
            E-mailadres
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="E-mailadres"
              className={`mt-1.5 ${veld}`}
            />
          </label>
          <label className="mt-3.5 text-[13px] text-[#e8e8e6]">
            Telefoonnummer
            <input
              name="telefoonnummer"
              type="tel"
              autoComplete="tel"
              required
              placeholder="Telefoonnummer"
              className={`mt-1.5 ${veld}`}
            />
          </label>
          <div className="mt-5 border-t border-[#2e2e2e] pt-4">
            <button
              type="submit"
              className="h-10 w-full rounded-[var(--radius-control)] bg-[#16a34a] text-[14px] font-medium text-white hover:bg-[#15803d]"
            >
              Sign up for free
            </button>
          </div>
          <p className="mt-3 text-[12px] leading-5 text-[#9b9b97]">
            Door dit formulier te versturen bevestig ik dat ik het{" "}
            <Link href="/privacy" className="font-medium text-[#e8e8e6] underline-offset-2 hover:underline">
              privacybeleid
            </Link>{" "}
            heb gelezen.
          </p>
        </form>
      )}
      </div>
    </div>
  );
}
