"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PropertyGallery({ 
  gallery, 
  fallbackImage, 
  title 
}: { 
  gallery: any[]; 
  fallbackImage: string;
  title: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Use gallery images if they exist, otherwise use the fallback/main image
  const images = gallery?.length > 0 
    ? gallery.map(g => g.image_url) 
    : [fallbackImage || "/default-property.jpg"];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative mb-10 w-full h-[300px] md:h-[450px] lg:h-[500px] rounded-[16px] md:rounded-[24px] overflow-hidden group">
      {/* Main Image */}
      <img
        key={currentIndex} // Forces re-render for smooth transition if needed
        src={images[currentIndex]}
        alt={`${title} - Image ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-opacity duration-500"
      />
      
      {/* Overlays */}
      <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
      
      {/* Navigation Arrows (Only show if there is more than 1 image) */}
      {images.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-all z-10"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {images.slice(0, 3).map((img, idx) => (
            <div 
              key={idx} 
              onClick={() => setCurrentIndex(idx)}
              className={`relative w-[100px] h-[70px] rounded-[10px] overflow-hidden shadow-lg cursor-pointer transition-all ${
                currentIndex === idx ? "border-2 border-white scale-105" : "border-2 border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img src={img} className="w-full h-full object-cover" alt="thumbnail" />
              {idx === 2 && images.length > 3 && (
                <div 
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents thumbnail click
                    setCurrentIndex(3); // Jump to 4th image
                  }}
                  className="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-[12px] font-medium backdrop-blur-[2px]"
                >
                  +{images.length - 3} More
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}