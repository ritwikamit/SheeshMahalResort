import React from 'react';
import { Home, Landmark, UtensilsCrossed, Calendar, Phone } from 'lucide-react';
import { PageRoute } from './Navigation.tsx';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface MobileQuickBarProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenInquiry: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  currentPage,
  onNavigatePage,
  onOpenInquiry
}) => {
  const handleNav = (page: PageRoute) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside
      aria-label="Mobile Quick Navigation Menu"
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-[#26532B]/25 shadow-[0_-6px_25px_rgba(22,23,38,0.12)] transition-all duration-300"
      style={{
        backgroundColor: 'rgba(250, 253, 251, 0.96)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around pb-[max(6px,env(safe-area-inset-bottom))]">
        {/* Home Item */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentPage === 'home'
              ? 'text-[#1D261E]'
              : 'text-[#1D261E]/60 hover:text-[#1D261E]'
          }`}
          aria-label="Navigate to Home"
        >
          <div className="relative">
            <Home size={18} strokeWidth={currentPage === 'home' ? 2.5 : 2} />
            {currentPage === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1D261E]" />
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider">Home</span>
        </button>

        {/* Venues Item */}
        <button
          type="button"
          onClick={() => handleNav('venues')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentPage === 'venues'
              ? 'text-[#1D261E]'
              : 'text-[#1D261E]/60 hover:text-[#1D261E]'
          }`}
          aria-label="Navigate to Venues"
        >
          <div className="relative">
            <Landmark size={18} strokeWidth={currentPage === 'venues' ? 2.5 : 2} />
            {currentPage === 'venues' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1D261E]" />
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider">Venues</span>
        </button>

        {/* Center Golden Feature Button: Book Dates / Check Muhurat */}
        <button
          type="button"
          onClick={onOpenInquiry}
          className="flex flex-col items-center justify-center -mt-3 group cursor-pointer"
          aria-label="Check Muhurat Wedding Dates and Inquire"
        >
          <div className="w-12 h-12 rounded-full bg-[#E88A1A] text-[#1D261E] border-2 border-[#1D261E] flex items-center justify-center shadow-lg transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
            <Calendar size={20} strokeWidth={2.5} />
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider text-[#1D261E] mt-0.5">
            Book
          </span>
        </button>

        {/* Royal Catering Item */}
        <button
          type="button"
          onClick={() => handleNav('catering')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
            currentPage === 'catering'
              ? 'text-[#1D261E]'
              : 'text-[#1D261E]/60 hover:text-[#1D261E]'
          }`}
          aria-label="Navigate to Royal Catering"
        >
          <div className="relative">
            <UtensilsCrossed size={18} strokeWidth={currentPage === 'catering' ? 2.5 : 2} />
            {currentPage === 'catering' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#1D261E]" />
            )}
          </div>
          <span className="text-[9px] font-black uppercase tracking-wider">Catering</span>
        </button>

        {/* 24/7 Phone Call Item */}
        <a
          href={`tel:${RESORT_CONTACT.primaryPhone}`}
          className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl text-[#1D261E]/75 hover:text-[#1D261E] transition-all cursor-pointer"
          aria-label={`Call Sheesh Mahal Wedding Desk at ${RESORT_CONTACT.primaryPhone}`}
        >
          <Phone size={18} strokeWidth={2} />
          <span className="text-[9px] font-black uppercase tracking-wider">Call</span>
        </a>
      </div>
    </aside>
  );
};
