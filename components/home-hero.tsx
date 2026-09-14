import { HomeHeroForm } from "@/components/home-hero-form";

export function HomeHero() {
  return (
    <section className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <h1 className="text-[28px] leading-[1.15] font-medium tracking-tight text-[#e8e8e6] sm:text-[32px] lg:text-[36px]">
          Vind werk in een weekend
          <span className="mt-0.5 block text-[#3ecf8e]">Groei naar heel Nederland</span>
        </h1>
        <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#9b9b97]">
          Zet je vak op de kaart. Ontvang opdrachten bij jou in de buurt. Bied op
          klussen en laat opdrachtgevers jou vinden.
        </p>
      </div>
      <HomeHeroForm />
    </section>
  );
}
