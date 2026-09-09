import { klussen, type Klus } from "@/lib/klussen";

export type Vakgebied = {
  slug: string;
  label: string;
  meervoud: string;
  heeftFilters: boolean;
};

export const vakgebieden: Vakgebied[] = [
  { slug: "schilder", label: "Schilder", meervoud: "schilders", heeftFilters: true },
  { slug: "stukadoor", label: "Stukadoor", meervoud: "stukadoors", heeftFilters: false },
  { slug: "dakdekker", label: "Dakdekker", meervoud: "dakdekkers", heeftFilters: false },
  { slug: "loodgieter", label: "Loodgieter", meervoud: "loodgieters", heeftFilters: false },
  { slug: "timmerman", label: "Timmerman", meervoud: "timmerlieden", heeftFilters: false },
  { slug: "metselaar", label: "Metselaar", meervoud: "metselaars", heeftFilters: false },
  { slug: "elektricien", label: "Elektricien", meervoud: "elektriciens", heeftFilters: false },
  { slug: "stratenmaker", label: "Stratenmaker", meervoud: "stratenmakers", heeftFilters: false },
];

export function getVakgebied(slug: string) {
  return vakgebieden.find((item) => item.slug === slug) ?? null;
}

export function vakSlugVanKlus(klus: Klus) {
  const naam = klus.tags.split(" · ")[0]?.trim() ?? "";
  return (
    vakgebieden.find((item) => item.label.toLowerCase() === naam.toLowerCase())
      ?.slug ?? "schilder"
  );
}

export function klussenVoorVakgebied(slug: string) {
  const vak = getVakgebied(slug);
  if (!vak) {
    return [] as Klus[];
  }
  return klussen.filter(
    (klus) => klus.tags.split(" · ")[0]?.trim().toLowerCase() === vak.label.toLowerCase()
  );
}
