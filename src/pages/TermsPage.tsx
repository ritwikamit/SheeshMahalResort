import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface TermsPageProps {
  onBack: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onBack }) => {
  return (
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#26532B] hover:text-[#1D261E] mb-8 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO RESORT</span>
        </button>

        <div className="border-b border-[#26532B]/20 pb-8 mb-10">
          <span className="label-utility text-[#1D261E]/70">
            OFFICIAL POLICY & PROTOCOLS
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#1D261E] mt-2">
            TERMS & CONDITIONS
          </h1>
          <p className="font-cursive text-2xl text-[#26532B] mt-1 font-normal">
            Sheesh Mahal Resort, Ashiana–Digha Road, Patna
          </p>
          <p className="text-xs text-[#1D261E]/60 mt-2 font-bold tracking-wider">
            LAST REVISED: OCTOBER 2026 · APPLICABLE TO ALL WEDDING & EVENT BOOKINGS
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#1D261E]/85 leading-relaxed font-normal">
          <section className="p-6 bg-[#26532B]/30 rounded-2xl border border-[#26532B]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#1D261E] mb-3">
              1. RESERVATION & AUSPICIOUS DATE BLOCKING
            </h2>
            <p>
              Dates for wedding celebrations, sacred ceremonies, and banquet hall bookings at Sheesh Mahal Resort are held upon receipt of an advance booking token. A signed wedding agreement specifies the blocked date, duration of occupancy, allocated venue zones, and confirmed guest capacity.
            </p>
          </section>

          <section className="p-6 bg-[#26532B]/30 rounded-2xl border border-[#26532B]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#1D261E] mb-3">
              2. IN-HOUSE ROYAL CATERING POLICIES
            </h2>
            <p>
              To maintain the highest standards of culinary hygiene and food safety, catering services are provided through Sheesh Mahal Resort's in-house master culinary brigade. Menus are finalized during the pre-wedding tasting session. Any specialized dietary preferences (pure Jain, vegan, or special spice tolerances) must be indicated 14 days prior to the wedding date.
            </p>
          </section>

          <section className="p-6 bg-[#26532B]/30 rounded-2xl border border-[#26532B]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#1D261E] mb-3">
              3. WEDDING DECOR, MANDAP & STAGE SETUP
            </h2>
            <p>
              Custom floral mandap installations, crystal Sheesh work, and stage designs are coordinated by our approved floral architecture partners. Outside decorators, if contracted by the client with prior consent, must strictly follow venue electrical safety codes and load tolerances.
            </p>
          </section>

          <section className="p-6 bg-[#26532B]/30 rounded-2xl border border-[#26532B]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#1D261E] mb-3">
              4. POWER BACKUP & VALET PARKING
            </h2>
            <p>
              Sheesh Mahal Resort guarantees 100% uninterrupted generator power backup throughout your wedding ceremony. Valet parking assistance is provided on-site; guests are kindly requested not to leave personal valuables inside unattended vehicles.
            </p>
          </section>

          <section className="p-6 bg-[#26532B]/30 rounded-2xl border border-[#26532B]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#1D261E] mb-3">
              5. JURISDICTION & INQUIRIES
            </h2>
            <p>
              All agreements are governed by the laws applicable in Patna, Bihar. For any clarification regarding your wedding booking agreement, please connect with our management desk at {RESORT_CONTACT.primaryPhone} or in person at our Digha, Patna premises.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
