
import Link from "next/link";

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

const ItemCard = ({ data }: { data: IType }) => {
  const isUp = data.change.dir === "up";
  const isDown = data.change.dir === "down";

  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(
      /\d/g,
      (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
    );
  };

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

  return (
    <Link
      href={`/product/${data.id}`}
      aria-label={`${data.nameBn} পণ্যের বিস্তারিত দেখুন`}
      className={`group flex min-h-[140px] items-center gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:gap-4 sm:p-5 ${
        isUp
          ? "border-red-200 hover:border-red-300"
          : isDown
            ? "border-emerald-200 hover:border-emerald-300"
            : "border-gray-200 hover:border-gray-300"
      }`}
    >
      {/* Product Icon */}
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-4xl transition-colors duration-300 ${
          isUp
            ? "bg-red-50 group-hover:bg-red-100"
            : isDown
              ? "bg-emerald-50 group-hover:bg-emerald-100"
              : "bg-gray-50 group-hover:bg-gray-100"
        }`}
      >
        {data.image}
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <h3
          className={`line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-800 transition-colors duration-300 sm:text-lg ${
            isUp
              ? "group-hover:text-red-600"
              : isDown
                ? "group-hover:text-emerald-600"
                : "group-hover:text-gray-600"
          }`}
        >
          {data.nameBn}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          প্রতি {unitBn[data.unit] || data.unit}
        </p>
      </div>

      {/* Price and Price Change */}
      <div className="flex shrink-0 flex-col items-end gap-2 text-right">
        <span className="text-xs font-medium text-gray-400">
          আজকের দাম
        </span>

        <p className="whitespace-nowrap text-lg font-extrabold tracking-tight text-gray-900 sm:text-xl">
          {toBanglaNumber(data.today)}

          <span className="ml-1 text-xs font-semibold text-gray-500 sm:text-sm">
            টাকা
          </span>
        </p>

        {/* Price Change Badge */}
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${
            isUp
              ? "border-red-200 bg-red-50 text-red-600"
              : isDown
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : "border-gray-200 bg-gray-50 text-gray-500"
          }`}
          aria-label={
            isUp
              ? "দাম বেড়েছে"
              : isDown
                ? "দাম কমেছে"
                : "অপরিবর্তিত"
          }
        >
          <span>{isUp ? "▲" : isDown ? "▼" : "●"}</span>

          {isUp || isDown
            ? `${toBanglaNumber(
                Math.abs(data.change.pct).toFixed(1)
              )}%`
            : "অপরিবর্তিত"}
        </span>
      </div>
    </Link>
  );
};

export default ItemCard;