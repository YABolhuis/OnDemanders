"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { LanguageMenu } from "@/components/language-menu";
import { AccountMenu } from "@/components/account-menu";
import { aantalOngelezenBerichten } from "@/lib/berichten";
import { APP_SHELL } from "@/lib/site-width";

const navItems = [
  { href: "/klussen/vak/schilder", match: "/klussen", label: "Vind opdrachten" },
  { href: "/berichten", match: "/berichten", label: "Berichten" },
] as const;

export function AppHeader({
  gebruiker,
  showEdge = true,
  inset = false,
  insetClassName,
}: {
  gebruiker: string;
  showEdge?: boolean;
  inset?: boolean;
  insetClassName?: string;
}) {
  const pathname = usePathname();
  const ongelezen = aantalOngelezenBerichten();

  return (
    <header
      className={`relative z-50 w-full bg-[#fbfbfb] ${
        showEdge ? "border-b border-[#d0d0d0]" : ""
      }`}
    >
      <div
        className={`flex h-14 items-center justify-between gap-6 ${
          insetClassName ?? (inset ? APP_SHELL : "w-full px-4 lg:px-10")
        }`}
      >
        <div className="flex min-w-0 items-center gap-6 lg:gap-10">
          <Link href="/klussen/vak/schilder" className="shrink-0">
            <Image
              src="/optisend-logo.png"
              alt="Optisend"
              width={954}
              height={210}
              className="theme-logo h-6 w-auto"
              priority
            />
          </Link>
          <nav className="hidden h-14 items-stretch gap-10 lg:flex">
            {navItems.map((item) => {
              const active =
                pathname === item.match || pathname.startsWith(`${item.match}/`);
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
        </div>
        <div className="flex items-center gap-3">
          <LanguageMenu variant="compact" />
          <button
            type="button"
            aria-label="Meldingen"
            className="flex size-8 items-center justify-center rounded-[3px] bg-transparent text-[#1a1a1a] hover:bg-[#f5f5f5]"
          >
            <Bell className="size-4" strokeWidth={2} aria-hidden />
          </button>
          <AccountMenu gebruiker={gebruiker} />
        </div>
      </div>
    </header>
  );
}
