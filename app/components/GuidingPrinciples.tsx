'use client';
import { useState, useEffect, useRef } from 'react';

const tabsData = [
  {
    id: 'trust',
    label: 'Trustworthy Real Estate',
    img: '/trustworthy-real-estate.webp',
    title: '"Can I Trust My Builder or Agent?" – The Transparency Crisis',
    challenge:
      'Many buyers feel misled by false promises, hidden charges, and project delays.',
    approach: [
      "We carefully vet builders to ensure you're working with someone trustworthy.",
      'We check past projects to confirm timely delivery and quality work.',
      'We offer unbiased property ratings to help you make confident, informed decisions.',
    ],
  },
  {
    id: 'location',
    label: 'Strategic Location Choices',
    img: '/strategic-location.webp',
    title: '"Which Location is Truly the Best?" – The Dilemma of Choice',
    challenge:
      'Choosing the right neighborhood is tough without clarity on growth or comfort.',
    approach: [
      'We assess infrastructure to show where future growth and access are headed.',
      'We monitor price trends to spotlight areas with real appreciation potential.',
      'We evaluate livability to ensure your home fits your lifestyle and needs.',
    ],
  },
  {
    id: 'pricing',
    label: 'Accurate Market Pricing',
    img: '/accurate-market-pricing.webp',
    title: '"Am I Overpaying?" – The Market Confusion',
    challenge:
      "Without real transaction data, it's easy to second-guess the price you're paying.",
    approach: [
      'We study actual sale deeds to reveal the true market picture.',
      'We review payment plans to highlight any hidden costs upfront.',
      "We analyze pricing history so you know you're paying the right price—not more.",
    ],
  },
  {
    id: 'exit',
    label: 'Investment Exit Planning',
    img: '/investment-exit-planning.webp',
    title: '"Will This Property Even Rent/Resell Later?" – The Exit Fear',
    challenge:
      'A property that looks good today might be tough to rent or resell tomorrow.',
    approach: [
      'We research rental demand to ensure steady income.',
      'We study buyer preferences so your investment stays in demand.',
      'We track upcoming supply to protect resale value.',
    ],
  },
  {
    id: 'procedures',
    label: 'Efficient Property Procedures',
    img: '/efficient-property-procedures.webp',
    title: '"Why Is Buying So Complicated?" - The Paperwork Struggle',
    challenge:
      'Legal paperwork is often confusing and full of last-minute surprises.',
    approach: [
      'We verify titles thoroughly for legal peace of mind.',
      'We break down contract terms in simple language.',
      'We handle all documentation for a stress-free process.',
    ],
  },
];

export default function GuidingPrinciples() {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Scroll-based content switch
  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;

      const rect = trackRef.current.getBoundingClientRect();
      const scrollableDistance = rect.height - window.innerHeight;
      const scrollProgress = -rect.top;

      if (scrollProgress <= 0) {
        setActiveIndex(0);
        return;
      }

      if (scrollProgress >= scrollableDistance) {
        setActiveIndex(tabsData.length - 1);
        return;
      }

      const percentage = scrollProgress / scrollableDistance;
      const index = Math.floor(percentage * tabsData.length);

      setActiveIndex(Math.min(index, tabsData.length - 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Center active mobile pill
// 1. Add this ref right below your activeIndex state
  const isFirstRender = useRef(true);

  // 2. Replace your centering useEffect with this:
  useEffect(() => {
    // Skip the aggressive scroll on initial page load
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }

    const el = document.getElementById(`nav-${tabsData[activeIndex].id}`); // Adjust ID name based on the file
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  const handleTabClick = (index: number) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const scrollableDistance = rect.height - window.innerHeight;

    const target =
      absoluteTop +
      index * (scrollableDistance / tabsData.length);

    window.scrollTo({
      top: target,
      behavior: 'smooth',
    });
  };

  const content = tabsData[activeIndex];

  return (
    <div ref={trackRef} className="relative h-[400vh]">
      <div className="sticky top-0 h-screen flex items-center bg-[#fafbfc]">
        <div className="max-w-6xl mx-auto w-full px-4 md:px-6">

          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-[32px] md:text-[42px] font-semibold text-[#0F1A2A] mb-3 leading-tight">
              Guiding with Truth, Data, and Direction
            </h2>
            <p className="text-[#5b6472] text-[15px] md:text-[18px] max-w-2xl mx-auto">
              From choosing the right location to trusting the right people —
              we help you make smarter, stress-free home decisions
            </p>
          </div>

          {/* Card Container */}
          <div className="flex flex-col md:flex-row bg-white rounded-[20px] shadow-[0_10px_40px_rgba(0,0,0,0.06)] mb-10 border border-[#eef2f6] overflow-hidden">

            {/* === MOBILE STICKY PILLS === */}
            <div className="md:hidden flex overflow-x-auto gap-3 p-4 bg-white border-b border-[#eef2f6] scrollbar-hide">
              {tabsData.map((tab, index) => (
                <button
                  key={`mobile-${tab.id}`}
                  id={`nav-${tab.id}`}
                  onClick={() => handleTabClick(index)}
                  className={`
                    whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors border
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

            {/* === DESKTOP SIDEBAR === */}
            <div className="hidden md:flex flex-col w-[320px] bg-[#f8fafe] border-r border-[#eef2f6] flex-shrink-0">
              {tabsData.map((tab, index) => (
                <button
                  key={`desktop-${tab.id}`}
                  onClick={() => handleTabClick(index)}
                  // FIX: Replaced py-7 with flex-1 and flex items-center so they stretch to fill all available space identically
                  className={`
                    flex-1 flex items-center px-8 text-left text-[16px] font-medium border-b border-[#eef2f6] transition-all duration-300
                    ${activeIndex === index
                        ? 'bg-[#1e3b8a] text-white shadow-md'
                        : 'text-[#1b2b40] hover:bg-[#eaf0f8]'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* === CONTENT AREA === */}
            <div
              key={content.id}
              style={{ animation: 'fadeIn 0.4s ease-in-out forwards' }}
              className="flex-1 p-6 md:p-10 flex flex-col text-left bg-white min-h-[450px]"
            >
              <img
                src={content.img}
                alt={content.label}
                className="w-full h-[140px] md:h-[260px] object-cover rounded-[12px] mb-6 shadow-sm"
              />

              <h3 className="text-[18px] md:text-[22px] font-semibold text-[#1e3b8a] mb-4 leading-snug">
                {content.title}
              </h3>

              <p className="text-[#374151] text-[15px] mb-4 leading-relaxed">
                <span className="font-semibold text-[#0F1A2A]">
                  Challenge:
                </span>{' '}
                {content.challenge}
              </p>

              <div className="text-[15px] text-[#374151]">
                <h4 className="font-semibold text-[#0F1A2A] mb-3">
                  Our Approach:
                </h4>
                <ul className="space-y-3">
                  {content.approach.map((item, i) => (
                    <li key={i} className="flex gap-3 items-start leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-[8px] flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Global CSS for Animations and Hiding Scrollbars */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />

    </div>
  );
}