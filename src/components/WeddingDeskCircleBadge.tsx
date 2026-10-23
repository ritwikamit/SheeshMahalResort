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
        backgroundColor: '#FAEE2F',
        color: '#161726',
        animationDelay: bounceDelay
      }}
      className={`relative z-30 w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] rounded-full flex flex-col items-center justify-center text-[#161726] shadow-2xl border-2 border-[#161726] animate-bounce-slow cursor-pointer select-none transition-transform duration-300 hover:scale-110 active:scale-95 group ${className}`}
      title="Click to check wedding dates at Sheesh Mahal Resort"
    >
      {/* Outer subtle glow ring */}
      <div className="absolute inset-0 rounded-full border border-[#161726]/30 pointer-events-none scale-105 group-hover:scale-115 transition-transform duration-300 opacity-60"></div>

      {/* Cursive Number / Accent */}
      <span className="font-cursive text-3xl sm:text-4xl leading-none text-[#161726] font-normal mb-0.5 group-hover:text-[#161726] transition-colors">
        {badgeNumber}
      </span>

      {/* Title */}
      <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-center px-3 leading-tight text-[#161726]">
        {title}
      </span>

      {/* Cursive Subtitle */}
      <span className="font-cursive text-sm sm:text-base text-[#161726]/90 mt-0.5">
        {subtitle}
      </span>

      {/* Status label at bottom */}
      <span className="text-[7px] sm:text-[8px] font-bold tracking-wider uppercase text-[#161726] bg-[#161726]/10 px-2 py-0.5 rounded-sm mt-1">
        {statusText}
      </span>
    </div>
  );
};
