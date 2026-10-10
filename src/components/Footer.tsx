
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex w-fit items-center gap-2 text-2xl font-bold text-[#047F39]"
            >
              <FiShoppingCart size={26} aria-hidden="true" />
              <span>
                বাজার দর<span className="text-[#FC3F33]">.</span>
              </span>
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              প্রতিদিনের বাজারদর জানুন সহজেই। নিত্যপ্রয়োজনীয় পণ্যের দাম
              দেখুন এবং আগের দামের সঙ্গে তুলনা করুন।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-3 font-semibold text-gray-900">
              প্রয়োজনীয় লিংক
            </h3>

            <ul className="space-y-2 text-sm text-gray-600">
              <li>
                <Link href="/" className="transition hover:text-[#047F39]">
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
            <h3 className="mb-3 font-semibold text-gray-900">
              বাজারদর সম্পর্কে
            </h3>

            <p className="text-sm leading-6 text-gray-600">
              বাজারের বিভিন্ন পণ্যের দাম জানা ও তুলনা করার জন্য একটি সহজ
              প্ল্যাটফর্ম। কেনাকাটার আগে পণ্যের দাম সম্পর্কে ধারণা নিন।
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gray-200 pt-5 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} বাজারদর। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
