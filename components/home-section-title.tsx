import type { ReactNode } from "react";

export function HomeSectionTitle({
  id,
  muted,
  children,
}: {
  id?: string;
  muted?: string;
  children: ReactNode;
}) {
  if (muted) {
    return (
      <h2
        id={id}
        className="mb-8 text-[26px] leading-[1.15] font-medium tracking-tight sm:text-[30px] lg:text-[32px]"
      >
        <span className="block text-[#8a8a8a]">{muted}</span>
        <span className="mt-0.5 block text-[#171717]">{children}</span>
      </h2>
    );
  }

  return (
    <h2
      id={id}
      className="mb-7 text-[20px] font-medium tracking-tight text-[#171717] sm:text-[22px]"
    >
      {children}
    </h2>
  );
}
