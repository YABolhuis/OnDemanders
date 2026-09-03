"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

function CheckboxFilter({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? items : items.slice(0, 3);

  return (
    <div>
      <h2 className="mb-3 text-[16px] font-semibold text-[#1f2f46]">{title}</h2>
      <div className="space-y-3">
        {visible.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-[15px] text-[#163a6b]"
          >
            <input
              type="checkbox"
              className="size-3.5 shrink-0 rounded-sm border border-[#bfc4cc] bg-white accent-[#1d5fd1]"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {items.length > 3 ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="mt-3 flex items-center gap-1 text-[14px] font-medium text-[#1d5fd1] underline underline-offset-2"
        >
          {expanded ? "Lees minder" : "Lees meer"}
          {expanded ? (
            <ChevronUp className="size-4" strokeWidth={2} aria-hidden />
          ) : (
            <ChevronDown className="size-4" strokeWidth={2} aria-hidden />
          )}
        </button>
      ) : null}
    </div>
  );
}

export function VakgebiedList() {
  return (
    <div className="space-y-6">
      <CheckboxFilter
        title="Vakgebied"
        items={["Schilder", "Stukadoor", "Dakdekker", "Loodgieter"]}
      />
      <CheckboxFilter
        title="Type pand"
        items={["Woning", "Nieuwbouw", "Bedrijfspand / kantoor"]}
      />
      <CheckboxFilter
        title="Omvang van het werk"
        items={["< 1 dag", "1 - 5 dagen", "> 1 week"]}
      />
    </div>
  );
}
