import React from 'react';
import { VENUE_SPACES, VenueSpace } from '../data/resortData.ts';
import { LuxuryVisual } from '../components/LuxuryVisual.tsx';
import { RevealUp } from '../components/RevealUp.tsx';
import { Users, Building2, CheckCircle2, ArrowRight } from 'lucide-react';

interface VenuesPageProps {
  onSelectSpace: (space: VenueSpace) => void;
  onOpenInquiry: () => void;
}

export const VenuesPage: React.FC<VenuesPageProps> = ({ onSelectSpace, onOpenInquiry }) => {
  return (
    <div className="pt-[78px] sm:pt-[88px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      
      {/* Landscaped Hero Banner */}
      <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden bg-[#151D16] mb-8 sm:mb-12">
        <img
          src="/images/gallery/LandingPage3.webp"
          alt="Sheesh Mahal Resort Palatial Venues"
          className="w-full h-full object-cover object-center scale-105 filter brightness-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-[#151D16]/75 to-black/60" />

        <div className="absolute inset-0 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-8 sm:pb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="label-utility text-[#E88A1A]">
              DEDICATED ARCHITECTURAL SHOWCASE
            </span>
            <span className="w-8 h-[1px] bg-[#E88A1A]"></span>
            <span className="text-[10px] font-black tracking-widest text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm uppercase">
              45,000+ SQ. FT.
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.85] text-white drop-shadow-md">
            ROYAL WEDDING VENUES
          </h1>

          <p className="font-cursive text-xl sm:text-3xl text-[#E88A1A] mt-1 font-normal drop-shadow-sm">
            Breathtaking Ballrooms, Sacred Mandaps & Starlit Lawns
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Intro Lead */}
        <div className="pb-8 border-b border-[#26532B]/20 mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#1D261E]/85 max-w-3xl font-medium leading-relaxed">
            Sheesh Mahal Resort offers over 45,000 sq. ft. of combined indoor and outdoor royal wedding space on Ashiana–Digha Road, Patna. Each zone is architecturally engineered for specific wedding rites with backup generators, luxury suites, and all-faith ceremony hospitality.
          </p>
        </div>

        {/* Detailed Space Cards */}
        <div className="space-y-16 sm:space-y-24">
          {VENUE_SPACES.map((space, index) => (
            <RevealUp key={space.id} delay={index * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-5 sm:p-8 lg:p-12 clay-card">
                {/* Visual */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[20px] overflow-hidden shadow-2xl border border-[#26532B]/20 bg-[#1D261E] relative group cursor-pointer max-w-lg mx-auto" onClick={() => onSelectSpace(space)}>
                    <LuxuryVisual
                      src={space.image}
                      alt={space.alt}
                      aspectRatioClass="aspect-[3/4]"
                      className="rounded-[20px]"
                      title={space.title}
                      category={space.category}
                    />
                    <div className="absolute top-4 right-4 bg-[#E88A1A] text-[#1D261E] px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-wider shadow">
                      {space.capacity}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#26532B] block mb-2">
                    {space.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#1D261E] mb-2">
                    {space.title}
                  </h2>
                  <p className="font-cursive text-2xl text-[#26532B] mb-4 font-normal">
                    {space.area} · {space.idealFor}
                  </p>
                  <p className="text-sm text-[#1D261E]/80 leading-relaxed mb-6 font-normal">
                    {space.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {space.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#1D261E] font-semibold">
                        <CheckCircle2 size={16} className="text-[#26532B] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#26532B]/20">
                    <button
                      type="button"
                      onClick={() => onSelectSpace(space)}
                      className="px-6 py-3 clay-btn-dark text-xs font-black tracking-widest uppercase cursor-pointer"
                    >
                      VIEW DOSSIER & SPECS
                    </button>
                    <button
                      type="button"
                      onClick={onOpenInquiry}
                      className="px-6 py-3 clay-btn-teal text-xs font-black tracking-widest uppercase cursor-pointer"
                    >
                      CHECK DATES
                    </button>
                  </div>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </div>
  );
};
