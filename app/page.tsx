import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <header className="relative z-10 flex h-14 w-full items-center border-b border-[#e6e6e6] bg-white pl-6 pr-4 shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
        <Image
          src="/optisend-logo.png"
          alt="Optisend"
          width={954}
          height={210}
          className="h-6 w-auto"
          priority
        />
      </header>
      <main className="flex-1 bg-white" />
    </div>
  );
}
