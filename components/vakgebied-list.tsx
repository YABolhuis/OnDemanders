"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const vakgebieden = ["Schilder", "Stukadoor", "Dakdekker", "Loodgieter"];

export function VakgebiedList() {
  const [expanded, setExpanded] = useState(false);
  const visible = expanded ? vakgebieden : vakgebieden.slice(0, 3);

  return (
    <div>
      <h2 className="mb-3 text-[16px] font-semibold text-[#1f2f46]">
        Vakgebied
      </h2>
      <div className="space-y-3">
        {visible.map((item) => (
          <label
            key={item}
            className="flex items-center gap-2 text-[15px] text-[#163a6b]"
          >
            <input
              type="checkbox"
              className="size-3.5 rounded-sm border border-[#bfc4cc] bg-white accent-[#1d5fd1]"
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
      {vakgebieden.length > 3 ? (
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
