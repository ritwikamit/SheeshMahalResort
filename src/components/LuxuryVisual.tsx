import React, { useState } from 'react';

interface LuxuryVisualProps {
  src: string;
  alt: string;
  aspectRatioClass?: string;
  className?: string;
  title?: string;
  category?: string;
}

export const LuxuryVisual: React.FC<LuxuryVisualProps> = ({
  src,
  alt,
  aspectRatioClass = 'aspect-[3/4]',
  className = '',
  title = 'Sanctuary',
  category = 'Resort'
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#161726] ${aspectRatioClass} ${className} group`}
    >
      {/* Fallback & Loading state: Royal Sheesh Architectural Motif with the custom color palette */}
      <div
        className={`absolute inset-0 flex flex-col justify-between p-8 bg-[#161726] text-[#FAFDFB] transition-opacity duration-700 ${
          isLoaded && !hasError ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        {/* Geometric palace lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="sheesh-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#9FA1FF" strokeWidth="0.75" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#sheesh-grid)" />
            <circle cx="50%" cy="50%" r="35%" fill="none" stroke="#FAEE2F" strokeWidth="1" />
            <polygon points="50,10 90,90 10,90" fill="none" stroke="#B5BAFF" strokeWidth="0.5" transform="scale(3) translate(10,10)" />
          </svg>
        </div>

        {/* Content in fallback */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#FAEE2F]">
            {category}
          </span>
          <span className="text-[10px] tracking-widest text-[#B5BAFF] uppercase font-semibold">
            PATNA · 800011
          </span>
        </div>

        <div className="relative z-10">
          <div className="w-12 h-1 bg-[#FAEE2F] mb-4"></div>
          <p className="text-xl font-black tracking-tight text-[#FAFDFB] uppercase leading-tight">
            {title}
          </p>
          <p className="text-xs text-[#D9F9DF] tracking-wider mt-2 font-medium">
            Sheesh Mahal Resort & Banquets
          </p>
        </div>
      </div>

      {/* Main Photographic Image with strict grayscale -> color + scale 1.08 transition */}
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover img-luxury-hover select-none transition-opacity duration-700 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
};
