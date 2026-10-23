import React, { useState } from 'react';
import { VENUE_SPACES, VenueSpace } from '../data/resortData.ts';
import { LuxuryVisual } from './LuxuryVisual.tsx';
import { RevealUp } from './RevealUp.tsx';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface PortfolioGridProps {
  onSelectCase: (venue: VenueSpace) => void;
  onOpenInquiry?: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onSelectCase, onOpenInquiry }) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'BANQUET', 'LAWN', 'MANDAP', 'POOLSIDE'];

  const filteredSpaces = VENUE_SPACES.filter((item) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'BANQUET') return item.category.includes('BANQUET') || item.category.includes('BALLROOM');
    if (activeCategory === 'LAWN') return item.category.includes('LAWN') || item.category.includes('GARDEN');
    if (activeCategory === 'MANDAP') return item.category.includes('MANDAP') || item.category.includes('SACRED');
    if (activeCategory === 'POOLSIDE') return item.category.includes('POOLSIDE') || item.category.includes('PRE-WEDDING');
    return true;
  });

  return (
    <section
      id="spaces"
      className="py-24 lg:py-36 bg-[#FAFDFB] text-[#161726] overflow-hidden relative"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <RevealUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24 pb-6 sm:pb-8 border-b border-[#9FA1FF]/20">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="label-utility text-[#161726]/70">
                  PALATIAL WEDDING VENUES & CEREMONY ZONES
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#9FA1FF]"></span>
              </div>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726]">
                WEDDING VENUES
              </h2>
              <p className="font-cursive text-2xl sm:text-4xl text-[#9FA1FF] mt-2 font-normal">
                Palaces of Glass, Sacred Fire & Emerald Starlit Lawns
              </p>

              {/* Filter controls with clean rounded-lg tabs */}
              <div className="flex flex-wrap items-center gap-2 mt-6">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 cursor-pointer ${
                      activeCategory === cat
                        ? 'bg-[#161726] text-[#FAEE2F]'
                        : 'bg-[#D9F9DF]/60 text-[#161726]/70 hover:text-[#161726] hover:bg-[#B5BAFF]/30'
                    }`}
                  >
                    {cat === 'ALL' ? 'ALL WEDDING SPACES' : cat}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </RevealUp>

        {/* Two-column staggered grid where even item (right column) is offset downwards by 100px */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {filteredSpaces.map((item, index) => {
            const isRightColumn = index % 2 === 1;

            return (
              <div
                key={item.id}
                className={`relative group cursor-pointer ${
                  isRightColumn ? 'md:mt-[100px]' : ''
                }`}
                onClick={() => onSelectCase(item)}
              >
                <RevealUp delay={index * 120}>
                  {/* Image container: 3:4 aspect-ratio with 16px border-radius and realistic wedding resort imagery */}
                  <div className="relative">
                    <div className="relative aspect-[3/4] rounded-[16px] overflow-hidden bg-[#161726] shadow-xl border border-[#9FA1FF]/20">
                      <LuxuryVisual
                        src={item.image}
                        alt={item.alt}
                        aspectRatioClass="aspect-[3/4]"
                        className="rounded-[16px]"
                        title={item.title}
                        category={item.category}
                      />

                      {/* Centered 96px black circle with white 'View Space' text in 10px font on hover */}
                      <div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-500"
                        aria-hidden="true"
                      >
                        <div className="w-[96px] h-[96px] rounded-full bg-[#161726] text-[#FAEE2F] border border-[#9FA1FF]/40 flex items-center justify-center text-[10px] font-black tracking-widest uppercase text-center px-2 shadow-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                          VIEW VENUE
                        </div>
                      </div>

                      {/* Capacity tag: clean minimal rectangular badge without cylinder pill or typewriter font */}
                      <div className={`absolute top-6 ${isRightColumn ? 'left-6' : 'right-6'} z-20 pointer-events-none`}>
                        <span className="text-[10px] font-bold tracking-widest text-[#161726] bg-[#FAEE2F] px-3 py-1.5 rounded-md border border-[#161726]/10 uppercase shadow-sm">
                          {item.capacity}
                        </span>
                      </div>
                    </div>

                    {/* Badge 3: Anchored to the top-right corner of the venue card box */}
                    {index === 1 && (
                      <div className="absolute -top-12 right-2 sm:-top-18 sm:-right-6 md:-right-8 z-30 pointer-events-auto">
                        <WeddingDeskCircleBadge
                          id="badge-section-3"
                          badgeNumber="02"
                          title="ROYAL VENUES"
                          subtitle="Up to 2,000+"
                          statusText="BALLROOM & LAWN"
                          onClick={onOpenInquiry || (() => onSelectCase(VENUE_SPACES[0]))}
                          bounceDelay="1.6s"
                        />
                      </div>
                    )}
                  </div>

                  {/* Below images: category label in 10px bold tracking-widest, followed by 3xl title and tag metadata separated by bullet points */}
                  <div className="mt-8">
                    {/* Category label in 10px palette bold tracking-widest */}
                    <span className="text-[10px] font-black text-[#9FA1FF] tracking-[0.25em] uppercase block mb-1">
                      {item.category}
                    </span>

                    {/* 3xl title */}
                    <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#161726] mb-3 group-hover:text-[#9FA1FF] transition-colors">
                      {item.title}
                    </h3>

                    {/* Tag metadata separated by bullet points */}
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#161726]/75 uppercase tracking-wider">
                      {item.tags.map((tag, tIndex) => (
                        <React.Fragment key={tIndex}>
                          <span>{tag}</span>
                          {tIndex < item.tags.length - 1 && (
                            <span className="text-[#FAEE2F] font-black text-sm" aria-hidden="true">
                              •
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </RevealUp>
              </div>
            );
          })}
        </div>

        {/* Bottom invitation banner with cursive touch */}
        <RevealUp delay={200}>
          <div className="mt-28 p-10 bg-[#D9F9DF] rounded-[20px] border border-[#9FA1FF]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#161726]/60 mb-1">
                COMPLETE WEDDING RESIDENCY
              </p>
              <h4 className="text-2xl sm:text-3xl font-black uppercase text-[#161726] tracking-tight">
                PLANNING A MULTI-DAY ROYAL WEDDING?
              </h4>
              <p className="font-cursive text-2xl text-[#9FA1FF] font-normal my-1">
                "Where Baraats, Pheras & Sangeets Blossom in Grandeur"
              </p>
              <p className="text-sm text-[#161726]/80 mt-1 max-w-xl font-medium">
                Combine the Royal Sheesh Banquet Hall and Shahi Utsav Lawn for grand baraat arrivals, sanctified Saat Phere, and lavish wedding feasts with seamless family flow.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectCase(VENUE_SPACES[0])}
              className="px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase bg-[#161726] text-[#FAEE2F] hover:bg-[#FAEE2F] hover:text-[#161726] transition-all duration-500 whitespace-nowrap cursor-pointer shrink-0 shadow-lg"
            >
              SCHEDULE WEDDING WALKTHROUGH
            </button>
          </div>
        </RevealUp>
      </div>
    </section>
  );
};
