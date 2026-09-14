import { Link2, RefreshCcw, Shield } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { HomeSectionTitle } from "@/components/home-section-title";

const items: {
  icon: LucideIcon;
  title: string;
  body: string;
}[] = [
  {
    icon: RefreshCcw,
    title: "Lorem ipsum dolor sit",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim.",
  },
  {
    icon: Link2,
    title: "Consectetur adipiscing elit",
    body: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor.",
  },
  {
    icon: Shield,
    title: "Sed do eiusmod tempor",
    body: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat.",
  },
];

export function HomeKenmerken() {
  return (
    <section>
      <HomeSectionTitle>Kenmerken</HomeSectionTitle>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 lg:gap-12">
      {items.map((item) => (
        <article key={item.title} className="min-w-0">
          <h3 className="flex items-center gap-2.5 pl-[26px] text-[15px] font-medium tracking-tight text-[#e8e8e6]">
            <item.icon className="size-4 shrink-0" strokeWidth={1.75} aria-hidden />
            {item.title}
          </h3>
          <p className="mt-1.5 pl-[26px] text-[14px] leading-6 text-[#737373]">
            {item.body}
          </p>
        </article>
      ))}
      </div>
    </section>
  );
}
