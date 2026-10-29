import React, { useRef, useEffect } from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface HeroProps {
  onExploreClick: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenInquiry }) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);

  // Ultra-fast synchronized autoplay engine for both background and foreground hero videos
  useEffect(() => {
    const bg = bgVideoRef.current;
    const card = cardVideoRef.current;

    const startVideo = (vid: HTMLVideoElement | null) => {
      if (!vid) return;
      vid.defaultMuted = true;
      vid.muted = true;
      vid.playsInline = true;
      if (vid.paused) {
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Handled silently: will play immediately on first user touch/click/scroll
          });
        }
      }
    };

    const playAll = () => {
      startVideo(bg);
      startVideo(card);
    };

    // Immediate start attempt
    playAll();

    // Fast response on ready events
    const handleReady = () => playAll();

    [bg, card].forEach((vid) => {
      if (vid) {
        vid.addEventListener('loadedmetadata', handleReady);
        vid.addEventListener('loadeddata', handleReady);
        vid.addEventListener('canplay', handleReady);
        vid.addEventListener('canplaythrough', handleReady);
      }
    });

    // Browser interaction unlock: instantly starts videos on first gesture
    const handleInteraction = () => {
      playAll();
    };

    ['touchstart', 'click', 'scroll', 'pointerdown', 'keydown'].forEach((evt) => {
      window.addEventListener(evt, handleInteraction, { once: true, passive: true });
    });

    return () => {
      [bg, card].forEach((vid) => {
        if (vid) {
          vid.removeEventListener('loadedmetadata', handleReady);
          vid.removeEventListener('loadeddata', handleReady);
          vid.removeEventListener('canplay', handleReady);
          vid.removeEventListener('canplaythrough', handleReady);
        }
      });
      ['touchstart', 'click', 'scroll', 'pointerdown', 'keydown'].forEach((evt) => {
        window.removeEventListener(evt, handleInteraction);
      });
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="top"
      className="relative min-h-[100dvh] w-full pt-[82px] sm:pt-[90px] pb-0 bg-transparent text-white flex flex-col justify-between overflow-hidden border-b border-[#26532B]/20"
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
          poster="/images/hero-poster.webp"
          onCanPlay={(e) => { e.currentTarget.muted = true; e.currentTarget.play().catch(() => {}); }}
          onLoadedData={(e) => { e.currentTarget.muted = true; e.currentTarget.play().catch(() => {}); }}
          className="w-full h-full object-cover object-center scale-105 filter blur-[5px] sm:blur-[6px] transition-all"
        >
          <source src="/videos/GeminiHero.mp4" type="video/mp4" />
        </video>

        {/* Warm luxury palace ambient veil preserving full video colors */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D261E]/70 via-transparent to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1D261E]/50 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-24 sm:pt-28 lg:pt-24 pb-8 sm:pb-12 lg:pb-16 relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-8 items-center">
          
          {/* Left Column: Floating text with SANCTUARY overlapping the enlarged right video card */}
          <div className="lg:col-span-5 flex flex-col justify-center relative z-20">
            
            {/* Utility kicker with cursive flourish */}
            <div className="mb-2 sm:mb-4 lg:mb-6 flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="font-cursive text-lg sm:text-2xl lg:text-3xl text-white font-normal drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                Where Sacred Vows Meet Royal Grandeur
              </span>
              <span className="w-5 sm:w-8 h-[1px] bg-[#26532B]"></span>
              <span className="text-[8px] sm:text-[10px] font-black tracking-[0.25em] uppercase text-[#1D261E] bg-[#E88A1A] px-2 sm:px-2.5 py-0.5 rounded-sm shadow-md">
                PATNA ROYAL WEDDINGS
              </span>
            </div>

            {/* Massive headline with purple cursive 'weddings' and 'SANCTUARY' overlapping right box */}
            <h1 className="text-[clamp(2.4rem,8.8vw,10.5rem)] font-black tracking-tighter leading-[0.8] uppercase text-white mb-3 sm:mb-6 lg:mb-8 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
              ROYAL
              <span className="block font-cursive text-[3.2rem] sm:text-7xl lg:text-[8.5rem] text-[#E88A1A] capitalize tracking-normal font-normal -my-1 sm:-my-2 leading-[0.75] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                weddings
              </span>
              <span className="block lg:relative lg:z-30 lg:w-[160%] lg:-mr-64 whitespace-nowrap pointer-events-none drop-shadow-[0_8px_24px_rgba(0,0,0,0.95)] text-white">
                SANCTUARY
              </span>
            </h1>

            {/* Below headline: body text floating transparently */}
            <p className="text-xs sm:text-base lg:text-xl text-white font-medium leading-relaxed max-w-xl mb-3 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              Orchestrate your dream royal wedding at Sheesh Mahal Resort. Grand air-conditioned ballrooms for majestic Varmalas, sprawling starlit lawns for grand Baraats, consecrated Vedic Mandaps for Saat Phere, and masterfully curated wedding feasts.
            </p>
            <p className="font-cursive text-base sm:text-xl lg:text-2xl text-[#E88A1A] mb-3 sm:mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              "Crafting timeless wedding moments opposite St. Xavier's, Patna"
            </p>

            {/* Location verified marker */}
            <div className="flex items-center gap-2 text-[10px] sm:text-xs font-bold text-white/90 mb-5 sm:mb-8 max-w-lg drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              <MapPin size={14} className="text-[#E88A1A] shrink-0" />
              <span>Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna 800011</span>
            </div>

            {/* Primary Clay CTA with Royal Gold Vibrancy */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onExploreClick}
                className="clay-btn-gold px-6 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-black tracking-widest uppercase text-white transition-all cursor-pointer shadow-lg flex items-center gap-3"
              >
                <span>EXPLORE WEDDING VENUES</span>
                <ArrowRight size={16} className="text-white" />
              </button>
            </div>

          </div>

          {/* Right Column: Hero Video Card enlarged with unzoomed 16:9 alignment & synchronized playback */}
          <div className="lg:col-span-7 relative mt-8 sm:mt-10 lg:mt-0 lg:pl-4 z-10">
            {/* The rounded card displaying GeminiHero.mp4 with true 16:9 alignment (no zoom) */}
            <div className="relative rounded-[20px] sm:rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border sm:border-2 border-white/40 group bg-black/40 backdrop-blur-sm">
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <video
                  ref={cardVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  poster="/images/hero-poster.webp"
                  onCanPlay={(e) => { e.currentTarget.muted = true; e.currentTarget.play().catch(() => {}); }}
                  onLoadedData={(e) => { e.currentTarget.muted = true; e.currentTarget.play().catch(() => {}); }}
                  className="w-full h-full object-cover object-center scale-100"
                >
                  <source src="/videos/GeminiHero.mp4" type="video/mp4" />
                </video>

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Discreet caption tag inside bottom */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between text-white z-20 pointer-events-none drop-shadow-md">
                  <div>
                    <p className="font-cursive text-base sm:text-2xl text-[#E88A1A] tracking-wide">
                      The Wedding Palace
                    </p>
                    <p className="text-[9px] sm:text-sm font-bold tracking-tight uppercase">
                      BARAAT LAWN & SHEESH BALLROOM
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-bold text-white bg-black/75 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-white/10">
                      UP TO 2000 GUESTS
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge 1: Anchored to corner without blocking mobile captions */}
            <div className="absolute -bottom-6 right-2 sm:right-auto sm:-bottom-8 sm:-left-8 lg:-left-12 z-30">
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

      {/* Moving Marquee Ticker at the bottom edge where hero ends (Claymorphic Orange) */}
      <div className="w-full clay-ticker-orange py-3 sm:py-3.5 relative z-20 text-white mt-auto overflow-hidden select-none border-t border-white/40">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-white">
          {/* Continuous Loop Set 1 (Clean text without cylinders) */}
          <div className="flex items-center gap-8 sm:gap-12 shrink-0">
            <span className="flex items-center gap-2.5 font-black">CUSTOM MANDAP DECOR</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">BARAAT WELCOME CORRIDOR</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">100% POWER BACKUP</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">LUXURY BRIDAL SUITES</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">AIR-CONDITIONED BANQUET</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">SPRAWLING STARLIT LAWNS</span>
            <span className="text-white/80 text-xs">✦</span>
          </div>

          {/* Continuous Loop Set 2 (Seamless Infinite Duplicate without cylinders) */}
          <div className="flex items-center gap-8 sm:gap-12 shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2.5 font-black">CUSTOM MANDAP DECOR</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">BARAAT WELCOME CORRIDOR</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">100% POWER BACKUP</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">LUXURY BRIDAL SUITES</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">AIR-CONDITIONED BANQUET</span>
            <span className="text-white/80 text-xs">✦</span>
            <span className="flex items-center gap-2.5 font-black">SPRAWLING STARLIT LAWNS</span>
            <span className="text-white/80 text-xs">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
