const PLAN_KEY = "optisend-plan";

export type AbonnementPlan = "starter" | "plus-3" | "plus-12" | "plus-24";

export type LidmaatschapDeal = {
  id: Exclude<AbonnementPlan, "starter">;
  oudPrijs: number;
  prijs: number;
  tegoed: number;
  maanden: number;
  uitgelicht: boolean;
};

export const LIDMAATSCHAP_DEALS: LidmaatschapDeal[] = [
  {
    id: "plus-3",
    oudPrijs: 65,
    prijs: 59,
    tegoed: 65,
    maanden: 3,
    uitgelicht: false,
  },
  {
    id: "plus-12",
    oudPrijs: 125,
    prijs: 99,
    tegoed: 125,
    maanden: 12,
    uitgelicht: true,
  },
  {
    id: "plus-24",
    oudPrijs: 200,
    prijs: 139,
    tegoed: 200,
    maanden: 24,
    uitgelicht: false,
  },
];

function normaliseerPlan(value: string | null): AbonnementPlan {
  if (value === "plus" || value === "plus-12") {
    return "plus-12";
  }
  if (value === "plus-3" || value === "plus-24") {
    return value;
  }
  return "starter";
}

export function leesAbonnement(): AbonnementPlan {
  try {
    return normaliseerPlan(localStorage.getItem(PLAN_KEY));
  } catch {
    /* ignore */
  }
  return "starter";
}

export function slaAbonnementOp(plan: AbonnementPlan) {
  try {
    localStorage.setItem(PLAN_KEY, plan);
  } catch {
    /* ignore */
  }
}

export function heeftFreelancerPlus(plan: AbonnementPlan) {
  return plan !== "starter";
}

export function dealVoorPlan(plan: AbonnementPlan) {
  return LIDMAATSCHAP_DEALS.find((deal) => deal.id === plan) ?? null;
}

export function abonnementLabel(plan: AbonnementPlan) {
  const deal = dealVoorPlan(plan);
  if (!deal) {
    return "Starter";
  }
  return `Freelancer Plus · ${deal.maanden} maanden`;
}
