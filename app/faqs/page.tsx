'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import TrustExpertiseSection from '../components/TrustExpertiseSection';

const categories = [
  "Home Loan",
  "Property",
  "Documentation",
  "Finance",
  "For NRIs"
];

const faqData: Record<string, { question: string; answer: string }[]> = {
  "Home Loan": [
    {
      question: "Why is it considered necessary to register Agreement for Sale ?",
      answer: "The price starts from ₹800 per sq ft and can go up to ₹1800 per sq ft. The final price depends on factors such as the specific area and your individual requirements."
    },
    { 
      question: "What is Carpet Area", 
      answer: "Carpet area is the actual usable floor area within the walls of an apartment, excluding the thickness of the inner walls." 
    },
    { 
      question: "How Can I qualify for exemptions on the Capital Gains Tax?", 
      answer: "You can claim exemption under Section 54 and 54F by reinvesting the capital gains into a new residential property, subject to specific timeline conditions." 
    },
    { 
      question: "What is Carpet Area", 
      answer: "Carpet area is the actual usable floor area within the walls of an apartment, excluding the thickness of the inner walls." 
    },
    { 
      question: "How Can I qualify for exemptions on the Capital Gains Tax?", 
      answer: "You can claim exemption under Section 54 and 54F by reinvesting the capital gains into a new residential property, subject to specific timeline conditions." 
    },
    { 
      question: "What is Carpet Area", 
      answer: "Carpet area is the actual usable floor area within the walls of an apartment, excluding the thickness of the inner walls." 
    }
  ],
  "Property": [
    { question: "What documents are required while buying property?", answer: "Sale deed, encumbrance certificate, occupancy certificate, etc." }
  ],
  "Documentation": [
    { question: "Is stamp duty mandatory?", answer: "Yes, stamp duty is mandatory for property registration." }
  ],
  "Finance": [
    { question: "What is home loan eligibility?", answer: "Eligibility depends on income, credit score and liabilities." }
  ],
  "For NRIs": [
    { question: "Can NRIs buy property in India?", answer: "Yes, NRIs can purchase residential and commercial property in India." }
  ]
};

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("Home Loan");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white min-h-screen">

      {/* ================= HERO ================= */}
      <section className="relative h-[280px] md:h-[300px] flex items-end overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/faq_bg.jpg')", 
            backgroundSize: "cover",
            backgroundPosition: "center 40%"
          }}
        />

        {/* Dark Overlay for contrast */}
        <div className="absolute inset-0 bg-black/50" />

       
        {/* Hero Title */}
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 pb-2 md:pb-4">
          <h1 className="text-[26px] md:text-[50px] font-bold text-white tracking-tight drop-shadow-sm">
            FAQ's
          </h1>
        </div>
      </section>

      {/* ================= CONTENT ================= */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-6 py-8 md:py-20 flex flex-col md:flex-row gap-8 md:gap-16 lg:gap-20">

        {/* === CATEGORIES NAV === */}
        {/* On mobile: horizontally scrollable flex row. On desktop: vertical flex col */}
        <div className="w-full md:w-[260px] lg:w-[280px] flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-3 md:gap-5 flex-shrink-0 scrollbar-hide pb-2 md:pb-0">

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setOpenIndex(0); 
              }}
              className={`
                whitespace-nowrap py-3 px-5 md:py-4 md:px-6 rounded-[8px] md:rounded-[12px] text-center text-[15px] md:text-[16px] font-medium transition-all duration-300 border
                ${activeCategory === cat
                  ? "bg-[#2b4c9b] text-white border-[#2b4c9b] shadow-md"
                  : "bg-white text-[#374151] border-gray-200 hover:border-gray-300 hover:bg-gray-50"}
              `}
            >
              {cat}
            </button>
          ))}

        </div>

        {/* === RIGHT ACCORDION === */}
        <div className="flex-1 flex flex-col">

          {faqData[activeCategory].map((item, index) => (
            <div key={index} className="border-b border-gray-200/80">

              <button
                onClick={() => toggle(index)}
                className="flex justify-between items-center w-full text-left py-5 md:py-6 group"
              >
                <h3 className={`text-[16px] md:text-[22px] font-medium transition-colors pr-4 md:pr-6 leading-snug ${
                  openIndex === index ? "text-[#0F1A2A]" : "text-[#0F1A2A] group-hover:text-[#2b4c9b]"
                }`}>
                  {item.question}
                </h3>

                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180 text-[#2b4c9b]" : ""
                  }`}
                />
              </button>

              {/* Smooth Grid-based Height Animation */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr] opacity-100 pb-5 md:pb-6" : "grid-rows-[0fr] opacity-0 pb-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-[#5b6472] text-[14px] md:text-[16px] leading-relaxed max-w-4xl pr-4 md:pr-10">
                    {item.answer}
                  </p>
                </div>
              </div>

            </div>
          ))}

        </div>

      </section>
      <TrustExpertiseSection />

      {/* Global Style to hide horizontal scrollbar on mobile menus */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />

    </div>
  );
}