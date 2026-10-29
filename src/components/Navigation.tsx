import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Phone } from 'lucide-react';
import { SheeshMahalLogo } from './SheeshMahalLogo.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';
import { RESORT_CONTACT } from '../data/resortData.ts';

export type PageRoute = 'home' | 'venues' | 'catering' | 'rituals' | 'gallery' | 'packages' | 'faqs' | 'terms' | 'cookies';

interface NavigationProps {
  currentPage: PageRoute;
  onNavigatePage: (page: PageRoute) => void;
  onOpenInquiry: () => void;
  onNavigateSection?: (sectionId: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigatePage,
  onOpenInquiry,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState({
    index: '01',
    total: '06',
    label: 'SANCTUARY',
    id: 'top'
  });
  const moreRef = useRef<HTMLDivElement>(null);

  // Home page sections mapping
  const homeSections = [
    { id: 'top', label: 'SANCTUARY', index: '01', page: 'home' as PageRoute },
    { id: 'wedding-reel', label: 'ROYAL REEL', index: '02', page: 'home' as PageRoute },
    { id: 'amenities', label: 'SERVICES', index: '03', page: 'catering' as PageRoute },
    { id: 'spaces', label: 'VENUES', index: '04', page: 'venues' as PageRoute },
    { id: 'rituals', label: 'RITUALS', index: '05', page: 'rituals' as PageRoute },
    { id: 'map-location', label: 'LOCATION', index: '06', page: 'home' as PageRoute },
  ];

  // Scroll tracking & live indexing
  useEffect(() => {
    const handleScroll = () => {
      const winScroll = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = docHeight > 0 ? (winScroll / docHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, scrolled)));
      setIsScrolled(winScroll > 20);

      if (currentPage === 'home') {
        const triggerPoint = winScroll + 220;
        for (let i = homeSections.length - 1; i >= 0; i--) {
          const el = document.getElementById(homeSections[i].id);
          if (el) {
            const top = el.offsetTop;
            if (triggerPoint >= top) {
              setActiveSection({
                index: homeSections[i].index,
                total: '06',
                label: homeSections[i].label,
                id: homeSections[i].id
              });
              break;
            }
          }
        }
      } else {
        const pageLabels: Record<PageRoute, { label: string; index: string }> = {
          home: { label: 'HOME', index: '01' },
          venues: { label: 'VENUES', index: '02' },
          catering: { label: 'CATERING', index: '03' },
          rituals: { label: 'RITUALS', index: '04' },
          gallery: { label: 'GALLERY', index: '05' },
          packages: { label: 'PACKAGES', index: '06' },
          faqs: { label: 'FAQS', index: '07' },
          terms: { label: 'TERMS', index: '08' },
          cookies: { label: 'COOKIES', index: '09' }
        };
        const currentMeta = pageLabels[currentPage] || { label: 'PALACE', index: '01' };
        setActiveSection({
          index: currentMeta.index,
          total: '09',
          label: currentMeta.label,
          id: currentPage
        });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Close "More" dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageRoute) => {
    onNavigatePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false);
    setMoreMenuOpen(false);
  };

  const moreItems: { label: string; page: PageRoute }[] = [
    { label: 'PHOTO GALLERY', page: 'gallery' },
    { label: 'WEDDING PACKAGES', page: 'packages' },
    { label: 'WEDDING FAQS', page: 'faqs' }
  ];

  // Helper to determine if link is active
  const isLinkActive = (page: PageRoute) => {
    return currentPage === page;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[76px] sm:h-[80px] px-3.5 sm:px-6 lg:px-12 flex items-center justify-between border-b border-[#161726]/10 transition-all duration-300 ${
        isScrolled ? 'shadow-md shadow-[#161726]/5 bg-[#FFF9D8]/95' : 'bg-[#FFF9D8]/92'
      }`}
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      {/* Brand */}
      <div className="flex items-center shrink-0">
        <SheeshMahalLogo
          variant="header"
          onClick={() => handleNavClick('home')}
          className="cursor-pointer"
        />
      </div>

      {/* Simple & Minimalistic Center Menu with Direct Dedicated Page Navigation */}
      <nav className="hidden md:flex items-center gap-6 lg:gap-8">
        <button
          type="button"
          onClick={() => handleNavClick('home')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative py-1 cursor-pointer ${
            isLinkActive('home') ? 'text-[#161726]' : 'text-[#161726]/70 hover:text-[#161726]'
          }`}
        >
          HOME
          {isLinkActive('home') && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF9D50] rounded-full transition-all duration-300 animate-in fade-in zoom-in-90"></span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('venues')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative py-1 cursor-pointer ${
            isLinkActive('venues') ? 'text-[#161726]' : 'text-[#161726]/70 hover:text-[#161726]'
          }`}
        >
          VENUES
          {isLinkActive('venues') && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF9D50] rounded-full transition-all duration-300 animate-in fade-in zoom-in-90"></span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('catering')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative py-1 cursor-pointer ${
            isLinkActive('catering') ? 'text-[#161726]' : 'text-[#161726]/70 hover:text-[#161726]'
          }`}
        >
          CATERING
          {isLinkActive('catering') && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF9D50] rounded-full transition-all duration-300 animate-in fade-in zoom-in-90"></span>
          )}
        </button>

        <button
          type="button"
          onClick={() => handleNavClick('rituals')}
          className={`text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative py-1 cursor-pointer ${
            isLinkActive('rituals') ? 'text-[#161726]' : 'text-[#161726]/70 hover:text-[#161726]'
          }`}
        >
          RITUALS
          {isLinkActive('rituals') && (
            <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF9D50] rounded-full transition-all duration-300 animate-in fade-in zoom-in-90"></span>
          )}
        </button>

        {/* Minimalist "More" Menu Dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className={`inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-[0.2em] transition-colors relative py-1 cursor-pointer ${
              ['gallery', 'packages', 'faqs'].includes(currentPage)
                ? 'text-[#161726]'
                : 'text-[#161726]/70 hover:text-[#161726]'
            }`}
          >
            <span>MORE</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
            {['gallery', 'packages', 'faqs'].includes(currentPage) && (
              <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#FF9D50] rounded-full"></span>
            )}
          </button>

          {/* Minimalist Dropdown Menu */}
          {moreMenuOpen && (
            <div className="absolute top-full left-0 mt-3 w-48 bg-[#FFF9D8] border border-[#161726]/12 rounded-xl shadow-xl py-2 z-50">
              {moreItems.map((item) => (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`w-full text-left px-4 py-2 text-[10px] font-black uppercase tracking-wider transition-colors hover:bg-[#161726]/5 ${
                    currentPage === item.page ? 'text-[#FF9D50] bg-[#161726]/5 font-black' : 'text-[#161726]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Far Right: Clean Minimalist CTA */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenInquiry}
          className="inline-flex items-center justify-center rounded-lg text-[11px] sm:text-xs font-black tracking-wider sm:tracking-widest uppercase transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm hover:shadow-md bg-[#FF9D50] text-[#161726] hover:bg-[#161726] hover:text-[#FF9D50] px-3.5 sm:px-6 py-2 sm:py-2.5"
        >
          BOOK DATES
        </button>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#161726] focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span
              className={`h-[2px] w-full bg-[#161726] transition-transform duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''
              }`}
            />
            <span
              className={`h-[2px] w-full bg-[#161726] transition-opacity duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`h-[2px] w-full bg-[#161726] transition-transform duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="absolute top-[76px] sm:top-[80px] left-0 right-0 p-5 sm:p-6 border-b border-[#1DCED8]/20 flex flex-col gap-2.5 shadow-xl md:hidden max-h-[calc(100vh-80px)] overflow-y-auto"
          style={{
            backgroundColor: 'rgba(250, 253, 251, 0.98)',
            backdropFilter: 'blur(16px)'
          }}
        >
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            HOME
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('venues')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            WEDDING VENUES
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('catering')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            ROYAL CATERING
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('rituals')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            WEDDING RITUALS
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('gallery')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            PHOTO GALLERY
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('packages')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            WEDDING PACKAGES
          </button>
          <button
            type="button"
            onClick={() => handleNavClick('faqs')}
            className="text-left text-xs font-black uppercase tracking-[0.2em] text-[#161726] py-2 border-b border-[#1DCED8]/10"
          >
            FAQS & POLICIES
          </button>

          {/* Quick Direct Mobile Contact Actions */}
          <div className="pt-3 flex flex-col gap-2.5">
            <a
              href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20wedding%20dates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-widest uppercase bg-[#25D366] text-white flex items-center justify-center gap-2 shadow-sm"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
              <span>CHAT ON WHATSAPP</span>
            </a>

            <a
              href={`tel:${RESORT_CONTACT.primaryPhone}`}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-black tracking-widest uppercase bg-[#161726] text-[#FF9D50] flex items-center justify-center gap-2 shadow-sm"
            >
              <Phone size={14} className="shrink-0" />
              <span>CALL 24/7 DESK</span>
            </a>
          </div>
        </div>
      )}

    </header>
  );
};
