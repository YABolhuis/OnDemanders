import { notFound } from "next/navigation";
import Link from "next/link";
import { AppShell } from "@/components/app-shell";
import { PlaatsPin } from "@/components/plaats-pin";
import { aannemers, getAannemer } from "@/lib/aannemers";

export function generateStaticParams() {
  return aannemers.map((aannemer) => ({ id: aannemer.id }));
}

export default async function AannemerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const aannemer = getAannemer(id);

  if (!aannemer) {
    notFound();
  }

  return (
    <AppShell gebruiker="Y.A. Bolhuis">
      <main className="px-6 py-6 font-[Arial,Helvetica,sans-serif]">
        <Link
          href="/aannemers"
          className="text-[13px] text-[#1d5fd1] hover:underline"
        >
          Terug naar aannemers
        </Link>
        <div className="mt-5 flex max-w-3xl flex-col gap-5 sm:flex-row">
          <div className="h-[180px] w-full shrink-0 overflow-hidden rounded-[12px] bg-[#eee] sm:w-[240px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={aannemer.image}
              alt=""
              className="size-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-[22px] font-bold text-[#1a1a1a]">
              {aannemer.name}
            </h1>
            <p className="mt-1 text-[13px] font-medium text-[#2f9e44]">
              {aannemer.trade}
            </p>
            <p className="mt-2 flex items-center gap-1 text-[13px] text-[#555]">
              <PlaatsPin />
              {aannemer.city} · {aannemer.distance}
            </p>
            <p className="mt-3 text-[15px] font-bold text-[#1a1a1a]">
              {aannemer.rate}
            </p>
            <p className="mt-1 text-[13px] text-[#777]">
              {aannemer.availability}
            </p>
            <p className="mt-4 text-[14px] leading-6 text-[#333]">
              {aannemer.description}
            </p>
            <p className="mt-3 text-[12px] text-[#555]">{aannemer.tags}</p>
          </div>
        </div>
      </main>
    </AppShell>
  );
}
