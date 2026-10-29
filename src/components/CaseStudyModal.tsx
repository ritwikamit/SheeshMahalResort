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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#161726]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[92dvh] flex flex-col bg-[#FFF9D8] text-[#161726] rounded-[20px] sm:rounded-[24px] shadow-2xl border border-[#1DCED8]/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#1DCED8]/20 bg-[#55E07E] shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#161726]">
              SHEESH MAHAL RESORT // {caseItem.id.toUpperCase()}
            </span>
            <span className="text-xs text-[#161726]/30 hidden xs:inline">•</span>
            <span className="hidden xs:inline text-[10px] sm:text-xs font-bold tracking-wider text-[#1DCED8] bg-[#161726] px-2 py-0.5 rounded-sm">
              OPEN 24 HOURS
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#161726]/20 flex items-center justify-center hover:bg-[#161726] hover:text-[#FFF9D8] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-8 lg:p-12 overflow-y-auto flex-1">
          {/* Header section with cursive flourish */}
          <div className="mb-8">
            <span className="text-[10px] font-black text-[#1DCED8] tracking-[0.3em] uppercase block mb-1">
              {caseItem.category}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#161726] leading-none mb-1">
              {caseItem.title}
            </h2>
            <p className="font-cursive text-2xl sm:text-3xl text-[#1DCED8] mb-3 font-normal">
              A Grand Celebration of Royal Heritage
            </p>
            <p className="text-lg text-[#161726]/80 font-bold max-w-2xl">
              {caseItem.headline}
            </p>
          </div>

          {/* Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-[#55E07E]/50 rounded-[16px] border border-[#1DCED8]/20 mb-10">
            <div className="flex items-start gap-3">
              <Users size={18} className="text-[#1DCED8] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#161726]/60">CAPACITY</p>
                <p className="text-xs font-bold text-[#161726]">{caseItem.capacity}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass size={18} className="text-[#1DCED8] shrink-0 mt-0.5" strokeWidth={1.75} />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#161726]/60">AREA / SPAN</p>
                <p className="text-xs font-bold text-[#161726]">{caseItem.area}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin size={18} className="text-[#1DCED8] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#161726]/60">LOCATION</p>
                <p className="text-xs font-bold text-[#161726]">Ashiana-Digha Rd, Patna</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-[#1DCED8] shrink-0 mt-0.5" />
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-[#161726]/60">BEST FOR</p>
                <p className="text-xs font-bold text-[#161726]">{caseItem.idealFor}</p>
              </div>
            </div>
          </div>

          {/* Image & Description Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            <div className="lg:col-span-6 rounded-[20px] overflow-hidden shadow-lg border border-[#1DCED8]/20 bg-[#161726]">
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
                <h4 className="text-xs font-black uppercase tracking-widest text-[#161726]/70 mb-3">
                  VENUE OVERVIEW
                </h4>
                <p className="text-sm leading-relaxed text-[#161726]/80 mb-6 font-normal">
                  {caseItem.description}
                </p>
                
                <h4 className="text-xs font-black uppercase tracking-widest text-[#161726]/70 mb-3">
                  INCLUDED HIGHLIGHTS
                </h4>
                <ul className="space-y-2.5">
                  {caseItem.features.map((h, i) => (
                    <li key={i} className="text-xs font-semibold text-[#161726] flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF9D50] border border-[#161726] mt-1.5 shrink-0"></span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="mb-12">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#161726]/70 mb-4">
              TECHNICAL SPECIFICATIONS & AMENITIES
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseItem.specs.map((spec, i) => (
                <div key={i} className="p-4 bg-[#55E07E]/40 border border-[#1DCED8]/20 rounded-[14px]">
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#161726]/60 mb-1">
                    {spec.label}
                  </p>
                  <p className="text-xs font-bold text-[#161726] uppercase">
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Sample Flow */}
          <div className="mb-12">
            <h4 className="text-xs font-black uppercase tracking-widest text-[#161726]/70 mb-4">
              RECOMMENDED CELEBRATION FLOW
            </h4>
            <div className="space-y-4">
              {caseItem.itinerary.map((leg, i) => (
                <div
                  key={i}
                  className="p-5 rounded-[16px] bg-[#FFF9D8] border border-[#1DCED8]/25 hover:border-[#FF9D50] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-[#1DCED8]">
                      {leg.step}
                    </span>
                    <h5 className="text-sm font-black uppercase tracking-tight text-[#161726]">
                      {leg.title}
                    </h5>
                  </div>
                  <p className="text-xs text-[#161726]/80 leading-relaxed font-normal">
                    {leg.details}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Footer inside Modal */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-[#1DCED8]/20">
            <div>
              <p className="text-xs text-[#161726]/70 font-medium">
                Call: {RESORT_CONTACT.primaryPhone} | Open 24 Hours for booking visits
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onBookCase(caseItem);
                onClose();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FF9D50] text-[#161726] hover:bg-[#161726] hover:text-[#FFF9D8] transition-all duration-300 shadow-md cursor-pointer"
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
