"use client";

import Image from "next/image";
import { AccountSidebar } from "@/components/account-sidebar";

export function AbonementCreditsPagina() {
  return (
    <div className="flex min-h-[calc(100vh-88px)] bg-[#24333d] font-[Arial,Helvetica,sans-serif] text-white">
      <AccountSidebar />
      <div className="min-w-0 flex-1 px-8 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px] font-bold">Abonement & credits</h1>
          <p className="mt-1 text-[15px] text-[#c5ced4]">
            Bekijk je abonnement en het aantal credits op je account.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="rounded-[var(--radius-control)] border border-white/15 bg-[#1b2730] px-5 py-4">
              <p className="text-[13px] text-[#9aa8b0]">Abonnement</p>
              <p className="mt-1 text-[18px] font-semibold">Starter</p>
              <p className="mt-2 text-[13px] leading-5 text-[#c5ced4]">
                Je huidige pakket voor ondernemers op Optisend.
              </p>
            </div>
            <div className="rounded-[var(--radius-control)] border border-white/15 bg-[#1b2730] px-5 py-4">
              <p className="text-[13px] text-[#9aa8b0]">Credits</p>
              <p className="mt-2 flex items-center gap-1.5 text-[18px]">
                <Image
                  src="/token-logo.png"
                  alt=""
                  width={18}
                  height={18}
                  className="size-[18px] shrink-0"
                />
                <span>25 credits</span>
              </p>
              <p className="mt-2 text-[13px] leading-5 text-[#c5ced4]">
                Credits gebruik je om te reageren op opdrachten.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
