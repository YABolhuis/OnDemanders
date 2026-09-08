export const gesprekken = [
  {
    id: "1",
    naam: "J. de Vries",
    bericht: "Kunnen jullie morgen langs komen voor de woonkamer?",
    tijd: "18:24",
    ongelezen: 2,
    actief: true,
  },
  {
    id: "2",
    naam: "M. Jansen",
    bericht: "Foto's van het stucwerk heb ik meegestuurd.",
    tijd: "Gisteren",
    ongelezen: 0,
    actief: false,
  },
  {
    id: "3",
    naam: "A. Bakker",
    bericht: "De dakpannen zijn besteld, ik laat het weten.",
    tijd: "11:03",
    ongelezen: 1,
    actief: false,
  },
  {
    id: "4",
    naam: "Optisend BV",
    bericht: "Bedankt, de lekkage is verholpen.",
    tijd: "Ma",
    ongelezen: 0,
    actief: false,
  },
] as const;

export function aantalOngelezenBerichten() {
  return gesprekken.reduce((totaal, gesprek) => totaal + gesprek.ongelezen, 0);
}
