
import DownPrice from "@/components/DownPrice";
import HeroSectioon from "@/components/HeroSection";
import UpPrice from "@/components/UpPrice";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSectioon />
      <UpPrice/>
      <DownPrice/>
    </main>
  );
}

