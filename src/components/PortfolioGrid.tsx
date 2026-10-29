import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { VENUE_SPACES, VenueSpace } from '../data/resortData.ts';
import { LuxuryVisual } from './LuxuryVisual.tsx';
import { RevealUp } from './RevealUp.tsx';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface PortfolioGridProps {
  onSelectCase: (venue: VenueSpace) => void;
  onOpenInquiry?: () => void;
  onOpenGallery?: () => void;
}

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({
  onSelectCase,
  onOpenInquiry,
  onOpenGallery
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('ALL');

  const categories = ['ALL', 'BANQUET', 'BARAAT', 'SANGEET', 'HALDI'];

  const filteredSpaces = VENUE_SPACES.filter((item) => {
    if (activeCategory === 'ALL') return true;
    if (activeCategory === 'BANQUET') return item.category.includes('BANQUET') || item.category.includes('BALLROOM');
    if (activeCategory === 'BARAAT') return item.category.includes('BARAAT') || item.category.includes('RUNWAY');
    if (activeCategory === 'SANGEET') return item.category.includes('SANGEET') || item.category.includes('MEHNDI');
    if (activeCategory === 'HALDI') return item.category.includes('HALDI') || item.category.includes('GARDEN');
    return true;
  });

  return (
    <section
      id="spaces"
      className="py-24 lg:py-36 bg-[#FAF6EE] text-[#1D261E] overflow-hidden relative"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <RevealUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-24 pb-6 sm:pb-8 border-b border-[#26532B]/20">
            <div className="w-full">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="label-utility text-[#1D261E]/70">
                  PALATIAL WEDDING VENUES & CEREMONY ZONES
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#26532B]"></span>
              </div>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#1D261E]">
                WEDDING VENUES
              </h2>
              <p className="font-cursive text-2xl sm:text-4xl text-[#26532B] mt-2 font-normal">
                Palaces of Glass, Sacred Fire & Emerald Starlit Lawns
              </p>

              {/* Filter controls and See All Photos Button */}
              <div className="flex flex-wrap items-center justify-between gap-3 mt-6">
                <div className="flex flex-wrap items-center gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 cursor-pointer ${
                        activeCategory === cat
                          ? 'clay-btn-gold text-white shadow-xs'
                          : 'clay-pill text-[#1D261E] hover:text-[#E88A1A]'
                      }`}
                    >
                      {cat === 'ALL' ? 'ALL WEDDING SPACES' : cat}
                    </button>
                  ))}
                </div>

                {onOpenGallery && (
                  <button
                    type="button"
                    onClick={onOpenGallery}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] sm:text-xs font-black tracking-widest uppercase clay-btn-gold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                  >
                    <span>SEE ALL PHOTOS</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </RevealUp>

        {/* 4-Column Compact Grid: Prevents excessive zooming and preserves ultra-sharp portrait quality */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7 items-start">
          {filteredSpaces.map((item, index) => {
            return (
              <div
                key={item.id}
                className="relative group cursor-pointer flex flex-col h-full clay-card p-3 sm:p-4 border border-white/60 hover:border-[#E88A1A]/40 transition-all duration-300"
                onClick={() => onSelectCase(item)}
              >
                <RevealUp delay={index * 80}>
                  {/* Image container: compact 3:4 portrait aspect-ratio ensuring zero pixelation or zoom */}
                  <div className="relative aspect-[3/4] rounded-[14px] overflow-hidden bg-[#1D261E] shadow-md border border-[#26532B]/15">
                    <LuxuryVisual
                      src={item.image}
                      alt={item.alt}
                      aspectRatioClass="aspect-[3/4]"
                      className="rounded-[14px]"
                      title={item.title}
                      category={item.category}
                    />

                    {/* Centered hover action badge */}
                    <div
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 transition-all duration-300"
                      aria-hidden="true"
                    >
                      <div className="w-[84px] h-[84px] rounded-full bg-[#1D261E]/90 text-[#E88A1A] border border-[#E88A1A]/40 flex items-center justify-center text-[9px] font-black tracking-widest uppercase text-center px-2 shadow-2xl opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
                        VIEW VENUE
                      </div>
                    </div>

                    {/* Capacity tag: minimal compact badge */}
                    <div className="absolute top-3 right-3 z-20 pointer-events-none">
                      <span className="text-[9px] font-black tracking-wider text-[#1D261E] bg-[#E88A1A] px-2.5 py-1 rounded-md border border-[#1D261E]/10 uppercase shadow-sm">
                        {item.capacity}
                      </span>
                    </div>
                  </div>

                  {/* Below image: category, title, area, description, and action link */}
                  <div className="mt-4 flex flex-col flex-grow">
                    <span className="text-[9px] font-black text-[#26532B] tracking-[0.25em] uppercase block mb-1">
                      {item.category}
                    </span>

                    <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#1D261E] mb-1 group-hover:text-[#E88A1A] transition-colors leading-tight">
                      {item.title}
                    </h3>

                    <p className="font-cursive text-base sm:text-lg text-[#26532B] mb-2 font-normal">
                      {item.area}
                    </p>

                    <p className="text-xs text-[#1D261E]/75 leading-relaxed mb-3 font-normal line-clamp-3">
                      {item.description}
                    </p>

                    <div className="pt-2.5 mt-auto border-t border-[#26532B]/20 flex items-center justify-between text-xs font-bold text-[#1D261E]/70">
                      <span className="text-[#26532B] font-black tracking-wider uppercase text-[9px]">
                        {item.idealFor.split('&')[0]}
                      </span>
                      <span className="text-[#1D261E] group-hover:text-[#E88A1A] flex items-center gap-1 text-[10px] font-black uppercase tracking-wider transition-colors">
                        DETAILS →
                      </span>
                    </div>
                  </div>
                </RevealUp>
              </div>
            );
          })}
        </div>

        {/* Dedicated SEE ALL PHOTOS Action Bar */}
        {onOpenGallery && (
          <RevealUp delay={150}>
            <div className="mt-16 sm:mt-20 text-center flex flex-col items-center justify-center p-8 sm:p-10 clay-card border border-white/80">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#26532B] block mb-2">
                COMPLETE VISUAL ARCHIVES
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase text-[#1D261E] tracking-tight mb-2">
                WITNESS OUR AUTHENTIC WEDDING SPACES
              </h3>
              <p className="font-cursive text-xl sm:text-3xl text-[#26532B] mb-6 font-normal max-w-xl">
                Explore real wedding photographs of our starlit lawns, crystal ballrooms & Vedic mandaps
              </p>
              <button
                type="button"
                onClick={onOpenGallery}
                className="inline-flex items-center gap-3 px-8 sm:px-10 py-4 rounded-xl text-xs sm:text-sm font-black tracking-[0.2em] uppercase clay-btn-dark px-8 sm:px-10 py-4 text-xs sm:text-sm font-black tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer group"
              >
                <span>SEE ALL PHOTOS IN GALLERY</span>
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </div>
          </RevealUp>
        )}

        {/* Bottom invitation banner with cursive touch */}
        <RevealUp delay={200}>
          <div className="mt-20 sm:mt-24 p-8 sm:p-10 clay-card-teal flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#1D261E]/60 mb-1">
                COMPLETE WEDDING RESIDENCY
              </p>
              <h4 className="text-2xl sm:text-3xl font-black uppercase text-[#1D261E] tracking-tight">
                PLANNING A MULTI-DAY ROYAL WEDDING?
              </h4>
              <p className="font-cursive text-2xl text-[#26532B] font-normal my-1">
                "Where Baraats, Pheras & Sangeets Blossom in Grandeur"
              </p>
              <p className="text-sm text-[#1D261E]/80 mt-1 max-w-xl font-medium">
                Combine the Royal Sheesh Banquet Hall and Shahi Utsav Lawn for grand baraat arrivals, sanctified Saat Phere, and lavish wedding feasts with seamless family flow.
              </p>
            </div>
            <button
              type="button"
              onClick={() => onSelectCase(VENUE_SPACES[0])}
              className="px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase clay-btn-dark px-8 py-3.5 text-xs font-black tracking-widest uppercase transition-all duration-300 cursor-pointer shrink-0"
            >
              SCHEDULE WEDDING WALKTHROUGH
            </button>
          </div>
        </RevealUp>
      </div>
    </section>
  );
};
