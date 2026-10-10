
"use client";

import { useState } from "react";
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

type SortOrder = "default" | "asc" | "desc";

const AllProducts = ({
  products,
}: {
  products: IType[];
}) => {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [isOpen, setIsOpen] = useState(false);

  const options = [
    { value: "default", label: "ডিফল্ট", icon: "✦" },
    { value: "asc", label: "কম দাম থেকে বেশি দাম", icon: "↑" },
    { value: "desc", label: "বেশি দাম থেকে কম দাম", icon: "↓" },
  ] as const;

  const selectedOption = options.find(
    (option) => option.value === sortOrder
  )!;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOrder === "asc") return a.today - b.today;
    if (sortOrder === "desc") return b.today - a.today;
    return 0;
  });

  return (
    <section
      id="all-products"
      className="mx-auto max-w-7xl scroll-mt-24 px-4 py-6 sm:px-6 lg:px-8"
    >
      {/* Heading and Sort */}
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            সকল পণ্য
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            বাজারের সব পণ্যের বর্তমান দাম ও দামের পরিবর্তন
          </p>

          <p className="mt-2 text-sm text-gray-600">
            মোট পণ্য:{" "}
            <span className="font-bold text-[#047F39]">
              {products.length.toLocaleString("bn-BD")}
            </span>{" "}
            টি
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="relative z-20 w-full sm:w-auto">
          <div className="flex items-center gap-3 rounded-xl border border-[#E0E8E1] bg-white p-2 shadow-sm">
            <span className="shrink-0 pl-1 text-sm font-semibold text-[#1D271F]">
              সাজান
            </span>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className="flex w-full min-w-0 items-center justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-green-400 hover:bg-green-50 sm:w-[240px]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span className="font-bold text-green-700">
                  {selectedOption.icon}
                </span>
                <span className="truncate">
                  {selectedOption.label}
                </span>
              </span>

              <svg
                className={`h-4 w-4 shrink-0 text-green-700 transition-transform ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {/* SVG arrow icon for the sort dropdown */}
                <path
                  d="m5 7 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {isOpen && (
            <div
              role="listbox"
              aria-label="দাম অনুযায়ী সাজান"
              className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-green-100 bg-white p-1.5 shadow-xl sm:w-[280px]"
            >
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={sortOrder === option.value}
                  onClick={() => {
                    setSortOrder(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-colors ${
                    sortOrder === option.value
                      ? "bg-green-50 text-green-800"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-base font-bold text-green-700">
                    {option.icon}
                  </span>

                  <span className="flex-1">{option.label}</span>

                  {sortOrder === option.value && (
                    <span className="font-bold text-green-600">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Price Change Legend */}
      <div className="mb-5 flex flex-wrap items-center gap-3 text-xs font-medium sm:gap-4">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1.5 text-red-600">
          ▲ দাম বেড়েছে
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5 text-emerald-700">
          ▼ দাম কমেছে
        </span>

        <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-gray-600">
          ● অপরিবর্তিত
        </span>
      </div>

      {/* Product Cards */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sortedProducts.map((item) => (
            <ItemCard key={item.id} data={item} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white px-4 py-12 text-center shadow-sm">
          <p className="font-semibold text-gray-800">
            কোনো পণ্যের তথ্য পাওয়া যায়নি।
          </p>
          <p className="mt-1 text-sm text-gray-500">
            পরে আবার চেষ্টা করো।
          </p>
        </div>
      )}
    </section>
  );
};

export default AllProducts;
