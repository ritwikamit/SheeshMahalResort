import { isQueryOutOfContext, getRajSystemPrompt } from './resortKnowledge.ts';
import { RESORT_CONTACT, VENUE_SPACES, RESORT_SERVICES } from '../data/resortData.ts';

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
 * Intelligent local fallback knowledge engine when OpenRouter is unreachable.
 * Dynamically generated from resortData.ts so any update immediately trains this logic.
 */
function generateLocalKnowledgeReply(
  userQuery: string,
  onOpenInquiry: () => void
): { text: string; quickActions?: { label: string; action: () => void }[] } {
  const q = userQuery.toLowerCase();

  // Strict out-of-context check
  if (isQueryOutOfContext(userQuery)) {
    return {
      text: OUT_OF_CONTEXT_REFUSAL,
      quickActions: [
        { label: 'View Wedding Venues', action: () => onOpenInquiry() },
        { label: 'Check Lagan Dates', action: () => onOpenInquiry() }
      ]
    };
  }

  if (q.includes('capacity') || q.includes('guest') || q.includes('people') || q.includes('how many')) {
    const spaceLines = VENUE_SPACES.map(s => `• ${s.title}: ${s.capacity} (${s.area})`).join('\n');
    return {
      text: `Sheesh Mahal Resort spans over 45,000 sq. ft. of royal celebration grounds and comfortably accommodates up to 2,000+ wedding guests:\n\n${spaceLines}\n\nAll spaces feature dedicated generator power backup, valet services, and private bridal dressing suites.`,
      quickActions: [
        { label: 'Explore Spaces', action: () => onOpenInquiry() },
        { label: 'Reserve Wedding Date', action: () => onOpenInquiry() }
      ]
    };
  }

  if (q.includes('cater') || q.includes('food') || q.includes('menu') || q.includes('veg') || q.includes('non-veg') || q.includes('mithai') || q.includes('dish')) {
    return {
      text: `Our In-House Shahi Banqueting features authentic recipes prepared in pure desi ghee by master chefs:\n\n• Royal Awadhi & Mughlai: Zafrani Gosht Dum Biryani, Galouti & Kakori Kebabs\n• Traditional Bihari: Authentic Champaran Meat Handi, Litti Chokha with Ghee\n• Live Street Stations: Banarasi Tamatar Chaat, 5-Water Crispy Golgappa\n• Shahi Mithai: Live Rabri Jalebi, Moong Dal Halwa, Matka Kulfi.\n\nStrict 100% separate kitchen lines are maintained for pure vegetarian and gourmet non-vegetarian preparation. We invite families for pre-wedding food tasting sessions!`,
      quickActions: [
        { label: 'Book Catering Tasting', action: () => onOpenInquiry() }
      ]
    };
  }

  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('reach') || q.includes('map') || q.includes('direction') || q.includes('route')) {
    return {
      text: `Sheesh Mahal Resort is situated at:\n\n${RESORT_CONTACT.address}\n\n• Landmark: Directly opposite St. Xavier's College Main Gate & adjacent to Bharat Petrol Pump, Mica Colony, Digha, Patna.\n• Distance: 20 mins from Patna Junction (8.4 km), 22 mins from Patna Airport (9.2 km), 5 mins from Ganga Marine Drive.\n(Note: We are located on the Ashiana–Digha corridor, NOT on Bailey Road / Danapur).`,
      quickActions: [
        { label: 'Open Google Maps', action: () => window.open(RESORT_CONTACT.googleMapsUrl, '_blank') }
      ]
    };
  }

  if (q.includes('book') || q.includes('date') || q.includes('muhurat') || q.includes('lagan') || q.includes('sawa') || q.includes('price') || q.includes('package') || q.includes('cost')) {
    return {
      text: `Wedding dates for the 2026–2027 auspicious Lagan (Muhurat) seasons are booking rapidly! We offer three bespoke royal packages:\n\n1. Shahi Utsav Package (300–500 Guests): Ballroom/Lawn + 45-dish banquet\n2. Imperial Palace Package (600–1,200 Guests): Ballroom + Mandap + 65-dish Awadhi & Bihari feast + hydraulic Varmala reveal\n3. Royal Residency Retreat (Up to 2,000+ Guests): Complete 3-day resort buyout.\n\nMay I register your preferred wedding date for our Wedding Director to check availability?`,
      quickActions: [
        { label: 'Check Dates Now', action: () => onOpenInquiry() },
        { label: 'Call Wedding Manager', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
      ]
    };
  }

  if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('number')) {
    return {
      text: `Our Wedding Concierge Desk operates 24/7:\n\n• Primary Call: ${RESORT_CONTACT.primaryPhone}\n• Secondary Call: ${RESORT_CONTACT.secondaryPhone}\n• WhatsApp Direct: +${RESORT_CONTACT.whatsappNumber}\n\nOur wedding directors are on-site around the clock for venue walkthroughs and date reservations.`,
      quickActions: [
        { label: 'Chat on WhatsApp', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') },
        { label: 'Call Now', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
      ]
    };
  }

  return {
    text: `Namaste! As your wedding concierge at Sheesh Mahal Resort in Patna, I am delighted to assist. You can inquire about our 45,000 sq. ft. wedding grounds, starlit Baraat lawns, AC ballrooms, in-house royal catering, or auspicious 2026-2027 Lagan dates. How may I help your family today?`,
    quickActions: [
      { label: 'Check Lagan Dates', action: () => onOpenInquiry() },
      { label: 'WhatsApp Concierge', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') }
    ]
  };
}

/**
 * Sends a message to the AI backend (OpenRouter via Vercel serverless /api/chat).
 * Automatically enforces strict out-of-context denial and dynamic resort knowledge.
 */
export async function sendChatMessage(
  userQuery: string,
  history: ChatMessage[],
  onOpenInquiry: () => void
): Promise<{ text: string; quickActions?: { label: string; action: () => void }[] }> {
  // 1. Strict Client-side Guardrail
  if (isQueryOutOfContext(userQuery)) {
    return {
      text: OUT_OF_CONTEXT_REFUSAL,
      quickActions: [
        { label: 'View Wedding Venues', action: () => onOpenInquiry() },
        { label: 'Check Lagan Dates', action: () => onOpenInquiry() }
      ]
    };
  }

  // 2. Attempt Vercel Serverless Function /api/chat (powered by OpenRouter with Openrouter_key)
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages: history.slice(-6).map((m) => ({
          sender: m.sender,
          text: m.text
        })),
        userMessage: userQuery
      })
    });

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
                  `https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Raj,%20I%20would%20like%20to%20discuss%20booking%20dates%20for%20Sheesh%20Mahal%20Resort.`,
                  '_blank'
                )
            }
          ]
        };
      }
    }
  } catch (err) {
    console.warn('Backend /api/chat unreachable, using dynamic local knowledge engine:', err);
  }

  // 3. Fallback to Dynamic Local Knowledge Engine
  return generateLocalKnowledgeReply(userQuery, onOpenInquiry);
}
