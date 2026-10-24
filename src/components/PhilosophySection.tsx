import React from 'react';
import { HeartHandshake, SunMedium, Flame, MapPin, Phone } from 'lucide-react';
import { RevealUp } from './RevealUp.tsx';
import { RESORT_CONTACT } from '../data/resortData.ts';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

import { LuxuryVisual } from './LuxuryVisual.tsx';

interface PhilosophySectionProps {
  onOpenInquiry: () => void;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ onOpenInquiry }) => {
  const rituals = [
    {
      title: "HALDI & MEHNDI CARNIVALS",
      image: "/images/gallery/smr-48.jpg",
      icon: <SunMedium className="w-6 h-6 text-[#FAEE2F]" strokeWidth={1.5} />,
      description: "Sunlit open courtyard celebrations decorated in fresh yellow marigolds, brass urlis, and festive canopies. Featuring organic herbal turmeric paste, live folk dhol beats, master bridal henna artists, and interactive street chaat counters.",
      badge: "PRE-WEDDING",
      cursiveTag: "Joyous Rites & Sangeet Sundowners"
    },
    {
      title: "BARAAT, VARMALA & SAAT PHERE",
      image: "/images/gallery/smr-57.jpg",
      icon: <Flame className="w-6 h-6 text-[#9FA1FF]" strokeWidth={1.5} />,
      description: "Regal Baraat avenue welcoming with dhol and nagada, followed by a cinematic revolving Varmala stage garland exchange with cold-pyro fireworks. Completed with sacred Vedic Saat Phere around the sanctified holy havan.",
      badge: "SACRED NUPTIALS",
      cursiveTag: "Seven Sacred Vows of Eternity"
    },
    {
      title: "ROYAL WEDDING RECEPTION",
      image: "/images/gallery/smr-60.jpg",
      icon: <HeartHandshake className="w-6 h-6 text-[#B5BAFF]" strokeWidth={1.5} />,
      description: "Imperial evening banqueting celebrating the newly married couple. 60+ dish royal Awadhi and Bihari delicacies, live instrumental music, mirror-work crystal chandelier hall, and dedicated photography stages.",
      badge: "SHAHI DAWAT",
      cursiveTag: "Imperial Banqueting & Feasts"
    }
  ];

  return (
    <section
      id="rituals"
      className="py-24 lg:py-32 bg-[#D9F9DF]/40 text-[#161726] border-b border-[#9FA1FF]/20 relative overflow-hidden"
    >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12 relative">
        <RevealUp>
          {/* Section Header */}
          <div className="mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-4">
              <span className="label-utility text-[#161726]/70">
                SACRED WEDDING RITUALS & MILESTONES
              </span>
              <span className="w-10 h-[1px] bg-[#9FA1FF]"></span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726]">
              WEDDING RITUALS
            </h2>
            <p className="font-cursive text-3xl sm:text-4xl text-[#9FA1FF] mt-2 font-normal">
              From Sacred Vedic Vows to Starlit Wedding Banquets
            </p>
            <p className="mt-4 text-lg sm:text-xl text-[#161726]/75 max-w-2xl font-medium">
              Every ceremonial rite is honored with authentic traditions, bespoke stage architecture, flawless catering, and dedicated wedding coordinators on call 24 hours.
            </p>
          </div>
        </RevealUp>

        {/* 3 Wedding Rituals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {rituals.map((ritual, idx) => (
            <RevealUp key={idx} delay={idx * 120}>
              <div className="p-6 sm:p-8 bg-[#FAFDFB] rounded-[24px] border border-[#9FA1FF]/30 h-full flex flex-col justify-between group hover:border-[#FAEE2F] transition-all duration-700 shadow-md hover:shadow-2xl">
                <div>
                  {/* Photo Visual */}
                  <div className="relative aspect-[16/10] rounded-[18px] overflow-hidden mb-6 bg-[#161726] shadow-sm">
                    <LuxuryVisual
                      src={ritual.image}
                      alt={ritual.title}
                      aspectRatioClass="aspect-[16/10]"
                      title={ritual.title}
                      category={ritual.badge}
                    />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="text-[9px] font-black tracking-widest uppercase bg-[#161726]/90 backdrop-blur-md text-[#FAEE2F] px-2.5 py-1 rounded-md shadow">
                        {ritual.badge}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-3 text-[#9FA1FF]">
                    <div className="p-2 bg-[#D9F9DF] rounded-lg border border-[#9FA1FF]/20">
                      {ritual.icon}
                    </div>
                    <p className="font-cursive text-xl text-[#9FA1FF] font-normal">
                      {ritual.cursiveTag}
                    </p>
                  </div>

                  <h3 className="text-xl font-black uppercase tracking-tight text-[#161726] mb-3">
                    {ritual.title}
                  </h3>
                  <p className="text-sm text-[#161726]/80 leading-relaxed font-normal">
                    {ritual.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#9FA1FF]/15 mt-6 flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#161726]/60">
                    OPEN 24 HOURS
                  </span>
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className="text-xs font-black uppercase tracking-wider text-[#9FA1FF] hover:text-[#161726] transition-colors cursor-pointer"
                  >
                    PLAN RITUAL →
                  </button>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>

        {/* Location & Immediate Assistance Card with Circular Badge anchored to the TOP-LEFT corner */}
        <RevealUp delay={250}>
          <div
            id="location"
            className="mt-16 sm:mt-24 p-6 sm:p-10 lg:p-14 bg-[#161726] text-[#FAFDFB] rounded-[24px] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-2xl border border-[#9FA1FF]/30 relative"
          >
            {/* Badge 4: Anchored to TOP-LEFT corner of the royal palace highlight card */}
            <div className="absolute -top-12 left-2 sm:-top-16 sm:-left-6 md:-left-8 z-30 pointer-events-auto">
              <WeddingDeskCircleBadge
                id="badge-section-4"
                badgeNumber="03"
                title="SACRED PHERE"
                subtitle="Vedic Mandap"
                statusText="HOLY FIRE RITES"
                onClick={onOpenInquiry}
                bounceDelay="2.4s"
              />
            </div>

            <div className="max-w-2xl pt-14 sm:pt-12 lg:pt-0 lg:pl-10">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#FAEE2F] block mb-2">
                PRIME ASHIANA–DIGHA CORRIDOR
              </span>
              <p className="font-cursive text-2xl sm:text-4xl text-[#FAEE2F] mb-3 font-normal">
                "A Royal Palace Where Sacred Marriages Blossom"
              </p>
              <h3 className="text-2xl sm:text-4xl font-black uppercase tracking-tight leading-tight mb-4">
                VISIT SHEESH MAHAL RESORT
              </h3>
              <p className="text-sm sm:text-base text-[#D9F9DF] leading-relaxed mb-6 font-normal">
                Conveniently located opposite the main gate of St. Xavier's College, near Bharat Petrol Pump, Mica Colony, Yadav Colony, Digha, Patna, Bihar 800011. Open round the clock for in-person wedding consultations and venue walkthroughs.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-[#FAFDFB]/80 font-bold">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-[#FAEE2F] shrink-0" />
                  <span>Opposite St. Xavier's College Gate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-[#9FA1FF] shrink-0" />
                  <span>+91 76319 29292 / +91 73608 00001</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={onOpenInquiry}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FAEE2F] text-[#161726] hover:bg-[#FAFDFB] hover:text-[#161726] transition-all duration-300 shadow-xl whitespace-nowrap cursor-pointer text-center"
              >
                CHECK WEDDING DATES
              </button>

              <a
                href={`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20schedule%20a%20wedding%20venue%20visit.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 shadow-md whitespace-nowrap cursor-pointer flex items-center justify-center gap-2.5 text-center"
              >
                <WhatsAppIcon className="w-4 h-4 fill-current shrink-0" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>
          </div>
        </RevealUp>
      </div>
    </section>
  );
};
