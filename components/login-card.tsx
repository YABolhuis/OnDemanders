"use client";

import { useState } from "react";
import { Eye, EyeOff, Lock, User } from "lucide-react";

export function LoginCard() {
  const [paper, setPaper] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full max-w-[400px] border-t-4 border-[#0055d4] bg-white px-8 pt-5 pb-7 shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
      <div className="mb-4 flex items-center justify-end gap-2 text-[13px] font-[Arial,Helvetica,sans-serif]">
        <span className={paper ? "text-[#9aa0a6]" : "font-medium text-[#0055d4]"}>
          Live
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={paper}
          aria-label="Live of Paper"
          onClick={() => setPaper((value) => !value)}
          className="relative h-[22px] w-[40px] shrink-0 rounded-full bg-[#d0d0d0]"
        >
          <span
            className={`absolute top-[2px] size-[18px] rounded-full bg-white shadow-sm transition-transform ${
              paper ? "left-[20px]" : "left-[2px]"
            }`}
          />
        </button>
        <span className={paper ? "font-medium text-[#0055d4]" : "text-[#9aa0a6]"}>
          Paper
        </span>
      </div>

      <h1 className="mb-5 font-[Arial,Helvetica,sans-serif] text-[28px] font-bold text-[#222]">
        Login
      </h1>

      <form
        className="flex flex-col gap-3"
        onSubmit={(event) => event.preventDefault()}
      >
        <label className="flex h-11 overflow-hidden rounded-sm border border-[#cfcfcf] bg-white focus-within:border-[#0055d4]">
          <span className="flex w-11 shrink-0 items-center justify-center border-r border-[#cfcfcf] bg-[#f3f3f3] text-[#4a4a4a]">
            <User className="size-4" strokeWidth={2} aria-hidden />
          </span>
          <input
            name="username"
            type="text"
            autoComplete="username"
            placeholder="Username"
            className="h-full min-w-0 flex-1 bg-white px-3 font-[Arial,Helvetica,sans-serif] text-sm text-[#222] outline-none placeholder:text-[#b0b0b0]"
          />
        </label>

        <label className="flex h-11 overflow-hidden rounded-sm border border-[#cfcfcf] bg-white focus-within:border-[#0055d4]">
          <span className="flex w-11 shrink-0 items-center justify-center border-r border-[#cfcfcf] bg-[#f3f3f3] text-[#8a8a8a]">
            <Lock className="size-4" strokeWidth={2} aria-hidden />
          </span>
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="Password"
            className="h-full min-w-0 flex-1 bg-white px-3 font-[Arial,Helvetica,sans-serif] text-sm text-[#222] outline-none placeholder:text-[#b0b0b0]"
          />
          <button
            type="button"
            aria-label={showPassword ? "Wachtwoord verbergen" : "Wachtwoord tonen"}
            onClick={() => setShowPassword((value) => !value)}
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
          Problem with logging in?
        </a>

        <button
          type="submit"
          className="mt-1 h-11 w-full rounded-sm bg-[#0055d4] font-[Arial,Helvetica,sans-serif] text-[15px] font-semibold text-white hover:bg-[#004bbd]"
        >
          Login
        </button>
      </form>

      <p className="mt-6 text-center font-[Arial,Helvetica,sans-serif] text-[13px] text-[#666]">
        Don&apos;t have an account?{" "}
        <a href="#" className="text-[#0055d4] hover:underline">
          Try the free trial
        </a>
      </p>
    </div>
  );
}
