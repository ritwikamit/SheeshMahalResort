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
    category: "ROYAL WEDDING BALLROOM",
    title: "THE SHEESH BANQUET",
    tags: ["GRAND VARMALA", "CRYSTAL CHANDELIERS", "CENTRAL AC", "500-1200 GUESTS"],
    image: "/images/gallery/smr-03.png",
    alt: "Palatial wedding banquet hall with glittering crystal chandeliers, royal tables and stage setup at Sheesh Mahal Resort",
    capacity: "500 to 1,200 Guests",
    area: "12,000 Sq. Ft. Indoor",
    idealFor: "Grand Wedding Nuptials, Varmala & Royal Receptions",
    priceNote: "Custom Wedding Packages on Request",
    headline: "Palatial Ballroom Adorned with Mirror Glass Artistry for Royal Varmala",
    description: "The crown jewel of Sheesh Mahal Resort, designed specifically for monumental Indian weddings. Soaring ceilings with sparkling crystal chandeliers, seamless high-tonnage climate control, and a massive pillarless royal stage ensuring panoramic views of the garland exchange.",
    features: [
      "Glittering crystal chandeliers and reflective mirror-work accents",
      "High-tonnage central air-conditioning keeping guests serene and comfortable",
      "Elevated 40ft pillarless royal stage for cinematic wedding photography",
      "Attached private bridal green room with full-length mirrors and vanity lounge"
    ],
    specs: [
      { label: "WEDDING CAPACITY", value: "500 - 1,200 Guests" },
      { label: "CLIMATE CONTROL", value: "High-Capacity Central AC" },
      { label: "ACOUSTICS", value: "JBL Pro Audio for Shehnai & Sangeet" },
      { label: "ROYAL STAGE", value: "40ft x 20ft Pillarless Dais" }
    ],
    itinerary: [
      { step: "Morning 09:00", title: "Wedding Stage & Floral Adornment", details: "Decorators finalize custom floral themes, royal throne seating, and ambient warm chandeliers." },
      { step: "Evening 18:30", title: "Grand Baraat Reception & Milni Rites", details: "Traditional Dhol greetings, rose petal showers, and royal mocktails as families exchange Milni garlands." },
      { step: "Night 20:30", title: "Cinematic Varmala & Royal Wedding Feast", details: "Cold-pyro fireworks reveal the bride and groom for the Varmala, followed by a lavish 60+ dish royal wedding dinner." }
    ]
  },
  {
    id: "space-shahi-lawn",
    category: "STARLIT WEDDING GARDEN",
    title: "SHAHI UTSAV LAWN",
    tags: ["OPEN-AIR WEDDING", "STARLIT LAWN", "BARAAT AVENUE", "800-2000 GUESTS"],
    image: "/images/gallery/smr-04.png",
    alt: "Sprawling illuminated open-air royal wedding garden lawn with festive fairy lights at Sheesh Mahal Resort",
    capacity: "800 to 2,000 Guests",
    area: "25,000 Sq. Ft. Landscaped",
    idealFor: "Open-Sky Weddings, Mega Receptions & Grand Baraats",
    priceNote: "Bespoke Royal Lawn Packages",
    headline: "Vast Landscaped Lawns for Majestic Open-Sky Wedding Celebrations",
    description: "An expansive royal lawn flanked by stately palace pillars and canopied in golden fairy lights. Created for monumental wedding gatherings where hundreds of guests revel under the open stars with dedicated buffet avenues, live tandoor islands, and grand stages.",
    features: [
      "Lush leveled lawn suitable for ornate bridal footwear and velvet carpets",
      "Perimeter illuminated with warm architectural lanterns and fairy canopies",
      "Segregated wide buffet avenues to eliminate dining lines and bottlenecks",
      "Dedicated spacious dance floor for high-energy family Baraat celebrations"
    ],
    specs: [
      { label: "WEDDING CAPACITY", value: "800 - 2,000+ Guests" },
      { label: "LAWN SURFACE", value: "Finely Manicured Bermudagrass" },
      { label: "ILLUMINATION", value: "Warm Golden Fairy Canopies" },
      { label: "BUFFET STATIONS", value: "Up to 8 Parallel Live Food Courts" }
    ],
    itinerary: [
      { step: "Afternoon 16:00", title: "Lawn Lighting & Food Court Firing", details: "Fairy light canopies illuminated, warm landscape spots tested, and tandoors fired for the wedding feast." },
      { step: "Evening 19:00", title: "Live Shehnai & Welcome Drinks", details: "Classical Shehnai and Santoor players welcome arriving guests with fresh juices and appetizers." },
      { step: "Night 21:00", title: "Open-Sky Wedding Feast & Celebrations", details: "Lavish royal buffet with live Rumali Roti, Jalebi, Chaat counters, and musical performances." }
    ]
  },
  {
    id: "space-mandap-pavilion",
    category: "SACRED WEDDING RITES",
    title: "ROYAL MANDAP PAVILION",
    tags: ["SAAT PHERE", "HAVAN COMPLIANT", "MARIGOLD & ROSE", "300 GUESTS"],
    image: "/images/gallery/smr-05.png",
    alt: "Traditional royal wedding floral mandap with intricate rose and marigold drapery for sacred pheras",
    capacity: "Up to 300 Seated Family",
    area: "4,000 Sq. Ft. Sacred Pavilion",
    idealFor: "Vedic Saat Phere, Kanyadaan & Havan Rituals",
    priceNote: "Included in Wedding Packages",
    headline: "Sanctified Vedic Architecture Crafted for Sacred Saat Phere",
    description: "A consecrated ceremonial pavilion designed specifically for sacred Vedic wedding rituals, the holy Agni havan, and the seven sacred vows. Engineered with specialized airflow for the sacred fire and draped in fragrant marigold, tuberose, and red rose garlands.",
    features: [
      "Authentic Vedic havan kund engineered with dedicated ventilation",
      "Tiered amphitheater seating for close family members to witness the pheras",
      "Traditional brass samai lamps, ceremonial carpets, and rose petal shower cones",
      "Clear acoustic audio relay for the Pandit ji's Sanskrit mantras and blessing chants"
    ],
    specs: [
      { label: "MANDAP CAPACITY", value: "Up to 300 Seated Family" },
      { label: "STRUCTURE", value: "Carved Teak & Brass Mandap Pillars" },
      { label: "CEREMONIAL", value: "Havan & Fire Safety Approved" },
      { label: "SEATING", value: "Cushioned Low Baithak & Gold Chairs" }
    ],
    itinerary: [
      { step: "Late Night 23:30", title: "Mandap Consecration & Ganesh Puja", details: "Pandit ji consecrates the holy fire altar; sacred samagri, ghee, and coconuts prepared." },
      { step: "Midnight 00:30", title: "The Seven Sacred Vows (Saat Phere)", details: "The bride and groom circle the holy fire, take sacred vows, and exchange Sindoor and Mangalsutra." },
      { step: "Dawn 05:00", title: "Blessings & Emotional Bidaai", details: "Family shower blessings with flower petals as the newlywed couple departs in an adorned royal carriage." }
    ]
  },
  {
    id: "space-poolside-courtyard",
    category: "PRE-WEDDING CARNIVAL",
    title: "COURTYARD & POOLSIDE",
    tags: ["HALDI SUNSET", "MEHNDI LOUNGE", "SANGEET SUNDOWN", "200-500 GUESTS"],
    image: "/images/gallery/smr-06.png",
    alt: "Illuminated luxury resort pool and courtyard area with festive cabanas for Haldi and Mehndi ceremonies",
    capacity: "200 to 500 Guests",
    area: "8,000 Sq. Ft. Courtyard",
    idealFor: "Haldi Flower Showers, Mehndi Carnivals & Sangeet Sundowners",
    priceNote: "Custom Pre-Wedding Packages",
    headline: "Vibrant Courtyard for Colorful Pre-Wedding Carnivals & Sangeet",
    description: "Featuring a shimmering waterbody, vibrant yellow and pastel marigold drapery, and private cabana lounges. The quintessential venue for joyful Haldi ceremonies with flower petals, lively Mehndi sessions with master artists, and twilight Sangeet musical soirees.",
    features: [
      "Serene pool water reflection creating sensational pre-wedding photography backdrops",
      "Custom bright yellow Haldi backdrops with marigold swings and brass urlis",
      "Canopy tents with interactive bangles, mehndi artists, and street food stalls",
      "Twilight LED uplighting transforming the water into an electric Sangeet dance setting"
    ],
    specs: [
      { label: "EVENT CAPACITY", value: "200 - 500 Guests" },
      { label: "AMBIANCE", value: "Vibrant Haldi Yellows to Twilight Chic" },
      { label: "HIGHLIGHT", value: "Waterbody Reflection & Floral Swings" },
      { label: "PHOTO CORNERS", value: "10+ Dedicated Instagram Wedding Spots" }
    ],
    itinerary: [
      { step: "Morning 10:30", title: "Haldi Flower Carnival", details: "Organic turmeric, rose water, and marigold petal showers accompanied by vibrant Dhol beats." },
      { step: "Afternoon 13:00", title: "Mehndi Lounge & Street Food Fiesta", details: "Master Mehndi artists apply bridal henna while guests enjoy live Chaat and mocktails." },
      { step: "Evening 18:30", title: "Sangeet Sundowner & Family Dance", details: "Choreographed family dance performances, DJ sets, and twilight cocktails by the water." }
    ]
  }
];

export const RESORT_HERO_IMAGE = "/images/gallery/smr-02.png";
export const RESORT_HERO_ALT = "Sheesh Mahal Resort illuminated luxury facade with palm trees and evening wedding reflection pool";
