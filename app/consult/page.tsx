"use client";

import { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useRouter } from "next/navigation"; // <--- ADD THIS 

export default function ContactUsPage() {
    const router = useRouter(); // <--- ADD THIS INSIDE THE COMPONENT
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    source: "",
    location: "Bengaluru",
    budget: "",
    lookingFor: "Residential",
    message: "",
    consent: true,
  });

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
// (Later, you will put your database/email saving logic here)
    console.log(formData);
    
    // Redirect instantly to the thank you page!
    router.push('/thank-you');
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[350px] md:h-[450px] flex items-center justify-center lg:justify-start overflow-hidden">
        {/* Background Image (Replace with your actual dark house image) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80')" }}
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 via-black/50 to-black/30" />
        
        <div className="relative z-20 max-w-[1300px] w-full mx-auto px-6 pt-16">
          <h1 className="text-white text-[40px] md:text-[56px] font-bold tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <div className="max-w-[1300px] mx-auto px-6 mt-16 md:mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* ----- LEFT COLUMN: FORM ----- */}
          <div className="lg:col-span-7">
            <h2 className="text-[32px] md:text-[42px] font-bold text-[#0F1A2A] mb-4">
              Get in Touch
            </h2>
            <p className="text-[#374151] text-[15px] md:text-[16px] leading-[1.6] mb-12 max-w-[90%]">
              Unlock your property's full potential with our expert consultation. In just 30 minutes, 
              we'll provide in-depth insights into its value per square foot, empowering you to make 
              informed decisions and maximize your return on investment.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10">
              
              {/* Row 1: Name */}
              <div>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Name *" 
                  required
                  className="w-full border-b border-gray-300 pb-2 text-[15px] text-[#0F1A2A] placeholder-gray-400 outline-none focus:border-[#21409A] transition-colors bg-transparent"
                />
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email" 
                  className="w-full border-b border-gray-300 pb-2 text-[15px] text-[#0F1A2A] placeholder-gray-400 outline-none focus:border-[#21409A] transition-colors bg-transparent"
                />
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone number *" 
                  required
                  className="w-full border-b border-gray-300 pb-2 text-[15px] text-[#0F1A2A] placeholder-gray-400 outline-none focus:border-[#21409A] transition-colors bg-transparent"
                />
              </div>

              {/* Row 3: How did you find us */}
              <div className="relative">
                <select 
                  name="source"
                  value={formData.source}
                  onChange={handleInputChange}
                  className="w-full border-b border-gray-300 pb-2 text-[15px] text-[#0F1A2A] outline-none focus:border-[#21409A] transition-colors bg-transparent appearance-none cursor-pointer"
                >
                  <option value="" disabled className="text-gray-400">How did you find us?</option>
                  <option value="google">Google Search</option>
                  <option value="social">Social Media</option>
                  <option value="referral">Friend / Referral</option>
                  <option value="advertisement">Advertisement</option>
                </select>
                {/* Custom select arrow */}
                <div className="absolute right-0 top-1 pointer-events-none text-gray-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                </div>
              </div>

              {/* Row 4: Location Radios */}
              <div>
                <label className="block text-[16px] font-semibold text-[#0F1A2A] mb-4">Location</label>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {['Bengaluru', 'Pune', 'Hyderabad', 'Chennai'].map((loc) => (
                    <label key={loc} className="flex items-center gap-2.5 cursor-pointer">
                      <input 
                        type="radio" 
                        name="location" 
                        value={loc}
                        checked={formData.location === loc}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#21409A] cursor-pointer" 
                      />
                      <span className="text-[15px] text-[#374151]">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 5: Budget */}
              <div>
                <input 
                  type="text" 
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  placeholder="Budget" 
                  className="w-full border-b border-gray-300 pb-2 text-[15px] text-[#0F1A2A] placeholder-gray-400 outline-none focus:border-[#21409A] transition-colors bg-transparent"
                />
              </div>

              {/* Row 6: Looking For Radios */}
              <div>
                <label className="block text-[16px] font-semibold text-[#0F1A2A] mb-4">Looking for?</label>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  {['Residential', 'Commercial', 'Property Management', 'Interior Designing', 'Others'].map((type) => (
                    <label key={type} className="flex items-center gap-2.5 cursor-pointer">
                      <input 
                        type="radio" 
                        name="lookingFor" 
                        value={type}
                        checked={formData.lookingFor === type}
                        onChange={handleInputChange}
                        className="w-4 h-4 accent-[#21409A] cursor-pointer" 
                      />
                      <span className="text-[15px] text-[#374151]">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Row 7: Message */}
              <div>
                <input 
                  type="text" 
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Message" 
                  className="w-full border-b border-gray-300 pb-2 text-[15px] text-[#0F1A2A] placeholder-gray-400 outline-none focus:border-[#21409A] transition-colors bg-transparent"
                />
              </div>

              {/* Row 8: Consent Checkbox */}
              <label className="flex items-start gap-3 cursor-pointer mt-2">
                <input 
                  type="checkbox" 
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 rounded accent-[#21409A] cursor-pointer shrink-0" 
                />
                <span className="text-[14px] text-[#374151] leading-[1.6]">
                  I authorize Valuepersqft to contact me via SMS, Email, WhatsApp, and Call for updates and offers, overriding any DND/NDNC registration.
                </span>
              </label>

              {/* Submit Button */}
              <div>
                <button 
                  type="submit" 
                  className="bg-[#94A3B8] hover:bg-[#21409A] text-white font-semibold text-[15px] py-3.5 px-12 rounded-[6px] transition-colors w-[200px]"
                >
                  Submit
                </button>
              </div>

            </form>
          </div>

          {/* ----- RIGHT COLUMN: CALENDLY & INFO ----- */}
          <div className="lg:col-span-5">
            <div className="bg-[#fcfdfd] border border-gray-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)] rounded-[16px] p-6 md:p-8">
              
              <p className="text-[#374151] text-[15px] leading-[1.6] mb-8">
                We're here to help with all your real estate needs. For prompt, personalized support, 
                contact us by phone, email, or fill out the form below.
              </p>

              {/* Calendly Embed Box */}
              <div className="bg-white border border-gray-200 rounded-[12px] overflow-hidden mb-10 min-h-[400px]">
                {/* Replace the URL with your actual Calendly link */}
                <iframe 
                  src="https://calendly.com/YOUR_CALENDLY_URL_HERE?hide_gdpr_banner=1" 
                  width="100%" 
                  height="450" 
                  frameBorder="0" 
                  scrolling="no"
                  title="Schedule a Consultation"
                />
              </div>

              {/* Contact Info List */}
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0 text-[#0F1A2A]">
                    <MapPin size={22} strokeWidth={1.5} />
                  </div>
                  <p className="text-[#374151] text-[15px] leading-[1.6]">
                    1st floor, Tapaswiji Info Park, 184/185, EPIP Zone Whitefield Rd, opposite to 
                    Collins Aerospace Exit Gate, Kundalahalli, Whitefield, Bengaluru, Karnataka 560066
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="shrink-0 text-[#0F1A2A]">
                    <Phone size={22} strokeWidth={1.5} />
                  </div>
                  <a href="tel:+916366229758" className="text-[#374151] text-[15px] hover:text-[#21409A] transition-colors">
                    +91 6366229758
                  </a>
                </div>

                <div className="flex items-center gap-4">
                  <div className="shrink-0 text-[#0F1A2A]">
                    <Mail size={22} strokeWidth={1.5} />
                  </div>
                  <a href="mailto:Support@valuepersqft.com" className="text-[#374151] text-[15px] hover:text-[#21409A] transition-colors">
                    Support@valuepersqft.com
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}