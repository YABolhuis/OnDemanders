import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteChrome } from "@/components/site-chrome";

export function AppShell({
  gebruiker,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
  spanRightRail = false,
}: {
  gebruiker: string;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
  spanRightRail?: boolean;
}) {
  return (
    <SiteChrome
      header={<AppHeader gebruiker={gebruiker} />}
      contentClassName={contentClassName}
      leftRail={leftRail}
      spanRightRail={spanRightRail}
    >
      {children}
    </SiteChrome>
  );
}
