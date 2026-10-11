
import Link from "next/link";
import { FiShoppingCart, FiHome } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-12 border-t border-green-200 bg-green-50">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">

        {/* Bazar Dor Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-700 text-white shadow-sm transition group-hover:bg-green-800">
            <FiShoppingCart size={24} />
          </span>

          <span className="text-2xl font-extrabold tracking-tight text-green-800">
            বাজার দর<span className="text-green-500">.</span>
          </span>
        </Link>

        {/* Home Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-green-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
        >
          <FiHome size={17} />
          হোম
        </Link>

        {/* GitHub Profile */}
        <Link
          href="https://github.com/junayedhasan302"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Find me on GitHub"
          className="group inline-flex items-center gap-2.5 rounded-xl border border-green-200 bg-white px-4 py-3 text-green-800 transition hover:border-green-400 hover:bg-green-100"
        >
          <FaGithub size={25} />

          <span className="text-left">
            <span className="block text-sm font-semibold">
              Find me on GitHub
            </span>
            <span className="block text-xs text-green-600">
              Click to visit my profile
            </span>
          </span>
        </Link>
      </div>

      {/* Copyright */}
      <div className="border-t border-green-200/80 px-4 py-4 text-center">
        <p className="text-xs text-green-800 sm:text-sm">
          © {new Date().getFullYear()} বাজার দর। সর্বস্বত্ব সংরক্ষিত।
        </p>
      </div>
    </footer>
  );
};

export default Footer;
