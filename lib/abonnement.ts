const PLAN_KEY = "optisend-plan";

export type AbonnementPlan = "starter" | "plus";

export function leesAbonnement(): AbonnementPlan {
  try {
    const stored = localStorage.getItem(PLAN_KEY);
    if (stored === "plus") {
      return "plus";
    }
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
