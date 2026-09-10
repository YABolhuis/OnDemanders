import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";

export function AppShell({
  gebruiker,
  children,
  contentClassName = "bg-white",
}: {
  gebruiker: string;
  children: ReactNode;
  contentClassName?: string;
}) {
  return (
    <div className="flex min-h-screen bg-[#fafafa]">
      <aside
        aria-hidden
        className="hidden w-[240px] shrink-0 border-r border-[#d0d0d0] bg-[#fafafa] lg:block"
      />
      <div className={`${SITE_WIDTH_CLASS} flex min-w-0 flex-1 flex-col`}>
        <AppHeader gebruiker={gebruiker} />
        <div className={`flex flex-1 flex-col ${contentClassName}`}>
          {children}
        </div>
        <SiteFooter />
      </div>
      <aside
        aria-hidden
        className="hidden w-[240px] shrink-0 border-l border-[#d0d0d0] bg-[#fafafa] lg:block"
      />
    </div>
  );
}
