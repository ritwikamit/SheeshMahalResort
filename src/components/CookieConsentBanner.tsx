import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenCookiesPolicy: () => void;
  isLoading: boolean;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({
  onOpenCookiesPolicy,
  isLoading
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only check and show after initial loading is done
    if (!isLoading) {
      const consent = localStorage.getItem('sheesh_mahal_cookie_consent');
      if (!consent) {
        // Slight delay after loading screen fades out so it enters gracefully
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 600);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading]);

  const handleAcceptAll = () => {
    localStorage.setItem('sheesh_mahal_cookie_consent', 'accepted_all');
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('sheesh_mahal_cookie_consent', 'essential_only');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-[76px] sm:bottom-6 left-3 right-3 sm:left-8 sm:right-auto sm:max-w-md z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] animate-in fade-in slide-in-from-bottom-6"
    >
      <div className="bg-[#303841] text-[#F5F5F5] p-4 sm:p-6 rounded-2xl border border-[#76ABAE]/30 shadow-2xl relative">
        {/* Close without accepting (essential default) */}
        <button
          type="button"
          onClick={handleEssentialOnly}
          className="absolute top-4 right-4 text-[#F5F5F5]/60 hover:text-[#FF5722] transition-colors p-1 cursor-pointer"
          aria-label="Dismiss cookie notice"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#FF5722] text-[#303841] shrink-0 mt-0.5">
            <ShieldCheck size={20} strokeWidth={2} />
          </div>

          <div className="pr-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#F5F5F5]">
              YOUR PRIVACY AT SHEESH MAHAL
            </h4>
            <p className="text-xs text-[#F5F5F5]/80 leading-relaxed font-normal mt-1.5">
              We use essential cookies to maintain your session and ensure a seamless wedding booking experience on our website.
            </p>

            <div className="mt-2.5">
              <button
                type="button"
                onClick={onOpenCookiesPolicy}
                className="text-[11px] font-bold text-[#76ABAE] hover:text-[#FF5722] underline transition-colors cursor-pointer"
              >
                Read our Cookies Policy →
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons: Minimalist rectangular styling without pill/cylinder shapes */}
        <div className="mt-5 pt-4 border-t border-[#76ABAE]/20 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider text-[#F5F5F5]/80 hover:text-[#F5F5F5] hover:bg-[#F5F5F5]/10 transition-colors cursor-pointer"
          >
            ESSENTIAL ONLY
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#FF5722] text-[#303841] hover:bg-[#76ABAE] transition-colors cursor-pointer shadow-sm"
          >
            ACCEPT COOKIES
          </button>
        </div>
      </div>
    </div>
  );
};
