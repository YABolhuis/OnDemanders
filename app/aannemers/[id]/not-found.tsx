import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function AannemerNietGevonden() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <main className="px-6 py-16 font-[Arial,Helvetica,sans-serif]">
        <h1 className="text-[22px] font-bold text-[#1a1a1a]">
          Aannemer niet gevonden
        </h1>
        <p className="mt-2 text-[14px] text-[#555]">
          Dit profiel bestaat niet of is niet meer beschikbaar.
        </p>
        <Link
          href="/aannemers"
          className="mt-6 inline-block text-[14px] text-[#1d5fd1] hover:underline"
        >
          Terug naar aannemers
        </Link>
      </main>
    </AppShell>
  );
}
