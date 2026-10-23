import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { RevealUp } from '../components/RevealUp.tsx';

interface PackagesPageProps {
  onOpenInquiry: () => void;
}

export const PackagesPage: React.FC<PackagesPageProps> = ({ onOpenInquiry }) => {
  const packages = [
    {
      name: "SHAHI UTSAV PACKAGE",
      tagline: "Ideal for Intimate Auspicious Ceremonies",
      capacity: "300 - 500 Guests",
      venue: "Choice of Sheesh Banquet or Poolside",
      badge: "ESSENTIAL ROYAL",
      inclusions: [
        "Full day venue access with climate control",
        "Royal 45-dish multi-cuisine dinner buffet",
        "Standard mirror-work stage and Mandap decor",
        "100% continuous generator power backup",
        "1 Dedicated air-conditioned bridal suite",
        "Valet parking with 3 attendants"
      ]
    },
    {
      name: "IMPERIAL PALACE PACKAGE",
      tagline: "Our Signature Flagship Wedding Experience",
      capacity: "600 - 1,200 Guests",
      venue: "Sheesh Banquet + Consecrated Mandap",
      badge: "MOST POPULAR",
      popular: true,
      inclusions: [
        "Exclusive access to Ballroom & Vedic Mandap",
        "Royal 65-dish Awadhi & Bihari banquet buffet",
        "Bespoke floral theme decor & hydraulic Varmala stage",
        "Cold-pyro fireworks & low-fog entry reveals",
        "Dedicated Baraat avenue with Dhol welcoming team",
        "2 Luxury bridal & groom suites",
        "100% heavy-duty generator backup & priority valet"
      ]
    },
    {
      name: "ROYAL RESIDENCY RETREAT",
      tagline: "Complete 3-Day Wedding Takeover",
      capacity: "Up to 2,000+ Guests",
      venue: "Entire Resort (All Lawns, Ballrooms & Pool)",
      badge: "ULTRA LUXURY",
      inclusions: [
        "Full 3-day exclusive resort buyout",
        "Haldi, Mehndi, Sangeet & Reception venues included",
        "Lavish live Chaat, Tandoor & royal dessert streets",
        "International & Vedic master floral architects",
        "All guest preparation suites & bridal lounges",
        "Dedicated 24/7 master wedding director on-site",
        "Unlimited valet team and private security escort"
      ]
    }
  ];

  return (
    <div className="pt-[100px] pb-24 bg-[#FAFDFB] text-[#161726]">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="py-12 border-b border-[#9FA1FF]/20 mb-16">
          <span className="label-utility text-[#161726]/70">
            TRANSPARENT CURATED PACKAGES
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726] mt-2">
            WEDDING PACKAGES
          </h1>
          <p className="font-cursive text-3xl sm:text-4xl text-[#9FA1FF] mt-2 font-normal">
            Designed for Seamless Royal Nuptials in Patna
          </p>
          <p className="text-base sm:text-lg text-[#161726]/75 max-w-3xl mt-4 font-normal">
            Whether you envision a sacred Vedic ceremony for close family or a monumental 2,000-guest celebration under starry skies, our comprehensive packages combine venue spaces, master catering, and decor.
          </p>
        </div>

        {/* 3 Packages Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20 items-stretch">
          {packages.map((pkg, i) => (
            <RevealUp key={i} delay={i * 100}>
              <div
                className={`p-8 lg:p-10 rounded-[28px] border h-full flex flex-col justify-between transition-all duration-300 ${
                  pkg.popular
                    ? 'bg-[#FAFDFB] border-[#FAEE2F] ring-2 ring-[#FAEE2F] shadow-2xl relative'
                    : 'bg-[#FAFDFB] border-[#9FA1FF]/30 shadow-lg'
                }`}
              >
                <div>
                  {pkg.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FAEE2F] text-[#161726] px-4 py-1 rounded-md text-[10px] font-black uppercase tracking-widest shadow">
                      MOST POPULAR WEDDING CHOICE
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black tracking-widest uppercase bg-[#D9F9DF] text-[#161726] px-3 py-1 rounded-md">
                      {pkg.badge}
                    </span>
                    <span className="text-xs font-bold tracking-wider text-[#9FA1FF]">
                      {pkg.capacity}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#161726] mb-1">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-[#161726]/70 font-medium mb-6">
                    {pkg.tagline}
                  </p>

                  <div className="p-3 bg-[#D9F9DF]/50 rounded-xl border border-[#9FA1FF]/20 mb-6">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#9FA1FF]">
                      INCLUDED VENUES
                    </p>
                    <p className="text-xs font-bold text-[#161726]">
                      {pkg.venue}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {pkg.inclusions.map((inc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-[#161726] font-semibold">
                        <CheckCircle2 size={15} className="text-[#9FA1FF] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#9FA1FF]/20">
                  <button
                    type="button"
                    onClick={onOpenInquiry}
                    className={`w-full py-3.5 rounded-xl text-xs font-black tracking-widest uppercase transition-colors cursor-pointer shadow-md ${
                      pkg.popular
                        ? 'bg-[#FAEE2F] text-[#161726] hover:bg-[#161726] hover:text-[#FAFDFB]'
                        : 'bg-[#161726] text-[#FAEE2F] hover:bg-[#9FA1FF] hover:text-[#161726]'
                    }`}
                  >
                    INQUIRE FOR THIS PACKAGE
                  </button>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </div>
  );
};
