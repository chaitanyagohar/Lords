import React from "react";

const logos = [
  "/brands/adarsh group.png", "/brands/aditya birla.png", "/brands/ajmera.png", 
  "/brands/arvind.png", "/brands/assetz.png", "/brands/bhartiya urban.png", 
  "/brands/brigade.png", "/brands/century.png", "/brands/embassy.png", 
  "/brands/godrej properties.png", "/brands/goyal & co.png", "/brands/lodha.png", 
  "/brands/LT.png", "/brands/mahindra.png", "/brands/nambiar.png", 
  "/brands/prestige group.png", "/brands/puravankara.png", "/brands/sattva.png", 
  "/brands/shapoorji.png", "/brands/sobha.png", "/brands/sumadhura.png", 
  "/brands/tata.png", "/brands/total environment.png", "/brands/tvs emerald.png",
];

export default function BrandMarquee() {
  return (
    <section className="bg-[#ffffff] py-14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-1">

        <h3 className="text-center text-[44px] leading-[61.6px] font-medium text-[#0F1A2A] hover:underline decoration-[4px] underline-offset-[4px] mb-14">
          Trusted by leading brands worldwide
        </h3>

        {/* Marquee Wrapper */}
        <div className="relative flex overflow-hidden mb-8 group">

          {/* First Track */}
          <div className="flex w-max animate-marquee items-center will-change-transform">
            {logos.map((logo, idx) => (
              <div key={idx} className="flex-shrink-0 px-10"> {/* px-10 equals your old gap-20 */}
                <img
                  src={logo}
                  alt="Brand"
                  className="h-28 w-auto object-contain opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>

          {/* Second Track (Exact Duplicate for seamless loop) */}
          <div className="flex w-max animate-marquee items-center will-change-transform" aria-hidden="true">
            {logos.map((logo, idx) => (
              <div key={`dup-${idx}`} className="flex-shrink-0">
                <img
                  src={logo}
                  alt="Brand"
                  className="h-28 w-auto object-contain opacity-100 transition duration-300"
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}