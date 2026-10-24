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
    title: "THE SHEESH BANQUET & PYRO STAGE",
    tags: ["GRAND VARMALA", "COLD PYRO STAGE", "CRYSTAL CHANDELIERS", "500-1200 GUESTS"],
    image: "/images/gallery/smr-07.jpg",
    alt: "Palatial wedding banquet hall with glittering crystal chandeliers, golden arcades and cold-pyro Varmala stage at Sheesh Mahal Resort",
    capacity: "500 to 1,200 Guests",
    area: "12,000 Sq. Ft. Indoor AC",
    idealFor: "Grand Varmala Ceremony, Royal Receptions & Mega Sangeet",
    priceNote: "Custom Wedding Packages on Request",
    headline: "Palatial Air-Conditioned Ballroom with Computerized Cold-Pyro Varmala Stage",
    description: "The crown jewel indoor ballroom of Sheesh Mahal Resort, engineered with 100% pillarless sightlines and soaring ceilings adorned with crystalline chandeliers. Features a custom 40-foot illuminated royal stage equipped with computerized cold-pyro sparklers and heavy fog generators for an unforgettable, cinematic garland exchange.",
    features: [
      "High-tonnage central air-conditioning with multi-zone digital climate control",
      "Integrated sparkular cold-pyro and heavy smoke cloud generators for Varmala",
      "Multi-tiered gold and crystal chandeliers with programmable ambient mood lighting",
      "Attached VIP bridal suite with full-length mirror vanity salon and private washroom"
    ],
    specs: [
      { label: "WEDDING CAPACITY", value: "500 - 1,200 Guests" },
      { label: "CLIMATE CONTROL", value: "High-Capacity Central AC" },
      { label: "STAGE SYSTEM", value: "40ft x 20ft Dais with Cold-Pyro Rig" },
      { label: "ACOUSTICS", value: "JBL Pro Audio for Shehnai & Sangeet" }
    ],
    itinerary: [
      { step: "Morning 09:00", title: "Wedding Stage & Floral Adornment", details: "Decorators finalize custom floral arches, royal throne baithaks, and ambient crystal chandeliers." },
      { step: "Evening 18:30", title: "Grand Baraat Reception & Milni Rites", details: "Traditional Dhol greetings, rose petal showers, and royal mocktails as families exchange Milni garlands." },
      { step: "Night 20:30", title: "Cinematic Varmala with Cold Pyros", details: "Cold-pyro fireworks reveal the bride and groom for the Varmala, followed by a lavish 60+ dish royal feast." }
    ]
  },
  {
    id: "space-shahi-lawn",
    category: "STARLIT WEDDING LAWN",
    title: "SHAHI UTSAV LAWN & FIREWORKS ARENA",
    tags: ["OPEN-SKY WEDDING", "AERIAL FIREWORKS", "2,500+ GUESTS", "BERMUDA TURF"],
    image: "/images/gallery/smr-30.jpg",
    alt: "Sprawling illuminated open-air royal wedding garden lawn with sky fireworks exploding over Sheesh Mahal Resort facade",
    capacity: "800 to 2,500+ Guests",
    area: "25,000 Sq. Ft. Landscaped",
    idealFor: "Mega Open-Sky Weddings, Grand Baraat Receptions & Sky Fireworks",
    priceNote: "Bespoke Royal Lawn Packages",
    headline: "Sprawling Starlit Greens Flanked by Palace Architecture and Sky Fireworks",
    description: "An expansive royal lawn flanked by stately palace pillars and canopied beneath open stars. Engineered for monumental wedding gatherings where thousands of guests celebrate with high-altitude aerial fireworks shows, multiple live culinary courts, and energetic family Baraat celebrations.",
    features: [
      "Precision-manicured Bermuda grass leveled for heavy bridal lehengas and heels",
      "Certified safe launch zone for high-altitude celebratory sky fireworks displays",
      "Segregated wide buffet avenues accommodating up to 8 live culinary courts",
      "Architectural facade illumination creating a cinematic palace backdrop"
    ],
    specs: [
      { label: "GUEST CAPACITY", value: "800 - 2,500+ Guests" },
      { label: "TURF SURFACE", value: "Leveled Manicured Bermudagrass" },
      { label: "FIREWORKS ZONE", value: "Approved Safe Sky Display Area" },
      { label: "BUFFET STATIONS", value: "8 Parallel Live Gourmet Courts" }
    ],
    itinerary: [
      { step: "Afternoon 16:00", title: "Lawn Lighting & Food Court Firing", details: "Fairy light canopies illuminated, warm landscape spots tested, and tandoors fired for the wedding feast." },
      { step: "Evening 19:00", title: "Live Shehnai & Welcome Drinks", details: "Classical Shehnai and Santoor players welcome arriving guests with fresh juices and appetizers." },
      { step: "Night 21:00", title: "Sky Fireworks & Open-Air Royal Feast", details: "Aerial fireworks burst above the resort facade while guests savor live Tandoor, Chaat, and Mithai." }
    ]
  },
  {
    id: "space-baraat-walkway",
    category: "ROYAL BARAAT & ENTRY RUNWAY",
    title: "THE ILLUMINATED GLASS BARAAT WALKWAY",
    tags: ["GLASS RUNWAY", "BRIDAL PROCESSION", "FLORAL UNDERGLOW", "VIP GALLERIES"],
    image: "/images/gallery/smr-27.jpg",
    alt: "Raised reflective glass runway with amber underglow, rose flower pedestals and VIP spectator galleries",
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
    id: "space-mandap-pavilion",
    category: "SACRED WEDDING RITES",
    title: "VEDIC MANDAP & SAAT PHERE SANCTUARY",
    tags: ["SAAT PHERE", "VEDIC HAVAN KUND", "ROSE CANOPY", "SACRED RITUALS"],
    image: "/images/gallery/smr-25.jpg",
    alt: "Sanctified royal wedding mandap with intricate rose garlands, carved pillars and dedicated Vedic havan altar",
    capacity: "Up to 350 Seated Family",
    area: "4,500 Sq. Ft. Sacred Pavilion",
    idealFor: "Sacred Saat Phere, Kanyadaan, Vedic Havan & Bidaai Rituals",
    priceNote: "Included in Royal Wedding Packages",
    headline: "Sanctified Ceremonial Mandap Crafted for Sacred Agni Vows and Vedic Blessings",
    description: "A consecrated, serene ceremonial pavilion designed specifically for Vedic wedding rites and the sacred Seven Vows. Engineered with specialized airflow ventilation for the holy Agni Havan and draped in cascading scented tuberoses, marigolds, and fresh red rose garlands.",
    features: [
      "Authentic Vedic Havan Kund engineered with smokeless ventilation ducting",
      "Tiered amphitheater seating ensuring every close family member witnesses the pheras",
      "Traditional brass samai lamps, ceremonial brass thaalis, and fresh rose petals",
      "High-clarity acoustic sound system tuned for the Pandit’s Vedic mantra chanting"
    ],
    specs: [
      { label: "MANDAP CAPACITY", value: "Up to 350 Seated Family" },
      { label: "FIRE SAFETY", value: "Fire-Safety Certified Havan Kund" },
      { label: "FLORAL CANOPY", value: "Fresh Red Roses & Scented Tuberose" },
      { label: "RITUAL SEATING", value: "Low Wooden Baithak & Gilded Chairs" }
    ],
    itinerary: [
      { step: "Late Night 23:30", title: "Mandap Consecration & Ganesh Puja", details: "Pandit ji consecrates the holy fire altar; sacred samagri, pure desi ghee, and coconuts prepared." },
      { step: "Midnight 00:30", title: "The Seven Sacred Vows (Saat Phere)", details: "The bride and groom circle the holy fire, take sacred vows, and exchange Sindoor and Mangalsutra." },
      { step: "Dawn 05:00", title: "Blessings & Emotional Bidaai", details: "Family shower blessings with flower petals as the newlywed couple departs in an adorned royal carriage." }
    ]
  },
  {
    id: "space-courtyard-sangeet",
    category: "PRE-WEDDING & SANGEET LOUNGE",
    title: "THE MEHNDI & SANGEET COURTYARD",
    tags: ["MEHNDI LOUNGE", "SANGEET DANCE", "EMERALD SOFAS", "FLORAL ARCHES"],
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
    id: "space-haldi-pavilion",
    category: "SUNLIT CELEBRATION GARDEN",
    title: "THE SUNLIT HALDI & CARNIVAL LAWN",
    tags: ["MARIGOLD HALDI", "BRASS URLI SEATING", "SUNLIT LAWN", "FLOWER SHOWER"],
    image: "/images/gallery/smr-57.jpg",
    alt: "Sunlit wedding garden lawn with marigold flower backdrops and traditional brass Urli for Haldi flower shower",
    capacity: "150 to 450 Guests",
    area: "6,000 Sq. Ft. Open-Sky Garden",
    idealFor: "Morning Haldi Flower Showers, Chuda Ceremony & Daytime Carnivals",
    priceNote: "Custom Daytime Ceremony Packages",
    headline: "Sunlit Morning Garden with Marigold Cascades and Brass Urli Petal Showers",
    description: "A sun-drenched outdoor garden drenched in auspicious golden marigolds, yellow drapes, and traditional brass Urli vessels. Perfect for lively morning Haldi ceremonies, fragrant rose water and flower petal showers, and daytime culinary spreads.",
    features: [
      "Traditional hammered brass Urli throne for the bride and groom Haldi bath",
      "Auspicious yellow and orange marigold floral curtains and floral swing backdrops",
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
