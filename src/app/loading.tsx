export default function Loading() {
  return (
    <main className="flex min-h-[60vh] items-center justify-center bg-gray-50 px-4 py-10 sm:min-h-[65vh] sm:px-6 sm:py-14 lg:min-h-[70vh] lg:px-8 lg:py-16">
      <div className="flex w-full max-w-xs flex-col items-center text-center sm:max-w-sm lg:max-w-md">
        {/* Animated Loader */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center sm:mb-7 sm:h-22 sm:w-22 lg:mb-8 lg:h-24 lg:w-24">
          {/* Outer Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-gray-200 border-t-red-600" />

          {/* Inner Circle */}
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm sm:h-15 sm:w-15 lg:h-16 lg:w-16">
            <span className="text-2xl sm:text-[28px] lg:text-3xl">🛒</span>
          </div>

          {/* Pulse Dot */}
          <span className="absolute right-0 top-1 h-3.5 w-3.5 animate-pulse rounded-full border-2 border-white bg-red-600 sm:h-4 sm:w-4" />
        </div>

        {/* Title */}
        <h2 className="text-lg font-bold tracking-tight text-gray-900 sm:text-xl lg:text-2xl">
          বাজারদর লোড হচ্ছে
        </h2>

        {/* Description */}
        <p className="mt-2 max-w-[280px] text-xs leading-5 text-gray-500 sm:max-w-xs sm:text-sm sm:leading-6 lg:mt-3">
          আজকের পণ্যের দাম ও বাজারের সর্বশেষ তথ্য নিয়ে আসা হচ্ছে।
        </p>

        {/* Animated Loading Dots */}
        <div className="mt-5 flex items-center gap-2 sm:mt-6">
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-600 [animation-delay:-0.3s] sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-600 [animation-delay:-0.15s] sm:h-2 sm:w-2" />
          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-red-600 sm:h-2 sm:w-2" />
        </div>

        {/* Waiting Text */}
        <p className="mt-3 text-[11px] font-medium text-gray-400 sm:mt-4 sm:text-xs">
          অনুগ্রহ করে অপেক্ষা করুন
        </p>
      </div>
    </main>
  );
}
