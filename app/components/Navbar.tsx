"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About us", href: "/about-us" },
    { name: "Properties", href: "/properties" },
    { name: "NRI", href: "/nri" },
    { name: "FAQ's", href: "/faqs" },
    { name: "Blogs", href: "/blogs" },
  ];

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-10 flex justify-between items-center h-20">  
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${
              scrolled ? "bg-blue-600 text-white" : "bg-white/20 text-white"
            }`}
          >
            <span className="font-bold text-lg">V</span>
          </div>
          <span
            className={`text-l font-semibold transition-colors duration-300 ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            ValuePerSqft
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-sm transition-colors duration-300 ${
                  scrolled ? "text-gray-500" : "text-white"
                }`}
              >
                {link.name}

                {/* Active underline */}
                {isActive && (
                  <span className="absolute left-0 text-[#2556D0] -bottom-1 w-full h-[2.5px] bg-[#2556D0]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* CTA */}
        <div className="hidden lg:block">
          <button
            className={`px-5 py-2 rounded-xl font-medium border transition-all duration-300 flex items-center gap-2 ${
              scrolled
                ? "border-gray-300 text-gray-800 hover:bg-gray-100"
                : "border-white text-white hover:bg-white hover:text-gray-900"
            }`}
          >
            Consult us →
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            className={`transition-colors ${
              scrolled ? "text-gray-800" : "text-white"
            }`}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}