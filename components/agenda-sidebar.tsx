"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["M", "D", "W", "D", "V", "Z", "Z"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isoWeek(date: Date) {
  const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = utc.getUTCDay() || 7;
  utc.setUTCDate(utc.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(utc.getUTCFullYear(), 0, 1));
  return Math.ceil(((utc.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

function monthGrid(year: number, month: number) {
  const first = new Date(year, month, 1);
  const mondayOffset = (first.getDay() + 6) % 7;
  const start = new Date(year, month, 1 - mondayOffset);
  const weeks: Date[][] = [];

  for (let week = 0; week < 6; week++) {
    const days: Date[] = [];
    for (let day = 0; day < 7; day++) {
      days.push(
        new Date(
          start.getFullYear(),
          start.getMonth(),
          start.getDate() + week * 7 + day
        )
      );
    }
    weeks.push(days);
  }

  return weeks;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function AgendaSidebar() {
  const today = startOfDay(new Date());
  const [cursor, setCursor] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selected, setSelected] = useState(today);

  const weeks = useMemo(
    () => monthGrid(cursor.getFullYear(), cursor.getMonth()),
    [cursor]
  );

  const monthLabel = cursor.toLocaleDateString("nl-NL", {
    month: "long",
    year: "numeric",
  });

  return (
    <aside className="relative z-0 min-h-[calc(100vh-88px)] w-[280px] shrink-0 bg-[#1b1f3b] px-4 py-5 font-[Arial,Helvetica,sans-serif] text-white">
      <button
        type="button"
        className="mb-5 flex h-10 w-full items-center overflow-hidden rounded-md bg-[#6b7cff] text-[14px] font-medium"
      >
        <span className="flex-1 text-center">Nieuwe afspraak</span>
        <span className="flex h-full w-9 items-center justify-center border-l border-white/25">
          <ChevronDown className="size-4" strokeWidth={2} aria-hidden />
        </span>
      </button>

      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-[15px] font-semibold capitalize">{monthLabel}</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="Vorige maand"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))
            }
            className="flex size-7 items-center justify-center text-white/90 hover:text-white"
          >
            <ChevronLeft className="size-4" strokeWidth={2} />
          </button>
          <button
            type="button"
            aria-label="Volgende maand"
            onClick={() =>
              setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))
            }
            className="flex size-7 items-center justify-center text-white/90 hover:text-white"
          >
            <ChevronRight className="size-4" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[28px_repeat(7,minmax(0,1fr))] text-center text-[11px]">
        <div />
        {WEEKDAYS.map((day, index) => (
          <div
            key={`${day}-${index}`}
            className={`py-1 ${
              ((selected.getDay() + 6) % 7) === index
                ? "font-semibold text-[#6b7cff]"
                : "text-white/70"
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="mt-1">
        {weeks.map((days) => {
          const weekSelected = days.some((day) => sameDay(day, selected));
          return (
            <div
              key={days[0].toISOString()}
              className={`grid grid-cols-[28px_repeat(7,minmax(0,1fr))] items-center ${
                weekSelected ? "rounded-sm bg-white/10" : ""
              }`}
            >
              <span className="border-r border-white/15 py-1 text-center text-[10px] text-white/45">
                {isoWeek(days[0])}
              </span>
              {days.map((day) => {
                const inMonth = day.getMonth() === cursor.getMonth();
                const isSelected = sameDay(day, selected);
                return (
                  <button
                    key={day.toISOString()}
                    type="button"
                    onClick={() => setSelected(startOfDay(day))}
                    className={`mx-auto my-0.5 flex size-7 items-center justify-center text-[12px] ${
                      isSelected
                        ? "bg-[#6b7cff] font-semibold text-white"
                        : inMonth
                          ? "text-white"
                          : "text-white/30"
                    }`}
                  >
                    {day.getDate()}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
