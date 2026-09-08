import Link from "next/link";
import { AppShell } from "@/components/app-shell";

export default function AdvertentieNietGevonden() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <main className="px-6 py-16">
        <h1 className="text-[22px] font-bold text-[#1a1a1a]">
          Advertentie niet gevonden
        </h1>
        <p className="mt-2 text-[14px] text-[#555]">
          Deze opdracht bestaat niet of is niet meer beschikbaar.
        </p>
        <Link
          href="/klussen"
          className="mt-6 inline-block text-[14px] text-[#1d5fd1] hover:underline"
        >
          Terug naar opdrachten
        </Link>
      </main>
    </AppShell>
  );
}
