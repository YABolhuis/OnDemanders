import { AppShell } from "@/components/app-shell";
import { OpdrachtenStart } from "@/components/opdrachten-start";

export default function KlussenStartPage() {
  return (
    <AppShell gebruiker="Y.A. Bolhuis" contentClassName="bg-[#f3eee6]">
      <OpdrachtenStart />
    </AppShell>
  );
}
