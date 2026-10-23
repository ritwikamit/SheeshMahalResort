import React, { useState } from 'react';
import { LuxuryVisual } from '../components/LuxuryVisual.tsx';
import { RevealUp } from '../components/RevealUp.tsx';

interface GalleryPageProps {
  onOpenInquiry: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ onOpenInquiry }) => {
  const [filter, setFilter] = useState('ALL');

  const galleryItems = [
    {
      title: "The Royal Sheesh Ballroom",
      category: "BANQUET",
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1200&q=85",
      caption: "Crystal Chandeliers & Varmala Dais"
    },
    {
      title: "Shahi Utsav Evening Lawn",
      category: "LAWN",
      image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=1200&q=85",
      caption: "Starlit Fairy Light Canopies"
    },
    {
      title: "Vedic Mandap Pavilion",
      category: "MANDAP",
      image: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85",
      caption: "Fresh Floral Drapery & Sacred Havan"
    },
    {
      title: "Poolside Haldi & Mehndi Cabanas",
      category: "HALDI",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
      caption: "Festive Daytime Floral Swings"
    },
    {
      title: "Grand Resort Facade at Twilight",
      category: "RESORT",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=85",
      caption: "Illuminated Palace Entrance & Palms"
    },
    {
      title: "Shahi Awadhi Live Banquet Buffet",
      category: "CATERING",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=85",
      caption: "Artisanal Royal Wedding Feasts"
    }
  ];

  const categories = ['ALL', 'BANQUET', 'LAWN', 'MANDAP', 'HALDI', 'CATERING'];

  const filteredItems = galleryItems.filter((item) => {
    if (filter === 'ALL') return true;
    return item.category === filter;
  });

  return (
    <div className="pt-[90px] sm:pt-[100px] pb-20 sm:pb-24 bg-[#FAFDFB] text-[#161726]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="py-8 sm:py-12 border-b border-[#9FA1FF]/20 mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="label-utility text-[#161726]/70">
              VISUAL CHRONICLES OF WEDDING GRANDEUR
            </span>
            <h1 className="text-3xl sm:text-6xl font-black tracking-tighter uppercase leading-[0.85] text-[#161726] mt-2">
              PHOTO GALLERY
            </h1>
            <p className="font-cursive text-2xl sm:text-4xl text-[#9FA1FF] mt-2 font-normal">
              A Glimpse into Royal Moments & Sacred Vows
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  filter === cat
                    ? 'bg-[#161726] text-[#FAEE2F]'
                    : 'bg-[#D9F9DF] text-[#161726]/70 hover:text-[#161726]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {filteredItems.map((item, idx) => (
            <RevealUp key={idx} delay={idx * 80}>
              <div className="group rounded-[20px] overflow-hidden bg-[#161726] border border-[#9FA1FF]/25 shadow-lg relative">
                <LuxuryVisual
                  src={item.image}
                  alt={item.title}
                  aspectRatioClass="aspect-[4/3]"
                  title={item.title}
                  category={item.category}
                />
                <div className="p-5 bg-[#FAFDFB] border-t border-[#9FA1FF]/20">
                  <span className="text-[9px] font-black tracking-widest uppercase text-[#9FA1FF] block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#161726]">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#161726]/70 mt-1 font-medium">
                    {item.caption}
                  </p>
                </div>
              </div>
            </RevealUp>
          ))}
        </div>
      </div>
    </div>
  );
};
