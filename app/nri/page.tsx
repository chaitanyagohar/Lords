'use client';
import FeaturedProjects from '../components/FeaturedProperties';
import NRIScrollSection from '../components/NRIScrollSection';
import Testimonials from '../components/Testimonials';
import TrustExpertiseSection from '../components/TrustExpertiseSection';

const services = [
  {
    number: '01',
    title: 'NRI Home Buying Concierge',
    desc: 'Shortlist → Negotiation → Registration → Done for you',
  },
  {
    number: '02',
    title: 'Turnkey Property Management',
    desc: 'From finding tenants to handling society meetings',
  },
  {
    number: '03',
    title: 'NRI Portfolio Reviews',
    desc: 'Audit existing India assets & recommend upgrades',
  },
  {
    number: '04',
    title: 'Inheritance Documentation',
    desc: 'Will registration, joint ownership structuring',
  },
];

export default function NRIPage() {
  return (
    <div className="bg-white">

      {/* ================= HERO ================= */}
      <section className="relative h-[520px] md:h-[650px] flex items-center overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/nri_bg.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-[#000000]/45" />

        {/* Bottom white fade */}
        <div className="absolute bottom-0 left-0 right-0 h-[45%] bg-gradient-to-t from-white via-white/80 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h1 className="text-[38px] md:text-[64px] font-semibold text-white leading-[1.1] tracking-tight max-w-3xl">
            Serving NRI’s across 50+ countries
          </h1>
        </div>
      </section>

      {/* ================= VIDEO + SERVICES ================= */}
      <section className="relative pb-24 md:pb-36">

        {/* VIDEO CARD */}
        <div className="max-w-[1100px] mx-auto px-6 -mt-40 md:-mt-56 relative z-20 mb-16 md:mb-24">
          <div className="rounded-[28px] overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.25)] bg-black">
            <video
              src="/NRI-Video.mp4"
              controls
              className="w-full h-[280px] sm:h-[380px] md:h-[520px] object-cover"
            />
          </div>
        </div>

     {/* ================= SERVICE CARDS ================= */}
<div className="max-w-[1350px] mx-auto px-6">

  {/* -------- Desktop Grid -------- */}
  <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-8">
    {services.map((item) => (
      <div
        key={item.number}
        className="bg-[#0F2F4A] text-white rounded-[22px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      >
        <div className="text-[36px] md:text-[44px] font-semibold mb-6 opacity-90">
          {item.number}
        </div>

        <h3 className="text-[20px] font-semibold leading-snug mb-6">
          {item.title}
        </h3>

        <p className="text-[#cbd5e1] text-[15px] leading-relaxed">
          {item.desc}
        </p>
      </div>
    ))}
  </div>

  {/* -------- Mobile Carousel -------- */}
  <div className="md:hidden relative">

    <div
      className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6"
      id="nri-carousel"
    >
      {services.map((item) => (
        <div
          key={item.number}
          className="snap-center shrink-0 w-[85%] bg-[#0F2F4A] text-white rounded-[20px] p-8 shadow-lg"
        >
          <div className="text-[30px] font-semibold mb-5 opacity-90">
            {item.number}
          </div>

          <h3 className="text-[18px] font-semibold leading-snug mb-5">
            {item.title}
          </h3>

          <p className="text-[#cbd5e1] text-[14px] leading-relaxed">
            {item.desc}
          </p>
        </div>
      ))}
    </div>

    {/* Pagination Dots */}
    <div className="flex justify-center gap-2 mt-2">
      {services.map((_, index) => (
        <button
          key={index}
          onClick={() => {
            const container = document.getElementById('nri-carousel');
            if (!container) return;
            container.scrollTo({
              left: container.clientWidth * index,
              behavior: 'smooth',
            });
          }}
          className="w-2.5 h-2.5 rounded-full bg-gray-300"
        />
      ))}
    </div>

  </div>

</div>
      </section>

      {/* ================= SCROLL SECTION ================= */}
      <NRIScrollSection />
      <FeaturedProjects />
      <Testimonials />
      <TrustExpertiseSection />

      {/* Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `
      }} />

    </div>
  );
}