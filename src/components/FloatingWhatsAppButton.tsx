import React, { useState } from 'react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface FloatingWhatsAppButtonProps {
  isLoading?: boolean;
}

export const FloatingWhatsAppButton: React.FC<FloatingWhatsAppButtonProps> = ({ isLoading = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  if (isLoading) return null;

  const whatsappUrl = `https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20wedding%20dates.`;

  return (
    <aside
      aria-label="Direct WhatsApp Assistance"
      className="fixed bottom-[74px] md:bottom-6 left-3 sm:left-6 z-40 flex items-center gap-3 select-none"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative group w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl transition-transform duration-300 hover:scale-110 active:scale-95 cursor-pointer focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
        title="Direct WhatsApp Chat with Wedding Desk"
        aria-label="Chat on WhatsApp with Sheesh Mahal Resort Wedding Desk"
      >
        {/* Subtle pulsing animation ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/35 animate-ping pointer-events-none opacity-75"></span>
        
        {/* Inner SVG WhatsApp icon */}
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 relative z-10 drop-shadow-sm transition-transform duration-300 group-hover:scale-105" />

        {/* Floating Tooltip Label */}
        <div
          className={`hidden sm:block absolute left-full ml-3 px-3 py-1.5 rounded-xl bg-[#161726] text-[#FAFDFB] text-[11px] font-black tracking-widest uppercase shadow-xl border border-[#9FA1FF]/30 whitespace-nowrap pointer-events-none transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
          }`}
        >
          Chat on WhatsApp
          <span className="block text-[9px] font-medium text-[#FAEE2F]">24/7 Wedding Desk</span>
        </div>
      </a>
    </aside>
  );
};
