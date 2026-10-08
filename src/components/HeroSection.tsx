import Image from "next/image";
import HeroImg from "../../public/bazar-hero.png";

const HeroSection = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    // Wrapper: provides 3D perspective and holds the margin
    <div className="group relative mt-5 [perspective:1500px]">
      {/* Invisible hover zones for the four corners */}
      <span className="tl absolute left-0 top-0 z-10 h-1/2 w-1/2" />
      <span className="tr absolute right-0 top-0 z-10 h-1/2 w-1/2" />
      <span className="bl absolute bottom-0 left-0 z-10 h-1/2 w-1/2" />
      <span className="br absolute bottom-0 right-0 z-10 h-1/2 w-1/2" />

      {/* Card: tilts very gently toward whichever corner is hovered */}
      <div className="flex flex-col md:flex-row justify-between p-7 gap-3 bg-white border border-gray-200 rounded-xl transition-all duration-700 ease-in-out group-hover:shadow-lg group-has-[.tl:hover]:[transform:rotateX(0.6deg)_rotateY(-0.6deg)] group-has-[.tr:hover]:[transform:rotateX(0.6deg)_rotateY(0.6deg)] group-has-[.bl:hover]:[transform:rotateX(-0.6deg)_rotateY(-0.6deg)] group-has-[.br:hover]:[transform:rotateX(-0.6deg)_rotateY(0.6deg)]">
        <div className="">
          <p className="font-medium text-[14px] text-green-700  bg-[#a0e5b9] p-1 inline rounded-xl px-3">
            {" "}
            {date}
          </p>

          <p className="font-normal text-[16px] text-gray-800 opacity-70 w-auto md:w-145 pt-20 pb-7">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* z-20 keeps the button clickable above the invisible corner zones */}
          <button className="relative z-20">
            <a
              href="#"
              className="font-semibold text-[16px] text-[#F3FBF4] px-4 py-2 pb-1.5 bg-[#047F39] rounded-lg"
            >
              সব পণ্য দেখুন
            </a>
          </button>
        </div>

        <div>
          <Image
            src={HeroImg}
            alt="banner-img"
            width={400}
            height={400}
            className="w-75 h-auto"
          ></Image>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;