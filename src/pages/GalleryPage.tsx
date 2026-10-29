import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar, Sparkles } from 'lucide-react';
import { LuxuryVisual } from '../components/LuxuryVisual.tsx';
import { RevealUp } from '../components/RevealUp.tsx';

import { ALL_GALLERY_PHOTOS, GalleryItem } from '../data/galleryData.ts';

interface GalleryPageProps {
  onOpenInquiry: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems = ALL_GALLERY_PHOTOS;

  const categories = ['ALL', 'BANQUET', 'LAWN', 'MANDAP', 'DECOR', 'FACADE', 'CATERING'];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  // Lightbox navigation
  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, filteredItems.length]);

  return (
    <div className="pt-[88px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Page Header */}
        <div className="py-8 sm:py-12 border-b border-[#26532B]/20 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="label-utility text-[#1D261E]/70">
                OFFICIAL RESORT PHOTO ARCHIVE
              </span>
              <span className="w-8 h-[1px] bg-[#26532B]"></span>
              <span className="text-[9px] font-black tracking-widest text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm uppercase">
                {filteredItems.length} REAL PHOTOS
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#1D261E] mt-2">
              PHOTO GALLERY
            </h1>
            
            <p className="font-cursive text-2xl sm:text-4xl text-[#26532B] mt-2 font-normal">
              Authentic Glimpse into Royal Ceremonies & Palatial Grounds
            </p>
            <p className="text-xs sm:text-sm text-[#1D261E]/75 mt-3 max-w-2xl font-normal">
              Every photograph below captures real celebrations, grand ballrooms, starlit lawns, and sacred mandaps at Sheesh Mahal Resort, Ashiana–Digha Road, Patna.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#1D261E] text-[#E88A1A] shadow-sm'
                    : 'bg-[#26532B] text-[#1D261E]/70 hover:text-[#1D261E] hover:bg-[#E88A1A]/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {filteredItems.map((item, idx) => (
            <RevealUp key={item.id} delay={(idx % 4) * 35}>
              <div
                onClick={() => openLightbox(idx)}
                className="group rounded-[20px] overflow-hidden bg-[#FAF6EE] border border-[#26532B]/25 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer flex flex-col h-full transform hover:-translate-y-1"
              >
                {/* Visual */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D261E]">
                  <LuxuryVisual
                    src={item.image}
                    alt={item.title}
                    aspectRatioClass="aspect-[4/3]"
                    title={item.title}
                    category={item.category}
                    priority={idx < 8}
                  />

                  {/* Hover Overlay with Tap to Enlarge */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-[#E88A1A] text-[#1D261E] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 size={18} />
                    </div>
                  </div>

                  {/* Corner Category Tag */}
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between border-t border-[#26532B]/15">
                  <div>
                    <h3 className="text-base sm:text-lg font-black uppercase tracking-tight text-[#1D261E] group-hover:text-[#26532B] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#26532B] font-cursive mt-0.5">
                      {item.caption}
                    </p>
                    <p className="text-[11px] sm:text-xs text-[#1D261E]/75 mt-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#26532B]/10 flex items-center justify-between text-[9px] font-bold tracking-wider uppercase text-[#1D261E]/60">
                    <span>SHEESH MAHAL PATNA</span>
                    <span className="text-[#26532B] group-hover:translate-x-1 transition-transform">
                      VIEW FULL →
                    </span>
                  </div>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>

        {/* Bottom Booking Invitation */}
        <RevealUp delay={150}>
          <div className="p-8 sm:p-12 bg-[#1D261E] text-[#FAF6EE] rounded-[24px] border border-[#26532B]/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#E88A1A] block mb-2">
                RESERVE YOUR WEDDING DATES
              </span>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight">
                VISIT SHEESH MAHAL RESORT IN PERSON
              </h3>
              <p className="font-cursive text-xl sm:text-3xl text-[#26532B] mt-1 mb-3">
                "Where Sacred Vows Meet Royal Grandeur"
              </p>
              <p className="text-xs sm:text-sm text-[#26532B] leading-relaxed">
                Experience our palatial banquet ballrooms, consecrated Mandaps, and starlit lawns live. Open 24 hours daily opposite St. Xavier's College gate, Ashiana–Digha Road, Patna.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-xs font-black tracking-widest uppercase bg-[#E88A1A] text-[#1D261E] hover:bg-[#FAF6EE] transition-all duration-300 shadow-xl cursor-pointer hover:scale-105 active:scale-95 text-center"
              >
                <Calendar size={15} />
                <span>CHECK WEDDING DATES</span>
              </button>
            </div>
          </div>
        </RevealUp>

      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          {/* Top Bar with Title & Close */}
          <div
            className="flex items-center justify-between z-20 shrink-0 pb-3 border-b border-white/15 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#1D261E] bg-[#E88A1A] px-2.5 py-1 rounded-sm">
                {filteredItems[activeLightboxIndex].category}
              </span>
              <div>
                <h4 className="text-sm sm:text-lg font-black uppercase tracking-tight text-white">
                  {filteredItems[activeLightboxIndex].title}
                </h4>
                <p className="font-cursive text-xs sm:text-sm text-[#26532B]">
                  {filteredItems[activeLightboxIndex].caption}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-white/60 mr-2 hidden sm:inline">
                {activeLightboxIndex + 1} / {filteredItems.length}
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close fullscreen preview"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Central Image with Prev / Next Arrow Controls */}
          <div
            className="relative flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Previous Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#E88A1A] hover:text-[#1D261E] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Main Preview Image */}
            <img
              key={filteredItems[activeLightboxIndex].id}
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] max-w-[92vw] object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/20 select-none animate-in zoom-in-95 duration-200"
            />

            {/* Next Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#E88A1A] hover:text-[#1D261E] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Bar: Description & Book Dates CTA */}
          <div
            className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-white/15 text-white z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs sm:text-sm text-white/80 max-w-2xl text-center sm:text-left font-normal">
              {filteredItems[activeLightboxIndex].description}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  closeLightbox();
                  onOpenInquiry();
                }}
                className="px-6 py-2.5 rounded-lg text-xs font-black tracking-widest uppercase bg-[#E88A1A] text-[#1D261E] hover:bg-white transition-colors cursor-pointer shadow-md"
              >
                BOOK THIS VENUE
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
