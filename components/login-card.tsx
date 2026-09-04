"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export function LoginCard() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[400px] overflow-hidden rounded-md border-t-4 border-[#0055d4] bg-white px-8 pt-6 pb-7 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
      <h1 className="mb-5 font-[Arial,Helvetica,sans-serif] text-[28px] font-bold text-[#222]">
        Inloggen
      </h1>

      <form className="flex flex-col gap-3" method="GET" action="/klussen">
        <label className="flex h-11 overflow-hidden rounded-md border border-[#cfcfcf] bg-white focus-within:border-[#0055d4]">
          <span className="flex w-11 shrink-0 items-center justify-center border-r border-[#cfcfcf] bg-[#f3f3f3] text-[#4a4a4a]">
            <User className="size-4" strokeWidth={2} aria-hidden />
          </span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Gebruikersnaam"
            className="h-full min-w-0 flex-1 bg-white px-3 font-[Arial,Helvetica,sans-serif] text-sm text-[#222] outline-none placeholder:text-[#b0b0b0]"
          />
        </label>

        <label className="flex h-11 overflow-hidden rounded-md border border-[#cfcfcf] bg-white focus-within:border-[#0055d4]">
          <span className="flex w-11 shrink-0 items-center justify-center border-r border-[#cfcfcf] bg-[#f3f3f3] text-[#8a8a8a]">
            <Lock className="size-4" strokeWidth={2} aria-hidden />
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Wachtwoord"
            className="h-full min-w-0 flex-1 bg-white px-3 font-[Arial,Helvetica,sans-serif] text-sm text-[#222] outline-none placeholder:text-[#b0b0b0]"
          />
          <button
            type="button"
            aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
            onClick={() => setShowPassword((v) => !v)}
            className="flex w-10 shrink-0 items-center justify-center text-[#222]"
          >
            {showPassword ? (
              <EyeOff className="size-4" strokeWidth={2} aria-hidden />
            ) : (
              <Eye className="size-4" strokeWidth={2} aria-hidden />
            )}
          </button>
        </label>

        <a
          href="#"
          className="self-end pt-0.5 font-[Arial,Helvetica,sans-serif] text-[13px] text-[#0055d4] hover:underline"
        >
          Probleem met inloggen?
        </a>

        <button
          type="submit"
          className="mt-1 h-11 w-full rounded-md bg-[#0055d4] font-[Arial,Helvetica,sans-serif] text-[15px] font-semibold text-white hover:bg-[#004bbd]"
        >
          Inloggen
        </button>
      </form>

      <p className="mt-6 text-center font-[Arial,Helvetica,sans-serif] text-[13px] text-[#666]">
        Nog geen account?{" "}
        <a href="#" className="text-[#0055d4] hover:underline">
          Aanmelden
        </a>
      </p>
    </div>
  );
}
