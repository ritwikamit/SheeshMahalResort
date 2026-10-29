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
        backgroundColor: '#FF5722',
        boxShadow: '8px 14px 28px rgba(255, 87, 34, 0.42), -6px -6px 18px rgba(255, 255, 255, 0.8), inset 3px 3px 5px rgba(255, 255, 255, 0.5), inset -3px -3px 6px rgba(0, 0, 0, 0.22)',
        color: '#303841',
        animationDelay: bounceDelay
      }}
      className={`relative z-30 w-[115px] h-[115px] sm:w-[150px] sm:h-[150px] lg:w-[160px] lg:h-[160px] rounded-full flex flex-col items-center justify-center text-white border-2 border-white/40 animate-bounce-slow cursor-pointer select-none transition-transform duration-300 hover:scale-105 active:scale-95 group shrink-0 ${className}`}
      title="Click to check wedding dates at Sheesh Mahal Resort"
    >
      {/* Outer subtle glow ring */}
      <div className="absolute inset-0 rounded-full border border-white/40 pointer-events-none scale-105 group-hover:scale-115 transition-transform duration-300 opacity-60"></div>

      {/* Cursive Number / Accent */}
      <span className="font-cursive text-2xl sm:text-4xl leading-none text-white font-normal mb-0.5 group-hover:text-white transition-colors">
        {badgeNumber}
      </span>

      {/* Title */}
      <span className="text-[7.5px] sm:text-[9px] font-black uppercase tracking-widest text-center px-2 sm:px-3 leading-tight text-white">
        {title}
      </span>

      {/* Cursive Subtitle */}
      <span className="font-cursive text-xs sm:text-base text-white/95 mt-0.5">
        {subtitle}
      </span>

      {/* Status label at bottom */}
      <span className="text-[6.5px] sm:text-[8px] font-bold tracking-wider uppercase text-[#303841] bg-white/90 font-black px-1.5 sm:px-2 py-0.5 rounded-sm mt-0.5 sm:mt-1">
        {statusText}
      </span>
    </div>
  );
};
