'use client';
import { Phone, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  // Mapped to your actual Next.js routes
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Properties', href: '/properties/bengaluru' }, // Defaulting to Bengaluru as main hub
    { name: 'Blog', href: '/blogs' },
    { name: "For NRI's", href: '/nri' },
    { name: "FAQ's", href: '/faqs' },
    { name: 'Contact Us', href: '/consult' }
  ];

  return (
    <footer id="global-footer" className="bg-[#2a2a2a] pt-16 md:pt-20 pb-8 px-6 md:px-12 lg:px-20">
      <div className="max-w-[1300px] mx-auto">
        
        {/* === TOP GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Column 1: Brand & Contact Info */}
          <div className="lg:col-span-4 flex flex-col">
            {/* Logo Wrapper */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-30 h-10 flex items-center justify-center">
                <img src="/logo.png" alt="Lords Logo" className="w-24 h-24 object-contain" />
              </div>
            </div>

            <p className="text-[#e2e8f0] text-[15px] leading-[1.7] mb-8 pr-4">
              Lords Is Committed To Delivering A High Level Of Expertise, Customer Service, And Attention To Detail To Real Estate Home Buyer Or Investor
            </p>

            <div className="flex flex-col gap-4">
              <a href="tel:+919845803477" className="flex items-center gap-3 text-[#e2e8f0] hover:text-white transition-colors group">
                <Phone size={20} strokeWidth={1.5} className="group-hover:text-[#8b8b8b] transition-colors" />
                <span className="text-[15px]">+91 98458 03477</span>
              </a>
              
              <a href="mailto:rahul@lords.company" className="flex items-center gap-3 text-[#e2e8f0] hover:text-white transition-colors group">
                <Mail size={20} strokeWidth={1.5} className="group-hover:text-[#8b8b8b] transition-colors" />
                <span className="text-[15px]">rahul@lords.company</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-[18px] font-bold mb-6">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link href={link.href} className="text-[#e2e8f0] text-[15px] hover:text-white hover:underline underline-offset-4 transition-all">
                    {link.name}
                  </Link>
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
                <MapPin size={22} strokeWidth={1.5} className="text-[#e2e8f0] flex-shrink-0 mt-0.5 group-hover:text-[#8b8b8b] transition-colors" />
                <p className="text-[#e2e8f0] text-[14px] leading-[1.6]">
               Lords & Co. No. 69/458/69, RMZ Latitude, 10th floor, Bellary Road, Hebbal, Bengaluru, Karnataka 560024.</p>
              </div>         
            </div>
          </div>

        </div>

        {/* === BOTTOM DIVIDER & COPYRIGHT === */}
        <div className="mt-16 pt-8 border-t border-gray-700/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#94a3b8] text-[14px]">
            Copyright Lords @{currentYear}. All Rights Reserved.
          </p>
          
          <div className="flex gap-6">
            <Link href="/terms" className="text-[#e2e8f0] text-[14px] hover:text-white transition-colors">
              Terms Of Use
            </Link>
            <Link href="/privacy" className="text-[#e2e8f0] text-[14px] hover:text-white transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}