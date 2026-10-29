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

  // Synchronize both hero background video and card box video to play in exact lockstep
  // and pause automatically when scrolled out of view to ensure 60fps smooth scrolling
  useEffect(() => {
    const bg = bgVideoRef.current;
    const card = cardVideoRef.current;
    const section = heroSectionRef.current;
    if (!bg || !card) return;

    // Enforce muted & inline playback for browser autoplay policies
    bg.defaultMuted = true;
    bg.muted = true;
    bg.playsInline = true;

    card.defaultMuted = true;
    card.muted = true;
    card.playsInline = true;

    const playBothInSync = () => {
      Promise.all([bg.play(), card.play()]).catch(() => {});
    };

    const pauseBoth = () => {
      bg.pause();
      card.pause();
    };

    playBothInSync();

    // Pause when hero is scrolled out of viewport
    let observer: IntersectionObserver | null = null;
    if (section && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playBothInSync();
            } else {
              pauseBoth();
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(section);
    }

    // Prevent drift: resync card video to background video if discrepancy exceeds 0.12s
    const handleSync = () => {
      if (bg && card && !bg.paused && !card.paused) {
        const drift = Math.abs(bg.currentTime - card.currentTime);
        if (drift > 0.12) {
          card.currentTime = bg.currentTime;
        }
      }
    };

    bg.addEventListener('timeupdate', handleSync, { passive: true });

    const onUserTouch = () => {
      if (bg.paused || card.paused) {
        playBothInSync();
      }
    };

    window.addEventListener('click', onUserTouch, { once: true });
    window.addEventListener('touchstart', onUserTouch, { once: true });

    return () => {
      if (observer) observer.disconnect();
      bg.removeEventListener('timeupdate', handleSync);
      window.removeEventListener('click', onUserTouch);
      window.removeEventListener('touchstart', onUserTouch);
    };
  }, []);

  return (
    <section
      ref={heroSectionRef}
      id="top"
      className="relative min-h-[100dvh] w-full pt-[82px] sm:pt-[90px] pb-6 sm:pb-10 bg-transparent text-white flex flex-col justify-center overflow-hidden border-b border-[#26532B]/20"
    >
      {/* Background Full-Bleed Video (GeminiHero.mp4 without audio on loop) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          ref={bgVideoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-center scale-100"
        >
          <source src="/videos/GeminiHero.mp4" type="video/mp4" />
        </video>

        {/* Transparent atmospheric dark veil for high-contrast cinematic elegance */}
        <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/35 pointer-events-none" />
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
            <p className="text-xs sm:text-base lg:text-xl text-white/95 font-medium leading-relaxed max-w-xl mb-2 sm:mb-3 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
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

            {/* Arrow-CTA with border-bottom-2px #E88A1A */}
            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <button
                type="button"
                onClick={onExploreClick}
                className="group inline-flex items-center gap-2.5 sm:gap-4 pb-1.5 sm:pb-2 border-b-2 border-[#E88A1A] text-[11px] sm:text-sm lg:text-base font-black tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white hover:text-[#26532B] transition-colors cursor-pointer drop-shadow-md"
              >
                <span>EXPLORE WEDDING VENUES</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:translate-x-2 text-[#E88A1A]"
                />
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
                  preload="metadata"
                  className="w-full h-full object-cover object-center scale-100"
                >
                  <source src="/videos/GeminiHero.mp4" type="video/mp4" />
                </video>

                {/* Subtle vignette gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/25 pointer-events-none" />

                {/* Discreet caption tag inside bottom */}
                <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between text-white/95 z-20 pointer-events-none drop-shadow-md">
                  <div>
                    <p className="font-cursive text-base sm:text-2xl text-[#E88A1A] tracking-wide">
                      The Wedding Palace
                    </p>
                    <p className="text-[9px] sm:text-sm font-bold tracking-tight uppercase">
                      BARAAT LAWN & SHEESH BALLROOM
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] sm:text-[10px] tracking-wider sm:tracking-widest uppercase font-bold text-white/95 bg-black/75 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-white/10">
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

      {/* Moving Marquee Ticker at the bottom edge of Hero (Redesigned as requested) */}
      <div className="w-full border-t border-white/20 bg-black/65 backdrop-blur-md py-3 sm:py-3.5 relative z-10 text-white mt-auto overflow-hidden select-none">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 whitespace-nowrap text-[10px] sm:text-xs font-black tracking-[0.2em] uppercase text-white/95">
          {/* Continuous Loop Set 1 */}
          <div className="flex items-center gap-8 sm:gap-12 shrink-0">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A] animate-pulse"></span>CUSTOM MANDAP DECOR</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>BARAAT WELCOME CORRIDOR</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>100% POWER BACKUP</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>LUXURY BRIDAL SUITES</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>AIR-CONDITIONED BANQUET</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>SPRAWLING STARLIT LAWNS</span>
            <span className="text-[#E88A1A]">✦</span>
          </div>

          {/* Continuous Loop Set 2 (Seamless Infinite Duplicate) */}
          <div className="flex items-center gap-8 sm:gap-12 shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A] animate-pulse"></span>CUSTOM MANDAP DECOR</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>BARAAT WELCOME CORRIDOR</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>100% POWER BACKUP</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>LUXURY BRIDAL SUITES</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>AIR-CONDITIONED BANQUET</span>
            <span className="text-[#E88A1A]">✦</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#E88A1A]"></span>SPRAWLING STARLIT LAWNS</span>
            <span className="text-[#E88A1A]">✦</span>
          </div>
        </div>
      </div>
    </section>
  );
};
