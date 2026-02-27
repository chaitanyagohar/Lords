"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

  // Condition for light pages (like /properties)
  const isLightPage = pathname.startsWith("/properties");
  const useDarkNav = scrolled || isLightPage;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <div className="max-w-[1400px] mx-auto px-2 flex justify-between items-center h-16">
        
        {/* ================= LOGO ================= */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex items-center justify-center transition-transform group-hover:scale-105">
            {/* Replicated Logo Shape from Image */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 21L3 12L5.5 9.5L12 16L18.5 9.5L21 12L12 21Z" fill="#21409A"/>
                <path d="M12 15L6 9L8.5 6.5L12 10L15.5 6.5L18 9L12 15Z" fill="#21409A" opacity="0.8"/>
            </svg>
          </div>
          <span
            className={`text-[22px] font-bold tracking-tight transition-colors duration-300 ${
              useDarkNav ? "text-[#21409A]" : "text-white"
            }`}
          >
            ValuePerSqft
          </span>
        </Link>

        {/* ================= DESKTOP NAV ================= */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => {
            const isActive = link.hasDropdown 
              ? pathname.includes("/properties") 
              : pathname === link.href;

            // EXACT COLORS FROM IMAGE: 
            // Active: #21409A | Inactive: #64748B (Muted Gray-Blue)
            const textColorClass = useDarkNav
              ? isActive ? "text-[#21409A]" : "text-[#64748B] hover:text-[#21409A]"
              : isActive ? "text-white" : "text-white/60 hover:text-white";

            const underlineColorClass = useDarkNav ? "bg-[#21409A]" : "bg-white";

            return (
              <div key={link.name} className="relative h-16 flex items-center" ref={link.hasDropdown ? dropdownRef : null}>
                {link.hasDropdown ? (
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`relative text-[16px] font-small transition-colors duration-200 flex items-center gap-1 bg-transparent border-none outline-none ${textColorClass}`}
                  >
                    {link.name}
                    {isActive && (
                      <span className={`absolute left-0 bottom-[-4px] w-full h-[2px] animate-fade-in ${underlineColorClass}`}></span>
                    )}
                  </button>
                ) : (
                  <Link
                    href={link.href}
                    className={`relative text-[16px] font-medium transition-colors duration-200 ${textColorClass}`}
                  >
                    {link.name}
                    {isActive && (
                      <span className={`absolute left-0 bottom-[-2px] w-full h-[2px] animate-fade-in ${underlineColorClass}`}></span>
                    )}
                  </Link>
                )}

                {/* DROPDOWN MENU */}
                {link.hasDropdown && isDropdownOpen && (
                  <div className="absolute top-[100%] left-0 w-[200px] bg-white rounded-lg shadow-xl border border-gray-100 py-2 flex flex-col animate-in fade-in slide-in-from-top-2 duration-200">
                    {link.children?.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        className="px-4 py-2.5 text-[15px] font-medium text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#21409A] transition-colors"
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
              className={`px-7 py-2.5 rounded-[6px] font-semibold text-[15px] transition-all duration-300 flex items-center gap-2 ${
                useDarkNav
                  ? "bg-[#21409A] text-white hover:bg-[#1a337e] shadow-sm"
                  : "bg-transparent text-white border border-white/50 hover:bg-white hover:text-[#21409A]"
              }`}
            >
              Consult us <ArrowRight size={18} strokeWidth={2.5} />
            </button>
          </Link>
        </div>

        {/* ================= MOBILE TOGGLE ================= */}
        <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={useDarkNav ? "text-[#21409A]" : "text-white"}>
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
        </div>

      </div>
    </header>
  );
}