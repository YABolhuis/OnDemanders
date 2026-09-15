const KEY = "optisend-notificaties";
const EVENT = "optisend-notificaties";

export const BERICHT_NOTIFICATIE_ID = "bericht-notificaties";

type Kaart = Record<string, boolean>;

function leesKaart(): Kaart {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      return {};
    }
    const parsed = JSON.parse(raw) as Kaart;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function leesNotificatie(id: string, fallback = true) {
  const kaart = leesKaart();
  if (kaart[id] === undefined) {
    return fallback;
  }
  return Boolean(kaart[id]);
}

export function schrijfNotificatie(id: string, aan: boolean) {
  try {
    const kaart = { ...leesKaart(), [id]: aan };
    localStorage.setItem(KEY, JSON.stringify(kaart));
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: { id, aan } }));
  }
}

export function abonneerNotificaties(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
