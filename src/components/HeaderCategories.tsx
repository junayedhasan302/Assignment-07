
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

interface IProduct {
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
}

const URL3 =
  "https://openapi.programming-hero.com/api/bazardor/products";

const HeaderCategories = () => {
  const [categories, setCategories] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(URL3);
      const data: IProduct[] = await res.json();

      const uniqueCategories = data.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (category) => category.category === item.category,
          ),
      );

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="border-y border-gray-100 bg-white py-3">
      <div className="mx-auto max-w-7xl">
        {/* Mobile and tablet menu button */}
        <div className="flex items-center justify-between px-4 lg:hidden">
          {/* <span className="text-sm font-semibold text-gray-700">
            ক্যাটাগরি
          </span> */}

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close categories menu" : "Open categories menu"}
            aria-expanded={isMenuOpen}
            className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-green-50 hover:text-green-700"
          >
            {isMenuOpen ? (
              <>
                <FaTimes />
                <span>বন্ধ করুন</span>
              </>
            ) : (
              <>
                <FaBars />
                <span>ক্যাটাগরি</span>
              </>
            )}
          </button>
        </div>

        {/* Category items */}
        <ul
          className={`gap-3 px-4 ${
            isMenuOpen
              ? "mt-3 grid grid-cols-2 sm:grid-cols-3"
              : "hidden"
          } lg:mt-0 lg:flex lg:overflow-x-auto lg:whitespace-nowrap`}
        >
          {categories.map((item) => (
            <li key={item.category}>
              <Link
                href={`/category/${item.category}`}
                onClick={() => {
                  setSelectedCategory(item.category);
                  setIsMenuOpen(false);
                }}
                className={`flex w-full items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors lg:w-auto ${
                  selectedCategory === item.category
                    ? "bg-green-600 text-white"
                    : "bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <span>{item.categoryIcon}</span>
                <span>{item.categoryNameBn}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderCategories;
