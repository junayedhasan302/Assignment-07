// These data are changeable, its a bad system to show sceleton
const ALL_PRODUCTS_COUNT = 33;
const UP_PRICE_COUNT = 15;
const DOWN_PRICE_COUNT = 12;

function ProductSkeleton() {
  return (
    <div className="flex min-h-[140px] items-center gap-3 rounded-2xl border border-[#E0E8E1] bg-white p-4 shadow-sm sm:gap-4 sm:p-5">
      {/* Product Icon */}
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-gray-100">
        <div className="h-9 w-9 rounded-lg bg-gray-200" />
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">
        <div className="mb-3 space-y-2">
          <div className="h-4 w-full max-w-32 rounded bg-gray-200 sm:max-w-40" />
          <div className="h-4 w-3/4 max-w-24 rounded bg-gray-200" />
        </div>
        <div className="h-3 w-20 rounded bg-gray-100" />
      </div>

      {/* Price and Price Change */}
      <div className="flex shrink-0 flex-col items-end gap-2 text-right">
        <div className="h-3 w-16 rounded bg-gray-100" />

        <div className="flex items-baseline gap-1">
          <div className="h-6 w-12 rounded bg-gray-200 sm:h-7 sm:w-16" />
          <div className="h-3 w-7 rounded bg-gray-100" />
        </div>

        <div className="h-6 w-16 rounded-full bg-gray-100" />
      </div>
    </div>
  );
}

function SectionHeadingSkeleton({
  type,
}: {
  type: "up" | "down" | "all";
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2">
        {type !== "all" && (
          <div
            className={`h-5 w-5 rounded ${
              type === "up" ? "bg-red-100" : "bg-emerald-100"
            }`}
          />
        )}
        <div className="h-7 w-48 max-w-[80%] rounded bg-gray-200 sm:h-8 sm:w-56" />
      </div>

      <div className="mt-2 h-4 w-64 max-w-full rounded bg-gray-100" />
    </div>
  );
}

function ProductGridSkeleton({ count }: { count: number }) {
  return (
    <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-gray-50">
      <div className="mx-auto max-w-7xl px-3 py-5 sm:px-6 sm:py-6 lg:px-8">

        {/* Hero Section */}
        <section className="mb-8 flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-4 sm:p-6 md:flex-row md:items-center md:justify-between lg:p-7">
          <div className="flex-1 space-y-4">
            <div className="h-6 w-44 max-w-full rounded-lg bg-gray-200" />
            <div className="space-y-2 pt-8 sm:pt-12">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-11/12 rounded bg-gray-200" />
              <div className="h-4 w-3/4 rounded bg-gray-200" />
            </div>
            <div className="h-10 w-36 rounded-lg bg-gray-200" />
          </div>
          <div className="h-40 w-full rounded-xl bg-gray-200 sm:h-52 md:w-64 lg:w-80" />
        </section>

        {/* Today's Increased Prices */}
        <section className="mb-8">
          <SectionHeadingSkeleton type="up" />
          <ProductGridSkeleton count={UP_PRICE_COUNT} />
        </section>

        {/* Today's Decreased Prices */}
        <section className="mb-8">
          <SectionHeadingSkeleton type="down" />
          <ProductGridSkeleton count={DOWN_PRICE_COUNT} />
        </section>

        {/* All Products Heading and Sort */}
        <section>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="h-8 w-40 rounded bg-gray-200" />
              <div className="h-4 w-64 max-w-full rounded bg-gray-100" />
              <div className="h-4 w-32 rounded bg-gray-100" />
            </div>

            <div className="flex w-full items-center gap-3 rounded-xl border border-[#E0E8E1] bg-white p-2 sm:w-auto">
              <div className="h-4 w-12 rounded bg-gray-200" />
              <div className="h-9 flex-1 rounded-lg bg-gray-100 sm:w-[240px]" />
            </div>
          </div>

          {/* Price Change Legend */}
          <div className="mb-5 flex flex-wrap gap-2 sm:gap-4">
            <div className="h-7 w-24 rounded-full bg-red-100" />
            <div className="h-7 w-24 rounded-full bg-emerald-100" />
            <div className="h-7 w-28 rounded-full bg-gray-200" />
          </div>

          {/* All Product Cards */}
          <ProductGridSkeleton count={ALL_PRODUCTS_COUNT} />
        </section>

      </div>
    </main>
  );
}
