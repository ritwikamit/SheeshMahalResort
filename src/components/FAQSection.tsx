import React, { useState } from 'react';
import { ChevronDown, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';
import { RevealUp } from './RevealUp.tsx';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQSectionProps {
  onOpenInquiry?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenInquiry }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      category: "GUEST CAPACITY & SPACES",
      question: "What is the guest capacity and which venues are available?",
      answer: "Sheesh Mahal Resort accommodates celebrations from intimate gatherings of 200 guests up to grand royal weddings of 2,000+ guests. Spaces include the grand air-conditioned Sheesh Ballroom (ideal for weather-proof Varmalas and banquets), sprawling starlit Baraat lawns, dedicated Vedic Mandap pavilion, and picturesque poolside courtyards."
    },
    {
      category: "ALL RELIGIONS & SACRED CEREMONIES",
      question: "Do you host grand weddings for all religions and traditions?",
      answer: "Yes, absolutely. We welcome and celebrate all sacred traditions with customized ritual setups: Hindu Vedic Saat Phere & Havan, Muslim Nikah & Walima receptions, Sikh Anand Karaj, Christian ceremonies, and Jain weddings. Dedicated pure-vegetarian kitchens, Jain food preparations, and customized cultural arrangements are fully supported."
    },
    {
      category: "PRICING & BESPOKE PACKAGES",
      question: "What are your package prices and starting investment tiers?",
      answer: "We believe royal luxury should be accessible and transparent. Our bespoke wedding packages start at an attractive entry tier for grand celebrations, curated around your specific guest count, menu preferences, and decor vision. We provide comprehensive upfront quotes with zero hidden fees."
    },
    {
      category: "HERITAGE TRUST & PROVEN LEGACY",
      question: "Is Sheesh Mahal Resort connected to Raj Resort Patna?",
      answer: "Yes. Sheesh Mahal Resort is founded and operated by the same esteemed hospitality family behind Raj Resort Patna (rajresortpatna.com). With over a decade of celebrated wedding legacy, 1,000+ successful royal marriages, and a verified 4.9 / 5.0 Google Business rating, you receive Patna's most trusted wedding management team."
    },
    {
      category: "LOCATION & PARKING CONVENIENCE",
      question: "Where is the resort located and is guest parking provided?",
      answer: "We are situated directly opposite St. Xavier's College Gate on Ashiana–Digha Road, Patna 800011 (just 5 minutes from Marine Drive / Ganga Path). The resort features dedicated secure valet parking accommodating 150+ vehicles simultaneously with 24/7 security."
    },
    {
      category: "AMENITIES & POWER BACKUP",
      question: "Are luxury bridal suites and continuous power backup included?",
      answer: "Yes. We offer fully air-conditioned, lavish bridal and family preparation suites for relaxed pre-wedding ceremonies. The entire property is powered by 100% continuous industrial generator backups, ensuring uninterrupted lighting, air-conditioning, and celebrations."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 sm:py-20 lg:py-24 bg-[#FAF6EE] text-[#1D261E] border-t border-[#26532B]/15 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <RevealUp>
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#26532B]/15">
            <div>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="text-[10px] sm:text-xs font-black tracking-[0.25em] uppercase text-[#E88A1A] bg-[#1D261E] px-2.5 py-1 rounded-sm shadow-sm">
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <span className="w-8 h-[1px] bg-[#26532B]"></span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.9] text-[#1D261E]">
                ESSENTIAL WEDDING FAQS
              </h2>
              <p className="font-cursive text-2xl sm:text-3xl text-[#26532B] mt-2 font-normal">
                Everything You Need to Know for Your Royal Celebration
              </p>
            </div>

            {/* Google Rating Trust Chip */}
            <div className="clay-card-white px-4 py-3 rounded-2xl flex items-center gap-3 shrink-0 self-start md:self-auto border border-[#E88A1A]/30">
              <div className="w-10 h-10 rounded-xl bg-[#26532B] text-white flex items-center justify-center font-bold text-sm shadow-inner">
                4.9
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5 text-[#26532B]">
                  <CheckCircle2 size={13} className="text-[#26532B]" />
                  <span className="text-[11px] font-black text-[#1D261E] uppercase tracking-wider">
                    Google Business Verified
                  </span>
                </div>
                <span className="text-[10px] font-medium text-[#1D261E]/70 mt-0.5">
                  Patna's Most Trusted Wedding Group
                </span>
              </div>
            </div>
          </div>
        </RevealUp>

        {/* Trust Highlight Banner connecting Raj Resort and Sheesh Mahal */}
        <div className="mb-10 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-[#26532B]/10 via-[#FAF6EE] to-[#E88A1A]/10 border border-[#26532B]/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 rounded-xl bg-[#26532B] text-[#FAF6EE] flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck size={22} className="text-[#E88A1A]" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-black tracking-wide text-[#1D261E] uppercase">
                A Distinguished Sister Property to Raj Resort Patna
              </p>
              <p className="text-[11px] sm:text-xs text-[#1D261E]/80 font-normal">
                Proudly brought to you by the trusted founders of <a href="https://rajresortpatna.com" target="_blank" rel="noopener noreferrer" className="font-bold text-[#26532B] underline hover:text-[#E88A1A] transition-colors">rajresortpatna.com</a> — Over 1,000+ celebrated marriages in Patna.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#E88A1A] bg-[#1D261E] px-3 py-1.5 rounded-lg shadow-sm">
              All Religions Celebrated
            </span>
          </div>
        </div>

        {/* Accordion FAQ Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`clay-card transition-all duration-300 rounded-2xl overflow-hidden border ${
                  isOpen ? 'border-[#E88A1A]/60 shadow-md ring-1 ring-[#E88A1A]/20' : 'border-white/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex-1">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#E88A1A] block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-[#1D261E] leading-snug tracking-tight">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-transform duration-300 ${
                      isOpen ? 'bg-[#E88A1A] text-white rotate-180' : 'bg-[#1D261E]/5 text-[#1D261E]'
                    }`}
                  >
                    <ChevronDown size={17} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-0 text-xs sm:text-sm text-[#1D261E]/85 leading-relaxed font-normal border-t border-[#1D261E]/5 mt-1 animate-in fade-in duration-200">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Card */}
        {onOpenInquiry && (
          <div className="mt-10 sm:mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1D261E] to-[#141C15] text-[#FAF6EE] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-2 text-[#E88A1A]">
                <ShieldCheck size={16} />
                <span className="text-xs font-black uppercase tracking-widest text-[#E88A1A]">
                  Reserve Your Auspicious Dates
                </span>
              </div>
              <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tight">
                Plan Your Royal Marriage at Bespoke Starting Tiers
              </h4>
              <p className="text-xs sm:text-sm text-[#FAF6EE]/80 mt-1 max-w-xl font-normal">
                Check auspicious date availability with our dedicated 24/7 wedding concierge. Instant estimates with zero obligation.
              </p>
            </div>

            <button
              type="button"
              onClick={onOpenInquiry}
              className="clay-btn-gold px-7 py-3.5 text-xs font-black tracking-widest uppercase text-white shrink-0 cursor-pointer shadow-lg hover:scale-105 transition-transform"
            >
              CHECK DATE AVAILABILITY
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
