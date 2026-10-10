
import SortedItem from "@/components/Sort";

type IProduct = {
  id: number | string;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: [];
};

type CategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products?category=${categoryId}`
  );

  const categoryData: IProduct[] = await res.json();

  const categoryItem = categoryData[0];

  const toBanglaNumber = (value: number | string) => {
    return String(value).replace(
      /\d/g,
      (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]
    );
  };

  return (
    <div className="px-4 pb-20 sm:px-8 md:px-0">
      {categoryItem && (
        <div className="my-6 flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-4">
          <p className="text-3xl">{categoryItem.categoryIcon}</p>

          <div>
            <h2 className="text-[24px] font-bold text-[#1D271F]">
              {categoryItem.categoryNameBn}
            </h2>

            <p className="text-[14px] font-normal text-[#1D271F] opacity-70">
              {`${toBanglaNumber(categoryData.length)}টি পণ্যের আজকের দাম ও পরিবর্তন`}
            </p>
          </div>
        </div>
      )}

      <SortedItem data={categoryData} />
    </div>
  );
};

export default CategoryPage;
