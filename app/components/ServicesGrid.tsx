"use client";

import React, { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";

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
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.clientWidth * 0.85 + 24; // card width + gap
    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth"
    });

    setActiveIndex(index);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const cardWidth = container.clientWidth * 0.85 + 24;
    const index = Math.round(container.scrollLeft / cardWidth);

    setActiveIndex(index);
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-[#f8fafc] pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">

        <div className="relative z-30 bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] -mt-24 md:-mt-32 pt-16 pb-16 px-6 md:px-16 border border-gray-50">

          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight">
              All Under One Hood
            </h2>
            <p className="text-[#64748B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Here's what we have seen most customers struggle with, and how Lords
              becomes your safety net in every step:
            </p>
          </div>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto pb-10 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible no-scrollbar scroll-smooth"
          >
            {services.map((service, i) => (
              <div
                key={i}
                className="min-w-[85vw] md:min-w-0 bg-white rounded-[32px] overflow-hidden border border-[#f1f5f9] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                </div>

                <div className="p-8">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-1">
                    {service.title}
                  </h3>

                  <p className="text-[15px] italic text-[#64748B] mb-4 font-medium">
                    {service.subtitle}
                  </p>

                  <p className="text-[#475569] text-[15px] leading-relaxed">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-2 md:hidden">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  activeIndex === index
                    ? "bg-[#2a2a2a]"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-12">
           <a href="/consult"> <button className="bg-[#2a2a2a] text-white px-12 py-3.5 rounded-xl font-bold text-lg hover:bg-[#595656] transition-all shadow-lg shadow-blue-900/10 flex items-center gap-2">
              Consult us
              <ArrowRight size={18} />
            </button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}