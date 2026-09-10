import type { ReactNode } from "react";

export function FilterSidebar({ children }: { children: ReactNode }) {
  return (
    <aside className="min-h-[calc(100vh-57px)] w-[288px] shrink-0 border-r border-[#c4c1bb] bg-[#fbfbfb] px-4 py-5">
      {children}
    </aside>
  );
}
