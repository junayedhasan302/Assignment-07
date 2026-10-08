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
  markets: [];
}

const MarqueePage = async () => {
  // All products
  const URL = "https://api.abcz.workers.dev/api/bazardor/products";

  const res = await fetch(URL);
  const data = await res.json();

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

  // Hover background based on price direction
  const hoverBg: Record<IChange["dir"], string> = {
    up: "hover:bg-green-200",
    down: "hover:bg-red-200",
    flat: "hover:bg-gray-200",
  };

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Marquee */}
      <div className="relative z-10">
        <MarqueeText duration={10} direction="right" repeat={4}>
          <div className="flex">
            {data.map((item: IType) => (
              <div
                key={item.id}
                className={`flex items-center gap-1 border-r border-b border-gray-200 px-5 py-3 transition-colors duration-300 ${hoverBg[item.change.dir]}`}
              >
                <p>
                  {`${item.categoryIcon} ${
                    item.nameBn
                  } ${convertToBanglaNumber(item.today)} টাকা/${
                    unitBn[item.unit] || item.unit
                  }`}
                </p>

                <p className="flex items-center">
                  {item.change.dir === "up" && (
                    <FaCaretUp size={24} className="text-green-600" />
                  )}

                  {item.change.dir === "down" && (
                    <FaCaretDown size={24} className="text-red-600" />
                  )}

                  {item.change.dir === "flat" && (
                    <span className="text-gray-600">-</span>
                  )}

                  <span
                    className={`font-bold ${
                      item.change.dir === "up"
                        ? "text-green-600"
                        : item.change.dir === "down"
                          ? "text-red-600"
                          : "text-gray-500"
                    }`}
                  >
                    {convertToBanglaNumber(item.change.pct)}%
                  </span>
                </p>
              </div>
            ))}
          </div>
        </MarqueeText>
      </div>
    </div>
  );
};

export default MarqueePage;
