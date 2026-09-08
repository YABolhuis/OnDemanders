import { AppShell } from "@/components/app-shell";
import { ProfielInstellingen } from "@/components/profiel-instellingen";

export default function ProfielPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#24333d]">
      <ProfielInstellingen />
    </AppShell>
  );
}
