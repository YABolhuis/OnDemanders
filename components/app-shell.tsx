import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteChrome } from "@/components/site-chrome";

export function AppShell({
  gebruiker,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
}: {
  gebruiker: string;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
}) {
  return (
    <SiteChrome
      header={<AppHeader gebruiker={gebruiker} />}
      contentClassName={contentClassName}
      leftRail={leftRail}
    >
      {children}
    </SiteChrome>
  );
}
