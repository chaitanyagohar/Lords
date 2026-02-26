import { Search } from "lucide-react";

const cities = [
  { name: "Bengaluru", count: 219, img: "/bengaluru.png" },
  { name: "Chennai", count: 144, img: "/chennai.png" },
  { name: "Hyderabad", count: 126, img: "/hyderabad.png" },
  { name: "Pune", count: 1, img: "/12345.png" }
];

export default function HeroSection() {
  return (
 <section className="overflow-visible relative min-h-[90vh] flex z-0">

  {/* Background */}
  <div
    className="absolute inset-0"
    style={{
      backgroundImage: "url('/image-1.png')",
      // backgroundPosition: "right center",
      backgroundSize: "cover"
    }}
  />

  {/* Bottom White Fade */}
  <div className="
  absolute inset-0 pointer-events-none
  bg-gradient-to-t
  from-white/65 via-white/5 to-transparent
  sm:from-white/90 sm:via-white/40
  md:from-white/70 md:via-white/30
  lg:from-white/60 lg:via-transparent/10
" />

  <div className="relative z-10 max-w-5xl w-full px-4 lg:px-20 pt-44 lg:pt-45 pb-24 lg:pb-32">

    {/* Heading */}
    <h1 className="text-[28px] sm:text-[30px] md:text-[54px] font-bold text-white leading-[1.6] md:leading-[1.5] mb-4">
      Property Advice <br />
      That Puts You First
    </h1>

    {/* Subtext */}
    <p className="text-white text-[16px] sm:text-[18px] md:text-[24px] mb-8">
      No pressure. No bias. Just honest insights you can trust.
    </p>

    {/* Search Bar */}
    <div className="flex flex-col sm:flex-row bg-white/40 backdrop-blur-xl rounded-2xl p-2 max-w-[830px] shadow-2xl mb-16 lg:mb-24">

      {/* Input */}
      <div className="flex items-center flex-1 px-3 py-2">
        <Search className="text-white/70 mr-2" size={20} />
        <input
          type="text"
          placeholder="Search Areas, Cities"
          className="flex-1 bg-transparent outline-none text-white placeholder-white/80 text-sm sm:text-base"
        />
      </div>

      {/* Button */}
      <button className="bg-white text-[#2556d0] text-sm font-semibold px-6 py-3 rounded-xl mt-2 sm:mt-0 sm:ml-2 hover:bg-gray-100 transition w-full sm:w-auto">
        Search
      </button>
    </div>

    {/* Present In */}
    <div className="pt-7">
      <h3 className="text-white text-2xl sm:text-2xl font-medium mb-5">
        Present in
      </h3>

      {/* Horizontal Scroll on Mobile */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

        {cities.map((city, i) => (
          <div
            key={i}
           className="bg-white rounded-xl p-2 flex gap-3 min-w-[200px] h-[100px] shadow-lg cursor-pointer">
            <img
              src={city.img}
              alt={city.name}
              className="w-16 h-18 rounded-lg object-cover"
            />
            <div>
  <div className="font-semibold text-gray-900 text-[18px] leading-[30px]">
                {city.name}
              </div>
              <div className="text-md px-[3px] font-sm text-gray-700">
                {city.count} properties
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>

  </div>
</section>
  );
}