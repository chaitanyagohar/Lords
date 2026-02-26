'use client';
import { ArrowRight } from 'lucide-react';

export default function TrustExpertiseSection() {
  return (
    <section className="relative w-full bg-[#F0F6FE] px-6 md:px-12 lg:px-20 z-10">
      
      <div className="max-w-[1300px] mx-auto flex flex-col md:flex-row items-center md:items-end justify-between">
        
        {/* === LEFT CONTENT === */}
        {/* Adjusted padding: pt-12 pb-0 for mobile so it's tighter, pt-24 pb-24 for desktop */}
        <div className="w-full md:w-[55%] lg:w-[60%] flex flex-col justify-center pt-12 pb-0 md:pt-24 md:pb-24 z-10">
          
          {/* Scaled text for mobile (text-[32px] leading-[1.2]) while keeping desktop massive */}
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[56px] font-semibold text-[#0F1A2A] leading-[1.2] md:leading-[1.15] mb-6 md:mb-8 tracking-tight">
            Your Trust, Our Expertise - <br className="hidden md:block" />
            That's the Valuepersqft <br className="hidden md:block" />
            Difference.
          </h2>
          
          {/* Adjusted button padding and sizing for mobile */}
          <button className="flex items-center justify-center md:justify-start gap-2 bg-[#1A3580] text-white px-6 py-3 md:px-8 md:py-3.5 rounded-[8px] font-medium text-[16px] hover:bg-[#1e3b8a] transition-colors duration-300 shadow-sm w-fit">
            Consult us <ArrowRight size={20} strokeWidth={2} />
          </button>
        </div>

        {/* === RIGHT IMAGE (Overlapping on Desktop, Stacked on Mobile) === */}
        {/* Added mt-10 for mobile to push the image down below the button, removed negative margin on mobile */}
        <div className="w-full md:w-[45%] lg:w-[40%] flex justify-center md:justify-end relative z-20 pointer-events-none mt-10 md:mt-0">
          <img 
            src="/untitled-1.png" // Replace with your actual building transparent PNG
            alt="Valuepersqft Building" 
            className="w-[95%] sm:w-[80%] md:w-[130%] lg:w-[120%] max-w-none h-full object-contain md:-mt-[150px] lg:-mt-[220px] pointer-events-auto align-bottom"
          />
        </div>

      </div>
    </section>
  );
}