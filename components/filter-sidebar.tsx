import type { ReactNode } from "react";

export function FilterSidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="w-[288px] shrink-0 px-3 py-5">
      <div className="sticky top-24 max-h-[calc(100vh-7.5rem)] overflow-y-auto rounded-[12px] border border-[#b8b5b0] bg-[#f9fafb] p-5 font-[Arial,Helvetica,sans-serif]">
        {children}
      </div>
    </aside>
  );
}
