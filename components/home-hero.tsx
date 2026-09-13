import Link from "next/link";

export function HomeHero() {
  return (
    <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
      <div>
        <h1 className="text-[28px] leading-[1.15] font-medium tracking-tight text-[#1a1a1a] sm:text-[32px] lg:text-[36px]">
          Vind werk in een weekend
          <span className="mt-0.5 block text-[#3ecf8e]">Groei naar heel Nederland</span>
        </h1>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Link
            href="/inloggen"
            className="inline-flex h-8 items-center rounded-[var(--radius-control)] bg-[#16a34a] px-3.5 text-[13px] font-medium text-white hover:bg-[#15803d]"
          >
            Account openen
          </Link>
          <Link
            href="/inloggen"
            className="inline-flex h-8 items-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-transparent px-3.5 text-[13px] font-medium text-[#1a1a1a] hover:border-[#1a1a1a]"
          >
            Bekijk opdrachten
          </Link>
        </div>
      </div>
      <p className="max-w-[20rem] text-[14px] leading-6 text-[#777] lg:pt-1">
        Zet je vak op de kaart. Ontvang opdrachten bij jou in de buurt, bied op
        klussen en laat opdrachtgevers jou vinden — van één klus tot een volle
        agenda.
      </p>
    </section>
  );
}
