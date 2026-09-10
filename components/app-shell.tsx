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
    <div className="flex min-h-screen items-stretch bg-[#fbfbfb]">
      <aside
        aria-hidden
        className="hidden w-[240px] shrink-0 border-r border-[#d0d0d0] bg-[#fbfbfb] lg:block"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader gebruiker={gebruiker} />
        <div className={`flex min-w-0 flex-1 flex-col ${contentClassName}`}>
          {children}
        </div>
        <SiteFooter />
      </div>
      <aside
        aria-hidden
        className="hidden w-[240px] shrink-0 border-l border-[#d0d0d0] bg-[#fbfbfb] lg:block"
      />
    </div>
  );
}
