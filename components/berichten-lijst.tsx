const gesprekken = [
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

function initialen(naam: string) {
  return naam
    .split(" ")
    .slice(0, 2)
    .map((deel) => deel[0])
    .join("")
    .toUpperCase();
}

export function BerichtenLijst() {
  return (
    <ul className="-mx-5 mt-3 border-t border-[#e9edef]">
      {gesprekken.map((gesprek) => (
        <li key={gesprek.id}>
          <button
            type="button"
            className={`flex w-full items-center gap-3 px-4 py-3 text-left ${
              gesprek.actief ? "bg-[#f0f2f5]" : "bg-transparent hover:bg-[#f5f6f6]"
            }`}
          >
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#dfe5e7] font-[Arial,Helvetica,sans-serif] text-[14px] font-medium text-[#54656f]"
              aria-hidden
            >
              {initialen(gesprek.naam)}
            </span>
            <span className="min-w-0 flex-1 border-b border-[#e9edef] pb-3">
              <span className="flex items-baseline justify-between gap-2">
                <span className="truncate font-[Arial,Helvetica,sans-serif] text-[15px] text-[#111b21]">
                  {gesprek.naam}
                </span>
                <span
                  className={`shrink-0 font-[Arial,Helvetica,sans-serif] text-[11px] ${
                    gesprek.ongelezen > 0 ? "text-[#25d366]" : "text-[#667781]"
                  }`}
                >
                  {gesprek.tijd}
                </span>
              </span>
              <span className="mt-0.5 flex items-center justify-between gap-2">
                <span className="truncate font-[Arial,Helvetica,sans-serif] text-[13px] text-[#667781]">
                  {gesprek.bericht}
                </span>
                {gesprek.ongelezen > 0 ? (
                  <span className="flex size-[18px] shrink-0 items-center justify-center rounded-full bg-[#25d366] font-[Arial,Helvetica,sans-serif] text-[10px] font-semibold text-white">
                    {gesprek.ongelezen}
                  </span>
                ) : null}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
