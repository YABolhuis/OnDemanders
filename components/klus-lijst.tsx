"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Eye,
  Heart,
  Search,
} from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import { FreelancerPlusBanner } from "@/components/freelancer-plus-banner";
import { LocatieZoek } from "@/components/locatie-zoek";
import { klussen, type Klus } from "@/lib/klussen";
import { DISTANCES } from "@/components/distance-slider";
import { vakgebieden } from "@/lib/vakgebieden";

const PER_PAGE_OPTIONS = [6, 8, 10] as const;

const tabs = [
  { id: "matches", label: "Beste overeenkomsten" },
  { id: "recent", label: "Meest recent" },
  { id: "opgeslagen", label: "Opgeslagen opdrachten" },
  { id: "uitnodigingen", label: "Uitnodigingen" },
] as const;

const sorteerOpties = [
  { id: "relevantie", label: "Relevantie" },
  { id: "nieuwste", label: "Nieuwste eerst" },
  { id: "prijs-hoog", label: "Prijs: hoog - laag" },
  { id: "prijs-laag", label: "Prijs: laag - hoog" },
  { id: "bekeken", label: "Meest bekeken" },
] as const;

type TabId = (typeof tabs)[number]["id"];
type SorteerId = (typeof sorteerOpties)[number]["id"];

const MAAND: Record<string, number> = {
  jan: 0,
  feb: 1,
  mrt: 2,
  apr: 3,
  mei: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  okt: 9,
  nov: 10,
  dec: 11,
};

function prijsWaarde(price: string) {
  const getal = Number(
    price.replace(/[^\d,]/g, "").replace(/\./g, "").replace(",", ".")
  );
  return Number.isFinite(getal) ? getal : -1;
}

function postedTime(postedAt: string) {
  const match = postedAt.match(/^(\d{1,2}) (\w+) (\d{4}), (\d{2}):(\d{2})$/);
  if (!match) {
    return 0;
  }
  return new Date(
    Number(match[3]),
    MAAND[match[2]] ?? 0,
    Number(match[1]),
    Number(match[4]),
    Number(match[5])
  ).getTime();
}

export function KlusLijst({
  items = klussen,
  vakSlug,
}: {
  items?: Klus[];
  vakSlug?: string;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<TabId>("matches");
  const [sorteer, setSorteer] = useState<SorteerId>("relevantie");
  const [sorteerOpen, setSorteerOpen] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [locatie, setLocatie] = useState("");
  const [afstand, setAfstand] = useState<(typeof DISTANCES)[number]>(
    "Alle afstanden..."
  );
  const [actieveLocatie, setActieveLocatie] = useState("");
  const [actieveAfstand, setActieveAfstand] = useState<
    (typeof DISTANCES)[number]
  >("Alle afstanden...");
  const [conceptDienst, setConceptDienst] = useState(vakSlug ?? "schilder");
  const [afstandOpen, setAfstandOpen] = useState(false);
  const [dienstOpen, setDienstOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [perPage, setPerPage] = useState<(typeof PER_PAGE_OPTIONS)[number]>(6);
  const [page, setPage] = useState(1);
  const [zoek, setZoek] = useState("");
  const sorteerRef = useRef<HTMLDivElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sorteerOpen && !filtersOpen) {
      return;
    }

    function onPointerDown(event: PointerEvent) {
      const target = event.target as Node;
      if (!sorteerRef.current?.contains(target)) {
        setSorteerOpen(false);
      }
      if (!filtersRef.current?.contains(target)) {
        setFiltersOpen(false);
        setAfstandOpen(false);
        setDienstOpen(false);
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [sorteerOpen, filtersOpen]);

  const gefilterd = useMemo(() => {
    let lijst: Klus[];
    if (tab === "uitnodigingen") {
      lijst = [];
    } else if (tab === "opgeslagen") {
      lijst = items.filter((klus) => favorites.includes(klus.id));
    } else {
      lijst = [...items];
    }

    const plaats = actieveLocatie.trim().toLowerCase();
    if (plaats) {
      const kern = plaats.split(",")[0]?.trim() ?? plaats;
      lijst = lijst.filter((klus) => {
        const stad = klus.city.toLowerCase();
        return plaats.includes(stad) || stad.includes(kern);
      });
    }

    const term = zoek.trim().toLowerCase();
    if (term) {
      lijst = lijst.filter((klus) =>
        [klus.title, klus.description, klus.tags, klus.city, klus.seller]
          .join(" ")
          .toLowerCase()
          .includes(term)
      );
    }

    const gesorteerd = [...lijst];
    if (sorteer === "nieuwste" || tab === "recent") {
      gesorteerd.sort(
        (a, b) => postedTime(b.postedAt) - postedTime(a.postedAt)
      );
    } else if (sorteer === "prijs-hoog") {
      gesorteerd.sort((a, b) => prijsWaarde(b.price) - prijsWaarde(a.price));
    } else if (sorteer === "prijs-laag") {
      gesorteerd.sort((a, b) => prijsWaarde(a.price) - prijsWaarde(b.price));
    } else if (sorteer === "bekeken") {
      gesorteerd.sort((a, b) => b.views - a.views);
    } else {
      gesorteerd.sort((a, b) => b.views - a.views);
    }
    return gesorteerd;
  }, [tab, favorites, items, sorteer, zoek, actieveLocatie]);

  const pageCount = Math.max(1, Math.ceil(gefilterd.length / perPage));
  const currentPage = Math.min(page, pageCount);

  const zichtbaar = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return gefilterd.slice(start, start + perPage);
  }, [currentPage, perPage, gefilterd]);

  function kiesTab(id: TabId) {
    setTab(id);
    setPage(1);
  }

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  const leegTekst =
    tab === "opgeslagen"
      ? "Je hebt nog geen opgeslagen opdrachten."
      : tab === "uitnodigingen"
        ? "Je hebt nog geen uitnodigingen."
        : "Geen opdrachten in dit vakgebied.";

  return (
    <div>
      <div className="bg-[#fbfbfb] px-14 pt-10 lg:pr-14">
        <FreelancerPlusBanner />
      </div>
      <div className="relative bg-[#fbfbfb] px-14 pt-6 lg:pr-14">
        <nav aria-label="Opdrachten filteren" className="flex min-w-0 flex-wrap gap-8">
          {tabs.map((item) => {
            const actief = item.id === tab;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => kiesTab(item.id)}
                className={`relative h-12 shrink-0 text-[14px] ${
                  actief
                    ? "font-semibold text-[#1a1a1a]"
                    : "font-normal text-[#6b6b6b] hover:text-[#1a1a1a]"
                }`}
              >
                {item.label}
                {actief ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 z-10 h-[3px] rounded-full bg-[#333]"
                  />
                ) : null}
              </button>
            );
          })}
        </nav>
        <div aria-hidden className="h-px bg-[#e6e6e6]" />
      </div>

      <div className="px-14 pt-6 pb-14 lg:pr-14">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <p className="text-[13px] text-[#555]">
              {gefilterd.length === 1
                ? "1 resultaat"
                : `${gefilterd.length} resultaten`}
            </p>
            <div ref={filtersRef} className="relative">
              <button
                type="button"
                aria-expanded={filtersOpen}
                aria-haspopup="dialog"
                onClick={() => {
                  setFiltersOpen((open) => {
                    if (!open) {
                      setLocatie(actieveLocatie);
                      setAfstand(actieveAfstand);
                      setConceptDienst(vakSlug ?? "schilder");
                    }
                    return !open;
                  });
                  setSorteerOpen(false);
                  setAfstandOpen(false);
                  setDienstOpen(false);
                }}
                className="inline-flex h-9 items-center gap-2 rounded-[3px] border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] hover:border-[#1d5fd1]"
              >
                Filters
                <ChevronDown className="size-3.5 text-[#555]" strokeWidth={2} aria-hidden />
              </button>
              {filtersOpen ? (
                <div
                  role="dialog"
                  aria-label="Filters"
                  className="absolute top-[calc(100%+4px)] left-0 z-30 w-[280px] rounded-md bg-white px-3 py-3 shadow-[0_4px_16px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
                >
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#9aa0a6]">
                    Dienst
                  </p>
                  <div className="relative mb-3">
                    <button
                      type="button"
                      aria-expanded={dienstOpen}
                      aria-haspopup="listbox"
                      aria-label="Dienst"
                      onClick={() => {
                        setDienstOpen((open) => !open);
                        setAfstandOpen(false);
                      }}
                      className={`flex h-9 w-full items-center justify-between gap-1 rounded-[3px] border bg-white px-2 text-left text-[13px] ${
                        dienstOpen
                          ? "border-[#1d5fd1] text-[#1d5fd1]"
                          : "border-[#d0d0d0] text-[#222]"
                      }`}
                    >
                      <span className="min-w-0 truncate">
                        {vakgebieden.find((vak) => vak.slug === conceptDienst)
                          ?.label ?? "Kies een dienst"}
                      </span>
                      {dienstOpen ? (
                        <ChevronUp className="size-4 shrink-0" strokeWidth={2} />
                      ) : (
                        <ChevronDown className="size-4 shrink-0" strokeWidth={2} />
                      )}
                    </button>
                    {dienstOpen ? (
                      <ul
                        role="listbox"
                        className="absolute top-full right-0 left-0 z-40 mt-1 max-h-56 overflow-y-auto rounded-[3px] border border-[#e6e6e6] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                      >
                        {vakgebieden.map((vak) => (
                          <li key={vak.slug}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={conceptDienst === vak.slug}
                              onClick={() => {
                                setConceptDienst(vak.slug);
                                setDienstOpen(false);
                              }}
                              className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-[#222] hover:bg-[#f5f7fa]"
                            >
                              {vak.label}
                              {conceptDienst === vak.slug ? (
                                <Check
                                  className="size-4 text-[#555]"
                                  strokeWidth={2}
                                />
                              ) : null}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#9aa0a6]">
                    Locatie
                  </p>
                  <LocatieZoek
                    value={locatie}
                    onChange={setLocatie}
                    onderdrukt={dienstOpen || afstandOpen}
                    onTyp={() => {
                      setDienstOpen(false);
                      setAfstandOpen(false);
                    }}
                  />
                  <div className="relative">
                    <button
                      type="button"
                      aria-expanded={afstandOpen}
                      aria-haspopup="listbox"
                      aria-label="Afstand"
                      onClick={() => {
                        setAfstandOpen((open) => !open);
                        setDienstOpen(false);
                      }}
                      className={`flex h-9 w-full items-center justify-between gap-1 rounded-[3px] border bg-white px-2 text-left text-[13px] ${
                        afstandOpen
                          ? "border-[#1d5fd1] text-[#1d5fd1]"
                          : "border-[#d0d0d0] text-[#222]"
                      }`}
                    >
                      <span className="min-w-0 truncate">{afstand}</span>
                      {afstandOpen ? (
                        <ChevronUp className="size-4 shrink-0" strokeWidth={2} />
                      ) : (
                        <ChevronDown className="size-4 shrink-0" strokeWidth={2} />
                      )}
                    </button>
                    {afstandOpen ? (
                      <ul
                        role="listbox"
                        className="absolute top-full right-0 left-0 z-40 mt-1 rounded-[3px] border border-[#e6e6e6] bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
                      >
                        {DISTANCES.map((option) => (
                          <li key={option}>
                            <button
                              type="button"
                              role="option"
                              aria-selected={option === afstand}
                              onClick={() => {
                                setAfstand(option);
                                setAfstandOpen(false);
                              }}
                              className="flex w-full items-center justify-between px-3 py-2 text-left text-[13px] text-[#222] hover:bg-[#f5f7fa]"
                            >
                              {option}
                              {option === afstand ? (
                                <Check
                                  className="size-4 text-[#555]"
                                  strokeWidth={2}
                                />
                              ) : null}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setLocatie("");
                        setAfstand("Alle afstanden...");
                        setConceptDienst(vakSlug ?? "schilder");
                        setActieveLocatie("");
                        setActieveAfstand("Alle afstanden...");
                        setAfstandOpen(false);
                        setDienstOpen(false);
                        setPage(1);
                      }}
                      className="h-9 flex-1 rounded-[3px] border border-[#d0d0d0] bg-white text-[13px] font-medium text-[#222] hover:border-[#1d5fd1]"
                    >
                      Wissen
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActieveLocatie(locatie);
                        setActieveAfstand(afstand);
                        setAfstandOpen(false);
                        setDienstOpen(false);
                        setFiltersOpen(false);
                        setPage(1);
                        if (conceptDienst !== vakSlug) {
                          router.push(`/klussen/vak/${conceptDienst}`);
                        }
                      }}
                      className="h-9 flex-1 rounded-[3px] bg-[#1d5fd1] text-[13px] font-medium text-white hover:bg-[#1853b8]"
                    >
                      Toepassen
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div className="relative min-w-[200px] max-w-sm flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-[#6b6b6b]"
                strokeWidth={2}
                aria-hidden
              />
              <input
                type="search"
                value={zoek}
                onChange={(event) => {
                  setZoek(event.target.value);
                  setPage(1);
                }}
                placeholder="Zoeken"
                aria-label="Zoeken"
                className="sidebar-zoek h-9 w-full rounded-full border border-[#d0d0d0] bg-white pr-3 pl-8 text-[13px] text-[#222] outline-none placeholder:text-[#9aa0a6] focus:border-[#1d5fd1]"
              />
            </div>
          </div>
          <div ref={sorteerRef} className="relative shrink-0">
            <button
              type="button"
              aria-expanded={sorteerOpen}
              aria-haspopup="listbox"
              onClick={() => {
                setSorteerOpen((open) => !open);
                setFiltersOpen(false);
                setAfstandOpen(false);
                setDienstOpen(false);
              }}
              className="inline-flex h-9 items-center gap-2 rounded-[3px] border border-[#d0d0d0] bg-white px-3 text-[13px] text-[#222] hover:border-[#1d5fd1]"
            >
              <ArrowUpDown className="size-3.5" strokeWidth={2} aria-hidden />
              Sorteren op
              <ChevronDown className="size-3.5 text-[#555]" strokeWidth={2} aria-hidden />
            </button>
            {sorteerOpen ? (
              <ul
                role="listbox"
                className="absolute top-[calc(100%+4px)] right-0 z-20 min-w-[200px] rounded-md bg-white py-1 shadow-[0_4px_16px_rgba(0,0,0,0.12)] ring-1 ring-black/10"
              >
                {sorteerOpties.map((optie) => (
                  <li key={optie.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={sorteer === optie.id}
                      onClick={() => {
                        setSorteer(optie.id);
                        setSorteerOpen(false);
                        setPage(1);
                      }}
                      className={`flex h-9 w-full items-center px-3 text-left text-[13px] ${
                        sorteer === optie.id
                          ? "font-medium text-[#1d5fd1]"
                          : "text-[#222] hover:bg-[#f5f5f5]"
                      }`}
                    >
                      {optie.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
        {zichtbaar.length === 0 ? (
          <p className="py-16 text-center text-[13px] text-[#667781]">
            {leegTekst}
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {zichtbaar.map((klus) => {
              const saved = favorites.includes(klus.id);
              return (
                <article
                  key={klus.id}
                  className="relative rounded-xl border border-[#e5e7eb] bg-white px-7 py-7 pr-16"
                >
                  <button
                    type="button"
                    aria-label="Bewaar klus"
                    aria-pressed={saved}
                    onClick={() => toggleFavorite(klus.id)}
                    className="absolute top-6 right-6 flex size-8 items-center justify-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-white"
                  >
                    <Heart
                      className={`size-4 ${saved ? "fill-[#d91222] text-[#d91222]" : "text-[#6b6b6b]"}`}
                      strokeWidth={2}
                    />
                  </button>

                  <div className="flex gap-6">
                    <div className="flex min-w-0 flex-1 flex-col">
                      <h2 className="text-[16px] font-bold text-[#1a1a1a]">
                        <Link
                          href={`/klussen/${klus.id}`}
                          className="hover:text-[#1d5fd1] hover:underline"
                        >
                          {klus.title}
                        </Link>
                      </h2>
                      <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#666]">
                        {klus.description}
                      </p>
                      <p className="mt-auto pt-2 text-[12px] text-[#555]">
                        {klus.tags}
                      </p>
                    </div>

                    <div className="flex w-[148px] shrink-0 flex-col">
                      <p className="text-[15px] font-bold text-[#1a1a1a]">
                        {klus.price}
                      </p>
                      <p className="mt-auto flex items-center gap-1.5 pt-2 text-[12px] text-[#8a8a8a]">
                        <Eye
                          className="size-3.5 shrink-0"
                          strokeWidth={2}
                          aria-hidden
                        />
                        {klus.views} keer bekeken
                      </p>
                    </div>

                    <div className="flex w-[168px] shrink-0 flex-col">
                      <p className="text-[13px] font-bold text-[#1d5fd1]">
                        {klus.seller}
                      </p>
                      <p className="mt-1 flex items-center gap-1 text-[12px] text-[#555]">
                        <PlaatsPin />
                        {klus.city}
                      </p>
                      <p className="mt-auto flex items-center gap-1.5 pt-2 text-[12px] text-[#8a8a8a]">
                        <Clock
                          className="size-3.5 shrink-0"
                          strokeWidth={2}
                          aria-hidden
                        />
                        {klus.postedAt}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {zichtbaar.length > 0 ? (
          <div className="mt-8 flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-center gap-2 text-[13px] text-[#555]">
              Per pagina
              <span className="relative">
                <select
                  aria-label="Aantal opdrachten per pagina"
                  value={perPage}
                  onChange={(event) => {
                    setPerPage(
                      Number(event.target.value) as (typeof PER_PAGE_OPTIONS)[number]
                    );
                    setPage(1);
                  }}
                  className="h-8 appearance-none border border-[#d0d0d0] bg-white pr-8 pl-2 text-[13px] text-[#333] outline-none focus:border-[#1d5fd1]"
                >
                  {PER_PAGE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute top-1/2 right-2 size-3.5 -translate-y-1/2 text-[#555]"
                  strokeWidth={2}
                  aria-hidden
                />
              </span>
            </label>

            <nav aria-label="Pagina's" className="flex items-center gap-1">
              {Array.from({ length: pageCount }, (_, index) => index + 1).map(
                (nummer) => (
                  <button
                    key={nummer}
                    type="button"
                    onClick={() => setPage(nummer)}
                    aria-current={nummer === currentPage ? "page" : undefined}
                    className={`flex size-8 items-center justify-center text-[13px] ${
                      nummer === currentPage
                        ? "bg-[#1d5fd1] font-semibold text-white"
                        : "border border-[#d0d0d0] bg-white text-[#333] hover:border-[#1d5fd1]"
                    }`}
                  >
                    {nummer}
                  </button>
                )
              )}
            </nav>
          </div>
        ) : null}
      </div>
    </div>
  );
}
