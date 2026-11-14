import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Instagram, Play, ArrowRight } from 'lucide-react';
import { RevealUp } from './RevealUp.tsx';

interface ReelItem {
  id: string;
  type: 'landscape' | 'portrait';
  title: string;
  oneLineDetail: string;
  videoSrc: string;
  posterSrc: string;
  instagramUrl: string;
  aspectClass: string;
}

const REELS_DATA: ReelItem[] = [
  // 3 Cinematic Landscape Reels
  {
    id: 'landscape-reel-1',
    type: 'landscape',
    title: 'Palatial Entrance & Festive Baraat',
    oneLineDetail: 'Imperial grand facade illuminated for royal evening Baraats',
    videoSrc: '/videos/reels_optimized/landscape-1.mp4',
    posterSrc: '/images/reels_posters/landscape-1.webp',
    instagramUrl: 'https://www.instagram.com/reel/DbiRkw1JZzT/',
    aspectClass: 'aspect-video'
  },
  {
    id: 'landscape-reel-2',
    type: 'landscape',
    title: 'Royal Mandap & Starlit Nuptials',
    oneLineDetail: 'Consecrated floral Mandap and Saat Phere under starlit skies',
    videoSrc: '/videos/reels_optimized/landscape-2.mp4',
    posterSrc: '/images/reels_posters/landscape-2.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfRIHHKyZ90/',
    aspectClass: 'aspect-video'
  },
  {
    id: 'landscape-reel-3',
    type: 'landscape',
    title: 'Grand Ballroom & Gala Banqueting',
    oneLineDetail: 'Air-conditioned royal banquet hall with live culinary feast',
    videoSrc: '/videos/reels_optimized/landscape-3.mp4',
    posterSrc: '/images/reels_posters/landscape-3.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfPAQXwSxWw/',
    aspectClass: 'aspect-video'
  },
  // 2 Vertical Portrait Reels (Optimized for PC & Mobile)
  {
    id: 'portrait-reel-1',
    type: 'portrait',
    title: 'Bridal Grand Entry & Varmala Rites',
    oneLineDetail: 'Emotional bridal entry with cold pyros and floral showers',
    videoSrc: '/videos/reels_optimized/portrait-1.mp4',
    posterSrc: '/images/reels_posters/portrait-1.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfZrZWJyGA-/',
    aspectClass: 'aspect-[9/16]'
  },
  {
    id: 'portrait-reel-2',
    type: 'portrait',
    title: 'Celebration Symphony & Dhol Beats',
    oneLineDetail: 'High-energy Baraat celebrations on sprawling front lawns',
    videoSrc: '/videos/reels_optimized/portrait-2.mp4',
    posterSrc: '/images/reels_posters/portrait-2.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfX8DXBz4tg/',
    aspectClass: 'aspect-[9/16]'
  }
];

// Single Reel Player Card
const ReelCard: React.FC<{ reel: ReelItem }> = ({ reel }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Play video only when it scrolls into view; pause when scrolled away
  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.playsInline = true;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Global audio sync: when any other video un-mutes, mute this reel card
  useEffect(() => {
    const handleGlobalUnmute = (e: Event) => {
      const customEvt = e as CustomEvent<{ id: string }>;
      if (customEvt.detail?.id !== reel.id) {
        if (videoRef.current) videoRef.current.muted = true;
        setIsMuted(true);
      }
    };
    window.addEventListener('resort-video-unmuted', handleGlobalUnmute);
    return () => window.removeEventListener('resort-video-unmuted', handleGlobalUnmute);
  }, [reel.id]);

  // Toggle mute/unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent('resort-video-unmuted', { detail: { id: reel.id } })
      );
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  // Tap card to toggle play/pause
  const handleCardClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const isPortrait = reel.type === 'portrait';

  return (
    <div
      className={isPortrait ? 'w-full max-w-[270px] lg:max-w-[260px] mx-auto' : 'w-full'}
    >
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`relative group rounded-[20px] sm:rounded-[24px] overflow-hidden bg-[#1D261E] border-2 border-white/70 hover:border-[#E88A1A]/70 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
          isPortrait ? 'aspect-[9/16] max-h-[460px] w-full' : reel.aspectClass
        }`}
      >
        {/* Video Element */}
        <video
          ref={videoRef}
          src={reel.videoSrc}
          poster={reel.posterSrc}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />

        {/* Subtle Dark Vignette at Top and Bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

        {/* Top Left: Instagram Link */}
        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-auto">
          <a
            href={reel.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            aria-label="View Reel on Instagram"
            className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 hover:bg-[#1D261E] backdrop-blur-md border border-white/20 text-white/90 hover:text-[#E88A1A] text-[9px] font-black tracking-wider uppercase transition-colors shadow-md"
          >
            <Instagram size={11} className="text-[#E88A1A]" />
            <span>REEL</span>
          </a>
        </div>

        {/* Top Right: Dedicated Minimal Mute / Unmute Button */}
        <div className="absolute top-2.5 right-2.5 z-20 pointer-events-auto">
          <button
            type="button"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md border ${
              isMuted
                ? 'bg-black/65 text-white/90 hover:bg-[#E88A1A] hover:text-[#1D261E] border-white/25'
                : 'bg-[#E88A1A] text-[#1D261E] hover:bg-white border-[#E88A1A] shadow-[0_0_12px_rgba(232,138,26,0.6)]'
            }`}
          >
            {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} className="animate-pulse" />}
          </button>
        </div>

        {/* Center Play Indicator when paused */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300">
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 group-hover:bg-[#E88A1A] group-hover:text-[#1D261E] transition-all">
              <Play size={16} fill="currentColor" />
            </div>
          </div>
        )}

        {/* Bottom: Clean Single-Line Detail (No progress bar) */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 pointer-events-none drop-shadow">
          <p className="font-cursive text-xs sm:text-sm text-[#E88A1A] truncate">
            {reel.title}
          </p>
          <p className="text-[10px] sm:text-[11px] font-semibold text-white/90 truncate leading-snug">
            {reel.oneLineDetail}
          </p>
        </div>
      </div>
    </div>
  );
};

export const InstagramReelsSection: React.FC = () => {
  const landscapeReels = REELS_DATA.filter((r) => r.type === 'landscape');
  const portraitReels = REELS_DATA.filter((r) => r.type === 'portrait');

  return (
    <section
      id="reels"
      className="py-16 lg:py-24 bg-[#FAF6EE] text-[#1D261E] overflow-hidden relative border-t border-[#26532B]/15"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <RevealUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 pb-5 sm:pb-6 border-b border-[#26532B]/20">
            <div>
              <div className="flex items-center gap-3 mb-2 sm:mb-3">
                <span className="label-utility text-[#1D261E]/70">
                  REAL WEDDING CELEBRATIONS IN MOTION
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#26532B]"></span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#1D261E]">
                ROYAL REELS ARCHIVE
              </h2>
              <p className="font-cursive text-2xl sm:text-3xl text-[#26532B] mt-1 font-normal">
                Sacred Vows, Grand Baraats & Festive Moments
              </p>
            </div>
          </div>
        </RevealUp>

        {/* Landscape Reels View */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#26532B]">
              CINEMATIC LANDSCAPE MOMENTS
            </span>
            <span className="flex-1 h-[1px] bg-[#26532B]/15"></span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 items-start">
            {landscapeReels.map((reel) => (
              <RevealUp key={reel.id}>
                <ReelCard reel={reel} />
              </RevealUp>
            ))}
          </div>
        </div>

        {/* Portrait Reels View - Sized cleanly so PC screens aren't dominated by vertical reels */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#26532B]">
              VERTICAL PORTRAIT MOMENTS
            </span>
            <span className="flex-1 h-[1px] bg-[#26532B]/15"></span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6 sm:gap-8 items-center justify-center">
            {portraitReels.map((reel) => (
              <RevealUp key={reel.id}>
                <ReelCard reel={reel} />
              </RevealUp>
            ))}
          </div>
        </div>

        {/* Minimal Luxury Instagram Follow Action Bar */}
        <RevealUp delay={120}>
          <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-5 sm:p-7 clay-card border border-white/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl clay-pill flex items-center justify-center text-[#E88A1A] shrink-0">
                <Instagram size={24} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black uppercase text-[#1D261E] tracking-tight">
                  FOLLOW @SHEESHMAHALRESORT ON INSTAGRAM
                </h4>
                <p className="text-xs text-[#1D261E]/75 font-medium">
                  Experience daily Baraat processions, revolving stage Varmalas, and royal weddings in Patna
                </p>
              </div>
            </div>
            <a
              href="https://www.instagram.com/sheeshmahalresort/"
              target="_blank"
              rel="noopener noreferrer"
              className="clay-btn-gold px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-md inline-flex items-center gap-2 cursor-pointer shrink-0"
            >
              <span>WATCH ON INSTAGRAM</span>
              <ArrowRight size={14} />
            </a>
          </div>
        </RevealUp>
      </div>
    </section>
  );
};

