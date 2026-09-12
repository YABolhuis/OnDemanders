"use client";

import { useRef, useState } from "react";
import { ChevronDown, FileText, Upload, X } from "lucide-react";

type Tab = "gegevens" | "facturatie" | "documenten";

const tabs: { id: Tab; label: string }[] = [
  { id: "gegevens", label: "Bedrijfsgegevens" },
  { id: "facturatie", label: "Facturatiegegevens" },
  { id: "documenten", label: "Documenten" },
];

type DocumentSlot = {
  id: string;
  titel: string;
  beschrijving: string;
};

const documenten: DocumentSlot[] = [
  {
    id: "kvk",
    titel: "Recent KvK-uittreksel",
    beschrijving:
      "Upload een uittreksel van de Kamer van Koophandel dat niet ouder is dan drie maanden (PDF of afbeelding, max. 10MB).",
  },
  {
    id: "betalingsgedrag",
    titel: "Verklaring betalingsgedrag",
    beschrijving:
      "Upload een recente verklaring betalingsgedrag van de Belastingdienst (PDF of afbeelding, max. 10MB).",
  },
];

export function BedrijfsgegevensPagina() {
  const [tab, setTab] = useState<Tab>("gegevens");
  const [bestanden, setBestanden] = useState<Record<string, File | null>>({
    kvk: null,
    betalingsgedrag: null,
  });

  function onBestand(id: string, file: File | null) {
    if (file && file.size > 10 * 1024 * 1024) {
      return;
    }
    setBestanden((huidig) => ({ ...huidig, [id]: file }));
  }

  return (
    <div className="flex min-h-[calc(100vh-57px)] bg-[#fbfbfb] text-[#1a1a1a]">
      <aside className="site-rail min-h-[calc(100vh-57px)] w-[280px] shrink-0 border-r border-[#e6e6e6] bg-[#fbfbfb] px-4 py-6">
        <p className="mb-4 px-2 text-[13px] font-semibold text-[#6b6b6b]">
          Menu
        </p>
        <nav className="flex flex-col gap-1">
          <span className="rounded-md bg-[#eceff1] px-3 py-2 text-left text-[14px] font-medium text-[#1a1a1a]">
            Bedrijfsgegevens
          </span>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 px-8 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px] font-bold">Bedrijfsgegevens</h1>
          <p className="mt-1 text-[15px] text-[#555]">
            Deze gegevens worden gebruikt op je profiel en op facturen.
          </p>

          <div className="mt-8 flex gap-8 border-b border-[#e6e6e6]">
            {tabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`pb-3 text-[15px] ${
                  tab === item.id
                    ? "border-b-2 border-[#1a1a1a] font-medium text-[#1a1a1a]"
                    : "text-[#555]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {tab === "gegevens" ? (
            <BedrijfsregistratieForm />
          ) : tab === "facturatie" ? (
            <FacturatieForm />
          ) : (
            <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
              <div className="w-full shrink-0 lg:w-[250px]">
                <h2 className="text-[20px] font-bold">Documenten</h2>
                <p className="mt-3 text-[13px] leading-5 text-[#555]">
                  Lever hier een recent KvK-uittreksel en een verklaring
                  betalingsgedrag aan. Zonder deze stukken kunnen we je bedrijf
                  niet volledig verifiëren.
                </p>
              </div>
              <div className="flex min-w-0 w-full flex-1 flex-col gap-5">
                {documenten.map((item) => (
                  <DocumentUpload
                    key={item.id}
                    item={item}
                    bestand={bestanden[item.id] ?? null}
                    onBestand={(file) => onBestand(item.id, file)}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function BedrijfsregistratieForm() {
  return (
    <form
      className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="w-full shrink-0 lg:w-[250px]">
        <h2 className="text-[20px] font-bold">Bedrijfsregistratie</h2>
        <p className="mt-3 text-[13px] leading-5 text-[#555]">
          Je bedrijf staat bij ons geregistreerd met deze gegevens. Is er iets
          gewijzigd? Geef het hier aan ons door.
        </p>
      </div>

      <div className="min-w-0 w-full flex-1">
        <div className="grid grid-cols-1 items-end gap-x-8 gap-y-6 md:grid-cols-2">
          <Field label="KvK-nummer" defaultValue="12345678" readOnly />
          <p className="pb-2 text-[13px] leading-5 text-[#555]">
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

          <Field label="Vestigingsadres" defaultValue="Zuiderweide 23" />
          <Field
            label="Postcode"
            defaultValue="9989CJ"
            className="md:max-w-[200px]"
          />

          <Field label="Vestigingsplaats" defaultValue="Warffum" />
          <label className="block text-[13px] text-[#555]">
            Land
            <span className="relative mt-1.5 block">
              <select
                defaultValue="Nederland"
                className="h-12 w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 pr-10 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
              >
                <option>Nederland</option>
                <option>België</option>
                <option>Duitsland</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6b6b6b]"
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
  );
}

function FacturatieForm() {
  return (
    <form
      className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
      onSubmit={(event) => event.preventDefault()}
    >
      <div className="w-full shrink-0 lg:w-[250px]">
        <h2 className="text-[20px] font-bold">Facturatiegegevens</h2>
        <p className="mt-3 text-[13px] leading-5 text-[#555]">
          Deze gegevens gebruiken we voor facturen en uitbetalingen. Controleer
          of IBAN en factuuradres kloppen.
        </p>
      </div>

      <div className="min-w-0 w-full flex-1">
        <div className="grid grid-cols-1 items-end gap-x-8 gap-y-6 md:grid-cols-2">
          <Field
            label="Factuur-e-mailadres"
            defaultValue="yabolhuis.optisend@gmail.com"
            type="email"
          />
          <label className="block text-[13px] text-[#555]">
            Betalingstermijn
            <span className="relative mt-1.5 block">
              <select
                defaultValue="14 dagen"
                className="h-12 w-full appearance-none rounded-lg border border-[#e5e7eb] bg-white px-4 pr-10 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
              >
                <option>14 dagen</option>
                <option>30 dagen</option>
                <option>60 dagen</option>
              </select>
              <ChevronDown
                className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6b6b6b]"
                strokeWidth={2}
                aria-hidden
              />
            </span>
          </label>
          <Field label="IBAN" defaultValue="NL12 ABNA 0123 4567 89" />
          <Field label="Tenaamstelling" defaultValue="Optisend" />
          <Field
            label="Factuuradres"
            defaultValue="Zuiderweide 23"
            className="md:col-span-2"
          />
          <Field label="Postcode" defaultValue="9989CJ" />
          <Field label="Plaats" defaultValue="Warffum" />
          <Field
            label="Extra vermelding op factuur (optioneel)"
            placeholder="Bijvoorbeeld inkoopordernummer"
            className="md:col-span-2"
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
  );
}

function DocumentUpload({
  item,
  bestand,
  onBestand,
}: {
  item: DocumentSlot;
  bestand: File | null;
  onBestand: (file: File | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="rounded-lg border border-[#e5e7eb] bg-white px-5 py-4">
      <h3 className="text-[15px] font-semibold">{item.titel}</h3>
      <p className="mt-1 text-[13px] leading-5 text-[#555]">
        {item.beschrijving}
      </p>
      <input
        ref={inputRef}
        type="file"
        accept="application/pdf,image/*"
        className="hidden"
        onChange={(event) => {
          onBestand(event.target.files?.[0] ?? null);
          event.target.value = "";
        }}
      />
      {bestand ? (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-md bg-[#f5f5f5] px-3 py-2">
          <span className="flex min-w-0 items-center gap-2 text-[13px]">
            <FileText className="size-4 shrink-0 text-[#8fd14f]" strokeWidth={2} />
            <span className="truncate">{bestand.name}</span>
          </span>
          <button
            type="button"
            aria-label={`${item.titel} verwijderen`}
            onClick={() => onBestand(null)}
            className="shrink-0 text-[#555] hover:text-[#1a1a1a]"
          >
            <X className="size-4" strokeWidth={2} />
          </button>
        </div>
      ) : (
        <p className="mt-3 text-[13px] text-[#6b6b6b]">Nog geen bestand gekozen.</p>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-[#d0d0d0] px-4 py-2 text-[14px] hover:bg-[#eceff1]"
      >
        <Upload className="size-4" strokeWidth={2} />
        {bestand ? "Ander bestand kiezen" : "Bestand uploaden"}
      </button>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  readOnly = false,
  type = "text",
  className = "",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block text-[13px] text-[#555] ${className}`}>
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        readOnly={readOnly}
        className="mt-1.5 h-12 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a1a1a] read-only:cursor-default"
      />
    </label>
  );
}
