import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook } from 'lucide-react';
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
    <footer className="relative bg-[#FAF6EE] text-[#1D261E] border-t border-[#1D261E]/10 pt-16 sm:pt-20 pb-24 md:pb-12 shadow-[0_-4px_25px_rgba(22,23,38,0.03)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
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
              <p className="text-xs sm:text-sm text-[#1D261E]/85 leading-relaxed max-w-md mb-6 font-normal">
                Patna's distinguished royal wedding destination. Dedicated solely to celebrating eternal marriages, grand Baraat processions, sacred Saat Phere, and majestic wedding feasts.
              </p>

              <div className="p-4 bg-[#1D261E]/5 rounded-xl border border-[#1D261E]/10 max-w-md mb-6">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="text-[#9E7A00] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#1D261E] leading-relaxed font-semibold">
                    {RESORT_CONTACT.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-6 py-3 clay-btn-dark text-xs font-black tracking-widest uppercase cursor-pointer"
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
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1D261E] mb-4 inline-block"
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
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    The Sheesh Banquet
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Shahi Utsav Lawn
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Vedic Mandap Pavilion
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Courtyard & Poolside
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('amenities')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Shahi Wedding Catering
                  </button>
                </li>
              </ul>
            </div>

            {/* Sub-column 2: Rituals & Timings */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1D261E] mb-4 inline-block"
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
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Haldi & Mehndi
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Baraat & Varmala
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Saat Phere & Havan
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer text-left"
                  >
                    Shahi Reception Dawat
                  </button>
                </li>
                <li>
                  <span className="text-[11px] font-bold text-[#E88A1A] flex items-center gap-1.5 pt-2">
                    <Clock size={13} className="text-[#9E7A00]" />
                    <span>Open 24 Hours Daily</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Sub-column 3: Minimalist Social & Direct Concierge Channels */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1D261E] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                CONNECT WITH US
              </h5>
              <p className="text-xs text-[#1D261E]/80 mb-4 font-normal">
                Reach our royal wedding concierge 24/7:
              </p>
              
              {/* Minimalist icon buttons: Call, WhatsApp Green, Instagram, Facebook, Maps */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Single Primary Call Icon */}
                <a
                  href={`tel:${RESORT_CONTACT.primaryPhone}`}
                  title="Direct Wedding Concierge Call"
                  aria-label="Call Sheesh Mahal Resort"
                  className="w-10 h-10 rounded-xl clay-btn-dark flex items-center justify-center cursor-pointer"
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
                  className="w-10 h-10 rounded-xl bg-[#1D261E]/5 text-[#1D261E] border border-[#1D261E]/15 flex items-center justify-center hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300 shadow-sm hover:scale-105"
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
                  className="w-10 h-10 rounded-xl bg-[#1D261E]/5 text-[#1D261E] border border-[#1D261E]/15 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 shadow-sm hover:scale-105"
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
                  className="w-10 h-10 rounded-xl bg-[#1D261E]/5 text-[#1D261E] border border-[#1D261E]/15 flex items-center justify-center hover:bg-[#1D261E] hover:text-[#E88A1A] transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <MapPin size={17} />
                </a>
              </div>

              {/* Secure Concierge Desk Notice (No exposed phone numbers) */}
              <div className="mt-5 pt-3 border-t border-[#1D261E]/10">
                <p className="text-xs font-black tracking-wider text-[#1D261E] uppercase">
                  24/7 DEDICATED WEDDING DESK
                </p>
                <p className="text-[11px] font-medium tracking-wide text-[#1D261E]/75 mt-1 leading-relaxed">
                  Tap the WhatsApp or Call button above to connect directly with our wedding coordinator.
                </p>
              </div>
            </div>

          </div>

        </div>



        {/* Centered Footer Bottom Bar */}
        <div className="pt-8 border-t border-[#1D261E]/10 flex flex-col items-center justify-center text-center gap-3">
          {/* Centered All Rights Reserved */}
          <p
            className="font-bold tracking-widest uppercase text-center text-[#1D261E]/80 text-[11px]"
          >
            All Rights Reserved. © {new Date().getFullYear()} Sheesh Mahal Resort.
          </p>

          {/* Designed and Developed by ACCustomLabs */}
          <p
            className="font-semibold tracking-wider text-center text-[#1D261E]/75 text-[11px]"
          >
            Designed and Developed by <span className="font-bold text-[#1D261E] hover:text-[#E88A1A] transition-colors cursor-pointer">ACCustomLabs</span>
          </p>

          {/* Just Terms & Conditions and Cookies Policy */}
          <div className="flex items-center justify-center gap-6 mt-1">
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[10px] font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer hover:underline"
            >
              Terms & Conditions
            </button>
            <span className="text-xs text-[#1D261E]/30" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={onOpenCookies}
              className="text-[10px] font-bold uppercase tracking-wider text-[#1D261E]/75 hover:text-[#E88A1A] transition-colors cursor-pointer hover:underline"
            >
              Cookies Policy
            </button>
          </div>
        </div>

      </div>
      {/* Stretched Edge-to-Edge Claymorphically Carved Watermark (Full-screen width, smartphone-optimized) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-1.5 sm:bottom-3 w-full flex items-center justify-center pointer-events-none select-none z-0 px-1 sm:px-4 overflow-hidden"
      >
        <svg
          viewBox="0 0 1000 115"
          className="w-full max-w-full h-auto select-none pointer-events-none opacity-80"
          preserveAspectRatio="none"
        >
          <defs>
            <filter id="clay-carve" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="-2" dy="-2" stdDeviation="1.5" floodColor="rgba(29, 38, 30, 0.18)" />
              <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(255, 255, 255, 0.95)" />
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
            fill="#EEE6D8"
            filter="url(#clay-carve)"
            style={{ fontFamily: "'League Spartan', sans-serif" }}
          >
            SHEESH MAHAL
          </text>
        </svg>
      </div>
    </footer>
  );
};
