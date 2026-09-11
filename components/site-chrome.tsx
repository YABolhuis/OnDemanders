import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";

const rail = "hidden bg-[#fbfbfb] lg:block border-[#d0d0d0]";

export function SiteChrome({
  header,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
}: {
  header: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#fbfbfb] lg:grid-cols-[240px_minmax(0,1fr)_240px] lg:grid-rows-[auto_1fr_auto]">
      <div aria-hidden className={`${rail} border-r border-b`} />
      {header}
      <div aria-hidden className={`${rail} border-l border-b`} />

      <aside aria-hidden className={`${rail} border-r`} />
      <div className={`relative flex min-w-0 flex-col ${contentClassName}`}>
        {leftRail ? (
          <div className="absolute top-0 -left-[240px] z-10 hidden w-[240px] lg:block">
            {leftRail}
          </div>
        ) : null}
        {leftRail ? (
          <div className="border-b border-[#e6e6e6] lg:hidden">{leftRail}</div>
        ) : null}
        {children}
      </div>
      <aside aria-hidden className={`${rail} border-l`} />

      <div aria-hidden className={`${rail} border-r border-t`} />
      <SiteFooter />
      <div aria-hidden className={`${rail} border-l border-t`} />
    </div>
  );
}
