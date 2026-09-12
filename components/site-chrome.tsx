import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

const rail = "site-rail hidden bg-[#fbfbfb] lg:block border-[#d0d0d0]";
const railRight = `${rail} site-rail-right`;

export function SiteChrome({
  header,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
  spanRightRail = false,
}: {
  header: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
  spanRightRail?: boolean;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#fbfbfb] lg:grid-cols-[var(--site-rail-left)_minmax(0,1fr)_240px] lg:grid-rows-[auto_1fr_auto]">
      {header}

      <aside aria-hidden className={`${rail} border-r`} />
      <div
        className={`relative flex min-w-0 flex-col ${spanRightRail ? "lg:col-span-2" : ""} ${contentClassName}`}
      >
        {leftRail ? (
          <div className="absolute top-0 -left-[var(--site-rail-left)] z-10 hidden w-[var(--site-rail-left)] lg:block">
            {leftRail}
          </div>
        ) : null}
        {leftRail ? (
          <div className="border-b border-[#e6e6e6] lg:hidden">{leftRail}</div>
        ) : null}
        {children}
      </div>
      {spanRightRail ? null : <aside aria-hidden className={railRight} />}

      <div aria-hidden className={`${rail} border-r border-t`} />
      <SiteFooter />
      <div aria-hidden className={`${railRight} border-t`} />
    </div>
  );
}
