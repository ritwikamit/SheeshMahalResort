import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Flame,
  Sparkles,
  SunMedium,
  ArrowRight,
  RotateCcw,
  Calendar,
  MapPin
} from 'lucide-react';
import { RevealUp } from './RevealUp.tsx';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface ReelShowcaseProps {
  onOpenInquiry: () => void;
}

export const ReelShowcase: React.FC<ReelShowcaseProps> = ({ onOpenInquiry }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(35);
  const [showPlayStateFlash, setShowPlayStateFlash] = useState(false);

  // Robust autoplay and scroll-triggered playback lifecycle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = isMuted;
    video.playsInline = true;

    const playVideo = () => {
      if (!video) return;
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay restricted until interaction
          });
      }
    };

    // Attempt playback immediately
    playVideo();

    // Observer to play when user scrolls to section
    let observer: IntersectionObserver | null = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              playVideo();
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(video);
    }

    // Unmute or play on first user interaction
    const onUserGesture = () => {
      if (video && video.paused) {
        playVideo();
      }
    };

    ['touchstart', 'click', 'scroll', 'pointerdown'].forEach((evt) => {
      window.addEventListener(evt, onUserGesture, { once: true, passive: true });
    });

    return () => {
      if (observer) observer.disconnect();
      ['touchstart', 'click', 'scroll', 'pointerdown'].forEach((evt) => {
        window.removeEventListener(evt, onUserGesture);
      });
    };
  }, [isMuted]);

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 35;
    setCurrentTime(curr);
    setDuration(dur);
    setProgress((curr / dur) * 100);
  };

  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);

    if (!nextMuted && video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowPlayStateFlash(true);
    setTimeout(() => setShowPlayStateFlash(false), 700);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!progressBarRef.current || !videoRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const newTime = ratio * (videoRef.current.duration || 35);
    videoRef.current.currentTime = newTime;
    setProgress(ratio * 100);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
  };

  const reelHighlights = [
    {
      title: 'STARLIT BARAAT PROCESSION',
      icon: <Flame className="w-6 h-6 text-white" strokeWidth={1.75} />,
      cursiveTag: 'High-Energy Grand Arrival',
      badge: 'BARAAT LAWN',
      description: 'Starlit driveway with traditional dhol beats, imperial welcome gates, and royal vintage carriage processions.'
    },
    {
      title: 'REVOLVING VARMALA STAGE',
      icon: <Sparkles className="w-6 h-6 text-white" strokeWidth={1.75} />,
      cursiveTag: 'Cinematic Garland Exchange',
      badge: 'VARMALA STAGE',
      description: 'Dramatic revolving stage synchronised with cold pyrotechnics, starlit smoke effects, and fragrant marigold showers.'
    },
    {
      title: 'SACRED VEDIC MANDAP',
      icon: <SunMedium className="w-6 h-6 text-white" strokeWidth={1.75} />,
      cursiveTag: 'Seven Eternal Vows',
      badge: 'SAAT PHERE',
      description: 'Consecrated floral mandap with authentic Vedic havan chanting, holy fire rites, and blessings under starry skies.'
    }
  ];

  return (
    <section
      id="wedding-reel"
      className="py-16 sm:py-24 lg:py-32 bg-[#FAF6EE] text-[#1D261E] border-b border-[#26532B]/15 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        
        {/* Split 2-Column Grid: Left storytelling & highlights, Right compact video card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-12 sm:mb-16">
          
          {/* Left 7 Columns: Editorial Headline, Storytelling & 3 Wedding Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <RevealUp>
              <div className="flex items-center gap-3 mb-3">
                <span className="label-utility text-[#1D261E]/70">
                  REAL CELEBRATIONS IN MOTION
                </span>
                <span className="w-8 sm:w-10 h-[1px] bg-[#26532B]"></span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#1D261E]">
                WITNESS THE ROYAL GRANDEUR
              </h2>

              <p className="font-cursive text-2xl sm:text-4xl text-[#E88A1A] mt-2 font-normal">
                Authentic Wedding Celebrations in Motion
              </p>

              <p className="mt-4 text-sm sm:text-base text-[#1D261E]/80 max-w-2xl font-medium leading-relaxed">
                Step inside an authentic royal wedding celebrated at Sheesh Mahal Resort. From majestic starlit Baraats to emotional Saat Phere under consecrated floral Mandaps — experience the pulse of Patna’s finest wedding sanctuary.
              </p>

              {/* 3 Highlight Cards with High-Contrast White Icons on Emerald Green */}
              <div className="mt-8 space-y-3.5">
                {reelHighlights.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 sm:p-4 rounded-2xl clay-card flex items-start gap-4 hover:border-[#E88A1A]/40 transition-all"
                  >
                    <div className="p-2.5 bg-[#26532B] text-white rounded-xl border border-white/20 shadow-xs shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#1D261E]">
                          {item.title}
                        </h4>
                        <span className="text-[9px] font-black uppercase tracking-widest text-[#E88A1A] bg-[#1D261E] px-2 py-0.5 rounded shadow-2xs">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] sm:text-xs text-[#1D261E]/75 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Inquiry CTAs */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenInquiry}
                  className="clay-btn-gold px-6 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md cursor-pointer"
                >
                  BOOK DATES FOR WEDDING
                </button>

                <a
                  href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20your%20wedding%20lawns.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="clay-pill px-5 py-3 text-xs font-black uppercase tracking-wider text-[#1D261E] hover:text-[#25D366] transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-[#25D366]" />
                  <span>WHATSAPP DESK</span>
                </a>
              </div>
            </RevealUp>
          </div>

          {/* Right 5 Columns: Compact Video Card Positioned on the Right */}
          <div className="lg:col-span-5 relative mt-6 lg:mt-0">
            <RevealUp delay={120}>
              <div className="relative pt-6">
                
                {/* Signature Circular Badge anchored to the TOP-LEFT corner */}
                <div className="absolute -top-4 -left-2 sm:-top-6 sm:-left-4 z-30 pointer-events-auto">
                  <WeddingDeskCircleBadge
                    id="badge-section-reel"
                    badgeNumber="4K"
                    title="WEDDING REEL"
                    subtitle="Live In Motion"
                    statusText="REAL WEDDING"
                    onClick={onOpenInquiry}
                    bounceDelay="0.6s"
                  />
                </div>

                {/* Compact Landscape Video Card */}
                <div className="relative rounded-[22px] overflow-hidden shadow-2xl border-2 border-white/80 group bg-[#1D261E]">
                  
                  {/* 16:9 Aspect Ratio Frame */}
                  <div
                    className="relative aspect-video w-full bg-black cursor-pointer overflow-hidden select-none"
                    onClick={togglePlay}
                  >
                    <video
                      ref={videoRef}
                      autoPlay
                      loop
                      muted={isMuted}
                      playsInline
                      preload="auto"
                      onLoadedData={(e) => { e.currentTarget.muted = isMuted; e.currentTarget.play().catch(() => {}); }}
                      onPlay={() => setIsPlaying(true)}
                      onPause={() => setIsPlaying(false)}
                      onTimeUpdate={handleTimeUpdate}
                      className="w-full h-full object-cover object-center"
                    >
                      <source src="/videos/reel.mp4" type="video/mp4" />
                    </video>

                    {/* Gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                    {/* Top Bar: Live Pill + Minimal Audio On/Off Button */}
                    <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 flex items-center justify-between gap-2 z-20 pointer-events-auto">
                      <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] font-black tracking-wider uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E88A1A] animate-pulse shrink-0" />
                        <span>SHEESH MAHAL FILM</span>
                      </div>

                      <button
                        type="button"
                        onClick={toggleAudio}
                        aria-label={isMuted ? 'Turn Audio On' : 'Turn Audio Off'}
                        className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md shrink-0 ${
                          isMuted
                            ? 'bg-black/70 text-white hover:bg-black/90 border border-white/30 hover:border-white'
                            : 'bg-[#E88A1A] text-[#1D261E] hover:bg-[#FAF6EE] border border-[#E88A1A]'
                        }`}
                      >
                        {isMuted ? (
                          <>
                            <VolumeX size={12} />
                            <span>AUDIO OFF</span>
                          </>
                        ) : (
                          <>
                            <Volume2 size={12} className="text-[#1D261E] animate-pulse" />
                            <span className="text-[#1D261E]">AUDIO ON</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Play Overlay when video is paused */}
                    {!isPlaying && (
                      <div
                        onClick={togglePlay}
                        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] flex flex-col items-center justify-center z-30 cursor-pointer transition-all"
                      >
                        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full clay-btn-gold text-white flex items-center justify-center transform hover:scale-110 transition-transform">
                          <Play size={22} className="ml-1 fill-white sm:w-7 sm:h-7" />
                        </div>
                        <span className="mt-2 text-[9px] font-black uppercase tracking-widest text-white bg-black/75 px-3 py-1 rounded-full border border-white/20 shadow-lg">
                          TAP TO PLAY
                        </span>
                      </div>
                    )}

                    {/* Play/Pause Center Flash Indicator */}
                    {showPlayStateFlash && isPlaying && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-black/65 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl">
                          <Play size={20} className="ml-0.5 text-[#E88A1A]" />
                        </div>
                      </div>
                    )}

                    {/* Bottom Bar: Title, Progress Scrubber, Duration & Replay */}
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 z-20 pointer-events-auto">
                      
                      <div className="flex items-center justify-between text-white drop-shadow mb-1.5">
                        <div>
                          <p className="font-cursive text-sm sm:text-lg text-[#E88A1A]">
                            The Royal Nuptials
                          </p>
                          <p className="text-[9px] sm:text-xs font-bold tracking-tight uppercase">
                            BARAAT ARRIVAL & SACRED SAAT PHERE
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={handleRestart}
                            title="Replay from start"
                            className="p-1 rounded-full bg-black/50 border border-white/20 text-white/80 hover:text-white hover:bg-black/70 cursor-pointer transition-transform active:scale-90"
                          >
                            <RotateCcw size={12} />
                          </button>

                          <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase font-bold text-white/90 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                            4K LIVE
                          </span>
                        </div>
                      </div>

                      {/* Scrubbable Progress Bar */}
                      <div
                        ref={progressBarRef}
                        onClick={handleProgressClick}
                        className="relative w-full h-1.5 bg-white/25 rounded-full cursor-pointer overflow-hidden group/bar"
                      >
                        <div
                          className="h-full bg-gradient-to-r from-[#26532B] via-[#E88A1A] to-[#E88A1A] rounded-full relative transition-[width] duration-100"
                          style={{ width: `${progress}%` }}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                        </div>
                      </div>

                      {/* Time Counter */}
                      <div className="flex items-center justify-between text-[9px] font-mono text-white/70 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration || 35)}</span>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </RevealUp>
          </div>

        </div>

        {/* Bottom Call to Action Bar */}
        <RevealUp delay={200}>
          <div className="p-6 sm:p-10 clay-card-dark text-[#FAF6EE] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-cursive text-2xl sm:text-3xl text-[#E88A1A]">
                Plan Your Royal Wedding At Sheesh Mahal
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/85 mt-1">
                Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna 800011
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-3 px-6 py-3.5 clay-btn-gold text-white font-black text-xs sm:text-sm uppercase tracking-[0.2em] cursor-pointer shrink-0 shadow-lg"
            >
              <Calendar size={16} />
              <span>BOOK YOUR WEDDING DATE</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </RevealUp>

      </div>
    </section>
  );
};
