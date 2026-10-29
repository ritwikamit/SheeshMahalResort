import React from 'react';
import { SheeshMahalLogo } from './SheeshMahalLogo.tsx';

interface LoadingScreenProps {
  isFadingOut?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ isFadingOut = false }) => {
  return (
    <div
      role="progressbar"
      aria-label="Loading Sheesh Mahal Resort"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-[#FF9E2C] via-[#E88A1A] to-[#D4750B] text-white transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 text-center select-none animate-in fade-in zoom-in-95 duration-500 px-4">
        {/* Pure logo floating freely with no box/card background as requested */}
        <SheeshMahalLogo variant="loading" size="lg" />

        {/* Minimal white loading dots */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-bounce"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/80 animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-white/60 animate-bounce [animation-delay:0.4s]"></span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-white ml-2 font-sans drop-shadow-sm">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};
