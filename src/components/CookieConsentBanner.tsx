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
      <div className="bg-[#161726] text-[#FAFDFB] p-4 sm:p-6 rounded-2xl border border-[#9FA1FF]/30 shadow-2xl relative">
        {/* Close without accepting (essential default) */}
        <button
          type="button"
          onClick={handleEssentialOnly}
          className="absolute top-4 right-4 text-[#FAFDFB]/60 hover:text-[#FAEE2F] transition-colors p-1 cursor-pointer"
          aria-label="Dismiss cookie notice"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-[#FAEE2F] text-[#161726] shrink-0 mt-0.5">
            <ShieldCheck size={20} strokeWidth={2} />
          </div>

          <div className="pr-4">
            <h4 className="text-xs font-black uppercase tracking-wider text-[#FAFDFB]">
              YOUR PRIVACY AT SHEESH MAHAL
            </h4>
            <p className="text-xs text-[#FAFDFB]/80 leading-relaxed font-normal mt-1.5">
              We use essential cookies to maintain your session and ensure a seamless wedding booking experience on our website.
            </p>

            <div className="mt-2.5">
              <button
                type="button"
                onClick={onOpenCookiesPolicy}
                className="text-[11px] font-bold text-[#9FA1FF] hover:text-[#FAEE2F] underline transition-colors cursor-pointer"
              >
                Read our Cookies Policy →
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons: Minimalist rectangular styling without pill/cylinder shapes */}
        <div className="mt-5 pt-4 border-t border-[#9FA1FF]/20 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={handleEssentialOnly}
            className="px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-wider text-[#FAFDFB]/80 hover:text-[#FAFDFB] hover:bg-[#FAFDFB]/10 transition-colors cursor-pointer"
          >
            ESSENTIAL ONLY
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className="px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-wider bg-[#FAEE2F] text-[#161726] hover:bg-[#D9F9DF] transition-colors cursor-pointer shadow-sm"
          >
            ACCEPT COOKIES
          </button>
        </div>
      </div>
    </div>
  );
};
