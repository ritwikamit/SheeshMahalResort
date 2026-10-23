import React from 'react';
import { SheeshMahalLogo } from './SheeshMahalLogo.tsx';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAFDFB] text-[#161726] transition-opacity duration-500">
      <div className="flex flex-col items-center gap-6 text-center select-none">
        {/* SheeshMahalLogo */}
        <SheeshMahalLogo variant="loading" size="lg" />

        {/* Minimal loading indicator: Just Logo and Loading... */}
        <div className="flex items-center gap-2 mt-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FAEE2F] animate-bounce"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#9FA1FF] animate-bounce [animation-delay:0.2s]"></span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#B5BAFF] animate-bounce [animation-delay:0.4s]"></span>
          <span className="text-xs font-black uppercase tracking-[0.3em] text-[#161726]/70 ml-2">
            Loading...
          </span>
        </div>
      </div>
    </div>
  );
};
