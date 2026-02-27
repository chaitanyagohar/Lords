"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { MapPin, Bed, Ruler, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

type Property = {
  id: string | number;
  title: string;
  slug: string;
  location: string;
  city: string;
  image: string;
  starting_price: string;
  bhk: string;
  size: string;
  possession: string;
};

export default function CityPropertyListing({
  initialProperties,
  cityName,
}: {
  initialProperties: Property[];
  cityName: string;
}) {
  const [selectedBhk, setSelectedBhk] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Helper to convert "₹ 90 Lacs*" to a raw number for filtering
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const cleanStr = priceStr.toLowerCase().replace(/[^0-9.a-z]/g, '');
    const num = parseFloat(cleanStr.replace(/[a-z]/g, ''));
    if (cleanStr.includes('cr')) return num * 10000000;
    if (cleanStr.includes('lac') || cleanStr.includes('lakh')) return num * 100000;
    return num;
  };

  const filteredProperties = useMemo(() => {
    return initialProperties.filter((prop) => {
      // 1. BHK Filter
      if (selectedBhk && prop.bhk && !prop.bhk.includes(selectedBhk)) return false;

      // 2. Type Filter (Simulated based on title since 'home_type' isn't in the DB schema)
      if (selectedType) {
        const titleLower = prop.title.toLowerCase();
        if (selectedType === "Villa" && !titleLower.includes("villa")) return false;
        if (selectedType === "Apartment" && titleLower.includes("villa") && titleLower.includes("plot")) return false;
        if (selectedType === "Plots" && !titleLower.includes("plot")) return false;
      }

      // 3. Price Filter
      if (selectedPrice) {
        const rawPrice = parsePrice(prop.starting_price);
        if (selectedPrice === "< 1Cr" && rawPrice >= 10000000) return false;
        if (selectedPrice === "1-1.5Cr" && (rawPrice < 10000000 || rawPrice > 15000000)) return false;
        if (selectedPrice === "1.5-2Cr" && (rawPrice < 15000000 || rawPrice > 20000000)) return false;
        if (selectedPrice === "2.5Cr-3Cr" && (rawPrice < 25000000 || rawPrice > 30000000)) return false;
        if (selectedPrice === "> 3Cr" && rawPrice <= 30000000) return false;
      }

      return true;
    });
  }, [initialProperties, selectedBhk, selectedType, selectedPrice]);

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentProperties = filteredProperties.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const clearAllFilters = () => {
    setSelectedBhk(null);
    setSelectedType(null);
    setSelectedPrice(null);
    setCurrentPage(1);
  };

  // Generate dynamic heading text
  const headingText = `${cityName} ${selectedType || 'Properties'}`;

  return (
    <div className="bg-[#fcfdfd] min-h-screen pt-[120px] pb-24">
      <div className="max-w-[1300px] mx-auto px-6">
        
        {/* ================= FILTERS BAR ================= */}
        <div className="flex flex-wrap items-center gap-4 mb-10 relative" ref={dropdownRef}>
          
          {/* Beds & Bath Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'bhk' ? null : 'bhk')}
              className={`flex items-center justify-between w-[180px] px-4 py-2.5 rounded-[8px] border text-[15px] transition-colors ${selectedBhk ? 'border-[#21409A] text-[#21409A] font-medium bg-[#f8fafe]' : 'border-gray-300 text-[#374151] bg-white hover:border-gray-400'}`}
            >
              {selectedBhk || "Beds And Bath"} <ChevronDown size={18} className={openDropdown === 'bhk' ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            {openDropdown === 'bhk' && (
              <div className="absolute top-[110%] left-0 w-[180px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-[8px] py-2 z-20">
                {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'].map(bhk => (
                  <div key={bhk} onClick={() => { setSelectedBhk(bhk); setOpenDropdown(null); setCurrentPage(1); }} className="px-5 py-2.5 hover:bg-[#f8fafe] hover:text-[#21409A] cursor-pointer text-[14px] text-[#5b6472] transition-colors">
                    {bhk}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Home Types Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')}
              className={`flex items-center justify-between w-[180px] px-4 py-2.5 rounded-[8px] border text-[15px] transition-colors ${selectedType ? 'border-[#21409A] text-[#21409A] font-medium bg-[#f8fafe]' : 'border-gray-300 text-[#374151] bg-white hover:border-gray-400'}`}
            >
              {selectedType || "Home Types"} <ChevronDown size={18} className={openDropdown === 'type' ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            {openDropdown === 'type' && (
              <div className="absolute top-[110%] left-0 w-[180px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-[8px] py-2 z-20">
                {['Villa', 'Apartment', 'Plots', 'Villa Plots'].map(type => (
                  <div key={type} onClick={() => { setSelectedType(type); setOpenDropdown(null); setCurrentPage(1); }} className="px-5 py-2.5 hover:bg-[#f8fafe] hover:text-[#21409A] cursor-pointer text-[14px] text-[#5b6472] transition-colors">
                    {type}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Prices Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')}
              className={`flex items-center justify-between w-[180px] px-4 py-2.5 rounded-[8px] border text-[15px] transition-colors ${selectedPrice ? 'border-[#21409A] text-[#21409A] font-medium bg-[#f8fafe]' : 'border-gray-300 text-[#374151] bg-white hover:border-gray-400'}`}
            >
              {selectedPrice || "Prices"} <ChevronDown size={18} className={openDropdown === 'price' ? 'rotate-180 transition-transform' : 'transition-transform'} />
            </button>
            {openDropdown === 'price' && (
              <div className="absolute top-[110%] left-0 w-[180px] bg-white border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.1)] rounded-[8px] py-2 z-20">
                {['< 1Cr', '1-1.5Cr', '1.5-2Cr', '2.5Cr-3Cr', '> 3Cr'].map(price => (
                  <div key={price} onClick={() => { setSelectedPrice(price); setOpenDropdown(null); setCurrentPage(1); }} className="px-5 py-2.5 hover:bg-[#f8fafe] hover:text-[#21409A] cursor-pointer text-[14px] text-[#5b6472] transition-colors">
                    {price}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Clear All */}
          {(selectedBhk || selectedType || selectedPrice) && (
            <button onClick={clearAllFilters} className="text-[#21409A] font-semibold text-[15px] hover:underline ml-2">
              Clear All
            </button>
          )}
        </div>

        {/* ================= PAGE HEADER ================= */}
        <h1 className="text-[36px] md:text-[42px] font-semibold text-[#0F1A2A] mb-1 capitalize tracking-tight">
          {headingText}
        </h1>
        <p className="text-[16px] text-[#21409A] font-medium mb-10">
          {filteredProperties.length} results
        </p>

        {/* ================= PROPERTY GRID ================= */}
        {filteredProperties.length === 0 ? (
          <div className="py-20 text-center text-gray-500 text-lg">No properties found matching your criteria.</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
            {currentProperties.map((property) => (
              <div
                key={property.id}
                className="bg-white rounded-[16px] border border-gray-200 shadow-[0_4px_15px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full overflow-hidden group"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-[220px] shrink-0">
                  <img
                    src={property.image || "/default-property.jpg"}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>

                {/* Content */}
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-[18px] md:text-[20px] font-semibold text-[#0F1A2A] mb-1.5 line-clamp-1">
                    {property.title}
                  </h3>
                  
                  <div className="text-[15px] text-[#374151] mb-5">
                    Starting from{" "}
                    <span className="text-[#21409A] font-bold text-[18px] ml-1">
                      {property.starting_price || "Price on Request"}
                    </span>
                  </div>

                  <div className="flex items-start text-[#5b6472] text-[13px] md:text-[14px] mb-4">
                    <MapPin size={16} strokeWidth={2} className="mr-2.5 shrink-0 text-[#9ca3af] mt-0.5" />
                    <span className="line-clamp-1">{property.location}, {property.city}.</span>
                  </div>

                  <div className="flex items-center gap-5 text-[13px] md:text-[14px] text-[#5b6472] mb-5">
                    <div className="flex items-center gap-2">
                      <Bed size={16} strokeWidth={2} className="text-[#9ca3af]" />
                      <span>{property.bhk || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Ruler size={16} strokeWidth={2} className="text-[#9ca3af]" />
                      <span>{property.size || "Size on Request"}</span>
                    </div>
                  </div>

                  {/* Footer of Card */}
                  <div className="mt-auto pt-4 flex flex-col items-start border-t border-gray-50">
                    <p className="text-[13px] text-[#5b6472] italic mb-4">
                      Posession Date{" "}
                      <span className="not-italic font-bold text-[#21409A] ml-1">
                        {property.possession || "TBD"}
                      </span>
                    </p>

                    <Link href={`/properties/${property.slug}`}>
                      <button className="border border-[#21409A] text-[#21409A] px-7 py-2 rounded-[6px] text-[14px] font-medium hover:bg-[#21409A] hover:text-white transition-all duration-300">
                        Know more
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 text-[#5b6472] text-[15px] font-medium">
            <button onClick={() => setCurrentPage(1)} disabled={currentPage === 1} className="p-2 hover:text-[#21409A] disabled:opacity-30 disabled:hover:text-[#5b6472]"><ChevronsLeft size={18} /></button>
            <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-2 hover:text-[#21409A] disabled:opacity-30 disabled:hover:text-[#5b6472]"><ChevronLeft size={18} /></button>
            
            {Array.from({ length: Math.min(3, totalPages) }).map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-9 h-9 flex items-center justify-center rounded-[6px] ${currentPage === idx + 1 ? 'bg-gray-100 text-[#0F1A2A] font-semibold border border-gray-200' : 'hover:bg-gray-50'}`}
              >
                {idx + 1}
              </button>
            ))}
            
            {totalPages > 3 && <span className="mx-2 tracking-widest">...</span>}
            {totalPages > 3 && (
              <button onClick={() => setCurrentPage(totalPages)} className={`w-9 h-9 flex items-center justify-center rounded-[6px] ${currentPage === totalPages ? 'bg-gray-100 text-[#0F1A2A] font-semibold border border-gray-200' : 'hover:bg-gray-50'}`}>
                {totalPages}
              </button>
            )}

            <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-2 hover:text-[#21409A] disabled:opacity-30 disabled:hover:text-[#5b6472]"><ChevronRight size={18} /></button>
            <button onClick={() => setCurrentPage(totalPages)} disabled={currentPage === totalPages} className="p-2 hover:text-[#21409A] disabled:opacity-30 disabled:hover:text-[#5b6472]"><ChevronsRight size={18} /></button>
          </div>
        )}

      </div>
    </div>
  );
}