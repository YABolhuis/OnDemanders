import Link from "next/link";

export function HomeHero() {
  return (
    <section className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
      <div>
        <h1 className="text-[40px] leading-[1.1] font-semibold tracking-tight text-[#1a1a1a] sm:text-[52px] lg:text-[56px]">
          Vind werk in een weekend
          <span className="mt-1 block text-[#3ecf8e]">Groei naar heel Nederland</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            href="/inloggen"
            className="inline-flex h-11 items-center rounded-[var(--radius-control)] bg-[#16a34a] px-5 text-[14px] font-medium text-white hover:bg-[#15803d]"
          >
            Account openen
          </Link>
          <Link
            href="/inloggen"
            className="inline-flex h-11 items-center rounded-[var(--radius-control)] border border-[#d0d0d0] bg-transparent px-5 text-[14px] font-medium text-[#1a1a1a] hover:border-[#1a1a1a]"
          >
            Bekijk opdrachten
          </Link>
        </div>
      </div>
      <p className="max-w-md text-[16px] leading-7 text-[#555] lg:justify-self-end lg:pt-2">
        Zet je vak op de kaart. Ontvang opdrachten bij jou in de buurt, bied op
        klussen en laat opdrachtgevers jou vinden — van één klus tot een volle
        agenda.
      </p>
    </section>
  );
}
