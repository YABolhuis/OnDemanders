"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LanguageMenu } from "@/components/language-menu";
import { AccountMenu } from "@/components/account-menu";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";

const navItems = [
  { href: "/klussen", label: "Opdrachten" },
  { href: "/agenda", label: "Agenda" },
  { href: "/financien", label: "Financiën" },
] as const;

export function AppHeader({ gebruiker }: { gebruiker: string }) {
  const pathname = usePathname();

  return (
    <header className="relative z-50 w-full bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <div className="w-full bg-[#111111]">
        <div
          className={`${SITE_WIDTH_CLASS} flex h-8 items-center justify-end px-4`}
        >
          <LanguageMenu />
        </div>
      </div>
      <div className="w-full border-b border-[#e6e6e6] bg-white">
        <div className={`${SITE_WIDTH_CLASS} flex h-14 items-center px-4`}>
          <Link href="/klussen">
            <Image
              src="/optisend-logo.png"
              alt="Optisend"
              width={954}
              height={210}
              className="theme-logo h-6 w-auto"
              priority
            />
          </Link>
          <nav className="ml-10 hidden h-full items-stretch gap-12 lg:flex">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative flex items-center font-[Arial,Helvetica,sans-serif] text-[13px] font-normal text-[#222] hover:text-[#222]"
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
      </div>
    </header>
  );
}
