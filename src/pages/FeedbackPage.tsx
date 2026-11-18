import React from 'react';
import { GoogleReviewBooster } from '../components/feedback/GoogleReviewBooster.tsx';
import { Star, ShieldCheck, Heart } from 'lucide-react';

interface FeedbackPageProps {
  onBack?: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = () => {
  return (
    <div className="pt-[78px] sm:pt-[88px] pb-16 sm:pb-20 bg-[#FAF6EE] text-[#1D261E]">
      {/* Landscaped Palace Hero Banner */}
      <div className="no-print relative w-full h-[220px] sm:h-[280px] lg:h-[320px] overflow-hidden bg-[#151D16] mb-6 sm:mb-8">
        <img
          src="/images/hero-reel-poster.webp"
          alt="Sheesh Mahal Resort Royal Celebrations"
          className="w-full h-full object-cover object-center opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF6EE] via-black/45 to-black/25" />

        <div className="absolute inset-0 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col justify-end pb-6 sm:pb-8">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs sm:text-sm font-black tracking-[0.2em] text-[#E88A1A] uppercase drop-shadow-md">
              GUEST EXPERIENCE & REVIEWS
            </span>
            <span className="w-8 h-[1px] bg-[#E88A1A]"></span>
            <span className="text-[10px] sm:text-xs font-black tracking-widest text-[#1D261E] bg-[#E88A1A] px-2 py-0.5 rounded-sm uppercase flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#1D261E]" />
              <span>4.9 GOOGLE VERIFIED</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-[0.9] text-white drop-shadow-md font-spartan">
            ROYAL GUEST REVIEWS
          </h1>

          <p className="font-cursive text-lg sm:text-2xl text-[#E88A1A] mt-1 font-normal drop-shadow-sm">
            Share your blessing from the grand wedding celebration
          </p>
        </div>
      </div>

      {/* Review Booster & Standee */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <GoogleReviewBooster />
      </div>
    </div>
  );
};
