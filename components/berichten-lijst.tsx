import { CheckCheck } from "lucide-react";
import type { Gesprek } from "@/lib/berichten";

function initialen(naam: string) {
  return naam
    .split(" ")
    .slice(0, 2)
    .map((deel) => deel[0])
    .join("")
    .toUpperCase();
}

export function BerichtenLijst({
  gesprekken,
  selectedId,
  onSelect,
}: {
  gesprekken: Gesprek[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  if (gesprekken.length === 0) {
    return (
      <p className="px-4 py-8 text-center text-[13px]" style={{ color: "var(--wa-muted)" }}>
        Geen gesprekken in dit overzicht.
      </p>
    );
  }

  return (
    <ul>
      {gesprekken.map((gesprek) => {
        const actief = gesprek.id === selectedId;
        const laatste = gesprek.berichten[gesprek.berichten.length - 1];
        const vanMij = laatste?.van === "ik";
        return (
          <li key={gesprek.id}>
            <button
              type="button"
              onClick={() => onSelect(gesprek.id)}
              aria-pressed={actief}
              className={`wa-reset wa-row flex w-full items-center gap-3 px-3 py-2.5 text-left ${
                actief ? "wa-row-on" : ""
              }`}
            >
              <span
                className="flex size-12 shrink-0 items-center justify-center rounded-full text-[15px] font-medium"
                style={{
                  background: "color-mix(in srgb, var(--wa-icon) 22%, transparent)",
                  color: "var(--wa-icon)",
                }}
                aria-hidden
              >
                {initialen(gesprek.naam)}
              </span>
              <span
                className="min-w-0 flex-1 border-b py-1.5"
                style={{ borderColor: "var(--wa-list-line)" }}
              >
                <span className="flex items-baseline justify-between gap-2">
                  <span className="truncate text-[16px]">{gesprek.naam}</span>
                  <span
                    className="shrink-0 text-[12px]"
                    style={{
                      color:
                        gesprek.ongelezen > 0 ? "#006239" : "var(--wa-muted)",
                    }}
                  >
                    {gesprek.tijd}
                  </span>
                </span>
                <span className="mt-0.5 flex items-center justify-between gap-2">
                  <span
                    className="flex min-w-0 items-center gap-1 truncate text-[14px]"
                    style={{ color: "var(--wa-muted)" }}
                  >
                    {vanMij ? (
                      <CheckCheck
                        className="size-3.5 shrink-0"
                        strokeWidth={2}
                        style={{ color: "var(--wa-tick)" }}
                        aria-hidden
                      />
                    ) : null}
                    <span className="truncate">{gesprek.bericht}</span>
                  </span>
                  {gesprek.ongelezen > 0 ? (
                    <span className="flex h-[19px] min-w-[19px] shrink-0 items-center justify-center rounded-full bg-[#006239] px-1 text-[11px] font-semibold text-white shadow-[inset_0_0_0_1px_#138253]">
                      {gesprek.ongelezen}
                    </span>
                  ) : null}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
