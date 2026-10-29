import React, { useState, useEffect, useRef } from 'react';

interface LuxuryVisualProps {
  src: string;
  alt: string;
  aspectRatioClass?: string;
  className?: string;
  title?: string;
  category?: string;
  priority?: boolean;
}

export const LuxuryVisual: React.FC<LuxuryVisualProps> = ({
  src,
  alt,
  aspectRatioClass = 'aspect-[3/4]',
  className = '',
  title = 'Sanctuary',
  category = 'Resort',
  priority = false
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Check if image is already cached/complete on mount or when src changes
  useEffect(() => {
    setHasError(false);
    if (imgRef.current) {
      if (imgRef.current.complete && imgRef.current.naturalWidth > 0) {
        setIsLoaded(true);
      } else {
        setIsLoaded(false);
      }
    }
  }, [src]);

  const webpSrc = src.match(/\.(png|jpg|jpeg)$/i)
    ? src.replace(/\.(png|jpg|jpeg)$/i, '.webp')
    : null;

  return (
    <div
      className={`relative overflow-hidden bg-[#303841] ${aspectRatioClass} ${className} group`}
    >
      {/* Sleek luxury shimmer loading state while image downloads */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-[#303841] flex items-center justify-center z-[1] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#76ABAE]/10 to-transparent animate-pulse" />
          <div className="flex flex-col items-center gap-2 text-center p-4">
            <div className="w-6 h-6 border-2 border-[#FF5722]/30 border-t-[#FF5722] rounded-full animate-spin" />
            <span className="text-[9px] font-black uppercase tracking-widest text-[#76ABAE]/80">
              {title}
            </span>
          </div>
        </div>
      )}

      {/* Fallback state ONLY if the image actually fails */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 bg-[#303841] text-[#F5F5F5]">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-black tracking-widest uppercase text-[#FF5722]">
              {category}
            </span>
            <span className="text-[9px] tracking-widest text-[#76ABAE] uppercase">
              PATNA · 800011
            </span>
          </div>

          <div>
            <div className="w-8 h-0.5 bg-[#FF5722] mb-3" />
            <p className="text-base font-black tracking-tight text-[#F5F5F5] uppercase leading-tight">
              {title}
            </p>
            <p className="text-[10px] text-[#76ABAE] mt-1 font-medium">
              Sheesh Mahal Resort & Banquets
            </p>
          </div>
        </div>
      )}

      {/* Main Photographic Image with instant WebP source */}
      {!hasError && (
        <picture className="w-full h-full block">
          {webpSrc && <source srcSet={webpSrc} type="image/webp" />}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover img-luxury-hover select-none transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </picture>
      )}
    </div>
  );
};
