import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] w-full flex-col items-center justify-center bg-white px-4 py-12 text-center sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md">
        {/* Emoji / Illustration Badge */}
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-50 text-5xl shadow-sm sm:h-28 sm:w-28 sm:text-6xl">
          🔍
        </div>

        {/* 404 Heading */}
        <h1 className="mt-6 text-6xl font-black tracking-tight text-[#19b526] sm:text-7xl">
          ৪০৪!
        </h1>

        {/* Message */}
        <h2 className="mt-3 text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
          পৃষ্ঠাটি পাওয়া যায়নি!
        </h2>

        <p className="mt-2 text-sm text-gray-600 sm:text-base">
          আপনি যে লিঙ্কটিতে প্রবেশ করার চেষ্টা করছেন তা হয়তো মুছে ফেলা হয়েছে অথবা লিংকটি ভুল।
        </p>

        {/* Action Button */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#19b526] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-green-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#19b526] focus:ring-offset-2 active:scale-95 sm:text-base"
          >
            <span>🏠</span>
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}