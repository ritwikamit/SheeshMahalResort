import React from 'react';
import { MapPin, Navigation as NavIcon, Clock, Phone, ExternalLink } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';
import { RevealUp } from './RevealUp.tsx';
import { WeddingDeskCircleBadge } from './WeddingDeskCircleBadge.tsx';

interface MapSectionProps {
  onOpenInquiry?: () => void;
}

export const MapSection: React.FC<MapSectionProps> = ({ onOpenInquiry }) => {
  const landmarks = [
    { name: "St. Xavier's College Gate", distance: "Directly Opposite (0 km)", time: "1 min walk" },
    { name: "Bharat Petrol Pump", distance: "Adjacent (50 m)", time: "1 min walk" },
    { name: "Patna Junction Railway Station", distance: "8.4 km", time: "20 mins drive" },
    { name: "Jay Prakash Narayan Airport", distance: "9.2 km", time: "22 mins drive" },
    { name: "Loknayak Ganga Path (Marine Drive)", distance: "2.1 km", time: "5 mins drive" }
  ];

  // Map embed query with iwloc=B to guarantee pointer visibility on Google Maps
  const mapEmbedUrl = "https://maps.google.com/maps?q=Sheesh+Mahal+Resort,+Opposite+Gate+of+St.+Xavier's+College,+Ashiana-Digha+Road,+Mica+Colony,+Patna,+Bihar+800011&t=&z=17&ie=UTF8&iwloc=B&output=embed";

  return (
    <section
      id="map-location"
      className="py-16 sm:py-20 lg:py-28 bg-[#F5F5F5] text-[#303841] border-t border-[#76ABAE]/20 overflow-hidden relative"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        <RevealUp>
          {/* Section Header with alternating 24h Circle Badge on the RIGHT side */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#76ABAE]/20">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="label-utility text-[#303841]/70">
                  MAP & CONNECTIVITY
                </span>
                <span className="w-10 h-[1px] bg-[#76ABAE]"></span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#303841]">
                HOW TO REACH
              </h2>
              <p className="font-cursive text-2xl sm:text-3xl text-[#76ABAE] mt-2 font-normal">
                Conveniently Situated on Ashiana–Digha Road
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={RESORT_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 clay-btn-orange text-xs font-black tracking-widest uppercase cursor-pointer whitespace-nowrap"
              >
                <NavIcon size={14} />
                <span>GET DIRECTIONS</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </RevealUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Iframe with styled container, visible pointer pin, and overlapping badge */}
          <div className="lg:col-span-8 relative">
            <div className="rounded-[20px] sm:rounded-[24px] overflow-hidden border border-[#76ABAE]/30 shadow-xl bg-[#303841] min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] relative h-full">
              <iframe
                title="Sheesh Mahal Resort Location Map"
                src={mapEmbedUrl}
                className="w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Prominent High-Visibility Pointer Pin Overlay centered directly on Sheesh Mahal Resort */}
              <a
                href={RESORT_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open live location pointer in Google Maps"
                className="absolute top-[28%] sm:top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group flex flex-col items-center pointer-events-auto transition-transform hover:scale-110 active:scale-95"
                title="Click to open live pointer in Google Maps"
              >
                <div className="relative flex items-center justify-center">
                  {/* Outer pulsating radar rings */}
                  <span className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#E53E3E]/40 animate-ping"></span>
                  <span className="absolute w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#FF5722]/50 animate-pulse"></span>
                  {/* High contrast Pointer Pin Badge */}
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#303841] border-2 border-[#FF5722] text-[#FF5722] flex items-center justify-center shadow-2xl group-hover:bg-[#E53E3E] group-hover:border-[#F5F5F5] group-hover:text-white transition-all">
                    <MapPin size={20} className="fill-[#FF5722] group-hover:fill-white text-transparent transition-colors sm:w-[22px] sm:h-[22px]" />
                  </div>
                </div>

                {/* Pointer Label Pill */}
                <div className="mt-1.5 sm:mt-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#303841]/95 border border-[#FF5722]/80 text-[#F5F5F5] text-[10px] sm:text-[11px] font-black uppercase tracking-wider shadow-2xl flex items-center gap-1.5 whitespace-nowrap backdrop-blur-md group-hover:bg-[#E53E3E] transition-colors">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#FF5722] animate-pulse"></span>
                  <span>Sheesh Mahal Resort</span>
                  <ExternalLink size={10} className="text-[#FF5722] group-hover:text-white sm:w-[11px] sm:h-[11px]" />
                </div>
                <span className="text-[8px] sm:text-[9px] font-bold text-white/90 bg-[#303841]/80 px-2 py-0.5 rounded-full mt-1 border border-white/20 backdrop-blur-sm shadow-xs">
                  Tap to Navigate in Google Maps
                </span>
              </a>

              {/* Floating location details card positioned neatly at bottom without obscuring the pointer */}
              <div className="absolute bottom-2 left-2 right-2 sm:right-auto sm:bottom-4 sm:left-4 sm:max-w-sm bg-[#F5F5F5]/95 backdrop-blur-md p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-[#76ABAE]/30 shadow-2xl z-20">
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#FF5722] text-[#303841] shrink-0 mt-0.5">
                    <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-black uppercase tracking-tight text-[#303841]">
                      SHEESH MAHAL RESORT
                    </h4>
                    <p className="text-[10px] sm:text-xs text-[#303841]/80 leading-snug font-medium mt-0.5">
                      Opposite Gate of St. Xavier's College, near Bharat Petrol Pump, Ashiana-Digha Road, Patna 800011
                    </p>
                    <div className="flex items-center gap-2 mt-1.5 sm:mt-2 pt-1.5 sm:pt-2 border-t border-[#76ABAE]/20 text-[8.5px] sm:text-[10px] font-black uppercase tracking-wider text-[#76ABAE]">
                      <span className="flex items-center gap-1 text-[#303841]">
                        <Clock size={10} className="text-[#76ABAE] sm:w-[11px] sm:h-[11px]" />
                        <span>Open 24 Hours</span>
                      </span>
                      <span>·</span>
                      <span>On-Site Valet</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          {/* Alternating Badge 5: Anchored to the top-right corner of the Map frame box */}
          <div className="absolute -top-7 right-2 sm:-top-16 sm:-right-5 md:-right-6 lg:-right-8 z-30 pointer-events-auto">
            <WeddingDeskCircleBadge
              id="badge-section-5"
              badgeNumber="04"
              title="PATNA RESORT"
              subtitle="Opp. St. Xavier's"
              statusText="ASHIANA-DIGHA"
              onClick={onOpenInquiry || (() => window.open(RESORT_CONTACT.googleMapsUrl, '_blank'))}
              bounceDelay="3.2s"
            />
          </div>
        </div>

        {/* Right Column: Transit Times & Landmarks */}
        <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div className="p-6 lg:p-8 clay-card h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#76ABAE] block mb-2">
                  KEY TRANSIT LANDMARKS
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#303841] mb-4">
                  PROXIMITY & ACCESS
                </h3>
                <p className="text-xs text-[#303841]/75 leading-relaxed font-normal mb-6">
                  Strategically situated on the Ashiana–Digha arterial corridor, ensuring swift arrival for Baraat processions, VIP guests, and outstation family members.
                </p>

                <div className="space-y-3.5">
                  {landmarks.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#F5F5F5] rounded-xl border border-[#76ABAE]/20 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#303841]">{item.name}</p>
                        <p className="text-[10px] text-[#303841]/60 font-semibold tracking-wider mt-0.5">{item.distance}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#FF5722] text-[#303841] px-2.5 py-1 rounded-md shrink-0">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#76ABAE]/20 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#303841]/70">
                  Easy Bus & Auto Transit
                </span>
                <a
                  href={`tel:${RESORT_CONTACT.primaryPhone}`}
                  className="text-xs font-black uppercase tracking-wider text-[#76ABAE] hover:underline"
                >
                  Call for Guidance →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
