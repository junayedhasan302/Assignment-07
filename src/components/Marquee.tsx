import Link from "next/link";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import MarqueeText from "react-marquee-text";

import "react-marquee-text/dist/styles.css";

export interface IChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

export interface IType {
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
  change: IChange;
}

const Marquee = async () => {
  // All products
  // const URL1 = "https://api.abcz.workers.dev/api/bazardor/products";
  // const URL2 = "https://api.api-store.workers.dev/api/bazardor/products";

  const URL3 = "https://openapi.programming-hero.com/api/bazardor/products";

  const res = await fetch(URL3);
  const data: IType[] = await res.json();

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

  const convertToBanglaNumber = (value: number | string) => {
    return String(value).replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
  };

  // Colors based on price direction
  const priceStyles: Record<
    IChange["dir"],
    {
      text: string;
      hoverText: string;
      hoverBg: string;
      arrow: string;
    }
  > = {
    up: {
      text: "text-red-600",
      hoverText: "group-hover:text-red-800",
      hoverBg: "hover:bg-red-100",
      arrow: "text-red-600",
    },
    down: {
      text: "text-green-600",
      hoverText: "group-hover:text-green-800",
      hoverBg: "hover:bg-green-100",
      arrow: "text-green-600",
    },
    flat: {
      text: "text-gray-500",
      hoverText: "group-hover:text-gray-700",
      hoverBg: "hover:bg-gray-100",
      arrow: "text-gray-500",
    },
  };

  return (
    <div className="w-full overflow-hidden bg-white">
      <MarqueeText duration={10} direction="right">
        <div className="flex w-max items-center">
          {data.map((item) => {
            const colors = priceStyles[item.change.dir];

            return (
              <Link
                key={item.id}
                href={`/product/${item.id}`}
                className={`group flex shrink-0 cursor-pointer items-center gap-2 px-3 py-2.5 transition-colors duration-300 sm:gap-2.5 sm:px-4 sm:py-3 lg:gap-3 lg:px-5 ${colors.hoverBg}`}
              >
                <p
                  className={`whitespace-nowrap text-[11px] font-medium text-gray-700 transition-colors duration-300 sm:text-xs lg:text-sm ${colors.hoverText}`}
                >
                  {item.categoryIcon} {item.nameBn}{" "}
                  {convertToBanglaNumber(item.today)} টাকা/
                  {unitBn[item.unit] || item.unit}
                </p>

                <div className="flex shrink-0 items-center gap-0.5">
                  {item.change.dir === "up" && (
                    <FaCaretUp
                      size={18}
                      className={`shrink-0 sm:h-5 sm:w-5 ${colors.arrow}`}
                    />
                  )}

                  {item.change.dir === "down" && (
                    <FaCaretDown
                      size={18}
                      className={`shrink-0 sm:h-5 sm:w-5 ${colors.arrow}`}
                    />
                  )}

                  {item.change.dir === "flat" && (
                    <span className="text-xs font-bold text-gray-500">−</span>
                  )}

                  <span
                    className={`whitespace-nowrap text-[11px] font-bold transition-colors duration-300 sm:text-xs lg:text-sm ${colors.text} ${colors.hoverText}`}
                  >
                    {convertToBanglaNumber(item.change.pct)}%
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </MarqueeText>
    </div>
  );
};

export default Marquee;
