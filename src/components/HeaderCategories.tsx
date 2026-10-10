"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

interface IProduct {
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
}

const URL3 =
  "https://openapi.programming-hero.com/api/bazardor/products";

const HeaderCategories = () => {
  // 01. Category states
  const [categories, setCategories] = useState<IProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 02. Get the logged-in user's session
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // 03. Fetch product categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(URL3);

        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: IProduct[] = await res.json();

        const uniqueCategories = data.filter(
          (item, index, self) =>
            index ===
            self.findIndex(
              (category) => category.category === item.category
            )
        );

        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Category fetch failed:", error);
      }
    };

    fetchCategories();
  }, []);

  // 04. Reusable profile link
  const ProfileLink = () => (
    <Link
      href="/profile"
      onClick={() => setIsMenuOpen(false)}
      className="flex items-center gap-2 rounded-full border border-green-100 bg-green-50 py-1.5 pl-1.5 pr-3 transition-colors hover:bg-green-100"
      aria-label="আমার প্রোফাইল"
    >
      {user?.image ? (
        <img
          src={user.image}
          alt={user.name || "Profile"}
          className="h-8 w-8 rounded-full border border-green-200 object-cover"
        />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700">
          <FaUser size={14} />
        </span>
      )}

      <span className="max-w-[120px] truncate text-sm font-semibold text-gray-700">
        {user?.name || "আমার প্রোফাইল"}
      </span>
    </Link>
  );

  // 05. Header categories UI
  return (
    <nav className="border-y border-gray-100 bg-white py-3">
      <div className="mx-auto max-w-7xl">
        {/* Mobile and tablet controls */}
        <div className="flex items-center justify-between px-4 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={
              isMenuOpen
                ? "Close categories menu"
                : "Open categories menu"
            }
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

          {/* Profile on mobile and tablet */}
          {/* {!isPending && user && <ProfileLink />} */}

          {/* Sign-in link when logged out , For checking perpous*/}
          {/* {!isPending && !user && (
            <Link
              href="/sign-in"
              className="rounded-lg bg-blue-400 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
            >
              সাইন ইন
            </Link>
          )} */}
        </div>

        {/* Category items */}
        <ul
          className={`gap-3 px-4 ${
            isMenuOpen
              ? "mt-3 grid grid-cols-2 sm:grid-cols-3"
              : "hidden"
          } lg:mt-0 lg:flex lg:items-center lg:overflow-x-auto lg:whitespace-nowrap`}
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

          {/* Profile on desktop */}
          {/* <li className="hidden lg:block lg:ml-auto">
            {!isPending && user && <ProfileLink />}

            {!isPending && !user && (
              <Link
                href="/sign-in"
                className="flex items-center justify-center rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-green-700"
              >
                সাইন ইন
              </Link>
            )}
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderCategories;