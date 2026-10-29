import React from 'react';
import { X, ArrowRight, MapPin, Users, Compass, CheckCircle2 } from 'lucide-react';
import { VenueSpace, RESORT_CONTACT } from '../data/resortData.ts';
import { LuxuryVisual } from './LuxuryVisual.tsx';

interface CaseStudyModalProps {
  caseItem: VenueSpace | null;
  isOpen: boolean;
  onClose: () => void;
  onBookCase: (space: VenueSpace) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  caseItem,
  isOpen,
  onClose,
  onBookCase
}) => {
  if (!isOpen || !caseItem) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#303841]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92dvh] flex flex-col bg-[#F5F5F5] text-[#303841] rounded-[20px] sm:rounded-[24px] shadow-2xl border border-[#76ABAE]/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#76ABAE]/20 bg-[#76ABAE] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#303841]">
              SHEESH MAHAL RESORT // {caseItem.id.toUpperCase()}
            </span>
            <span className="text-xs text-[#303841]/30 hidden xs:inline">•</span>
            <span className="hidden xs:inline text-[10px] sm:text-xs font-bold tracking-wider text-[#76ABAE] bg-[#303841] px-2 py-0.5 rounded-sm">
              OPEN 24 HOURS
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#303841]/20 flex items-center justify-center hover:bg-[#303841] hover:text-[#F5F5F5] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 lg:p-12 overflow-y-auto flex-1">
          {/* Header section with cursive flourish */}
          <div className="mb-8">
            <span className="text-[10px] font-black text-[#76ABAE] tracking-[0.3em] uppercase block mb-1">
              {caseItem.category}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#303841] leading-none mb-1">
              {caseItem.title}
            </h2>
            <p className="font-cursive text-2xl sm:text-3xl text-[#76ABAE] mb-3 font-normal">
              A Grand Celebration of Royal Heritage
            </p>
            <p className="text-lg text-[#303841]/80 font-bold max-w-2xl">
              {caseItem.headline}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#76ABAE]/50 rounded-[16px] border border-[#76ABAE]/20 mb-10">
            <div className="flex items-start gap-3">
              <Users size={18} className="text-[#76ABAE] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#303841]/60">CAPACITY</p>
                <p className="text-xs font-bold text-[#303841]">{caseItem.capacity}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass size={18} className="text-[#76ABAE] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#303841]/60">AREA / SPAN</p>
                <p className="text-xs font-bold text-[#303841]">{caseItem.area}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#76ABAE] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#303841]/60">LOCATION</p>
                <p className="text-xs font-bold text-[#303841]">Ashiana-Digha Rd, Patna</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#76ABAE] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#303841]/60">BEST FOR</p>
                <p className="text-xs font-bold text-[#303841]">{caseItem.idealFor}</p>
              </div>
            </div>
          </div>

          {/* Image & Description Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6 rounded-[20px] overflow-hidden shadow-lg border border-[#76ABAE]/20 bg-[#303841]">
              <LuxuryVisual
                src={caseItem.image}
                alt={caseItem.alt}
                aspectRatioClass="aspect-[4/3] sm:aspect-[16/10]"
                className="rounded-[20px]"
                title={caseItem.title}
                category={caseItem.category}
              />
            </div>
            <div className="lg:col-span-6 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-black uppercase tracking-widest text-[#303841]/70 mb-3">
                  VENUE OVERVIEW
                </h4>
                <p className="text-sm leading-relaxed text-[#303841]/80 mb-6 font-normal">
                  {caseItem.description}
                </p>
                
                <h4 className="text-xs font-black uppercase tracking-widest text-[#303841]/70 mb-3">
                  INCLUDED HIGHLIGHTS
                </h4>
                <ul className="space-y-2.5">
                  {caseItem.features.map((h, i) => (
                    <li key={i} className="text-xs font-semibold text-[#303841] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722] border border-[#303841] mt-1.5 shrink-0"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="mb-12">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#303841]/70 mb-4">
              TECHNICAL SPECIFICATIONS & AMENITIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseItem.specs.map((spec, i) => (
                <div key={i} className="p-4 bg-[#76ABAE]/40 border border-[#76ABAE]/20 rounded-[14px]">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#303841]/60 mb-1">
                    {spec.label}
                  </p>
                  <p className="text-xs font-bold text-[#303841] uppercase">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Flow */}
          <div className="mb-12">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#303841]/70 mb-4">
              RECOMMENDED CELEBRATION FLOW
            </h4>
            <div className="space-y-4">
              {caseItem.itinerary.map((leg, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[16px] bg-[#F5F5F5] border border-[#76ABAE]/25 hover:border-[#FF5722] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#76ABAE]">
                      {leg.step}
                    </span>
                    <h5 className="text-sm font-black uppercase tracking-tight text-[#303841]">
                      {leg.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#303841]/80 leading-relaxed font-normal">
                    {leg.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer inside Modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#76ABAE]/20">
            <div>
              <p className="text-xs text-[#303841]/70 font-medium">
                Call: {RESORT_CONTACT.primaryPhone} | Open 24 Hours for booking visits
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onBookCase(caseItem);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FF5722] text-[#303841] hover:bg-[#303841] hover:text-[#F5F5F5] transition-all duration-300 shadow-md cursor-pointer"
            >
              <span>RESERVE DATE FOR THIS VENUE</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
