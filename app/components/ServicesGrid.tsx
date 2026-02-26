const services = [
  {
    title: "Smart Property Consultation",
    subtitle: "Your Vision, Our Expertise",
    desc: "Informed decisions start with guidance—our team analyzes markets, assesses risks, and builds strategies for confident, clear real estate moves.",
    img: "/features-1.jpg"
  },
  {
    title: "Residential Real Estate",
    subtitle: "Feel Right, Live Right",
    desc: "We help you evaluate residential properties through livability, connectivity, and trends—ensuring clear, informed decisions for long-term value.",
    img: "/features-2.webp"
  },
  {
    title: "Commercial Real Estate",
    subtitle: "Invest Smart, Lease Smarter!",
    desc: "Commercial real estate is about growth, access, and ROI. We guide clients with research-based insights for smart, viable decisions.",
    img: "/features-3.webp"
  },
  {
    title: "Property Management",
    subtitle: "Own More, Worry Less",
    desc: "We manage tenants, maintenance, and legal compliance—ensuring ownership, steady returns, and smooth property operations.",
    img: "/features-4.webp"
  }
];
export default function ServicesGrid() {
  return (
    <section className="relative -z-1 bg-[#FFFFFF] px-6 pb-28">
      
      {/* Center Floating Panel */}
      <div className="z-10 max-w-7xl relative mx-auto bg-[#f7f9fc] rounded-[40px] -mt-[120px]  pt-16 pb-28 px-10 shadow-xl">

        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6">
            All Under One Hood
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto leading-relaxed">
            Here's what we have seen most customers struggle with, and how Valuepersqft
            becomes your safety net in every step:
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, i) => (
            <div
              key={i}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e1e7f0] hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                />

                {/* Soft bottom fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 pt-5">
                <h3 className="font-semibold text-gray-900 text-lg mb-1">
                  {service.title}
                </h3>

                <p className="text-sm italic text-gray-600 mb-3">
                  {service.subtitle}
                </p>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="flex justify-center mt-16">
          <button className="bg-[#2f4aa0] text-white px-10 py-3 rounded-lg font-medium hover:bg-[#1f3a8a] transition-colors shadow-md">
            Consult us
          </button>
        </div>

      </div>
    </section>
  );
}