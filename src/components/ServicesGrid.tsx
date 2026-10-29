import React from 'react';
import { Utensils, Palette, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { RESORT_SERVICES, ResortService } from '../data/resortData.ts';
import { RevealUp } from './RevealUp.tsx';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface ServicesGridProps {
  onSelectService: (service: ResortService) => void;
  onOpenInquiry?: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService, onOpenInquiry }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'utensils':
        return <Utensils className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />;
      case 'palette':
      case 'sparkles':
        return <Palette className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />;
      case 'shield':
      default:
        return <ShieldCheck className="w-10 h-10 lg:w-12 lg:h-12" strokeWidth={1.5} />;
    }
  };

  return (
    <section
      id="amenities"
      className="py-16 sm:py-24 lg:py-32 bg-[#26532B]/40 text-[#1D261E] border-b border-[#26532B]/20 relative"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        {/* Section Header */}
        <RevealUp>
          <div className="mb-12 sm:mb-16 lg:mb-20">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <span className="label-utility text-[#1D261E]/70">
                ROYAL WEDDING EXCELLENCE
              </span>
              <span className="w-8 sm:w-10 h-[1px] bg-[#26532B]"></span>
            </div>

            {/* Headline: 8xl font-size with cursive flourish */}
            <h2 className="text-3xl sm:text-6xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-[#1D261E]">
              WEDDING SERVICES
            </h2>
            <p className="font-cursive text-2xl sm:text-4xl text-[#26532B] mt-2 font-normal">
              Royal Wedding Hospitality & Flawless Execution
            </p>
            <p className="mt-4 text-base sm:text-xl text-[#1D261E]/75 max-w-2xl font-medium">
              Every wedding ritual is backed by complete logistical mastery — in-house royal wedding banqueting, customisable mirror-work Mandap decor, continuous heavy-duty power backup for Baraat lighting, and dedicated bridal suites.
            </p>
          </div>
        </RevealUp>

        {/* 3 columns separated by 1px borders with Circular Badge aligned to the TOP-LEFT corner */}
        <RevealUp delay={150}>
          <div className="relative pt-8 sm:pt-10">
            {/* Badge 2: Anchored to TOP-LEFT corner of the services box without covering card content */}
            <div className="absolute -top-12 left-2 sm:-top-18 sm:-left-5 md:-left-7 z-30 pointer-events-auto">
              <WeddingDeskCircleBadge
                id="badge-section-2"
                badgeNumber="01"
                title="SHAHI CATERING"
                subtitle="Pure Desi Ghee"
                statusText="ROYAL MENUS"
                onClick={onOpenInquiry || (() => onSelectService(RESORT_SERVICES[0]))}
                bounceDelay="0.8s"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 border border-[#26532B]/30 bg-[#FAF6EE] divide-y md:divide-y-0 md:divide-x divide-[#26532B]/30 rounded-2xl overflow-hidden shadow-xl">
              {RESORT_SERVICES.map((service) => (
                <div
                  key={service.number}
                  onClick={() => onSelectService(service)}
                  className="group relative flex flex-col justify-between pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 px-6 sm:px-10 bg-[#FAF6EE] hover:bg-[#E88A1A] cursor-pointer transition-colors duration-1000"
                  style={{
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                >
                  {/* Top header row: Number and Arrow icon */}
                  <div>
                    <div className="flex items-center justify-between mb-6 sm:mb-8">
                      <span className="text-sm font-black tracking-widest text-[#1D261E]/50 group-hover:text-[#1D261E] transition-colors duration-1000">
                        {service.number}
                      </span>
                      <div className="w-8 h-8 rounded-full border border-[#1D261E]/20 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:border-[#1D261E] transition-all duration-700">
                        <ArrowUpRight
                          size={16}
                          className="text-[#1D261E] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Icon: 4xl size, transitioning from #26532B to #1D261E on hover */}
                    <div
                      className="mb-8 text-[#26532B] group-hover:text-[#1D261E] transition-colors duration-1000"
                      style={{
                        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
                      }}
                    >
                      {getIcon(service.icon)}
                    </div>

                    {/* Card Title: h3 bold uppercase */}
                    <h3 className="text-2xl font-black uppercase tracking-tight text-[#1D261E] mb-4">
                      {service.title}
                    </h3>

                    {/* Card Text: p small leading-relaxed */}
                    <p className="text-sm text-[#1D261E]/80 leading-relaxed font-normal mb-8">
                      {service.description}
                    </p>
                  </div>

                  {/* Capability Bullet list */}
                  <div className="pt-6 border-t border-[#1D261E]/10">
                    <ul className="space-y-2.5">
                      {service.capabilities.map((cap, i) => (
                        <li
                          key={i}
                          className="text-xs font-bold tracking-wide text-[#1D261E]/80 group-hover:text-[#1D261E] flex items-center gap-2 transition-colors duration-700"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#26532B] group-hover:bg-[#1D261E] shrink-0"></span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealUp>
      </div>
    </section>
  );
};
