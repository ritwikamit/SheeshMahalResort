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
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#F5F5F5] text-[#303841]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Page Header */}
        <div className="py-8 sm:py-12 border-b border-[#76ABAE]/20 mb-12 sm:mb-16">
          <span className="label-utility text-[#303841]/70">
            DEDICATED ARCHITECTURAL SHOWCASE
          </span>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#303841] mt-2">
            ROYAL WEDDING VENUES
          </h1>
          <p className="font-cursive text-2xl sm:text-4xl text-[#76ABAE] mt-2 font-normal">
            Breathtaking Ballrooms, Sacred Mandaps & Starlit Lawns
          </p>
          <p className="text-base sm:text-lg text-[#303841]/75 max-w-3xl mt-4 font-normal">
            Sheesh Mahal Resort offers over 45,000 sq. ft. of combined indoor and outdoor royal wedding space on Ashiana–Digha Road, Patna. Each zone is architecturally engineered for specific wedding rites.
          </p>
        </div>

        {/* Detailed Space Cards */}
        <div className="space-y-16 sm:space-y-24">
          {VENUE_SPACES.map((space, index) => (
            <RevealUp key={space.id} delay={index * 100}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center p-5 sm:p-8 lg:p-12 clay-card">
                {/* Visual */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="rounded-[20px] overflow-hidden shadow-2xl border border-[#76ABAE]/20 bg-[#303841] relative group cursor-pointer max-w-lg mx-auto" onClick={() => onSelectSpace(space)}>
                    <LuxuryVisual
                      src={space.image}
                      alt={space.alt}
                      aspectRatioClass="aspect-[3/4]"
                      className="rounded-[20px]"
                      title={space.title}
                      category={space.category}
                    />
                    <div className="absolute top-4 right-4 bg-[#FF5722] text-[#303841] px-3.5 py-1.5 rounded-md text-xs font-black uppercase tracking-wider shadow">
                      {space.capacity}
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className={`lg:col-span-6 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#76ABAE] block mb-2">
                    {space.category}
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#303841] mb-2">
                    {space.title}
                  </h2>
                  <p className="font-cursive text-2xl text-[#76ABAE] mb-4 font-normal">
                    {space.area} · {space.idealFor}
                  </p>
                  <p className="text-sm text-[#303841]/80 leading-relaxed mb-6 font-normal">
                    {space.description}
                  </p>

                  {/* Highlights Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {space.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#303841] font-semibold">
                        <CheckCircle2 size={16} className="text-[#76ABAE] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-[#76ABAE]/20">
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
