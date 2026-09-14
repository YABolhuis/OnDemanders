export type Klus = {
  id: string;
  title: string;
  titleLead: string;
  titleRest: string;
  description: string;
  tags: string;
  price: string;
  when: string;
  badge: string;
  seller: string;
  city: string;
  extra: string;
  views: number;
  postedAt: string;
  image: string;
};

export const klussen: Klus[] = [
  {
    id: "1",
    title: "Woonkamer laten schilderen",
    titleLead: "Woonkamer",
    titleRest: "laten schilderen",
    description:
      "Complete woonkamer overschilderen, inclusief plafonds en kozijnen. Lichte kleuren, nette afwerking gewenst.",
    tags: "Schilder · Woning · 1 - 5 dagen",
    price: "€ 850,00",
    when: "Vandaag",
    badge: "Topklus",
    seller: "J. de Vries",
    city: "Amsterdam",
    views: 4,
    postedAt: "8 sep 2026, 18:24",
    extra: "12 km",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e744734a3a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "2",
    title: "Stucwerk badkamer en hal",
    titleLead: "Stucwerk",
    titleRest: "badkamer en hal",
    description:
      "Vochtige badkamer opnieuw stucen en glad afwerken. Hal meenemen indien mogelijk.",
    tags: "Stukadoor · Woning · > 1 week",
    price: "Bieden",
    when: "Gisteren",
    badge: "Nieuw",
    seller: "M. Jansen",
    city: "Haarlem",
    views: 12,
    postedAt: "7 sep 2026, 09:12",
    extra: "28 km",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "3",
    title: "Dakpannen vervangen na storm",
    titleLead: "Dakpannen",
    titleRest: "vervangen na storm",
    description:
      "Verschillende dakpannen verschoven of kapot. Liefst deze week bekijken en herstellen.",
    tags: "Dakdekker · Woning · < 1 dag",
    price: "€ 320,00",
    when: "Vandaag",
    badge: "Spoed",
    seller: "A. Bakker",
    city: "Utrecht",
    views: 28,
    postedAt: "8 sep 2026, 11:03",
    extra: "41 km",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "4",
    title: "Lekkende leiding kantoorpand",
    titleLead: "Lekkende leiding",
    titleRest: "kantoorpand",
    description:
      "Lekkage onder de gootsteen op de eerste verdieping. Snel een loodgieter gezocht.",
    tags: "Loodgieter · Bedrijfspand / kantoor · < 1 dag",
    price: "Zie omschrijving",
    when: "3 uur geleden",
    badge: "Topklus",
    seller: "Optisend BV",
    city: "Amersfoort",
    views: 9,
    postedAt: "8 sep 2026, 15:18",
    extra: "Bezoek website",
    image:
      "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "5",
    title: "Keuken plaatsen in nieuwbouwwoning",
    titleLead: "Keuken plaatsen",
    titleRest: "in nieuwbouwwoning",
    description:
      "IKEA-keuken opbouwen, inclusief blad, spoelbak en apparatuur aansluiten. Ruimte is al gestuct.",
    tags: "Timmerman · Nieuwbouw · 1 - 5 dagen",
    price: "€ 1.150,00",
    when: "Vandaag",
    badge: "Nieuw",
    seller: "S. Visser",
    city: "Almere",
    views: 41,
    postedAt: "8 sep 2026, 08:40",
    extra: "18 km",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "6",
    title: "Tuinmuur metselen achtertuin",
    titleLead: "Tuinmuur metselen",
    titleRest: "achtertuin",
    description:
      "Lage tuinmuur van circa 8 meter, met hoek. Materialen mogen worden meegenomen in de prijs.",
    tags: "Metselaar · Woning · 1 - 5 dagen",
    price: "€ 640,00",
    when: "Gisteren",
    badge: "Topklus",
    seller: "P. Hendriks",
    city: "Zaandam",
    views: 6,
    postedAt: "7 sep 2026, 16:55",
    extra: "22 km",
    image:
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "7",
    title: "Elektrische groepenkast vervangen",
    titleLead: "Elektrische groepenkast",
    titleRest: "vervangen",
    description:
      "Oude stoppenkast vervangen door een moderne groepenkast. Keuringsrapport gewenst.",
    tags: "Elektricien · Woning · < 1 dag",
    price: "€ 475,00",
    when: "2 dagen geleden",
    badge: "Spoed",
    seller: "L. Meijer",
    city: "Leiden",
    views: 19,
    postedAt: "6 sep 2026, 14:22",
    extra: "35 km",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "8",
    title: "Laminaat leggen twee slaapkamers",
    titleLead: "Laminaat leggen",
    titleRest: "twee slaapkamers",
    description:
      "Oud tapijt eruit, ondervloer en laminaat erin. Plinten meenemen. Woningen op de eerste verdieping.",
    tags: "Timmerman · Woning · 1 - 5 dagen",
    price: "Bieden",
    when: "Vandaag",
    badge: "Nieuw",
    seller: "R. Smit",
    city: "Den Haag",
    views: 3,
    postedAt: "8 sep 2026, 19:05",
    extra: "48 km",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "9",
    title: "Gevelreiniging winkelpand",
    titleLead: "Gevelreiniging",
    titleRest: "winkelpand",
    description:
      "Gevel en ramen van het winkelpand schoonmaken, inclusief luifel. Liefst in de ochtend.",
    tags: "Schilder · Bedrijfspand / kantoor · < 1 dag",
    price: "€ 290,00",
    when: "Gisteren",
    badge: "Topklus",
    seller: "K. de Boer",
    city: "Rotterdam",
    views: 22,
    postedAt: "7 sep 2026, 10:31",
    extra: "62 km",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "10",
    title: "Cv-ketel storing verhelpen",
    titleLead: "Cv-ketel storing",
    titleRest: "verhelpen",
    description:
      "Ketel valt steeds in storing. Waterdruk is op peil. Graag zo snel mogelijk langs.",
    tags: "Loodgieter · Woning · < 1 dag",
    price: "Zie omschrijving",
    when: "1 uur geleden",
    badge: "Spoed",
    seller: "T. Vos",
    city: "Hilversum",
    views: 15,
    postedAt: "8 sep 2026, 17:10",
    extra: "15 km",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "11",
    title: "Zoldervloer isoleren",
    titleLead: "Zoldervloer",
    titleRest: "isoleren",
    description:
      "Ongeveer 40 m² zoldervloer isoleren. Toegang via vlizotrap. Materiaal mag worden voorgesteld.",
    tags: "Timmerman · Woning · 1 - 5 dagen",
    price: "€ 980,00",
    when: "3 dagen geleden",
    badge: "Nieuw",
    seller: "H. Mulder",
    city: "Amersfoort",
    views: 8,
    postedAt: "5 sep 2026, 13:48",
    extra: "9 km",
    image:
      "https://images.unsplash.com/photo-1600585154340-0ef3c08c841b?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "12",
    title: "Tuinbestrating oprit herstellen",
    titleLead: "Tuinbestrating",
    titleRest: "oprit herstellen",
    description:
      "Verzakte klinkers in de oprit rechtleggen en twee kapotte stenen vervangen.",
    tags: "Stratenmaker · Woning · 1 - 5 dagen",
    price: "€ 410,00",
    when: "Vandaag",
    badge: "Topklus",
    seller: "N. de Groot",
    city: "Hoofddorp",
    views: 11,
    postedAt: "8 sep 2026, 12:16",
    extra: "31 km",
    image:
      "https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "13",
    title: "Kozijnen schilderen buitenzijde",
    titleLead: "Kozijnen schilderen",
    titleRest: "buitenzijde",
    description:
      "Voor- en achtergevel, acht kozijnen. Houtwerk schuren, gronden en aflakken in RAL 9010.",
    tags: "Schilder · Woning · > 1 week",
    price: "€ 1.450,00",
    when: "Gisteren",
    badge: "Nieuw",
    seller: "E. Bos",
    city: "Purmerend",
    views: 33,
    postedAt: "7 sep 2026, 07:59",
    extra: "26 km",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "14",
    title: "Toilet renovatie begane grond",
    titleLead: "Toilet renovatie",
    titleRest: "begane grond",
    description:
      "Oud toilet verwijderen, nieuw closet en fonteintje plaatsen, tegels herstellen.",
    tags: "Loodgieter · Woning · 1 - 5 dagen",
    price: "Bieden",
    when: "4 dagen geleden",
    badge: "Topklus",
    seller: "W. Peters",
    city: "Utrecht",
    views: 5,
    postedAt: "4 sep 2026, 20:07",
    extra: "38 km",
    image:
      "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: "15",
    title: "Gootsteen ontstoppen restaurant",
    titleLead: "Gootsteen ontstoppen",
    titleRest: "restaurant",
    description:
      "Keukengootsteen loopt niet meer door. Buiten openingstijden, bij voorkeur vanavond.",
    tags: "Loodgieter · Bedrijfspand / kantoor · < 1 dag",
    price: "€ 185,00",
    when: "30 minuten geleden",
    badge: "Spoed",
    seller: "Café De Brug",
    city: "Amsterdam",
    views: 17,
    postedAt: "8 sep 2026, 17:54",
    extra: "7 km",
    image:
      "https://images.unsplash.com/photo-1556911220-e15b21be1c18?auto=format&fit=crop&w=400&q=80",
  },
];

export function getKlus(id: string) {
  return klussen.find((klus) => klus.id === id);
}
