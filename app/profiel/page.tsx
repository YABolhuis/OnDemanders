import { AppHeader } from "@/components/app-header";
import { ProfielInstellingen } from "@/components/profiel-instellingen";

export default function ProfielPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#24333d]">
      <AppHeader gebruiker="Y.A. Bolhuis" />
      <ProfielInstellingen />
    </div>
  );
}
