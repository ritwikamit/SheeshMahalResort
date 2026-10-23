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
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAFDFB] text-[#161726]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="py-8 sm:py-12 border-b border-[#9FA1FF]/20 mb-12 sm:mb-16">
          <span className="label-utility text-[#161726]/70">
            IN-HOUSE ROYAL WEDDING BANQUETING
          </span>
          <h1 className="text-3xl sm:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726] mt-2">
            SHAHI WEDDING CATERING
          </h1>
          <p className="font-cursive text-2xl sm:text-4xl text-[#9FA1FF] mt-2 font-normal">
            A Feast of Royal Flavors, Crafted with Devotion
          </p>
          <p className="text-base sm:text-lg text-[#161726]/75 max-w-3xl mt-4 font-normal">
            At Sheesh Mahal Resort, we believe the wedding feast is the soul of hospitality. Our master chefs prepare lavish multi-course banquets using pure desi ghee, custom spice blends, and segregated pure vegetarian and gourmet kitchens.
          </p>
        </div>

        {/* Feature Split Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center p-8 lg:p-12 bg-[#D9F9DF]/40 rounded-[28px] border border-[#9FA1FF]/30 mb-20">
          <div className="lg:col-span-6 rounded-[20px] overflow-hidden shadow-xl bg-[#161726]">
            <LuxuryVisual
              src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85"
              alt="Shahi royal wedding catering presentation at Sheesh Mahal Resort"
              aspectRatioClass="aspect-[16/10]"
              title="Shahi Wedding Feasts"
              category="Banqueting"
            />
          </div>
          <div className="lg:col-span-6">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9FA1FF] block mb-2">
              KITCHEN STANDARDS
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#161726] mb-4">
              RIGOROUS HYGIENE & SEPARATE KITCHENS
            </h2>
            <div className="space-y-3.5 mb-6">
              <div className="flex items-start gap-3">
                <ChefHat size={18} className="text-[#9FA1FF] shrink-0 mt-0.5" />
                <p className="text-xs text-[#161726]/85 font-semibold">
                  100% physically separated pure vegetarian kitchens with independent cooking vessels, preparation zones, and specialized Jain catering capabilities.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Flame size={18} className="text-[#9FA1FF] shrink-0 mt-0.5" />
                <p className="text-xs text-[#161726]/85 font-semibold">
                  Authentic copper and clay tandoors preparing piping hot breads in real-time as guests dine.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <Award size={18} className="text-[#9FA1FF] shrink-0 mt-0.5" />
                <p className="text-xs text-[#161726]/85 font-semibold">
                  Pre-wedding tasting sessions for the bride and groom's family to customize spices, sweetness, and course presentation.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenInquiry}
              className="px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FAEE2F] text-[#161726] hover:bg-[#161726] hover:text-[#FAFDFB] transition-colors cursor-pointer shadow-md"
            >
              REQUEST TASTING & MENU CARD
            </button>
          </div>
        </div>

        {/* 4 Culinary Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {culinaryHighlights.map((cat, i) => (
            <RevealUp key={i} delay={i * 100}>
              <div className="p-8 bg-[#FAFDFB] rounded-[24px] border border-[#9FA1FF]/30 shadow-md h-full flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold tracking-wider text-[#9FA1FF] mb-2 block">
                    COURSE 0{i + 1}
                  </span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-[#161726] mb-3">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-[#161726]/80 leading-relaxed mb-6 font-normal">
                    {cat.description}
                  </p>
                  
                  <div className="space-y-2 pt-4 border-t border-[#9FA1FF]/20">
                    <p className="text-[10px] font-black uppercase tracking-wider text-[#161726]/60 mb-2">
                      SIGNATURE DELICACIES:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {cat.items.map((item, idx) => (
                        <span key={idx} className="text-xs font-bold bg-[#D9F9DF] text-[#161726] px-3 py-1 rounded-md border border-[#9FA1FF]/20">
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
