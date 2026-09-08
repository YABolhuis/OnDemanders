"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { FilterSidebar } from "@/components/filter-sidebar";

type Sectie = "overzicht" | "facturen" | "betalingen";

const secties: { id: Sectie; label: string }[] = [
  { id: "overzicht", label: "Overzicht" },
  { id: "facturen", label: "Facturen" },
  { id: "betalingen", label: "Betalingen" },
];

const periodes = ["Deze maand", "Vorige maand", "Dit kwartaal", "Dit jaar"];

const transacties = [
  {
    id: "1",
    titel: "Schilderwerk woonkamer — J. de Vries",
    soort: "inkomsten" as const,
    status: "betaald" as const,
    bedrag: "€ 850,00",
    datum: "2 sep 2026",
  },
  {
    id: "2",
    titel: "Stucwerk badkamer — M. Jansen",
    soort: "inkomsten" as const,
    status: "open" as const,
    bedrag: "€ 1.240,00",
    datum: "28 aug 2026",
  },
  {
    id: "3",
    titel: "Materiaal groothandel",
    soort: "uitgaven" as const,
    status: "betaald" as const,
    bedrag: "€ 186,40",
    datum: "21 aug 2026",
  },
  {
    id: "4",
    titel: "Loodgieter kantoor — Optisend BV",
    soort: "inkomsten" as const,
    status: "te laat" as const,
    bedrag: "€ 320,00",
    datum: "12 aug 2026",
  },
];

function CheckboxGroep({
  titel,
  items,
  gekozen,
  onToggle,
}: {
  titel: string;
  items: { id: string; label: string }[];
  gekozen: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <div>
      <h2 className="mb-3 font-[Arial,Helvetica,sans-serif] text-[13px] font-semibold text-[#222]">
        {titel}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-2 font-[Arial,Helvetica,sans-serif] text-[13px] font-normal text-[#222]"
          >
            <input
              type="checkbox"
              checked={gekozen.includes(item.id)}
              onChange={() => onToggle(item.id)}
              className="size-3.5 shrink-0 rounded-sm border border-[#bfc4cc] bg-white accent-[#1d5fd1]"
            />
            <span>{item.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export function FinancienPagina() {
  const [sectie, setSectie] = useState<Sectie>("overzicht");
  const [zoek, setZoek] = useState("");
  const [periode, setPeriode] = useState("Deze maand");
  const [soorten, setSoorten] = useState<string[]>([]);
  const [statussen, setStatussen] = useState<string[]>([]);

  function toggle(list: string[], id: string, setList: (next: string[]) => void) {
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  }

  const gefilterd = useMemo(() => {
    return transacties.filter((item) => {
      if (zoek && !item.titel.toLowerCase().includes(zoek.toLowerCase())) {
        return false;
      }
      if (soorten.length > 0 && !soorten.includes(item.soort)) {
        return false;
      }
      if (statussen.length > 0 && !statussen.includes(item.status)) {
        return false;
      }
      if (sectie === "facturen" && item.soort === "uitgaven") {
        return false;
      }
      if (sectie === "betalingen" && item.status === "open") {
        return false;
      }
      return true;
    });
  }, [zoek, soorten, statussen, sectie]);

  const inkomsten = gefilterd
    .filter((item) => item.soort === "inkomsten")
    .reduce((som, item) => som + parseBedrag(item.bedrag), 0);
  const uitgaven = gefilterd
    .filter((item) => item.soort === "uitgaven")
    .reduce((som, item) => som + parseBedrag(item.bedrag), 0);

  return (
    <div className="flex flex-1 items-start bg-white">
      <FilterSidebar>
          <div className="relative mb-6">
            <Search
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6b6b6b]"
              strokeWidth={2}
              aria-hidden
            />
            <input
              type="search"
              value={zoek}
              onChange={(event) => setZoek(event.target.value)}
              placeholder="Zoeken"
              aria-label="Zoeken in financiën"
              className="h-9 w-full border border-[#d0d0d0] bg-white pr-3 pl-8 text-[14px] text-[#333] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
            />
          </div>

          <nav className="mb-6 flex flex-col gap-1">
            {secties.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSectie(item.id)}
                className={`rounded-md px-3 py-2 text-left text-[14px] ${
                  sectie === item.id
                    ? "bg-[#e8f0fe] font-medium text-[#1d5fd1]"
                    : "text-[#333] hover:bg-[#f0f0f0]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mb-6">
            <h2 className="mb-3 font-[Arial,Helvetica,sans-serif] text-[13px] font-semibold text-[#222]">
              Periode
            </h2>
            <select
              value={periode}
              onChange={(event) => setPeriode(event.target.value)}
              aria-label="Periode"
              className="h-9 w-full border border-[#d0d0d0] bg-white px-2 text-[14px] text-[#333] outline-none focus:border-[#1d5fd1]"
            >
              {periodes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-6">
            <CheckboxGroep
              titel="Type"
              items={[
                { id: "inkomsten", label: "Inkomsten" },
                { id: "uitgaven", label: "Uitgaven" },
              ]}
              gekozen={soorten}
              onToggle={(id) => toggle(soorten, id, setSoorten)}
            />
            <CheckboxGroep
              titel="Status"
              items={[
                { id: "betaald", label: "Betaald" },
                { id: "open", label: "Openstaand" },
                { id: "te laat", label: "Te laat" },
              ]}
              gekozen={statussen}
              onToggle={(id) => toggle(statussen, id, setStatussen)}
            />
          </div>
      </FilterSidebar>

      <main className="min-w-0 flex-1 bg-white px-6 py-5 font-[Arial,Helvetica,sans-serif]">
        <h1 className="text-[22px] font-semibold text-[#1f2f46]">
          {secties.find((item) => item.id === sectie)?.label}
        </h1>
        <p className="mt-1 text-[14px] text-[#6b6b6b]">
          {periode} · Y.A. Bolhuis
        </p>

        {sectie === "overzicht" ? (
          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <Kengetal label="Inkomsten" waarde={formatEuro(inkomsten)} />
            <Kengetal label="Uitgaven" waarde={formatEuro(uitgaven)} />
            <Kengetal
              label="Saldo"
              waarde={formatEuro(inkomsten - uitgaven)}
            />
          </div>
        ) : null}

        {gefilterd.length === 0 ? (
          <div className="mt-10 rounded-md border border-[#e6e6e6] bg-[#fbfbfb] px-5 py-10 text-center">
            <p className="text-[15px] font-medium text-[#1f2f46]">
              Geen posten gevonden
            </p>
            <p className="mt-1 text-[14px] text-[#6b6b6b]">
              Pas je zoekterm of filters in de zijbalk aan.
            </p>
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-[#ececec] border-t border-[#ececec]">
            {gefilterd.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-[15px] text-[#1f2f46]">{item.titel}</p>
                  <p className="mt-0.5 text-[13px] text-[#6b6b6b]">
                    {item.datum} · {labelSoort(item.soort)} ·{" "}
                    {labelStatus(item.status)}
                  </p>
                </div>
                <p
                  className={`text-[15px] font-medium ${
                    item.soort === "uitgaven" ? "text-[#d91222]" : "text-[#1f2f46]"
                  }`}
                >
                  {item.soort === "uitgaven" ? "− " : ""}
                  {item.bedrag}
                </p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

function Kengetal({ label, waarde }: { label: string; waarde: string }) {
  return (
    <div className="rounded-md border border-[#e6e6e6] bg-[#fbfbfb] px-4 py-3">
      <p className="text-[13px] text-[#6b6b6b]">{label}</p>
      <p className="mt-1 text-[18px] font-semibold text-[#1f2f46]">{waarde}</p>
    </div>
  );
}

function parseBedrag(value: string) {
  return Number(value.replace("€", "").replace(/\./g, "").replace(",", ".").trim());
}

function formatEuro(value: number) {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

function labelSoort(soort: "inkomsten" | "uitgaven") {
  return soort === "inkomsten" ? "Inkomsten" : "Uitgaven";
}

function labelStatus(status: "betaald" | "open" | "te laat") {
  if (status === "betaald") {
    return "Betaald";
  }
  if (status === "open") {
    return "Openstaand";
  }
  return "Te laat";
}
