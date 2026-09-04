"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

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
];

export function KlusLijst() {
  const [favorites, setFavorites] = useState<string[]>([]);

  function toggleFavorite(id: string) {
    setFavorites((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <div className="divide-y divide-[#e6e6e6] font-[Arial,Helvetica,sans-serif]">
      {klussen.map((klus) => {
        const saved = favorites.includes(klus.id);
        return (
          <article
            key={klus.id}
            className="flex gap-4 py-4 first:pt-0 last:pb-0"
          >
            <div className="relative h-[118px] w-[158px] shrink-0 overflow-hidden rounded-md bg-[#eee]">
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
              <p className="text-[15px] font-bold text-[#1a1a1a]">{klus.price}</p>
              <p className="mt-1 text-[12px] text-[#777]">{klus.when}</p>
              <p className="mt-auto pt-2 text-[12px] font-medium text-[#2f9e44]">
                {klus.badge}
              </p>
            </div>

            <div className="flex w-[140px] shrink-0 flex-col">
              <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
              <p className="mt-1 text-[12px] text-[#555]">{klus.city}</p>
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
  );
}
