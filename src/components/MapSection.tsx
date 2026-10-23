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

  // Map embed query centered precisely on St. Xavier's College Digha Ashiana Road Patna
  const mapEmbedUrl = "https://maps.google.com/maps?q=St.+Xavier's+College,+Digha+Ghat,+Patna,+Bihar+800011&t=&z=16&ie=UTF8&iwloc=&output=embed";

  return (
    <section
      id="map-location"
      className="py-16 sm:py-20 lg:py-28 bg-[#FAFDFB] text-[#161726] border-t border-[#9FA1FF]/20 overflow-hidden relative"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12 relative">
        <RevealUp>
          {/* Section Header with alternating 24h Circle Badge on the RIGHT side */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#9FA1FF]/20">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="label-utility text-[#161726]/70">
                  MAP & CONNECTIVITY
                </span>
                <span className="w-10 h-[1px] bg-[#9FA1FF]"></span>
              </div>
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726]">
                HOW TO REACH
              </h2>
              <p className="font-cursive text-2xl sm:text-3xl text-[#9FA1FF] mt-2 font-normal">
                Conveniently Situated on Ashiana–Digha Road
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={RESORT_CONTACT.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black tracking-widest uppercase bg-[#FAEE2F] text-[#161726] hover:bg-[#161726] hover:text-[#FAFDFB] transition-colors shadow-sm cursor-pointer whitespace-nowrap"
              >
                <NavIcon size={14} />
                <span>GET DIRECTIONS</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </RevealUp>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive Map Iframe with styled container and overlapping badge */}
          <div className="lg:col-span-8 relative">
            <div className="rounded-[24px] overflow-hidden border border-[#9FA1FF]/30 shadow-xl bg-[#161726] min-h-[420px] lg:min-h-[500px] relative h-full">
              <iframe
                title="Sheesh Mahal Resort Location Map"
                src={mapEmbedUrl}
                className="w-full h-full min-h-[420px] lg:min-h-[500px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>

              {/* Floating location card over map */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto sm:max-w-md bg-[#FAFDFB]/95 backdrop-blur-md p-5 rounded-2xl border border-[#9FA1FF]/30 shadow-2xl">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-[#FAEE2F] text-[#161726] shrink-0 mt-0.5">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-tight text-[#161726]">
                    SHEESH MAHAL RESORT
                  </h4>
                  <p className="text-xs text-[#161726]/80 leading-relaxed font-medium mt-0.5">
                    Opposite Gate of St. Xavier's College, near Bharat Petrol Pump, Mica Colony, Digha, Patna, Bihar 800011
                  </p>
                  <div className="flex items-center gap-4 mt-3 pt-2 border-t border-[#9FA1FF]/20 text-[10px] font-black uppercase tracking-wider text-[#9FA1FF]">
                    <span className="flex items-center gap-1 text-[#161726]">
                      <Clock size={12} className="text-[#9FA1FF]" />
                      <span>Open 24 Hours</span>
                    </span>
                    <span>·</span>
                    <span>On-Site Valet Parking</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Alternating Badge 5: Anchored to the top-right corner of the Map frame box */}
          <div className="absolute -top-12 right-2 sm:-top-18 sm:-right-5 md:-right-6 lg:-right-8 z-30 pointer-events-auto">
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
            <div className="p-6 lg:p-8 bg-[#D9F9DF]/50 rounded-[24px] border border-[#9FA1FF]/25 shadow-sm h-full flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#9FA1FF] block mb-2">
                  KEY TRANSIT LANDMARKS
                </span>
                <h3 className="text-xl font-black uppercase tracking-tight text-[#161726] mb-4">
                  PROXIMITY & ACCESS
                </h3>
                <p className="text-xs text-[#161726]/75 leading-relaxed font-normal mb-6">
                  Strategically situated on the Ashiana–Digha arterial corridor, ensuring swift arrival for Baraat processions, VIP guests, and outstation family members.
                </p>

                <div className="space-y-3.5">
                  {landmarks.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 bg-[#FAFDFB] rounded-xl border border-[#9FA1FF]/20 flex items-center justify-between"
                    >
                      <div>
                        <p className="text-xs font-bold text-[#161726]">{item.name}</p>
                        <p className="text-[10px] text-[#161726]/60 font-semibold tracking-wider mt-0.5">{item.distance}</p>
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-wider bg-[#FAEE2F] text-[#161726] px-2.5 py-1 rounded-md shrink-0">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-[#9FA1FF]/20 mt-6 flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#161726]/70">
                  Easy Bus & Auto Transit
                </span>
                <a
                  href={`tel:${RESORT_CONTACT.primaryPhone}`}
                  className="text-xs font-black uppercase tracking-wider text-[#9FA1FF] hover:underline"
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
