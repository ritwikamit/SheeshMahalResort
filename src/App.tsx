import React, { useState, useEffect } from 'react';
import { Navigation, PageRoute } from './components/Navigation.tsx';
import { Hero } from './components/Hero.tsx';
import { ServicesGrid } from './components/ServicesGrid.tsx';
import { PortfolioGrid } from './components/PortfolioGrid.tsx';
import { PhilosophySection } from './components/PhilosophySection.tsx';
import { ReelShowcase } from './components/ReelShowcase.tsx';
import { InstagramReelsSection } from './components/InstagramReelsSection.tsx';
import { MapSection } from './components/MapSection.tsx';
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

import { VenueSpace, ResortService } from './data/resortData.ts';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isLandingReady, setIsLandingReady] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedCase, setSelectedCase] = useState<VenueSpace | null>(null);
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ResortService | null>(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Loading screen completes and smoothly reveals landing page fast even on slow networks
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

    // Instant reveal: fallback at 350ms max, instant on DOM ready
    const fallbackTimer = setTimeout(triggerFadeOut, 350);

    if (document.readyState === 'complete') {
      setTimeout(triggerFadeOut, 150);
    } else {
      window.addEventListener('load', () => setTimeout(triggerFadeOut, 100), { once: true });
    }

    return () => clearTimeout(fallbackTimer);
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

            {/* Section: Live Instagram Reels Showcase (Landscape & Portrait) */}
            <InstagramReelsSection />

            {/* Section 5: Sacred Wedding Rituals & Location Highlights (Badge covering corner on LEFT) */}
            <PhilosophySection
              onOpenInquiry={() => setIsInquiryModalOpen(true)}
            />

            {/* Section 5: Dedicated Map Section before Footer (Badge covering corner of map on RIGHT) */}
            <MapSection
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
