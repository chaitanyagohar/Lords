'use client';
import { useState, useEffect, useRef } from 'react';

const tabsData = [
  {
    id: 'trust',
    label: 'Trustworthy Real Estate',
    img: '/trustworthy-real-estate.webp',
    title: '"Can I Trust My Builder or Agent?" – The Transparency Crisis',
    challenge: 'Many buyers feel misled by false promises, hidden charges, and project delays.',
    approach: [
      "We carefully vet builders to ensure you're working with someone trustworthy.",
      "We check past projects to confirm timely delivery and quality work.",
      "We offer unbiased property ratings to help you make confident, informed decisions."
    ]
  },
  {
    id: 'location',
    label: 'Strategic Location Choices',
    img: '/strategic-location.webp',
    title: '"Which Location is Truly the Best?" – The Dilemma of Choice',
    challenge: 'Choosing the right neighborhood is tough without clarity on growth or comfort.',
    approach: [
      "We assess infrastructure to show where future growth and access are headed.",
      "We monitor price trends to spotlight areas with real appreciation potential.",
      "We evaluate livability to ensure your home fits your lifestyle and needs."
    ]
  },
  {
    id: 'pricing',
    label: 'Accurate Market Pricing',
    img: '/accurate-market-pricing.webp',
    title: '"Am I Overpaying?" – The Market Confusion',
    challenge: "Without real transaction data, it's easy to second-guess the price you're paying.",
    approach: [
      "We study actual sale deeds to reveal the true market picture.",
      "We review payment plans to highlight any hidden costs upfront.",
      "We analyze pricing history so you know you're paying the right price—not more."
    ]
  },
  {
    id: 'exit',
    label: 'Investment Exit Planning',
    img: '/investment-exit-planning.webp',
    title: '"Will This Property Even Rent/Resell Later?" – The Exit Fear',
    challenge: 'A property that looks good today might be tough to rent or resell tomorrow.',
    approach: [
      "We research rental demand to ensure your property can generate steady income.",
      "We study buyer preferences so your investment stays in demand.",
      "We track upcoming supply to protect your resale value down the line."
    ]
  },
  {
    id: 'procedures',
    label: 'Efficient Property Procedures',
    img: '/efficient-property-procedures.webp',
    title: '"Why Is Buying So Complicated?" - The Paperwork Struggle',
    challenge: 'Legal paperwork is often confusing and full of last-minute surprises.',
    approach: [
      "We verify titles thoroughly to give you legal peace of mind.",
      "We break down contract terms in simple, clear language.",
      "We handle all documentation, so your journey is smooth, stress-free, and secure."
    ]
  },
];

export default function GuidingPrinciples() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  // 1. Calculate scroll progress and swap content
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      
      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      
      const scrollProgress = -rect.top; 
      
      if (scrollProgress < 0) {
        setActiveIndex(0);
      } else if (scrollProgress >= scrollableDistance) {
        setActiveIndex(tabsData.length - 1);
      } else {
        const currentPercentage = scrollProgress / scrollableDistance;
        const index = Math.floor(currentPercentage * tabsData.length);
        setActiveIndex(Math.min(index, tabsData.length - 1));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); 
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Keep the active mobile pill centered
  useEffect(() => {
    const activeNavElement = document.getElementById(`nav-${tabsData[activeIndex].id}`);
    if (activeNavElement) {
      activeNavElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  // 3. Handle manual clicks by jumping to that part of the scroll track
  const handleTabClick = (index) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const scrollableDistance = rect.height - window.innerHeight;
    
    const targetScroll = absoluteTop + (index * (scrollableDistance / tabsData.length)) + 10;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const content = tabsData[activeIndex];

  return (
    <div ref={trackRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#fafbfc] md:bg-white">
        <section className="px-4 w-full max-w-6xl mx-auto">
          
          {/* Header - Tighter margins for better laptop viewing */}
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-[38px] md:text-[40px] font-medium text-[#0F1A2A] leading-tight mb-3">
              Guiding with Truth, Data, and Direction
            </h2>
            <p className="text-[#5b6472] text-[15px] md:text-[16px] max-w-2xl mx-auto leading-relaxed">
              From choosing the right location to trusting the right people — we help you make smarter, stress-free home decisions
            </p>
          </div>

          {/* === UNIFIED CARD LAYOUT (Matches Screenshot) === */}
          <div className="flex flex-col md:flex-row bg-white rounded-[16px] md:rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-[#eef2f6] overflow-hidden">
            
            {/* === MOBILE STICKY PILLS (Kept for mobile usability) === */}
            <div className="md:hidden flex overflow-x-auto gap-3 p-4 bg-[#f8f9fc] border-b border-[#eef2f6] scrollbar-hide">
              {tabsData.map((tab, index) => (
                <button
                  key={`mobile-${tab.id}`}
                  id={`nav-${tab.id}`}
                  onClick={() => handleTabClick(index)}
                  className={`
                    whitespace-nowrap px-5 py-2 rounded-full text-[14px] font-medium transition-colors border
                    ${activeIndex === index 
                      ? 'bg-[#1e3b8a] text-white border-[#1e3b8a]' 
                      : 'bg-white text-[#1b2b40] border-gray-200'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* === DESKTOP SIDEBAR MENU === */}
            <div className="hidden md:flex flex-col w-[300px] lg:w-[320px] bg-[#f8fafe] flex-shrink-0 border-r border-[#eef2f6]">
              {tabsData.map((tab, index) => (
                <button
                  key={`desktop-${tab.id}`}
                  onClick={() => handleTabClick(index)}
                  className={`
                    text-center px-6 py-[26px] text-[15px] font-medium transition-colors border-b border-[#eef2f6] last:border-b-0
                    ${activeIndex === index 
                      ? 'bg-[#1e3b8a] text-white' 
                      : 'text-[#1b2b40] hover:bg-[#f1f4f9]'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* === ACTIVE CONTENT BLOCK === */}
            <div 
              key={content.id} 
              style={{ animation: 'fadeIn 0.4s ease-in-out forwards' }}
              className="w-full flex-1 grid place-items-center p-6 md:p-10 min-h-[420px]" // min-h prevents jitter during crossfades
            >
              <img 
                src={content.img} 
                alt={content.label} 
                className="w-2/3 h-[200px] md:h-[220px] object-cover rounded-[12px] mb-5"
              />
              
              <h3 className="text-[18px] md:text-[20px] font-semibold text-[#1e3b8a] mb-3">
                {content.title}
              </h3>
              
              <p className="text-[#374151] text-[14px] mb-4 leading-relaxed">
                <span className="font-medium text-[#111827]">Challenge: </span>
                {content.challenge}
              </p>
              
              <div className="text-[14px] text-[#374151]">
                <h4 className="font-medium text-[#111827] mb-2.5">
                  Our Approach:
                </h4>
                
                <ul className="space-y-2 list-none">
                  {content.approach.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      {/* Exact match to the small, tight bullet points */}
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-[6px] flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

    </div>
  );
}