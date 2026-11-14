import React from 'react';
import { Home, Phone, Menu } from 'lucide-react';
import { PageRoute } from './Navigation.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface MobileQuickBarProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenInquiry: () => void;
}

export const MobileQuickBar: React.FC<MobileQuickBarProps> = ({
  currentPage,
  onNavigatePage
}) => {
  const handleNav = (page: PageRoute) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleMenu = () => {
    window.dispatchEvent(new CustomEvent('toggle-mobile-menu'));
  };

  return (
    <aside
      aria-label="Mobile Quick Navigation Menu"
      className="fixed bottom-0 left-0 right-0 z-40 block md:hidden border-t border-[#26532B]/20 shadow-[0_-6px_25px_rgba(22,23,38,0.12)] transition-all duration-300"
      style={{
        backgroundColor: 'rgba(250, 253, 251, 0.97)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between pb-[max(8px,env(safe-area-inset-bottom))]">
        {/* 1. Home */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
            currentPage === 'home'
              ? 'text-[#1D261E] font-black'
              : 'text-[#1D261E]/65 hover:text-[#1D261E]'
          }`}
          aria-label="Navigate to Home"
        >
          <div className="relative">
            <Home size={19} strokeWidth={currentPage === 'home' ? 2.5 : 2} />
            {currentPage === 'home' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#E88A1A]" />
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold">Home</span>
        </button>

        {/* 2. WhatsApp */}
        <a
          href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20wedding.`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[#1D261E]/75 hover:text-[#25D366] transition-all cursor-pointer"
          aria-label="Direct WhatsApp Concierge"
        >
          <WhatsAppIcon className="w-5 h-5 fill-[#25D366]" />
          <span className="text-[10px] uppercase tracking-wider font-extrabold">WhatsApp</span>
        </a>

        {/* 3. Call */}
        <a
          href={`tel:${RESORT_CONTACT.primaryPhone}`}
          className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[#1D261E]/75 hover:text-[#E88A1A] transition-all cursor-pointer"
          aria-label={`Call Wedding Desk at ${RESORT_CONTACT.primaryPhone}`}
        >
          <Phone size={19} strokeWidth={2} />
          <span className="text-[10px] uppercase tracking-wider font-extrabold">Call</span>
        </a>

        {/* 4. Menu */}
        <button
          type="button"
          onClick={handleToggleMenu}
          className="flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl text-[#1D261E]/75 hover:text-[#1D261E] transition-all cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu size={19} strokeWidth={2} />
          <span className="text-[10px] uppercase tracking-wider font-extrabold">Menu</span>
        </button>
      </div>
    </aside>
  );
};
