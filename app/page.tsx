import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SiteChrome } from "@/components/site-chrome";

export default function Home() {
  return (
    <SiteChrome
      header={
        <header className="site-rail relative z-50 w-full bg-[#fbfbfb] lg:col-span-3">
          <div className="grid h-14 w-full grid-cols-[auto_minmax(0,1fr)_auto] border-b border-[#d0d0d0] bg-[#fbfbfb] lg:grid-cols-[240px_minmax(0,1fr)_auto]">
            <div className="site-rail flex items-center border-[#d0d0d0] px-4 lg:border-r lg:px-6">
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
            </div>
            <div />
            <div className="site-rail-right flex items-center justify-end px-4 lg:px-6">
              <div className="flex items-center gap-4">
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
