"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface IProduct {
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
}
// const URL1 = "https://api.abcz.workers.dev/api/bazardor/products";
// const URL2 ="https://api.api-store.workers.dev/api/bazardor/products";
const URL3 = "https://openapi.programming-hero.com/api/bazardor/products";

const HeaderCategories = () => {
  const [categories, setCategories] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(URL3);
      const data: IProduct[] = await res.json();

      const uniqueCategories = data.filter(
        (item, index, self) =>
          index ===
          self.findIndex((category) => category.category === item.category),
      );

      setCategories(uniqueCategories);
    };

    fetchCategories();
  }, []);

  return (
    <nav className="border-y border-gray-100 bg-white py-3">
      <div className="mx-auto max-w-7xl">
        <ul className="flex gap-3 overflow-x-auto whitespace-nowrap px-4">
          {categories.map((item) => (
            <li key={item.category}>
              <Link
                href={`/category/${item.category}`}
                onClick={() => setSelectedCategory(item.category)}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
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
