import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';

interface FaqsPageProps {
  onOpenInquiry: () => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ onOpenInquiry }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where is Sheesh Mahal Resort located in Patna?",
      a: "Sheesh Mahal Resort is situated opposite the main gate of St. Xavier's College, near Bharat Petrol Pump, Mica Colony, Yadav Colony, Ashiana–Digha Road, Patna, Bihar 800011. Note: We are on the Ashiana-Digha corridor directly opposite St. Xavier's College gate (not the Bailey Road Danapur location)."
    },
    {
      q: "What is the total guest capacity for weddings?",
      a: "Our spaces accommodate intimate gatherings of 200 guests up to grand mega-weddings of 2,000+ guests. The indoor Sheesh Banquet ballroom accommodates 500 to 1,200 guests, while the Shahi Utsav open-air lawn hosts 800 to 2,000+ guests."
    },
    {
      q: "How does in-house catering work?",
      a: "We provide comprehensive in-house royal wedding catering led by master chefs specializing in Awadhi, Mughlai, and authentic Bihari royal heritage cuisine. We operate completely separated pure vegetarian kitchens as well as gourmet non-vegetarian preparation lines. Pre-wedding menu tasting sessions are included."
    },
    {
      q: "Is 100% power backup provided for high-load wedding setups?",
      a: "Yes. We maintain heavy-duty industrial diesel generators that guarantee 100% uninterrupted power for centralized air-conditioning, DJ rigs, cold-pyro stages, and ambient wedding canopies with zero interruption."
    },
    {
      q: "What are the parking arrangements for wedding guests and Baraats?",
      a: "We have dedicated on-site secure parking capable of handling wedding fleets. Professional valet attendants are stationed at the grand entrance to receive and park guest vehicles safely."
    },
    {
      q: "Can we visit the venue for an in-person walkthrough?",
      a: "Yes, Sheesh Mahal Resort is open 24 hours daily. Our wedding managers are always on-site to walk you through the ballrooms, lawn dimensions, mandap pavilion, and bridal suites."
    }
  ];

  return (
    <div className="pt-[78px] sm:pt-[88px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      
      {/* Landscaped Hero Banner */}
      <div className="relative w-full h-[240px] sm:h-[320px] lg:h-[360px] overflow-hidden bg-[#151D16] mb-8 sm:mb-12">
        <img
          src="/images/reels_posters/landscape-1.webp"
          alt="Sheesh Mahal Resort FAQs & Planning"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-black/35 to-black/20" />

        <div className="absolute inset-0 max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-8 sm:pb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="label-utility text-[#E88A1A]">
              TRANSPARENT GUIDANCE
            </span>
            <span className="w-8 h-[1px] bg-[#E88A1A]"></span>
            <span className="text-[10px] font-black tracking-widest text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm uppercase">
              24/7 CONCIERGE
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.85] text-white drop-shadow-md">
            WEDDING FAQS & POLICIES
          </h1>

          <p className="font-cursive text-xl sm:text-3xl text-[#E88A1A] mt-1 font-normal drop-shadow-sm">
            Everything You Need to Plan With Complete Confidence
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Intro Lead */}
        <div className="pb-6 border-b border-[#26532B]/20 mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#1D261E]/85 max-w-3xl font-medium leading-relaxed">
            Planning a royal wedding is a once-in-a-lifetime journey. Here are clear answers to our most frequent questions regarding booking policies, capacity, catering segregation, power backup, and date reservations.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FAF6EE] rounded-[20px] border border-[#26532B]/30 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#26532B]/30"
                >
                  <span className="text-base sm:text-lg font-black uppercase tracking-tight text-[#1D261E]">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-[#26532B] text-white transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[#E88A1A]' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#26532B]/15 text-sm text-[#1D261E]/80 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Banner */}
        <div className="p-8 sm:p-10 bg-[#26532B] rounded-[24px] border border-white/20 text-center text-white">
          <h3 className="text-2xl font-black uppercase text-white mb-2">
            HAVE SPECIFIC CUSTOM QUESTIONS?
          </h3>
          <p className="text-sm text-white/90 mb-6 font-medium">
            Our wedding desk is available 24 hours daily. Connect with our senior wedding manager directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase clay-btn-gold text-white transition-all cursor-pointer shadow-md"
            >
              BOOK CONSULTATION
            </button>
            <a
              href={`tel:${RESORT_CONTACT.rawPhone}`}
              className="px-6 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FAF6EE] text-[#1D261E] border border-[#26532B]/30 hover:bg-[#E88A1A] transition-colors"
            >
              CALL 24/7 DESK
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
