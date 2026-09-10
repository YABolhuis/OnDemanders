import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";

const rail =
  "hidden bg-[#fbfbfb] lg:block border-[#d0d0d0]";

export function AppShell({
  gebruiker,
  children,
  contentClassName = "bg-[#fbfbfb]",
}: {
  gebruiker: string;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#fbfbfb] lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:grid-rows-[auto_1fr_auto]">
      <div aria-hidden className={`${rail} border-r border-b`} />
      <AppHeader gebruiker={gebruiker} />
      <div aria-hidden className={`${rail} border-l border-b`} />

      <aside aria-hidden className={`${rail} border-r`} />
      <div className={`flex min-w-0 flex-col ${contentClassName}`}>
        {children}
      </div>
      <aside aria-hidden className={`${rail} border-l`} />

      <div aria-hidden className={`${rail} border-r border-t`} />
      <SiteFooter />
      <div aria-hidden className={`${rail} border-l border-t`} />
    </div>
  );
}
