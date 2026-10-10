function ProductHeaderSkeleton() {
  return (
    <section className="mb-4 flex flex-col items-center justify-between gap-4 rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-4 sm:flex-row sm:items-center">
      <div className="flex w-full min-w-0 items-center gap-3">
        {/* Product Icon Skeleton */}
        <div className="h-[77px] w-[77px] shrink-0 animate-pulse rounded-[10px] bg-[#E4EBE4]" />

        {/* Product Information Skeleton */}
        <div className="min-w-0 flex-1 space-y-3">
          <div className="h-7 w-40 max-w-full animate-pulse rounded bg-gray-200 sm:h-8 sm:w-56" />
          <div className="h-4 w-36 max-w-full animate-pulse rounded bg-gray-100" />
          <div className="h-4 w-full max-w-[280px] animate-pulse rounded bg-gray-200" />
        </div>
      </div>

      {/* Today's Price Skeleton */}
      <div className="w-full shrink-0 rounded-[10px] bg-[#F0F5F0] px-4 py-3 sm:w-auto sm:min-w-[150px]">
        <div className="mx-auto h-4 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto my-2.5 h-9 w-24 animate-pulse rounded bg-gray-200" />
        <div className="mx-auto h-4 w-24 animate-pulse rounded bg-gray-100" />
        <div className="mx-auto mt-2.5 h-4 w-20 animate-pulse rounded bg-gray-200" />
      </div>
    </section>
  );
}

function PriceSummarySkeleton() {
  return (
    <section className="rounded-[11px] border border-[#DFE8DF] bg-[#FAFCFA] p-4 sm:p-5">
      {/* Section Heading */}
      <div className="mb-4 h-6 w-40 animate-pulse rounded bg-gray-200" />

      {/* Price Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <div
            key={index}
            className="min-h-[120px] animate-pulse rounded-[10px] border border-[#E4EBE4] bg-white p-5 space-y-3"
          >
            <div className="h-4 w-24 rounded bg-gray-200" />
            <div className="h-7 w-32 max-w-full rounded bg-gray-200" />
            <div className="h-3 w-36 max-w-full rounded bg-gray-100" />
          </div>
        ))}
      </div>

      {/* Market Table Heading */}
      <div className="mb-4 h-5 w-44 animate-pulse rounded bg-gray-200" />

      {/* Market Table */}
      <div className="overflow-x-auto rounded-[8px] border border-[#E4EBE4]">
        <table className="w-full min-w-[540px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E6ECE6] bg-gray-50">
              {["বাজার", "বিভাগ", "সর্বনিম্ন", "সর্বোচ্চ", "গড়"].map(
                (heading) => (
                  <th key={heading} className="px-4 py-3.5">
                    <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
                  </th>
                ),
              )}
            </tr>
          </thead>

          <tbody>
            {Array.from({ length: 10 }, (_, index) => (
              <tr
                key={index}
                className="border-b border-[#DDE5DD] odd:bg-white even:bg-[#FAFCFA]"
              >
                {Array.from({ length: 5 }, (_, cellIndex) => (
                  <td key={cellIndex} className="px-4 py-4">
                    <div
                      className={`h-4 animate-pulse rounded bg-gray-200 ${
                        cellIndex < 2 ? "w-24" : "ml-auto w-20"
                      }`}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#F0F5F0] px-3 pt-4 pb-10 font-bangla text-[#27332B] sm:px-5 md:pb-30">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb Skeleton */}
        <nav className="mb-4 flex items-center gap-2">
          <div className="h-4 w-10 rounded bg-gray-200" />
          <div className="h-4 w-2 rounded bg-gray-200" />
          <div className="h-4 w-20 rounded bg-gray-200" />
          <div className="h-4 w-2 rounded bg-gray-200" />
          <div className="h-4 w-28 max-w-[30%] rounded bg-gray-200" />
        </nav>

        {/* Product Header */}
        <ProductHeaderSkeleton />

        {/* Price Summary and Market Table */}
        <PriceSummarySkeleton />
      </div>
    </main>
  );
}