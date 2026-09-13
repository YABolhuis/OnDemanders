import Link from "next/link";

export function HomeHero() {
  return (
    <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h1 className="text-[40px] leading-[1.06] font-medium tracking-tight text-[#171717] sm:text-[48px] lg:text-[52px]">
          Vind werk in een weekend
          <span className="mt-1 block text-[#3ecf8e]">Groei naar heel Nederland</span>
        </h1>
        <div className="mt-8 flex flex-wrap items-center gap-2.5">
          <Link
            href="/inloggen"
            className="landing-pill inline-flex h-9 items-center rounded-full bg-[#16a34a] px-4 text-[13px] font-medium text-white hover:bg-[#15803d]"
          >
            Account openen
          </Link>
          <Link
            href="/inloggen"
            className="landing-pill inline-flex h-9 items-center rounded-full border border-[#d4d4d4] bg-white px-4 text-[13px] font-medium text-[#171717] hover:border-[#171717]"
          >
            Bekijk opdrachten
          </Link>
        </div>
      </div>
      <p className="max-w-[20.5rem] text-[15px] leading-7 text-[#737373] lg:justify-self-end lg:pt-3">
        Zet je vak op de kaart. Ontvang opdrachten bij jou in de buurt. Bied op
        klussen en laat opdrachtgevers jou vinden.
      </p>
    </section>
  );
}
