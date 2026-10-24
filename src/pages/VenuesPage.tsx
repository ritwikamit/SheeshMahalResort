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
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAFDFB] text-[#161726]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="py-8 sm:py-12 border-b border-[#9FA1FF]/20 mb-12 sm:mb-16">
          <span className="label-utility text-[#161726]/70">
            DEDICATED ARCHITECTURAL SHOWCASE
          </span>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726] mt-2">
            ROYAL WEDDING VENUES
          </h1>
          <p className="font-cursive text-2xl sm:text-4xl text-[#9FA1FF] mt-2 font-normal">
            Breathtaking Ballrooms, Sacred Mandaps & Starlit Lawns
          </p>
          <p className="text-base sm:text-lg text-[#161726]/75 max-w-3xl mt-4 font-normal">
            Sheesh Mahal Resort offers over 45,000 sq. ft. of combined indoor and outdoor royal wedding space on Ashiana–Digha Road, Patna. Each zone is architecturally engineered for specific wedding rites.
          </p>
        </div>

        {/* Detailed Space Cards */}
        <div className="space-y-16 sm:space-y-24">
          {VENUE_SPACES.map((space, index) => (
            <RevealUp key={space.id} delay={index * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-5 sm:p-8 lg:p-12 bg-[#FAFDFB] rounded-[24px] sm:rounded-[28px] border border-[#9FA1FF]/30 shadow-xl">
                {/* Visual */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[20px] overflow-hidden shadow-2xl border border-[#9FA1FF]/20 bg-[#161726] relative group cursor-pointer max-w-lg mx-auto" onClick={() => onSelectSpace(space)}>
                    <LuxuryVisual
                      src={space.image}
                      alt={space.alt}
                      aspectRatioClass="aspect-[3/4]"
                      className="rounded-[20px]"
                      title={space.title}
                      category={space.category}
                    />
                    <div className="absolute top-4 right-4 bg-[#FAEE2F] text-[#161726] px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-wider shadow">
                      {space.capacity}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#9FA1FF] block mb-2">
                    {space.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#161726] mb-2">
                    {space.title}
                  </h2>
                  <p className="font-cursive text-2xl text-[#9FA1FF] mb-4 font-normal">
                    {space.area} · {space.idealFor}
                  </p>
                  <p className="text-sm text-[#161726]/80 leading-relaxed mb-6 font-normal">
                    {space.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {space.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#161726] font-semibold">
                        <CheckCircle2 size={16} className="text-[#9FA1FF] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#9FA1FF]/20">
                    <button
                      type="button"
                      onClick={() => onSelectSpace(space)}
                      className="px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase bg-[#161726] text-[#FAEE2F] hover:bg-[#FAEE2F] hover:text-[#161726] transition-colors cursor-pointer"
                    >
                      VIEW DOSSIER & SPECS
                    </button>
                    <button
                      type="button"
                      onClick={onOpenInquiry}
                      className="px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase bg-[#D9F9DF] text-[#161726] hover:bg-[#B5BAFF] transition-colors cursor-pointer border border-[#9FA1FF]/30"
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
