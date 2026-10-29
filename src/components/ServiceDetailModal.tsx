import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { ResortService, RESORT_CONTACT } from '../data/resortData.ts';

interface ServiceDetailModalProps {
  service: ResortService | null;
  isOpen: boolean;
  onClose: () => void;
  onInquire: () => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  isOpen,
  onClose,
  onInquire
}) => {
  if (!isOpen || !service) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-[#1D261E]/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl max-h-[92dvh] flex flex-col bg-[#FAF6EE] text-[#1D261E] rounded-[20px] sm:rounded-[24px] shadow-2xl border border-[#26532B]/30 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-5 border-b border-[#26532B]/20 bg-[#26532B] shrink-0">
          <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[#1D261E]">
            SHEESH MAHAL RESORT // WEDDING AMENITY {service.number}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-[#1D261E]/20 flex items-center justify-center hover:bg-[#1D261E] hover:text-[#FAF6EE] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>

        <div className="p-5 sm:p-8 overflow-y-auto flex-1">
          <span className="text-4xl font-black italic text-[#26532B] mb-2 block">
            {service.number}
          </span>
          <h3 className="text-3xl font-black uppercase tracking-tight text-[#1D261E] mb-2">
            {service.title}
          </h3>
          <p className="font-cursive text-2xl text-[#26532B] mb-4 font-normal">
            Bespoke Wedding Curation
          </p>
          <p className="text-sm text-[#1D261E]/80 leading-relaxed mb-8 font-normal">
            {service.description}
          </p>

          <h4 className="text-xs font-black uppercase tracking-widest text-[#1D261E]/70 mb-4">
            ROYAL WEDDING INCLUSIONS & SPECIFICATIONS
          </h4>
          <div className="space-y-3 mb-8">
            {service.capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-4 bg-[#26532B]/40 border border-[#26532B]/25 rounded-xl flex items-start gap-3"
              >
                <CheckCircle2 size={16} className="text-[#26532B] shrink-0 mt-0.5" />
                <span className="text-xs font-bold text-[#1D261E]">{cap}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#26532B]/20">
            <span className="text-xs text-[#1D261E]/70 font-semibold">
              Wedding Desk 24/7: {RESORT_CONTACT.primaryPhone}
            </span>
            <button
              type="button"
              onClick={() => {
                onInquire();
                onClose();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase bg-[#E88A1A] text-[#1D261E] hover:bg-[#1D261E] hover:text-[#FAF6EE] transition-colors cursor-pointer"
            >
              INQUIRE FOR WEDDING
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
