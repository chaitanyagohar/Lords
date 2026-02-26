"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { MapPin, Bed, Ruler } from "lucide-react";

export default function FeaturedProjects() {
  const [activeCity, setActiveCity] = useState("Bengaluru");
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const cities = ["Bengaluru", "Chennai", "Hyderabad", "Pune"];

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
    <section className="bg-[#f5f7fb] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-[44px] leading-[60px] font-medium text-[#0F1A2A] mb-5">
            Our projects across india
          </h2>
          <p className="text-[#5b6472] text-[18px]">
            Simplify real estate with expert guidance and clear property insights. Get per sq. ft.
          </p>
        </div>

       {/* City Filter */}
<div className="mb-12 md:mb-16">

  <div className="flex md:justify-center gap-3 md:gap-4 overflow-x-auto md:overflow-visible pb-2 scrollbar-hide">

    {cities.map((city) => (
      <button
        key={city}
        onClick={() => setActiveCity(city)}
        className={`whitespace-nowrap shrink-0 px-5 md:px-6 py-2 rounded-lg border text-[14px] md:text-[15px] font-medium transition-all duration-300
          ${
            activeCity === city
              ? "bg-[#2f4aa0] text-white border-[#2f4aa0]"
              : "bg-white text-[#2f4aa0] border-[#2f4aa0] hover:bg-[#eef2ff]"
          }`}
      >
        {city}
      </button>
    ))}

  </div>

</div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-10 text-gray-500">
            Loading properties...
          </div>
        )}

        {/* Slider */}
        {!loading && (
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            slidesPerView={1.2}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
              1280: { slidesPerView: 4.2 },
            }}
          >
            {projects.map((project) => (
              <SwiperSlide key={project.id}>
                <div className="bg-white rounded-[20px] border border-[#dbe3f0] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-300">

                  {/* Image */}
                  <div className="overflow-hidden rounded-t-[20px]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-[200px] object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6">

                    <h3 className="text-[20px] font-medium text-[#0F1A2A] mb-3">
                      {project.title}
                    </h3>

                    <p className="text-[16px] mb-4">
                      Starting from{" "}
                      <span className="text-[#2f4aa0] font-semibold text-[18px]">
                        {project.price}
                      </span>
                    </p>

                    <div className="flex items-center text-[#5b6472] text-[14px] mb-3">
                      <MapPin size={16} className="mr-2 text-[#2f4aa0]" />
                      {project.location}
                    </div>

                    <div className="flex items-center gap-6 text-[14px] text-[#5b6472] mb-3">
                      <div className="flex items-center gap-2">
                        <Bed size={16} />
                        {project.bhk}
                      </div>
                      <div className="flex items-center gap-2">
                        <Ruler size={16} />
                        {project.size}
                      </div>
                    </div>

                    <p className="text-[14px] mb-6">
                      Possession Date{" "}
                      <span className="text-[#2f4aa0] font-medium">
                        {project.possession}
                      </span>
                    </p>

                    <button className="border border-[#2f4aa0] text-[#2f4aa0] px-6 py-2 rounded-lg text-[14px] font-medium hover:bg-[#2f4aa0] hover:text-white transition-all duration-300">
                      Know more
                    </button>

                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

      </div>
    </section>
  );
}