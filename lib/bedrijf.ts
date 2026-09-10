const VESTIGING_KEY = "optisend-vestigingsplaats";
export const STANDAARD_VESTIGING = "Warffum";

export function leesVestigingsplaats() {
  try {
    const stored = localStorage.getItem(VESTIGING_KEY)?.trim();
    if (stored) {
      return stored;
    }
  } catch {
    /* ignore */
  }
  return STANDAARD_VESTIGING;
}

export function slaVestigingsplaatsOp(plaats: string) {
  const waarde = plaats.trim() || STANDAARD_VESTIGING;
  try {
    localStorage.setItem(VESTIGING_KEY, waarde);
  } catch {
    /* ignore */
  }
  return waarde;
}
