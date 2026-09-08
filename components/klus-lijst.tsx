"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import { klussen, type Klus } from "@/lib/klussen";

const PER_PAGE_OPTIONS = [6, 8, 10] as const;

function duurVanTags(tags: string) {
  return tags.split(" · ").at(-1)?.trim() ?? "";
}

function startdatum(klus: Klus) {
  return klus.badge === "Spoed" ? "Zo snel mogelijk" : "in overleg";
}

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
      <div className="flex flex-col gap-4">
        {zichtbaar.map((klus) => {
          const saved = favorites.includes(klus.id);
          return (
            <article
              key={klus.id}
              className="relative rounded-[10px] bg-white px-6 py-5 shadow-[0_2px_10px_rgba(30,50,80,0.08)]"
            >
              <button
                type="button"
                aria-label="Bewaar klus"
                aria-pressed={saved}
                onClick={() => toggleFavorite(klus.id)}
                className="absolute top-4 right-4 flex size-8 items-center justify-center rounded-full text-[#9aa8b5] hover:bg-[#f4f6f8]"
              >
                <Heart
                  className={`size-4 ${saved ? "fill-[#d91222] text-[#d91222]" : ""}`}
                  strokeWidth={2}
                />
              </button>

              <h2 className="pr-10 text-[20px] font-bold leading-snug text-[#1e3a5f]">
                <Link href={`/klussen/${klus.id}`} className="hover:underline">
                  {klus.title}
                </Link>
              </h2>

              <div className="mt-4 flex items-center gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded bg-[#f4f6f8]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={klus.image}
                    alt=""
                    className="size-full object-cover"
                  />
                </div>

                <div className="grid min-w-0 flex-1 grid-cols-1 gap-x-10 sm:grid-cols-2">
                  <div className="text-[14px] leading-6">
                    <p className="text-[#4a5f78]">{klus.city}</p>
                    <p className="text-[#8b9aab]">{klus.when}</p>
                    <p className="text-[#8b9aab]">{klus.seller}</p>
                  </div>
                  <div className="text-[14px] leading-6">
                    <p className="text-[#4a5f78]">{klus.price}</p>
                    <p className="text-[#8b9aab]">{duurVanTags(klus.tags)}</p>
                    <p className="text-[#8b9aab]">{startdatum(klus)}</p>
                  </div>
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
