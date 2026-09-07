"use client";

import { usePathname } from "next/navigation";

const items = [
  { href: "/profiel", label: "Mijn account" },
  { href: "/mijn-profiel", label: "Mijn profiel" },
  { href: "/abonement-credits", label: "Abonement & credits" },
] as const;

export function AccountSidebar() {
  const pathname = usePathname();

  return (
    <aside className="min-h-[calc(100vh-88px)] w-[280px] shrink-0 border-r border-white/10 bg-[#1b2730] px-4 py-6">
      <p className="mb-4 px-2 text-[13px] font-semibold text-[#9aa8b0]">Menu</p>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-left text-[14px] ${
                active
                  ? "bg-white/10 font-medium text-[#8fd14f]"
                  : "text-[#d5dde2] hover:bg-white/5"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
