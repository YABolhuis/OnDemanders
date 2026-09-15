import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";
import { SiteChrome } from "@/components/site-chrome";
import { APP_SHELL } from "@/lib/site-width";

export function AppShell({
  gebruiker,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
  spanRightRail = false,
  centered = false,
  insetClassName,
}: {
  gebruiker: string;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
  spanRightRail?: boolean;
  centered?: boolean;
  insetClassName?: string;
}) {
  const headerShell = insetClassName ?? (centered ? APP_SHELL : undefined);
  return (
    <SiteChrome
      header={
        <AppHeader
          gebruiker={gebruiker}
          inset={Boolean(headerShell)}
          insetClassName={headerShell}
        />
      }
      contentClassName={contentClassName}
      leftRail={leftRail}
      spanRightRail={spanRightRail}
      centered={centered}
      insetClassName={insetClassName ?? (centered ? APP_SHELL : undefined)}
    >
      {children}
    </SiteChrome>
  );
}
