
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

  const theme = isUp
    ? {
        bg: "bg-red-50",
        border: "border-red-200",
        color: "text-red-600",
        hoverBorder: "hover:border-red-300",
        hoverBg: "group-hover:bg-red-100",
        hoverText: "group-hover:text-red-600",
        arrow: "▲",
        label: "দাম বেড়েছে",
      }
    : isDown
      ? {
          bg: "bg-emerald-50",
          border: "border-emerald-200",
          color: "text-emerald-600",
          hoverBorder: "hover:border-emerald-300",
          hoverBg: "group-hover:bg-emerald-100",
          hoverText: "group-hover:text-emerald-600",
          arrow: "▼",
          label: "দাম কমেছে",
        }
      : {
          bg: "bg-gray-50",
          border: "border-gray-200",
          color: "text-gray-500",
          hoverBorder: "hover:border-gray-300",
          hoverBg: "group-hover:bg-gray-100",
          hoverText: "group-hover:text-gray-600",
          arrow: "●",
          label: "অপরিবর্তিত",
        };

  return (
    <article
      className={`group flex min-h-[140px] items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:gap-4 sm:p-5 ${theme.hoverBorder}`}
    >
      {/* Product Icon */}
      <div
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-4xl transition-colors duration-300 ${theme.bg} ${theme.hoverBg}`}
      >
        {data.image}
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <h3
          className={`line-clamp-2 min-h-12 text-base font-semibold leading-6 text-gray-800 transition-colors duration-300 sm:text-lg ${theme.hoverText}`}
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
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold ${theme.bg} ${theme.border} ${theme.color}`}
          aria-label={theme.label}
        >
          <span>{theme.arrow}</span>

          {isUp || isDown
            ? `${toBanglaNumber(Math.abs(data.change.pct).toFixed(1))}%`
            : theme.label}
        </span>
      </div>
    </article>
  );
};

export default ItemCard;
