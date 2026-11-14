import React from 'react';

interface WeddingDeskCircleBadgeProps {
  id?: string;
  badgeNumber?: string;
  title?: string;
  subtitle?: string;
  statusText?: string;
  onClick: () => void;
  className?: string;
  bounceDelay?: string;
}

export const WeddingDeskCircleBadge: React.FC<WeddingDeskCircleBadgeProps> = ({
  id,
  badgeNumber = '24h',
  title = 'WEDDING DESK',
  subtitle = 'Dates Active',
  statusText = 'OPEN 24 HOURS',
  onClick,
  className = '',
  bounceDelay = '0s'
}) => {
  return (
    <div
      id={id}
      data-badge-circle="true"
      onClick={onClick}
      style={{
        backgroundColor: '#E88A1A',
        boxShadow: '8px 14px 28px rgba(232, 138, 26, 0.42), -6px -6px 18px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(255, 255, 255, 0.5), inset -3px -3px 6px rgba(0, 0, 0, 0.22)',
        color: '#1D261E',
        animationDelay: bounceDelay
      }}
      className={`relative z-30 w-[84px] h-[84px] sm:w-[108px] sm:h-[108px] lg:w-[118px] lg:h-[118px] rounded-full flex flex-col items-center justify-center text-white border-2 border-white/40 animate-bounce-slow cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 group shrink-0 ${className}`}
      title="Click to check wedding dates at Sheesh Mahal Resort"
    >
      {/* Outer subtle glow ring */}
      <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none scale-105 group-hover:scale-115 transition-transform duration-300 opacity-60"></div>

      {/* Cursive Number / Accent */}
      <span className="font-cursive text-xl sm:text-2xl lg:text-3xl leading-none text-white font-normal mb-0.5 group-hover:text-white transition-colors">
        {badgeNumber}
      </span>

      {/* Title */}
      <span className="text-[6.5px] sm:text-[8px] font-black uppercase tracking-widest text-center px-1.5 sm:px-2 leading-tight text-white">
        {title}
      </span>

      {/* Cursive Subtitle */}
      <span className="font-cursive text-[9px] sm:text-xs text-white/95 mt-0.5">
        {subtitle}
      </span>

      {/* Status label at bottom */}
      <span className="text-[6px] sm:text-[7px] font-bold tracking-wider uppercase text-[#1D261E] bg-white/90 font-black px-1 sm:px-1.5 py-0.5 rounded-sm mt-0.5">
        {statusText}
      </span>
    </div>
  );
};
