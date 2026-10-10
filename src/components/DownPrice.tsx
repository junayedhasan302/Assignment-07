
import Link from "next/link";
import ItemCard from "./ItemCard";


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

const DownPrice = async () => {
  // const URL1 ="https://api.abcz.workers.dev/api/bazardor/products";
  // const URL2 ="https://api.api-store.workers.dev/api/bazardor/products";
  const URL = "https://openapi.programming-hero.com/api/bazardor/products";

  const res = await fetch(URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("পণ্যের দাম লোড করা যায়নি।");
  }

  const data: IType[] = await res.json();

  const decreased = data.filter(
    (item) => item.change.dir === "down"
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          <span className="mr-2 text-emerald-600">▼</span>
          আজ দাম কমেছে
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          যেসব পণ্যের দাম আজ কমেছে
        </p>
      </div>

      {/* Product Grid */}
      {decreased.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {decreased.map((item) => (
            <ItemCard key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center shadow-sm">
          <p className="font-semibold text-gray-800">
            আজ কোনো পণ্যের দাম কমেনি।
          </p>

          <p className="mt-1 text-sm text-gray-500">
            নতুন দাম আপডেট হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}
    </section>
  );
};

export default DownPrice;
