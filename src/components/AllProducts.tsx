import type { IType } from "@/types/product";

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

const AllProducts = async () => {
  const URL = "https://api.abcz.workers.dev/api/bazardor/products";
  // const URL = "https://api.api-store.workers.dev/api/bazardor/products";
  //  const URL = "https://api.api-store.workers.dev/api/bazardor/products" || "https://api.abcz.workers.dev/api/bazardor/products";

  const res = await fetch(URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("পণ্যের তালিকা লোড করা যায়নি।");
  }

  const products: IType[] = await res.json();

  return (
    <section
      id="all-products"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-6 sm:px-6 lg:px-8"
    >
      {/* Section Heading */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          সকল পণ্য
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          বাজারের সব পণ্যের বর্তমান দাম ও দামের পরিবর্তন
        </p>

        {/* Price Change Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-medium sm:gap-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-red-600">
            <span>▲</span>
            দাম বেড়েছে
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
            <span>▼</span>
            দাম কমেছে
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-gray-600">
            <span>●</span>
            অপরিবর্তিত
          </span>
        </div>
      </div>

      {/* All Product Cards */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((item) => {
            const isUp = item.change.dir === "up";
            const isDown = item.change.dir === "down";

            const theme = isUp
              ? {
                  arrow: "▲",
                  label: "দাম বেড়েছে",
                  color: "text-red-600",
                  bg: "bg-red-50",
                  border: "border-red-100",
                  hoverBorder: "hover:border-red-200",
                  hoverBg: "group-hover:bg-red-50",
                  hoverText: "group-hover:text-red-700",
                }
              : isDown
                ? {
                    arrow: "▼",
                    label: "দাম কমেছে",
                    color: "text-emerald-700",
                    bg: "bg-emerald-50",
                    border: "border-emerald-100",
                    hoverBorder: "hover:border-emerald-200",
                    hoverBg: "group-hover:bg-emerald-50",
                    hoverText: "group-hover:text-emerald-700",
                  }
                : {
                    arrow: "●",
                    label: "অপরিবর্তিত",
                    color: "text-gray-500",
                    bg: "bg-gray-100",
                    border: "border-gray-200",
                    hoverBorder: "hover:border-gray-300",
                    hoverBg: "group-hover:bg-gray-100",
                    hoverText: "group-hover:text-gray-700",
                  };

            return (
              <article
                key={item.id}
                className={`group flex min-h-[140px] items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:gap-4 sm:p-5 ${theme.hoverBorder}`}
              >
                {/* Product Emoji */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-4xl transition-colors duration-300 ${theme.bg} ${theme.hoverBg}`}
                >
                  {item.image}
                </div>

                {/* Product Information */}
                <div className="min-w-0 flex-1">
                  <h3
                    className={`line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-800 transition-colors duration-300 sm:text-lg ${theme.hoverText}`}
                  >
                    {item.nameBn}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    প্রতি {unitBn[item.unit] || item.unit}
                  </p>
                </div>

                {/* Price and Change */}
                <div className="flex shrink-0 flex-col items-end gap-2 text-right">
                  <span className="text-xs font-medium text-gray-400">
                    আজকের দাম
                  </span>

                  <p className="whitespace-nowrap text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
                    {convertToBanglaNumber(item.today)}
                    <span className="ml-1 text-xs font-semibold text-gray-500 sm:text-sm">
                      টাকা
                    </span>
                  </p>

                  {/* Change Badge */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${theme.bg} ${theme.border} ${theme.color}`}
                    aria-label={theme.label}
                  >
                    <span>{theme.arrow}</span>
                    {isUp || isDown
                      ? `${convertToBanglaNumber(item.change.pct)}%`
                      : theme.label}
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center shadow-sm">
          <p className="font-semibold text-gray-800">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>

          <p className="mt-1 text-sm text-gray-500">পরে আবার চেষ্টা করো।</p>
        </div>
      )}
    </section>
  );
};

export default AllProducts;