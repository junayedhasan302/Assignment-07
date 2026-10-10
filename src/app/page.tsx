import AllProducts from "@/components/AllProducts";
import DownPrice from "@/components/DownPrice";
import HeroSection from "@/components/HeroSection";
import UpPrice from "@/components/UpPrice";

type IType = {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: [];
};

export default async function Home() {
  const URL = "https://openapi.programming-hero.com/api/bazardor/products";

  const res = await fetch(URL, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("পণ্যের তালিকা লোড করা যায়নি।");
  }

  const products: IType[] = await res.json();

  return (
    <main className="min-h-screen bg-gray-50">
      <HeroSection />
      <UpPrice />
      <DownPrice />
      <AllProducts products={products} />
    </main>
  );
}
