
import Link from "next/link";
import {
  FiShoppingCart,
  FiHome,
  FiPackage,
  FiTrendingUp,
  FiArrowUpRight,
} from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-14 border-t border-green-200 bg-green-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8">

        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">

          {/* Brand Information */}
          <div>
            <Link
              href="/"
              className="group mb-4 inline-flex items-center gap-3"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-700 text-white shadow-sm transition group-hover:bg-green-800">
                <FiShoppingCart size={26} />
              </span>

              <span className="text-2xl font-extrabold tracking-tight text-green-800">
                বাজার দর<span className="text-red-500">.</span>
              </span>
            </Link>

            <p className="max-w-sm text-sm leading-7 text-gray-600">
              নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন সহজেই।
              বিভিন্ন পণ্যের দাম তুলনা করে সচেতনভাবে
              কেনাকাটার সিদ্ধান্ত নিন।
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="mb-4 text-base font-bold text-green-900">
              প্রয়োজনীয় লিংক
            </h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:translate-x-1 hover:text-green-700"
                >
                  <FiHome size={17} />
                  হোম
                </Link>
              </li>

              <li>
                <Link
                  href="/#all-products"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:translate-x-1 hover:text-green-700"
                >
                  <FiPackage size={17} />
                  সব পণ্য
                </Link>
              </li>

              <li>
                <Link
                  href="/#all-products"
                  className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:translate-x-1 hover:text-green-700"
                >
                  <FiTrendingUp size={17} />
                  আজকের বাজারদর
                </Link>
              </li>
            </ul>
          </div>

          {/* About & GitHub */}
          <div>
            <h3 className="mb-4 text-base font-bold text-green-900">
              বাজারদর সম্পর্কে
            </h3>

            <p className="text-sm leading-7 text-gray-600">
              বাজারদর হলো পণ্যের দাম জানা ও তুলনা করার
              একটি সহজ প্ল্যাটফর্ম। আমাদের লক্ষ্য হলো
              বাজারদর সম্পর্কে প্রয়োজনীয় তথ্য সহজে
              সবার কাছে পৌঁছে দেওয়া।
            </p>

            <Link
              href="https://github.com/junayedhasan302"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex max-w-full items-center gap-3 rounded-xl border border-green-200 bg-white px-4 py-3 transition hover:border-green-400 hover:bg-green-100"
            >
              <FaGithub size={26} className="shrink-0 text-green-800" />

              <span className="min-w-0">
                <span className="block text-sm font-semibold text-green-900">
                  Find me on GitHub
                </span>
                <span className="block break-words text-xs text-gray-500">
                  Click to visit my profile
                </span>
              </span>

              <FiArrowUpRight
                size={17}
                className="shrink-0 text-green-700"
              />
            </Link>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-green-200 pt-5">
          <p className="text-center text-xs leading-6 text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
