import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader } from "@/components/app-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacybeleid van Optisend",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <main className={`${SITE_WIDTH_CLASS} flex-1 px-10 py-10`}>
        <h1 className="text-[22px] font-semibold text-[#1a1a1a]">
          Privacy Policy
        </h1>
        <p className="mt-4 max-w-2xl text-[14px] leading-6 text-[#555]">
          Optisend verwerkt persoonsgegevens die je invult op dit platform, zoals
          naam, postcode en berichten over opdrachten. We gebruiken die gegevens
          om de marketplace te laten werken en om je account te beheren. We
          verkopen je gegevens niet door.
        </p>
        <p className="mt-3 max-w-2xl text-[14px] leading-6 text-[#555]">
          Vragen over privacy? Stuur een bericht via{" "}
          <Link href="/berichten" className="text-[#1d5fd1] hover:underline">
            Berichten
          </Link>
          .
        </p>
      </main>
      <SiteFooter />
    </div>
  );
}
