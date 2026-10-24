import React, { useState, useRef, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  Heart,
  Share2,
  Sparkles,
  Film,
  CheckCircle2,
  ArrowRight,
  Music,
  RotateCcw,
  Calendar
} from 'lucide-react';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface ReelShowcaseProps {
  onOpenInquiry: () => void;
}

export const ReelShowcase: React.FC<ReelShowcaseProps> = ({ onOpenInquiry }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(35);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(2480);
  const [showPlayStateFlash, setShowPlayStateFlash] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  // Sync state on video timeupdate
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 35;
    setCurrentTime(curr);
    setDuration(dur);
    setProgress((curr / dur) * 100);
  };

  // Toggle Mute / Minimal Audio on-off
  const toggleAudio = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!videoRef.current) return;

    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);

    // If unmuting and video was paused, resume playback
    if (!nextMuted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  // Toggle Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
    setShowPlayStateFlash(true);
    setTimeout(() => setShowPlayStateFlash(false), 700);
  };

  // Handle Scrubbing on Progress Bar
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

  // Format MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Toggle Like
  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (liked) {
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setLikeCount((prev) => prev + 1);
    }
  };

  // Share Reel
  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareUrl = window.location.href.split('#')[0] + '#wedding-reel';
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sheesh Mahal Resort | Royal Wedding Reel',
          text: 'Watch authentic royal wedding celebrations at Sheesh Mahal Resort, Patna!',
          url: shareUrl
        });
      } catch {
        // Fallback to clipboard
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2200);
    }
  };

  // Restart video
  const handleRestart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play().catch(() => {});
    setIsPlaying(true);
  };

  return (
    <section
      id="wedding-reel"
      className="relative w-full py-16 sm:py-24 lg:py-28 bg-[#161726] text-[#FAFDFB] overflow-hidden border-b border-[#9FA1FF]/20"
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#9FA1FF]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#FAEE2F]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-12 sm:mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAEE2F]/15 border border-[#FAEE2F]/30 text-[#FAEE2F] text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase mb-4 shadow-sm">
            <Film size={13} className="text-[#FAEE2F]" />
            <span>REAL CELEBRATIONS IN MOTION</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.95] text-white">
            WITNESS THE ROYAL{' '}
            <span className="font-cursive text-5xl sm:text-7xl lg:text-8xl text-[#FAEE2F] capitalize font-normal tracking-normal block sm:inline">
              Grandeur
            </span>
          </h2>

          <p className="mt-4 sm:mt-5 text-sm sm:text-lg text-white/75 font-medium leading-relaxed">
            Step inside a live wedding at Sheesh Mahal Resort. From majestic starlit Baraats to emotional Saat Phere under consecrated floral Mandaps — experience the pulse of Patna’s finest wedding sanctuary.
          </p>
        </div>

        {/* Main Grid: Reel Player & Story Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Instagram-style Luxury Phone Reel Player */}
          <div className="lg:col-span-5 flex justify-center order-1 lg:order-1">
            <div className="relative w-full max-w-[360px] sm:max-w-[380px]">
              
              {/* Outer decorative halo */}
              <div className="absolute -inset-2 sm:-inset-3 rounded-[38px] bg-gradient-to-b from-[#9FA1FF]/30 via-transparent to-[#FAEE2F]/20 blur-xl opacity-75 pointer-events-none" />

              {/* Reel Device / Card Container */}
              <div className="relative rounded-[32px] overflow-hidden bg-black border-2 border-[#9FA1FF]/40 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] group select-none">
                
                {/* 9:16 Vertical Video Frame */}
                <div
                  className="relative aspect-[9/16] w-full bg-black cursor-pointer overflow-hidden"
                  onClick={togglePlay}
                >
                  <video
                    ref={videoRef}
                    src="/videos/reel.mp4"
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover"
                  />

                  {/* Top Header Overlay */}
                  <div className="absolute top-0 left-0 right-0 p-4 pt-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent z-20 flex items-center justify-between pointer-events-auto">
                    {/* Channel / Venue Avatar */}
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#FAEE2F] p-0.5 shadow-md flex items-center justify-center overflow-hidden border border-white/20">
                        <img
                          src="/SheeshMahalLogo.png"
                          alt="Sheesh Mahal"
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-black tracking-tight text-white">sheeshmahalresort</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FAEE2F]" />
                        </div>
                        <span className="text-[10px] text-white/75 font-medium tracking-wide">Patna · Ashiana-Digha</span>
                      </div>
                    </div>

                    {/* Minimal Audio On/Off Button - Top Bar */}
                    <button
                      type="button"
                      onClick={toggleAudio}
                      aria-label={isMuted ? 'Turn Audio On' : 'Turn Audio Off'}
                      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-lg backdrop-blur-md ${
                        isMuted
                          ? 'bg-black/60 text-white/80 hover:bg-black/80 border border-white/20 hover:text-white'
                          : 'bg-[#FAEE2F] text-[#161726] hover:bg-[#FAFDFB] border border-[#FAEE2F] shadow-[#FAEE2F]/30'
                      }`}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX size={14} className="text-white/80" />
                          <span className="text-[10px]">SOUND OFF</span>
                        </>
                      ) : (
                        <>
                          <Volume2 size={14} className="text-[#161726] animate-pulse" />
                          <span className="text-[10px] text-[#161726]">SOUND ON</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Play/Pause Center Flash Indicator */}
                  {showPlayStateFlash && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-black/65 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl animate-scale-in">
                        {isPlaying ? <Play size={28} className="ml-1 text-[#FAEE2F]" /> : <Pause size={28} className="text-white" />}
                      </div>
                    </div>
                  )}

                  {/* Right Side Social Floating Action Rail */}
                  <div className="absolute right-3 bottom-24 z-20 flex flex-col items-center gap-4 pointer-events-auto">
                    
                    {/* Minimal Audio Toggle Icon Button with Tooltip */}
                    <button
                      type="button"
                      onClick={toggleAudio}
                      title={isMuted ? 'Click for Sound' : 'Mute Audio'}
                      aria-label="Toggle Reel Audio"
                      className={`w-11 h-11 rounded-full flex flex-col items-center justify-center transition-transform active:scale-90 shadow-xl cursor-pointer backdrop-blur-md ${
                        isMuted
                          ? 'bg-black/60 text-white border border-white/30 hover:border-white'
                          : 'bg-[#FAEE2F] text-[#161726] border-2 border-white ring-2 ring-[#FAEE2F]/50 animate-bounce-slow'
                      }`}
                    >
                      {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="font-black" />}
                    </button>

                    {/* Like Button */}
                    <button
                      type="button"
                      onClick={handleLike}
                      className="group flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-90"
                      aria-label="Like wedding reel"
                    >
                      <div
                        className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors shadow-lg backdrop-blur-md border ${
                          liked
                            ? 'bg-red-500 border-red-400 text-white'
                            : 'bg-black/50 border-white/20 text-white hover:bg-black/70'
                        }`}
                      >
                        <Heart size={20} className={liked ? 'fill-current text-white' : ''} />
                      </div>
                      <span className="text-[10px] font-black text-white drop-shadow">
                        {likeCount.toLocaleString()}
                      </span>
                    </button>

                    {/* Share Button */}
                    <button
                      type="button"
                      onClick={handleShare}
                      className="flex flex-col items-center gap-1 cursor-pointer transition-transform active:scale-90"
                      aria-label="Share wedding reel"
                    >
                      <div className="w-11 h-11 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white hover:bg-black/70 shadow-lg backdrop-blur-md">
                        <Share2 size={18} />
                      </div>
                      <span className="text-[10px] font-bold text-white drop-shadow">
                        {copyFeedback ? 'Copied!' : 'Share'}
                      </span>
                    </button>

                    {/* Replay Button */}
                    <button
                      type="button"
                      onClick={handleRestart}
                      title="Replay from start"
                      className="w-11 h-11 rounded-full bg-black/50 border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-black/70 shadow-lg backdrop-blur-md cursor-pointer transition-transform active:scale-90"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>

                  {/* Bottom Caption & Audio Track Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 pb-4 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-20 pointer-events-auto">
                    
                    {/* Caption text */}
                    <p className="text-xs sm:text-sm font-semibold text-white/95 line-clamp-2 drop-shadow mb-2">
                      Royal Baraat Entry & Sacred Saat Phere at Sheesh Mahal Resort ✨ The palace wedding of dreams.
                    </p>

                    {/* Audio track ticker + Animated Sound waves */}
                    <div className="flex items-center justify-between text-white/80 text-[11px] font-medium pt-1 border-t border-white/15">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <Music size={12} className={isMuted ? 'text-white/60' : 'text-[#FAEE2F] animate-spin'} />
                        <span className="truncate text-[10px] font-mono tracking-tight text-white/85">
                          Sheesh Mahal Wedding Film · Original Sound
                        </span>
                      </div>

                      {/* Sound wave animated bars */}
                      <div className="flex items-end gap-0.5 h-3 shrink-0 ml-2">
                        <span className={`w-0.5 bg-[#FAEE2F] rounded-full transition-all duration-300 ${!isMuted && isPlaying ? 'h-3 animate-pulse' : 'h-1'}`} />
                        <span className={`w-0.5 bg-[#FAEE2F] rounded-full transition-all duration-300 ${!isMuted && isPlaying ? 'h-2 animate-bounce' : 'h-1'}`} />
                        <span className={`w-0.5 bg-[#FAEE2F] rounded-full transition-all duration-300 ${!isMuted && isPlaying ? 'h-3.5 animate-pulse' : 'h-1'}`} />
                        <span className={`w-0.5 bg-[#FAEE2F] rounded-full transition-all duration-300 ${!isMuted && isPlaying ? 'h-1.5 animate-bounce' : 'h-1'}`} />
                      </div>
                    </div>

                    {/* Scrubbable Progress Bar */}
                    <div
                      ref={progressBarRef}
                      onClick={handleProgressClick}
                      className="mt-3 relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden group/bar"
                    >
                      <div
                        className="h-full bg-gradient-to-r from-[#9FA1FF] via-[#FAEE2F] to-[#FAEE2F] rounded-full relative transition-[width] duration-100"
                        style={{ width: `${progress}%` }}
                      >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                      </div>
                    </div>

                    {/* Time Counter */}
                    <div className="flex items-center justify-between text-[9px] font-mono text-white/60 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>

                  </div>
                </div>

                {/* Bottom Quick Control Bar */}
                <div className="px-4 py-3 bg-[#11121d] border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="text-xs font-black uppercase tracking-wider text-white hover:text-[#FAEE2F] flex items-center gap-1.5 cursor-pointer"
                    >
                      {isPlaying ? <Pause size={13} /> : <Play size={13} />}
                      <span>{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                    </button>
                    <span className="text-white/20">|</span>
                    {/* Minimal Audio Button */}
                    <button
                      type="button"
                      onClick={toggleAudio}
                      className={`text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isMuted ? 'text-white/70 hover:text-white' : 'text-[#FAEE2F]'
                      }`}
                    >
                      {isMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
                      <span>{isMuted ? 'AUDIO OFF' : 'AUDIO ON'}</span>
                    </button>
                  </div>

                  <span className="text-[10px] font-mono text-[#FAEE2F] font-bold tracking-widest uppercase">
                    4K LIVE
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Column: Editorial Wedding Storytelling & Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-2">
            
            <div className="mb-4 flex items-center gap-3">
              <span className="font-cursive text-2xl sm:text-3xl text-[#FAEE2F]">
                Cinematic Wedding Moments
              </span>
              <span className="w-8 h-[1px] bg-[#9FA1FF]" />
            </div>

            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-white mb-6 leading-tight">
              EVERY CELEBRATION DESERVES A ROYAL STAGE
            </h3>

            <p className="text-base sm:text-lg text-white/80 leading-relaxed font-normal mb-8">
              Watch authentic wedding footage captured right here at Sheesh Mahal Resort. Our 60,000+ sq.ft royal property brings together starlit grand Baraat entries, pillarless royal ballrooms, consecrated Vedic mandaps, and curated gourmet banquets for up to 2,000 wedding guests.
            </p>

            {/* 4 Feature Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#9FA1FF]/40 transition-colors">
                <div className="flex items-center gap-2.5 text-[#FAEE2F] font-black text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle2 size={16} />
                  <span>Starlit Baraat Corridors</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Grand welcome gates, royal vintage carriages, and high-energy procession pathways.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FAEE2F]/40 transition-colors">
                <div className="flex items-center gap-2.5 text-[#FAEE2F] font-black text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle2 size={16} />
                  <span>Revolving Varmala Stage</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Cinematic revolving stages with synchronised cold pyrotechnics and floral showers.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#9FA1FF]/40 transition-colors">
                <div className="flex items-center gap-2.5 text-[#FAEE2F] font-black text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle2 size={16} />
                  <span>Vedic Sacred Mandaps</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Consecrated ceremonial platforms with live havan facilities and traditional chants.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-[#FAEE2F]/40 transition-colors">
                <div className="flex items-center gap-2.5 text-[#FAEE2F] font-black text-xs uppercase tracking-wider mb-1.5">
                  <CheckCircle2 size={16} />
                  <span>Shahi Feast Banquets</span>
                </div>
                <p className="text-xs text-white/70 leading-relaxed">
                  Extravagant live culinary counters and authentic Mithila & Awadhi wedding menus.
                </p>
              </div>
            </div>

            {/* Verified Quote */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-[#9FA1FF]/10 to-[#FAEE2F]/10 border-l-4 border-[#FAEE2F] mb-8">
              <p className="font-cursive text-xl sm:text-2xl text-[#FAEE2F] mb-1">
                "The actual wedding night looked even more magical than the reel."
              </p>
              <p className="text-xs font-bold uppercase tracking-wider text-white/75">
                — Royal Wedding Host, Patna
              </p>
            </div>

            {/* Interactive CTAs */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#FAEE2F] text-[#161726] font-black text-xs sm:text-sm uppercase tracking-[0.2em] rounded-md hover:bg-[#FAFDFB] transition-colors shadow-lg shadow-[#FAEE2F]/20 cursor-pointer"
              >
                <Calendar size={16} />
                <span>BOOK YOUR WEDDING DATE</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={toggleAudio}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/20 text-white hover:border-[#FAEE2F] hover:text-[#FAEE2F] transition-colors text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                {isMuted ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{isMuted ? 'ENABLE REEL AUDIO' : 'MUTE REEL AUDIO'}</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
