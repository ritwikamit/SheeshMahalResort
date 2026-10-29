import React, { useState } from 'react';

export interface SheeshMahalLogoProps {
  /**
   * Layout presentation:
   * - 'header': Compact horizontal layout for the fixed top navigation
   * - 'footer': Prominent brand presentation for the luxury footer
   * - 'loading': Grand centered emblem for the loading screen
   * - 'symbol': Compact emblem view
   */
  variant?: 'header' | 'footer' | 'loading' | 'symbol';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
  className?: string;
  showSubtitle?: boolean;
}

export const SheeshMahalLogo: React.FC<SheeshMahalLogoProps> = ({
  variant = 'header',
  size = 'md',
  onClick,
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);

  // Path to tailored logo assets (Fast WebP with fallback)
  const [footerLogoSrc, setFooterLogoSrc] = useState('/images/logo-footer.webp');
  const [headerLogoSrc, setHeaderLogoSrc] = useState('/images/logo-header.webp');

  const handleImgError = (isFooter: boolean) => {
    if (isFooter && footerLogoSrc.endsWith('.webp')) {
      setFooterLogoSrc('/images/logo-footer.png');
    } else if (!isFooter && headerLogoSrc.endsWith('.webp')) {
      setHeaderLogoSrc('/images/logo-header.png');
    } else {
      setImgError(true);
    }
  };

  // Fallback in the rare event the image cannot be displayed
  const renderFallback = () => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-[#E88A1A] border-2 border-[#1D261E] flex items-center justify-center font-bold text-sm text-[#1D261E]">
        SM
      </div>
      <div className="flex flex-col text-left">
        <span className="text-lg font-black tracking-tighter text-[#1D261E] uppercase">
          SHEESH MAHAL
        </span>
        <span className="text-[10px] font-black tracking-[0.2em] text-[#E88A1A] uppercase -mt-0.5">
          RESORT • PATNA
        </span>
      </div>
    </div>
  );

  // Variant: Loading Screen (Pure transparent logo, no background box as requested)
  if (variant === 'loading') {
    return (
      <div
        className={`flex flex-col items-center text-center select-none ${className}`}
        onClick={onClick}
      >
        {!imgError ? (
          <img
            src={headerLogoSrc}
            alt="Sheesh Mahal Resort Palace Logo"
            onError={() => handleImgError(false)}
            className="w-[280px] sm:w-[380px] md:w-[460px] max-w-[85vw] h-auto object-contain drop-shadow-[0_8px_25px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-105"
          />
        ) : (
          renderFallback()
        )}
      </div>
    );
  }

  // Variant: Footer (High-impact large brand showcase, left-aligned)
  if (variant === 'footer') {
    return (
      <div
        onClick={onClick}
        className={`flex items-start justify-start select-none group text-left ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {!imgError ? (
          <img
            src={footerLogoSrc}
            alt="Sheesh Mahal Resort Palace Logo"
            onError={() => handleImgError(true)}
            className="h-24 sm:h-32 lg:h-36 w-auto max-w-[340px] sm:max-w-[440px] lg:max-w-[500px] object-contain object-left drop-shadow-sm group-hover:scale-[1.02] transition-transform duration-300"
          />
        ) : (
          renderFallback()
        )}
      </div>
    );
  }

  // Variant: Symbol
  if (variant === 'symbol') {
    const heightClass = {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
      xl: 'h-16'
    }[size];

    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {!imgError ? (
          <img
            src={headerLogoSrc}
            alt="Sheesh Mahal Resort"
            onError={() => handleImgError(false)}
            className={`${heightClass} w-auto object-contain transition-transform duration-300 group-hover:scale-105`}
          />
        ) : (
          renderFallback()
        )}
      </div>
    );
  }

  // Variant: Header (Default - sleek fixed navigation logo)
  const headerHeightClass = {
    sm: 'h-10 sm:h-11',
    md: 'h-11 sm:h-13 lg:h-14',
    lg: 'h-13 sm:h-15 lg:h-16',
    xl: 'h-16 sm:h-18'
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center select-none group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {!imgError ? (
        <img
          src={headerLogoSrc}
          alt="Sheesh Mahal Resort"
          onError={() => handleImgError(false)}
          className={`${headerHeightClass} w-auto max-w-[240px] sm:max-w-[320px] lg:max-w-[380px] object-contain object-left transition-transform duration-300 group-hover:scale-102`}
        />
      ) : (
        renderFallback()
      )}
    </div>
  );
};
