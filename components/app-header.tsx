"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { AccountMenu } from "@/components/account-menu";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";
import { aantalOngelezenBerichten } from "@/lib/berichten";

const navItems = [
  { href: "/klussen", label: "Vind opdrachten" },
  { href: "/berichten", label: "Berichten" },
] as const;

export function AppHeader({
  gebruiker,
  showEdge = true,
}: {
  gebruiker: string;
  showEdge?: boolean;
}) {
  const pathname = usePathname();
  const ongelezen = aantalOngelezenBerichten();

  return (
    <header className="site-rail relative z-50 w-full bg-[#fbfbfb]">
      <div
        className={`w-full bg-[#fbfbfb] ${showEdge ? "border-b border-[#d0d0d0]" : ""}`}
      >
        <div className={`${SITE_WIDTH_CLASS} flex h-14 items-center px-10`}>
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
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="site-nav-link relative flex items-center hover:text-[#222]"
                >
                  <span className="relative inline-block">
                    {item.label}
                    {item.href === "/berichten" && ongelezen > 0 ? (
                      <span
                        className="absolute -top-2 -right-2.5 z-10 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#25d366] px-1 text-[10px] font-semibold text-white shadow-[0_1px_2px_rgba(0,0,0,0.25)]"
                        aria-label={`${ongelezen} ongelezen berichten`}
                      >
                        {ongelezen}
                      </span>
                    ) : null}
                  </span>
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
            <LanguageMenu variant="compact" />
            <button
              type="button"
              aria-label="Meldingen"
              className="flex size-8 items-center justify-center rounded-[3px] bg-[#eceff1] text-[#1a1a1a] hover:bg-[#e4e7ea]"
            >
              <Bell className="size-4" strokeWidth={2} aria-hidden />
            </button>
            <AccountMenu gebruiker={gebruiker} />
          </div>
        </div>
      </div>
    </header>
  );
}
