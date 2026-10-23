import React from 'react';
import { ArrowLeft, Cookie } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface CookiesPageProps {
  onBack: () => void;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ onBack }) => {
  return (
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAFDFB] text-[#161726]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#9FA1FF] hover:text-[#161726] mb-8 cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO RESORT</span>
        </button>

        <div className="border-b border-[#9FA1FF]/20 pb-8 mb-10">
          <span className="label-utility text-[#161726]/70">
            DIGITAL PRIVACY PROTOCOL
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#161726] mt-2">
            COOKIES POLICY
          </h1>
          <p className="font-cursive text-2xl text-[#9FA1FF] mt-1 font-normal">
            Privacy & Performance Standards for Our Wedding Guests
          </p>
          <p className="text-xs text-[#161726]/60 mt-2 font-bold tracking-wider">
            UPDATED: OCTOBER 2026 · SHEESH MAHAL RESORT
          </p>
        </div>

        <div className="space-y-8 text-sm text-[#161726]/85 leading-relaxed font-normal">
          <section className="p-6 bg-[#D9F9DF]/30 rounded-2xl border border-[#9FA1FF]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#161726] mb-3">
              1. WHAT COOKIES WE USE
            </h2>
            <p>
              Sheesh Mahal Resort uses minimal essential cookies and browser storage strictly to enhance your website browsing experience, retain your event date selections while navigating venue spaces, and ensure rapid loading of our architectural photo assets.
            </p>
          </section>

          <section className="p-6 bg-[#D9F9DF]/30 rounded-2xl border border-[#9FA1FF]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#161726] mb-3">
              2. ESSENTIAL FUNCTIONAL COOKIES
            </h2>
            <p>
              These cookies enable core website navigation, interactive venue date check forms, and smooth scrolling mechanisms. Without these cookies, features like real-time date inquiries cannot function properly.
            </p>
          </section>

          <section className="p-6 bg-[#D9F9DF]/30 rounded-2xl border border-[#9FA1FF]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#161726] mb-3">
              3. NO THIRD-PARTY AD TRACKING
            </h2>
            <p>
              We honor guest discretion. We do not sell or monetize personal browsing history to third-party ad networks. Inquiries submitted through our website are routed directly to our verified WhatsApp and telephone desks in Patna for wedding coordination.
            </p>
          </section>

          <section className="p-6 bg-[#D9F9DF]/30 rounded-2xl border border-[#9FA1FF]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#161726] mb-3">
              4. MANAGING COOKIES
            </h2>
            <p>
              You can control or clear cookies at any time through your browser settings. For any questions regarding your digital data, please reach out to our team at {RESORT_CONTACT.primaryPhone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
