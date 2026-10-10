import Link from "next/link";
import { notFound } from "next/navigation";

type IMarket = {
  market: string;
  division: string;
  min: number | string;
  max: number | string;
};

type IProduct = Omit<IType, "markets"> & {
  markets: IMarket[];
};

type Props = {
  params: Promise<{ productId: string }>;
};

const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);

const price = (value: number | string) => `${toBn(value)} টাকা`;

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

export default async function ProductDetailsPage({ params }: Props) {
  const { productId } = await params;

  // Testing only: show the loading skeleton
  //   await new Promise((resolve) => setTimeout(resolve, 3000));

  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products",
    { next: { revalidate: 60 } },
  );

  // const res = await fetch("https://api.abcz.workers.dev/api/bazardor/products",{next: { revalidate: 60 },});

  if (!res.ok) {
    throw new Error("পণ্যের তথ্য লোড করা যায়নি।");
  }

  const data: IProduct[] = await res.json();

  const product = data.find((item) => String(item.id) === productId);

  if (!product) {
    notFound();
  }

  const markets = Array.isArray(product.markets) ? product.markets : [];

  const marketPrices = markets.map((market) => ({
    ...market,
    min: Number(market.min),
    max: Number(market.max),
  }));

  const lowest =
    marketPrices.length > 0
      ? Math.min(...marketPrices.map((market) => market.min))
      : 0;

  const highest =
    marketPrices.length > 0
      ? Math.max(...marketPrices.map((market) => market.max))
      : 0;

  const average =
    marketPrices.length > 0
      ? marketPrices.reduce(
          (sum, market) => sum + (market.min + market.max) / 2,
          0,
        ) / marketPrices.length
      : 0;

  const isUp = product.change.dir === "up";
  const isDown = product.change.dir === "down";
  const isFlat = product.change.dir === "flat";

  const summaries = [
    {
      title: "সর্বনিম্ন দাম",
      value: lowest,
      color: "#079447",
      description: "সকল বাজারের সর্বনিম্ন দর",
    },
    {
      title: "সর্বোচ্চ দাম",
      value: highest,
      color: "#E54848",
      description: "সকল বাজারের সর্বোচ্চ দর",
    },
    {
      title: "গড় দাম",
      value: Math.round(average * 10) / 10,
      color: "#07883F",
      description: "বাজারের গড় মূল্য",
    },
  ];

  return (
    <main className="min-h-screen bg-[#F0F5F0] px-3 pt-4 pb-10 font-bangla text-[#27332B] sm:px-5 md:pb-30">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-4 flex flex-wrap items-center gap-2 text-[14px] font-normal text-[#1D271F]"
        >
          <Link href="/" className="transition-colors hover:text-[#07883F]">
            হোম
          </Link>

          <span>›</span>

          <Link
            href={`/category/${encodeURIComponent(product.category)}`}
            className="transition-colors hover:text-[#07883F]"
          >
            {product.categoryNameBn}
          </Link>

          <span>›</span>

          <span className="text-[#29352D]">{product.nameBn}</span>
        </nav>

        {/* Product Header */}
        <section className="mb-3 flex flex-col items-center justify-between gap-4 rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-3 sm:flex-row sm:items-center">
          <div className="flex w-full min-w-0 items-center gap-3">
            <div className="flex h-[77px] w-[77px] shrink-0 items-center justify-center rounded-[10px] bg-[#F0F4F0] p-4 text-[26px]">
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="pt-2 text-[24px] font-bold leading-tight text-[#1D271F] sm:text-[30px]">
                {product.nameBn}
              </h1>

              <p className="py-1 text-[14px] font-normal text-[#1D271F] opacity-70">
                প্রতি {unitBn[product.unit] || product.unit}
                {" · "}
                {product.categoryNameBn}
              </p>

              <p className="text-[14px] font-normal text-[#1D271F]">
                গতকালের তুলনায় আজ দাম{" "}
                {Number(product.today) > Number(product.yesterday) ? (
                  <>
                    <span className="font-bold text-red-600">বেড়েছে</span>{" "}
                    {toBn(Number(product.today) - Number(product.yesterday))}{" "}
                    টাকা
                  </>
                ) : Number(product.today) < Number(product.yesterday) ? (
                  <>
                    <span className="font-bold text-green-600">কমেছে</span>{" "}
                    {toBn(Number(product.yesterday) - Number(product.today))}{" "}
                    টাকা
                  </>
                ) : (
                  <span className="font-bold">পরিবর্তন হয়নি</span>
                )}
              </p>
            </div>
          </div>

          <div className="w-full shrink-0 rounded-[10px] bg-[#F0F5F0] px-3 py-2 text-center sm:w-auto sm:min-w-[150px]">
            <p className="text-[14px] text-[#1D271F] opacity-70">আজকের দাম</p>

            <p className="text-[30px] font-bold text-[#1D271F]">
              {toBn(product.today)}
            </p>

            <p className="text-[14px] text-[#1D271F] opacity-70">
              টাকা / {unitBn[product.unit] || product.unit}
            </p>

            <p
              className={`mt-1 text-[14px] font-semibold ${
                isUp
                  ? "text-[#D03739]"
                  : isDown
                    ? "text-[#07883F]"
                    : "text-gray-500"
              }`}
            >
              {isUp ? "▲" : isDown ? "▼" : "●"}{" "}
              {isFlat
                ? "অপরিবর্তিত"
                : `${toBn(Math.abs(product.change.pct).toFixed(1))}%`}
            </p>
          </div>
        </section>

        {/* Price Summary and Market Table */}
        <section className="rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-3 sm:p-4">
          <h2 className="mb-2 text-[18px] font-semibold text-[#1D271F]">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
            {summaries.map((item) => (
              <div
                key={item.title}
                className="min-h-[55px] rounded-[10px] border border-[#E4EBE4] p-4"
              >
                <p className="text-[12px] text-[#1D271F]">{item.title}</p>

                <p
                  className="py-1 text-[24px] font-bold leading-7"
                  style={{ color: item.color }}
                >
                  {price(item.value)}
                </p>

                <p className="text-[12px] text-[#1D271F]">{item.description}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-2 text-[14px] font-semibold text-[#1D271F]">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-[8px]">
            <table className="w-full min-w-[540px] border-collapse text-left text-[10px]">
              <thead>
                <tr className="border-y border-[#E6ECE6] text-[#657168]">
                  <th className="px-2 py-3 text-[14px] font-bold text-[#1D271F] opacity-70">
                    বাজার
                  </th>

                  <th className="px-2 py-3 text-[14px] font-bold text-[#1D271F] opacity-70">
                    বিভাগ
                  </th>

                  <th className="px-2 py-3 text-right text-[14px] font-bold text-[#1D271F] opacity-70">
                    সর্বনিম্ন
                  </th>

                  <th className="px-2 py-3 text-right text-[14px] font-bold text-[#1D271F] opacity-70">
                    সর্বোচ্চ
                  </th>

                  <th className="px-2 py-3 text-right text-[14px] font-bold text-[#1D271F] opacity-70">
                    গড়
                  </th>
                </tr>
              </thead>

              <tbody>
                {marketPrices.length > 0 ? (
                  marketPrices.map((market, index) => (
                    <tr
                      key={`${market.market}-${market.division}-${index}`}
                      className="border-b border-[#DDE5DD] transition-colors odd:bg-white even:bg-gray-100 hover:bg-[#EAF2EA]"
                    >
                      <td className="whitespace-nowrap px-2 py-3 text-[14px] font-medium text-[#1D271F]">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-2 py-3 text-[14px] text-[#1D271F]">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-2 py-3 text-right font-serif text-[14px] text-[#1D271F]">
                        {price(market.min)}
                      </td>

                      <td className="whitespace-nowrap px-2 py-3 text-right font-serif text-[14px] text-[#1D271F]">
                        {price(market.max)}
                      </td>

                      <td className="whitespace-nowrap px-2 py-3 text-right font-serif text-[14px] font-semibold text-[#1D271F]">
                        {price(
                          Math.round(((market.min + market.max) / 2) * 10) / 10,
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-sm text-gray-500"
                    >
                      এই পণ্যের বাজারভিত্তিক দাম এখনো পাওয়া যায়নি।
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
