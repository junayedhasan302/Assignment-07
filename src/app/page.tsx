
import AllProducts from "@/components/AllProducts";
import DownPrice from "@/components/DownPrice";
import HeroSection from "@/components/HeroSection";
import UpPrice from "@/components/UpPrice";

export default async function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <UpPrice/>
      <DownPrice/>
      <AllProducts/>
    </main>
  );
}

