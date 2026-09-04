"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function mondayOf(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const offset = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - offset);
  return d;
}

function addDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + days);
}

function monthYear(date: Date) {
  return date.toLocaleDateString("nl-NL", { month: "short", year: "numeric" });
}

function rangeLabel(start: Date) {
  const end = addDays(start, 6);
  const startText = start.toLocaleDateString("nl-NL", { month: "short" });
  const endText = end.toLocaleDateString("nl-NL", { month: "short" });
  const year = end.getFullYear();

  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${startText} ${year}`;
  }

  if (start.getFullYear() === end.getFullYear()) {
    return `${startText} – ${endText} ${year}`;
  }

  return `${monthYear(start)} – ${monthYear(end)}`;
}

export function AgendaToolbar() {
  const [weekStart, setWeekStart] = useState(() => mondayOf(new Date()));
  const label = useMemo(() => rangeLabel(weekStart), [weekStart]);

  return (
    <div className="flex h-11 w-full items-center gap-4 bg-[#1b1f3b] px-4 font-[Arial,Helvetica,sans-serif] text-white">
      <button
        type="button"
        onClick={() => setWeekStart(mondayOf(new Date()))}
        className="h-7 rounded-sm border border-white/55 px-3 text-[13px] hover:bg-white/10"
      >
        Vandaag
      </button>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="Vorige periode"
          onClick={() => setWeekStart(addDays(weekStart, -7))}
          className="flex size-7 items-center justify-center hover:bg-white/10"
        >
          <ChevronLeft className="size-4" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Volgende periode"
          onClick={() => setWeekStart(addDays(weekStart, 7))}
          className="flex size-7 items-center justify-center hover:bg-white/10"
        >
          <ChevronRight className="size-4" strokeWidth={2} />
        </button>
      </div>
      <span className="text-[14px] font-semibold lowercase">{label}</span>
    </div>
  );
}
