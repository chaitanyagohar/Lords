export default function KeyFigures() {
  const stats = [
    { value: "30+", label: "Developers" },
    { value: "70+", label: "Projects" },
    { value: "10000+", label: "Real Estate Consultations" },
    { value: "4000+", label: "Inventory Sold" },
  ];

  return (
    <section className="bg-[#f5f7fb] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Desktop Heading (44px, 61.6px LH, #0F1A2A, Medium) */}
        <h2 className="hidden md:block text-center font-medium text-[#0F1A2A] text-[44px] leading-[61.6px] tracking-[0px] mb-16">
          7+ Years of Trust & Guidance
        </h2>

        {/* Mobile Heading (24px, 33.6px LH, #0F1A2A, Medium) */}
        <h2 className="md:hidden text-center font-medium text-[#0F1A2A] text-[24px] leading-[33.6px] tracking-[0px] mb-10">
          Key Figures
        </h2>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">

          {stats.map((stat, index) => (
            <div
              key={index}
              className="
                bg-white
                rounded-[20px]
                py-10 md:py-14
                px-6
                text-center
                shadow-[0_8px_25px_rgba(0,0,0,0.04)]
              "
            >
              {/* Stat Value (Mobile: 24px/30px | Desktop: scaled to 44px, #1E2A3B, Semi-bold) */}
              <div className="font-semibold text-[#1E2A3B] text-[24px] leading-[30px] md:text-[44px] md:leading-[1.2] tracking-[0px] mb-1 md:mb-3">
                {stat.value}
              </div>

              {/* Stat Label (Mobile: 14px/17.5px | Desktop: 20px/28px, #26354B, Medium) */}
              <div className="font-medium text-[#26354B] text-[14px] leading-[17.5px] md:text-[20px] md:leading-[28px] tracking-[0px]">
                {stat.label}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}