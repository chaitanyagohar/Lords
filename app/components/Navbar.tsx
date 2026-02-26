"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // FIX 1: Tell TypeScript this ref is for an HTML Div Element
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle clicking outside the dropdown to close it
  useEffect(() => {
    // FIX 2: Define event as a 'MouseEvent'
    const handleClickOutside = (event: MouseEvent) => {
      // FIX 3: Cast event.target as a 'Node' so .contains() accepts it
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu & dropdown on route change
  useEffect(() => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { 
      name: "Properties", 
      href: "#",
      hasDropdown: true,
      children: [
        { name: "Bengaluru", href: "/properties/bengaluru" },
        { name: "Chennai", href: "/properties/chennai" },
        { name: "Hyderabad", href: "/properties/hyderabad" },
        { name: "Pune", href: "/properties/pune" },
      ]
    },
    { name: "NRI", href: "/nri" },
    { name: "FAQ's", href: "/faqs" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)] py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-center h-16">
        
        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* Replicated Logo Icon */}
          <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18L3 8L6.5 4.5L12 11L17.5 4.5L21 8L12 18Z" fill="#21409A"/>
            </svg>
          </div>
          <span
            className={`text-[20px] font-bold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-[#0F1A2A]" : "text-white"
            }`}
          >
            ValuePerSqft
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
          {navLinks.map((link) => {
            // Check if active (handle the dropdown case as well)
            const isActive = link.hasDropdown 
              ? pathname.includes("/properties") 
              : pathname === link.href;

            return (
              <div key={link.name} className="relative" ref={link.hasDropdown ? dropdownRef : null}>
                {link.hasDropdown ? (
                  // DROPDOWN TRIGGER
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`relative text-[15px] font-medium transition-colors duration-300 pb-1 flex items-center gap-1 ${
                      scrolled 
                        ? isActive ? "text-[#21409A]" : "text-[#5b6472] hover:text-[#0F1A2A]"
                        : "text-white hover:text-white/80"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-[2.5px] bg-[#21409A] rounded-t-sm animate-fade-in"></span>
                    )}
                  </button>
                ) : (
                  // STANDARD LINK
                  <Link
                    href={link.href}
                    className={`relative text-[15px] font-medium transition-colors duration-300 pb-1 ${
                      scrolled 
                        ? isActive ? "text-[#21409A]" : "text-[#5b6472] hover:text-[#0F1A2A]"
                        : isActive ? "text-white" : "text-white/90 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className={`absolute left-0 -bottom-1 w-full h-[2.5px] rounded-t-sm animate-fade-in ${
                        scrolled ? "bg-[#21409A]" : "bg-white"
                      }`}></span>
                    )}
                  </Link>
                )}

                {/* DROPDOWN MENU */}
                {link.hasDropdown && (
                  <div
                    className={`absolute top-[140%] -left-4 w-[180px] bg-white rounded-[12px] shadow-[0_15px_40px_rgba(0,0,0,0.12)] border border-gray-100 py-3 flex flex-col transition-all duration-300 origin-top-left ${
                      isDropdownOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    {link.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="px-5 py-2.5 text-[15px] font-medium text-[#374151] hover:bg-[#f4f7fb] hover:text-[#21409A] transition-colors"
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

        {/* ================= CTA BUTTON ================= */}
        <div className="hidden lg:block">
          <Link href="/consult">
            <button
              className={`px-6 py-2.5 rounded-[8px] font-medium text-[15px] transition-all duration-300 flex items-center gap-2 ${
                scrolled
                  ? "bg-[#21409A] text-white hover:bg-[#1a337e] shadow-md border border-transparent"
                  : "bg-transparent text-white border border-white/60 hover:bg-white hover:text-[#0F1A2A]"
              }`}
            >
              Consult us <ArrowRight size={18} strokeWidth={2} />
            </button>
          </Link>
        </div>

        {/* ================= MOBILE MENU BUTTON ================= */}
        <div className="lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`transition-colors p-2 ${
              scrolled ? "text-[#0F1A2A]" : "text-white"
            }`}
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

      </div>

      {/* ================= MOBILE DROPDOWN OVERLAY ================= */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col py-4 px-6 animate-fade-in">
          {navLinks.map((link) => (
            <div key={link.name}>
              {link.hasDropdown ? (
                <>
                  <div className="py-3 text-[16px] font-semibold text-[#0F1A2A] border-b border-gray-100">
                    {link.name}
                  </div>
                  <div className="flex flex-col pl-4 py-2 border-b border-gray-100">
                    {link.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="py-2.5 text-[15px] font-medium text-[#5b6472]"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block py-3 text-[16px] font-semibold text-[#0F1A2A] border-b border-gray-100"
                >
                  {link.name}
                </Link>
              )}
            </div>
          ))}
          <button className="mt-6 w-full bg-[#21409A] text-white py-3 rounded-[8px] font-medium flex justify-center items-center gap-2">
            Consult us <ArrowRight size={18} />
          </button>
        </div>
      )}

    </header>
  );
}