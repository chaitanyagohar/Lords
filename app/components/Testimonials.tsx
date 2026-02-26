'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Raghvendra Patel",
    image: "/testimonials/user-1.jpg",
    text: `We had a fantastic experience working with Swaroop from Valuepersqft for the purchase of our apartment. His professionalism, expertise, and approachable nature made the entire process seamless.

I highly recommend Swaroop from Valuepersqft. Thank you for your outstanding service!`
  },
  {
    name: "Ananya Sharma",
    image: "/testimonials/user-2.jpg",
    text: `Valuepersqft made our buying journey smooth and transparent. Highly professional and reliable team.`
  },
  {
    name: "Rahul Mehta",
    image: "/testimonials/user-3.jpg",
    text: `Their data-driven insights helped us make a confident investment decision.`
  },
  {
    name: "Priya Kapoor",
    image: "/testimonials/user-4.jpg",
    text: `Excellent service from start to finish. Everything was handled professionally.`
  },
  {
    name: "Vikram Desai",
    image: "/testimonials/user-5.jpg",
    text: `Highly recommended for anyone looking for transparent and expert property guidance.`
  }
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const testimonial = testimonials[active];

  return (
    <section className="bg-[#072D4A] text-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row md:justify-between gap-12 md:gap-24">

        {/* LEFT SIDE */}
        <div className="md:w-[45%]">
          <h2 className="text-[24px] md:text-[36px] font-semibold leading-[1.2] mb-8 md:mb-10">
            What our customers are <br className="hidden md:block" />
            saying us?
          </h2>

          <div className="flex gap-12 md:gap-14">

            <div>
              <div className="text-[22px] md:text-xl font-semibold">500+</div>
              <div className="mt-1 text-[14px] md:text-[15px] text-white/90">
                Happy People
              </div>
            </div>

            <div>
              <div className="text-[22px] md:text-xl font-semibold">4.9</div>
              <div className="mt-1 text-[14px] md:text-[15px] text-white/90">
                Overall rating
              </div>

              <div className="flex gap-1 mt-2 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="relative md:w-[45%]">

          {/* Quote image (desktop position) */}
          <img
            src="/group.png"
            alt="quote"
            className="hidden md:block absolute right-0 top-0 w-[40px] opacity-100 pointer-events-none"
          />

          {/* Profile + Name */}
          <div className="flex items-center gap-4 mb-4 md:mb-6 relative">

            {/* Mobile quote beside name */}
            <img
              src="/group.png"
              alt="quote"
              className="md:hidden absolute right-0 top-0 w-[22px] opacity-90 pointer-events-none"
            />

            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border border-white/30"
            />

            <div className="text-[18px] md:text-[20px] font-semibold">
              {testimonial.name}
            </div>
          </div>

          {/* Text */}
          <p className="text-white/90 leading-[1.65] whitespace-pre-line mb-8 text-[14px] md:text-[17px] md:max-w-[520px]">
            {testimonial.text}
          </p>

          {/* Controls */}
          <div className="flex gap-4 justify-center md:justify-start">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center border border-white/20"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center border border-white/20"
            >
              <ChevronRight size={18} />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}