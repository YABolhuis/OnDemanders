export type ChatBericht = {
  id: string;
  van: "zij" | "ik";
  tekst: string;
  tijd: string;
};

export type Gesprek = {
  id: string;
  naam: string;
  bericht: string;
  tijd: string;
  ongelezen: number;
  favoriet: boolean;
  berichten: ChatBericht[];
};

export const gesprekken: Gesprek[] = [
  {
    id: "1",
    naam: "J. de Vries",
    bericht: "Kunnen jullie morgen langs komen voor de woonkamer?",
    tijd: "18:24",
    ongelezen: 2,
    favoriet: true,
    berichten: [
      {
        id: "1a",
        van: "ik",
        tekst: "Goedemiddag, we kunnen donderdag of vrijdag langs komen voor de woonkamer. Wat schikt het beste?",
        tijd: "17:51",
      },
      {
        id: "1b",
        van: "zij",
        tekst: "Donderdag is lastig. Kunnen jullie morgen langs komen voor de woonkamer?",
        tijd: "18:24",
      },
    ],
  },
  {
    id: "2",
    naam: "M. Jansen",
    bericht: "Foto's van het stucwerk heb ik meegestuurd.",
    tijd: "Gisteren",
    ongelezen: 0,
    favoriet: true,
    berichten: [
      {
        id: "2a",
        van: "ik",
        tekst: "Kun je een paar foto's sturen van het stucwerk, dan schat ik de restklus in.",
        tijd: "Gisteren",
      },
      {
        id: "2b",
        van: "zij",
        tekst: "Foto's van het stucwerk heb ik meegestuurd.",
        tijd: "Gisteren",
      },
    ],
  },
  {
    id: "3",
    naam: "A. Bakker",
    bericht: "De dakpannen zijn besteld, ik laat het weten.",
    tijd: "11:03",
    ongelezen: 1,
    favoriet: false,
    berichten: [
      {
        id: "3a",
        van: "ik",
        tekst: "Ligt de levering van de dakpannen al vast?",
        tijd: "10:41",
      },
      {
        id: "3b",
        van: "zij",
        tekst: "De dakpannen zijn besteld, ik laat het weten.",
        tijd: "11:03",
      },
    ],
  },
  {
    id: "4",
    naam: "Optisend BV",
    bericht: "Bedankt, de lekkage is verholpen.",
    tijd: "Ma",
    ongelezen: 0,
    favoriet: false,
    berichten: [
      {
        id: "4a",
        van: "ik",
        tekst: "De lekkage bij de dakkapel is gedicht. Laat het weten als je nog vocht ziet.",
        tijd: "Ma",
      },
      {
        id: "4b",
        van: "zij",
        tekst: "Bedankt, de lekkage is verholpen.",
        tijd: "Ma",
      },
    ],
  },
];

export function aantalOngelezenBerichten() {
  return gesprekken.reduce((totaal, gesprek) => totaal + gesprek.ongelezen, 0);
}

export function gesprekOpId(id: string) {
  return gesprekken.find((gesprek) => gesprek.id === id) ?? null;
}
