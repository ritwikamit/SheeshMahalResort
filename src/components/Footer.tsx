import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, Star, ShieldCheck } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';
import { SheeshMahalLogo } from './SheeshMahalLogo.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface FooterProps {
  onOpenInquiry: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenTerms: () => void;
  onOpenCookies: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInquiry,
  onNavigateSection,
  onOpenTerms,
  onOpenCookies
}) => {
  return (
    <footer className="relative bg-[#151D16] text-[#FAF6EE] border-t-2 border-[#E88A1A]/40 pt-16 sm:pt-20 pb-24 md:pb-12 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Trust & Legacy Bar across Footer */}
        <div className="pb-10 mb-12 border-b border-[#FAF6EE]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-1.5 bg-[#FAF6EE]/10 border border-[#E88A1A]/30 px-3.5 py-1.5 rounded-xl">
              <div className="flex items-center gap-0.5 text-[#E88A1A]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className="fill-[#E88A1A] text-[#E88A1A]" />
                ))}
              </div>
              <span className="text-xs font-black tracking-wider text-[#FAF6EE] ml-1">
                4.9★ GOOGLE RATED
              </span>
            </div>

            <div className="flex items-center gap-2 bg-[#FAF6EE]/10 border border-white/10 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#FAF6EE]">
              <ShieldCheck size={15} className="text-[#E88A1A]" />
              <span>Sister Venue to <a href="https://rajresortpatna.com" target="_blank" rel="noopener noreferrer" className="text-[#E88A1A] underline font-extrabold hover:text-white transition-colors">Raj Resort Patna</a> (rajresortpatna.com)</span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#FAF6EE]/80">
            <span className="text-[#E88A1A] font-bold">✦</span>
            <span>All Religions & Sacred Vows Celebrated at Accessible Starting Tiers</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14">
          
          {/* Left 5 columns: Brand & Mission with LARGE Logo */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col items-start text-left">
              <div className="mb-6 w-full flex justify-start items-center">
                <SheeshMahalLogo
                  variant="footer"
                  onClick={() => onNavigateSection('top')}
                  className="cursor-pointer"
                />
              </div>
              <p className="font-cursive text-2xl text-[#E88A1A] mb-3 font-normal">
                Patna's Premier Royal Wedding Destination
              </p>
              <p className="text-xs sm:text-sm text-[#FAF6EE]/85 leading-relaxed max-w-md mb-6 font-normal">
                Patna's distinguished royal wedding destination. Dedicated solely to celebrating eternal marriages, grand Baraat processions, sacred Saat Phere, and majestic wedding feasts.
              </p>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10 max-w-md mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#E88A1A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#FAF6EE] leading-relaxed font-semibold">
                    {RESORT_CONTACT.address}
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop View: Royal Booking CTA positioned at bottom of brand column */}
            <div className="hidden lg:flex items-center gap-4 relative z-20">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-6 py-3 clay-btn-gold text-xs font-black tracking-widest uppercase cursor-pointer text-white shadow-lg hover:scale-105 transition-transform"
              >
                BOOK WEDDING DATES
              </button>
            </div>
          </div>

          {/* Right 7 columns: Quick wedding links & Icon contact channels */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Sub-column 1: Venues */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF6EE] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                WEDDING VENUES
              </h5>
              <ul className="space-y-3 mt-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    The Sheesh Banquet
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Shahi Utsav Lawn
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Vedic Mandap Pavilion
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Courtyard & Poolside
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('amenities')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Shahi Wedding Catering
                  </button>
                </li>
              </ul>
            </div>

            {/* Sub-column 2: Rituals & Timings */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF6EE] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                CEREMONIES
              </h5>
              <ul className="space-y-3 mt-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Haldi & Mehndi
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Baraat & Varmala
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Saat Phere & Havan
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#FAF6EE]/80 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Shahi Reception Dawat
                  </button>
                </li>
                <li>
                  <span className="text-[11px] font-bold text-[#E88A1A] flex items-center gap-1.5 pt-2">
                    <Clock size={13} className="text-[#E88A1A]" />
                    <span>Open 24 Hours Daily</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Sub-column 3: Minimalist Social & Direct Concierge Channels */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF6EE] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                CONNECT WITH US
              </h5>
              <p className="text-xs text-[#FAF6EE]/80 mb-4 font-normal">
                Reach our royal wedding concierge 24/7:
              </p>
              
              {/* Minimalist icon buttons: Call, WhatsApp Green, Instagram, Facebook, Maps */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Single Primary Call Icon */}
                <a
                  href={`tel:${RESORT_CONTACT.primaryPhone}`}
                  title="Direct Wedding Concierge Call"
                  aria-label="Call Sheesh Mahal Resort"
                  className="w-10 h-10 rounded-xl bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#E88A1A] hover:text-white hover:border-[#E88A1A] transition-all duration-300 shadow-sm hover:scale-105 cursor-pointer"
                >
                  <Phone size={16} />
                </a>

                {/* Minimalistic Green WhatsApp Icon */}
                <a
                  href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20wedding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct WhatsApp Chat"
                  aria-label="Chat on WhatsApp"
                  className="w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba59] transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                </a>

                {/* Instagram Icon Link */}
                <a
                  href={RESORT_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow us on Instagram"
                  aria-label="Follow Sheesh Mahal Resort on Instagram"
                  className="w-10 h-10 rounded-xl bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <Instagram size={17} />
                </a>

                {/* Facebook Icon Link */}
                <a
                  href={RESORT_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow us on Facebook"
                  aria-label="Follow Sheesh Mahal Resort on Facebook"
                  className="w-10 h-10 rounded-xl bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <Facebook size={17} />
                </a>

                {/* Google Maps Icon */}
                <a
                  href={RESORT_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Google Maps"
                  aria-label="View on Google Maps"
                  className="w-10 h-10 rounded-xl bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#E88A1A] hover:text-[#1D261E] transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <MapPin size={17} />
                </a>
              </div>

              {/* Secure Concierge Desk Notice */}
              <div className="mt-5 pt-3 border-t border-white/10">
                <p className="text-xs font-black tracking-wider text-[#E88A1A] uppercase">
                  24/7 DEDICATED WEDDING DESK
                </p>
                <p className="text-[11px] font-medium tracking-wide text-[#FAF6EE]/75 mt-1 leading-relaxed">
                  Tap WhatsApp or Call above to connect directly with our royal wedding coordinator.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Mobile View: Royal Booking CTA positioned above bottom bar so it overlaps the carved watermark */}
        <div className="lg:hidden flex justify-center pb-8 pt-2 relative z-20">
          <button
            type="button"
            onClick={onOpenInquiry}
            className="w-full max-w-xs py-3.5 clay-btn-gold text-xs font-black tracking-widest uppercase cursor-pointer text-center text-white shadow-lg"
          >
            BOOK WEDDING DATES
          </button>
        </div>

        {/* Centered Footer Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col items-center justify-center text-center gap-3 relative z-10">
          {/* Centered All Rights Reserved */}
          <p
            className="font-bold tracking-widest uppercase text-center text-[#FAF6EE]/80 text-[11px]"
          >
            All Rights Reserved. © {new Date().getFullYear()} Sheesh Mahal Resort.
          </p>

          {/* Designed and Developed by ACCustomLabs */}
          <p
            className="font-semibold tracking-wider text-center text-[#FAF6EE]/70 text-[11px]"
          >
            Designed and Developed by <span className="font-bold text-[#FAF6EE] hover:text-[#E88A1A] transition-colors cursor-pointer">ACCustomLabs</span>
          </p>

          {/* Just Terms & Conditions and Cookies Policy */}
          <div className="flex items-center justify-center gap-6 mt-1">
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[10px] font-bold uppercase tracking-wider text-[#FAF6EE]/70 hover:text-[#E88A1A] transition-colors cursor-pointer hover:underline"
            >
              Terms & Conditions
            </button>
            <span className="text-xs text-[#FAF6EE]/30" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={onOpenCookies}
              className="text-[10px] font-bold uppercase tracking-wider text-[#FAF6EE]/70 hover:text-[#E88A1A] transition-colors cursor-pointer hover:underline"
            >
              Cookies Policy
            </button>
          </div>
        </div>

      </div>

      {/* Edge-to-Edge Claymorphically Carved Dark Watermark with Balanced Architectural Proportions */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1 sm:bottom-2 w-full flex items-end justify-center pointer-events-none select-none z-0 px-1 sm:px-3 overflow-hidden h-[80px] sm:h-[100px] md:h-[120px] lg:h-[140px] xl:h-[160px]"
      >
        <svg
          viewBox="0 0 1000 115"
          className="w-full h-full select-none pointer-events-none opacity-80"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="clay-carve-dark" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-2" dy="-2" stdDeviation="1.5" floodColor="rgba(0, 0, 0, 0.85)" />
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(232, 138, 26, 0.20)" />
            </filter>
          </defs>
          <text
            x="500"
            y="65"
            textAnchor="middle"
            dominantBaseline="middle"
            textLength="980"
            lengthAdjust="spacingAndGlyphs"
            fontSize="106"
            fontWeight="900"
            fill="#1B241C"
            filter="url(#clay-carve-dark)"
            style={{ fontFamily: "'League Spartan', sans-serif" }}
          >
            SHEESH MAHAL
          </text>
        </svg>
      </div>
    </footer>
  );
};
