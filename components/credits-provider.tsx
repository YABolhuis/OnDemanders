"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SALDO_KEY = "optisend-credits";
const UNLOCKED_KEY = "optisend-unlocked-chats";
const START_SALDO = 25;

type CreditsContextValue = {
  saldo: number;
  spendCredits: (aantal: number) => boolean;
  addCredits: (aantal: number) => void;
  isChatUnlocked: (klusId: string) => boolean;
  unlockChat: (klusId: string) => void;
};

const CreditsContext = createContext<CreditsContextValue | null>(null);

function readSaldo() {
  try {
    const stored = localStorage.getItem(SALDO_KEY);
    if (stored != null) {
      const value = Number(stored);
      if (Number.isFinite(value) && value >= 0) {
        return value;
      }
    }
  } catch {
    /* ignore */
  }
  return START_SALDO;
}

function readUnlocked() {
  try {
    const stored = localStorage.getItem(UNLOCKED_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as unknown;
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === "string");
      }
    }
  } catch {
    /* ignore */
  }
  return [] as string[];
}

export function CreditsProvider({ children }: { children: ReactNode }) {
  const [saldo, setSaldo] = useState(START_SALDO);
  const [unlocked, setUnlocked] = useState<string[]>([]);

  useEffect(() => {
    setSaldo(readSaldo());
    setUnlocked(readUnlocked());
  }, []);

  const writeSaldo = useCallback((next: number) => {
    setSaldo(next);
    try {
      localStorage.setItem(SALDO_KEY, String(next));
    } catch {
      /* ignore */
    }
  }, []);

  const addCredits = useCallback(
    (aantal: number) => {
      if (aantal <= 0) {
        return;
      }
      writeSaldo(saldo + aantal);
    },
    [saldo, writeSaldo]
  );

  const spendCredits = useCallback(
    (aantal: number) => {
      if (aantal <= 0) {
        return true;
      }
      if (saldo < aantal) {
        return false;
      }
      writeSaldo(saldo - aantal);
      return true;
    },
    [saldo, writeSaldo]
  );

  const isChatUnlocked = useCallback(
    (klusId: string) => unlocked.includes(klusId),
    [unlocked]
  );

  const unlockChat = useCallback((klusId: string) => {
    setUnlocked((current) => {
      if (current.includes(klusId)) {
        return current;
      }
      const next = [...current, klusId];
      try {
        localStorage.setItem(UNLOCKED_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ saldo, spendCredits, addCredits, isChatUnlocked, unlockChat }),
    [saldo, spendCredits, addCredits, isChatUnlocked, unlockChat]
  );

  return (
    <CreditsContext.Provider value={value}>{children}</CreditsContext.Provider>
  );
}

export function useCredits() {
  const context = useContext(CreditsContext);
  if (!context) {
    throw new Error("useCredits moet binnen CreditsProvider gebruikt worden");
  }
  return context;
}
