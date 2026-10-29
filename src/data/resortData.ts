export interface VenueSpace {
  id: string;
  category: string;
  title: string;
  tags: string[];
  image: string;
  alt: string;
  capacity: string;
  area: string;
  idealFor: string;
  priceNote: string;
  headline: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
  itinerary: {
    step: string;
    title: string;
    details: string;
  }[];
}

export interface ResortService {
  number: string;
  title: string;
  icon: string;
  description: string;
  capabilities: string[];
}

export const RESORT_CONTACT = {
  name: "Sheesh Mahal Resort",
  subtitle: "Patna's Premier Royal Wedding Resort & Banquets",
  address: "Opposite Gate of St. Xavier's College, near Bharat Petrol Pump, Mica Colony, Yadav Colony, Digha, Patna, Bihar 800011",
  landmark: "Opposite St. Xavier's College Gate, Ashiana–Digha Road",
  primaryPhone: "+91 73608 00001",
  rawPhone: "7360800001",
  secondaryPhone: "+91 73608 00001",
  whatsappNumber: "917360800001",
  hours: "Open 24 Hours for Wedding Consultations",
  googleMapsUrl: "https://maps.app.goo.gl/4cLP3LqdCvT1H9qT6",
  instagramUrl: "https://www.instagram.com/sheeshmahalresort/",
  facebookUrl: "https://www.facebook.com/61591536904994/"
};

export const RESORT_SERVICES: ResortService[] = [
  {
    number: "01",
    title: "ROYAL WEDDING SANCTUARY",
    icon: "Crown",
    description: "Patna's dedicated destination for eternal vows, royal Baraat arrivals, Vedic Saat Phere, and majestic wedding celebrations.",
    capabilities: [
      "Traditional Shehnai Welcome & Grand Dhol Tasha Procession",
      "Consecrated Vedic Mandap with Holy Havankund Setup",
      "Grand Revolving Varmala Stage with Cold-Pyro Sparklers",
      "Regal Sheesh Mahal Glass Runway for Royal Baraat Entry"
    ]
  },
  {
    number: "02",
    title: "SHAHI CATERING & BANQUETS",
    icon: "UtensilsCrossed",
    description: "Master chefs crafting regal Awadhi, Mughlai, Maithil, Bhojpuri, Punjabi, and Continental wedding banquets.",
    capabilities: [
      "Dedicated Satvik & Pure Vegetarian Kitchen Available",
      "Authentic Bihari Delicacies: Litti Chokha & Champaran Ahuna",
      "Live Halwai Counter: Hot Jalebi, Imarti, Rabdi & Malpua",
      "Artisanal Wedding Sweet Counters & Welcome Thandai Bar"
    ]
  },
  {
    number: "03",
    title: "END-TO-END WEDDING DESK",
    icon: "Sparkles",
    description: "Complete concierge support for dates blocking, guest logistics, valet parking, bridal suites, and sound setup.",
    capabilities: [
      "100% Uninterrupted Power Backup with Dual Heavy Generators",
      "Complimentary Palatial AC Bridal & Groom Green Rooms",
      "Valet Parking for 100+ Cars opposite St. Xavier's College",
      "Dedicated On-Ground Wedding Coordinator Available 24/7"
    ]
  }
];

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: "sheesh-banquet",
    category: "INDOOR PALACE BALLROOM",
    title: "Grand Sheesh Ballroom",
    tags: ["ROYAL VARMALA", "AC BALLROOM", "CRYSTAL CHANDELIERS", "1500 GUESTS"],
    image: "/images/gallery/smr-28.webp",
    alt: "Grand Sheesh Banquet Hall with cascading white wisteria floral ceiling, crystal chandeliers, golden arcades and royal Varmala stage",
    capacity: "800 - 1500 Guests",
    area: "14,000 Sq. Ft.",
    idealFor: "Royal Varmala, Grand Reception & Shahi Wedding Feasts",
    priceNote: "Custom All-Inclusive Wedding Package Available",
    headline: "Opulent Pillarless Air-Conditioned Glass Palace for Patna's Most Distinguished Marriages",
    description: "The Grand Sheesh Ballroom is the crowning jewel of wedding celebrations in Patna. Featuring soaring arched ceilings adorned with cascading white floral wisteria, imported crystal chandeliers, and ambient warm golden illumination. Designed exclusively for royal Varmala ceremonies with a dedicated hydraulic revolving stage, majestic royal sofas, and acoustics calibrated for live Shehnai and brass bands.",
    features: [
      "Pillarless ballroom with unobstructed 360-degree view for all guests",
      "Hydraulic revolving Varmala stage with cold-pyrotechnics sparkle safety systems",
      "Climate-controlled central air-conditioning with multi-tier air filtration",
      "Adjoining palatial bridal suite with dedicated salon mirrors and en-suite rest rooms"
    ],
    specs: [
      { label: "CAPACITY", value: "800 - 1500 Guests" },
      { label: "CEILING HEIGHT", value: "22 Ft. Grand Arches" },
      { label: "AIR CONDITIONING", value: "Centralized Multi-Zone" },
      { label: "STAGE SIZE", value: "48 ft × 24 ft Royal Stage" }
    ],
    itinerary: [
      { step: "Morning 09:00", title: "Floral & Stage Personalization", details: "Florists install fresh white wisteria, red roses, and crystal accents tailored to your family's theme." },
      { step: "Evening 18:30", title: "Royal Guest Reception", details: "Welcome Shehnai players and rosewater sprinkle as guests enter through illuminated golden arches." },
      { step: "Night 21:00", title: "Grand Varmala Ceremony", details: "Bride and Groom exchange garlands on the elevated rotating stage amidst cascading dry-ice fog and sparklers." }
    ]
  },
  {
    id: "starlit-lawn",
    category: "OUTDOOR ROYAL LAWN",
    title: "Starlit Baraat Lawn & Glass Runway",
    tags: ["GRAND BARAAT", "ILLUMINATED RUNWAY", "FIREWORKS", "2000 GUESTS"],
    image: "/images/gallery/smr-14.webp",
    alt: "Grand illuminated wedding entry runway with cold-pyro sparklers and floral arch for royal Baraat and bridal walk",
    capacity: "1000 - 2000 Guests",
    area: "22,000 Sq. Ft.",
    idealFor: "Royal Baraat Arrival, Ghodi Entry & Open-Air Wedding Banquets",
    priceNote: "Customized for Combined Lawn + Ballroom Bookings",
    headline: "Patna's Grandest Open-Air Lawn with an Illuminated Glass Runway for Royal Baraats",
    description: "Celebrate grand Baraat processions under the open Patna sky. Our manicured lush green lawn features a permanent illuminated glass runway engineered for the Groom's royal vintage car or adorned Mare (Ghodi) arrival. Framed by majestic golden entry arches, towering palm trees with fairy-light wraps, and ample space for grand fireworks, live Dhol Tasha, and extensive outdoor live buffet counters.",
    features: [
      "Raised 120-foot glass runway with under-floor LED matrix for bridal entry walks",
      "Dedicated wide corridor for Baraat dancing with high-output sound setup",
      "Wide open lawn accommodating up to 2000 guests comfortably without crowding",
      "Seamless covered transition connecting the lawn directly into the Grand Sheesh Ballroom"
    ],
    specs: [
      { label: "CAPACITY", value: "1000 - 2000 Guests" },
      { label: "RUNWAY LENGTH", value: "120 Feet Illuminated" },
      { label: "POWER", value: "100% Dual Generator Backup" },
      { label: "BUFFET CAPACITY", value: "32+ Live Food Stalls" }
    ],
    itinerary: [
      { step: "Evening 19:00", title: "Grand Baraat Assembly", details: "Groom's Baraat convenes at the grand outer entrance opposite St. Xavier's College with live Dhol beats." },
      { step: "Evening 20:15", title: "Toran & Milni Ceremony", details: "Both families exchange garlands and warm hugs along the decorated floral welcome passage." },
      { step: "Night 21:45", title: "Open-Air Shahi Wedding Feast", details: "Guests enjoy live barbecue, kebabs, tandoor breads, chaat counters, and winter delicacies under the stars." }
    ]
  },
  {
    id: "vedic-mandap",
    category: "SACRED WEDDING PAVILION",
    title: "Royal Vedic Mandap Courtyard",
    tags: ["SAAT PHERE", "HAVANKUND", "VEDIC CHANTING", "SACRED RITUALS"],
    image: "/images/gallery/smr-46.webp",
    alt: "Vibrant royal courtyard with emerald velvet sofas, circular red rose arches and Moroccan carpets for Mehndi and Sangeet",
    capacity: "300 - 600 Seated Guests",
    area: "6,500 Sq. Ft.",
    idealFor: "Sacred Saat Phere, Kanyadaan, Sindoor Daan & Vivah Sanskar",
    priceNote: "Included with Full-Day Royal Wedding Package",
    headline: "Consecrated Traditional Mandap Designed with Vastu Alignment for Auspicious Vivah Sanskar",
    description: "Designed in accordance with ancient Vedic traditions, the Royal Mandap Pavilion is positioned on the auspicious North-East axis. Featuring carved wooden and brass pillars wrapped in fresh fragrant marigold and jasmine garlands, a dedicated brass Havankund with smoke-exhaust ventilation, and tiered amphitheater-style seating ensuring parents and elders witness every sacred vow of the Saat Phere in total comfort.",
    features: [
      "Vedic Vastu-compliant square Mandap layout with traditional four-pillar architecture",
      "Integrated Havankund smoke-evacuation system keeping the pavilion serene and fresh",
      "Special comfortable Diwan seating and Velvet Gaddi arrangements for close family members",
      "Dedicated audio setup for crystal-clear Sanskrit Shloka recitation by revered Pandits"
    ],
    specs: [
      { label: "SEATING", value: "300 - 600 Seated Guests" },
      { label: "ORIENTATION", value: "Vedic North-East Vastu" },
      { label: "HAVAN VENTILATION", value: "Integrated Smoke Exhaust" },
      { label: "SOUND SETUP", value: "Wireless Microphones & Sangeet Audio" }
    ],
    itinerary: [
      { step: "Afternoon 13:00", title: "Bridal Henna & Folk Sangeet", details: "Master Mehndi artists apply bridal henna while ladies sing traditional wedding songs on velvet baithaks." },
      { step: "Evening 17:30", title: "Chaat & Mocktail Sundowner", details: "Interactive Pani Puri, Dahi Bhalla, and artisanal mocktails served under twilight festoon lights." },
      { step: "Night 19:30", title: "High-Energy Family Sangeet Dance", details: "Choreographed family dance performances, DJ musical battles, and late-night celebratory banquet." }
    ]
  },
  {
    id: "haldi-courtyard",
    category: "DAYLIGHT FESTIVE GARDEN",
    title: "Haldi & Sangeet Utsav Garden",
    tags: ["HALDI CEREMONY", "FLOWER SHOWER", "SANGEET DANCE", "MEHNDI"],
    image: "/images/gallery/smr-48.webp",
    alt: "Sunlit celebration garden with cascading yellow marigold circular arch and brass lotus Urli for Haldi flower bath",
    capacity: "250 - 500 Guests",
    area: "8,000 Sq. Ft.",
    idealFor: "Haldi Flower Showers, Colorful Mehndi Baithak & Sangeet Soirées",
    priceNote: "Available for Day Booking or Pre-Wedding Celebrations",
    headline: "Sunlit Courtyard with Festive Yellow Drapes and Brass Urli for Joyous Haldi Ceremonies",
    description: "A cheerful, sun-drenched courtyard bathed in bright yellow and orange marigold canopies, Rajasthani umbrellas, and carved wooden jhoolas (swings). The centerpiece is a handcrafted brass lotus Urli for the bride and groom's ceremonial turmeric bath and rose petal shower, accompanied by energetic folk singing and dholak rhythms.",
    features: [
      "Centerpiece royal brass Urli for authentic Haldi and Phoolon Ki Holi rituals",
      "Vibrant yellow and orange festive silk canopies with floral tassels",
      "Dedicated live Chaat and Thandai refreshment stalls for daytime celebrations",
      "Weather-safe covered cabanas ensuring celebrations continue smoothly in all seasons"
    ],
    specs: [
      { label: "CAPACITY", value: "250 - 500 Guests" },
      { label: "SETUP STYLE", value: "Traditional Baithak & Cabanas" },
      { label: "HALDI URLI", value: "Handcrafted Pure Brass Lotus" },
      { label: "DJ & SOUND", value: "Full Acoustic License for Sangeet" }
    ],
    itinerary: [
      { step: "Morning 10:30", title: "Haldi Ubtan & Flower Shower", details: "Family members apply sacred turmeric paste to bride & groom followed by a joyful 100 kg rose-petal shower." },
      { step: "Afternoon 12:30", title: "Traditional Halwai Lunch Feast", details: "Fresh steaming puris, kachoris, chole, paneer, and hot jalebis served straight from the live kadhais." },
      { step: "Afternoon 15:00", title: "Sangeet Rehearsals & Photography", details: "Candid daylight photo sessions with family against yellow marigold arches and floral swings." }
    ]
  }
];

export const RESORT_HERO_IMAGE = "/images/gallery/smr-02.webp";
