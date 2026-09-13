import { GoogleMark } from "@/components/google-mark";
import { HomeHeroForm } from "@/components/home-hero-form";

export function HomeHero() {
  return (
    <section className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(280px,360px)] lg:gap-12">
      <div className="lg:pl-20 xl:pl-28">
        <h1 className="text-[28px] leading-[1.15] font-medium tracking-tight text-[#1a1a1a] sm:text-[32px] lg:text-[36px]">
          Vind werk in een weekend
          <span className="mt-0.5 block text-[#3ecf8e]">Groei naar heel Nederland</span>
        </h1>
        <p className="mt-5 max-w-xl text-[14px] leading-6 text-[#555]">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        <div className="mt-8 flex max-w-xl items-start gap-4">
          <GoogleMark className="mt-0.5 size-9 shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8">
              <div className="shrink-0">
                <p className="text-[18px] leading-6 font-semibold text-[#1a1a1a]">
                  4.9/5 Google reviews
                </p>
                <p className="mt-0.5 text-[13px] text-[#777]">
                  Gebaseerd op 2K+ reviews
                </p>
              </div>
              <p className="text-[13px] leading-5 text-[#555] sm:max-w-[16rem]">
                Meer dan 2.000 tevreden klanten achter ons, leveren we met trots
                professionele oplossingen van topkwaliteit.
              </p>
            </div>
          </div>
        </div>
      </div>
      <HomeHeroForm />
    </section>
  );
}
