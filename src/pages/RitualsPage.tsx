import React from 'react';
import { Heart, Flame, Users, Calendar, ArrowRight, Sun, Music } from 'lucide-react';
import { RevealUp } from '../components/RevealUp.tsx';

import { LuxuryVisual } from '../components/LuxuryVisual.tsx';

interface RitualsPageProps {
  onOpenInquiry: () => void;
}

export const RitualsPage: React.FC<RitualsPageProps> = ({ onOpenInquiry }) => {
  const weddingRituals = [
    {
      number: "01",
      name: "HALDI CEREMONY",
      timing: "Morning 10:00 AM",
      venue: "Poolside & Courtyard",
      image: "/images/gallery/smr-48.jpg",
      description: "Sunlit yellow cabana setups with fresh marigold floral decor, brass urlis, organic yellow turmeric paste, and lively Punjabi & Bihari dhol folk songs.",
      curatedBy: "Courtyard & Waterbody Pavilion"
    },
    {
      number: "02",
      name: "MEHNDI SOIRÉE",
      timing: "Afternoon 02:00 PM",
      venue: "Shaded Garden Canopies",
      image: "/images/gallery/smr-76.jpg",
      description: "Master bridal henna artists, custom bangle bazaars, live street chaat stalls, and relaxed lounge seating for both families to celebrate together.",
      curatedBy: "Garden Canopy Terraces"
    },
    {
      number: "03",
      name: "SANGEET MUSICAL EXTRAVAGANZA",
      timing: "Evening 07:00 PM",
      venue: "The Sheesh Ballroom / Shahi Lawn",
      image: "/images/gallery/smr-13.jpg",
      description: "Full stage truss lighting, acoustic concert sound system, professional DJ consoles, and elevated dance stages for family choreographed dances.",
      curatedBy: "Central Climate-Controlled Ballroom"
    },
    {
      number: "04",
      name: "THE GRAND BARAAT",
      timing: "Night 08:00 PM",
      venue: "Royal Reception Avenue",
      image: "/images/gallery/smr-08.jpg",
      description: "Wide illuminated corridor allowing horse carriages, vintage cars, and brass band processions, followed by traditional rosewater Milni welcoming.",
      curatedBy: "Dedicated Entry Corridor"
    },
    {
      number: "05",
      name: "CINEMATIC VARMALA",
      timing: "Night 09:30 PM",
      venue: "Elevated Royal Stage",
      image: "/images/gallery/smr-57.jpg",
      description: "Hydraulic revolving stage with cold-pyro fireworks, low-lying fog, shower of fresh rose petals, and synchronized thematic lighting.",
      curatedBy: "40ft Pillarless Royal Stage"
    },
    {
      number: "06",
      name: "SACRED SAAT PHERE",
      timing: "Midnight 12:30 AM",
      venue: "Royal Mandap Pavilion",
      image: "/images/gallery/smr-54.jpg",
      description: "Consecrated Vedic havan kund with specialized smoke extraction, tiered family baithak seating, and sacred Sanskrit chanting for the seven eternal vows.",
      curatedBy: "Consecrated Fire Altar Pavilion"
    }
  ];

  return (
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="py-8 sm:py-12 border-b border-[#26532B]/20 mb-12 sm:mb-16">
          <span className="label-utility text-[#1D261E]/70">
            THE CHRONOLOGY OF ROYAL CELEBRATIONS
          </span>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#1D261E] mt-2">
            WEDDING RITUALS
          </h1>
          <p className="font-cursive text-2xl sm:text-4xl text-[#26532B] mt-2 font-normal">
            Every Sacred Rite Honored with Palatial Grandeur
          </p>
          <p className="text-base sm:text-lg text-[#1D261E]/75 max-w-3xl mt-4 font-normal">
            From the joyful yellow showers of the Haldi to the solemn majesty of the Saat Phere under starry skies, Sheesh Mahal Resort provides customized environments tailored to each auspicious milestone.
          </p>
        </div>

        {/* Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {weddingRituals.map((ritual, idx) => (
            <RevealUp key={idx} delay={idx * 50}>
              <div className="p-5 sm:p-7 bg-[#FAF6EE] rounded-[24px] border border-[#26532B]/30 shadow-md h-full flex flex-col justify-between group hover:border-[#E88A1A] transition-all duration-500 hover:shadow-xl">
                <div>
                  {/* Photo Visual */}
                  <div className="relative aspect-[16/10] rounded-[16px] overflow-hidden mb-5 bg-[#1D261E]">
                    <LuxuryVisual
                      src={ritual.image}
                      alt={ritual.name}
                      aspectRatioClass="aspect-[16/10]"
                      title={ritual.name}
                      category={`RITUAL ${ritual.number}`}
                    />
                    <div className="absolute top-3 right-3 z-10">
                      <span className="text-[9px] font-black uppercase tracking-wider bg-[#E88A1A] text-[#1D261E] px-2.5 py-1 rounded-md shadow">
                        {ritual.timing}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-[#26532B] tracking-wider">
                      RITUAL {ritual.number}
                    </span>
                    <span className="text-xs font-semibold text-[#1D261E]/60">
                      {ritual.venue}
                    </span>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight text-[#1D261E] mb-2">
                    {ritual.name}
                  </h3>

                  <p className="text-xs text-[#1D261E]/80 leading-relaxed font-normal mb-5">
                    {ritual.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#26532B]/20 flex items-center justify-between text-[11px] font-bold text-[#1D261E]/70">
                  <span className="uppercase tracking-wider text-[10px] text-[#26532B]">{ritual.curatedBy}</span>
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="text-xs font-black uppercase tracking-wider text-[#1D261E] hover:text-[#26532B] cursor-pointer"
                  >
                    PLAN →
                  </button>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>

        {/* Full Wedding Residency CTA */}
        <div className="p-10 lg:p-14 bg-[#26532B] rounded-[28px] border border-[#26532B]/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1D261E]/70 block mb-1">
              3-DAY WEDDING RESIDENCY
            </span>
            <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#1D261E]">
              BOOK THE ENTIRE RESORT FOR YOUR WEDDING
            </h3>
            <p className="font-cursive text-2xl text-[#26532B] mt-1 mb-2 font-normal">
              Exclusive Access to Both Lawns, Ballrooms & Bridal Suites
            </p>
            <p className="text-xs sm:text-sm text-[#1D261E]/80 max-w-2xl font-normal">
              Ensure unmatched privacy and ease for your entire extended family by reserving all venues exclusively for your wedding dates.
            </p>
          </div>
          <button
            type="button"
            onClick={onOpenInquiry}
            className="px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase bg-[#1D261E] text-[#E88A1A] hover:bg-[#E88A1A] hover:text-[#1D261E] transition-colors cursor-pointer shadow-lg whitespace-nowrap"
          >
            CHECK AUSPICIOUS DATES
          </button>
        </div>
      </div>
    </div>
  );
};
