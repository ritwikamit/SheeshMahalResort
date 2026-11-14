import React from 'react';
import { Utensils, CheckCircle2, Flame, Award, ChefHat } from 'lucide-react';
import { LuxuryVisual } from '../components/LuxuryVisual.tsx';
import { RevealUp } from '../components/RevealUp.tsx';

interface CateringPageProps {
  onOpenInquiry: () => void;
}

export const CateringPage: React.FC<CateringPageProps> = ({ onOpenInquiry }) => {
  const culinaryHighlights = [
    {
      title: "Royal Awadhi & Mughlai Dum Pukht",
      description: "Slow-cooked saffron dum biryanis, velvet Galouti kebabs, Dal Shahi Mahal, and artisanal bread baked in live copper tandoors.",
      items: ["Zafrani Gosht Biryani", "Subz Dum Biryani", "Galouti & Paneer Tikka", "Sheermal & Roomali Roti"]
    },
    {
      title: "Traditional Bihari & Banarasi Heritage",
      description: "Authentic regional culinary heritage prepared with stone-ground spices and organic pure desi ghee.",
      items: ["Champaran Meat Handi", "Litti Chokha with Desi Ghee", "Bihari Fish Fry", "Sattu Paratha & Chutneys"]
    },
    {
      title: "Live Street Chaat & Haldi Fiesta",
      description: "Interactive, hygienic live street food stalls that bring authentic festive energy to day ceremonies and evening receptions.",
      items: ["Crispy Golgappa with 5 waters", "Banarasi Tamatar Chaat", "Dahi Gujiya & Papdi Chaat", "Stuffed Chilla Counters"]
    },
    {
      title: "Shahi Mithai & Hot Dessert Bazaars",
      description: "Live hot desserts, seasonal halwas, and royal Awadhi confections served fresh to guests.",
      items: ["Live Rabri Jalebi", "Moong Dal & Gajar Halwa", "Shahi Tukda & Rasmalai", "Matka Kulfi with Falooda"]
    }
  ];

  return (
    <div className="pt-[78px] sm:pt-[88px] pb-20 sm:pb-24 bg-[#FAF6EE] text-[#1D261E]">
      
      {/* Landscaped Hero Banner */}
      <div className="relative w-full h-[260px] sm:h-[340px] lg:h-[400px] overflow-hidden bg-[#151D16] mb-8 sm:mb-12">
        <img
          src="/images/reels_posters/landscape-3.webp"
          alt="Sheesh Mahal Resort Royal Banqueting & Catering"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-black/35 to-black/20" />

        <div className="absolute inset-0 max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-8 sm:pb-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-[#E88A1A] uppercase drop-shadow-md">
              IN-HOUSE ROYAL WEDDING BANQUETING
            </span>
            <span className="w-8 h-[1px] bg-[#E88A1A]"></span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm uppercase">
              PURE VEG & NON-VEG KITCHENS
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-[0.85] text-white drop-shadow-md">
            SHAHI WEDDING CATERING
          </h1>

          <p className="font-cursive text-xl sm:text-3xl text-[#E88A1A] mt-1 font-normal drop-shadow-sm">
            A Feast of Royal Flavors, Crafted with Devotion
          </p>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Intro Lead */}
        <div className="pb-8 border-b border-[#26532B]/20 mb-10 sm:mb-14">
          <p className="text-sm sm:text-base text-[#1D261E]/85 max-w-3xl font-medium leading-relaxed">
            At Sheesh Mahal Resort, we believe the wedding feast is the soul of hospitality. Our master chefs prepare lavish multi-course banquets using pure desi ghee, custom spice blends, and segregated pure vegetarian and gourmet kitchens.
          </p>
        </div>

        {/* Feature Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 lg:p-12 bg-[#26532B]/40 rounded-[28px] border border-[#26532B]/30 mb-20">
          <div className="lg:col-span-6 rounded-[20px] overflow-hidden shadow-xl bg-[#1D261E]">
            <LuxuryVisual
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"
              alt="Shahi royal wedding catering presentation at Sheesh Mahal Resort"
              aspectRatioClass="aspect-[16/10]"
              title="Shahi Wedding Feasts"
              category="Banqueting"
            />
          </div>
          <div className="lg:col-span-6">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#26532B] block mb-2">
              KITCHEN STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#1D261E] mb-4">
              RIGOROUS HYGIENE & SEPARATE KITCHENS
            </h2>
            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-3">
                <ChefHat size={18} className="text-[#26532B] shrink-0 mt-0.5" />
                <p className="text-xs text-[#1D261E]/85 font-semibold">
                  100% physically separated pure vegetarian kitchens with independent cooking vessels, preparation zones, and specialized Jain catering capabilities.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Flame size={18} className="text-[#26532B] shrink-0 mt-0.5" />
                <p className="text-xs text-[#1D261E]/85 font-semibold">
                  Authentic copper and clay tandoors preparing piping hot breads in real-time as guests dine.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Award size={18} className="text-[#26532B] shrink-0 mt-0.5" />
                <p className="text-xs text-[#1D261E]/85 font-semibold">
                  Pre-wedding tasting sessions for the bride and groom's family to customize spices, sweetness, and course presentation.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#E88A1A] text-[#1D261E] hover:bg-[#1D261E] hover:text-[#FAF6EE] transition-colors cursor-pointer shadow-md"
            >
              REQUEST TASTING & MENU CARD
            </button>
          </div>
        </div>

        {/* 4 Culinary Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {culinaryHighlights.map((cat, i) => (
            <RevealUp key={i} delay={i * 100}>
              <div className="p-8 bg-[#FAF6EE] rounded-[24px] border border-[#26532B]/30 shadow-md h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#26532B] mb-2 block">
                    COURSE 0{i + 1}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#1D261E] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#1D261E]/80 leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>
                  
                  <div className="space-y-2 pt-4 border-t border-[#26532B]/20">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#1D261E]/60 mb-2">
                      SIGNATURE DELICACIES:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item, idx) => (
                        <span key={idx} className="text-xs font-bold bg-[#26532B] text-white px-3 py-1 rounded-md shadow-2xs border border-[#26532B]/20">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </div>
  );
};
