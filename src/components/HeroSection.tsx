"use client";

import Image from "next/image";

import HeroImg from "../../public/bazar-hero.png";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  const handleScroll = () => {
    document.getElementById("all-products")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    // Wrapper: 3D perspective
    <div className="group relative mt-3 px-3 sm:mt-4 sm:px-4 lg:mt-5 lg:px-0 [perspective:1500px]">
      {/* Hover zones */}
      <span className="tl absolute left-0 top-0 h-1/2 w-1/2" />
      <span className="tr absolute right-0 top-0 h-1/2 w-1/2" />
      <span className="bl absolute bottom-0 left-0 h-1/2 w-1/2" />
      <span className="br absolute bottom-0 right-0 h-1/2 w-1/2" />

      {/* Main card */}
      <div className="relative flex flex-col justify-between gap-5 rounded-xl border border-gray-200 bg-white p-4 transition-all duration-700 ease-in-out group-hover:shadow-lg sm:gap-6 sm:p-6 md:flex-row md:items-center md:gap-5 md:p-6 lg:gap-3 lg:p-7 group-has-[.tl:hover]:[transform:rotateX(0.6deg)_rotateY(-0.6deg)] group-has-[.tr:hover]:[transform:rotateX(0.6deg)_rotateY(0.6deg)] group-has-[.bl:hover]:[transform:rotateX(-0.6deg)_rotateY(-0.6deg)] group-has-[.br:hover]:[transform:rotateX(-0.6deg)_rotateY(0.6deg)]">
        <div className="min-w-0">
          <p className="inline rounded-xl bg-[#a0e5b9] p-1 px-3 text-xs font-medium text-green-700 sm:text-[14px]">
            {date}
          </p>

          <p className="w-auto pt-10 pb-6 text-sm font-normal text-gray-800 opacity-70 sm:pt-14 sm:pb-7 sm:text-[15px] md:pt-10 lg:pt-20 lg:text-[16px]">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#all-products"
            onClick={(e) => {
              e.preventDefault();
              handleScroll();
            }}
            className="relative z-20 inline-block rounded-lg bg-[#047F39] px-4 py-2 pb-1.5 text-sm font-semibold text-[#F3FBF4] sm:text-[16px]"
          >
            সব পণ্য দেখুন
          </a>
        </div>

        <div className="flex justify-center md:shrink-0">
          <Image
            src={HeroImg}
            alt="banner-img"
            width={400}
            height={400}
            className="h-auto w-full max-w-[260px] object-contain sm:max-w-[320px] md:w-64 lg:w-75"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
