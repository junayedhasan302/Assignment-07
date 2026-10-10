export interface IType {
  id: number;
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
}

const unitBn: Record<string, string> = {
  kg: "কেজি",
  gram: "গ্রাম",
  g: "গ্রাম",
  litre: "লিটার",
  ml: "মিলিলিটার",
  piece: "পিস",
  dozen: "ডজন",
  maund: "মণ",
};

const convertToBanglaNumber = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const UpPrice = async () => {
  // const URL2 = "https://api.api-store.workers.dev/api/bazardor/products";
  // const URL = "https://api.abcz.workers.dev/api/bazardor/products";
  const URL = "https://openapi.programming-hero.com/api/bazardor/products";

  // const URL = "https://api.api-store.workers.dev/api/bazardor/products" || "https://api.abcz.workers.dev/api/bazardor/products";

  const res = await fetch(URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("পণ্যের দাম লোড করা যায়নি।");
  }

  const data: IType[] = await res.json();

  const increased = data.filter((item) => item.change.dir === "up");

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          <span className="mr-2 text-red-600">▲</span>
          আজ দাম বেড়েছে
        </h2>

        <p className="mt-1 text-sm text-gray-500">যেসব পণ্যের দাম আজ বেড়েছে</p>
      </div>

      {/* Product Cards */}
      {increased.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {increased.map((item) => (
            <article
              key={item.id}
              className="group flex min-h-[140px] items-center gap-3 rounded-2xl border border-[#E0E8E1] bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:shadow-md sm:gap-4 sm:p-5"
            >
              {/* Product Emoji */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#F0F7F1] text-4xl transition-colors duration-300 group-hover:bg-red-100">
                {item.image}
              </div>

              {/* Product Information */}
              <div className="min-w-0 flex-1">
                <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-800 transition-colors duration-300 group-hover:text-red-700 sm:text-lg">
                  {item.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unitBn[item.unit] || item.unit}
                </p>
              </div>

              {/* Price Information */}
              <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                <span className="text-xs font-medium text-red-600">
                  আজকের দাম
                </span>

                <p className="whitespace-nowrap text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                  {convertToBanglaNumber(item.today)}
                  <span className="ml-1 text-xs font-semibold text-gray-500 sm:text-sm">
                    টাকা
                  </span>
                </p>

                {/* Increase Badge */}
                <span className="inline-flex items-center gap-1 rounded-full border border-red-100 bg-red-50 px-2.5 py-1 text-xs font-bold text-[#D03739]">
                  <span>▲</span>
                  {convertToBanglaNumber(item.change.pct.toFixed(1))}%
                </span>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center shadow-sm">
          <p className="font-semibold text-gray-800">
            আজ কোনো পণ্যের দাম বাড়েনি।
          </p>

          <p className="mt-1 text-sm text-gray-500">
            নতুন দাম আপডেট হলে এখানে দেখা যাবে।
          </p>
        </div>
      )}
    </section>
  );
};

export default UpPrice;
