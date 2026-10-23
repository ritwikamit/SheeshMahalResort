import { isQueryOutOfContext } from './resortKnowledge.ts';
import { RESORT_CONTACT, VENUE_SPACES } from '../data/resortData.ts';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: () => void;
  }[];
}

const OUT_OF_CONTEXT_REFUSAL =
  "As the royal wedding concierge for Sheesh Mahal Resort, I can only assist with inquiries regarding our luxury wedding venues, royal catering, wedding packages, and celebrations here in Patna. How may I assist your wedding preparations today?";

/**
 * Highly comprehensive local knowledge engine derived from verified resort data.
 * Handles all core wedding topics accurately if OpenRouter is unreachable.
 */
function generateLocalKnowledgeReply(
  userQuery: string,
  onOpenInquiry: () => void
): { text: string; quickActions?: { label: string; action: () => void }[] } {
  const q = userQuery.toLowerCase().trim();

  // 1. Strict Out-of-Context Denial
  if (isQueryOutOfContext(userQuery)) {
    return {
      text: OUT_OF_CONTEXT_REFUSAL,
      quickActions: [
        { label: 'View Wedding Venues', action: () => onOpenInquiry() },
        { label: 'Check Lagan Dates', action: () => onOpenInquiry() }
      ]
    };
  }

  // 2. Greetings, Introductions & Identity
  if (
    q === 'hi' ||
    q === 'hello' ||
    q === 'hey' ||
    q === 'namaste' ||
    q === 'pranam' ||
    q.includes('who are you') ||
    q.includes('who is raj') ||
    q.includes('your name') ||
    q.includes('introduce') ||
    q.includes('kaun ho')
  ) {
    return {
      text: `Namaste! I am Raj, your Senior Royal Wedding Concierge at Sheesh Mahal Resort in Patna.\n\nI am here to personally guide you with every detail of your wedding planning—from reserving our 45,000 sq. ft. starlit Baraat lawns and 1,200-guest AC ballroom, to organizing royal Awadhi & Bihari feast tastings, bridal vanity suites, and auspicious 2026–2027 Lagan dates.\n\nHow may I assist your family's royal celebration today?`,
      quickActions: [
        { label: 'Check Lagan Dates', action: () => onOpenInquiry() },
        { label: 'WhatsApp Raj Directly', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Raj,%20I%20would%20like%20to%20discuss%20wedding%20plans%20at%20Sheesh%20Mahal%20Resort.`, '_blank') }
      ]
    };
  }

  // 3. Hindi / Hinglish Inquiries (Shaadi, Vivah, Kharcha, Hall, etc.)
  if (
    q.includes('shaadi') ||
    q.includes('shadi') ||
    q.includes('vivah') ||
    q.includes('karna hai') ||
    q.includes('chahiye') ||
    q.includes('kahan') ||
    q.includes('kharcha') ||
    q.includes('kitna')
  ) {
    return {
      text: `Namaste! शीश महल रिसॉर्ट (Sheesh Mahal Resort) पटना में शाही शादियों के लिए सबसे प्रतिष्ठित और भव्य स्थल है:\n\n• 45,000+ वर्ग फुट का विशाल शाही मैदान (2,000+ अतिथियों के लिए लॉन)\n• 1,200 अतिथियों के लिए सेंट्रली वातानुकूलित (AC) शीश बॉलरूम\n• 100% शुद्ध देसी घी में निर्मित अवधी और पारंपरिक बिहारी व्यंजन (वेज और नॉन-वेज के लिए अलग किचन)\n• 24 घंटे लगातार जनरेटर बैकअप, वैदिक मंडप और ऑन-साइट वैलेट पार्किंग\n\nशुभ लगन और मुहूर्त की तारीखें तेज़ी से बुक हो रही हैं। क्या आप तारीख की उपलब्धता या पैकेज की जानकारी चाहते हैं?`,
      quickActions: [
        { label: 'तारीख चेक करें', action: () => onOpenInquiry() },
        { label: 'व्हाट्सएप पर बात करें', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Namaste%20Raj,%20mujhe%20shaadi%20booking%20ki%20jaankari%20chahiye.`, '_blank') }
      ]
    };
  }

  // 4. Resort Overview & Facilities
  if (
    q.includes('facility') ||
    q.includes('facilities') ||
    q.includes('amenit') ||
    q.includes('about') ||
    q.includes('feature') ||
    q.includes('overview') ||
    q.includes('sheesh mahal')
  ) {
    return {
      text: `Sheesh Mahal Resort is Patna's premier royal wedding destination spanning 45,000+ sq. ft. on the Ashiana–Digha corridor:\n\n• The Sheesh Banquet: 12,000 sq. ft. AC Grand Ballroom (500–1,200 guests)\n• Shahi Utsav Lawn: 25,000 sq. ft. Landscaped Garden (800–2,000+ guests)\n• Consecrated Vedic Mandap: 4,000 sq. ft. sacred pavilion with havan smoke ventilation\n• Poolside Courtyard: 8,000 sq. ft. for vibrant Haldi & Mehndi carnivals\n• Gastronomy: Master royal chefs with 100% separated veg & non-veg preparation lines\n• Reliability: Continuous industrial generator power backup & complimentary valet parking\n• Suites: Air-conditioned bridal & groom vanity dressing suites.`,
      quickActions: [
        { label: 'Explore Spaces', action: () => onOpenInquiry() },
        { label: 'Schedule Walkthrough', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
      ]
    };
  }

  // 5. Capacity & Guest Count & Lawns
  if (q.includes('capacity') || q.includes('guest') || q.includes('people') || q.includes('how many') || q.includes('size') || q.includes('area') || q.includes('sq ft') || q.includes('lawn')) {
    const spaceLines = VENUE_SPACES.map(s => `• ${s.title}: ${s.capacity} (${s.area})`).join('\n');
    return {
      text: `Sheesh Mahal Resort spans over 45,000 sq. ft. of palatial celebration grounds, comfortably hosting from 200 up to 2,000+ wedding guests:\n\n${spaceLines}\n\n• Shahi Utsav Lawn: 800 – 2,000+ guests for grand Baraats\n• The Sheesh Banquet: 500 – 1,200 guests (fully air-conditioned ballroom)\n• Vedic Mandap Courtyard: Up to 300 seated family\n• Poolside & Cabana Courtyard: 200 – 500 guests for Haldi/Sangeet.`,
      quickActions: [
        { label: 'Explore Spaces', action: () => onOpenInquiry() },
        { label: 'Reserve Wedding Date', action: () => onOpenInquiry() }
      ]
    };
  }

  // 3. Catering, Food, Desi Ghee & Menus
  if (q.includes('cater') || q.includes('food') || q.includes('menu') || q.includes('veg') || q.includes('non-veg') || q.includes('mithai') || q.includes('dish') || q.includes('biryani') || q.includes('champaran') || q.includes('litti') || q.includes('tasting')) {
    return {
      text: `Our In-House Shahi Banqueting features stone-ground heritage recipes prepared in pure desi ghee by master royal chefs:\n\n• Royal Awadhi & Mughlai: Zafrani Gosht Dum Biryani, Subz Dum Biryani, Galouti & Kakori Kebabs\n• Traditional Bihari Heritage: Authentic Champaran Handi Gosht, Litti Chokha with Ghee\n• Live Street Stations: Banarasi Tamatar Chaat, 5-Water Crispy Golgappa, Live Dosa\n• Shahi Mithai: Live Rabri Jalebi, Moong Dal Halwa, Matka Malai Kulfi.\n\nStrict 100% separate kitchen lines and dedicated cookware are maintained for pure vegetarian and gourmet non-vegetarian catering. Complimentary pre-wedding food tasting sessions are arranged for booked families!`,
      quickActions: [
        { label: 'Book Catering Tasting', action: () => onOpenInquiry() },
        { label: 'Chat on WhatsApp', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') }
      ]
    };
  }

  // 4. Location, Address, Distance & Directions (with verified Google Maps link)
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('reach') || q.includes('map') || q.includes('direction') || q.includes('route') || q.includes('distance') || q.includes('digha')) {
    return {
      text: `Sheesh Mahal Resort is situated on the prime Ashiana–Digha arterial corridor in Patna:\n\n📍 Address: ${RESORT_CONTACT.address}\n• Landmark: Directly opposite the main entrance gate of St. Xavier's College & adjacent to Bharat Petrol Pump.\n(Important: Located on Ashiana–Digha Road, NOT Bailey Road).\n\nKey Travel Distances:\n• 20 mins from Patna Junction (8.4 km)\n• 22 mins from Jay Prakash Narayan Airport (9.2 km)\n• 5 mins from Loknayak Ganga Marine Drive (2.1 km).`,
      quickActions: [
        { label: 'Open Google Maps Pin', action: () => window.open(RESORT_CONTACT.googleMapsUrl, '_blank') },
        { label: 'Call for Route Guidance', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
      ]
    };
  }

  // 5. Booking, Price, Packages & Cost
  if (q.includes('book') || q.includes('date') || q.includes('muhurat') || q.includes('lagan') || q.includes('sawa') || q.includes('price') || q.includes('package') || q.includes('cost') || q.includes('rate') || q.includes('charge') || q.includes('advance') || q.includes('payment')) {
    return {
      text: `Auspicious Lagan and Muhurat wedding dates for the 2026–2027 seasons are booking rapidly! We offer three bespoke royal packages:\n\n1. Shahi Utsav Package (300–500 Guests): Climate-controlled Ballroom/Lawn, 45-dish multi-cuisine feast, stage & mandap decor, 1 bridal suite, valet.\n2. Imperial Palace Package (600–1,200 Guests): Ballroom + Consecrated Mandap, 65-dish royal feast, hydraulic Varmala stage, cold-pyro reveals, Baraat Dhol welcome, 2 luxury suites.\n3. Royal Residency Retreat (Up to 2,000+ Guests): Complete 3-day resort takeover for Haldi, Mehndi, Sangeet & Reception.\n\nPackage pricing is customized based on your guest count and selected menu. Would you like to check date availability?`,
      quickActions: [
        { label: 'Check Dates & Packages', action: () => onOpenInquiry() },
        { label: 'Call Wedding Manager', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
      ]
    };
  }

  // 6. Rooms, Bridal Suites & Stay
  if (q.includes('room') || q.includes('suite') || q.includes('stay') || q.includes('bridal') || q.includes('groom') || q.includes('dressing') || q.includes('accommodation') || q.includes('overnight')) {
    return {
      text: `Sheesh Mahal Resort provides luxury air-conditioned Bridal and Groom vanity dressing suites:\n\n• Full-length 3-way vanity mirrors & Hollywood makeup illumination\n• Comfortable luxury plush seating lounges for bridal party and parents\n• Attached private modern washrooms and secure wardrobe lockers\n• Additional preparation rooms for immediate family members and outstation guests.\n\nBridal suites are included complimentary in all our wedding packages!`,
      quickActions: [
        { label: 'View Bridal Suites', action: () => onOpenInquiry() },
        { label: 'WhatsApp Concierge', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') }
      ]
    };
  }

  // 7. Baraat, Procession & Dhol
  if (q.includes('baraat') || q.includes('barat') || q.includes('dhol') || q.includes('entry') || q.includes('procession') || q.includes('horse') || q.includes('ghodi') || q.includes('varmala')) {
    return {
      text: `We have engineered our grounds specifically for grand, celebratory Baraat processions:\n\n• Dedicated wide Baraat avenue with ample space for dancing and celebratory dhol\n• Professional traditional Dhol welcoming team and rose-petal showers at the palace gates\n• Cinematic Varmala stages featuring hydraulic lifts, cold-pyro sparklers, and heavy low-fog cloud reveals\n• Ample space for ghodi (horse) or royal vintage car entry.`,
      quickActions: [
        { label: 'Inquire About Baraat Setup', action: () => onOpenInquiry() }
      ]
    };
  }

  // 8. Vedic Mandap & Saat Phere
  if (q.includes('mandap') || q.includes('phere') || q.includes('phera') || q.includes('saat') || q.includes('pandit') || q.includes('havan') || q.includes('puja') || q.includes('kanyadaan') || q.includes('bidaai')) {
    return {
      text: `Our consecrated Royal Mandap Pavilion is designed in strict accordance with Vedic ceremonial architecture:\n\n• Consecrated havan kund with specialized airflow ventilation for the sacred holy fire\n• Tiered family amphitheater seating so close relatives can witness the Saat Phere intimately\n• Adorned with fragrant fresh red roses, tuberose, and marigolds\n• Clear acoustic sound relay so Pandit ji's Sanskrit mantras and shlokas resonate serenely.`,
      quickActions: [
        { label: 'View Mandap Pavilion', action: () => onOpenInquiry() }
      ]
    };
  }

  // 9. DJ, Music, Sound & Timings
  if (q.includes('dj') || q.includes('music') || q.includes('sound') || q.includes('sangeet') || q.includes('time') || q.includes('timing') || q.includes('late') || q.includes('night') || q.includes('hour')) {
    return {
      text: `At Sheesh Mahal Resort, we understand Indian weddings celebrate well into the auspicious night hours:\n\n• Our resort operates 24 Hours for wedding celebrations and sacred ceremonies\n• High-energy DJ setups and Sangeet performances are accommodated in our sound-insulated AC Sheesh Ballroom\n• Outdoor music complies with standard evening municipal sound guidelines, after which celebrations transition into the indoor ballroom\n• Saat Phere rituals in the Mandap continue unrestricted throughout the night until morning Bidaai.`,
      quickActions: [
        { label: 'Plan Wedding Timeline', action: () => onOpenInquiry() }
      ]
    };
  }

  // 10. Power Backup & Valet Parking
  if (q.includes('power') || q.includes('generator') || q.includes('electricity') || q.includes('parking') || q.includes('valet') || q.includes('car') || q.includes('vehicle')) {
    return {
      text: `Our wedding infrastructure provides 100% peace of mind:\n\n• Power: Heavy-duty industrial diesel generators with automatic changeover provide 100% continuous power backup for heavy central AC, lighting, and stage sound systems\n• Parking: Dedicated secure on-site parking for wedding convoys and guest fleets\n• Valet Service: Courteous uniformed valet attendants receive guests at the porch and safely park all vehicles.`,
      quickActions: [
        { label: 'Contact Wedding Desk', action: () => onOpenInquiry() }
      ]
    };
  }

  // 11. Alcohol & Liquor Policy
  if (q.includes('alcohol') || q.includes('liquor') || q.includes('wine') || q.includes('whisky') || q.includes('beer') || q.includes('drink')) {
    return {
      text: `In compliance with Bihar state government regulations and prohibition laws, Sheesh Mahal Resort is a strictly alcohol-free premises.\n\nIn its place, our beverage masters craft exquisite royal mocktails, fresh fruit fusions, Kesar Badam Thandai, Masala Chai, and welcome drinks that wedding guests rave about!`,
      quickActions: [
        { label: 'View Beverage Menu', action: () => onOpenInquiry() }
      ]
    };
  }

  // 12. Contact, Phone, WhatsApp & Walkthrough
  if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('number') || q.includes('talk') || q.includes('visit') || q.includes('walkthrough')) {
    return {
      text: `Our 24/7 Wedding Concierge Desk is always at your service:\n\n• Primary Call: ${RESORT_CONTACT.primaryPhone}\n• Secondary Call: ${RESORT_CONTACT.secondaryPhone}\n• WhatsApp Direct: +${RESORT_CONTACT.whatsappNumber}\n• Address: Directly opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna.\n\nOur wedding directors are on-site daily for personalized venue walkthroughs!`,
      quickActions: [
        { label: 'Chat on WhatsApp', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') },
        { label: 'Call Wedding Manager', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') },
        { label: 'Open Google Maps', action: () => window.open(RESORT_CONTACT.googleMapsUrl, '_blank') }
      ]
    };
  }

  // 13. Default Conversational Welcome / General Resort Inquiries
  return {
    text: `Namaste! I am Raj, your Senior Wedding Concierge at Sheesh Mahal Resort in Patna.\n\nWhether you wish to know about our 45,000 sq. ft. wedding grounds, starlit Baraat lawns, 1,200-guest AC ballroom, in-house royal Awadhi & Bihari catering, or available 2026–2027 Lagan dates—I am here to assist. How may I help your wedding preparations?`,
    quickActions: [
      { label: 'Check Lagan Dates', action: () => onOpenInquiry() },
      { label: 'WhatsApp Raj Directly', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') }
    ]
  };
}

/**
 * Communicates with the AI backend (/api/chat on Vercel) powered by OpenRouter.
 * Seamlessly falls back to the local knowledge engine with 100% accurate responses.
 */
export async function sendChatMessage(
  userQuery: string,
  history: ChatMessage[],
  onOpenInquiry: () => void
): Promise<{ text: string; quickActions?: { label: string; action: () => void }[] }> {
  // 1. Strict Out-of-Context Filter
  if (isQueryOutOfContext(userQuery)) {
    return {
      text: OUT_OF_CONTEXT_REFUSAL,
      quickActions: [
        { label: 'View Wedding Venues', action: () => onOpenInquiry() },
        { label: 'Check Lagan Dates', action: () => onOpenInquiry() }
      ]
    };
  }

  // 2. Call Vercel Serverless Function /api/chat with OpenRouter
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      signal: controller.signal,
      body: JSON.stringify({
        messages: history.slice(-6).map((m) => ({
          sender: m.sender,
          text: m.text
        })),
        userMessage: userQuery
      })
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      if (data && data.text) {
        return {
          text: data.text,
          quickActions: [
            { label: 'Check Wedding Dates', action: () => onOpenInquiry() },
            {
              label: 'WhatsApp Raj',
              action: () =>
                window.open(
                  `https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Raj,%20I%20would%20like%20to%20discuss%20booking%20wedding%20dates%20for%20Sheesh%20Mahal%20Resort.`,
                  '_blank'
                )
            }
          ]
        };
      }
    }
  } catch (err) {
    console.warn('OpenRouter /api/chat unreachable, serving via local knowledge engine:', err);
  }

  // 3. Robust Local Knowledge Fallback
  return generateLocalKnowledgeReply(userQuery, onOpenInquiry);
}
