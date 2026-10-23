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
      className={`relative z-30 w-[115px] h-[115px] sm:w-[150px] sm:h-[150px] lg:w-[160px] lg:h-[160px] rounded-full flex flex-col items-center justify-center text-[#161726] shadow-2xl border-2 border-[#161726] animate-bounce-slow cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 group shrink-0 ${className}`}
      title="Click to check wedding dates at Sheesh Mahal Resort"
    >
      {/* Outer subtle glow ring */}
      <div className="absolute inset-0 rounded-full border border-[#161726]/30 pointer-events-none scale-105 group-hover:scale-115 transition-transform duration-300 opacity-60"></div>

      {/* Cursive Number / Accent */}
      <span className="font-cursive text-2xl sm:text-4xl leading-none text-[#161726] font-normal mb-0.5 group-hover:text-[#161726] transition-colors">
        {badgeNumber}
      </span>

      {/* Title */}
      <span className="text-[7.5px] sm:text-[9px] font-black uppercase tracking-widest text-center px-2 sm:px-3 leading-tight text-[#161726]">
        {title}
      </span>

      {/* Cursive Subtitle */}
      <span className="font-cursive text-xs sm:text-base text-[#161726]/90 mt-0.5">
        {subtitle}
      </span>

      {/* Status label at bottom */}
      <span className="text-[6.5px] sm:text-[8px] font-bold tracking-wider uppercase text-[#161726] bg-[#161726]/10 px-1.5 sm:px-2 py-0.5 rounded-sm mt-0.5 sm:mt-1">
        {statusText}
      </span>
    </div>
  );
};
