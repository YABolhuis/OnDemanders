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
    <div className="flex min-h-screen flex-col bg-background">
      <AppHeader gebruiker={gebruiker} />
      <div
        className={`${SITE_WIDTH_CLASS} flex flex-1 flex-col ${contentClassName}`}
      >
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
