import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteChrome } from "@/components/site-chrome";
import { SITE_WIDTH_CLASS } from "@/lib/site-width";

export default function Home() {
  return (
    <SiteChrome
      header={
        <header className="relative z-50 w-full bg-[#fbfbfb]">
          <div className="w-full border-b border-[#d0d0d0] bg-[#fbfbfb]">
            <div className={`${SITE_WIDTH_CLASS} flex h-14 items-center px-10`}>
              <Link href="/">
                <Image
                  src="/optisend-logo.png"
                  alt="Optisend"
                  width={954}
                  height={210}
                  className="theme-logo h-6 w-auto"
                  priority
                />
              </Link>
              <div className="ml-auto flex items-center gap-4">
                <Link
                  href="/inloggen"
                  className="inline-flex items-center gap-1 border-b border-[#111] pb-px text-[14px] font-medium text-[#111] hover:opacity-70"
                >
                  Inloggen
                  <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden />
                </Link>
                <Link
                  href="/inloggen"
                  className="inline-flex h-9 items-center rounded-[3px] bg-[#171717] px-4 text-[14px] font-medium text-white hover:bg-[#0a0a0a]"
                >
                  Account openen
                </Link>
              </div>
            </div>
          </div>
        </header>
      }
    >
      <main className="flex-1 bg-[#fbfbfb]" />
    </SiteChrome>
  );
}
