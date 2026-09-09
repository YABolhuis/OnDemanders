import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function VakgebiedNietGevonden() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <main className="px-6 py-16">
        <h1 className="text-[22px] font-bold text-[#1a1a1a]">
          Vakgebied niet gevonden
        </h1>
        <p className="mt-2 text-[14px] text-[#555]">
          Dit vakgebied bestaat niet. Kies een vak op de startpagina.
        </p>
        <Link
          href="/klussen/vak/schilder"
          className="mt-6 inline-block text-[14px] text-[#1d5fd1] hover:underline"
        >
          Terug naar vakgebied kiezen
        </Link>
      </main>
    </AppShell>
  );
}
