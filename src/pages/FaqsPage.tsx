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
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#F5F5F5] text-[#303841]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="py-8 sm:py-12 border-b border-[#76ABAE]/20 mb-12 sm:mb-16 text-center">
          <span className="label-utility text-[#303841]/70">
            TRANSPARENT GUIDANCE
          </span>
          <h1 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#303841] mt-2">
            WEDDING FAQS & POLICIES
          </h1>
          <p className="font-cursive text-2xl sm:text-4xl text-[#76ABAE] mt-2 font-normal">
            Everything You Need to Know for Your Special Day
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 mb-16">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#F5F5F5] rounded-[20px] border border-[#76ABAE]/30 shadow-sm overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 cursor-pointer hover:bg-[#76ABAE]/30"
                >
                  <span className="text-base sm:text-lg font-black uppercase tracking-tight text-[#303841]">
                    {faq.q}
                  </span>
                  <div className={`p-1.5 rounded-lg bg-[#76ABAE] text-[#303841] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 bg-[#FF5722]' : ''}`}>
                    <ChevronDown size={18} />
                  </div>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#76ABAE]/15 text-sm text-[#303841]/80 leading-relaxed font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact Banner */}
        <div className="p-8 sm:p-10 bg-[#76ABAE] rounded-[24px] border border-[#76ABAE]/30 text-center">
          <h3 className="text-2xl font-black uppercase text-[#303841] mb-2">
            HAVE SPECIFIC CUSTOM QUESTIONS?
          </h3>
          <p className="text-sm text-[#303841]/80 mb-6 font-medium">
            Our wedding desk is available 24 hours daily. Connect with our senior wedding manager directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#303841] text-[#FF5722] hover:bg-[#FF5722] hover:text-[#303841] transition-colors cursor-pointer shadow-md"
            >
              BOOK CONSULTATION
            </button>
            <a
              href={`tel:${RESORT_CONTACT.primaryPhone}`}
              className="px-6 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#F5F5F5] text-[#303841] border border-[#76ABAE]/30 hover:bg-[#FF5722] transition-colors"
            >
              Call: {RESORT_CONTACT.primaryPhone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
