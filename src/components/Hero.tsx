import React, { useRef, useEffect, useState } from 'react';
import { ArrowRight, MapPin, Volume2, VolumeX } from 'lucide-react';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface HeroProps {
  onExploreClick: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenInquiry }) => {
  const heroSectionRef = useRef<HTMLElement>(null);
  const cardVideoRef = useRef<HTMLVideoElement>(null);
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const [isCardMuted, setIsCardMuted] = useState(true);

  // Synchronized playback & IntersectionObserver: play only when in viewport to save data & CPU
  useEffect(() => {
    const bg = bgVideoRef.current;
    const card = cardVideoRef.current;

    const playSafe = (vid: HTMLVideoElement | null) => {
      if (!vid) return;
      vid.playsInline = true;
      if (vid.paused) {
        vid.play().catch(() => {});
      }
    };

    const pauseSafe = (vid: HTMLVideoElement | null) => {
      if (!vid) return;
      if (!vid.paused) {
        vid.pause();
      }
    };

    // Viewport observer: only play when hero is in view
    let observer: IntersectionObserver | null = null;
    if (heroSectionRef.current && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playSafe(bg);
              playSafe(card);
            } else {
              pauseSafe(bg);
              pauseSafe(card);
            }
          });
        },
        { threshold: 0.1 }
      );
      observer.observe(heroSectionRef.current);
    } else {
      playSafe(bg);
      playSafe(card);
    }

    // Global audio sync: when any other video un-mutes, mute this hero card video
    const handleGlobalUnmute = (e: Event) => {
      const customEvt = e as CustomEvent<{ id: string }>;
      if (customEvt.detail?.id !== 'hero-card-video') {
        if (card) card.muted = true;
        setIsCardMuted(true);
      }
    };
    window.addEventListener('resort-video-unmuted', handleGlobalUnmute);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resort-video-unmuted', handleGlobalUnmute);
    };
  }, []);

  const toggleCardAudio = (e: React.MouseEvent) => {
    e.stopPropagation();
    const card = cardVideoRef.current;
    if (!card) return;

    const nextMuted = !isCardMuted;
    card.muted = nextMuted;
    setIsCardMuted(nextMuted);

    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent('resort-video-unmuted', { detail: { id: 'hero-card-video' } })
      );
      if (card.paused) card.play().catch(() => {});
    }
  };

  return (
    <>
      <section
        ref={heroSectionRef}
        id="top"
        className="relative min-h-[100dvh] lg:h-[100dvh] w-full pt-[78px] sm:pt-[84px] lg:pt-[88px] pb-4 bg-transparent text-white flex flex-col justify-center overflow-hidden border-b border-[#26532B]/20"
      >
        {/* Background Full-Bleed Video with dark faded ambient veil */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video
            ref={bgVideoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/hero-poster.webp"
            className="w-full h-full object-cover object-center"
          >
            <source src="/videos/GeminiHero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
        </div>

        {/* Main Hero Content - sized to fit PC viewport cleanly without forced overflow */}
        <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-12 pt-2 sm:pt-4 pb-2 sm:pb-4 relative z-10 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            
            {/* Left Column: Streamlined, high-intent, emotional storytelling */}
            <div className="lg:col-span-6 flex flex-col justify-center relative z-20">
              
              {/* Flourish */}
              <div className="mb-1.5 flex items-center gap-2 sm:gap-3">
                <span className="font-cursive text-base sm:text-xl lg:text-2xl text-[#E88A1A] drop-shadow-md">
                  Where Sacred Vows Meet Royal Grandeur
                </span>
                <span className="w-6 sm:w-8 h-[1px] bg-[#E88A1A]/60"></span>
              </div>

              {/* Headline */}
              <h1 className="text-[clamp(2.4rem,5.5vw,5.5rem)] font-black tracking-tight leading-[0.9] uppercase text-white mb-3 select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
                ROYAL
                <span className="block font-cursive text-[2.6rem] sm:text-5xl lg:text-7xl text-[#E88A1A] capitalize tracking-normal font-normal leading-[0.85] my-0.5 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
                  weddings
                </span>
                <span className="text-white">
                  SANCTUARY
                </span>
              </h1>

              {/* Location verified marker */}
              <div className="flex items-center gap-2 text-[11px] sm:text-xs font-semibold text-white/90 mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                <MapPin size={14} className="text-[#E88A1A] shrink-0" />
                <span>Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna • 100 to 2,000 Guests</span>
              </div>

              {/* Primary Clay CTAs & Pricing Assurance */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onExploreClick}
                  className="clay-btn-gold px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-black tracking-widest uppercase text-white transition-all cursor-pointer shadow-lg flex items-center gap-2 hover:scale-105"
                >
                  <span>EXPLORE VENUES</span>
                  <ArrowRight size={15} className="text-white" />
                </button>
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="px-5 py-2.5 sm:px-6 sm:py-3 bg-black/60 hover:bg-black/80 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-black tracking-wider uppercase rounded-xl transition-all cursor-pointer shadow-md"
                >
                  <span>CHECK DATES</span>
                </button>
              </div>
              <p className="text-[11px] text-white/80 mt-2.5 font-medium flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E88A1A]" />
                <span>Affordable starting packages • Transparent estimates with zero hidden fees</span>
              </p>

              {/* Trust Pill & All Faiths Badge - Placed at bottom of Hero */}
              <div className="mt-4 sm:mt-6 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/65 backdrop-blur-md border border-[#E88A1A]/50 text-[#FAF6EE] text-[11px] sm:text-xs font-bold shadow-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E88A1A] animate-pulse" />
                  <span className="font-extrabold text-[#E88A1A]">4.9</span>
                  <span className="text-white/90">• Google Verified</span>
                  <span className="text-[#E88A1A]">• Raj Resort Group</span>
                </span>
                <span className="text-[10px] sm:text-[11px] font-black tracking-wider uppercase text-[#1D261E] bg-[#E88A1A] px-2.5 py-1 rounded-sm shadow-md">
                  ALL FAITHS WELCOME
                </span>
              </div>

            </div>

            {/* Right Column: Hero Video Card with clean audio toggle and accurate sizing */}
            <div className="lg:col-span-6 relative mt-4 lg:mt-0 z-10 flex flex-col items-center">
              <div className="relative w-full max-w-lg lg:max-w-none rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] border-2 border-white/40 group bg-black/60 backdrop-blur-sm">
                <div className="relative aspect-video w-full overflow-hidden bg-black">
                  <video
                    ref={cardVideoRef}
                    autoPlay
                    loop
                    muted={isCardMuted}
                    playsInline
                    preload="auto"
                    poster="/images/hero-reel-poster.webp"
                    className="w-full h-full object-cover object-center"
                  >
                    <source src="/videos/hero-reel.mp4" type="video/mp4" />
                  </video>

                  {/* Subtle vignette gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                  {/* Top audio toggle button */}
                  <div className="absolute top-3 right-3 z-20 pointer-events-auto">
                    <button
                      type="button"
                      onClick={toggleCardAudio}
                      aria-label={isCardMuted ? 'Unmute video audio' : 'Mute video audio'}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md ${
                        isCardMuted
                          ? 'bg-black/70 text-white hover:bg-black/90 border border-white/30'
                          : 'bg-[#E88A1A] text-[#1D261E] border border-[#E88A1A]'
                      }`}
                    >
                      {isCardMuted ? <VolumeX size={12} /> : <Volume2 size={12} className="animate-pulse" />}
                      <span>{isCardMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
                    </button>
                  </div>

                  {/* Discreet caption tag inside bottom */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-5 right-3 sm:right-5 flex items-center justify-between text-white z-20 pointer-events-none drop-shadow-md">
                    <div>
                      <p className="font-cursive text-sm sm:text-xl text-[#E88A1A] tracking-wide">
                        Sheesh Mahal Grand Celebration
                      </p>
                      <p className="text-[10px] sm:text-xs font-bold tracking-tight uppercase">
                        BARAAT LAWN & PALATIAL BALLROOM
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[9px] sm:text-[10px] tracking-wider uppercase font-bold text-white bg-black/75 px-2.5 py-1 rounded-md border border-white/10">
                        UP TO 2,000 GUESTS
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Badge anchored below video */}
              <div className="hidden sm:block absolute -bottom-5 sm:-bottom-6 sm:left-4 z-30">
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
      </section>

      {/* Moving Marquee Ticker at the bottom edge of hero page (revealed on scroll) */}
      <div className="w-full clay-ticker-orange py-2.5 sm:py-3 relative z-20 text-white overflow-hidden select-none border-t border-b border-white/30">
        <div className="animate-marquee flex items-center gap-6 sm:gap-8 whitespace-nowrap text-[10px] sm:text-xs font-black tracking-[0.22em] uppercase text-white">
          <div className="flex items-center gap-8 sm:gap-12 shrink-0">
            <span className="flex items-center gap-2.5 font-black">CUSTOM MANDAP DECOR</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">BARAAT WELCOME CORRIDOR</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">100% POWER BACKUP</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">LUXURY BRIDAL SUITES</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">AIR-CONDITIONED BANQUET</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">SPRAWLING STARLIT LAWNS</span>
            <span className="text-white/80 text-xs">•</span>
          </div>

          <div className="flex items-center gap-8 sm:gap-12 shrink-0" aria-hidden="true">
            <span className="flex items-center gap-2.5 font-black">CUSTOM MANDAP DECOR</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">BARAAT WELCOME CORRIDOR</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">100% POWER BACKUP</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">LUXURY BRIDAL SUITES</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">AIR-CONDITIONED BANQUET</span>
            <span className="text-white/80 text-xs">•</span>
            <span className="flex items-center gap-2.5 font-black">SPRAWLING STARLIT LAWNS</span>
            <span className="text-white/80 text-xs">•</span>
          </div>
        </div>
      </div>
    </>
  );
};
