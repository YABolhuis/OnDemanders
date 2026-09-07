"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Heart, MapPin } from "lucide-react";

const PER_PAGE_OPTIONS = [6, 8, 10] as const;

const klussen = [
  {
    id: "1",
    title: "Woonkamer laten schilderen",
    description:
      "Complete woonkamer overschilderen, inclusief plafonds en kozijnen. Lichte kleuren, nette afwerking gewenst.",
    tags: "Schilder · Woning · 1 - 5 dagen",
    price: "€ 850,00",
    when: "Vandaag",
    badge: "Topklus",
    seller: "J. de Vries",
    city: "Amsterdam",
    extra: "12 km",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e744734a3a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Stucwerk badkamer en hal",
    description:
      "Vochtige badkamer opnieuw stucen en glad afwerken. Hal meenemen indien mogelijk.",
    tags: "Stukadoor · Woning · > 1 week",
    price: "Bieden",
    when: "Gisteren",
    badge: "Nieuw",
    seller: "M. Jansen",
    city: "Haarlem",
    extra: "28 km",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Dakpannen vervangen na storm",
    description:
      "Verschillende dakpannen verschoven of kapot. Liefst deze week bekijken en herstellen.",
    tags: "Dakdekker · Woning · < 1 dag",
    price: "€ 320,00",
    when: "Vandaag",
    badge: "Spoed",
    seller: "A. Bakker",
    city: "Utrecht",
    extra: "41 km",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Lekkende leiding kantoorpand",
    description:
      "Lekkage onder de gootsteen op de eerste verdieping. Snel een loodgieter gezocht.",
    tags: "Loodgieter · Bedrijfspand / kantoor · < 1 dag",
    price: "Zie omschrijving",
    when: "3 uur geleden",
    badge: "Topklus",
    seller: "Optisend BV",
    city: "Amersfoort",
    extra: "Bezoek website",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    title: "Keuken plaatsen in nieuwbouwwoning",
    description:
      "IKEA-keuken opbouwen, inclusief blad, spoelbak en apparatuur aansluiten. Ruimte is al gestuct.",
    tags: "Timmerman · Nieuwbouw · 1 - 5 dagen",
    price: "€ 1.150,00",
    when: "Vandaag",
    badge: "Nieuw",
    seller: "S. Visser",
    city: "Almere",
    extra: "18 km",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    title: "Tuinmuur metselen achtertuin",
    description:
      "Lage tuinmuur van circa 8 meter, met hoek. Materialen mogen worden meegenomen in de prijs.",
    tags: "Metselaar · Woning · 1 - 5 dagen",
    price: "€ 640,00",
    when: "Gisteren",
    badge: "Topklus",
    seller: "P. Hendriks",
    city: "Zaandam",
    extra: "22 km",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    title: "Elektrische groepenkast vervangen",
    description:
      "Oude stoppenkast vervangen door een moderne groepenkast. Keuringsrapport gewenst.",
    tags: "Elektricien · Woning · < 1 dag",
    price: "€ 475,00",
    when: "2 dagen geleden",
    badge: "Spoed",
    seller: "L. Meijer",
    city: "Leiden",
    extra: "35 km",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    title: "Laminaat leggen twee slaapkamers",
    description:
      "Oud tapijt eruit, ondervloer en laminaat erin. Plinten meenemen. Woningen op de eerste verdieping.",
    tags: "Timmerman · Woning · 1 - 5 dagen",
    price: "Bieden",
    when: "Vandaag",
    badge: "Nieuw",
    seller: "R. Smit",
    city: "Den Haag",
    extra: "48 km",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "9",
    title: "Gevelreiniging winkelpand",
    description:
      "Gevel en ramen van het winkelpand schoonmaken, inclusief luifel. Liefst in de ochtend.",
    tags: "Schilder · Bedrijfspand / kantoor · < 1 dag",
    price: "€ 290,00",
    when: "Gisteren",
    badge: "Topklus",
    seller: "K. de Boer",
    city: "Rotterdam",
    extra: "62 km",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "10",
    title: "Cv-ketel storing verhelpen",
    description:
      "Ketel valt steeds in storing. Waterdruk is op peil. Graag zo snel mogelijk langs.",
    tags: "Loodgieter · Woning · < 1 dag",
    price: "Zie omschrijving",
    when: "1 uur geleden",
    badge: "Spoed",
    seller: "T. Vos",
    city: "Hilversum",
    extra: "15 km",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "11",
    title: "Zoldervloer isoleren",
    description:
      "Ongeveer 40 m² zoldervloer isoleren. Toegang via vlizotrap. Materiaal mag worden voorgesteld.",
    tags: "Timmerman · Woning · 1 - 5 dagen",
    price: "€ 980,00",
    when: "3 dagen geleden",
    badge: "Nieuw",
    seller: "H. Mulder",
    city: "Amersfoort",
    extra: "9 km",
    image:
      "https://images.unsplash.com/photo-1600585154340-0ef3c08c841b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "12",
    title: "Tuinbestrating oprit herstellen",
    description:
      "Verzakte klinkers in de oprit rechtleggen en twee kapotte stenen vervangen.",
    tags: "Stratenmaker · Woning · 1 - 5 dagen",
    price: "€ 410,00",
    when: "Vandaag",
    badge: "Topklus",
    seller: "N. de Groot",
    city: "Hoofddorp",
    extra: "31 km",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "13",
    title: "Kozijnen schilderen buitenzijde",
    description:
      "Voor- en achtergevel, acht kozijnen. Houtwerk schuren, gronden en aflakken in RAL 9010.",
    tags: "Schilder · Woning · > 1 week",
    price: "€ 1.450,00",
    when: "Gisteren",
    badge: "Nieuw",
    seller: "E. Bos",
    city: "Purmerend",
    extra: "26 km",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "14",
    title: "Toilet renovatie begane grond",
    description:
      "Oud toilet verwijderen, nieuw closet en fonteintje plaatsen, tegels herstellen.",
    tags: "Loodgieter · Woning · 1 - 5 dagen",
    price: "Bieden",
    when: "4 dagen geleden",
    badge: "Topklus",
    seller: "W. Peters",
    city: "Utrecht",
    extra: "38 km",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "15",
    title: "Gootsteen ontstoppen restaurant",
    description:
      "Keukengootsteen loopt niet meer door. Buiten openingstijden, bij voorkeur vanavond.",
    tags: "Loodgieter · Bedrijfspand / kantoor · < 1 dag",
    price: "€ 185,00",
    when: "30 minuten geleden",
    badge: "Spoed",
    seller: "Café De Brug",
    city: "Amsterdam",
    extra: "7 km",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b21be1c18?auto=format&fit=crop&w=400&q=80",
  },
];

export function KlusLijst() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [perPage, setPerPage] = useState<(typeof PER_PAGE_OPTIONS)[number]>(6);
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(klussen.length / perPage));
  const currentPage = Math.min(page, pageCount);

  const zichtbaar = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return klussen.slice(start, start + perPage);
  }, [currentPage, perPage]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="font-[Arial,Helvetica,sans-serif]">
      <div className="divide-y divide-[#e6e6e6]">
        {zichtbaar.map((klus) => {
          const saved = favorites.includes(klus.id);
          return (
            <article
              key={klus.id}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="relative h-[118px] w-[158px] shrink-0 overflow-hidden rounded-[var(--radius-control)] bg-[#eee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={klus.image}
                  alt=""
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Bewaar klus"
                  aria-pressed={saved}
                  onClick={() => toggleFavorite(klus.id)}
                  className="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-white shadow-sm"
                >
                  <Heart
                    className={`size-4 ${saved ? "fill-[#d91222] text-[#d91222]" : "text-[#777]"}`}
                    strokeWidth={2}
                  />
                </button>
              </div>

              <div className="flex min-w-0 flex-1 flex-col">
                <h2 className="text-[16px] font-bold text-[#1a1a1a]">
                  {klus.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#666]">
                  {klus.description}
                </p>
                <p className="mt-auto pt-2 text-[12px] text-[#555]">{klus.tags}</p>
              </div>

              <div className="flex w-[130px] shrink-0 flex-col">
                <p className="text-[15px] font-bold text-[#1a1a1a]">
                  {klus.price}
                </p>
                <p className="mt-1 text-[12px] text-[#777]">{klus.when}</p>
                <p className="mt-auto pt-2 text-[12px] font-medium text-[#2f9e44]">
                  {klus.badge}
                </p>
              </div>

              <div className="flex w-[140px] shrink-0 flex-col">
                <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
                <p className="mt-1 flex items-center gap-0.5 text-[12px] text-[#555]">
                  {klus.city}
                  <MapPin className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                </p>
                <p
                  className={`mt-auto pt-2 text-[12px] ${
                    klus.extra === "Bezoek website"
                      ? "font-medium text-[#1d5fd1]"
                      : "text-[#555]"
                  }`}
                >
                  {klus.extra}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-8 flex flex-col gap-4 border-t border-[#e6e6e6] pt-5 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex items-center gap-2 text-[13px] text-[#555]">
          Per pagina
          <span className="relative">
            <select
              aria-label="Aantal opdrachten per pagina"
              value={perPage}
              onChange={(event) => {
                setPerPage(Number(event.target.value) as (typeof PER_PAGE_OPTIONS)[number]);
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
    </div>
  );
}
