"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { AccountMenu } from "@/components/account-menu";

const navItems = [
  { href: "/klussen", label: "Opdrachten" },
  { href: "/agenda", label: "Agenda" },
  { href: "/financien", label: "Financiën" },
] as const;

export function AppHeader({ gebruiker }: { gebruiker: string }) {
  const pathname = usePathname();

  return (
    <header className="relative z-50 w-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <div className="flex h-8 w-full items-center justify-end bg-[#111111] pr-4">
        <LanguageMenu />
      </div>
      <div className="flex h-14 w-full items-center border-b border-[#e6e6e6] bg-white pl-6 pr-4">
        <Link href="/klussen">
          <Image
            src="/optisend-logo.png"
            alt="Optisend"
            width={954}
            height={210}
            className="h-6 w-auto"
            priority
          />
        </Link>
        <nav className="ml-8 hidden h-full items-stretch gap-7 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex items-center font-[Arial,Helvetica,sans-serif] text-[14px] text-[#333] hover:text-[#d91222]"
              >
                {item.label}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-[3px] bg-[#2f6fed]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <AccountMenu gebruiker={gebruiker} />
        </div>
      </div>
    </header>
  );
}
