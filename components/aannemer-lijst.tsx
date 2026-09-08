"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import { PlaatsPin } from "@/components/plaats-pin";
import { aannemers } from "@/lib/aannemers";

const PER_PAGE_OPTIONS = [6, 8, 10] as const;

export function AannemerLijst() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [perPage, setPerPage] = useState<(typeof PER_PAGE_OPTIONS)[number]>(6);
  const [page, setPage] = useState(1);

  const pageCount = Math.max(1, Math.ceil(aannemers.length / perPage));
  const currentPage = Math.min(page, pageCount);

  const zichtbaar = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return aannemers.slice(start, start + perPage);
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
        {zichtbaar.map((aannemer) => {
          const saved = favorites.includes(aannemer.id);
          return (
            <article
              key={aannemer.id}
              className="flex gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="relative h-[118px] w-[158px] shrink-0 overflow-hidden rounded-[var(--radius-control)] bg-[#eee]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={aannemer.image}
                  alt=""
                  className="size-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Bewaar aannemer"
                  aria-pressed={saved}
                  onClick={() => toggleFavorite(aannemer.id)}
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
                    href={`/aannemers/${aannemer.id}`}
                    className="hover:text-[#1d5fd1] hover:underline"
                  >
                    {aannemer.name}
                  </Link>
                </h2>
                <p className="mt-1 line-clamp-2 text-[13px] leading-5 text-[#666]">
                  {aannemer.description}
                </p>
                <p className="mt-auto pt-2 text-[12px] text-[#555]">
                  {aannemer.tags}
                </p>
              </div>

              <div className="flex w-[130px] shrink-0 flex-col">
                <p className="text-[15px] font-bold text-[#1a1a1a]">
                  {aannemer.rate}
                </p>
                <p className="mt-1 text-[12px] text-[#777]">
                  {aannemer.availability}
                </p>
                <p className="mt-auto pt-2 text-[12px] font-medium text-[#2f9e44]">
                  {aannemer.trade}
                </p>
              </div>

              <div className="flex w-[140px] shrink-0 flex-col">
                <p className="mt-1 flex items-center gap-1 text-[12px] text-[#555]">
                  <PlaatsPin />
                  {aannemer.city}
                </p>
                <p className="mt-auto pt-2 text-[12px] text-[#555]">
                  {aannemer.distance}
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
              aria-label="Aantal aannemers per pagina"
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
