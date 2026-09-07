import type { Metadata } from "next";
import Image from "next/image";
import { LoginCard } from "@/components/login-card";

export const metadata: Metadata = {
  title: "Inloggen",
  description: "Inloggen",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-1 flex-col items-center bg-[#f0f1f2] px-4 pt-16 pb-12">
      <Image
        src="/optisend-logo.png"
        alt="Optisend"
        width={954}
        height={210}
          className="theme-logo mb-8 h-7 w-auto"
        priority
      />
      <LoginCard />
    </main>
  );
}
