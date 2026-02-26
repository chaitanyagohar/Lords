'use client';
import { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const blogsData = [
  {
    id: 1,
    image: "/blog-1.jpg", // Replace with your actual image path
    month: "May",
    day: "13",
    title: "Prestige Somerville Review: A Look at Whitefield's Newest Residential Project",
    link: "/blog/prestige-somerville"
  },
  {
    id: 2,
    image: "/blog-2.jpg",
    month: "May",
    day: "13",
    title: "Prestige Somerville Review: A Look at Whitefield's Newest Residential Project",
    link: "/blog/prestige-somerville"
  },
  {
    id: 3,
    image: "/blog-3.jpg",
    month: "May",
    day: "13",
    title: "Prestige Somerville Review: A Look at Whitefield's Newest Residential Project",
    link: "/blog/prestige-somerville"
  },
  {
    id: 4,
    image: "/blog-4.jpg",
    month: "May",
    day: "14",
    title: "Top 10 Emerging Real Estate Hotspots in Bangalore for 2026",
    link: "/blog/hotspots"
  }
];

export default function BlogSection() {
  const scrollRef = useRef(null);

  // Smooth scroll logic for the arrows
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 320 : 400; 
      scrollRef.current.scrollBy({ 
        left: direction === 'left' ? -scrollAmount : scrollAmount, 
        behavior: 'smooth' 
      });
    }
  };

  return (
    // Dark background matching the screenshot
    <section className="py-16 md:py-24 bg-[#072D4A] w-full overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">
        
        {/* === HEADER SECTION === */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-10 md:mb-12">
          
          {/* Titles */}
          <div className="text-center md:text-left w-full md:w-auto">
            <h2 className="text-[32px] md:text-[44px] font-lg text-white leading-tight mb-3">
              From Our Blogs
            </h2>
            <p className="text-white text-[20px] md:text-[20px] font-regular tracking-wide">
              Simplify real estate with expert guidance 
              <span className="md:hidden"> <br /> </span> 
              <span className="hidden md:inline"> and </span> 
              clear
            </p>
          </div>
          
          {/* DESKTOP 'See More' Link (Hidden on Mobile) */}
          <a 
            href="/blogs" 
            className="hidden md:flex items-center gap-2 text-white font-medium text-[16px] hover:text-gray-300 transition-colors pb-1"
          >
            See More Blogs <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </div>

        {/* === CAROUSEL CONTAINER === */}
        <div 
          ref={scrollRef}
          className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogsData.map((blog) => (
            <div 
              key={blog.id} 
              className="group flex flex-col bg-white rounded-[16px] w-[85vw] sm:w-[320px] md:w-[380px] flex-shrink-0 snap-start overflow-hidden shadow-lg cursor-pointer"
            >
              {/* Image & Date Badge Container */}
              <div className="relative w-full h-[200px] md:h-[240px] bg-gray-200">
                <img 
                  src={blog.image} 
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Date Badge */}
                <div className="absolute -bottom-6 right-6 bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center w-[60px] h-[68px] z-10">
                  <span className="text-[#0F1A2A] text-[13px] font-medium leading-none mb-1">
                    {blog.month}
                  </span>
                  <span className="text-[#0F1A2A] text-[22px] font-bold leading-none">
                    {blog.day}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <h3 className="text-[17px] md:text-[19px] font-semibold text-[#0F1A2A] leading-[1.4] mb-4 group-hover:text-[#2b4c9b] transition-colors line-clamp-3">
                  {blog.title}
                </h3>
                
                {/* Push link to the bottom if title is short */}
                <div className="mt-auto">
                  <a 
                    href={blog.link}
                    className="inline-flex items-center gap-2 text-[#2b4c9b] font-medium text-[15px] hover:gap-3 transition-all"
                  >
                    Read More <ArrowRight size={18} strokeWidth={2} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === NAVIGATION ARROWS === */}
        <div className="flex justify-center items-center gap-4 mt-8 md:mt-12">
          {/* Left Arrow (Translucent/Dimmed style) */}
          <button 
            onClick={() => scroll('left')}
            className="w-12 h-12 rounded-full bg-white/30 text-white flex items-center justify-center hover:bg-white/40 transition-colors duration-300 focus:outline-none"
            aria-label="Previous blogs"
          >
            <ArrowLeft size={22} strokeWidth={2} />
          </button>
          
          {/* Right Arrow (Solid White style) */}
          <button 
            onClick={() => scroll('right')}
            className="w-12 h-12 rounded-full bg-white text-[#0a1c35] flex items-center justify-center hover:bg-gray-100 transition-colors duration-300 focus:outline-none shadow-md"
            aria-label="Next blogs"
          >
            <ArrowRight size={22} strokeWidth={2} />
          </button>
        </div>

        {/* === MOBILE 'See More' Link (Hidden on Desktop) === */}
        <div className="mt-10 md:hidden flex justify-center">
          <a 
            href="/blogs" 
            className="flex items-center gap-2 text-white font-semibold text-[16px] hover:text-gray-300 transition-colors"
          >
            See More Blogs <ArrowUpRight size={20} strokeWidth={2.5} />
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