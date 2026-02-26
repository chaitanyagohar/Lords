'use client';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0D263B] pt-16 md:pt-20 pb-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1300px] mx-auto">
        
        {/* === TOP GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Logo Wrapper */}
            <div className="flex items-center gap-3 mb-6">
              {/* Replace with your actual white logo */}
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <img src="/logo-icon.png" alt="ValuePerSqft Logo" className="w-6 h-6 object-contain" />
              </div>
              <span className="text-white text-[22px] font-bold tracking-wide">
                ValuePerSqft
              </span>
            </div>

            <p className="text-[#e2e8f0] text-[15px] leading-[1.7] mb-8 pr-4">
              Valuepersqft Is Committed To Delivering A High Level Of Expertise, Customer Service, And Attention To Detail To Real Estate Home Buyer Or Investor
            </p>

            <div className="flex flex-col gap-4">
              <a href="tel:+916366229758" className="flex items-center gap-3 text-[#e2e8f0] hover:text-white transition-colors group">
                <Phone size={20} strokeWidth={1.5} className="group-hover:text-[#3b82f6] transition-colors" />
                <span className="text-[15px]">+91 6366229758</span>
              </a>
              
              <a href="mailto:Support@Valuepersqft.com" className="flex items-center gap-3 text-[#e2e8f0] hover:text-white transition-colors group">
                <Mail size={20} strokeWidth={1.5} className="group-hover:text-[#3b82f6] transition-colors" />
                <span className="text-[15px]">Support@Valuepersqft.com</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-[18px] font-bold mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              {['Home', 'About Us', 'Property', 'Blog', 'Services', "For NRI's", 'Contact Us'].map((link, idx) => (
                <li key={idx}>
                  <a href="#" className="text-[#e2e8f0] text-[15px] hover:text-white hover:underline underline-offset-4 transition-all">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Offices */}
          <div className="lg:col-span-5">
            <h4 className="text-white text-[18px] font-bold mb-6">
              Offices
            </h4>
            
            <div className="flex flex-col gap-6">
              {/* Office 1 */}
              <div className="flex items-start gap-3.5 group">
                <MapPin size={22} strokeWidth={1.5} className="text-[#e2e8f0] flex-shrink-0 mt-0.5 group-hover:text-[#3b82f6] transition-colors" />
                <p className="text-[#e2e8f0] text-[14px] leading-[1.6]">
                  1st floor, Tapaswiji Info Park, 184/185, EPIP Zone Whitefield Rd, opposite to Collins Aerospace Exit Gate, Kundalahalli, Whitefield, Bengaluru, Karnataka - 560066
                </p>
              </div>

              {/* Office 2 */}
              <div className="flex items-start gap-3.5 group">
                <MapPin size={22} strokeWidth={1.5} className="text-[#e2e8f0] flex-shrink-0 mt-0.5 group-hover:text-[#3b82f6] transition-colors" />
                <p className="text-[#e2e8f0] text-[14px] leading-[1.6]">
                  CoKarma - Coworking Space, 3rd Floor, Myscapa Weave, Myscape Rd, Ground Floor & First Floor, Nanakramguda, Hyderabad, Telangana - 500032
                </p>
              </div>

              {/* Office 3 */}
              <div className="flex items-start gap-3.5 group">
                <MapPin size={22} strokeWidth={1.5} className="text-[#e2e8f0] flex-shrink-0 mt-0.5 group-hover:text-[#3b82f6] transition-colors" />
                <p className="text-[#e2e8f0] text-[14px] leading-[1.6]">
                  Awfis space solutions, Centre Point, No.2/4 Mount Poonamallee High Road, Manapakkam, Chennai - 600089
                </p>
              </div>

              {/* Office 4 */}
              <div className="flex items-start gap-3.5 group">
                <MapPin size={22} strokeWidth={1.5} className="text-[#e2e8f0] flex-shrink-0 mt-0.5 group-hover:text-[#3b82f6] transition-colors" />
                <p className="text-[#e2e8f0] text-[14px] leading-[1.6]">
                  Office No - 15A, 4th Floor, Suite No. - 1277, City Vista, Tower A, Kharadi Pune, Maharashtra - 411014
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* === BOTTOM DIVIDER & COPYRIGHT === */}
        <div className="mt-16 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#94a3b8] text-[14px]">
            Copyright Valuepersqft @2024. All Rights Reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="/terms" className="text-[#e2e8f0] text-[14px] hover:text-white transition-colors">
              Terms Of Use
            </a>
            <a href="/privacy" className="text-[#e2e8f0] text-[14px] hover:text-white transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}