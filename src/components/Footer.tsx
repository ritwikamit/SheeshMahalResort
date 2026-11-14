import React from 'react';
import { MapPin, Phone, Clock, Instagram, Facebook, ShieldCheck } from 'lucide-react';
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
    <footer className="relative bg-[#151D16] text-[#FAF6EE] border-t-2 border-[#E88A1A]/40 pt-8 sm:pt-10 pb-24 md:pb-6 shadow-[0_-8px_30px_rgba(0,0,0,0.25)] overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Top Trust & Legacy Bar across Footer */}
        <div className="pb-3 mb-6 border-b border-[#FAF6EE]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 bg-[#FAF6EE]/10 border border-[#E88A1A]/30 px-3 py-1 rounded-lg">
              <ShieldCheck size={13} className="text-[#E88A1A]" />
              <span className="text-[11px] font-black tracking-wider text-[#FAF6EE]">
                4.9 / 5.0 GOOGLE VERIFIED
              </span>
            </div>

            <div className="flex items-center gap-1.5 bg-[#FAF6EE]/10 border border-white/10 px-3 py-1 rounded-lg text-[11px] font-bold text-[#FAF6EE]">
              <ShieldCheck size={13} className="text-[#E88A1A]" />
              <span>Sister Venue to <a href="https://rajresortpatna.com" target="_blank" rel="noopener noreferrer" className="text-[#E88A1A] underline font-extrabold hover:text-white transition-colors">Raj Resort Patna</a></span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#FAF6EE]/80">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E88A1A]"></span>
            <span>All Religions & Sacred Vows Celebrated at Honest Starting Tiers</span>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 pb-6">
          
          {/* Left 5 columns: Brand & Mission */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div className="flex flex-col items-start text-left">
              <div className="mb-3 w-full flex justify-start items-center">
                <SheeshMahalLogo
                  variant="footer"
                  size="md"
                  onClick={() => onNavigateSection('top')}
                  className="cursor-pointer"
                />
              </div>
              <p className="font-cursive text-xl sm:text-2xl text-[#E88A1A] mb-1.5 font-normal">
                Patna's Premier Royal Wedding Destination
              </p>
              <p className="text-xs text-[#FAF6EE]/85 leading-relaxed max-w-md mb-3 font-normal">
                Dedicated solely to celebrating eternal marriages, grand Baraat processions, sacred Saat Phere, and majestic wedding feasts.
              </p>

              <div className="p-2.5 bg-white/5 rounded-lg border border-white/10 max-w-md mb-4">
                <div className="flex items-start gap-2.5">
                  <MapPin size={15} className="text-[#E88A1A] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#FAF6EE] leading-snug font-medium">
                    {RESORT_CONTACT.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 relative z-20">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-5 py-2.5 clay-btn-gold text-[11px] font-black tracking-widest uppercase cursor-pointer text-white shadow-md hover:scale-102 transition-transform"
              >
                BOOK WEDDING DATES
              </button>
            </div>
          </div>

          {/* Right 7 columns: Quick wedding links & Icon contact channels */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Sub-column 1: Venues */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF6EE] mb-3 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                WEDDING VENUES
              </h5>
              <ul className="space-y-2 mt-1">
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
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF6EE] mb-3 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                CEREMONIES
              </h5>
              <ul className="space-y-2 mt-1">
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
                  <span className="text-[11px] font-bold text-[#E88A1A] flex items-center gap-1.5 pt-1">
                    <Clock size={12} className="text-[#E88A1A]" />
                    <span>Open 24 Hours Daily</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Sub-column 3: Social & Concierge Channels */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#FAF6EE] mb-3 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '6px',
                  textDecorationColor: '#E88A1A'
                }}
              >
                CONNECT WITH US
              </h5>
              <p className="text-[11px] text-[#FAF6EE]/80 mb-3 font-normal">
                Royal wedding concierge 24/7:
              </p>
              
              {/* Minimalist icon buttons */}
              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={`tel:${RESORT_CONTACT.primaryPhone}`}
                  title="Direct Wedding Concierge Call"
                  aria-label="Call Sheesh Mahal Resort"
                  className="w-8 h-8 rounded-lg bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#E88A1A] hover:text-white hover:border-[#E88A1A] transition-all duration-300 shadow-xs hover:scale-105 cursor-pointer"
                >
                  <Phone size={14} />
                </a>

                <a
                  href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20a%20wedding.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Direct WhatsApp Chat"
                  aria-label="Chat on WhatsApp"
                  className="w-8 h-8 rounded-lg bg-[#25D366] text-white flex items-center justify-center hover:bg-[#20ba59] transition-all duration-300 shadow-xs hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4 fill-current" />
                </a>

                <a
                  href={RESORT_CONTACT.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow us on Instagram"
                  aria-label="Follow Sheesh Mahal Resort on Instagram"
                  className="w-8 h-8 rounded-lg bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#E1306C] hover:text-white hover:border-[#E1306C] transition-all duration-300 shadow-xs hover:scale-105"
                >
                  <Instagram size={15} />
                </a>

                <a
                  href={RESORT_CONTACT.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Follow us on Facebook"
                  aria-label="Follow Sheesh Mahal Resort on Facebook"
                  className="w-8 h-8 rounded-lg bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 shadow-xs hover:scale-105"
                >
                  <Facebook size={15} />
                </a>

                <a
                  href={RESORT_CONTACT.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on Google Maps"
                  aria-label="View on Google Maps"
                  className="w-8 h-8 rounded-lg bg-white/10 text-[#FAF6EE] border border-white/15 flex items-center justify-center hover:bg-[#E88A1A] hover:text-[#1D261E] transition-all duration-300 shadow-xs hover:scale-105"
                >
                  <MapPin size={15} />
                </a>
              </div>

              {/* Concierge Desk Notice */}
              <div className="mt-3 pt-2 border-t border-white/10">
                <p className="text-[10px] font-black tracking-wider text-[#E88A1A] uppercase">
                  24/7 DEDICATED DESK
                </p>
                <p className="text-[10px] font-medium tracking-wide text-[#FAF6EE]/75 mt-0.5 leading-tight">
                  Tap WhatsApp or Call to speak with our coordinator.
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Integrated Footer Bottom Bar (Same footer itself, no oversized separate section) */}
        <div className="pt-3 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-2.5 text-[11px] text-[#FAF6EE]/75 relative z-10">
          {/* All Rights Reserved */}
          <p className="font-semibold tracking-wider text-center md:text-left">
            All Rights Reserved. © {new Date().getFullYear()} Sheesh Mahal Resort.
          </p>

          {/* Designed and Developed by ACCustomLabs (Logo redirects to WhatsApp 7766833773) */}
          <div className="flex items-center justify-center gap-1.5 font-semibold text-[#FAF6EE]/80">
            <span>Designed and Developed by</span>
            <a
              href="https://wa.me/917766833773?text=Hello%20ACCustomLabs,%20I%20would%20like%20to%20inquire%20about%20website%20design%20and%20development%20services."
              target="_blank"
              rel="noopener noreferrer"
              title="Chat with ACCustomLabs on WhatsApp (+91 77668 33773)"
              className="inline-flex items-center group/lab transition-transform hover:scale-105"
            >
              <img
                src="/images/ac-custom-labs.png"
                alt="ACCustomLabs"
                className="h-4 sm:h-5 w-auto object-contain inline-block align-middle opacity-90 group-hover/lab:opacity-100"
              />
            </a>
          </div>

          {/* Terms & Conditions and Cookies Policy */}
          <div className="flex items-center justify-center md:justify-end gap-4">
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

      {/* Edge-to-Edge Claymorphically Carved Dark Watermark inside the footer backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-16 md:bottom-0 w-full flex items-end justify-center pointer-events-none select-none z-0 px-2 overflow-hidden h-[50px] sm:h-[65px] md:h-[80px]"
      >
        <svg
          viewBox="0 0 1000 115"
          className="w-full h-full select-none pointer-events-none opacity-60"
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
