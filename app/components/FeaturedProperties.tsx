"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Adjust path if needed
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MapPin, Bed, Ruler } from "lucide-react";

export default function FeaturedProjects() {
  const [activeCity, setActiveCity] = useState("Bengaluru");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cities = ["Hyderabad", "Mumbai", "Pune", "Dubai", "Bengaluru"];

  useEffect(() => {
    fetchProjects();
  }, [activeCity]);

  async function fetchProjects() {
    setLoading(true);

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .eq("city", activeCity)
      .order("created_at", { ascending: false });

    if (!error) {
      setProjects(data || []);
    }

    setLoading(false);
  }

  return (
    <section className="bg-[#fcfdfd] py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-[32px] md:text-[44px] leading-[1.2] font-semibold text-[#0F1A2A] mb-4">
            Our projects across india
          </h2>
          <p className="text-[#5b6472] text-[15px] md:text-[18px]">
            Simplify real estate with expert guidance and clear property insights. Get per sq. ft.
          </p>
        </div>

        {/* City Filter */}
        <div className="mb-10 md:mb-12">
          <div className="flex md:justify-center gap-3 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`whitespace-nowrap shrink-0 px-6 py-2.5 rounded-[8px] border text-[14px] md:text-[15px] font-medium transition-all duration-300
                  ${
                    activeCity === city
                      ? "bg-[#21409A] text-white border-[#21409A] shadow-md"
                      : "bg-white text-[#374151] border-gray-200 hover:border-[#21409A] hover:text-[#21409A]"
                  }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-[#5b6472] font-medium animate-pulse">
            Loading properties...
          </div>
        )}

        {/* Slider */}
        {!loading && (
          <div className="relative featured-projects-slider">
            <Swiper
              modules={[Navigation]}
              navigation
              spaceBetween={20}
              slidesPerView={1.1}
              breakpoints={{
                640: { slidesPerView: 2.2, spaceBetween: 24 },
                1024: { slidesPerView: 3.2, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="pb-8" // Padding for shadow visibility
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id} className="h-auto">
                  <div className="bg-white rounded-[16px] border border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full overflow-hidden">

                    {/* Image */}
                    <div className="relative overflow-hidden h-[200px] shrink-0">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                    {/* Content Body */}
                    <div className="p-5 md:p-6 flex flex-col flex-grow">
                      
                      {/* Title & Price */}
                      <h3 className="text-[17px] md:text-[18px] font-semibold text-[#0F1A2A] mb-1.5 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-[15px] text-[#374151] font-medium mb-5">
                        Starting from{" "}
                        <span className="text-[#21409A] font-bold text-[18px] md:text-[20px] ml-1">
                          {project.price}
                        </span>
                      </p>

                      {/* Location */}
                      <div className="flex items-start text-[#5b6472] text-[13px] md:text-[14px] mb-3">
                        <MapPin size={18} strokeWidth={1.5} className="mr-2.5 shrink-0 text-[#21409A] mt-0.5" />
                        <span className="line-clamp-1">{project.location}</span>
                      </div>

                      {/* Specs */}
                      <div className="flex items-center gap-5 text-[13px] md:text-[14px] text-[#5b6472] mb-5">
                        <div className="flex items-center gap-2.5">
                          <Bed size={18} strokeWidth={1.5} className="text-[#21409A]" />
                          <span>{project.bhk}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Ruler size={18} strokeWidth={1.5} className="text-[#21409A]" />
                          <span>{project.size}</span>
                        </div>
                      </div>

                      {/* Possession & Button */}
                      <div className="mt-auto pt-2">
                        <p className="text-[13px] text-[#5b6472] italic mb-4">
                          Posession Date{" "}
                          <span className="not-italic font-bold text-[#21409A] ml-1">
                            {project.possession}
                          </span>
                        </p>

                        <button className="border border-[#21409A] text-[#21409A] px-6 py-2 rounded-[6px] text-[14px] font-medium hover:bg-[#21409A] hover:text-white transition-all duration-300 w-fit">
                          Know more
                        </button>
                      </div>

                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

      </div>

      {/* Global CSS overrides for hiding scrollbars and styling Swiper buttons */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
        
        /* Swiper Custom Navigation Arrows */
        .featured-projects-slider .swiper-button-next,
        .featured-projects-slider .swiper-button-prev {
          background-color: white;
          color: #21409A;
          width: 48px;
          height: 48px;
          border-radius: 50%;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
        }
        
        .featured-projects-slider .swiper-button-next:hover,
        .featured-projects-slider .swiper-button-prev:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(33,64,154,0.25);
        }

        .featured-projects-slider .swiper-button-next:after,
        .featured-projects-slider .swiper-button-prev:after {
          font-size: 18px;
          font-weight: 800;
        }

        /* Adjust button positions */
        .featured-projects-slider .swiper-button-next {
          right: -10px;
        }
        .featured-projects-slider .swiper-button-prev {
          left: -10px;
        }
        
        /* Hide buttons on mobile */
        @media (max-width: 768px) {
          .featured-projects-slider .swiper-button-next,
          .featured-projects-slider .swiper-button-prev {
            display: none;
          }
        }
      `}} />

    </section>
  );
}