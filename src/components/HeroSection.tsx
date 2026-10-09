
import Image from "next/image";

import HeroImg from "../../public/bazar-hero.png";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    // Wrapper: 3D perspective
    <div className="group relative mt-5 [perspective:1500px]">
      {/* Hover zones */}
      <span className="tl absolute left-0 top-0 z-10 h-1/2 w-1/2" />
      <span className="tr absolute right-0 top-0 z-10 h-1/2 w-1/2" />
      <span className="bl absolute bottom-0 left-0 z-10 h-1/2 w-1/2" />
      <span className="br absolute bottom-0 right-0 z-10 h-1/2 w-1/2" />

      {/* Main card */}
      <div className="flex flex-col justify-between gap-3 rounded-xl border border-gray-200 bg-white p-7 transition-all duration-700 ease-in-out group-hover:shadow-lg md:flex-row group-has-[.tl:hover]:[transform:rotateX(0.6deg)_rotateY(-0.6deg)] group-has-[.tr:hover]:[transform:rotateX(0.6deg)_rotateY(0.6deg)] group-has-[.bl:hover]:[transform:rotateX(-0.6deg)_rotateY(-0.6deg)] group-has-[.br:hover]:[transform:rotateX(-0.6deg)_rotateY(0.6deg)]">
        <div>
          <p className="inline rounded-xl bg-[#a0e5b9] p-1 px-3 text-[14px] font-medium text-green-700">
            {date}
          </p>

          <p className="w-auto pt-20 pb-7 text-[16px] font-normal text-gray-800 opacity-70 md:w-145">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#all-products"
            className="relative z-20 inline-block rounded-lg bg-[#047F39] px-4 py-2 pb-1.5 text-[16px] font-semibold text-[#F3FBF4]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div>
          <Image
            src={HeroImg}
            alt="banner-img"
            width={400}
            height={400}
            className="h-auto w-75"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

