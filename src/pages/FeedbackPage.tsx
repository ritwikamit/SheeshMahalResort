import React from 'react';
import { GoogleReviewBooster } from '../components/feedback/GoogleReviewBooster.tsx';
import { Sparkles, Star, MapPin } from 'lucide-react';

export const FeedbackPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF6EE] pt-24 sm:pt-28 pb-16">
      {/* Dedicated Page Hero Header */}
      <div className="no-print max-w-4xl mx-auto px-4 text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E88A1A]/10 border border-[#E88A1A]/30 text-xs font-semibold text-[#E88A1A] uppercase tracking-wider mb-3">
          <Star className="w-3.5 h-3.5 fill-[#E88A1A]" />
          <span>Google Verified 4.9★ Wedding Resort</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1D261E] font-spartan tracking-tight">
          Guest Review & Reception Standee
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
          Share your royal celebration feedback on Google in 1 tap, or generate an acrylic desk standee for our Ashiana–Digha reception counter.
        </p>
      </div>

      {/* Main Booster & Standee Component */}
      <GoogleReviewBooster />
    </div>
  );
};
