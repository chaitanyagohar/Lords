'use client';
import { useRef } from 'react';
import { Phone, Mail, Target, HeartHandshake, Play } from 'lucide-react';
import TrustExpertiseSection from '../components/TrustExpertiseSection';

// --- DATA ARRAYS ---
const teamData = [
  {
    id: 1,
    name: 'Sanjay Kothari',
    role: 'Managing Director & Founder',
    desc: 'Whether it is working with a first-time homebuyer, a luxury home listing or a seasoned inv......Know more',
    image: '/team-1.jpg' // Replace with actual images
  },
  {
    id: 2,
    name: 'Ritangsha',
    role: 'General Manager - Operations',
    desc: "Ritangsha's knowledge, honesty, integrity, and fairness have been evident throughout her c......Know more",
    image: '/team-2.jpg'
  },
  {
    id: 3,
    name: 'Moinak Roy',
    role: 'General Manager',
    desc: 'Moinak is a distinguished Sales Manager at Valuepersqft whose expertise in the Bangalore r......Know more',
    image: '/team-3.jpg'
  },
  {
    id: 4,
    name: 'Tanmay',
    role: 'Asst. General Manager',
    desc: "With years of experience in residential real estate, he's helped countless clients find th......Know more",
    image: '/team-4.jpg'
  },
  {
    id: 5,
    name: 'Siddarth Nair',
    role: 'City Head, Chennai',
    desc: 'With extensive experience in real estate across Bangalore and Hyderabad, I am now venturin......Know more',
    image: '/team-5.jpg'
  }
];

const achievementsData = [
  {
    id: 1,
    title: 'Top Performer Award from Prestige Group for the year 2022-2023.',
    image: '/achieve-1.jpg'
  },
  {
    id: 2,
    title: 'Top Performer Award - Brigade El Dorado (2023)',
    image: '/achieve-2.jpg'
  },
  {
    id: 3,
    title: 'Leading Business Partner Award from Brigade Group for the year 2021 - 2022',
    image: '/achieve-3.jpg'
  },
  {
    id: 4,
    title: 'Leading Business Partner Award from Prestige Group for the year 2022 - 2023',
    image: '/achieve-4.jpg'
  }
];

export default function AboutUsPage() {
  const scrollRef = useRef(null);

  return (
    <div className="bg-[#fcfdfd] min-h-screen w-full overflow-x-hidden">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative h-[250px] md:h-[400px] flex items-end overflow-hidden pb-6 md:pb-12">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/buildings.jpg')", // Replace with your city buildings image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-[#000000]/50" />
        
        <div className="relative z-10 w-full max-w-[1300px] mx-auto px-4 md:px-6">
          <h1 className="text-[32px] md:text-[56px] font-bold text-white tracking-tight drop-shadow-sm">
            About Us
          </h1>
        </div>
      </section>

      {/* ================= INTRO TEXT ================= */}
      <section className="bg-white py-10 md:py-16 border-b border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 text-[#374151] text-[15px] md:text-[18px] leading-relaxed">
          <p className="mb-4">
            At Valuepersqft, we approach real estate as a strategic and personal milestone. We guide you through every phase—buying, selling, investing, or managing-with expert insight and genuine support.<br className="hidden md:block" />
            We focus on transparency, professionalism, and delivering lasting value-not on aggressive sales tactics.
          </p>
          <p>
            Let's turn your real estate journey from "What if I am wrong?" to <strong>"I made the right choice."</strong>
          </p>
        </div>
      </section>

      {/* ================= ABOUT VALUEPERSQFT ================= */}
      <section className="bg-[#0F1A2A] py-12 md:py-24">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-20">
          
          <div className="w-full md:w-1/2">
            <h2 className="text-[28px] md:text-[44px] font-bold text-white mb-4 md:mb-6 leading-tight">
              About Valuepersqft
            </h2>
            <p className="text-[#cbd5e1] text-[15px] md:text-[18px] leading-relaxed pr-0 lg:pr-8">
              At Valuepersqft, our commitment to honest guidance and insightful consultation has earned us the trust of a growing customer base-with a 4.9-star rating on Google Reviews and over 1 million views on YouTube, our digital presence reflects the confidence people place in us.
            </p>
          </div>

          <div className="w-full md:w-1/2">
            <img 
              src="/about_vpsf.jpg" 
              alt="About Valuepersqft" 
              className="w-full h-auto rounded-[16px] md:rounded-[24px] shadow-2xl object-cover"
            />
          </div>

        </div>
      </section>

      {/* ================= KEY FIGURES ================= */}
      <section className="bg-white py-16 md:py-32">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
          <h2 className="hidden md:block text-center font-semibold text-[#0F1A2A] text-[40px] leading-[61.6px] tracking-[0px] mb-16">
            7+ Years of Trust & Guidance
          </h2>
          <h2 className="md:hidden text-center font-semibold text-[#0F1A2A] text-[24px] leading-[33.6px] tracking-[0px] mb-8">
            Key Figures
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { value: "30+", label: "Developers" },
              { value: "70+", label: "Projects" },
              { value: "10000+", label: "Real Estate Consultations" },
              { value: "4000+", label: "Inventory Sold" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-[16px] md:rounded-[20px] py-8 px-3 md:py-14 md:px-6 text-center shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-50"
              >
                <div className="font-bold text-[#1E2A3B] text-[24px] md:text-[44px] leading-[30px] md:leading-[1.2] mb-1 md:mb-3">
                  {stat.value}
                </div>
                <div className="font-medium text-[#5b6472] text-[13px] md:text-[18px] leading-[17.5px] md:leading-[28px] px-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= SMARTER PROPERTY DECISIONS ================= */}
      <section className="bg-[#0F1A2A] py-16 md:py-32">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
          
          <h2 className="text-center text-[28px] md:text-[48px] font-bold text-white mb-10 md:mb-16 leading-tight">
            Helping You Make Smarter<br className="md:hidden"/> Property Decisions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-6 md:mb-8">
            
            <div className="border border-white/20 rounded-[16px] md:rounded-[24px] p-6 md:p-12">
              <Target className="text-white mb-4 md:mb-6 w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
              <h3 className="text-white text-[20px] md:text-[32px] font-semibold mb-3 md:mb-4">
                Right Realtor, Right Deal
              </h3>
              <p className="text-[#cbd5e1] text-[14px] md:text-[17px] leading-relaxed">
                You deserve transparent guidance from experts who prioritize your goals, not commissions. We carefully evaluate builders, agents, and projects - What we suggest is backed by facts, not partnerships.
              </p>
            </div>

            <div className="border border-white/20 rounded-[16px] md:rounded-[24px] p-6 md:p-12">
              <HeartHandshake className="text-white mb-4 md:mb-6 w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
              <h3 className="text-white text-[20px] md:text-[32px] font-semibold mb-3 md:mb-4">
                Honest, Not Hyped
              </h3>
              <p className="text-[#cbd5e1] text-[14px] md:text-[17px] leading-relaxed">
                Some properties aren't worth your time - and we will tell you. Expect clear advice, not sales talk. If a property doesn't make sense, we won't spin it. Our role is to protect your investment, not push a sale.
              </p>
            </div>

          </div>

          <div className="bg-[#12223a] border border-white/10 rounded-[16px] md:rounded-[24px] overflow-hidden flex flex-col md:flex-row items-center">
            <div className="w-full md:w-[50%] relative">
              <img 
                src="/smarter-video.jpg" 
                alt="Smarter With Every View"
                className="w-full h-[200px] md:h-full object-cover md:min-h-[250px]" 
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-black/70 md:bg-black/60 rounded-full flex items-center justify-center backdrop-blur-sm cursor-pointer hover:scale-110 transition-transform">
                  <Play className="text-white ml-1 w-5 h-5 md:w-7 md:h-7" fill="white" />
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-[50%] p-6 md:p-12 lg:p-16">
              <h3 className="text-white text-[20px] md:text-[36px] font-semibold mb-3 md:mb-4 leading-tight">
                Smarter With Every View
              </h3>
              <p className="text-[#cbd5e1] text-[14px] md:text-[17px] leading-relaxed">
                With 1M+ views on YouTube, our free knowledge is your superpower. Our videos break down complex decisions into simple truths - helping you move forward with clarity.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= MEET OUR TEAM ================= */}
      <section className="bg-white py-16 md:py-32">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-[28px] md:text-[48px] font-bold text-[#0F1A2A] mb-10 md:mb-16">
            Meet our team
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8">
            {teamData.map((member) => (
              <div key={member.id} className="bg-white rounded-[16px] md:rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border border-gray-100 overflow-hidden flex flex-col">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-[280px] md:h-[260px] object-cover bg-gray-200"
                />
                <div className="p-5 md:p-6 flex flex-col flex-grow">
                  <h3 className="text-[18px] md:text-[20px] font-bold text-[#0F1A2A] mb-1">{member.name}</h3>
                  <p className="text-[#5b6472] text-[13px] md:text-[14px] font-medium mb-3 md:mb-4">{member.role}</p>
                  <p className="text-[#5b6472] text-[13px] md:text-[14px] leading-relaxed mb-5 flex-grow">
                    {member.desc}
                  </p>
                  
                  <div className="flex gap-3 mt-auto">
                    <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#21409A] hover:bg-[#21409A] hover:text-white transition-colors">
                      <Phone size={16} />
                    </a>
                    <a href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-200 flex items-center justify-center text-[#21409A] hover:bg-[#21409A] hover:text-white transition-colors">
                      <Mail size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= OUR ACHIEVEMENTS ================= */}
      <section className="bg-[#fcfdfd] py-16 md:py-24 overflow-hidden border-t border-gray-100">
        <div className="max-w-[1300px] mx-auto px-4 md:px-6">
          <h2 className="text-center text-[28px] md:text-[48px] font-bold text-[#0F1A2A] mb-8 md:mb-12">
            Our Achievements
          </h2>

          <div 
            ref={scrollRef}
            className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6 md:pb-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {achievementsData.map((item) => (
              <div 
                key={item.id} 
                className="flex flex-col w-[85vw] sm:w-[320px] md:w-[380px] flex-shrink-0 snap-start"
              >
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-[200px] md:h-[260px] object-cover rounded-[12px] md:rounded-[16px] mb-4 md:mb-5 shadow-md border border-gray-100"
                />
                <h3 className="text-[14px] md:text-[17px] font-medium text-[#374151] leading-relaxed px-1">
                  {item.title}
                </h3>
              </div>
            ))}
          </div>

        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .scrollbar-hide::-webkit-scrollbar {
              display: none;
          }
        `}} />
      </section>
            <TrustExpertiseSection />
    </div>
  );
}