'use client';

import { Search, ArrowRight } from "lucide-react";
import KnowledgePill from "../components/KnowledgePill";

const featuredBlog = {
  title: "Prestige Somerville Review: A Look at Whitefield’s Newest Residential Project",
  image: "/blog-1.png", // Replace with your actual image
  date: { month: "May", day: "13" },
  link: "/blog/prestige-somerville"
};

const blogs = [
  {
    id: 1,
    title: "Prestige Somerville Review: A Look at Whitefield’s Newest Residential Project",
    image: "/blog-1.png",
    date: { month: "May", day: "13" },
    link: "/blog/prestige-somerville"
  },
  {
    id: 2,
    title: "Prestige Somerville Review: A Look at Whitefield’s Newest Residential Project",
    image: "/blog-1.png",
    date: { month: "Oct", day: "1" },
    link: "/blog/prestige-somerville-2"
  },
];

export default function BlogsPage() {
  return (
    <div className="bg-[#ffffff] min-h-screen">

      {/* ================= HERO ================= */}
      {/* Adjusted height so it doesn't take up the full screen, matching the design */}
      <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/image-1.png')", // Ensure your building image is here
            backgroundSize: "cover",
            backgroundPosition: "center 30%"
          }}
        />

        {/* Dark Overlay to make text pop */}
        <div className="absolute inset-0 bg-[#0a1c35]/40" />

        {/* Bottom White Gradient to blend into the page */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-white via-white/5 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center w-full max-w-3xl px-6 -mt-10">
          <h1 className="text-[40px] md:text-[56px] font-bold text-white mb-8 md:mb-12 tracking-tight">
            Blog
          </h1>

          {/* Search Bar - Frosted dark gray/blue look matching the screenshot */}
          <div className="flex bg-[#4a586e]/80 backdrop-blur-md rounded-xl p-1.5 md:p-2 shadow-2xl border border-white/10">
            <div className="flex items-center flex-1 px-4">
              <Search className="text-white/70 mr-3" size={20} />
              <input
                type="text"
                placeholder="Search Blogs"
                className="bg-transparent outline-none text-white placeholder-white/80 w-full text-[15px] md:text-[16px]"
              />
            </div>

            <button className="bg-white text-[#0F1A2A] px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-sm">
              Search
            </button>
          </div>
        </div>
      </section>

      {/* ================= FEATURED ================= */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-6 -mt-24 md:-mt-32 relative z-20">
        <div className="bg-white rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.08)] overflow-hidden flex flex-col md:flex-row border border-gray-100">

          {/* Image Side */}
          <div className="w-full md:w-1/2 relative min-h-[280px] md:min-h-0">
            <img
              src={featuredBlog.image}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Featured Blog"
            />

            {/* Floating Date Badge */}
            <div className="absolute bottom-3 right-6 md:right-8 bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center w-[60px] h-[68px] z-10">
              <span className="text-[#0F1A2A] text-[13px] font-medium leading-none mb-1">
                {featuredBlog.date.month}
              </span>
              <span className="text-[#0F1A2A] text-[22px] font-bold leading-none">
                {featuredBlog.date.day}
              </span>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            
            {/* Featured Badge */}
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#2b4c9b] border border-[#2b4c9b]/20 px-4 py-1.5 rounded-full w-fit mb-6">
              FEATURED
            </span>

            <h2 className="text-[26px] md:text-[36px] font-bold text-[#0F1A2A] leading-[1.3] mb-8">
              {featuredBlog.title}
            </h2>

            <a href={featuredBlog.link} className="inline-flex items-center gap-2 text-[#2b4c9b] font-medium text-[16px] hover:gap-3 transition-all w-fit">
              Read More <ArrowRight size={18} strokeWidth={2} />
            </a>

          </div>
        </div>
      </section>

      {/* ================= BLOG GRID ================= */}
      <section className="max-w-[1300px] mx-auto px-4 md:px-6 mt-16 md:mt-24 pb-16">
        
        {/* Used a 3-column grid for large screens to match the card proportions in your screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="group bg-white rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 flex flex-col overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300"
            >
              {/* Image & Date */}
              <div className="relative h-[240px] bg-gray-100">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute -bottom-6 right-6 bg-white rounded-[12px] shadow-[0_4px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center w-[60px] h-[68px] z-10">
                  <span className="text-[#0F1A2A] text-[13px] font-medium leading-none mb-1">
                    {blog.date.month}
                  </span>
                  <span className="text-[#0F1A2A] text-[22px] font-bold leading-none">
                    {blog.date.day}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <h3 className="text-[18px] md:text-[20px] font-semibold text-[#0F1A2A] leading-[1.4] mb-6 group-hover:text-[#2b4c9b] transition-colors line-clamp-3">
                  {blog.title}
                </h3>

                <a href={blog.link} className="inline-flex items-center gap-2 text-[#2b4c9b] font-medium text-[15px] hover:gap-3 transition-all mt-auto">
                  Read More <ArrowRight size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          ))}

        </div>

        {/* ================= PAGINATION ================= */}
        <div className="flex justify-center items-center gap-4 mt-20 md:mt-24">
          <button className="text-gray-400 hover:text-[#0F1A2A] transition-colors px-1 text-lg">«</button>
          <button className="text-gray-400 hover:text-[#0F1A2A] transition-colors px-1 text-lg">‹</button>

          <div className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-[10px] bg-white text-[#0F1A2A] font-medium shadow-sm">
            1
          </div>

          <button className="text-gray-400 hover:text-[#0F1A2A] transition-colors px-1 text-lg">›</button>
          <button className="text-gray-400 hover:text-[#0F1A2A] transition-colors px-1 text-lg">»</button>
        </div>

      </section>

      {/* ================= KNOWLEDGE PILL ================= */}
      <KnowledgePill />

    </div>
  );
}