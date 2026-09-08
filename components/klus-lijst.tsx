"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import { klussen } from "@/lib/klussen";

const PER_PAGE_OPTIONS = [6, 8, 10] as const;

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
      <div className="flex flex-col gap-5">
        {zichtbaar.map((klus) => {
          const saved = favorites.includes(klus.id);
          return (
            <article
              key={klus.id}
              className="flex gap-4 rounded-[var(--radius-control)] bg-white px-5 py-5 shadow-[0_4px_18px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]"
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
                <p className="mt-1 flex items-center gap-1 text-[12px] text-[#555]">
                  <PlaatsPin />
                  {klus.city}
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
    </div>
  );
}
