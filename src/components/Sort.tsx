
"use client";

import { useState } from "react";
import ItemCard from "./ItemCard";

type SortOrder = "default" | "asc" | "desc";

interface IChange {
  dir: "up" | "down" | "flat";
  pct: number;
}

interface IProduct {
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

interface SortedItemsProps {
  data: IProduct[];
}

export default function SortedItem({ data }: SortedItemsProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");
  const [isOpen, setIsOpen] = useState(false);

  const options: { value: SortOrder; label: string; icon: string }[] = [
    { value: "default", label: "ডিফল্ট", icon: "✦" },
    { value: "asc", label: "কম দাম থেকে বেশি দাম", icon: "↑" },
    { value: "desc", label: "বেশি দাম থেকে কম দাম", icon: "↓" },
  ];

  const selectedOption = options.find(
    (option) => option.value === sortOrder
  )!;

  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === "asc") return a.today - b.today;
    if (sortOrder === "desc") return b.today - a.today;
    return 0;
  });

  return (
    <>
      {/* Sorting Toolbar */}
      <div className="my-6 flex flex-col gap-4 rounded-xl border border-[#E0E8E1] bg-gradient-to-r from-white to-green-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-base font-bold text-[#1D271F]">
            পণ্যের তালিকা
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            মোট{" "}
            <span className="font-semibold text-green-700">
              {sortedData.length.toLocaleString("bn-BD")}
            </span>{" "}
            টি পণ্য পাওয়া গেছে
          </p>
        </div>

        {/* Custom Sort Dropdown */}
        <div className="relative w-full sm:w-auto">
          <div className="flex items-center gap-3 rounded-xl border border-green-100 bg-white p-2 shadow-sm">
            <span className="shrink-0 pl-1 text-sm font-semibold text-[#1D271F]">
              সাজান
            </span>

            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              className={`flex w-full min-w-0 items-center justify-between gap-3 rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-200 sm:w-[240px] ${
                isOpen
                  ? "border-green-500 bg-green-50 text-green-800 ring-4 ring-green-100"
                  : "border-gray-200 bg-gray-50 text-gray-700 hover:border-green-400 hover:bg-green-50"
              }`}
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
                className={`h-4 w-4 shrink-0 text-green-700 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="m5 7 5 5 5-5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Dropdown Options */}
          {isOpen && (
            <div
              role="listbox"
              aria-label="দাম অনুযায়ী সাজান"
              className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-green-100 bg-white p-1.5 shadow-xl shadow-green-900/10 animate-in fade-in slide-in-from-top-2 duration-200 sm:w-[280px]"
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
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm font-medium transition-all duration-200 ${
                    sortOrder === option.value
                      ? "bg-green-50 text-green-800"
                      : "text-gray-700 hover:bg-green-50 hover:text-green-800"
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base font-bold transition-colors ${
                      sortOrder === option.value
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-green-100"
                    }`}
                  >
                    {option.icon}
                  </span>

                  <span className="flex-1">
                    {option.label}
                  </span>

                  {sortOrder === option.value && (
                    <svg
                      className="h-5 w-5 shrink-0 text-green-600"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        d="m5 10 3 3 7-7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-5">
        {sortedData.map((item) => (
          <ItemCard key={item.id} data={item} />
        ))}
      </div>
    </>
  );
}
