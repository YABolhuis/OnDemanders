import type { ReactNode } from "react";

export function FilterSidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="w-[288px] shrink-0 self-start px-3 py-5">
      <div className="rounded-[3px] bg-[#f9fafb] p-5 font-[Arial,Helvetica,sans-serif]">
        {children}
      </div>
    </aside>
  );
}
