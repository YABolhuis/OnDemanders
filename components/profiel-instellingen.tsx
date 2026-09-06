"use client";

import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { AccountSidebar } from "@/components/account-sidebar";

export function ProfielInstellingen() {
  return (
    <div className="flex min-h-[calc(100vh-88px)] bg-[#24333d] font-[Arial,Helvetica,sans-serif] text-white">
      <AccountSidebar />
      <div className="min-w-0 flex-1 px-8 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px] font-bold">Mijn account</h1>
          <p className="mt-1 text-[15px] text-[#c5ced4]">
            Bekijk en bewerk je gegevens.
          </p>

          <div className="mt-8 flex gap-8 border-b border-white/15">
            <a
              href="/mijn-profiel"
              className="pb-3 text-[15px] text-[#d5dde2] hover:text-white"
            >
              Persoonlijk
            </a>
            <span className="border-b-2 border-[#8fd14f] pb-3 text-[15px] font-medium text-[#8fd14f]">
              Accountinstellingen
            </span>
          </div>

          <div className="mt-12 flex flex-col gap-16">
            <form
              className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16"
              onSubmit={(event) => event.preventDefault()}
            >
              <h2 className="w-full shrink-0 text-[16px] leading-none font-semibold lg:w-[250px]">
                Wachtwoord aanpassen
              </h2>
              <div className="min-w-0 w-full max-w-[480px] flex-1">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <label className="block text-[14px] text-white">
                    Huidig wachtwoord
                    <input
                      type="password"
                      placeholder="Vul hier je huidige wachtwoord in"
                      className="mt-2 h-12 w-full max-w-[220px] rounded-lg border border-[#7f96a6] bg-[#1e2c35] px-4 text-[14px] text-white outline-none placeholder:text-[#8fa0ab] focus:border-[#8fd14f]"
                    />
                  </label>
                  <div className="hidden md:block" />
                  <label className="block text-[14px] text-white">
                    Nieuw wachtwoord
                    <input
                      type="password"
                      placeholder="Vul hier je nieuwe wachtwoord in"
                      className="mt-2 h-12 w-full max-w-[220px] rounded-lg border border-[#7f96a6] bg-[#1e2c35] px-4 text-[14px] text-white outline-none placeholder:text-[#8fa0ab] focus:border-[#8fd14f]"
                    />
                    <span className="mt-2 block text-[12px] leading-5 text-[#b7c3ca]">
                      Minimaal 8 karakters, een combinatie van hoofdletters en
                      kleine letters, minimaal één cijfer en één speciaal
                      karakter.
                    </span>
                  </label>
                  <label className="block text-[14px] text-white">
                    Herhaal nieuw wachtwoord
                    <input
                      type="password"
                      placeholder="Herhaal hier je nieuwe wachtwoord"
                      className="mt-2 h-12 w-full max-w-[220px] rounded-lg border border-[#7f96a6] bg-[#1e2c35] px-4 text-[14px] text-white outline-none placeholder:text-[#8fa0ab] focus:border-[#8fd14f]"
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="mt-8 rounded-lg bg-[#8e562e] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#7c4a28]"
                >
                  Wachtwoord aanpassen
                </button>
              </div>
            </form>

            <NotificatieSectie
              titel="E-mail notificaties"
              beschrijving="Pas hier je e-mail notificatie instellingen aan."
              items={[{ id: "email-chat", label: "Update nieuwe opdrachten" }]}
            />

            <NotificatieSectie
              titel="WhatsApp notificaties"
              beschrijving="Pas hier je WhatsApp notificatie instellingen aan."
              items={[{ id: "wa-chat", label: "Update nieuwe opdrachten" }]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

type NotificatieItem = {
  id: string;
  label: string;
  startAan?: boolean;
};

function NotificatieSectie({
  titel,
  beschrijving,
  items,
}: {
  titel: string;
  beschrijving: string;
  items: NotificatieItem[];
}) {
  const [aan, setAan] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(items.map((item) => [item.id, item.startAan !== false]))
  );

  return (
    <section className="flex flex-col gap-6 border-t border-white/10 pt-12 lg:flex-row lg:items-start lg:gap-16">
      <div className="w-full shrink-0 lg:w-[250px]">
        <h2 className="text-[16px] font-semibold">{titel}</h2>
        <p className="mt-2 text-[13px] leading-5 text-[#c5ced4]">{beschrijving}</p>
      </div>
      <div className="flex min-w-0 w-full max-w-[480px] flex-1 flex-col gap-2">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex h-8 cursor-pointer items-center gap-2.5 rounded-full bg-[#1b2730] pr-4 pl-2"
          >
            <Switch
              checked={aan[item.id]}
              onCheckedChange={(checked) =>
                setAan((huidig) => ({ ...huidig, [item.id]: checked }))
              }
              className="data-checked:bg-[#2bbbad] data-unchecked:bg-[#5d6e78]"
              aria-label={item.label}
            />
            <span className="text-[13px] leading-none text-white">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}
