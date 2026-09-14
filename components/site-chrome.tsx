import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { LandingSideTab } from "@/components/landing-side-tab";
import { APP_SHELL } from "@/lib/site-width";

export function SiteChrome({
  header,
  children,
  contentClassName = "bg-[#fbfbfb]",
  leftRail,
  spanRightRail = false,
  landing = false,
  centered = false,
}: {
  header: ReactNode;
  children: ReactNode;
  contentClassName?: string;
  leftRail?: ReactNode;
  spanRightRail?: boolean;
  landing?: boolean;
  centered?: boolean;
}) {
  void spanRightRail;

  if (landing) {
    return (
      <div className="landing-page flex min-h-screen flex-col bg-[#171717]">
        <LandingSideTab />
        {header}
        <div className="relative flex min-w-0 flex-1 flex-col bg-[#171717]">
          {children}
        </div>
        <SiteFooter inset />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fbfbfb]">
      <LandingSideTab />
      {header}
      <div
        className={`relative flex min-w-0 flex-1 flex-col ${
          leftRail ? "lg:grid lg:grid-cols-[var(--site-rail-left)_minmax(0,1fr)]" : ""
        }`}
      >
        {leftRail ? (
          <div className="site-rail border-b border-[#e6e6e6] bg-[#fbfbfb] lg:border-r lg:border-b-0 lg:border-[#d0d0d0]">
            {leftRail}
          </div>
        ) : null}
        <div className={`relative flex min-w-0 flex-1 flex-col ${contentClassName}`}>
          {children}
        </div>
      </div>
      <SiteFooter innerClassName={centered ? APP_SHELL : undefined} />
    </div>
  );
}
