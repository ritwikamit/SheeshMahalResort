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
    <footer className="bg-[#FAFDFB] text-[#161726] border-t border-[#9FA1FF]/20 pt-14 sm:pt-16 pb-12">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 pb-14">
          
          {/* Left 5 columns: Brand & Mission */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="mb-4">
                <SheeshMahalLogo
                  variant="footer"
                  onClick={() => onNavigateSection('top')}
                  className="cursor-pointer"
                />
              </div>
              <p className="font-cursive text-xl text-[#9FA1FF] mb-3 font-normal">
                Patna's Premier Royal Wedding Destination
              </p>
              <p className="text-xs text-[#161726]/75 leading-relaxed max-w-md mb-6 font-normal">
                Patna's distinguished royal wedding destination. Dedicated solely to celebrating eternal marriages, grand Baraat processions, sacred Saat Phere, and majestic wedding feasts.
              </p>

              <div className="p-3.5 bg-[#D9F9DF] rounded-xl border border-[#9FA1FF]/20 max-w-md mb-6">
                <div className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#9FA1FF] shrink-0 mt-0.5" />
                  <p className="text-xs text-[#161726]/90 leading-relaxed font-semibold">
                    {RESORT_CONTACT.address}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="px-6 py-3 rounded-lg text-xs font-black tracking-widest uppercase bg-[#FAEE2F] text-[#161726] hover:bg-[#161726] hover:text-[#FAFDFB] transition-colors duration-500 cursor-pointer shadow-sm"
              >
                BOOK WEDDING DATES
              </button>
            </div>
          </div>

          {/* Right 7 columns: Quick wedding links & Icon-only contact channels */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
            
            {/* Sub-column 1: Venues */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9FA1FF] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px'
                }}
              >
                WEDDING VENUES
              </h5>
              <ul className="space-y-2.5 mt-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    The Sheesh Banquet
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Shahi Utsav Lawn
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Vedic Mandap Pavilion
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('spaces')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Courtyard & Poolside
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('amenities')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Shahi Wedding Catering
                  </button>
                </li>
              </ul>
            </div>

            {/* Sub-column 2: Rituals & Timings */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9FA1FF] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px'
                }}
              >
                CEREMONIES
              </h5>
              <ul className="space-y-2.5 mt-2">
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Haldi & Mehndi
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Baraat & Varmala
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Saat Phere & Havan
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onNavigateSection('rituals')}
                    className="text-xs font-bold uppercase tracking-wider text-[#161726]/80 hover:text-[#9FA1FF] transition-colors cursor-pointer text-left"
                  >
                    Shahi Reception Dawat
                  </button>
                </li>
                <li>
                  <span className="text-[11px] font-bold text-[#161726]/70 flex items-center gap-1.5 pt-1">
                    <Clock size={12} className="text-[#9FA1FF]" />
                    <span>Open 24 Hours</span>
                  </span>
                </li>
              </ul>
            </div>

            {/* Sub-column 3: Minimalist Social & Direct Contact Channels */}
            <div>
              <h5
                className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9FA1FF] mb-4 inline-block"
                style={{
                  textDecoration: 'underline',
                  textUnderlineOffset: '8px'
                }}
              >
                CONNECT WITH US
              </h5>
              <p className="text-xs text-[#161726]/70 mb-4">
                Reach our wedding desk anytime 24/7:
              </p>
              
              {/* Minimalist icon buttons: Call, WhatsApp Green, Instagram, Facebook, Maps */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Single Primary Call Icon */}
                <a
                  href={`tel:${RESORT_CONTACT.primaryPhone}`}
                  title={`Call ${RESORT_CONTACT.primaryPhone}`}
                  aria-label="Call Sheesh Mahal Resort"
                  className="w-10 h-10 rounded-xl bg-[#161726] text-[#FAEE2F] flex items-center justify-center hover:bg-[#9FA1FF] hover:text-[#161726] transition-all duration-300 shadow-sm hover:scale-105"
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
                  className="w-10 h-10 rounded-xl bg-[#E1306C]/10 text-[#E1306C] border border-[#E1306C]/25 flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
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
                  className="w-10 h-10 rounded-xl bg-[#1877F2]/10 text-[#1877F2] border border-[#1877F2]/25 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all duration-300 shadow-sm hover:scale-105"
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
                  className="w-10 h-10 rounded-xl bg-[#161726]/5 text-[#161726] border border-[#9FA1FF]/30 flex items-center justify-center hover:bg-[#FAEE2F] transition-all duration-300 shadow-sm hover:scale-105"
                >
                  <MapPin size={17} />
                </a>
              </div>

              <div className="mt-4 pt-3 border-t border-[#9FA1FF]/20">
                <p className="text-xs font-bold tracking-wider text-[#161726]/85">
                  {RESORT_CONTACT.primaryPhone}
                </p>
                <p className="text-[11px] font-semibold tracking-wider text-[#161726]/60 mt-0.5">
                  {RESORT_CONTACT.secondaryPhone}
                </p>
              </div>
            </div>

          </div>

        </div>

        {/* Centered Footer Bottom Bar as strictly requested:
            "In footer keep the All rights reserved texts in the center followed by Designed and Developed by ACCustomLabs.
             just keep terms and condition page and cookies policy page in the footer. don add these pages in nav bar" */}
        <div className="pt-8 border-t border-[#9FA1FF]/20 flex flex-col items-center justify-center text-center gap-3">
          {/* Centered All Rights Reserved */}
          <p
            className="font-bold tracking-widest uppercase text-center"
            style={{
              fontSize: '11px',
              color: '#161726'
            }}
          >
            All Rights Reserved. © {new Date().getFullYear()} Sheesh Mahal Resort.
          </p>

          {/* Designed and Developed by ACCustomLabs */}
          <p
            className="font-semibold tracking-wider text-center"
            style={{
              fontSize: '11px',
              color: '#161726'
            }}
          >
            Designed and Developed by <span className="font-bold text-[#161726] hover:text-[#9FA1FF] transition-colors cursor-pointer">ACCustomLabs</span>
          </p>

          {/* Just Terms & Conditions and Cookies Policy */}
          <div className="flex items-center justify-center gap-6 mt-1">
            <button
              type="button"
              onClick={onOpenTerms}
              className="text-[10px] font-bold uppercase tracking-wider text-[#161726]/70 hover:text-[#9FA1FF] transition-colors cursor-pointer hover:underline"
            >
              Terms & Conditions
            </button>
            <span className="text-xs text-[#9FA1FF]" aria-hidden="true">•</span>
            <button
              type="button"
              onClick={onOpenCookies}
              className="text-[10px] font-bold uppercase tracking-wider text-[#161726]/70 hover:text-[#9FA1FF] transition-colors cursor-pointer hover:underline"
            >
              Cookies Policy
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
