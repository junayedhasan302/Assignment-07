
export default function CategoryLoading() {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50">
      <section className="mx-auto max-w-7xl px-3 py-6 sm:px-6 lg:px-8">

        {/* Category Heading */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-6">
          <div className="h-8 w-48 max-w-full rounded-lg bg-gray-200" />
          <div className="mt-3 h-4 w-64 max-w-full rounded bg-gray-100" />
        </div>

        {/* Category Product Count and Filters */}
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="h-10 w-full rounded-lg bg-gray-200 sm:w-56" />
        </div>

        {/* Category Product Cards */}
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="flex min-h-[140px] items-center gap-3 rounded-2xl border border-[#E0E8E1] bg-white p-4 sm:gap-4 sm:p-5"
            >
              {/* Product Icon */}
              <div className="h-16 w-16 shrink-0 rounded-xl bg-gray-200" />

              {/* Product Information */}
              <div className="min-w-0 flex-1 space-y-3">
                <div className="h-4 w-full max-w-32 rounded bg-gray-200" />
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>

              {/* Price */}
              <div className="flex shrink-0 flex-col items-end gap-2">
                <div className="h-3 w-16 rounded bg-gray-100" />
                <div className="h-6 w-14 rounded bg-gray-200" />
                <div className="h-6 w-16 rounded-full bg-gray-100" />
              </div>
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
