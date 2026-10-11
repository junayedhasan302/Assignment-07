
import Link from "next/link";
import { FiShoppingCart, FiArrowUpRight } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-[#E0E8E1] bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2 text-2xl font-bold text-[#047F39] transition hover:opacity-80"
            >
              <FiShoppingCart size={27} aria-hidden="true" />

              <span>
                বাজার দর<span className="text-[#FC3F33]">.</span>
              </span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-600">
              প্রতিদিনের বাজারদর জানুন সহজেই। নিত্যপ্রয়োজনীয় পণ্যের
              দাম দেখুন এবং আগের দামের সঙ্গে তুলনা করে নিন
              সচেতন কেনাকাটার সিদ্ধান্ত।
            </p>

            <Link
              href="/#all-products"
              className="mt-5 inline-flex items-center gap-1.5 rounded-lg bg-[#047F39] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#03662E]"
            >
              পণ্যের দাম দেখুন
              <FiArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-base font-bold text-gray-900">
              প্রয়োজনীয় লিংক
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-[#047F39]"
                >
                  হোম
                </Link>
              </li>

              <li>
                <Link
                  href="/#all-products"
                  className="transition hover:text-[#047F39]"
                >
                  সব পণ্য
                </Link>
              </li>

              <li>
                <Link
                  href="/#all-products"
                  className="transition hover:text-[#047F39]"
                >
                  আজকের বাজারদর
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="mb-4 text-base font-bold text-gray-900">
              বাজারদর সম্পর্কে
            </h3>

            <p className="text-sm leading-7 text-gray-600">
              বাজারের বিভিন্ন নিত্যপ্রয়োজনীয় পণ্যের দাম জানা ও
              তুলনা করার একটি সহজ প্ল্যাটফর্ম। কেনাকাটার আগে
              দাম সম্পর্কে ধারণা নিন এবং সচেতন থাকুন।
            </p>

            <div className="mt-5 rounded-xl border border-[#E0E8E1] bg-white p-4">
              <p className="text-sm font-semibold text-[#047F39]">
                সঠিক দামে সচেতন কেনাকাটা
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                বাজারদর জানুন, তুলনা করুন, তারপর কিনুন।
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-[#E0E8E1] pt-5">
          <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
            <p className="text-xs leading-5 text-gray-500 sm:text-sm">
              © {new Date().getFullYear()} বাজারদর। সর্বস্বত্ব সংরক্ষিত।
            </p>

            <Link
              href="/"
              className="text-xs font-medium text-gray-500 transition hover:text-[#047F39] sm:text-sm"
            >
              Made for smarter shopping
              <span className="ml-1 text-[#FC3F33]">♥</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
