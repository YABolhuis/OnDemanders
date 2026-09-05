"use client";

import { useRef, useState } from "react";
import { Calendar, Camera } from "lucide-react";

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
    <div className="min-h-[calc(100vh-88px)] bg-[#24333d] px-8 py-10 font-[Arial,Helvetica,sans-serif] text-white">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-[32px] font-bold">Mijn account</h1>
        <p className="mt-1 text-[15px] text-[#c5ced4]">Bekijk en bewerk je gegevens.</p>

        <div className="mt-8 flex gap-8 border-b border-white/15">
          <button
            type="button"
            onClick={() => setTab("persoonlijk")}
            className={`pb-3 text-[15px] ${
              tab === "persoonlijk"
                ? "border-b-2 border-[#8fd14f] font-medium text-[#8fd14f]"
                : "text-[#d5dde2]"
            }`}
          >
            Persoonlijk
          </button>
          <button
            type="button"
            onClick={() => setTab("account")}
            className={`pb-3 text-[15px] ${
              tab === "account"
                ? "border-b-2 border-[#8fd14f] font-medium text-[#8fd14f]"
                : "text-[#d5dde2]"
            }`}
          >
            Accountinstellingen
          </button>
        </div>

        {tab === "persoonlijk" ? (
          <form
            className="mt-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="text-[20px] font-bold">Persoonsgegevens</h2>
            <p className="mt-1 text-[13px] text-[#c5ced4]">
              Deze gegevens kunnen worden getoond aan andere gebruikers op het
              platform.
            </p>

            <div className="mt-6">
              <div className="flex size-[88px] items-center justify-center overflow-hidden rounded-lg bg-[#3a4a54]">
                {photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={photo} alt="" className="size-full object-cover" />
                ) : (
                  <Camera className="size-8 text-white" strokeWidth={1.75} />
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
                className="mt-3 rounded-md border border-white/35 px-4 py-2 text-[14px] hover:bg-white/10"
              >
                Upload profielfoto
              </button>
              <p className="mt-2 text-[12px] text-[#9aa8b0]">
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
              <label className="block text-[13px] text-[#c5ced4]">
                Geboortedatum (optioneel)
                <span className="relative mt-1.5 block">
                  <input
                    type="text"
                    defaultValue="22-08-1997"
                    className="h-11 w-full rounded-md border border-white/25 bg-[#1b2730] px-3 pr-10 text-[14px] text-white outline-none focus:border-[#8fd14f]"
                  />
                  <Calendar
                    className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-white/70"
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
          <form
            className="mt-8 max-w-xl"
            onSubmit={(event) => event.preventDefault()}
          >
            <h2 className="text-[20px] font-bold">Accountinstellingen</h2>
            <p className="mt-1 text-[13px] text-[#c5ced4]">
              Beheer je inloggegevens en voorkeuren.
            </p>
            <div className="mt-6 space-y-5">
              <Field label="Huidig wachtwoord" type="password" />
              <Field label="Nieuw wachtwoord" type="password" />
              <Field label="Herhaal nieuw wachtwoord" type="password" />
            </div>
            <button
              type="submit"
              className="mt-8 rounded-md bg-[#c06a3a] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#b05e32]"
            >
              Wijzigingen opslaan
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
}) {
  return (
    <label className="block text-[13px] text-[#c5ced4]">
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 h-11 w-full rounded-md border border-white/25 bg-[#1b2730] px-3 text-[14px] text-white outline-none focus:border-[#8fd14f]"
      />
    </label>
  );
}
