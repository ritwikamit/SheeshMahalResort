import React, { useState, useEffect } from 'react';
import { Navigation, PageRoute } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesGrid } from './components/ServicesGrid.tsx';
import { PortfolioGrid } from './components/PortfolioGrid.tsx';
import { PhilosophySection } from './components/PhilosophySection.tsx';
import { ReelShowcase } from './components/ReelShowcase.tsx';
import { InstagramReelsSection } from './components/InstagramReelsSection.tsx';
import { MapSection } from './components/MapSection.tsx';
import { FAQSection } from './components/FAQSection.tsx';

import { Footer } from './components/Footer.tsx';
import { CaseStudyModal } from './components/CaseStudyModal.tsx';
import { ConciergeInquiryModal } from './components/ConciergeInquiryModal.tsx';
import { ServiceDetailModal } from './components/ServiceDetailModal.tsx';
import { ScrollToTopProgress } from './components/ScrollToTopProgress.tsx';
import { WeddingChatbot } from './components/WeddingChatbot.tsx';
import { MobileQuickBar } from './components/MobileQuickBar.tsx';
import { LoadingScreen } from './components/LoadingScreen.tsx';
import { CookieConsentBanner } from './components/CookieConsentBanner.tsx';

// Dedicated Pages
import { VenuesPage } from './pages/VenuesPage.tsx';
import { CateringPage } from './pages/CateringPage.tsx';
import { RitualsPage } from './pages/RitualsPage.tsx';
import { GalleryPage } from './pages/GalleryPage.tsx';
import { PackagesPage } from './pages/PackagesPage.tsx';
import { FaqsPage } from './pages/FaqsPage.tsx';
import { TermsPage } from './pages/TermsPage.tsx';
import { CookiesPage } from './pages/CookiesPage.tsx';
import { FeedbackPage } from './pages/FeedbackPage.tsx';

import { VenueSpace, ResortService } from './data/resortData.ts';

const PAGE_META: Record<PageRoute, { title: string; desc: string }> = {
  home: {
    title: "Sheesh Mahal Resort Patna — Royal Wedding Venues, Lawns & Banquets | Opp. St. Xavier's",
    desc: "Patna's distinguished royal wedding destination on Ashiana–Digha Road opposite St. Xavier's College Gate. Sprawling starlit lawns, grand AC ballroom, and sacred setups for all religions at affordable starting tiers."
  },
  venues: {
    title: "Royal Wedding Venues & Lawns — Sheesh Mahal Resort Patna",
    desc: "Explore 45,000+ sq. ft. of royal celebration spaces: Grand Sheesh Ballroom, Starlit Baraat Lawn, and Consecrated Vedic Mandap on Ashiana–Digha Road, Patna."
  },
  catering: {
    title: "Royal Wedding Catering & Shahi Banquets — Sheesh Mahal Resort Patna",
    desc: "Exquisite Awadhi Dum Pukht, Champaran Handi, live chaat stalls, and 100% segregated pure-vegetarian kitchens for grand wedding feasts in Patna."
  },
  rituals: {
    title: "Wedding Rituals & Celebrations — Sheesh Mahal Resort Patna",
    desc: "From Haldi flower showers and Sangeet dances to royal Baraats and sacred Saat Phere under starry skies at Sheesh Mahal Resort."
  },
  packages: {
    title: "All-Inclusive Royal Wedding Packages — Sheesh Mahal Resort Patna",
    desc: "Transparent, accessible starting tiers for intimate weddings and 2,000-guest royal celebrations with AC ballrooms, catering, and bridal suites."
  },
  gallery: {
    title: "Photo & Video Gallery — Sheesh Mahal Resort Patna",
    desc: "Authentic photographs and 4K reels of real weddings, illuminated Baraat lawns, and revolving stage Varmala celebrations in Patna."
  },
  faqs: {
    title: "Wedding FAQs & Booking Policies — Sheesh Mahal Resort Patna",
    desc: "Comprehensive answers regarding guest capacity, pure-veg catering segregation, power backup, valet parking, and booking dates."
  },
  terms: {
    title: "Terms & Protocols — Sheesh Mahal Resort Patna",
    desc: "Official reservation protocols, occupancy guidelines, and event guidelines for Sheesh Mahal Resort, Ashiana–Digha Road, Patna."
  },
  cookies: {
    title: "Cookies & Digital Privacy — Sheesh Mahal Resort Patna",
    desc: "Digital privacy protocol and cookie preferences for guests visiting Sheesh Mahal Resort's official website."
  },
  feedback: {
    title: "Guest Reviews & Reception Standee — Sheesh Mahal Resort Patna",
    desc: "Share your 5-star royal wedding review on Google or print reception desk standees for Sheesh Mahal Resort, Ashiana–Digha Road, Patna."
  }
};

const getInitialPage = (): PageRoute => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(/^\//, '').toLowerCase();
  const validPages: PageRoute[] = ['home', 'venues', 'catering', 'rituals', 'gallery', 'packages', 'faqs', 'terms', 'cookies', 'feedback'];
  if (validPages.includes(path as PageRoute)) {
    return path as PageRoute;
  }
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (validPages.includes(hash as PageRoute)) {
    return hash as PageRoute;
  }
  return 'home';
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLandingReady, setIsLandingReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageRoute>(getInitialPage);
  const [selectedCase, setSelectedCase] = useState<VenueSpace | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ResortService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Dynamic SEO & Title tag updates per page
  useEffect(() => {
    const meta = PAGE_META[currentPage] || PAGE_META.home;
    document.title = meta.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', meta.desc);
    }
  }, [currentPage]);

  // Sync browser back/forward history navigation for SXO & deep URLs
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getInitialPage());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Loading screen displayed for 1 second as requested, then smoothly fades out
  useEffect(() => {
    let dismissed = false;
    const triggerFadeOut = () => {
      if (dismissed) return;
      dismissed = true;
      setIsFadingOut(true);
      setTimeout(() => {
        setIsLoading(false);
        setIsLandingReady(true);
      }, 500);
    };

    // Exactly 1 second brand presentation before revealing the palace experience
    const timer = setTimeout(triggerFadeOut, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpenCase = (spaceItem: VenueSpace) => {
    setSelectedCase(spaceItem);
    setIsCaseModalOpen(true);
  };

  const handleBookFromCase = (spaceItem: VenueSpace) => {
    setSelectedCase(spaceItem);
    setIsCaseModalOpen(false);
    setIsInquiryModalOpen(true);
  };

  const handleSelectService = (service: ResortService) => {
    setSelectedService(service);
    setIsServiceModalOpen(true);
  };

  const handleNavigatePage = (page: PageRoute) => {
    setCurrentPage(page);
    const targetPath = page === 'home' ? '/' : `/${page}`;
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ page }, '', targetPath);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateSection = (sectionId: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#1D261E] font-['League_Spartan',sans-serif] selection:bg-[#E88A1A] selection:text-[#1D261E]">
      {/* Minimal Loading Screen: Displays completely until ready, then fades out */}
      {isLoading && <LoadingScreen isFadingOut={isFadingOut} />}

      {/* Main App Canvas - Gracefully reveals only after loading screen finishes */}
      <div className={`transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isLandingReady ? 'opacity-100' : 'opacity-0'}`}>
        {/* Simple, Minimalistic Navigation Bar */}
        <Navigation
          currentPage={currentPage}
          onNavigatePage={handleNavigatePage}
          onOpenInquiry={() => setIsInquiryModalOpen(true)}
          onNavigateSection={handleNavigateSection}
        />

      {/* Main Content Router */}
      <main>
        {currentPage === 'home' && (
          <div id="landing-page-flow" className="relative w-full overflow-hidden">
            {/* Section 1: Full Viewport Hero Section (Badge covering corner of image on RIGHT) */}
            <Hero
              onExploreClick={() => handleNavigateSection('spaces')}
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />

            {/* Section 2: Witness the Royal Grandeur (Live Wedding Reel Showcase) */}
            <ReelShowcase
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />

            {/* Section: Live Instagram Reels Showcase (Landscape & Portrait) */}
            <InstagramReelsSection />

            {/* Section 3: 3-Column Wedding Services Grid (Badge covering corner on LEFT) */}
            <ServicesGrid
              onSelectService={handleSelectService}
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />

            {/* Section 4: Staggered 2-Column Wedding Venues Grid (Badge covering corner on RIGHT) */}
            <PortfolioGrid
              onSelectCase={handleOpenCase}
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
              onOpenGallery={() => handleNavigatePage('gallery')}
            />

            {/* Section 5: Sacred Wedding Rituals & Location Highlights (Badge covering corner on LEFT) */}
            <PhilosophySection
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />

            {/* Section 5: Dedicated Map Section before Footer (Badge covering corner of map on RIGHT) */}
            <MapSection
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />

            {/* Section 6: Essential Wedding FAQs & Trust Authority (Right below Map) */}
            <FAQSection
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />
          </div>
        )}

        {currentPage === 'venues' && (
          <VenuesPage
            onSelectSpace={handleOpenCase}
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        )}

        {currentPage === 'catering' && (
          <CateringPage
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        )}

        {currentPage === 'rituals' && (
          <RitualsPage
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        )}

        {currentPage === 'gallery' && (
          <GalleryPage
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        )}

        {currentPage === 'packages' && (
          <PackagesPage
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        )}

        {currentPage === 'faqs' && (
          <FaqsPage
            onOpenInquiry={() => setIsInquiryModalOpen(true)}
          />
        )}

        {currentPage === 'terms' && (
          <TermsPage
            onBack={() => handleNavigatePage('home')}
          />
        )}

        {currentPage === 'cookies' && (
          <CookiesPage
            onBack={() => handleNavigatePage('home')}
          />
        )}

        {currentPage === 'feedback' && (
          <FeedbackPage />
        )}
      </main>

      {/* Footer with centered All rights reserved, ACCustomLabs credit, and icon-only calls */}
      <Footer
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
        onNavigateSection={handleNavigateSection}
        onOpenTerms={() => handleNavigatePage('terms')}
        onOpenCookies={() => handleNavigatePage('cookies')}
      />

      {/* Bottom-Right Floating Actions: Chatbot & Scroll-to-Top aligned vertically in column */}
      <aside
        aria-label="Floating Actions"
        className="fixed bottom-[74px] md:bottom-6 right-3 sm:right-6 z-[60] flex flex-col-reverse items-center gap-2.5 sm:gap-3"
      >
        <WeddingChatbot onOpenInquiry={() => setIsInquiryModalOpen(true)} />
        <ScrollToTopProgress isStandalone={false} />
      </aside>

      {/* Smartphone Bottom Quick Navigation Menu */}
      <MobileQuickBar
        currentPage={currentPage}
        onNavigatePage={handleNavigatePage}
        onOpenInquiry={() => setIsInquiryModalOpen(true)}
      />


      {/* Cookie Consent Box appearing for new visitors after loading screen */}
      <CookieConsentBanner
        isLoading={isLoading}
        onOpenCookiesPolicy={() => handleNavigatePage('cookies')}
      />

      {/* Interactive Venue Space Detail Modal */}
      <CaseStudyModal
        caseItem={selectedCase}
        isOpen={isCaseModalOpen}
        onClose={() => setIsCaseModalOpen(false)}
        onBookCase={handleBookFromCase}
      />

      {/* Interactive Wedding Date Booking / Inquiry Modal */}
      <ConciergeInquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        selectedCase={selectedCase}
      />

      {/* Interactive Wedding Service Detail Modal */}
      <ServiceDetailModal
        service={selectedService}
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        onInquire={() => setIsInquiryModalOpen(true)}
      />
      </div>
    </div>
  );
}
