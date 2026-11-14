import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Volume2, VolumeX, Instagram, Play } from 'lucide-react';
import { LuxuryVisual } from '../components/LuxuryVisual.tsx';
import { RevealUp } from '../components/RevealUp.tsx';
import { ALL_GALLERY_PHOTOS } from '../data/galleryData.ts';

interface GalleryPageProps {
  onOpenInquiry: () => void;
}

interface GalleryVideoItem {
  id: string;
  type: 'landscape' | 'portrait';
  title: string;
  oneLineDetail: string;
  videoSrc: string;
  posterSrc: string;
  instagramUrl: string;
  aspectClass: string;
}

const GALLERY_VIDEOS: GalleryVideoItem[] = [
  {
    id: 'gal-drone-1',
    type: 'landscape',
    title: 'Aerial Resort Architecture',
    oneLineDetail: 'Full drone tour of illuminated starlit lawns and palatial ballrooms',
    videoSrc: '/videos/reels_optimized/drone-full-view.mp4',
    posterSrc: '/images/reels_posters/drone-full-view.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfJPDf3SXI5/',
    aspectClass: 'aspect-video'
  },
  {
    id: 'gal-land-1',
    type: 'landscape',
    title: 'Imperial Entrance & Grand Baraat',
    oneLineDetail: 'Royal arrival corridor with brass lamps and celebration fireworks',
    videoSrc: '/videos/reels_optimized/landscape-1.mp4',
    posterSrc: '/images/reels_posters/landscape-1.webp',
    instagramUrl: 'https://www.instagram.com/reel/DbiRkw1JZzT/',
    aspectClass: 'aspect-video'
  },
  {
    id: 'gal-land-2',
    type: 'landscape',
    title: 'Sacred Mandap Nuptials',
    oneLineDetail: 'Floral Vedic mandap set up for eternal Saat Phere rituals',
    videoSrc: '/videos/reels_optimized/landscape-2.mp4',
    posterSrc: '/images/reels_posters/landscape-2.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfRIHHKyZ90/',
    aspectClass: 'aspect-video'
  },
  {
    id: 'gal-port-1',
    type: 'portrait',
    title: 'Bridal Grand Entry & Varmala',
    oneLineDetail: 'Emotional bridal arrival with royal floral chadar and sparklers',
    videoSrc: '/videos/reels_optimized/portrait-1.mp4',
    posterSrc: '/images/reels_posters/portrait-1.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfZrZWJyGA-/',
    aspectClass: 'aspect-[9/16]'
  },
  {
    id: 'gal-port-2',
    type: 'portrait',
    title: 'Baraat Symphony & Dhol',
    oneLineDetail: 'Lively celebration moments on expansive outdoor lawns',
    videoSrc: '/videos/reels_optimized/portrait-2.mp4',
    posterSrc: '/images/reels_posters/portrait-2.webp',
    instagramUrl: 'https://www.instagram.com/reel/DfX8DXBz4tg/',
    aspectClass: 'aspect-[9/16]'
  }
];

const GalleryVideoCard: React.FC<{ item: GalleryVideoItem }> = ({ item }) => {
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

  // Global audio sync
  useEffect(() => {
    const handleGlobalUnmute = (e: Event) => {
      const customEvt = e as CustomEvent<{ id: string }>;
      if (customEvt.detail?.id !== item.id) {
        if (videoRef.current) videoRef.current.muted = true;
        setIsMuted(true);
      }
    };
    window.addEventListener('resort-video-unmuted', handleGlobalUnmute);
    return () => window.removeEventListener('resort-video-unmuted', handleGlobalUnmute);
  }, [item.id]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted) {
      window.dispatchEvent(
        new CustomEvent('resort-video-unmuted', { detail: { id: item.id } })
      );
      if (video.paused) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

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

  const isPortrait = item.type === 'portrait';

  return (
    <div className={isPortrait ? 'w-full max-w-[270px] lg:max-w-[260px] mx-auto' : 'w-full'}>
      <div
        ref={cardRef}
        onClick={handleCardClick}
        className={`relative group rounded-[20px] overflow-hidden bg-[#1D261E] border-2 border-white/70 hover:border-[#E88A1A]/70 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer ${
          isPortrait ? 'aspect-[9/16] max-h-[460px] w-full' : item.aspectClass
        }`}
      >
        <video
          ref={videoRef}
          src={item.videoSrc}
          poster={item.posterSrc}
          loop
          muted={isMuted}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.02]"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

        <div className="absolute top-2.5 left-2.5 z-20 pointer-events-auto">
          <a
            href={item.instagramUrl}
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

        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 transition-opacity duration-300">
            <div className="w-11 h-11 rounded-full bg-black/60 backdrop-blur-sm border border-white/30 text-white flex items-center justify-center pl-0.5 shadow-xl group-hover:scale-110 group-hover:bg-[#E88A1A] group-hover:text-[#1D261E] transition-all">
              <Play size={16} fill="currentColor" />
            </div>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 pointer-events-none drop-shadow">
          <p className="font-cursive text-xs sm:text-sm text-[#E88A1A] truncate">
            {item.title}
          </p>
          <p className="text-[10px] sm:text-[11px] font-semibold text-white/90 truncate leading-snug">
            {item.oneLineDetail}
          </p>
        </div>
      </div>
    </div>
  );
};

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const galleryItems = ALL_GALLERY_PHOTOS;
  const categories = ['ALL', 'BANQUET', 'LAWN', 'MANDAP', 'DECOR', 'FACADE', 'CATERING'];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

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
    <div className="pt-[78px] sm:pt-[88px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      
      {/* Landscaped Hero Banner */}
      <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden bg-[#151D16] mb-8 sm:mb-12">
        <img
          src="/images/heroes/gallery-hero.webp"
          alt="Sheesh Mahal Resort Panoramic View"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-black/35 to-black/20" />

        <div className="absolute inset-0 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-8 sm:pb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-[#E88A1A] uppercase drop-shadow-md">
              DEDICATED ARCHITECTURAL SHOWCASE & ARCHIVE
            </span>
            <span className="w-8 h-[1px] bg-[#E88A1A]"></span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm uppercase">
              {filteredItems.length} REAL PHOTOS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.85] text-white drop-shadow-md">
            PHOTO & REEL GALLERY
          </h1>

          <p className="font-cursive text-xl sm:text-3xl text-[#E88A1A] mt-1 font-normal drop-shadow-sm">
            Authentic Glimpse into Royal Ceremonies & Palatial Grounds
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* Filter Tabs */}
        <div className="pb-6 mb-8 border-b border-[#26532B]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p className="text-xs sm:text-sm text-[#1D261E]/80 max-w-xl font-normal">
            Real celebrations, grand ballrooms, starlit lawns, and sacred mandaps at Sheesh Mahal Resort, Patna.
          </p>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#1D261E] text-[#E88A1A] shadow-sm'
                    : 'clay-pill text-[#1D261E] hover:text-[#E88A1A]'
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
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1D261E]">
                  <LuxuryVisual
                    src={item.image}
                    alt={item.title}
                    aspectRatioClass="aspect-[4/3]"
                    title={item.title}
                    category={item.category}
                    priority={idx < 8}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 rounded-full bg-[#E88A1A] text-[#1D261E] flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Maximize2 size={18} />
                    </div>
                  </div>

                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="text-[8.5px] font-black uppercase tracking-wider text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm shadow-sm">
                      {item.category}
                    </span>
                  </div>
                </div>

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

        {/* Video Reel Archive in Gallery Page */}
        <div className="pt-8 sm:pt-12 border-t border-[#26532B]/20 mb-16 sm:mb-20">
          <div className="flex items-center gap-3 mb-2">
            <span className="label-utility text-[#1D261E]/70">
              OFFICIAL REEL & VIDEO ARCHIVE
            </span>
            <span className="w-8 sm:w-10 h-[1px] bg-[#26532B]"></span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[0.9] text-[#1D261E] mb-2">
            EXPERIENCE THE RESORT IN MOTION
          </h2>
          <p className="font-cursive text-xl sm:text-3xl text-[#26532B] mb-8 font-normal">
            Drone Sweeps, Baraat Processions & Sacred Saat Phere
          </p>

          {/* Landscape Videos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {GALLERY_VIDEOS.filter((v) => v.type === 'landscape').map((item) => (
              <RevealUp key={item.id}>
                <GalleryVideoCard item={item} />
              </RevealUp>
            ))}
          </div>

          {/* Portrait Videos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 max-w-2xl mx-auto gap-6 sm:gap-8 items-center justify-center">
            {GALLERY_VIDEOS.filter((v) => v.type === 'portrait').map((item) => (
              <RevealUp key={item.id}>
                <GalleryVideoCard item={item} />
              </RevealUp>
            ))}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 sm:p-6 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
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

          <div
            className="relative flex-1 flex items-center justify-center my-3 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 sm:left-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#E88A1A] hover:text-[#1D261E] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              key={filteredItems[activeLightboxIndex].id}
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-h-[75vh] max-w-[92vw] object-contain rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/20 select-none animate-in zoom-in-95 duration-200"
            />

            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 sm:right-4 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/60 hover:bg-[#E88A1A] hover:text-[#1D261E] text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          </div>

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
