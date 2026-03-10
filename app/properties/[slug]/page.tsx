import { supabase } from "@/app/lib/supabase";
import { notFound } from "next/navigation";
import Link from "next/link";

// --- IMPORT YOUR COMPONENTS ---
import PropertyPopup from "@/app/components/PropertyPopup"; 
import CityPropertyListing from "@/app/components/CityPropertyListing";
import PropertyGallery from "@/app/components/PropertyGallery"; 
import PreRegisterButton from "@/app/components/PreRegisterButton"; 

import { 
  Share2, Phone, Building2, Layers, 
  Scaling, Map, Clock, CalendarDays, Dumbbell, Wine, Waves, 
  Activity, Trees, Baby, Gamepad2, Tv, MapPin, Download
} from "lucide-react"; 

const getAmenityIcon = (name: string) => {
  const lowerName = name.toLowerCase();
  if (lowerName.includes('gym')) return <Dumbbell size={22} className="text-[#374151]" />;
  if (lowerName.includes('club')) return <Wine size={22} className="text-[#374151]" />;
  if (lowerName.includes('pool') || lowerName.includes('swim')) return <Waves size={22} className="text-[#374151]" />;
  if (lowerName.includes('yoga') || lowerName.includes('aerobics')) return <Activity size={22} className="text-[#374151]" />;
  if (lowerName.includes('garden') || lowerName.includes('park')) return <Trees size={22} className="text-[#374151]" />;
  if (lowerName.includes('kid') || lowerName.includes('creche')) return <Baby size={22} className="text-[#374151]" />;
  if (lowerName.includes('game') || lowerName.includes('sport')) return <Gamepad2 size={22} className="text-[#374151]" />;
  if (lowerName.includes('theatre') || lowerName.includes('movie')) return <Tv size={22} className="text-[#374151]" />;
  return <Activity size={22} className="text-[#374151]" />; 
};

export default async function DynamicPropertyPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const { data: cityProperties } = await supabase
    .from("properties")
    .select("id, title, slug, location, city, image, starting_price, bhk, size, possession")
    .ilike("city", slug);

  if (cityProperties && cityProperties.length > 0) {
    return <CityPropertyListing initialProperties={cityProperties} cityName={slug} />;
  }
  
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!property) return notFound();

  const { data: gallery } = await supabase.from("property_gallery").select("*").eq("property_id", property.id).order("display_order");
  const { data: configurations } = await supabase.from("property_configurations").select("*").eq("property_id", property.id).order("display_order");
  const { data: amenities } = await supabase.from("property_amenities").select("amenities(name)").eq("property_id", property.id);
  const { data: locationAdvantages } = await supabase.from("property_location_advantages").select("*").eq("property_id", property.id).order("display_order");

  const whatsappUrl = `https://wa.me/919845803477?text=Hi, I'm interested in ${property.title}`;

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative pb-20 pt-[70px] md:pt-[80px] overflow-x-hidden">
        <style>{`
          footer, #global-footer { display: none !important; }
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

      {/* HEADER */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-3 border-r border-gray-300 pr-3 md:pr-6 shrink-0">
              {property.partner_logo ? (
                <img src={property.partner_logo} alt="Partner Logo" className="h-10 md:h-12 w-auto object-contain max-w-[100px] md:max-w-[120px]" />
              ) : (
                <div className="w-12 h-8 bg-gray-100 flex items-center justify-center font-bold text-[10px] text-gray-500 rounded">LOGO</div>
              )}
            </div>
            <div className="flex flex-col justify-center">
              <h1 className="text-[18px] md:text-[26px] font-bold text-[#0F1A2A] leading-tight md:leading-none mb-1 pr-2">{property.title}</h1>
              <p className="text-[#5b6472] text-[12px] md:text-[14px] leading-tight">{property.location}, {property.city}.</p>
            </div>
          </div>
          <button className="p-2 border border-gray-200 rounded-md text-gray-600 hover:bg-gray-50 transition-colors shrink-0 self-center"><Share2 size={18} /></button>
        </div>
      </div>

      {/* TABS */}
      <div className="sticky top-[70px] md:top-[80px] z-40 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 flex overflow-x-auto scrollbar-hide">
          {['Overview', 'Price', 'Site & Floor Plan', 'Amenities', 'Location'].map((tab, idx) => (
            <a key={idx} href={`#${tab.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`} className={`whitespace-nowrap py-3.5 md:py-4 px-4 md:px-8 text-[14px] md:text-[15px] font-medium transition-colors ${idx === 0 ? "text-[#2a2a2a] border-b-[3px] border-[#2a2a2a]" : "text-[#5b6472] hover:text-[#0F1A2A]"}`}>{tab}</a>
          ))}
        </div>
      </div>

      <div className="max-w-[1300px] mx-auto px-4 md:px-6 py-6 md:py-8">
        
        <PropertyGallery gallery={gallery || []} fallbackImage={property.image} title={property.title} />

        {/* MOBILE CTA */}
        <div className="lg:hidden flex flex-col gap-4 mt-6 mb-8 border-b border-gray-200 pb-8">
          <div className="flex flex-col mb-1">
            <span className="text-[28px] font-bold text-[#21409A] leading-none">
              {property.starting_price || "Price on Request"}
            </span>
          </div>
          
          <div className="flex flex-col gap-3">
            {/* UPDATED TO WHATSAPP LINK */}
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 rounded-[8px] border border-[#21409A] text-[#21409A] font-semibold text-[15px] hover:bg-[#f4f7fb] transition-all flex items-center justify-center gap-2">
              <Download size={18} /> Download Brochure
            </a>
            <PreRegisterButton />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 flex flex-col gap-10 md:gap-12 w-full overflow-hidden">
            
            <section id="overview" className="scroll-mt-[130px] md:scroll-mt-[160px] w-full">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#0F1A2A] mb-4">Overview</h2>
              <div className="text-[#374151] text-[14px] md:text-[16px] leading-[1.8] w-full">
                <p className="font-semibold text-[#0F1A2A] mb-4">{property.title} is a new ultra-luxury project launched in {property.location}, {property.city}.</p>
                <div 
                  className="prose prose-sm max-w-none text-[#374151] w-full break-words [&_*]:!max-w-full [&_*]:!w-auto" 
                  dangerouslySetInnerHTML={{ __html: property.overview || '' }} 
                />
              </div>
            </section>

            <section id="price" className="scroll-mt-[130px] md:scroll-mt-[160px] w-full">
              <div className="flex justify-between items-end mb-4 md:mb-6">
                <h2 className="text-[22px] md:text-[28px] font-semibold text-[#0F1A2A]">Price</h2>
                <button className="text-[#2a2a2a] border border-[#2a2a2a] px-4 py-1.5 rounded-[6px] text-[13px] md:text-[14px] font-medium hover:bg-[#f4f7fb] transition-colors hidden md:block">Complete Costing Details</button>
              </div>
              <div className="border border-gray-200 rounded-[12px] overflow-x-auto shadow-sm w-full scrollbar-hide">
                <div className="min-w-[550px]">
                  <div className="grid grid-cols-4 bg-[#393939] text-white px-4 md:px-5 py-3 md:py-4 text-[13px] md:text-[15px] font-medium">
                    <div>Type</div><div>Sqft.</div><div>Price</div><div>Price Breakup</div>
                  </div>
                  {configurations?.map((config, idx) => (
                    <div key={config.id} className={`grid grid-cols-4 px-4 md:px-5 py-3 md:py-4 text-[13px] md:text-[15px] text-[#374151] items-center ${idx !== configurations.length - 1 ? 'border-b border-gray-200' : ''}`}>
                      <div className="font-medium">{config.unit_type}</div>
                      <div>{config.area_label}</div>
                      <div>{config.price || "₹On Request*"}</div>
                      <div><button className="text-[#2a2a2a] font-medium hover:underline text-[12px] md:text-[14px]">View Breakup</button></div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="w-full mt-4 text-[#2a2a2a] border border-[#2a2a2a] px-4 py-2.5 rounded-[6px] text-[14px] font-medium hover:bg-[#f4f7fb] transition-colors md:hidden">Complete Costing Details</button>
            </section>

            <section id="site-floor-plan" className="scroll-mt-[130px] md:scroll-mt-[160px] w-full">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#0F1A2A] mb-4 md:mb-6">Master Plan</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden border border-gray-200 shadow-sm group cursor-pointer h-[200px] md:h-[240px]">
                  <img src="/masterplan.jpg" alt="Master Plan" className="w-full h-full object-cover blur-[6px] group-hover:blur-[4px] transition-all" />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-0 left-0 w-full bg-[#2a2a2a] text-white text-center py-2.5 md:py-3 font-medium text-[14px] md:text-[15px]">{property.title} - Master Plan</div>
                </div>
                <div className="relative rounded-[12px] md:rounded-[16px] overflow-hidden border border-gray-200 shadow-sm group cursor-pointer h-[200px] md:h-[240px]">
                  <img src="/floorplan.jpeg" alt="Floor Plan" className="w-full h-full object-cover blur-[6px] group-hover:blur-[4px] transition-all" />
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-0 left-0 w-full bg-[#2a2a2a] text-white text-center py-2.5 md:py-3 font-medium text-[14px] md:text-[15px]">{property.title} - Floor Plan</div>
                </div>
              </div>
            </section>

            <section id="amenities" className="scroll-mt-[130px] md:scroll-mt-[160px] w-full">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#0F1A2A] mb-4 md:mb-6">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-6 md:gap-y-8 gap-x-4">
                {amenities?.map((item: any, i) => (
                  <div key={i} className="flex items-center gap-3 md:gap-4 text-[#374151] text-[13px] md:text-[16px] font-medium">
                    <div className="w-6 md:w-8 flex justify-center shrink-0">
                      {getAmenityIcon(item.amenities.name)}
                    </div>
                    <span className="leading-tight">{item.amenities.name}</span>
                  </div>
                ))}
              </div>
            </section>

            <section id="location" className="scroll-mt-[130px] md:scroll-mt-[160px] w-full">
              <h2 className="text-[22px] md:text-[28px] font-semibold text-[#0F1A2A] mb-4 md:mb-6">Location Advantage</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {locationAdvantages?.map((loc) => (
                  <div key={loc.id} className="bg-[#d9d7d7] rounded-[12px] p-3 flex items-center gap-3 md:gap-4 border border-blue-50/50 hover:shadow-sm transition-shadow w-full">
                    <div className="bg-white rounded-[8px] border border-gray-100 shadow-sm min-w-[56px] h-[56px] md:min-w-[64px] md:h-[64px] flex flex-col items-center justify-center shrink-0">
                      <span className="text-[16px] md:text-[18px] font-bold text-[#2a2a2a] leading-none mb-1">{loc.distance_value}</span>
                      <span className="text-[10px] md:text-[12px] text-gray-500 font-medium leading-none">{loc.distance_unit}</span>
                    </div>
                    <span className="text-[14px] md:text-[16px] text-[#374151] font-medium leading-snug break-words">{loc.title}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="text-[11px] md:text-[12px] text-gray-400 leading-relaxed mt-2 md:mt-4 pb-8 md:pb-12 border-b border-gray-200">
              Disclaimer: The images displayed on the website are for representation purposes only and may not reflect the actual properties accurately.
            </div>
          </div>

          {/* DESKTOP RIGHT COLUMN */}
          <div className="hidden lg:block lg:col-span-4 relative">
            <div className="sticky top-[140px] flex flex-col gap-6 w-full">

              <div className="bg-[#d9d7d7] rounded-[16px] p-6 border border-blue-50 w-full">
                <div className="grid grid-cols-2 gap-x-3 gap-y-6 mb-8 w-full">
                  <div className="flex flex-col gap-1 overflow-hidden"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2a2a2a] mb-1 shadow-sm shrink-0"><Building2 size={16} /></div><span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Units</span><span className="text-[13px] font-semibold text-[#0F1A2A] leading-snug truncate">{property.units || "N/A"}</span></div>
                  <div className="flex flex-col gap-1 overflow-hidden"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2a2a2a] mb-1 shadow-sm shrink-0"><Layers size={16} /></div><span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Total floors</span><span className="text-[13px] font-semibold text-[#0F1A2A] leading-snug truncate">{property.total_floors || "N/A"}</span></div>
                  <div className="flex flex-col gap-1 overflow-hidden"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2a2a2a] mb-1 shadow-sm shrink-0"><Scaling size={16} /></div><span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Built-up Area</span><span className="text-[13px] font-semibold text-[#0F1A2A] leading-snug truncate">{property.built_up_area || "N/A"}</span></div>
                  <div className="flex flex-col gap-1 overflow-hidden"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2a2a2a] mb-1 shadow-sm shrink-0"><Map size={16} /></div><span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Land Parcel</span><span className="text-[13px] font-semibold text-[#0F1A2A] leading-snug truncate">{property.land_parcel || "N/A"}</span></div>
                  <div className="flex flex-col gap-1 overflow-hidden"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2a2a2a] mb-1 shadow-sm shrink-0"><Clock size={16} /></div><span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Property Status</span><span className="text-[13px] font-semibold text-[#0F1A2A] leading-snug truncate">{property.property_status || "N/A"}</span></div>
                  <div className="flex flex-col gap-1 overflow-hidden"><div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2a2a2a] mb-1 shadow-sm shrink-0"><CalendarDays size={16} /></div><span className="text-[11px] text-gray-500 font-medium uppercase tracking-wider">Possession Date</span><span className="text-[13px] font-semibold text-[#0F1A2A] leading-snug truncate">{property.possession_date || "N/A"}</span></div>
                </div>

                <div className="mb-6">
                  <span className="text-[26px] font-bold text-[#0F1A2A] leading-none">{property.starting_price || "Price on Request"}</span>
                  <span className="text-[16px] font-semibold text-[#0F1A2A] ml-2">Onwards</span>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  {/* UPDATED TO WHATSAPP LINK */}
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-[8px] border-2 border-[#2a2a2a] text-[#2a2a2a] font-semibold text-[15px] hover:bg-[#2a2a2a] hover:text-white transition-all flex items-center justify-center gap-2">
                    <Download size={18} /> Download Brochure
                  </a>
                  <PreRegisterButton />
                </div>
              </div>

              <div className="bg-white rounded-[16px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 w-full">
                <h3 className="text-[20px] font-semibold text-[#0F1A2A] mb-6">Get the best quote</h3>
                <form className="flex flex-col gap-5 w-full">
                  <input type="text" placeholder="Name*" className="w-full border-b border-gray-300 pb-2 outline-none focus:border-[#2a2a2a] text-[15px] placeholder-gray-400" required />
                  <input type="tel" placeholder="Mobile*" className="w-full border-b border-gray-300 pb-2 outline-none focus:border-[#2a2a2a] text-[15px] placeholder-gray-400" required />
                  <input type="email" placeholder="Email*" className="w-full border-b border-gray-300 pb-2 outline-none focus:border-[#2a2a2a] text-[15px] placeholder-gray-400" required />
                  <label className="flex items-start gap-3 mt-2 cursor-pointer w-full">
                    <input type="checkbox" className="mt-1 w-4 h-4 rounded text-[#2a2a2a] focus:ring-[#2a2a2a] shrink-0" defaultChecked />
                    <span className="text-[11px] text-gray-500 leading-snug break-words">I authorize {property.title} and its representatives to contact me...</span>
                  </label>
                  <button type="button" className="w-full mt-2 py-3 rounded-[8px] bg-[#393939] hover:bg-[#877f7f] text-white font-semibold text-[15px] transition-colors">Submit</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* POPUP COMPONENT (Loaded Once At the Bottom) */}
      <PropertyPopup propertyTitle={property.title} />

      {/* FLOATING ACTION BUTTONS */}
      <a href="tel:+919845803477" className="fixed bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-40 w-[85%] md:w-auto max-w-[280px] md:max-w-none">
        <div className="bg-white shadow-[0_8px_30px_rgba(0,0,0,0.15)] border border-gray-100 rounded-full px-4 md:px-6 py-2.5 md:py-3 flex items-center justify-center gap-3 md:gap-4 cursor-pointer hover:scale-105 transition-transform whitespace-nowrap">
          <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#f4f7fb] text-[#2a2a2a] flex items-center justify-center shrink-0">
            <Phone size={18} className="md:w-5 md:h-5" />
          </div>
          <div className="flex flex-col pr-2">
            <span className="text-[10px] md:text-[12px] text-gray-500 font-medium leading-none mb-1">Instant Callback</span>
            <span className="text-[15px] md:text-[18px] font-bold text-[#0F1A2A] leading-none">+91 98458 03477</span>
          </div>
        </div>
      </a>

      <a href={whatsappUrl} target="_blank" rel="noreferrer" className="fixed bottom-[75px] md:bottom-8 right-4 md:right-6 z-50 bg-[#25D366] text-white w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
        <svg className="w-6 h-6 md:w-7 md:h-7" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 0C5.397 0 0 5.398 0 12.033C0 14.153 0.553 16.19 1.547 17.986L0.24 22.753L5.116 21.468C6.845 22.373 8.875 22.894 11.026 22.894C17.66 22.894 23.056 17.496 23.056 10.862C23.056 4.228 17.659 0 12.031 0ZM12.031 21.002C10.158 21.002 8.423 20.499 6.945 19.624L6.619 19.431L3.639 20.214L4.441 17.291L4.228 16.953C3.254 15.421 2.71 13.593 2.71 11.661C2.71 6.516 6.885 2.341 12.031 2.341C17.177 2.341 21.352 6.516 21.352 11.661C21.352 16.806 17.177 21.002 12.031 21.002ZM17.151 15.021C16.87 14.881 15.488 14.199 15.231 14.106C14.973 14.012 14.786 13.965 14.599 14.246C14.412 14.527 13.874 15.183 13.71 15.37C13.546 15.557 13.382 15.58 13.101 15.44C12.82 15.3 11.776 14.954 10.536 13.844C9.57 12.981 8.913 11.921 8.749 11.64C8.585 11.359 8.732 11.207 8.873 11.067C8.999 10.941 9.154 10.74 9.294 10.581C9.435 10.422 9.482 10.305 9.575 10.118C9.669 9.93 9.622 9.767 9.552 9.626C9.482 9.486 8.92 8.127 8.686 7.565C8.457 7.016 8.223 7.091 8.045 7.08C7.881 7.07 7.694 7.07 7.507 7.07C7.32 7.07 7.016 7.14 6.758 7.421C6.501 7.702 5.776 8.381 5.776 9.762C5.776 11.143 6.782 12.477 6.922 12.665C7.063 12.852 8.905 15.702 11.832 16.967C12.529 17.268 13.076 17.446 13.504 17.581C14.204 17.804 14.843 17.771 15.344 17.681C15.904 17.581 17.151 16.844 17.408 16.094C17.666 15.344 17.666 14.712 17.595 14.571C17.525 14.431 17.338 14.337 17.057 14.197H17.151Z" />
        </svg>
      </a>

    </div>
  );
}