import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Instagram, Play, ArrowRight } from 'lucide-react';
import { RevealUp } from './RevealUp.tsx';

interface ReelItem {
  id: string;
  type: 'landscape' | 'portrait';
  videoSrc: string;
  posterSrc: string;
  instagramUrl: string;
  aspectClass: string;
}

const REELS_DATA: ReelItem[] = [
  // 3 Landscape Reels
  {
    id: 'landscape-1',
    type: 'landscape',
    videoSrc: '/videos/reels/landscape-1.mp4',
    posterSrc: '/images/reels/landscape-1-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DdRmRhTOyxZ/?utm_source=ig_web_copy_link&mdxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    aspectClass: 'aspect-video'
  },
  {
    id: 'landscape-2',
    type: 'landscape',
    videoSrc: '/videos/reels/landscape-2.mp4',
    posterSrc: '/images/reels/landscape-2-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/Ded5t3PyLZI/?utm_source=ig_web_copy_link&exln=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    aspectClass: 'aspect-video'
  },
  {
    id: 'landscape-3',
    type: 'landscape',
    videoSrc: '/videos/reels/landscape-3.mp4',
    posterSrc: '/images/reels/landscape-3-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DdmKZ6wS9XT/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    aspectClass: 'aspect-video'
  },
  // 3 Portrait Reels
  {
    id: 'portrait-1',
    type: 'portrait',
    videoSrc: '/videos/reels/portrait-1.mp4',
    posterSrc: '/images/reels/portrait-1-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DeHGdIFvK_R/?utm_source=ig_web_copy_link&rpxt=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    aspectClass: 'aspect-[9/16]'
  },
  {
    id: 'portrait-2',
    type: 'portrait',
    videoSrc: '/videos/reels/portrait-2.mp4',
    posterSrc: '/images/reels/portrait-2-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DdgQmFuJ2TR/?utm_source=ig_web_copy_link&obrf=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    aspectClass: 'aspect-[9/16]'
  },
  {
    id: 'portrait-3',
    type: 'portrait',
    videoSrc: '/videos/reels/portrait-3.mp4',
    posterSrc: '/images/reels/portrait-3-poster.webp',
    instagramUrl: 'https://www.instagram.com/reel/DdD8_GhJFaP/?utm_source=ig_web_copy_link&vrfl=MzRlODBiNWFlZA==&srtk=MzRlODBiNWFlZA==',
    aspectClass: 'aspect-[9/16]'
  }
];

// Single Reel Player Card
const ReelCard: React.FC<{ reel: ReelItem }> = ({ reel }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Smartphone view: auto play muted when video card scrolls into the screen
  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video || !('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isMobileOrTouch = window.innerWidth < 1024 || 'ontouchstart' in window;
          if (entry.isIntersecting && isMobileOrTouch) {
            video.defaultMuted = true;
            video.muted = true;
            video
              .play()
              .then(() => setIsPlaying(true))
              .catch(() => {});
          } else if (!entry.isIntersecting) {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.45 }
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  // Desktop hover play and leave pause
  const handleMouseEnter = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    setIsPlaying(false);
  };

  // Toggle mute/unmute
  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    // If not playing, start playback on mute toggle
    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  // Tap card to toggle play/pause on touch
  const handleCardClick = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = isMuted;
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
      className={`relative group rounded-[22px] sm:rounded-[26px] overflow-hidden bg-[#1D261E] border-2 border-white/70 hover:border-[#E88A1A]/70 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${reel.aspectClass}`}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 pointer-events-none" />

      {/* Top Left: Minimal Instagram Post Link */}
      <div className="absolute top-3 left-3 z-20 pointer-events-auto">
        <a
          href={reel.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          aria-label="View Reel on Instagram"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 hover:bg-[#1D261E] backdrop-blur-md border border-white/20 text-white/90 hover:text-[#E88A1A] text-[9px] font-black tracking-wider uppercase transition-colors shadow-md"
        >
          <Instagram size={11} className="text-[#E88A1A]" />
          <span>REEL</span>
        </a>
      </div>

      {/* Top Right: Dedicated Minimal Mute / Unmute Button */}
      <div className="absolute top-3 right-3 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md border ${
            isMuted
              ? 'bg-black/65 text-white/90 hover:bg-[#E88A1A] hover:text-[#1D261E] border-white/25 hover:border-[#E88A1A]'
              : 'bg-[#E88A1A] text-[#1D261E] hover:bg-white border-[#E88A1A] shadow-[0_0_12px_rgba(232,138,26,0.6)]'
          }`}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} className="animate-pulse" />}
        </button>
      </div>

      {/* Center Hover / Play Indicator (when paused on desktop) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300">
          <div className="w-12 h-12 rounded-full bg-black/55 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 group-hover:bg-[#E88A1A] group-hover:text-[#1D261E] group-hover:border-[#E88A1A] transition-all">
            <Play size={18} fill="currentColor" />
          </div>
        </div>
      )}
    </div>
  );
};

export const InstagramReelsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'landscape' | 'portrait'>('all');

  const landscapeReels = REELS_DATA.filter((r) => r.type === 'landscape');
  const portraitReels = REELS_DATA.filter((r) => r.type === 'portrait');

  return (
    <section
      id="reels"
      className="py-20 lg:py-32 bg-[#FAF6EE] text-[#1D261E] overflow-hidden relative border-t border-[#26532B]/15"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <RevealUp>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 pb-6 sm:pb-8 border-b border-[#26532B]/20">
            <div>
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <span className="label-utility text-[#1D261E]/70">
                  REAL WEDDING CELEBRATIONS IN MOTION
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#26532B]"></span>
              </div>
              <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#1D261E]">
                ROYAL REELS ARCHIVE
              </h2>
              <p className="font-cursive text-2xl sm:text-4xl text-[#26532B] mt-2 font-normal">
                Sacred Vows, Grand Baraats & Festive Joy
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === 'all'
                    ? 'clay-btn-gold text-white shadow-xs'
                    : 'clay-pill text-[#1D261E] hover:text-[#E88A1A]'
                }`}
              >
                ALL REELS (6)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('landscape')}
                className={`px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === 'landscape'
                    ? 'clay-btn-gold text-white shadow-xs'
                    : 'clay-pill text-[#1D261E] hover:text-[#E88A1A]'
                }`}
              >
                LANDSCAPE (3)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('portrait')}
                className={`px-4 py-2 text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] rounded-xl transition-all duration-300 cursor-pointer ${
                  activeTab === 'portrait'
                    ? 'clay-btn-gold text-white shadow-xs'
                    : 'clay-pill text-[#1D261E] hover:text-[#E88A1A]'
                }`}
              >
                PORTRAIT (3)
              </button>
            </div>
          </div>
        </RevealUp>

        {/* Landscape Reels View */}
        {(activeTab === 'all' || activeTab === 'landscape') && (
          <div className="mb-12 sm:mb-16">
            {activeTab === 'all' && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#26532B]">
                  CINEMATIC LANDSCAPE MOMENTS
                </span>
                <span className="flex-1 h-[1px] bg-[#26532B]/15"></span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
              {landscapeReels.map((reel) => (
                <RevealUp key={reel.id}>
                  <ReelCard reel={reel} />
                </RevealUp>
              ))}
            </div>
          </div>
        )}

        {/* Portrait Reels View */}
        {(activeTab === 'all' || activeTab === 'portrait') && (
          <div>
            {activeTab === 'all' && (
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#26532B]">
                  VERTICAL PORTRAIT REELS
                </span>
                <span className="flex-1 h-[1px] bg-[#26532B]/15"></span>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start">
              {portraitReels.map((reel) => (
                <RevealUp key={reel.id}>
                  <ReelCard reel={reel} />
                </RevealUp>
              ))}
            </div>
          </div>
        )}

        {/* Minimal Luxury Instagram Follow Action Bar */}
        <RevealUp delay={120}>
          <div className="mt-14 sm:mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 clay-card border border-white/80">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl clay-pill flex items-center justify-center text-[#E88A1A] shrink-0">
                <Instagram size={24} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-black uppercase text-[#1D261E] tracking-tight">
                  FOLLOW @SHEESHMAHALRESORT ON INSTAGRAM
                </h4>
                <p className="text-xs text-[#1D261E]/70 font-medium">
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
