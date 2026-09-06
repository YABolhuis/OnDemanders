"use client";

import { ChevronDown } from "lucide-react";

export function BedrijfsgegevensPagina() {
  return (
    <div className="flex min-h-[calc(100vh-88px)] bg-[#24333d] font-[Arial,Helvetica,sans-serif] text-white">
      <aside className="min-h-[calc(100vh-88px)] w-[280px] shrink-0 border-r border-white/10 bg-[#1b2730] px-4 py-6">
        <p className="mb-4 px-2 text-[13px] font-semibold text-[#9aa8b0]">
          Menu
        </p>
        <nav className="flex flex-col gap-1">
          <span className="rounded-md bg-white/10 px-3 py-2 text-left text-[14px] font-medium text-[#8fd14f]">
            Bedrijfsgegevens
          </span>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 px-8 py-10">
        <form
          className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="w-full shrink-0 lg:w-[250px]">
            <h1 className="text-[20px] font-bold">Bedrijfsregistratie</h1>
            <p className="mt-3 text-[13px] leading-5 text-[#c5ced4]">
              Je bedrijf staat bij ons geregistreerd met deze gegevens. Is er
              iets gewijzigd? Geef het hier aan ons door.
            </p>
          </div>

          <div className="min-w-0 w-full flex-1">
            <div className="grid grid-cols-1 items-end gap-x-8 gap-y-6 md:grid-cols-2">
              <Field label="KvK-nummer" defaultValue="12345678" readOnly />
              <p className="pb-2 text-[13px] leading-5 text-[#c5ced4]">
                KvK-nummer wijzigen?{" "}
                <a
                  href="mailto:yabolhuis.optisend@gmail.com"
                  className="font-medium text-[#e08a3c] hover:underline"
                >
                  Neem contact op
                </a>{" "}
                met de klantenservice.
              </p>

              <Field label="Bedrijfsnaam" defaultValue="Optisend" />
              <Field label="BTW-nummer" defaultValue="NL123456789B01" />

              <Field
                label="Vestigingsadres"
                defaultValue="Zuiderweide 23"
              />
              <Field
                label="Postcode"
                defaultValue="9989CJ"
                className="md:max-w-[200px]"
              />

              <Field label="Vestigingsplaats" defaultValue="Warffum" />
              <label className="block text-[13px] text-[#c5ced4]">
                Land
                <span className="relative mt-1.5 block">
                  <select
                    defaultValue="Nederland"
                    className="h-12 w-full appearance-none rounded-lg border border-[#7f96a6] bg-[#1e2c35] px-4 pr-10 text-[14px] text-white outline-none focus:border-[#8fd14f]"
                  >
                    <option>Nederland</option>
                    <option>België</option>
                    <option>Duitsland</option>
                  </select>
                  <ChevronDown
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-white/70"
                    strokeWidth={2}
                    aria-hidden
                  />
                </span>
              </label>

              <Field
                label="Website (optioneel)"
                placeholder="Vul hier uw website in"
              />
            </div>

            <button
              type="submit"
              className="mt-8 rounded-md bg-[#c06a3a] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#b05e32]"
            >
              Wijzigingen opslaan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  readOnly = false,
  className = "",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  className?: string;
}) {
  return (
    <label className={`block text-[13px] text-[#c5ced4] ${className}`}>
      {label}
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        className="mt-1.5 h-12 w-full rounded-lg border border-[#7f96a6] bg-[#1e2c35] px-4 text-[14px] text-white outline-none placeholder:text-[#8fa0ab] focus:border-[#8fd14f] read-only:cursor-default"
      />
    </label>
  );
}
