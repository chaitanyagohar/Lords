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
    /* The section background is light gray/white, 
       but the panel itself needs to be pulled UP.
    */
    <section className="relative bg-[#f8fafc] pb-20">
      
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* THE FLOATING PANEL 
            -mt-24 pulls it up over the previous section.
            z-30 ensures it stays above the hero background.
            rounded-[48px] matches the very round corners in your SS.
        */}
        <div className="relative z-30 bg-white rounded-[48px] shadow-[0_20px_60px_rgba(0,0,0,0.06)] -mt-24 md:-mt-32 pt-16 pb-16 px-6 md:px-16 border border-gray-50">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-[#0F172A] mb-5 tracking-tight">
              All Under One Hood
            </h2>
            <p className="text-[#64748B] text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Here's what we have seen most customers struggle with, and how Valuepersqft
              becomes your safety net in every step:
            </p>
          </div>

          {/* Cards Container */}
          <div className="flex overflow-x-auto pb-10 gap-6 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-visible no-scrollbar">
            {services.map((service, i) => (
              <div
                key={i}
                className="min-w-[85vw] md:min-w-0 bg-white rounded-[32px] overflow-hidden border border-[#f1f5f9] shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                {/* Image Section */}
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* The specific soft white gradient from your image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
                </div>

                {/* Content */}
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

          {/* Pagination Dots (Mobile only) */}
          <div className="flex justify-center gap-2 mt-2 md:hidden">
            <div className="w-2.5 h-2.5 rounded-full bg-[#21409A]"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-gray-200"></div>
          </div>

          {/* Bottom CTA */}
          <div className="flex justify-center mt-12">
            <button className="bg-[#21409A] text-white px-12 py-3.5 rounded-xl font-bold text-lg hover:bg-[#1a337e] transition-all shadow-lg shadow-blue-900/10">
              Consult us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}