import React, { useState } from 'react';
import { X, CheckCircle2, MessageCircle } from 'lucide-react';
import { VenueSpace, RESORT_CONTACT } from '../data/resortData.ts';

interface ConciergeInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCase?: VenueSpace | null;
}

export const ConciergeInquiryModal: React.FC<ConciergeInquiryModalProps> = ({
  isOpen,
  onClose,
  selectedCase
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: 'Grand Royal Wedding & Reception',
    spacePreference: selectedCase ? selectedCase.title : 'THE SHEESH BANQUET (INDOOR)',
    eventDate: '2026-11-25',
    guestCount: '500 - 800 Guests',
    cateringRequired: true,
    customDecor: true,
    powerBackup: true,
    specialNotes: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedRef = `SMR-WEDDING-${Math.floor(1000 + Math.random() * 9000)}`;
    setBookingRef(generatedRef);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#161726]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FAFDFB] text-[#161726] rounded-[24px] shadow-2xl border border-[#9FA1FF]/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-[#9FA1FF]/20 bg-[#D9F9DF]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#161726]">
              SHEESH MAHAL RESORT · ROYAL WEDDING BOOKING DESK
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-[#161726]/20 flex items-center justify-center hover:bg-[#161726] hover:text-[#FAFDFB] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal content */}
        <div className="p-8 lg:p-10">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#9FA1FF] block mb-1">
                  PATNA ROYAL WEDDING RESERVATIONS
                </span>
                <h3 className="text-3xl font-black uppercase tracking-tight text-[#161726]">
                  CHECK WEDDING DATES
                </h3>
                <p className="font-cursive text-2xl sm:text-3xl text-[#9FA1FF] mt-1 mb-2 font-normal">
                  Reserve Your Auspicious Wedding Muhurat
                </p>
                <p className="text-sm text-[#161726]/75 font-medium">
                  Direct connection with Sheesh Mahal Resort wedding managers. Open 24 hours daily.
                </p>
              </div>

              <div className="space-y-4">
                {/* Full name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                      FAMILY / BRIDE / GROOM NAME *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Verma & Sharma Family"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                      PHONE NUMBER (CALL & WHATSAPP) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors"
                    />
                  </div>
                </div>

                {/* Wedding Ritual Type & Venue Space */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                      WEDDING CEREMONY TYPE
                    </label>
                    <select
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                      className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors font-medium uppercase"
                    >
                      <option value="Grand Royal Wedding & Reception">Grand Royal Wedding & Reception</option>
                      <option value="Sacred Saat Phere & Vedic Mandap">Sacred Saat Phere & Vedic Mandap</option>
                      <option value="Haldi & Mehndi Day Carnival">Haldi & Mehndi Day Carnival</option>
                      <option value="Sangeet Musical Extravaganza">Sangeet Musical Extravaganza</option>
                      <option value="Ring Ceremony / Engagement (Roka)">Ring Ceremony / Engagement (Roka)</option>
                      <option value="Complete 3-Day Wedding Residency">Complete 3-Day Wedding Residency</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                      WEDDING VENUE PREFERENCE
                    </label>
                    <select
                      value={formData.spacePreference}
                      onChange={(e) => setFormData({ ...formData, spacePreference: e.target.value })}
                      className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors font-medium uppercase"
                    >
                      <option value="THE SHEESH BANQUET (INDOOR)">THE SHEESH BANQUET (500-1200 GUESTS)</option>
                      <option value="SHAHI UTSAV LAWN (OPEN-AIR)">SHAHI UTSAV LAWN (800-2000 GUESTS)</option>
                      <option value="ROYAL MANDAP PAVILION">ROYAL MANDAP PAVILION (300 GUESTS)</option>
                      <option value="COURTYARD & POOLSIDE">COURTYARD & POOLSIDE (200-500 GUESTS)</option>
                      <option value="ENTIRE RESORT COMBINED">ENTIRE RESORT COMBINED (GRAND WEDDING)</option>
                    </select>
                  </div>
                </div>

                {/* Wedding Date & Guest Count */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                      AUSPICIOUS WEDDING DATE *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.eventDate}
                      onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                      className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                      ESTIMATED WEDDING GUEST COUNT
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors font-medium"
                    >
                      <option value="200 - 400 Guests">200 - 400 Guests</option>
                      <option value="500 - 800 Guests">500 - 800 Guests</option>
                      <option value="800 - 1,200 Guests">800 - 1,200 Guests</option>
                      <option value="1,200 - 2,000+ Guests">1,200 - 2,000+ Guests (Royal Scale)</option>
                    </select>
                  </div>
                </div>

                {/* Wedding Logistics Toggles */}
                <div className="p-4 bg-[#D9F9DF]/60 rounded-xl border border-[#9FA1FF]/20 flex flex-wrap items-center justify-between gap-4">
                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-[#161726]">
                    <input
                      type="checkbox"
                      checked={formData.cateringRequired}
                      onChange={(e) => setFormData({ ...formData, cateringRequired: e.target.checked })}
                      className="accent-[#161726] w-4 h-4 cursor-pointer"
                    />
                    <span>Shahi Wedding Catering</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-[#161726]">
                    <input
                      type="checkbox"
                      checked={formData.customDecor}
                      onChange={(e) => setFormData({ ...formData, customDecor: e.target.checked })}
                      className="accent-[#161726] w-4 h-4 cursor-pointer"
                    />
                    <span>Custom Mandap & Floral Decor</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-xs font-bold uppercase tracking-wider text-[#161726]">
                    <input
                      type="checkbox"
                      checked={formData.powerBackup}
                      onChange={(e) => setFormData({ ...formData, powerBackup: e.target.checked })}
                      className="accent-[#161726] w-4 h-4 cursor-pointer"
                    />
                    <span>100% Baraat Power Backup</span>
                  </label>
                </div>

                {/* Additional requirements */}
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-[#161726]/70 mb-2">
                    SPECIAL WEDDING / CATERING / BARAAT REQUESTS
                  </label>
                  <textarea
                    rows={2}
                    placeholder="E.g. Awadhi live counters, bridal room preparation timing, dhol procession arrangements..."
                    value={formData.specialNotes}
                    onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                    className="w-full px-4 py-3 bg-[#D9F9DF]/40 border border-[#9FA1FF]/30 rounded-xl text-sm text-[#161726] focus:outline-none focus:border-[#FAEE2F] transition-colors"
                  ></textarea>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#9FA1FF]/20">
                <div className="text-xs text-[#161726]/70 font-semibold">
                  <span>Wedding Desk 24/7: {RESORT_CONTACT.primaryPhone}</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FAEE2F] text-[#161726] hover:bg-[#161726] hover:text-[#FAFDFB] transition-all duration-300 shadow-md cursor-pointer"
                >
                  SUBMIT WEDDING INQUIRY
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation State */
            <div className="text-center py-8">
              <div className="w-14 h-14 rounded-2xl bg-[#FAEE2F] text-[#161726] flex items-center justify-center mx-auto mb-6 shadow-md">
                <CheckCircle2 size={32} />
              </div>
              <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#9FA1FF] block mb-2">
                WEDDING DESK NOTIFIED
              </span>
              <h3 className="text-3xl font-black uppercase tracking-tight text-[#161726] mb-1">
                WEDDING INQUIRY LOGGED
              </h3>
              <p className="font-cursive text-2xl text-[#9FA1FF] mb-3 font-normal">
                Congratulations! We Look Forward to Hosting Your Royal Wedding
              </p>
              <p className="text-sm text-[#161726]/80 max-w-md mx-auto mb-6 font-medium">
                Thank you, {formData.name}. Our master wedding coordinator at Sheesh Mahal Resort has received your details for {formData.eventType} on {formData.eventDate}. We will connect with you within 30 minutes.
              </p>

              {/* Reference ID badge without typewriter font */}
              <div className="p-4 bg-[#D9F9DF] border border-[#9FA1FF]/30 rounded-xl inline-block mb-8">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#161726]/60 mb-1">
                  PATNA WEDDING REFERENCE
                </p>
                <p className="text-base font-black tracking-wider text-[#161726]">
                  {bookingRef}
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20just%20submitted%20wedding%20inquiry%20reference%20${bookingRef}%20for%20date%20${formData.eventDate}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase bg-[#25D366] text-white hover:bg-[#20ba59] transition-colors cursor-pointer inline-flex items-center gap-2 shadow-sm"
                >
                  <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.592 2.654-.696c.969.541 1.79.827 2.806.828 3.182 0 5.768-2.587 5.768-5.767 0-3.18-2.586-5.768-5.768-5.768zm3.385 8.163c-.144.405-.837.774-1.17.822-.312.043-.679.083-1.99-.461-1.637-.678-2.684-2.355-2.766-2.464-.08-.109-.652-.869-.652-1.655 0-.786.413-1.173.56-1.332.148-.16.323-.199.431-.199.108 0 .216.002.311.006.1.006.234-.038.366.279.136.327.464 1.132.505 1.215.04.083.067.18.013.287-.053.107-.08.174-.16.268-.08.093-.168.208-.24.28-.08.08-.163.167-.07.327.094.16.417.689.897 1.116.618.549 1.139.719 1.301.799.162.08.257.067.351-.04.095-.107.405-.472.513-.633.108-.16.216-.134.364-.08.149.054.945.445 1.107.526.162.08.27.12.31.187.04.067.04.388-.104.793z" />
                  </svg>
                  <span>CONFIRM ON WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase bg-[#161726] text-[#FAEE2F] hover:bg-[#FAEE2F] hover:text-[#161726] transition-colors cursor-pointer"
                >
                  BACK TO WEDDING RESORT
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
