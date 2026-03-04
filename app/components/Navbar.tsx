"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, X, Menu } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Mobile specific states
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Condition for light pages (like /properties)
  const isLightPage = pathname.startsWith("/properties");
  const useDarkNav = scrolled || isLightPage;

  // Handle Scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle Click Outside for Desktop Dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setMobileDropdownOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { 
      name: "Properties", 
      href: "#",
      hasDropdown: true,
      children: [
        { name: "Bengaluru", href: "/properties/bengaluru" },
        { name: "Mumbai", href: "/properties/mumbai" },
        { name: "Hyderabad", href: "/properties/hyderabad" },
        { name: "Pune", href: "/properties/pune" },
        { name: "Dubai", href: "/properties/dubai" },
      ]
    },
    { name: "NRI", href: "/nri" },
    { name: "FAQ's", href: "/faqs" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        useDarkNav 
          ? "bg-white shadow-[0_2px_15px_rgba(0,0,0,0.04)] py-1" 
          : "bg-transparent py-4"
      }`}
    >
      <div className="relative z-[110] max-w-[1400px] mx-auto px-4 lg:px-2 flex justify-between items-center h-16">
        
        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center transition-transform group-hover:scale-105">
            <img
              src="/logo.png"
              alt="Company Logo"
              className="w-30 h-7 object-cover"
            />
          </div>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = link.hasDropdown 
              ? pathname.includes("/properties") 
              : pathname === link.href;

            // Updated hover states to use your brand color (#2a2a2a)
            const textColorClass = useDarkNav
              ? isActive ? "text-[#2a2a2a]" : "text-[#64748B] hover:text-[#2a2a2a]"
              : isActive ? "text-white" : "text-white/70 hover:text-white";

            // Updated underline color to tie in with the logo when scrolled
            const underlineColorClass = useDarkNav ? "bg-[#2a2a2a]" : "bg-white";

            return (
              <div key={link.name} className="relative h-16 flex items-center" ref={link.hasDropdown ? dropdownRef : null}>
                {link.hasDropdown ? (
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`relative text-[16px] font-medium transition-colors duration-200 flex items-center gap-1.5 bg-transparent border-none outline-none ${textColorClass}`}
                  >
                    {link.name}
                    <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    {isActive && (
                      <span className={`absolute left-0 bottom-[14px] w-full h-[2px] animate-fade-in ${underlineColorClass}`}></span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative text-[16px] font-medium transition-colors duration-200 ${textColorClass}`}
                  >
                    {link.name}
                    {isActive && (
                      <span className={`absolute left-0 bottom-[-4px] w-full h-[2px] animate-fade-in ${underlineColorClass}`}></span>
                    )}
                  </Link>
                )}

                {/* DESKTOP DROPDOWN MENU */}
                {link.hasDropdown && isDropdownOpen && (
                  <div className="absolute top-[80%] left-0 w-[200px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                    {link.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="px-5 py-2.5 text-[15px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#2a2a2a] transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* ================= DESKTOP CTA BUTTON ================= */}
        <div className="hidden lg:block">
          <Link href="/consult">
            <button
              className={`px-7 py-2.5 rounded-[6px] font-semibold text-[15px] transition-all duration-300 flex items-center gap-2 ${
                useDarkNav
                  // Fixed contrast bug: using brand color #2a2a2a instead of light gray so white text is visible
                  ? "bg-[#2a2a2a] text-white hover:bg-black shadow-sm"
                  : "bg-transparent text-white border border-white/50 hover:bg-white hover:text-[#2a2a2a]"
              }`}
            >
              Consult us <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </Link>
        </div>

        {/* ================= MOBILE TOGGLE BUTTON ================= */}
        <div className="lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className={`p-1 transition-colors duration-300 ${useDarkNav || isMobileMenuOpen ? "text-[#2a2a2a]" : "text-white"}`}
            >
              {isMobileMenuOpen ? (
                <X size={28} strokeWidth={2} />
              ) : (
                <Menu size={28} strokeWidth={2.5} />
              )}
            </button>
        </div>

      </div>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <div 
        className={`fixed inset-0 bg-white z-[100] lg:hidden flex flex-col transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="h-24 w-full shrink-0"></div>

        <nav className="flex flex-col px-6 py-4 gap-6 overflow-y-auto flex-grow">
          {navLinks.map((link) => {
            const isActive = link.hasDropdown 
              ? pathname.includes("/properties") 
              : pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div key={link.name} className="flex flex-col border-b border-gray-100 pb-4">
                  <button
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                    className={`flex justify-between items-center text-[18px] font-semibold w-full ${
                      isActive || mobileDropdownOpen ? "text-[#2a2a2a]" : "text-[#0F1A2A]"
                    }`}
                  >
                    {link.name}
                    <ChevronDown size={20} className={`transition-transform duration-300 ${mobileDropdownOpen ? "rotate-180 text-[#2a2a2a]" : "text-[#64748B]"}`} />
                  </button>
                  
                  <div 
                    className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ease-in-out ${
                      mobileDropdownOpen ? "max-h-[300px] mt-4 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {link.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-[16px] font-medium text-[#64748B] pl-4 hover:text-[#2a2a2a] border-l-2 border-transparent hover:border-[#2a2a2a] transition-colors py-1"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              );
            }

            return (
              <div key={link.name} className="border-b border-gray-100 pb-4">
                <Link
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[18px] font-semibold block ${isActive ? "text-[#2a2a2a]" : "text-[#0F1A2A]"}`}
                >
                  {link.name}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Mobile CTA */}
        <div className="p-6 pb-8 shrink-0 bg-white">
          <Link href="/consult" onClick={() => setIsMobileMenuOpen(false)}>
            {/* Fixed contrast bug: applied brand color to the mobile button as well */}
            <button className="w-full bg-[#2a2a2a] text-white py-4 rounded-[8px] font-semibold text-[16px] flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              Consult us <ArrowRight size={20} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}