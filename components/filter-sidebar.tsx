import type { ReactNode } from "react";

export function FilterSidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="w-[288px] shrink-0 self-start px-3 py-5 lg:sticky lg:top-24">
      <div className="rounded-[12px] border border-[#b8b5b0] bg-[#f3f2ef] p-5 font-[Arial,Helvetica,sans-serif]">
        {children}
      </div>
    </aside>
  );
}
