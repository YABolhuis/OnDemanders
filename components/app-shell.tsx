import type { ReactNode } from "react";
import { AppHeader } from "@/components/app-header";

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
        className={`mx-auto flex w-full max-w-[1200px] flex-1 flex-col ${contentClassName}`}
      >
        {children}
      </div>
    </div>
  );
}
