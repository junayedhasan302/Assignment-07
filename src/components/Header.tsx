
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import HeaderCategories from "./HeaderCategories";
import Marquee from "./Marquee";
import HeaderAuth from "@/components/HeaderAuth";

const Header = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full bg-white shadow-sm">
      {/* Top Header */}
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-3 sm:px-6 sm:py-4 md:flex-row md:items-center md:justify-between lg:px-8 lg:py-5">
        {/* Logo + Date */}
        <div className="flex min-w-0 items-center justify-between gap-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2.5 sm:gap-3"
          >
            {/* Shopping Cart Icon */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-600 text-white shadow-sm shadow-green-600/20 sm:h-14 sm:w-14 sm:rounded-2xl lg:h-16 lg:w-16">
              <FiShoppingCart
                size={24}
                className="sm:hidden"
                aria-hidden="true"
              />

              <FiShoppingCart
                size={30}
                className="hidden sm:block lg:hidden"
                aria-hidden="true"
              />

              <FiShoppingCart
                size={36}
                className="hidden lg:block"
                aria-hidden="true"
              />
            </div>

            {/* Brand Name + Date */}
            <div className="min-w-0">
              <span className="text-xl font-extrabold tracking-tight text-green-700 sm:text-2xl lg:text-3xl">
                বাজার দর<span className="text-[#FC3F33]">.</span>
              </span>

              <p className="mt-1 text-[10px] leading-4 text-gray-500 sm:text-xs lg:text-sm">
                {today}
              </p>
            </div>
          </Link>

          {/* Mobile Authentication */}
          <div className="flex shrink-0 items-center md:hidden">
            <HeaderAuth />
          </div>
        </div>

        {/* Tablet + Desktop Authentication */}
        <div className="hidden shrink-0 items-center md:flex">
          <HeaderAuth />
        </div>
      </div>

      {/* Navigation + Marquee */}
      <nav>
        <HeaderCategories />
        <Marquee />
      </nav>
    </header>
  );
};

export default Header;
