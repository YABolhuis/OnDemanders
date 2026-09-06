"use client";

export function BedrijfsgegevensPagina() {
  return (
    <div className="flex min-h-[calc(100vh-88px)] bg-[#24333d] font-[Arial,Helvetica,sans-serif] text-white">
      <aside className="min-h-[calc(100vh-88px)] w-[280px] shrink-0 border-r border-white/10 bg-[#1b2730] px-4 py-6">
        <p className="mb-4 px-2 text-[13px] font-semibold text-[#9aa8b0]">
          Menu
        </p>
        <nav className="flex flex-col gap-1">
          <span className="rounded-md bg-white/10 px-3 py-2 text-left text-[14px] font-medium text-[#8fd14f]">
            Bedrijfsgegevens
          </span>
        </nav>
      </aside>
      <div className="min-w-0 flex-1 px-8 py-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[32px] font-bold">Bedrijfsgegevens</h1>
          <p className="mt-1 text-[15px] text-[#c5ced4]">
            Deze gegevens worden gebruikt op je profiel en op facturen.
          </p>

          <form
            className="mt-10"
            onSubmit={(event) => event.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
              <Field label="Bedrijfsnaam" defaultValue="Optisend" />
              <Field label="KvK-nummer" defaultValue="12345678" />
              <Field label="BTW-nummer" defaultValue="NL123456789B01" />
              <Field
                label="Website (optioneel)"
                defaultValue="https://optisend.nl"
              />
              <Field
                label="Adres"
                defaultValue="Keizersgracht 12"
                className="md:col-span-2"
              />
              <Field label="Postcode" defaultValue="1015 CJ" />
              <Field label="Plaats" defaultValue="Amsterdam" />
              <Field
                label="Zakelijk telefoonnummer"
                defaultValue="0649648516"
                type="tel"
              />
              <Field
                label="Factuur-e-mailadres"
                defaultValue="yabolhuis.optisend@gmail.com"
                type="email"
              />
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
    </div>
  );
}

function Field({
  label,
  defaultValue,
  type = "text",
  className = "",
}: {
  label: string;
  defaultValue?: string;
  type?: string;
  className?: string;
}) {
  return (
    <label className={`block text-[13px] text-[#c5ced4] ${className}`}>
      {label}
      <input
        type={type}
        defaultValue={defaultValue}
        className="mt-1.5 h-11 w-full rounded-md border border-white/25 bg-[#1b2730] px-3 text-[14px] text-white outline-none placeholder:text-[#8b98a0] focus:border-[#8fd14f]"
      />
    </label>
  );
}
