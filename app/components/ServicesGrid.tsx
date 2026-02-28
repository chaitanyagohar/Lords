"use client";

import React from "react";
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
  return (
    <section className="relative bg-white pb-20">
      
      {/* Overlapping Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* The White Floating Panel */}
        <div className="bg-white rounded-[40px] shadow-[0_10px_50px_rgba(0,0,0,0.08)] -mt-32 pt-16 pb-16 px-6 md:px-12 border border-gray-100">
          
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight">
              All Under One Hood
            </h2>
            <p className="text-[#64748B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
              Here&apos;s what we have seen most customers struggle with, and how Valuepersqft
              becomes your safety net in every step:
            </p>
          </div>

          {/* Cards Grid / Mobile Carousel */}
          {/* On mobile: overflow-x-auto allows the side-swipe seen in your 3rd screenshot */}
          <div className="flex overflow-x-auto pb-8 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible no-scrollbar">
            {services.map((service, i) => (
              <div
                key={i}
                className="min-w-[85vw] md:min-w-0 bg-white rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all duration-300"
              >
                {/* Image with exact fade effect */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-1/2 object-cover"
                  />
                  {/* The exact gradient fade from the SS */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-[#1E293B] mb-1">
                    {service.title}
                  </h3>
                  <p className="text-[15px] italic text-[#64748B] mb-4 font-medium">
                    {service.subtitle}
                  </p>
                  <p className="text-[#475569] text-[15px] leading-[1.6] font-normal">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination dots (visible on mobile to match screenshot) */}
          <div className="flex justify-center gap-2 mt-4 md:hidden">
            <span className="w-3 h-3 rounded-full bg-[#21409A]"></span>
            <span className="w-3 h-3 rounded-full bg-[#CBD5E1]"></span>
            <span className="w-3 h-3 rounded-full bg-[#CBD5E1]"></span>
            <span className="w-3 h-3 rounded-full bg-[#CBD5E1]"></span>
          </div>

          {/* Centered CTA Button */}
          <div className="flex justify-center mt-12">
            <button className="bg-[#21409A] text-white px-12 py-4 rounded-xl font-bold text-lg hover:bg-[#1a337e] transition-all shadow-lg hover:shadow-[#21409A]/20 flex items-center gap-2">
              Consult us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}