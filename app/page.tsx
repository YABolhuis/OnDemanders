import { TopBar } from "@/components/top-bar";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col bg-white">
      <TopBar />
      <main className="flex-1 bg-white" />
    </div>
  );
}
