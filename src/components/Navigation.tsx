import React, { useState, useRef, useEffect } from 'react';
import { 
  ChevronDown, 
  Phone, 
  Sparkles, 
  MapPin, 
  Utensils, 
  Camera, 
  Crown, 
  HelpCircle, 
  Heart,
  Home as HomeIcon,
  X,
  Menu
} from 'lucide-react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  // Scroll detection for enhanced clay styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isLinkActive = (page: PageRoute) => currentPage === page;

  // Primary navigation items
  const mainNavItems: { label: string; page: PageRoute; icon: React.ReactNode }[] = [
    { label: 'HOME', page: 'home', icon: <HomeIcon size={13} /> },
    { label: 'VENUES', page: 'venues', icon: <MapPin size={13} /> },
    { label: 'CATERING', page: 'catering', icon: <Utensils size={13} /> },
    { label: 'RITUALS', page: 'rituals', icon: <Heart size={13} /> },
    { label: 'GALLERY', page: 'gallery', icon: <Camera size={13} /> },
    { label: 'PACKAGES', page: 'packages', icon: <Crown size={13} /> },
  ];

  // Secondary "More" items with rich subtitles
  const moreItems: { label: string; page: PageRoute; desc: string; icon: React.ReactNode }[] = [
    { label: 'WEDDING FAQS', page: 'faqs', desc: 'Policies, timings & catering guidelines', icon: <HelpCircle size={16} className="text-[#E88A1A]" /> },
    { label: 'ROYAL PACKAGES', page: 'packages', desc: 'All-inclusive weddings & suites', icon: <Crown size={16} className="text-[#26532B]" /> },
    { label: 'PHOTO GALLERY', page: 'gallery', desc: 'Real Baraats, Mandaps & Stage decor', icon: <Camera size={16} className="text-[#E88A1A]" /> },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[78px] sm:h-[84px] px-3.5 sm:px-6 lg:px-10 flex items-center justify-between transition-all duration-300 ${
        isScrolled
          ? 'clay-nav shadow-[0_12px_28px_rgba(29,38,30,0.06)]'
          : 'bg-[#FAF6EE]/92 backdrop-blur-md border-b border-[#26532B]/10'
      }`}
      style={{
        WebkitBackdropFilter: 'blur(16px)'
      }}
    >
      {/* Brand Logo */}
      <div className="flex items-center shrink-0">
        <SheeshMahalLogo
          variant="header"
          onClick={() => handleNavClick('home')}
          className="cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
        />
      </div>

      {/* Redesigned Desktop Menu: Floating Tactile Clay Pill Island */}
      <nav className="hidden xl:flex items-center clay-pill px-2 py-1.5 bg-[#FAF6EE]/90 border border-white/90 shadow-[6px_8px_18px_rgba(29,38,30,0.05),-4px_-4px_12px_rgba(255,255,255,0.95)]">
        {mainNavItems.map((item) => {
          const active = isLinkActive(item.page);
          return (
            <button
              key={item.page}
              type="button"
              onClick={() => handleNavClick(item.page)}
              className={`relative px-3.5 py-1.5 text-[10.5px] font-black uppercase tracking-[0.16em] transition-all duration-250 cursor-pointer flex items-center gap-1.5 rounded-full ${
                active
                  ? 'bg-[#E88A1A] text-white shadow-[0_4px_14px_rgba(232,138,26,0.35),inset_1px_1px_2px_rgba(255,255,255,0.4)] scale-[1.02]'
                  : 'text-[#1D261E]/75 hover:text-[#1D261E] hover:bg-white/80'
              }`}
            >
              <span>{item.label}</span>
            </button>
          );
        })}

        {/* More Dropdown */}
        <div className="relative" ref={moreRef}>
          <button
            type="button"
            onClick={() => setMoreMenuOpen(!moreMenuOpen)}
            className={`px-3 py-1.5 text-[10.5px] font-black uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer flex items-center gap-1 rounded-full ${
              ['faqs', 'terms', 'cookies'].includes(currentPage)
                ? 'bg-[#26532B] text-white shadow-sm'
                : 'text-[#1D261E]/75 hover:text-[#1D261E] hover:bg-white/80'
            }`}
          >
            <span>MORE</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* 3D Clay Dropdown Menu */}
          {moreMenuOpen && (
            <div className="absolute top-full right-0 mt-3 w-72 clay-card-white p-2.5 z-50 rounded-2xl border border-white shadow-[12px_18px_32px_rgba(29,38,30,0.1),-6px_-6px_16px_rgba(255,255,255,0.95)] animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="text-[9px] font-black uppercase tracking-[0.2em] text-[#26532B] px-3 pt-2 pb-1.5">
                ✦ EXPLORE DESTINATION
              </div>
              <div className="space-y-1">
                {moreItems.map((item) => (
                  <button
                    key={item.page}
                    type="button"
                    onClick={() => handleNavClick(item.page)}
                    className="w-full text-left p-2.5 rounded-xl transition-all duration-200 hover:bg-[#FAF6EE] flex items-start gap-3 group cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-white border border-[#26532B]/10 group-hover:border-[#E88A1A]/30 transition-colors shadow-2xs shrink-0 mt-0.5">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-black uppercase tracking-wider text-[#1D261E] group-hover:text-[#E88A1A] transition-colors">
                        {item.label}
                      </div>
                      <div className="text-[10px] text-[#1D261E]/65 leading-tight mt-0.5">
                        {item.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Right Side: Quick Dial + Tactile Clay CTA Button */}
      <div className="flex items-center gap-2 sm:gap-3.5 shrink-0">
        {/* Quick Phone Call Pill (Visible on md+) */}
        <a
          href={`tel:${RESORT_CONTACT.primaryPhone}`}
          className="hidden md:inline-flex items-center gap-2 clay-pill px-3.5 py-2 text-xs font-black tracking-wider text-[#26532B] hover:text-[#E88A1A] transition-colors cursor-pointer group"
          title="Direct line to 24/7 Wedding Concierge"
        >
          <Phone size={13} className="text-[#E88A1A] group-hover:rotate-12 transition-transform" />
          <span className="hidden lg:inline">{RESORT_CONTACT.primaryPhone}</span>
        </a>

        {/* Primary Booking CTA in Royal Saffron Gold Clay */}
        <button
          type="button"
          onClick={onOpenInquiry}
          className="clay-btn-gold px-4 sm:px-6 py-2 sm:py-2.5 text-[11px] sm:text-xs font-black tracking-wider sm:tracking-widest uppercase transition-all duration-300 cursor-pointer shadow-md flex items-center gap-1.5"
        >
          <Sparkles size={13} className="text-white/90" />
          <span>BOOK DATES</span>
        </button>

        {/* Tactile Mobile Menu Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="xl:hidden w-10 h-10 rounded-xl clay-pill flex items-center justify-center text-[#1D261E] hover:text-[#E88A1A] transition-colors cursor-pointer border border-white/80"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Redesigned Mobile Clay Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="absolute top-[78px] sm:top-[84px] left-0 right-0 p-4 sm:p-6 bg-[#FAF6EE] border-b border-[#26532B]/15 shadow-2xl xl:hidden max-h-[calc(100vh-84px)] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-4 duration-300"
        >
          {/* Header pill inside drawer */}
          <div className="mb-4 p-2.5 rounded-xl clay-pill flex items-center justify-between text-[10px] font-black uppercase tracking-wider text-[#26532B] px-4">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E88A1A] animate-pulse"></span>
              PATNA ROYAL WEDDINGS
            </span>
            <span className="text-[#1D261E]/70 font-bold">OPEN 24 HOURS</span>
          </div>

          {/* 6 Tactile Clay Menu Tiles (2 Columns Grid) */}
          <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4">
            {mainNavItems.map((item) => {
              const active = isLinkActive(item.page);
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => handleNavClick(item.page)}
                  className={`p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[82px] ${
                    active
                      ? 'clay-btn-gold text-white scale-[1.01]'
                      : 'clay-card hover:bg-white text-[#1D261E]'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg w-fit ${active ? 'bg-white/20 text-white' : 'bg-white text-[#E88A1A] shadow-2xs'}`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase tracking-wider mt-2">
                      {item.label}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Extra explore link: FAQs & Policies */}
          <button
            type="button"
            onClick={() => handleNavClick('faqs')}
            className="w-full mb-4 p-3 rounded-xl clay-pill flex items-center justify-between text-xs font-black uppercase tracking-wider text-[#1D261E] hover:text-[#E88A1A] transition-colors"
          >
            <span className="flex items-center gap-2">
              <HelpCircle size={15} className="text-[#E88A1A]" />
              WEDDING FAQS & POLICIES
            </span>
            <span className="text-[10px] font-bold text-[#26532B] bg-[#26532B]/10 px-2 py-0.5 rounded-full">
              READ
            </span>
          </button>

          {/* Quick Direct Mobile Contact Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <a
              href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20wedding%20dates.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-4 rounded-xl text-xs font-black tracking-widest uppercase bg-[#25D366] text-white flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
              <span>WHATSAPP CONCIERGE</span>
            </a>

            <a
              href={`tel:${RESORT_CONTACT.primaryPhone}`}
              className="flex-1 py-3 px-4 rounded-xl text-xs font-black tracking-widest uppercase clay-btn-emerald flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
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
