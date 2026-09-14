import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteChrome } from "@/components/site-chrome";

export function AppShell({
  gebruiker,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
  spanRightRail = false,
  centered = false,
}: {
  gebruiker: string;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
  spanRightRail?: boolean;
  centered?: boolean;
}) {
  return (
    <SiteChrome
      header={<AppHeader gebruiker={gebruiker} inset={centered} />}
      contentClassName={contentClassName}
      leftRail={leftRail}
      spanRightRail={spanRightRail}
      centered={centered}
    >
      {children}
    </SiteChrome>
  );
}
