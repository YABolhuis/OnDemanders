import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function HomeSectionTitle({
  id,
  muted,
  className,
  children,
}: {
  id?: string;
  muted?: string;
  className?: string;
  children: ReactNode;
}) {
  if (muted) {
    return (
      <h2
        id={id}
        className={cn(
          "mb-8 text-[26px] leading-[1.15] font-medium tracking-tight sm:text-[30px] lg:text-[32px]",
          className
        )}
      >
        <span className="block text-[#8a8a8a]">{muted}</span>
        <span className="mt-0.5 block text-[#171717]">{children}</span>
      </h2>
    );
  }

  return (
    <h2
      id={id}
      className={cn(
        "mb-7 text-[20px] font-medium tracking-tight text-[#171717] sm:text-[22px]",
        className
      )}
    >
      {children}
    </h2>
  );
}
