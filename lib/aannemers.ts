export type Aannemer = {
  id: string;
  name: string;
  trade: string;
  description: string;
  tags: string;
  rate: string;
  availability: string;
  city: string;
  distance: string;
  image: string;
};

export const aannemers: Aannemer[] = [
  {
    id: "1",
    name: "Van Dijk Schilderwerken",
    trade: "Schilder",
    description:
      "Binnen- en buitenschilderwerk voor woningen. Netjes, stofarm en met vaste prijsafspraak vooraf.",
    tags: "Schilder · Woning · Zzp",
    rate: "€ 48 / uur",
    availability: "Deze week",
    city: "Amsterdam",
    distance: "8 km",
    image:
      "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    name: "Jansen Stukadoors",
    trade: "Stukadoor",
    description:
      "Glad stucwerk, renovatie en vochtige ruimtes. Werkt met twee man en eigen steiger.",
    tags: "Stukadoor · Woning · Klein bedrijf",
    rate: "€ 55 / uur",
    availability: "Op afspraak",
    city: "Haarlem",
    distance: "24 km",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    name: "Dakzorg Noord",
    trade: "Dakdekker",
    description:
      "Pannen, bitumen en noodreparaties na storm. Spoed mogelijk binnen 24 uur in de regio.",
    tags: "Dakdekker · Woning · Klein bedrijf",
    rate: "€ 62 / uur",
    availability: "Direct",
    city: "Purmerend",
    distance: "19 km",
    image:
      "https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    name: "Looijenga Loodgieters",
    trade: "Loodgieter",
    description:
      "Lekkages, cv-ketels en complete badkamers. Gecertificeerd voor gas en water.",
    tags: "Loodgieter · Woning · Zzp",
    rate: "€ 59 / uur",
    availability: "Direct",
    city: "Amersfoort",
    distance: "11 km",
    image:
      "https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    name: "Hout & Co Timmerwerk",
    trade: "Timmerman",
    description:
      "Keukens, kasten en kleine verbouwingen. Werkt graag met de klant mee op de bouwplaats.",
    tags: "Timmerman · Nieuwbouw · Zzp",
    rate: "€ 52 / uur",
    availability: "Deze week",
    city: "Almere",
    distance: "16 km",
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    name: "Steenvast Metselbedrijf",
    trade: "Metselaar",
    description:
      "Tuinmuren, gevelherstel en voegwerk. Materialen kunnen worden meegenomen in de offerte.",
    tags: "Metselaar · Woning · Klein bedrijf",
    rate: "€ 50 / uur",
    availability: "Op afspraak",
    city: "Zaandam",
    distance: "21 km",
    image:
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    name: "Volt Installatie",
    trade: "Elektricien",
    description:
      "Groepenkasten, laadpunten en keuringen. Inclusief rapportage voor de verzekering.",
    tags: "Elektricien · Woning · Klein bedrijf",
    rate: "€ 68 / uur",
    availability: "Deze week",
    city: "Leiden",
    distance: "33 km",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    name: "Vloerlijn",
    trade: "Timmerman",
    description:
      "Laminaat, pvc en ondervloeren. Snel en stofarm, ook in bewoonde woningen.",
    tags: "Timmerman · Woning · Zzp",
    rate: "€ 45 / uur",
    availability: "Deze week",
    city: "Den Haag",
    distance: "46 km",
    image:
      "https://images.unsplash.com/photo-1581850518616-bcb8077a2336?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "9",
    name: "Gevel & Glas Rotterdam",
    trade: "Schilder",
    description:
      "Gevelreiniging, kozijnen en winkelpuien. Werkt buiten openingstijden als dat nodig is.",
    tags: "Schilder · Bedrijfspand / kantoor · Klein bedrijf",
    rate: "€ 54 / uur",
    availability: "Op afspraak",
    city: "Rotterdam",
    distance: "58 km",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "10",
    name: "Warmte Service",
    trade: "Loodgieter",
    description:
      "Cv-storingen, radiatoren en waterdruk. Spoedmonteur in de avond beschikbaar.",
    tags: "Loodgieter · Woning · Zzp",
    rate: "€ 64 / uur",
    availability: "Direct",
    city: "Hilversum",
    distance: "14 km",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "11",
    name: "Isolatieplus",
    trade: "Timmerman",
    description:
      "Zolders, spouwmuren en vloeren isoleren. Advies over subsidie mogelijk.",
    tags: "Timmerman · Woning · Klein bedrijf",
    rate: "€ 49 / uur",
    availability: "Op afspraak",
    city: "Utrecht",
    distance: "36 km",
    image:
      "https://images.unsplash.com/photo-1600585154340-0ef3c08c841b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "12",
    name: "Straatwerk De Groot",
    trade: "Stratenmaker",
    description:
      "Opritten, terrassen en verzakte klinkers. Inclusief afvoer van puin.",
    tags: "Stratenmaker · Woning · Zzp",
    rate: "€ 47 / uur",
    availability: "Deze week",
    city: "Hoofddorp",
    distance: "29 km",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=400&q=80",
  },
];

export function getAannemer(id: string) {
  return aannemers.find((aannemer) => aannemer.id === id);
}
