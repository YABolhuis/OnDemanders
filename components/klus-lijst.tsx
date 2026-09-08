"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Clock, Eye, Heart } from "lucide-react";
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
    <div>
      <div className="flex flex-col gap-5">
        {zichtbaar.map((klus) => {
          const saved = favorites.includes(klus.id);
          return (
            <article
              key={klus.id}
              className="relative rounded-[3px] bg-white px-5 py-5 pr-14 shadow-[0_4px_18px_rgba(0,0,0,0.10),0_1px_3px_rgba(0,0,0,0.06)]"
            >
              <button
                type="button"
                aria-label="Bewaar klus"
                aria-pressed={saved}
                onClick={() => toggleFavorite(klus.id)}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-white"
              >
                <Heart
                  className={`size-4 ${saved ? "fill-[#d91222] text-[#d91222]" : "text-[#6b6b6b]"}`}
                  strokeWidth={2}
                />
              </button>

              <div className="flex gap-4">
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

              <div className="flex w-[148px] shrink-0 flex-col">
                <p className="text-[15px] font-bold text-[#1a1a1a]">
                  {klus.price}
                </p>
                <p className="mt-auto flex items-center gap-1.5 pt-2 text-[12px] text-[#8a8a8a]">
                  <Eye className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  {klus.views} keer bekeken
                </p>
              </div>

              <div className="flex w-[168px] shrink-0 flex-col">
                <p className="text-[13px] font-bold text-[#1d5fd1]">{klus.seller}</p>
                <p className="mt-1 flex items-center gap-1 text-[12px] text-[#555]">
                  <PlaatsPin />
                  {klus.city}
                </p>
                <p className="mt-auto flex items-center gap-1.5 pt-2 text-[12px] text-[#8a8a8a]">
                  <Clock className="size-3.5 shrink-0" strokeWidth={2} aria-hidden />
                  {klus.postedAt}
                </p>
              </div>
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
