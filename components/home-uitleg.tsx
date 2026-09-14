import { Check, ClipboardList, PaintRoller } from "lucide-react";
import { HomeSectionTitle } from "@/components/home-section-title";

const stappen = [
  "1. Kennismaken & bekijken",
  "2. Duidelijke offerte",
  "3. Netjes uitgevoerd",
  "Persoonlijk advies bij jouw woning",
] as const;

const oplevering = [
  "Heldere planning",
  "Bescherming van vloeren en meubels",
  "Schoon en netjes opgeleverd",
] as const;

function Beeldvlak({ icon: Icon }: { icon: typeof PaintRoller }) {
  return (
    <div
      aria-hidden
      className="flex min-h-[240px] items-center justify-center rounded-[16px] border border-white/10 bg-[#171717] lg:min-h-[280px]"
    >
      <Icon className="size-16 text-[#e8e8e6]" strokeWidth={1.25} />
    </div>
  );
}

export function HomeUitleg() {
  return (
    <div className="flex flex-col gap-14 lg:gap-20">
      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <HomeSectionTitle className="mb-5" muted="Zonder gedoe naar">
            strak schilderwerk
          </HomeSectionTitle>
          <p className="max-w-md text-[15px] leading-7 text-[#737373]">
            Je weet vooraf waar je aan toe bent. Ik luister naar je wensen, maak
            duidelijke afspraken en lever netjes op.
          </p>
          <ul className="mt-5 space-y-2 text-[14px] leading-6 text-[#e8e8e6]">
            {stappen.map((stap) => (
              <li key={stap}>{stap}</li>
            ))}
          </ul>
        </div>
        <Beeldvlak icon={ClipboardList} />
      </section>

      <section className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="lg:order-2">
          <HomeSectionTitle className="mb-5" muted="Vakwerk dat je">
            elke dag ziet
          </HomeSectionTitle>
          <p className="max-w-md text-[15px] leading-7 text-[#737373]">
            Goede voorbereiding, kwaliteitsmaterialen en een rustige, zorgvuldige
            uitvoering. Zo wordt jouw woning weer een plek waar alles klopt.
          </p>
          <ul className="mt-5 space-y-2.5 text-[14px] leading-6 text-[#e8e8e6]">
            {oplevering.map((punt) => (
              <li key={punt} className="flex items-start gap-2.5">
                <Check
                  className="mt-0.5 size-4 shrink-0 text-[#3ecf8e]"
                  strokeWidth={2.5}
                  aria-hidden
                />
                {punt}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:order-1">
          <Beeldvlak icon={PaintRoller} />
        </div>
      </section>
    </div>
  );
}
