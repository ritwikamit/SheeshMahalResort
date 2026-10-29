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

  // Autoplay & viewport-triggered playback lifecycle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playVideo = () => {
      video
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    };

    const pauseVideo = () => {
      video.pause();
      setIsPlaying(false);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            playVideo();
          } else {
            pauseVideo();
          }
        });
      },
      { threshold: 0.15 }
    );
    observer.observe(video);

    const onUserGesture = () => {
      if (video.paused && observer) {
        // Only if intersecting
        const rect = video.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          playVideo();
        }
      }
    };
    window.addEventListener('click', onUserGesture, { once: true });
    window.addEventListener('touchstart', onUserGesture, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('click', onUserGesture);
      window.removeEventListener('touchstart', onUserGesture);
    };
  }, []);

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
      icon: <Flame className="w-8 h-8 text-[#FF5722]" strokeWidth={1.5} />,
      cursiveTag: 'High-Energy Grand Arrival',
      badge: 'BARAAT LAWN',
      description: 'Starlit driveway with traditional dhol beats, imperial welcome gates, and royal vintage carriage processions.'
    },
    {
      title: 'REVOLVING VARMALA STAGE',
      icon: <Sparkles className="w-8 h-8 text-[#76ABAE]" strokeWidth={1.5} />,
      cursiveTag: 'Cinematic Garland Exchange',
      badge: 'VARMALA STAGE',
      description: 'Dramatic revolving stage synchronised with cold pyrotechnics, starlit smoke effects, and fragrant marigold showers.'
    },
    {
      title: 'SACRED VEDIC MANDAP',
      icon: <SunMedium className="w-8 h-8 text-[#76ABAE]" strokeWidth={1.5} />,
      cursiveTag: 'Seven Eternal Vows',
      badge: 'SAAT PHERE',
      description: 'Consecrated floral mandap with authentic Vedic havan chanting, holy fire rites, and blessings under starry skies.'
    }
  ];

  return (
    <section
      id="wedding-reel"
      className="py-16 sm:py-24 lg:py-32 bg-[#76ABAE]/40 text-[#303841] border-b border-[#76ABAE]/20 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        
        {/* Section Header - Styled consistently with ServicesGrid and PhilosophySection */}
        <RevealUp>
          <div className="mb-10 sm:mb-14 lg:mb-16">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="label-utility text-[#303841]/70">
                REAL CELEBRATIONS IN MOTION
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#76ABAE]"></span>
            </div>

            <h2 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#303841]">
              WITNESS THE ROYAL GRANDEUR
            </h2>

            <p className="font-cursive text-2xl sm:text-4xl text-[#76ABAE] mt-2 font-normal">
              Authentic Wedding Celebrations in Motion
            </p>

            <p className="mt-4 text-base sm:text-xl text-[#303841]/75 max-w-3xl font-medium">
              Step inside an authentic royal wedding celebrated at Sheesh Mahal Resort. From majestic starlit Baraats to emotional Saat Phere under consecrated floral Mandaps — experience the pulse of Patna’s finest wedding sanctuary.
            </p>
          </div>
        </RevealUp>

        {/* Medium-Size Landscape Reel Showcase Box */}
        <RevealUp delay={120}>
          <div className="relative max-w-4xl mx-auto mb-14 sm:mb-20 pt-6">
            
            {/* Signature Circular Badge anchored to the TOP-LEFT corner of the reel container */}
            <div className="absolute -top-6 -left-1 sm:-top-10 sm:-left-6 md:-left-8 z-30 pointer-events-auto">
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

            {/* The Medium-Sized Landscape Video Card */}
            <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-2xl border sm:border-2 border-[#76ABAE]/30 group bg-[#303841]">
              
              {/* Landscape 16:9 Aspect Ratio Frame */}
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
                  preload="metadata"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  className="w-full h-full object-cover object-center"
                >
                  <source src="/videos/reel.mp4" type="video/mp4" />
                </video>

                {/* Subtle top & bottom vignette gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50 pointer-events-none" />

                {/* Top Bar: Channel Badge + Minimal Audio On/Off Button */}
                <div className="absolute top-0 left-0 right-0 p-3 sm:p-6 flex items-center justify-between gap-2 z-20 pointer-events-auto">
                  
                  {/* Left: Sheesh Mahal Live Pill */}
                  <div className="flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[9px] sm:text-xs font-black tracking-wider sm:tracking-widest uppercase truncate max-w-[55%] sm:max-w-none">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5722] animate-pulse shrink-0" />
                    <span className="truncate">SHEESH MAHAL FILM</span>
                  </div>

                  {/* Right: Minimal Audio On/Off Button */}
                  <button
                    type="button"
                    onClick={toggleAudio}
                    aria-label={isMuted ? 'Turn Audio On' : 'Turn Audio Off'}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-4 sm:py-2 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-xl backdrop-blur-md shrink-0 ${
                      isMuted
                        ? 'bg-black/70 text-white hover:bg-black/90 border border-white/30 hover:border-white'
                        : 'bg-[#FF5722] text-[#303841] hover:bg-[#F5F5F5] border border-[#FF5722] shadow-[#FF5722]/40'
                    }`}
                  >
                    {isMuted ? (
                      <>
                        <VolumeX size={14} className="sm:w-4 sm:h-4" />
                        <span>AUDIO OFF</span>
                      </>
                    ) : (
                      <>
                        <Volume2 size={14} className="sm:w-4 sm:h-4 text-[#303841] animate-pulse" />
                        <span className="text-[#303841]">AUDIO ON</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Play Overlay when video is paused */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center z-30 cursor-pointer transition-all"
                  >
                    <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full clay-btn-orange text-white flex items-center justify-center transform hover:scale-110 transition-transform">
                      <Play size={26} className="ml-1 fill-[#303841] sm:w-8 sm:h-8" />
                    </div>
                    <span className="mt-2.5 sm:mt-3 text-[9px] sm:text-xs font-black uppercase tracking-widest text-white bg-black/75 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-white/20 shadow-lg">
                      TAP TO PLAY
                    </span>
                  </div>
                )}

                {/* Play/Pause Center Flash Indicator */}
                {showPlayStateFlash && isPlaying && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-black/65 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl">
                      <Play size={24} className="ml-1 text-[#FF5722] sm:w-7 sm:h-7" />
                    </div>
                  </div>
                )}

                {/* Bottom Bar: Title, Progress Scrubber, Duration & Replay */}
                <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-6 z-20 pointer-events-auto">
                  
                  {/* Video Title & Location */}
                  <div className="flex items-center justify-between text-white drop-shadow mb-2 sm:mb-3">
                    <div>
                      <p className="font-cursive text-base sm:text-2xl text-[#FF5722]">
                        The Royal Nuptials
                      </p>
                      <p className="text-[10px] sm:text-sm font-bold tracking-tight uppercase">
                        BARAAT ARRIVAL & SACRED SAAT PHERE
                      </p>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        onClick={handleRestart}
                        title="Replay from start"
                        className="p-1.5 sm:p-2 rounded-full bg-black/50 border border-white/20 text-white/80 hover:text-white hover:bg-black/70 cursor-pointer transition-transform active:scale-90"
                      >
                        <RotateCcw size={13} className="sm:w-4 sm:h-4" />
                      </button>

                      <span className="hidden sm:inline text-[10px] font-mono tracking-widest uppercase font-bold text-white/90 bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                        UP TO 2000 GUESTS
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
                      className="h-full bg-gradient-to-r from-[#76ABAE] via-[#FF5722] to-[#FF5722] rounded-full relative transition-[width] duration-100"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Time Counter */}
                  <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-white/70 mt-1.5">
                    <span>{formatTime(currentTime)}</span>
                    <span className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={toggleAudio}
                        className="text-[#FF5722] font-bold hover:underline cursor-pointer"
                      >
                        {isMuted ? 'UNMUTE AUDIO' : 'MUTED'}
                      </button>
                      <span>·</span>
                      <span>{formatTime(duration)}</span>
                    </span>
                  </div>

                </div>

              </div>

              {/* Bottom Quick Control Bar */}
              <div className="px-5 py-3 bg-[#11121d] border-t border-white/10 flex items-center justify-between text-xs font-black uppercase tracking-wider text-white">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    className="flex items-center gap-1.5 text-white hover:text-[#FF5722] cursor-pointer"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                  </button>

                  <span className="text-white/20">|</span>

                  {/* Audio Status */}
                  <button
                    type="button"
                    onClick={toggleAudio}
                    className={`flex items-center gap-1.5 cursor-pointer transition-colors ${
                      isMuted ? 'text-white/70 hover:text-white' : 'text-[#FF5722]'
                    }`}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                    <span>{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 text-[#76ABAE]">
                  <MapPin size={13} className="text-[#FF5722]" />
                  <span className="text-[10px] font-mono tracking-widest uppercase">
                    PATNA 800011
                  </span>
                </div>
              </div>

            </div>
          </div>
        </RevealUp>

        {/* 3 Highlight Cards - Designed consistently with PhilosophySection & ServicesGrid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {reelHighlights.map((item, idx) => (
            <RevealUp key={idx} delay={idx * 100}>
              <div className="p-8 sm:p-10 clay-card h-full flex flex-col justify-between group hover:border-[#FF5722]/50 transition-all duration-500">
                <div>
                  <div className="flex items-center justify-between mb-5 sm:mb-6">
                    <div className="p-3 bg-[#76ABAE] rounded-xl border border-[#76ABAE]/20">
                      {item.icon}
                    </div>
                    <span className="text-[9px] font-black tracking-widest uppercase bg-[#303841] text-[#FF5722] px-2.5 py-1 rounded-md">
                      {item.badge}
                    </span>
                  </div>

                  <p className="font-cursive text-2xl text-[#76ABAE] mb-1 font-normal">
                    {item.cursiveTag}
                  </p>
                  <h3 className="text-xl font-black uppercase tracking-tight text-[#303841] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#303841]/80 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#76ABAE]/15 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#303841]/60">
                    4K LIVE CAPTURE
                  </span>
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="text-xs font-black uppercase tracking-wider text-[#76ABAE] hover:text-[#303841] transition-colors cursor-pointer"
                  >
                    INQUIRE DATES →
                  </button>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>

        {/* Bottom Call to Action Bar */}
        <RevealUp delay={200}>
          <div className="p-6 sm:p-10 clay-card-dark text-[#F5F5F5] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-cursive text-2xl sm:text-3xl text-[#FF5722]">
                Plan Your Royal Wedding At Sheesh Mahal
              </p>
              <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white/80 mt-1">
                Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna 800011
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="inline-flex items-center gap-3 px-6 py-3.5 clay-btn-orange font-black text-xs sm:text-sm uppercase tracking-[0.2em] cursor-pointer shrink-0"
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
