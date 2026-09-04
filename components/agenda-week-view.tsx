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

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
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

function gmtLabel() {
  const hours = -new Date().getTimezoneOffset() / 60;
  const sign = hours >= 0 ? "+" : "";
  return `GMT${sign}${hours}`;
}

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

export function AgendaWeekView() {
  const today = useMemo(() => new Date(), []);
  const [weekStart, setWeekStart] = useState(() => mondayOf(new Date()));
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, index) => addDays(weekStart, index)),
    [weekStart]
  );
  const label = useMemo(() => rangeLabel(weekStart), [weekStart]);

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-white">
      <div className="flex h-11 w-full shrink-0 items-center gap-4 bg-[#1b1f3b] px-4 font-[Arial,Helvetica,sans-serif] text-white">
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

      <div className="min-h-0 flex-1 overflow-auto font-[Arial,Helvetica,sans-serif]">
        <div className="grid min-w-[720px] grid-cols-[56px_repeat(7,minmax(0,1fr))]">
          <div className="sticky top-0 z-10 border-b border-[#ececec] bg-white px-1 pt-2 pb-3 text-right text-[10px] text-[#8a8a8a]">
            {gmtLabel()}
          </div>
          {days.map((day) => {
            const isToday = sameDay(day, today);
            const weekday = day.toLocaleDateString("nl-NL", { weekday: "short" });
            return (
              <div
                key={day.toISOString()}
                className="sticky top-0 z-10 border-b border-l border-[#ececec] bg-white py-2 text-center"
              >
                <div className="text-[12px] text-[#555] lowercase">{weekday}</div>
                <div className="mt-1 flex justify-center">
                  <span
                    className={`flex size-7 items-center justify-center text-[15px] ${
                      isToday
                        ? "border-2 border-[#2f6fed] font-semibold text-[#2f6fed]"
                        : "text-[#222]"
                    }`}
                  >
                    {day.getDate()}
                  </span>
                </div>
              </div>
            );
          })}

          {HOURS.map((hour) => (
            <div key={hour} className="contents">
              <div className="h-12 border-b border-[#f0f0f0] pr-2 text-right text-[11px] leading-none text-[#8a8a8a]">
                <span className="-translate-y-1.5 relative top-[-6px] inline-block">
                  {String(hour).padStart(2, "0")}:00
                </span>
              </div>
              {days.map((day) => (
                <div
                  key={`${day.toISOString()}-${hour}`}
                  className="h-12 border-b border-l border-[#ececec]"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
