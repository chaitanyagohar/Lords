'use client';

import { useState, useEffect, useRef } from 'react';

const tabsData = [
  {
    id: 'virtual',
    label: 'Virtual Property Access',
    image: '/virtual-property-access.webp', // Replace with actual images from your project
    title: "I Can't Physically Check the Property!",
    bullets: [
      "HD Video Walkthroughs - Every corner inspected, from plumbing to parking",
      "Live Video Calls - Attend site visits virtually with our experts",
      "Neighborhood Reports - Schools, crime rates, future infrastructure mapped"
    ]
  },
  {
    id: 'protect',
    label: 'Protect Your Investment',
    image: '/protect-your-investment.webp',
    title: "Builders Delay Projects - My Money Gets Stuck",
    bullets: [
      "RERA Compliance Audits - Verify all approvals before you pay",
      "Escrow Payment Plans - Pay only as construction milestones hit",
      "Delay Penalty Recovery - We legally claim your compensation"
    ]
  },
  {
    id: 'stressfree',
    label: 'Stress-Free Property Handling',
    image: '/stress-free-property-handling.webp',
    title: "Managing Tenants & Maintenance from Abroad is Chaos",
    bullets: [
      "Dedicated NRI Property Managers - One point contact for all issues",
      "Auto-Rent Deposits - Direct to your NRE account, no middlemen"
    ]
  },
  {
    id: 'tax',
    label: 'Tax & Legal Compliance',
    image: '/tax-and-legal-compliance.webp',
    title: "Tax & Legal Rules Keep Changing",
    bullets: [
      "NRI Tax Advisory - TDS, capital gains, DTAA optimized",
      "Power of Attorney Assistance - Legally secure remote control",
      "Inheritance Planning - Smooth succession for heirs"
    ]
  },
  {
    id: 'strategic',
    label: 'Strategic Investment Planning',
    image: '/strategic-investment-planning.webp',
    title: "How Do I Even Choose the Right City/Project?",
    bullets: [
      "NRI Investment Heatmaps - Where prices will rise fastest (2024-30)",
      "Rental Yield Calculators - Compare Bangalore vs. Gurgaon vs. Pune",
      "Exit Strategy Planning - Buy properties that resell fast when needed"
    ]
  }
];

export default function NRIScrollSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef(null);

  // 1. Calculate scroll progress and automatically swap content
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
    const activeNavElement = document.getElementById(`nri-nav-${tabsData[activeIndex].id}`);
    if (activeNavElement) {
      activeNavElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeIndex]);

  // 3. Handle manual clicks by jumping the user to that specific part of the scroll track
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
    // THE TRACK: 400vh gives us plenty of scrolling room to transition through the 5 tabs
    <div ref={trackRef} className="relative h-[400vh] bg-[#072D4A]">
    <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden bg-[#072D4A]">
        <section className="px-4 w-full max-w-[1200px] mx-auto">
          
          {/* === UNIFIED CARD LAYOUT (Matches Screenshot exactly) === */}
          <div className="flex flex-col md:flex-row bg-white rounded-[16px] md:rounded-[20px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white/10">
            
            {/* === MOBILE STICKY PILLS (Hidden on Desktop) === */}
            <div className="md:hidden flex overflow-x-auto gap-3 p-4 bg-[#f8fafe] border-b border-gray-200 scrollbar-hide">
              {tabsData.map((tab, index) => (
                <button
                  key={`mobile-${tab.id}`}
                  id={`nri-nav-${tab.id}`}
                  onClick={() => handleTabClick(index)}
                  className={`
                    whitespace-nowrap px-5 py-2.5 rounded-full text-[14px] font-medium transition-colors border
                    ${activeIndex === index 
                      ? 'bg-[#21409A] text-white border-[#21409A]' 
                      : 'bg-white text-[#1b2b40] border-gray-200'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* === LEFT CONTENT BLOCK === */}
            <div 
              key={content.id} 
              style={{ animation: 'fadeIn 0.4s ease-in-out forwards' }}
              className="w-full md:w-[65%] p-6 md:p-8 lg:p-10 flex flex-col min-h-[450px]"
            >
              <img 
                src={content.image} 
                alt={content.label} 
                className="w-full h-[200px] md:h-[280px] object-cover rounded-[12px] mb-6 shadow-sm"
              />
              
              <h3 className="text-[20px] md:text-[24px] font-bold text-[#21409A] mb-5 leading-tight">
                {content.title}
              </h3>
              
              <ul className="space-y-4 list-disc pl-5 marker:text-[#21409A] text-[14px] md:text-[15px] text-[#374151]">
                {content.bullets.map((bullet, idx) => {
                  // Splitting the bullet to make the text before the hyphen BOLD
                  const [boldPart, ...restParts] = bullet.split(' - ');
                  const rest = restParts.join(' - ');
                  
                  return (
                    <li key={idx} className="leading-relaxed pl-1">
                      <span className="font-semibold text-[#0F1A2A]">{boldPart}</span>
                      {rest ? ` - ${rest}` : ''}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* === RIGHT DESKTOP SIDEBAR MENU === */}
            <div className="hidden md:flex flex-col w-[35%] bg-[#f4f7fb] flex-shrink-0 border-l border-gray-200">
              {tabsData.map((tab, index) => (
                <button
                  key={`desktop-${tab.id}`}
                  onClick={() => handleTabClick(index)}
                  className={`
                    text-center md:text-left px-8 py-[30px] lg:py-[34px] text-[16px] font-medium transition-all duration-300 border-b border-gray-200/60 last:border-b-0
                    ${activeIndex === index 
                      ? 'bg-[#21409A] text-white font-semibold shadow-lg scale-[1.02] z-10 rounded-l-[4px]' 
                      : 'text-[#1b2b40] hover:bg-[#eaf0f8]'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

          </div>
        </section>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}} />

    </div>
  );
}