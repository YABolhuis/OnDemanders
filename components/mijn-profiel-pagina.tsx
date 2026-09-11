"use client";

import { useRef, useState } from "react";
import { Building2 } from "lucide-react";

export function MijnProfielPagina() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  function onLogo(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setLogo(String(reader.result));
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-[calc(100vh-57px)] bg-[#fbfbfb] px-10 py-10 text-[#1a1a1a]">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px] font-bold">Mijn profiel</h1>
          <p className="mt-1 text-[15px] text-[#555]">
            Vul hier het bedrijfsprofiel in dat opdrachtgevers van je zien.
          </p>

          <div className="mt-8 flex gap-8 border-b border-[#e6e6e6]">
            <span className="border-b-2 border-[#1a1a1a] pb-3 text-[15px] font-medium text-[#1a1a1a]">
              Bedrijfsprofiel
            </span>
          </div>

          <form className="mt-8" onSubmit={(event) => event.preventDefault()}>
            <h2 className="text-[20px] font-bold">Bedrijfsprofiel</h2>
            <p className="mt-1 text-[13px] text-[#555]">
              Deze gegevens worden getoond op je publieke bedrijfsprofiel op het
              platform.
            </p>

            <div className="mt-6">
              <div className="flex size-[88px] items-center justify-center overflow-hidden rounded-lg bg-[#eceff1]">
                {logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logo} alt="" className="size-full object-cover" />
                ) : (
                  <Building2 className="size-8 text-[#6a6a6a]" strokeWidth={1.75} />
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onLogo}
              />
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="mt-3 rounded-md border border-[#d0d0d0] px-4 py-2 text-[14px] hover:bg-[#eceff1]"
              >
                Upload bedrijfslogo
              </button>
              <p className="mt-2 text-[12px] text-[#6b6b6b]">
                Het logo mag max. 5MB groot zijn.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              <Field label="Bedrijfsnaam" defaultValue="Optisend" />
              <Field
                label="Slogan (optioneel)"
                placeholder="Korte zin over je bedrijf"
              />
              <Field label="Vakgebied" defaultValue="Schilderwerk en afbouw" />
              <Field label="Werkgebied" defaultValue="Groningen en omstreken" />
              <Field
                label="Website (optioneel)"
                placeholder="https://www.jouwbedrijf.nl"
              />
              <Field
                label="Contact-e-mailadres"
                defaultValue="yabolhuis.optisend@gmail.com"
                type="email"
              />
              <label className="block text-[13px] text-[#555] md:col-span-2">
                Over het bedrijf
                <textarea
                  rows={5}
                  defaultValue="Optisend is een vakbedrijf voor schilderwerk, stucwerk en afbouw. We werken voor particulieren en bedrijven in de regio."
                  className="mt-1.5 w-full rounded-md border border-[#e5e7eb] bg-white px-3 py-2.5 text-[14px] text-[#1a1a1a] outline-none placeholder:text-[#9aa0a6] focus:border-[#1a1a1a]"
                />
              </label>
            </div>

            <button
              type="submit"
              className="mt-8 rounded-md bg-[#c06a3a] px-5 py-2.5 text-[14px] font-medium text-white hover:bg-[#b05e32]"
            >
              Wijzigingen opslaan
            </button>
          </form>
        </div>
    </div>
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
