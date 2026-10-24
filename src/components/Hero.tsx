import React, { useRef, useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface HeroProps {
  onExploreClick: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenInquiry }) => {
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Guarantee browser autoplay compliance
  useEffect(() => {
    [cardVideoRef.current, bgVideoRef.current].forEach((vid) => {
      if (vid) {
        vid.defaultMuted = true;
        vid.muted = true;
        vid.playsInline = true;
        vid.play().catch(() => {});
      }
    });

    const handleFirstTouch = () => {
      [cardVideoRef.current, bgVideoRef.current].forEach((vid) => {
        if (vid && vid.paused) {
          vid.play().catch(() => {});
        }
      });
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };

    window.addEventListener('click', handleFirstTouch, { once: true });
    window.addEventListener('touchstart', handleFirstTouch, { once: true });
    window.addEventListener('scroll', handleFirstTouch, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstTouch);
      window.removeEventListener('touchstart', handleFirstTouch);
      window.removeEventListener('scroll', handleFirstTouch);
    };
  }, []);

  return (
    <section
      id="top"
      className="relative min-h-screen w-full pt-[76px] sm:pt-[80px] bg-transparent text-white flex flex-col justify-center overflow-hidden border-b border-[#9FA1FF]/20"
    >
      {/* Background Full-Bleed Video (GeminiHero.mp4 without audio on loop) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover object-center scale-100"
        >
          <source src="/videos/GeminiHero.mp4" type="video/mp4" />
        </video>

        {/* Transparent atmospheric dark veil for high-contrast cinematic elegance */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 pointer-events-none" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Completely transparent, floating text with high-contrast drop-shadows */}
          <div className="lg:col-span-7 flex flex-col justify-center z-10">
            
            {/* Utility kicker with cursive flourish */}
            <div className="mb-4 sm:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-cursive text-2xl sm:text-3xl text-white font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                Where Sacred Vows Meet Royal Grandeur
              </span>
              <span className="w-6 sm:w-8 h-[1px] bg-[#FAEE2F]"></span>
              <span className="text-[9px] sm:text-[10px] font-black tracking-[0.25em] uppercase text-[#161726] bg-[#FAEE2F] px-2 sm:px-2.5 py-0.5 rounded-sm shadow-md">
                PATNA ROYAL WEDDINGS
              </span>
            </div>

            {/* Massive headline with signature cursive wedding accent */}
            <h1 className="text-[clamp(2.6rem,11.5vw,11.5rem)] font-black tracking-tighter leading-[0.8] uppercase text-white mb-6 sm:mb-8 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              ROYAL
              <span className="block font-cursive text-5xl sm:text-8xl lg:text-[9.5rem] text-[#FAEE2F] capitalize tracking-normal font-normal -my-1 sm:-my-2 leading-[0.75] drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)]">
                weddings
              </span>
              SANCTUARY
            </h1>

            {/* Below headline: 2xl body text floating transparently */}
            <p className="text-xl sm:text-2xl text-white/95 font-medium leading-relaxed max-w-xl mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              Orchestrate your dream royal wedding at Sheesh Mahal Resort. Grand air-conditioned ballrooms for majestic Varmalas, sprawling starlit lawns for grand Baraats, consecrated Vedic Mandaps for Saat Phere, and masterfully curated wedding feasts.
            </p>
            <p className="font-cursive text-2xl sm:text-3xl text-[#FAEE2F] mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              "Crafting timeless wedding moments opposite St. Xavier's, Patna"
            </p>

            {/* Location verified marker */}
            <div className="flex items-center gap-2 text-xs font-bold text-white/90 mb-8 max-w-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              <MapPin size={16} className="text-[#FAEE2F] shrink-0" />
              <span>Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna 800011</span>
            </div>

            {/* Arrow-CTA with border-bottom-2px #FAEE2F & Reel link */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-4 pb-2 border-b-2 border-[#FAEE2F] text-sm lg:text-base font-black tracking-[0.25em] uppercase text-white hover:text-[#FAEE2F] transition-colors cursor-pointer drop-shadow-md"
              >
                <span>EXPLORE WEDDING VENUES</span>
                <ArrowRight
                  size={18}
                  className="transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:translate-x-2 text-[#FAEE2F]"
                />
              </button>

              {/* Direct link to Wedding Reel */}
              <a
                href="#wedding-reel"
                className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase text-white hover:text-[#FAEE2F] transition-colors py-2 px-4 rounded-full border border-white/30 bg-black/45 backdrop-blur-md shadow-lg hover:bg-black/65 cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span>WATCH WEDDING REEL</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Video Card with GeminiHero.mp4 & 24h Circle Badge */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            {/* The 24px rounded card displaying GeminiHero.mp4 on loop without audio */}
            <div className="relative rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-white/40 group bg-black/40 backdrop-blur-sm">
              <div className="relative aspect-[4/3] sm:aspect-[4/3] lg:aspect-[4/5] w-full overflow-hidden bg-black">
                <video
                  ref={cardVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700"
                >
                  <source src="/videos/GeminiHero.mp4" type="video/mp4" />
                </video>

                {/* Ambient vignette gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />

                {/* Top Live Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-white/25 text-white text-[10px] font-black tracking-widest uppercase shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#FAEE2F] animate-pulse" />
                  <span>ROYAL PALACE LIVE</span>
                </div>

                {/* Top Right Muted Indicator */}
                <div className="absolute top-4 right-4 z-20 px-2.5 py-1.5 rounded-full bg-black/55 backdrop-blur-md border border-white/20 text-white/90 text-[9px] font-mono tracking-widest uppercase">
                  LOOP · MUTED
                </div>

                {/* Discreet caption tag inside bottom */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white/95 z-20 pointer-events-none drop-shadow-md">
                  <div>
                    <p className="font-cursive text-2xl text-[#FAEE2F] tracking-wide">
                      The Wedding Palace
                    </p>
                    <p className="text-xs sm:text-sm font-bold tracking-tight uppercase">
                      BARAAT LAWN & SHEESH BALLROOM
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] tracking-widest uppercase font-bold text-white/95 bg-black/75 px-2.5 py-1 rounded-md border border-white/10">
                      UP TO 2000 GUESTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge 1: RIGHT side */}
            <div className="absolute -bottom-6 left-2 sm:-bottom-8 sm:-left-12 z-30">
              <WeddingDeskCircleBadge
                id="badge-section-1"
                badgeNumber="24h"
                title="WEDDING DESK"
                subtitle="Dates Active"
                statusText="OPEN 24 HOURS"
                onClick={onOpenInquiry}
                bounceDelay="0s"
              />
            </div>

          </div>

        </div>
      </div>

      {/* Editorial horizontal ticker strip with verified wedding amenities */}
      <div className="w-full border-t border-white/15 bg-black/50 backdrop-blur-md py-4 px-6 lg:px-12 relative z-10 text-white">
        <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-black tracking-widest uppercase text-white/90">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[#FAEE2F] border border-[#161726]"></span>
            <span>SHAHI WEDDING CATERING</span>
          </div>
          <div className="hidden sm:flex items-center gap-6 lg:gap-8">
            <span>CUSTOM MANDAP DECOR</span>
            <span>·</span>
            <span>BARAAT WELCOME CORRIDOR</span>
            <span>·</span>
            <span>100% POWER BACKUP</span>
            <span>·</span>
            <span>LUXURY BRIDAL SUITES</span>
          </div>
          <span className="font-bold text-[11px] tracking-wider text-white/80">
            DIGHA, PATNA · BIHAR 800011
          </span>
        </div>
      </div>
    </section>
  );
};
