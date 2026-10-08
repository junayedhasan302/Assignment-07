
import type { IChange, IType } from "@/types/product";

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

const DownPrice = async () => {
  const URL = "https://api.abcz.workers.dev/api/bazardor/products";

  const res = await fetch(URL);
  const data: IType[] = await res.json();

  // Only products whose price went up today
  const increased = data.filter((item) => item.change.dir === "down");

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          <span className="mr-2 text-green-600">▼</span>
          আজ দাম কমেছে
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          যেসব পণ্যের দাম আজ কমেছে
        </p>
      </div>

      {/* Product Cards */}
      {increased.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {increased.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-red-200 hover:shadow-md"
            >
              {/* Product Emoji */}
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-4xl">
                {item.image}
              </div>

              {/* Product Information */}
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base font-semibold text-gray-800 sm:text-lg">
                  {item.nameBn}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  প্রতি {unitBn[item.unit] || item.unit}
                </p>
              </div>

              {/* Price Information */}
              <div className="shrink-0 text-right">
                <p className="whitespace-nowrap text-lg font-bold text-gray-900 sm:text-xl">
                  {convertToBanglaNumber(item.today)} টাকা
                </p>

                {/* Price Increase Badge */}
                <div className="mt-2 flex justify-end">
                  <span className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-semibold text-green-600">
                    <span>▼</span>
                    {convertToBanglaNumber(item.change.pct)}%
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center">
          <p className="text-lg font-medium text-gray-700">
            আজ কোনো পণ্যের দাম কমেনি।
          </p>
        </div>
      )}
    </section>
  );
};

export default DownPrice;

