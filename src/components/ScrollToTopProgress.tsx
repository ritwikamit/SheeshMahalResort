import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProgressProps {
  className?: string;
  isStandalone?: boolean;
}

export const ScrollToTopProgress: React.FC<ScrollToTopProgressProps> = ({
  className = '',
  isStandalone = true
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (scrollHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollTop / scrollHeight) * 100));
        setScrollProgress(progress);
        setIsVisible(scrollTop > 100);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG circular perimeter calculation
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  // Fills its border while scrolling down, and un-fills its border while scrolling up (and vice versa)
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  const wrapperClass = isStandalone
    ? `fixed bottom-[74px] md:bottom-6 right-3 sm:right-6 z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-75 pointer-events-none'
      } ${className}`
    : `transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isVisible
          ? 'opacity-100 scale-100 pointer-events-auto'
          : 'opacity-0 scale-75 pointer-events-none w-0 -mr-2.5 sm:-mr-3 overflow-hidden'
      } ${className}`;

  return (
    <div className={wrapperClass}>
      <button
        type="button"
        onClick={scrollToTop}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#161726] text-[#FAFDFB] border border-[#9FA1FF]/30 shadow-2xl hover:shadow-[0_0_20px_rgba(159,161,255,0.4)] transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer group shrink-0"
        aria-label="Scroll back to top"
        title={`Scroll to top (${Math.round(scrollProgress)}%)`}
      >
        {/* Dynamic circular SVG progress border */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 56 56"
        >
          {/* Track / background border ring */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#B5BAFF"
            strokeWidth="3.5"
            strokeOpacity="0.25"
          />
          {/* Animated active progress border that fills on scroll down and drains on scroll up */}
          <circle
            cx="28"
            cy="28"
            r={radius}
            fill="none"
            stroke="#FAEE2F"
            strokeWidth="3.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-[stroke-dashoffset] duration-150 ease-out"
          />
        </svg>

        {/* Center content: Arrow and subtle percentage indicator on hover */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <ArrowUp
            size={18}
            className="text-[#FAFDFB] group-hover:text-[#FAEE2F] transition-transform duration-300 group-hover:-translate-y-0.5"
            strokeWidth={2.5}
          />
          {isHovered && (
            <span className="absolute -top-7 px-2 py-0.5 text-[9px] font-black tracking-wider bg-[#161726] text-[#FAEE2F] border border-[#9FA1FF]/30 rounded-md whitespace-nowrap shadow-lg">
              {Math.round(scrollProgress)}%
            </span>
          )}
        </div>
      </button>
    </div>
  );
};
