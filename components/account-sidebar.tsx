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
    <div className="px-4 py-6">
      <p className="mb-4 px-2 text-[13px] font-semibold text-[#6b6b6b]">Menu</p>
      <nav className="flex flex-col gap-1">
        {items.map((item) => {
          const active = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-md px-3 py-2 text-left text-[14px] ${
                active
                  ? "bg-[#eceff1] font-medium text-[#1a1a1a]"
                  : "text-[#333] hover:bg-[#eceff1]"
              }`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </div>
  );
}
