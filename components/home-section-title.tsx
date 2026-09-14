import type { ReactNode } from "react";

export function HomeSectionTitle({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2
      id={id}
      className="mb-7 text-[20px] font-medium tracking-tight text-[#171717] sm:text-[22px]"
    >
      {children}
    </h2>
  );
}
