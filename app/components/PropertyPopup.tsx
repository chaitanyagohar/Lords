"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PropertyPopup({ propertyTitle }: { propertyTitle: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoPopped, setHasAutoPopped] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    consent: true,
  });

  // 1. Handle Auto-Pop after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoPopped) {
        setIsOpen(true);
        setHasAutoPopped(true);
      }
    }, 8000);

    return () => clearTimeout(timer);
  }, [hasAutoPopped]);

  // 2. Listen for "Pre Register" button clicks
  useEffect(() => {
    const handleOpenModal = () => setIsOpen(true);
    window.addEventListener("open-property-modal", handleOpenModal);
    return () => window.removeEventListener("open-property-modal", handleOpenModal);
  }, []);

  // Lock background scrolling when modal is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // (Add your database logic here later)
    setIsOpen(false);
    router.push("/thank-you");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="bg-white rounded-[12px] overflow-hidden w-full max-w-[850px] flex flex-col md:flex-row shadow-2xl relative animate-in zoom-in-95 duration-300">
        
        {/* ================= LEFT SIDE: FORM ================= */}
        <div className="w-full md:w-[50%] p-8 md:p-10 flex flex-col justify-center bg-white">
          <h2 className="text-[24px] font-bold text-[#0F1A2A] mb-8">
            Get The Best Price!
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input 
              type="text" 
              placeholder="Name*" 
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-b border-gray-300 pb-2 text-[15px] outline-none focus:border-[#21409A] transition-colors"
            />
            
            <input 
              type="tel" 
              placeholder="Mobile*" 
              required
              value={formData.mobile}
              onChange={(e) => setFormData({...formData, mobile: e.target.value})}
              className="w-full border-b border-gray-300 pb-2 text-[15px] outline-none focus:border-[#21409A] transition-colors"
            />
            
            <input 
              type="email" 
              placeholder="Email*" 
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-b border-gray-300 pb-2 text-[15px] outline-none focus:border-[#21409A] transition-colors"
            />

            <label className="flex items-start gap-3 mt-2 cursor-pointer">
              <input 
                type="checkbox" 
                required
                checked={formData.consent}
                onChange={(e) => setFormData({...formData, consent: e.target.checked})}
                className="mt-1 w-4 h-4 rounded accent-[#21409A] shrink-0" 
              />
              <span className="text-[11px] text-gray-500 leading-snug">
                I authorize {propertyTitle} and its representatives to contact me with updates via SMS, Email, WhatsApp and Call about its details and offers. This consent overrides any registration for DNC / NDNC.
              </span>
            </label>

            <button 
              type="submit" 
              className="w-full mt-2 bg-[#8fa1cc] hover:bg-[#21409A] text-white py-3 rounded-[6px] font-semibold text-[15px] transition-colors"
            >
              Submit
            </button>
          </form>
        </div>

        {/* ================= RIGHT SIDE: IMAGE & GLASS BUTTONS ================= */}
        <div 
          className="hidden md:flex w-[50%] relative bg-cover bg-center items-center justify-center flex-col gap-4 p-8"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80')" }}
        >
          {/* Dark Overlay for better contrast */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Close Button (Top Right) */}
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute top-4 right-4 z-20 bg-black/40 hover:bg-black/60 text-white p-1.5 rounded-[6px] transition-colors"
          >
            <X size={20} />
          </button>

          {/* Glassmorphism Buttons */}
          <a href="tel:+918071737887" className="relative z-10 w-full max-w-[240px]">
            <div className="bg-white/20 backdrop-blur-md border border-white/40 text-white font-semibold py-3.5 px-6 rounded-[8px] flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/30 transition-all cursor-pointer">
              📞 Instant Call back
            </div>
          </a>
          
          <div className="relative z-10 w-full max-w-[240px]">
            <div className="bg-white/20 backdrop-blur-md border border-white/40 text-white font-semibold py-3.5 px-6 rounded-[8px] flex items-center justify-center gap-2 shadow-[0_8px_32px_rgba(0,0,0,0.1)] hover:bg-white/30 transition-all cursor-pointer">
              💰 Unmatched Price
            </div>
          </div>

        </div>

        {/* Mobile Close Button (Visible only on small screens) */}
        <button 
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 bg-gray-100 text-gray-500 p-1.5 rounded-full"
        >
          <X size={20} />
        </button>

      </div>
    </div>
  );
}