'use client';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const videosData = [
  {
    id: 1,
    title: "Confused About Home Buying? See How Valuepersqft Brings Clarity",
    thumbnail: "/knowledge-1.jpg", // Replace with your actual image
    url: "https://www.youtube.com/watch?v=..." 
  },
  {
    id: 2,
    title: "₹70L Investment Turned ₹7CR in Bangalore Real Estate",
    thumbnail: "/knowledge-2.jpg",
    url: "https://www.youtube.com/watch?v=..."
  },
  {
    id: 3,
    title: "Step Into Luxury: Brigade Insignia Apartment Tour!",
    thumbnail: "/knowledge-3.jpg",
    url: "https://www.youtube.com/watch?v=..."
  },
  {
    id: 4,
    title: "Sarjapura & Varthur Real Estate Boom: How KIADB Is Shaping The Future!",
    thumbnail: "/knowledge-4.jpg",
    url: "https://www.youtube.com/watch?v=..."
  },
  {
    id: 5,
    title: "Is Nambiar District 25 Worth It? What Every Bangalore Homebuyer Should Know!",
    thumbnail: "/knowledge-5.jpg",
    url: "https://www.youtube.com/watch?v=..."
  }
];

export default function KnowledgePill() {
  const scrollRef = useRef(null);

  // Smooth scroll logic for the arrows
  const scroll = (direction) => {
    if (scrollRef.current) {
      // Calculate scroll amount based on screen size (roughly one card width + gap)
      const scrollAmount = window.innerWidth < 768 ? 290 : 340; 
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    <section className="py-12 md:py-20 bg-white w-full overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        
        {/* === HEADER SECTION === */}
        <div className="flex justify-between items-center mb-6 md:mb-10">
          <h2 className="text-[28px] md:text-[40px] font-semibold text-[#0F1A2A] leading-tight">
            Knowledge Pill
          </h2>
          
          {/* DESKTOP Insta Button (Hidden on Mobile) */}
          <a 
            href="https://instagram.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2.5 px-6 py-2.5 bg-white border border-[#2b4c9b] rounded-md shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-300"
          >
            <img src="/group-1.png" alt="Instagram" className="w-6 h-6 object-contain" />
            <span className="text-[15px] font-medium text-[#2b4c9b]">
              Checkout Instagram Content
            </span>
          </a>
        </div>

        {/* === CAROUSEL CONTAINER === */}
        <div 
          ref={scrollRef}
          className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 md:pb-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {videosData.map((video) => (
            <a 
              key={video.id} 
              href={video.url} 
              target="_blank" 
              rel="noopener noreferrer"
              // Mobile: w-[80vw] allows the next card to peek out. Desktop: fixed w-[320px]
              className="group flex flex-col w-[80vw] sm:w-[280px] md:w-[320px] flex-shrink-0 snap-start cursor-pointer"
            >
              {/* Thumbnail & YouTube Button */}
              <div className="relative w-full aspect-[16/9] overflow-hidden mb-4 bg-gray-100 border border-gray-200/50 shadow-sm">
                <img 
                  src={video.thumbnail} 
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* CSS-built YouTube Play Button */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="w-[50px] h-[35px] bg-[#FF0000] rounded-[8px] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <div className="w-0 h-0 border-t-[7px] border-t-transparent border-l-[12px] border-l-white border-b-[7px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>

              {/* Video Title */}
              <h3 className="text-[16px] md:text-[18px] font-normal text-[#111827] leading-relaxed group-hover:text-[#2b4c9b] transition-colors pr-2 md:pr-4">
                {video.title}
              </h3>
            </a>
          ))}
        </div>

        {/* === NAVIGATION ARROWS === */}
        <div className="flex justify-center items-center gap-5 mt-6 md:mt-8">
          <button 
            onClick={() => scroll('left')}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#2b4c9b] text-[#2b4c9b] flex items-center justify-center hover:bg-[#2b4c9b] hover:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Previous videos"
          >
            <ArrowLeft size={20} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={() => scroll('right')}
            className="w-11 h-11 md:w-12 md:h-12 rounded-full border border-[#2b4c9b] text-[#2b4c9b] flex items-center justify-center hover:bg-[#2b4c9b] hover:text-white transition-colors duration-300 focus:outline-none"
            aria-label="Next videos"
          >
            <ArrowRight size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* === MOBILE Insta Button (Hidden on Desktop) === */}
        <div className="mt-8 md:hidden">
          <a 
            href="https://instagram.com/yourhandle" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex justify-center items-center gap-2.5 w-full py-3 bg-white border border-[#2b4c9b] rounded-md shadow-sm active:bg-gray-50 transition-colors"
          >
            <img src="/group-1.png" alt="Instagram" className="w-6 h-6 object-contain" />
            <span className="text-[15px] font-medium text-[#2b4c9b]">
              Checkout Instagram Content
            </span>
          </a>
        </div>

      </div>

      {/* Tailwind Utility Class to hide scrollbars completely */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}