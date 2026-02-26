export default function NRIServices() {
  const services = [
    {
      number: "01",
      title: "NRI Home Buying Concierge",
      desc: "Shortlist → Negotiation → Registration → Done for you",
    },
    {
      number: "02",
      title: "Turnkey Property Management",
      desc: "From finding tenants to handling society meetings",
    },
    {
      number: "03",
      title: "NRI Portfolio Reviews",
      desc: "Audit existing India assets & recommend upgrades",
    },
    {
      number: "04",
      title: "Inheritance Documentation",
      desc: "Will registration, joint ownership structuring",
    },
  ];

  return (
    <section className="bg-[#f5f7fb] py-20">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-14 ">
          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-medium text-[#0F1A2A] mb-4 leading-tight">
            Our NRI-Specific Services
          </h2>
<p className="text-[#0F1A2A] font-normal tracking-[0px] text-[16px] leading-[22.4px] md:text-[20px] md:leading-[28px] mx-auto">
            Simplify real estate with expert guidance and clear property insights. Get per sq. ft.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#153A5B] text-white rounded-[18px] p-8 shadow-[0_10px_25px_rgba(0,0,0,0.08)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.12)] transition-all duration-300"
            >
              <div className="text-[26px] font-semibold mb-6 opacity-90">
                {service.number}
              </div>

              <h3 className="text-[20px] font-semibold leading-[28px] mb-4">
                {service.title}
              </h3>

              <p className="text-[14px] text-white/80 leading-[22px]">
                {service.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Slider */}
        <div className="md:hidden">

          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4">

            {services.map((service, index) => (
              <div
                key={index}
                className="min-w-[85%] snap-start bg-[#153A5B] text-white rounded-[18px] p-7 shadow-lg"
              >
                <div className="text-[24px] font-semibold mb-5 opacity-90">
                  {service.number}
                </div>

                <h3 className="text-[18px] font-semibold leading-[26px] mb-3">
                  {service.title}
                </h3>

                <p className="text-[14px] text-white/80 leading-[22px]">
                  {service.desc}
                </p>
              </div>
            ))}

          </div>

          {/* Pagination Dots (static visual like screenshot) */}
          <div className="flex justify-center gap-2 mt-4">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
            <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
          </div>

        </div>

      </div>
    </section>
  );
}