"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

const veld =
  "mt-1.5 h-10 w-full rounded-lg border border-[#3a3a3a] bg-transparent px-3 text-[14px] text-[#e8e8e6] outline-none placeholder:text-[#6b6b6b] focus:border-[#5a5a5a]";

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
          <label className="text-[13px] text-[#e8e8e6]">
            Voornaam
            <input
              name="voornaam"
              type="text"
              autoComplete="given-name"
              required
              placeholder="Voornaam"
              className={veld}
            />
          </label>
          <label className="mt-3.5 text-[13px] text-[#e8e8e6]">
            Achternaam
            <input
              name="achternaam"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Achternaam"
              className={veld}
            />
          </label>
          <label className="mt-3.5 text-[13px] text-[#e8e8e6]">
            Zakelijk e-mailadres
            <input
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Zakelijk e-mailadres"
              className={veld}
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
