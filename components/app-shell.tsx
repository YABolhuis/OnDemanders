import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";

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
    <div className="flex min-h-screen flex-col bg-[#fbfbfb]">
      <div className="flex border-b border-[#d0d0d0]">
        <div
          aria-hidden
          className="hidden w-[240px] shrink-0 bg-[#fbfbfb] lg:block"
        />
        <div className="min-w-0 flex-1">
          <AppHeader gebruiker={gebruiker} showEdge={false} />
        </div>
        <div
          aria-hidden
          className="hidden w-[240px] shrink-0 bg-[#fbfbfb] lg:block"
        />
      </div>
      <div className="flex min-h-0 flex-1 items-stretch">
        <aside
          aria-hidden
          className="hidden w-[240px] shrink-0 border-r border-[#d0d0d0] bg-[#fbfbfb] lg:block"
        />
        <div
          className={`flex min-w-0 flex-1 flex-col ${contentClassName}`}
        >
          {children}
        </div>
        <aside
          aria-hidden
          className="hidden w-[240px] shrink-0 border-l border-[#d0d0d0] bg-[#fbfbfb] lg:block"
        />
      </div>
      <div className="flex border-t border-[#d0d0d0]">
        <div
          aria-hidden
          className="hidden w-[240px] shrink-0 bg-[#fbfbfb] lg:block"
        />
        <div className="min-w-0 flex-1">
          <SiteFooter showEdge={false} />
        </div>
        <div
          aria-hidden
          className="hidden w-[240px] shrink-0 bg-[#fbfbfb] lg:block"
        />
      </div>
    </div>
  );
}
