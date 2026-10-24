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
  primaryPhone: "+91 76319 29292",
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
    title: "SHAHI WEDDING CATERING",
    icon: "utensils",
    description: "Royal culinary feasts crafted for Indian weddings. Awadhi Dum Biryanis, rich Mughlai gravies, traditional Bihari Shahi delicacies, and lavish live Chaat & dessert streets.",
    capabilities: [
      "Royal Awadhi, Mughlai & traditional Bihari wedding banquets",
      "Interactive live Chaat, Golgappa, Dosa & Tandoori bread stations",
      "Artisanal Mithai & hot live Rabri-Jalebi counters",
      "Dedicated pure vegetarian & gourmet Halal kitchens"
    ]
  },
  {
    number: "02",
    title: "THEMATIC WEDDING DECOR & MANDAPS",
    icon: "palette",
    description: "Breath-taking wedding architecture: mirror-work Sheesh chandeliers, royal floral entry corridors, custom Varmala stage thrones, and sacred Vedic Vedic Mandap pavilions.",
    capabilities: [
      "Signature Sheesh glass and crystal mirror-work stages",
      "Fresh imported roses, orchids & marigold floral installations",
      "Cinematic Varmala smoke, cold-pyro & hydraulic stages",
      "Vibrant yellow Haldi themes & pastel floral swings"
    ]
  },
  {
    number: "03",
    title: "BARAAT VALET & BRIDAL SUITES",
    icon: "shield",
    description: "Flawless wedding logistics: grand entry corridor for royal Baraats with dhol, 100% heavy-duty generator power backup, ample guest valet parking, and luxury AC bridal suites.",
    capabilities: [
      "Dedicated grand avenue for Baraat processions & Dhol welcoming",
      "100% continuous heavy-duty generator backup for wedding sound & lights",
      "Air-conditioned luxury bridal & groom dressing suites",
      "Ample on-site secure parking with courteous valet attendants"
    ]
  }
];

export const VENUE_SPACES: VenueSpace[] = [
  {
    id: "space-grand-hall",
    category: "ROYAL INDOOR BALLROOM",
    title: "THE SHEESH BANQUET",
    tags: ["GRAND VARMALA", "FLORAL CANOPY", "CRYSTAL CHANDELIERS", "500-1200 GUESTS"],
    image: "/images/gallery/smr-28.jpg",
    alt: "Grand Sheesh Banquet Hall with cascading white wisteria floral ceiling, crystal chandeliers, golden arcades and royal Varmala stage",
    capacity: "500 to 1,200 Guests",
    area: "12,000 Sq. Ft. Indoor AC",
    idealFor: "Grand Varmala Ceremony, Royal Receptions & Mega Sangeet",
    priceNote: "Custom Wedding Packages on Request",
    headline: "Palatial Air-Conditioned Ballroom with Hanging Wisteria & Golden Dais",
    description: "The crown jewel indoor ballroom of Sheesh Mahal Resort, adorned with a magnificent cascading white wisteria floral ceiling, sparkling crystal chandeliers, and a gilded royal stage backdrop for an unforgettable Varmala garland exchange.",
    features: [
      "High-tonnage central air-conditioning with multi-zone climate control",
      "Cascading white wisteria floral ceiling with hanging crystal chandeliers",
      "Elevated 40ft pillarless royal stage for cinematic wedding photography",
      "Attached VIP bridal suite with full-length mirror vanity salon"
    ],
    specs: [
      { label: "WEDDING CAPACITY", value: "500 - 1,200 Guests" },
      { label: "CLIMATE CONTROL", value: "High-Capacity Central AC" },
      { label: "STAGE SYSTEM", value: "40ft x 20ft Gilded Floral Dais" },
      { label: "ACOUSTICS", value: "JBL Pro Audio for Shehnai & Sangeet" }
    ],
    itinerary: [
      { step: "Morning 09:00", title: "Wedding Stage & Floral Adornment", details: "Decorators finalize custom floral arches, royal throne baithaks, and ambient crystal chandeliers." },
      { step: "Evening 18:30", title: "Grand Baraat Reception & Milni Rites", details: "Traditional Dhol greetings, rose petal showers, and royal mocktails as families exchange Milni garlands." },
      { step: "Night 20:30", title: "Cinematic Varmala with Rose Showers", details: "The bride and groom exchange wedding garlands under the illuminated floral canopy, followed by a royal feast." }
    ]
  },
  {
    id: "space-baraat-walkway",
    category: "ROYAL BARAAT & ENTRY RUNWAY",
    title: "ILLUMINATED BARAAT RUNWAY",
    tags: ["GLASS RUNWAY", "BRIDAL PROCESSION", "COLD PYROS", "VIP GALLERIES"],
    image: "/images/gallery/smr-14.jpg",
    alt: "Grand illuminated wedding entry runway with cold-pyro sparklers and floral arch for royal Baraat and bridal walk",
    capacity: "Up to 1,500 Spectators",
    area: "120-Foot Raised Reflective Runway",
    idealFor: "Regal Groom Baraat Entry, Phoolon Ki Chaadar Bridal Walk & Grand Milni",
    priceNote: "Signature Architectural Feature",
    headline: "Elevated Golden-Lit Glass Runway Flanked by Floral Pedestals for Grand Entries",
    description: "A monumental 120-foot raised glass runway engineered with internal amber underlighting and continuous fresh rose flower pedestals. Gives both families unobstructed elevated vantage points for the groom’s royal Baraat arrival and the bride’s emotional walk under the Phoolon Ki Chaadar.",
    features: [
      "Reinforced mirror-finish tempered glass walkway with safety grip coating",
      "Internal warm-gold LED ribbon glow synchronized with royal entry music",
      "Continuous fresh red and pastel rose flower pedestals along the entire aisle",
      "Flanking gallery seating for elderly relatives and VIP wedding guests"
    ],
    specs: [
      { label: "RUNWAY LENGTH", value: "120 Feet Raised Glass Aisle" },
      { label: "UNDERLIGHTING", value: "Concealed DMX Amber Glow" },
      { label: "ENTRY CAPACITY", value: "Up to 1,500 Spectators" },
      { label: "AISLE WIDTH", value: "12 Feet Wide Processional Corridor" }
    ],
    itinerary: [
      { step: "Evening 18:30", title: "Groom Royal Baraat Arrival", details: "The groom arrives with Dhol beats along the illuminated glass runway greeted by rose petal showers." },
      { step: "Night 20:00", title: "Bridal Entry under Phoolon Ki Chaadar", details: "The bride makes her grand entrance along the glowing glass aisle surrounded by brothers and cousins." },
      { step: "Night 20:30", title: "Varmala Aisle Walk to Main Stage", details: "Both families line the glass runway to shower the couple with flowers as they ascend to the dais." }
    ]
  },
  {
    id: "space-courtyard-sangeet",
    category: "PRE-WEDDING & SANGEET LOUNGE",
    title: "MEHNDI & SANGEET COURTYARD",
    tags: ["MEHNDI LOUNGE", "EMERALD SOFAS", "ROSE ARCH", "250-600 GUESTS"],
    image: "/images/gallery/smr-46.jpg",
    alt: "Vibrant royal courtyard with emerald velvet sofas, circular red rose arches and Moroccan carpets for Mehndi and Sangeet",
    capacity: "250 to 600 Guests",
    area: "8,500 Sq. Ft. Courtyard",
    idealFor: "Mehndi Carnivals, High-Energy Sangeet Nights & Pre-Wedding Cocktails",
    priceNote: "Custom Pre-Wedding Packages",
    headline: "Emerald Velvet Lounges, Circular Rose Arches & Moroccan Carpets",
    description: "An intimate, vibrantly styled courtyard featuring luxurious emerald velvet diwans, circular rose floral arches, and festive ambient festoon lights. Created for joyful pre-wedding celebrations where ladies sing traditional wedding folk songs, mehndi artists create intricate henna designs, and cousins dance the night away.",
    features: [
      "Opulent emerald velvet seating arrangements and low Moroccan baithaks",
      "Multiple dedicated Instagram photo backdrops with circular floral arches",
      "Private Mehndi artist stations with specialized soft illumination",
      "Integrated DJ dance floor with warm twilight festoon canopy"
    ],
    specs: [
      { label: "GUEST CAPACITY", value: "250 - 600 Guests" },
      { label: "ATMOSPHERE", value: "Royal Bohemian Velvet & Florals" },
      { label: "PHOTO CORNERS", value: "8 Custom Bridal Photo Backdrops" },
      { label: "SOUND SETUP", value: "Wireless Microphones & Sangeet Audio" }
    ],
    itinerary: [
      { step: "Afternoon 13:00", title: "Bridal Henna & Folk Sangeet", details: "Master Mehndi artists apply bridal henna while ladies sing traditional wedding songs on velvet baithaks." },
      { step: "Evening 17:30", title: "Chaat & Mocktail Sundowner", details: "Interactive Pani Puri, Dahi Bhalla, and artisanal mocktails served under twilight festoon lights." },
      { step: "Night 19:30", title: "High-Energy Family Sangeet Dance", details: "Choreographed family dance performances, DJ musical battles, and late-night celebratory banquet." }
    ]
  },
  {
    id: "space-haldi-garden",
    category: "SUNLIT CELEBRATION GARDEN",
    title: "SUNLIT HALDI GARDEN",
    tags: ["MARIGOLD ARCH", "BRASS URLI BATH", "SUNLIT LAWN", "FLOWER SHOWER"],
    image: "/images/gallery/smr-48.jpg",
    alt: "Sunlit celebration garden with cascading yellow marigold circular arch and brass lotus Urli for Haldi flower bath",
    capacity: "150 to 450 Guests",
    area: "6,000 Sq. Ft. Open-Sky Garden",
    idealFor: "Morning Haldi Flower Showers, Chuda Ceremony & Daytime Carnivals",
    priceNote: "Custom Daytime Ceremony Packages",
    headline: "Sunlit Morning Garden with Marigold Cascades and Brass Lotus Urli",
    description: "A sun-drenched outdoor garden drenched in auspicious golden marigolds, yellow drapes, and traditional brass lotus Urli vessels. Perfect for lively morning Haldi ceremonies, fragrant rose water and flower petal showers, and daytime culinary spreads.",
    features: [
      "Traditional handcrafted brass lotus Urli throne for the Haldi petal bath",
      "Auspicious yellow and orange marigold floral curtains and hanging umbrella motifs",
      "Open-air lawn layout ideal for daytime natural sunlight photography",
      "Dedicated live street chaat, tender coconut water, and sugarcane juice bars"
    ],
    specs: [
      { label: "CEREMONY CAPACITY", value: "150 - 450 Guests" },
      { label: "COLOR PALETTE", value: "Auspicious Marigold Yellow & Orange" },
      { label: "CEREMONIAL THRONE", value: "Handcrafted Brass Urli Setup" },
      { label: "REFRESHMENTS", value: "Fresh Fruit, Coconut & Chaat Counters" }
    ],
    itinerary: [
      { step: "Morning 09:30", title: "Auspicious Haldi Paste Application", details: "Close family members apply fresh organic turmeric paste to the couple amidst festive Dhol beats." },
      { step: "Morning 11:00", title: "Floral Rose Petal Shower & Urli Bath", details: "Thousands of fresh yellow and red rose petals showered upon the couple seated in the royal brass Urli." },
      { step: "Noon 12:30", title: "Daytime Carnival Lunch", details: "Traditional satvik Bihari and North Indian lunch feast with fresh Poori-Sabzi, Jalebi, and buttermilk." }
    ]
  }
];

export const RESORT_HERO_IMAGE = "/images/gallery/smr-02.png";
export const RESORT_HERO_ALT = "Sheesh Mahal Resort illuminated luxury facade with palm trees and evening wedding reflection pool";
