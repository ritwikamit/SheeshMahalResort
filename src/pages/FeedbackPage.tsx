import React from 'react';
import { GoogleReviewBooster } from '../components/feedback/GoogleReviewBooster.tsx';
import { Star } from 'lucide-react';

interface FeedbackPageProps {
  onBack?: () => void;
}

export const FeedbackPage: React.FC<FeedbackPageProps> = () => {
  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-24 bg-[#FAF6EE] text-[#1D261E] min-h-[85vh] flex flex-col items-center justify-center">
      {/* Minimal Claymorphic Header (No Hero Images) */}
      <div className="no-print max-w-3xl mx-auto px-4 text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 clay-pill px-4 py-1 text-xs font-black text-[#E88A1A] uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 fill-[#E88A1A]" />
          <span>4.9★ Google Verified Reviews</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-[#1D261E] uppercase font-spartan tracking-tight">
          GUEST EXPERIENCE & REVIEWS
        </h1>
        <p className="font-cursive text-xl sm:text-2xl text-[#E88A1A] mt-1 font-normal">
          Share your royal celebration memories with future families
        </p>
      </div>

      {/* Review Booster Component */}
      <div className="w-full max-w-3xl mx-auto px-4">
        <GoogleReviewBooster />
      </div>
    </div>
  );
};
