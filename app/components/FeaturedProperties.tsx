"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/app/lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import { MapPin, Bed, Ruler } from "lucide-react";
import Link from "next/link";

const CITIES = ["Bengaluru", "Chennai", "Hyderabad", "Pune", "Dubai"];

export default function FeaturedProjects() {
  const [activeCity, setActiveCity] = useState("Bengaluru");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    fetchProjects(activeCity);
  }, [activeCity]);

  useEffect(() => {
    if (
      swiperInstance &&
      prevRef.current &&
      nextRef.current
    ) {
      swiperInstance.params.navigation.prevEl = prevRef.current;
      swiperInstance.params.navigation.nextEl = nextRef.current;

      swiperInstance.navigation.destroy();
      swiperInstance.navigation.init();
      swiperInstance.navigation.update();
    }
  }, [swiperInstance]);

  async function fetchProjects(city: string) {
    setLoading(true);

    const { data, error } = await supabase
      .from("properties")
      .select("*")
      .ilike("city", city)
      .order("created_at", { ascending: false });

    if (!error) setProjects(data || []);
    setLoading(false);
  }

  return (
    <section className="bg-[#F8FAFC] py-20 md:py-24 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-[32px] md:text-[44px] font-semibold text-[#0F1A2A] mb-4">
            Our projects across india
          </h2>
          <p className="text-[#5b6472] text-[15px] md:text-[18px]">
            Simplify real estate with expert guidance and clear property insights.
          </p>
        </div>

        {/* City Filter */}
        <div className="mb-12 flex md:justify-center gap-3 overflow-x-auto pb-2">
          {CITIES.map((city) => (
            <button
              key={city}
              onClick={() => setActiveCity(city)}
              className={`px-8 py-2.5 rounded-md border text-sm font-medium transition-all
                ${
                  activeCity === city
                    ? "bg-[#2a2a2a] text-white border-[#2a2a2a]"
                    : "bg-white text-[#2a2a2a] border-[#2a2a2a] hover:bg-blue-50"
                }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-20 text-gray-500">
            Loading properties in {activeCity}...
          </div>
        )}

        {/* Empty */}
        {!loading && projects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            We will be here soon!
          </div>
        )}

        {/* Slider */}
        {!loading && projects.length > 0 && (
          <div className="relative">

            {/* Custom Nav Buttons */}
            <button
              ref={prevRef}
              className="swiper-custom-prev hidden md:flex"
              aria-label="Previous"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M15 18l-6-6 6-6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              ref={nextRef}
              className="swiper-custom-next hidden md:flex"
              aria-label="Next"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <Swiper
              modules={[Navigation]}
              spaceBetween={24}
              slidesPerView={1.1}
              navigation={false}
              onSwiper={(swiper) => setSwiperInstance(swiper)}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                1024: { slidesPerView: 3.2 },
                1280: { slidesPerView: 4 },
              }}
              className="pb-10"
            >
              {projects.map((project) => (
                <SwiperSlide key={project.id}>
                  <div className="bg-white rounded-[16px] border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">

                    <div className="h-[220px] overflow-hidden">
                      <img
                        src={project.image || "/default-property.jpg"}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>

                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-[#0F1A2A] mb-2">
                        {project.title}
                      </h3>

                      <p className="text-[#2a2a2a] font-bold mb-4">
                        {project.starting_price ||
                          project.price ||
                          "Price on Request"}
                      </p>

                      <div className="flex items-center text-sm text-gray-500 mb-2">
                        <MapPin size={16} className="mr-2" />
                        {project.location}, {project.city}
                      </div>

                      <div className="flex gap-4 text-sm text-gray-500 mb-6">
                        <div className="flex items-center gap-2">
                          <Bed size={16} />
                          {project.bhk || "N/A"}
                        </div>
                        <div className="flex items-center gap-2">
                          <Ruler size={16} />
                          {project.size || "Size on Request"}
                        </div>
                      </div>

                      <Link href={`/properties/${project.slug}`}>
                        <button className="border border-[#2a2a2a] text-[#2a2a2a] px-6 py-2 rounded-md hover:bg-[#2a2a2a] hover:text-white transition-all duration-300">
                          Know more
                        </button>
                      </Link>
                    </div>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>

      <style jsx global>{`
        .swiper-custom-prev,
        .swiper-custom-next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(33, 64, 154, 0.15);
          color: #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          z-index: 20;
        }

        .swiper-custom-prev:hover,
        .swiper-custom-next:hover {
          transform: translateY(-50%) scale(1.08);
          background: #2a2a2a;
          color: white;
          box-shadow: 0 12px 30px rgba(33, 64, 154, 0.25);
        }

        .swiper-custom-prev {
          left: -24px;
        }

        .swiper-custom-next {
          right: -24px;
        }

        .swiper-button-disabled {
          opacity: 0.4 !important;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .swiper-custom-prev,
          .swiper-custom-next {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}