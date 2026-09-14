export const stadCoords: Record<string, [number, number]> = {
  Amsterdam: [52.3676, 4.9041],
  Haarlem: [52.3874, 4.6462],
  Utrecht: [52.0907, 5.1214],
  Amersfoort: [52.1561, 5.3878],
  Almere: [52.3508, 5.2647],
  Zaandam: [52.442, 4.8294],
  Leiden: [52.1601, 4.497],
  "Den Haag": [52.0705, 4.3007],
  Rotterdam: [51.9244, 4.4777],
  Hilversum: [52.2292, 5.1669],
  Hoofddorp: [52.3061, 4.6907],
  Purmerend: [52.505, 4.9592],
};

export function coordsVoorStad(stad: string): [number, number] {
  return stadCoords[stad] ?? stadCoords.Amsterdam;
}
