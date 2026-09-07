"use client";

import { AccountSidebar } from "@/components/account-sidebar";

export function AbonementCreditsPagina() {
  return (
    <div className="flex min-h-[calc(100vh-88px)] bg-[#24333d] font-[Arial,Helvetica,sans-serif] text-white">
      <AccountSidebar />
      <div className="min-w-0 flex-1 py-10">
        <div className="px-8">
          <h1 className="text-[32px] font-bold">Abonement & credits</h1>
          <p className="mt-1 text-[15px] text-[#c5ced4]">
            Bekijk je abonnement en het aantal credits op je account.
          </p>
        </div>

        <hr className="mt-8 border-0 border-t border-white/15" />

        <section className="px-8 py-8">
          <h2 className="text-[16px] font-semibold">Huidig abonnement</h2>
          <p className="mt-2 text-[15px] text-[#d5dde2]">Starter</p>
          <button
            type="button"
            className="mt-4 h-9 border border-white/30 px-4 text-[14px] font-medium text-[#8fd14f] hover:bg-white/5"
          >
            Bekijk of wijzig abonnement
          </button>
        </section>

        <hr className="border-0 border-t border-white/15" />

        <section className="px-8 py-8">
          <h2 className="text-[16px] font-semibold">Beschikbare credits</h2>
          <p className="mt-2 text-[15px] text-[#d5dde2]">25</p>
          <div className="mt-4 flex flex-wrap items-center gap-5">
            <button
              type="button"
              className="h-9 bg-[#8fd14f] px-4 text-[14px] font-medium text-[#1b2730] hover:bg-[#7fc43f]"
            >
              Credits kopen
            </button>
            <button
              type="button"
              className="text-[14px] font-medium text-[#8fd14f] hover:underline"
            >
              Creditsgeschiedenis bekijken
            </button>
          </div>
        </section>

        <hr className="border-0 border-t border-white/15" />

        <section className="px-8 py-8">
          <h2 className="text-[16px] font-semibold">Credits bij abonnement</h2>
          <p className="mt-2 text-[15px] text-[#d5dde2]">10 per maand</p>
          <p className="mt-3 max-w-xl text-[13px] leading-5 text-[#9aa8b0]">
            Ongebruikte credits aan het einde van je factuurperiode gaan mee
            naar de volgende maand (tot 200).{" "}
            <button
              type="button"
              className="font-medium text-[#8fd14f] hover:underline"
            >
              Meer informatie
            </button>
          </p>
        </section>

        <hr className="border-0 border-t border-white/15" />

        <section className="px-8 py-8">
          <h2 className="text-[16px] font-semibold">Abonnementskosten</h2>
          <p className="mt-2 text-[15px] text-[#d5dde2]">Gratis</p>
        </section>
      </div>
    </div>
  );
}
