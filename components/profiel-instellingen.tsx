"use client";

import { useRef, useState } from "react";
import { Calendar, Camera } from "lucide-react";
import { Switch } from "@/components/ui/switch";

type Tab = "persoonlijk" | "account";

export function ProfielInstellingen() {
  const [tab, setTab] = useState<Tab>("persoonlijk");
  const [photo, setPhoto] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhoto(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#fbfbfb] px-10 py-10 text-[#1a1a1a]">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px] font-bold">Mijn account</h1>
          <p className="mt-1 text-[15px] text-[#555]">
            Bekijk en bewerk je gegevens.
          </p>

          <div className="mt-8 flex gap-8 border-b border-[#e6e6e6]">
            <button
              type="button"
              onClick={() => setTab("persoonlijk")}
              className={`pb-3 text-[15px] ${
                tab === "persoonlijk"
                  ? "border-b-2 border-[#1a1a1a] font-medium text-[#1a1a1a]"
                  : "text-[#555]"
              }`}
            >
              Persoonlijk
            </button>
            <button
              type="button"
              onClick={() => setTab("account")}
              className={`pb-3 text-[15px] ${
                tab === "account"
                  ? "border-b-2 border-[#1a1a1a] font-medium text-[#1a1a1a]"
                  : "text-[#555]"
              }`}
            >
              Accountinstellingen
            </button>
          </div>

          {tab === "persoonlijk" ? (
            <form className="mt-8" onSubmit={(event) => event.preventDefault()}>
              <h2 className="text-[20px] font-bold">Persoonsgegevens</h2>
              <p className="mt-1 text-[13px] text-[#555]">
                Deze gegevens kunnen worden getoond aan andere gebruikers op het
                platform.
              </p>

              <div className="mt-6">
                <div className="flex size-[88px] items-center justify-center overflow-hidden rounded-lg bg-[#eceff1]">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photo} alt="" className="size-full object-cover" />
                  ) : (
                    <Camera className="size-8 text-[#6a6a6a]" strokeWidth={1.75} />
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onPhoto}
                />
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 rounded-md border border-[#d0d0d0] px-4 py-2 text-[14px] hover:bg-[#eceff1]"
                >
                  Upload profielfoto
                </button>
                <p className="mt-2 text-[12px] text-[#6b6b6b]">
                  De profielfoto mag max. 5MB groot zijn.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                <Field label="Voornaam" defaultValue="Yan" />
                <Field label="Achternaam" defaultValue="Bolhuis" />
                <div>
                  <Field
                    label="E-mailadres"
                    defaultValue="yabolhuis.optisend@gmail.com"
                    type="email"
                  />
                  <button
                    type="button"
                    className="mt-2 text-[13px] text-[#e08a3c] hover:underline"
                  >
                    E-mailadres wijzigen
                  </button>
                </div>
                <Field
                  label="Telefoonnummer"
                  defaultValue="0649648516"
                  type="tel"
                />
                <label className="block text-[13px] text-[#555]">
                  Geboortedatum (optioneel)
                  <span className="relative mt-1.5 block">
                    <input
                      type="text"
                      defaultValue="22-08-1997"
                      className="h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 pr-10 text-[14px] text-[#1a1a1a] outline-none focus:border-[#1a1a1a]"
                    />
                    <Calendar
                      className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#6b6b6b]"
                      strokeWidth={2}
                    />
                  </span>
                </label>
                <Field
                  label="LinkedIn (optioneel)"
                  defaultValue="https://www.linkedin.com/in/yan-bolhuis-"
                />
              </div>

              <button
                type="submit"
                className="mt-8 rounded-md bg-[#c06a3a] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#b05e32]"
              >
                Wijzigingen opslaan
              </button>
            </form>
          ) : (
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
                    <label className="block text-[14px] text-[#1a1a1a]">
                      Huidig wachtwoord
                      <input
                        type="password"
                        placeholder="Vul hier je huidige wachtwoord in"
                        className="mt-2 h-12 w-full max-w-[220px] rounded-lg border border-[#e5e7eb] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a1a1a]"
                      />
                    </label>
                    <div className="hidden md:block" />
                    <label className="block text-[14px] text-[#1a1a1a]">
                      Nieuw wachtwoord
                      <input
                        type="password"
                        placeholder="Vul hier je nieuwe wachtwoord in"
                        className="mt-2 h-12 w-full max-w-[220px] rounded-lg border border-[#e5e7eb] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a1a1a]"
                      />
                      <span className="mt-2 block text-[12px] leading-5 text-[#6b6b6b]">
                        Minimaal 8 karakters, een combinatie van hoofdletters en
                        kleine letters, minimaal één cijfer en één speciaal
                        karakter.
                      </span>
                    </label>
                    <label className="block text-[14px] text-[#1a1a1a]">
                      Herhaal nieuw wachtwoord
                      <input
                        type="password"
                        placeholder="Herhaal hier je nieuwe wachtwoord"
                        className="mt-2 h-12 w-full max-w-[220px] rounded-lg border border-[#e5e7eb] bg-white px-4 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a1a1a]"
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
                items={[
                  { id: "email-chat", label: "Update nieuwe opdrachten" },
                ]}
              />

              <NotificatieSectie
                titel="WhatsApp notificaties"
                beschrijving="Pas hier je WhatsApp notificatie instellingen aan."
                items={[{ id: "wa-chat", label: "Update nieuwe opdrachten" }]}
              />
            </div>
          )}
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
    <section className="flex flex-col gap-6 border-t border-[#e6e6e6] pt-12 lg:flex-row lg:items-start lg:gap-16">
      <div className="w-full shrink-0 lg:w-[250px]">
        <h2 className="text-[16px] font-semibold">{titel}</h2>
        <p className="mt-2 text-[13px] leading-5 text-[#555]">{beschrijving}</p>
      </div>
      <div className="flex min-w-0 w-full max-w-[480px] flex-1 flex-col gap-2">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex h-8 cursor-pointer items-center gap-2.5 rounded-[var(--radius-control)] bg-[#eceff1] pr-4 pl-2"
          >
            <Switch
              checked={aan[item.id]}
              onCheckedChange={(checked) =>
                setAan((huidig) => ({ ...huidig, [item.id]: checked }))
              }
              className="data-checked:bg-[#2bbbad] data-unchecked:bg-[#5d6e78]"
              aria-label={item.label}
            />
            <span className="text-[13px] leading-none text-[#1a1a1a]">
              {item.label}
            </span>
          </label>
        ))}
      </div>
    </section>
  );
}

function Field({
  label,
  defaultValue,
  placeholder,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block text-[13px] text-[#555]">
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-1.5 h-11 w-full rounded-md border border-[#e5e7eb] bg-white px-3 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a1a1a]"
      />
    </label>
  );
}
