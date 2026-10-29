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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F5F5F5] text-[#303841] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-6 text-center select-none animate-in fade-in zoom-in-95 duration-500">
        {/* SheeshMahalLogo */}
        <SheeshMahalLogo variant="loading" size="lg" />

        {/* Minimal loading indicator */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5722] animate-bounce"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#76ABAE] animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#303841] animate-bounce [animation-delay:0.4s]"></span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#303841]/85 ml-2 font-sans">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};
