const items = [
  {
    stap: "Stap 1",
    body: "Open een account en zet je vak op de kaart. Vul je werkgebied in zodat je meteen opdrachten bij jou in de buurt ziet.",
  },
  {
    stap: "Stap 2",
    body: "Bekijk klussen, filter op postcode en afstand en kies waar jij op wilt bieden. Duidelijk, zonder gedoe.",
  },
  {
    stap: "Stap 3",
    body: "Plaats je bod, praat via Berichten en groei van lokale klussen naar opdrachten door heel Nederland.",
  },
] as const;

export function HomeKenmerken() {
  return (
    <section aria-label="Stappen">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
        {items.map((item) => (
          <article key={item.stap} className="min-w-0">
            <h3 className="text-[15px] font-medium tracking-tight text-[#e8e8e6]">
              {item.stap}
            </h3>
            <p className="mt-1.5 text-[14px] leading-6 text-[#737373]">
              {item.body}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
