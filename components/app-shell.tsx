import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteChrome } from "@/components/site-chrome";

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
    <SiteChrome
      header={<AppHeader gebruiker={gebruiker} />}
      contentClassName={contentClassName}
    >
      {children}
    </SiteChrome>
  );
}
