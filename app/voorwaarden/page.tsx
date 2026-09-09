import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: "Algemene voorwaarden van Optisend",
};

export default function VoorwaardenPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <main className={`${SITE_WIDTH_CLASS} flex-1 px-10 py-10`}>
        <h1 className="text-[22px] font-semibold text-[#1a1a1a]">
          Terms and Conditions
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#555]">
          Door Optisend te gebruiken ga je akkoord met deze voorwaarden.
          Opdrachten en offertes zijn afspraken tussen opdrachtgever en
          aannemer. Optisend is het platform waarop jullie elkaar vinden, geen
          partij bij de klus zelf.
        </p>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-[#555]">
          Misbruik, nepprofielen of het omzeilen van betalingen is niet
          toegestaan. We kunnen accounts sluiten als deze regels worden
          overtreden.
        </p>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-[#555]">
          Zie ook ons{" "}
          <Link href="/privacy" className="text-[#1d5fd1] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
