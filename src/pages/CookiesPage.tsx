import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cookie, Check, ShieldCheck, RefreshCw } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface CookiesPageProps {
  onBack: () => void;
}

export const CookiesPage: React.FC<CookiesPageProps> = ({ onBack }) => {
  const [currentConsent, setCurrentConsent] = useState<string>('essential_only');
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('sheesh_mahal_cookie_consent');
    if (saved) {
      setCurrentConsent(saved);
    }
  }, []);

  const handleUpdateConsent = (type: 'accepted_all' | 'essential_only') => {
    localStorage.setItem('sheesh_mahal_cookie_consent', type);
    setCurrentConsent(type);
    setSaveFeedback(type === 'accepted_all' ? 'All cookies accepted' : 'Essential cookies only');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  const handleResetConsent = () => {
    localStorage.removeItem('sheesh_mahal_cookie_consent');
    setCurrentConsent('not_set');
    setSaveFeedback('Cookie preferences reset');
    setTimeout(() => setSaveFeedback(null), 2500);
  };

  return (
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#F5F5F5] text-[#303841]">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-12">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#76ABAE] hover:text-[#303841] mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft size={16} />
          <span>RETURN TO RESORT</span>
        </button>

        <div className="border-b border-[#76ABAE]/20 pb-8 mb-10">
          <span className="label-utility text-[#303841]/70">
            DIGITAL PRIVACY PROTOCOL
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#303841] mt-2">
            COOKIES POLICY
          </h1>
          <p className="font-cursive text-2xl text-[#76ABAE] mt-1 font-normal">
            Privacy & Performance Standards for Our Wedding Guests
          </p>
          <p className="text-xs text-[#303841]/60 mt-2 font-bold tracking-wider">
            UPDATED: OCTOBER 2026 · SHEESH MAHAL RESORT
          </p>
        </div>

        {/* Interactive Cookie Preference Manager Box */}
        <div className="p-6 sm:p-8 bg-white rounded-2xl border-2 border-[#76ABAE]/30 shadow-lg mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#76ABAE]/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#FF5722] text-[#303841]">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h2 className="text-base font-black uppercase tracking-wide text-[#303841]">
                  YOUR COOKIE PREFERENCES
                </h2>
                <p className="text-xs text-[#303841]/70 mt-0.5">
                  Current Setting:{' '}
                  <span className="font-bold uppercase text-[#303841] bg-[#76ABAE] px-2 py-0.5 rounded">
                    {currentConsent === 'accepted_all'
                      ? 'All Cookies Accepted'
                      : currentConsent === 'essential_only'
                      ? 'Essential Only'
                      : 'Not Configured'}
                  </span>
                </p>
              </div>
            </div>

            {saveFeedback && (
              <span className="text-xs font-bold text-green-700 bg-green-50 px-3 py-1 rounded-full border border-green-200 animate-in fade-in flex items-center gap-1.5 self-start sm:self-center">
                <Check size={14} />
                <span>{saveFeedback}</span>
              </span>
            )}
          </div>

          <div className="pt-6 flex flex-wrap items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => handleUpdateConsent('accepted_all')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-sm ${
                currentConsent === 'accepted_all'
                  ? 'bg-[#303841] text-[#FF5722]'
                  : 'bg-[#FF5722] text-[#303841] hover:bg-[#F5F5F5] border border-[#FF5722]'
              }`}
            >
              ACCEPT ALL COOKIES
            </button>

            <button
              type="button"
              onClick={() => handleUpdateConsent('essential_only')}
              className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                currentConsent === 'essential_only'
                  ? 'bg-[#303841] text-white border-[#303841]'
                  : 'bg-white text-[#303841] border-[#76ABAE]/40 hover:border-[#303841]'
              }`}
            >
              ESSENTIAL ONLY
            </button>

            <button
              type="button"
              onClick={handleResetConsent}
              className="px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#303841]/60 hover:text-red-600 hover:bg-red-50 transition-all cursor-pointer flex items-center gap-1.5 ml-auto"
            >
              <RefreshCw size={13} />
              <span>RESET</span>
            </button>
          </div>
        </div>

        <div className="space-y-8 text-sm text-[#303841]/85 leading-relaxed font-normal">
          <section className="p-6 bg-[#76ABAE]/30 rounded-2xl border border-[#76ABAE]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#303841] mb-3">
              1. WHAT COOKIES WE USE
            </h2>
            <p>
              Sheesh Mahal Resort uses minimal essential cookies and browser storage strictly to enhance your website browsing experience, retain your event date selections while navigating venue spaces, and ensure rapid loading of our architectural photo assets.
            </p>
          </section>

          <section className="p-6 bg-[#76ABAE]/30 rounded-2xl border border-[#76ABAE]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#303841] mb-3">
              2. ESSENTIAL FUNCTIONAL COOKIES
            </h2>
            <p>
              These cookies enable core website navigation, interactive venue date check forms, and smooth scrolling mechanisms. Without these cookies, features like real-time date inquiries cannot function properly.
            </p>
          </section>

          <section className="p-6 bg-[#76ABAE]/30 rounded-2xl border border-[#76ABAE]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#303841] mb-3">
              3. NO THIRD-PARTY AD TRACKING
            </h2>
            <p>
              We honor guest discretion. We do not sell or monetize personal browsing history to third-party ad networks. Inquiries submitted through our website are routed directly to our verified WhatsApp and telephone desks in Patna for wedding coordination.
            </p>
          </section>

          <section className="p-6 bg-[#76ABAE]/30 rounded-2xl border border-[#76ABAE]/20">
            <h2 className="text-base font-black uppercase tracking-wide text-[#303841] mb-3">
              4. MANAGING COOKIES
            </h2>
            <p>
              You can control or clear cookies at any time using the control panel above or through your browser settings. For any questions regarding your digital data, please reach out to our team at {RESORT_CONTACT.primaryPhone}.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};
