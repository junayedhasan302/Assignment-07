import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";
import HeaderCategories from "./HeaderCategories";
import Marquee from "./Marquee";

const Header = () => {
  const today = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });





  return (
    <header className="w-full bg-white shadow-sm">
      {/* Up */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo + Date */}
        <div className="flex items-center gap-3">
          <div className="bg-green-600 p-2 rounded-xl text-white">
            <FiShoppingCart size={40} />
          </div>

          <div>
            <div className="text-2xl font-bold text-green-700">
              <p>বাজার দর</p>
            </div>

            <div className="mt-1 text-sm text-gray-500">{today}</div>
          </div>
        </div>

        {/* Sign in Signup */}
        <div className="flex gap-5">
          <Link
            href="/sign-in"
            className=" text-[16px] text-black px-3 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-600 transition-all duration-300 hover:text-white"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className=" text-[16px] text-white bg-[#05893E] px-3 pt-2 pb-1.5 md:px-4 md:pt-3 md:pb-2.5 rounded-md hover:bg-green-900 transition-all duration-300"
          >
            সাইন আপ
          </Link>
        </div>
      </div>

      {/* Down - Navigation */}
      <nav className="border border-gray-100 bg-green-700">
        <HeaderCategories/>
        <Marquee/>
      </nav>
    </header>
  );
};

export default Header;
