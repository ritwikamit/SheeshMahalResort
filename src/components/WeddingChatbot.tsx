import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, Calendar, MessageSquare, ArrowRight, Phone } from 'lucide-react';
import { RESORT_CONTACT, VENUE_SPACES, RESORT_SERVICES } from '../data/resortData.ts';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  quickActions?: {
    label: string;
    action: () => void;
  }[];
}

interface WeddingChatbotProps {
  onOpenInquiry: () => void;
}

export const WeddingChatbot: React.FC<WeddingChatbotProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: Message = {
    id: 'welcome',
    sender: 'bot',
    text: "Namaste! Welcome to Sheesh Mahal Resort, Patna's royal wedding sanctuary. I am your 24/7 Wedding Concierge. How may I assist your wedding preparations today?",
    timestamp: 'Just now',
    quickActions: [
      {
        label: 'Check Muhurat Dates',
        action: () => onOpenInquiry()
      },
      {
        label: 'Chat on WhatsApp',
        action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Sheesh%20Mahal%20Resort,%20I%20would%20like%20to%20inquire%20about%20booking%20wedding%20dates.`, '_blank')
      }
    ]
  };

  const [messages, setMessages] = useState<Message[]>([initialGreeting]);

  const quickPrompts = [
    "Venue Capacity & Lawns",
    "Shahi Catering Menu",
    "How to book wedding dates?",
    "Resort Location & Directions"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Comprehensive Knowledge Engine based on verified resortData
  const generateBotReply = (userQuery: string): { text: string; quickActions?: { label: string; action: () => void }[] } => {
    const q = userQuery.toLowerCase();

    if (q.includes('capacity') || q.includes('guest') || q.includes('people') || q.includes('how many')) {
      return {
        text: "Sheesh Mahal Resort spans over 45,000 sq. ft. of royal celebration grounds and can comfortably host up to 2,000+ wedding guests:\n\n• Shahi Utsav Lawn: 1,200 – 2,000+ guests for grand Baraats\n• The Sheesh Banquet: 600 – 900 guests (Fully Air-Conditioned)\n• Vedic Mandap Courtyard: 300 – 500 guests for Saat Phere\n• Swarna Bridal Suites: Private luxury vanity chambers.",
        quickActions: [
          { label: 'View Spaces', action: () => onOpenInquiry() }
        ]
      };
    }

    if (q.includes('cater') || q.includes('food') || q.includes('menu') || q.includes('veg') || q.includes('non-veg') || q.includes('mithai')) {
      return {
        text: "Our In-House Shahi Banqueting features stone-ground heritage recipes prepared in pure desi ghee:\n\n• Royal Awadhi & Mughal: Zafrani Gosht Biryani, Subz Dum Biryani, Galouti Kebabs\n• Traditional Bihari: Authentic Champaran Meat Handi, Litti Chokha with Ghee\n• Live Counters: Banarasi Tamatar Chaat, 5-Water Crispy Golgappa\n• Shahi Mithai: Live Rabri Jalebi, Moong Dal Halwa, Matka Kulfi.\n\nStrict 100% separate kitchen lines are maintained for pure vegetarian and non-vegetarian catering.",
        quickActions: [
          { label: 'Book Catering Tasting', action: () => onOpenInquiry() }
        ]
      };
    }

    if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('reach') || q.includes('map') || q.includes('direction')) {
      return {
        text: `Sheesh Mahal Resort is situated at:\n\n${RESORT_CONTACT.address}\n(Directly opposite St. Xavier's College Main Gate & adjacent to Bharat Petrol Pump, Mica Colony, Digha).\n\n• 20 mins from Patna Junction (8.4 km)\n• 22 mins from Patna Airport (9.2 km)\n• 5 mins from Ganga Marine Drive (2.1 km).`,
        quickActions: [
          { label: 'Open Google Maps', action: () => window.open(RESORT_CONTACT.googleMapsUrl, '_blank') }
        ]
      };
    }

    if (q.includes('book') || q.includes('date') || q.includes('muhurat') || q.includes('price') || q.includes('package') || q.includes('cost')) {
      return {
        text: "Wedding dates for the 2026–2027 auspicious wedding seasons (Sawa / Lagan) are booking rapidly. We offer bespoke packages starting from Royal Intimate Weddings to Grand Rajwada Celebrations including venue, decor, and royal feast.",
        quickActions: [
          { label: 'Check Your Dates Now', action: () => onOpenInquiry() },
          { label: 'Call Wedding Manager', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
        ]
      };
    }

    if (q.includes('phone') || q.includes('contact') || q.includes('call') || q.includes('whatsapp') || q.includes('number')) {
      return {
        text: `Our Wedding Concierge Desk operates 24/7:\n\n• Primary Call: ${RESORT_CONTACT.primaryPhone}\n• WhatsApp Direct: +${RESORT_CONTACT.whatsappNumber}\n• Email: ${RESORT_CONTACT.email}\n\nOur team is available round-the-clock for venue walkthroughs.`,
        quickActions: [
          { label: 'Chat on WhatsApp', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') },
          { label: 'Call Now', action: () => window.open(`tel:${RESORT_CONTACT.primaryPhone}`, '_self') }
        ]
      };
    }

    return {
      text: "Thank you for asking! Sheesh Mahal Resort is dedicated exclusively to royal weddings in Patna. You can reserve dates for your auspicious wedding muhurat, explore our starlit Baraat lawns and AC ballrooms, or speak directly with our concierge desk.",
      quickActions: [
        { label: 'Check Wedding Dates', action: () => onOpenInquiry() },
        { label: 'WhatsApp Concierge', action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}`, '_blank') }
      ]
    };
  };

  const handleSend = (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const replyData = generateBotReply(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyData.text,
        timestamp: 'Just now',
        quickActions: replyData.quickActions
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <>
      {/* Trigger Button: Exactly matches ScrollToTop size (w-12 h-12 sm:w-14 sm:h-14) in the same line */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center bg-[#161726] text-[#FAEE2F] border-2 border-[#FAEE2F] shadow-2xl transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer group focus:outline-none focus:ring-4 focus:ring-[#FAEE2F]/40 shrink-0"
        aria-label="Open Sheesh Mahal Wedding AI Concierge"
        title="Chat with AI Wedding Concierge"
      >
        {/* Subtle decorative glow ring */}
        <span className="absolute -inset-1 rounded-full bg-[#FAEE2F]/25 animate-pulse pointer-events-none"></span>

        {isOpen ? (
          <X size={20} className="relative z-10 text-[#FAEE2F] transition-transform duration-200" />
        ) : (
          <div className="relative z-10 flex items-center justify-center">
            <Sparkles size={18} className="text-[#FAEE2F] group-hover:rotate-12 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#25D366] border border-[#161726]"></span>
          </div>
        )}
      </button>

      {/* Floating Chat Dialog Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Wedding Concierge Chatbot"
          className="fixed bottom-[84px] sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[380px] max-w-[420px] h-[520px] max-h-[75vh] bg-[#FAFDFB] text-[#161726] rounded-[24px] shadow-2xl border border-[#9FA1FF]/30 flex flex-col overflow-hidden z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-[#161726] text-[#FAFDFB] border-b border-[#9FA1FF]/20 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#FAEE2F] text-[#161726] flex items-center justify-center font-bold text-xs shadow-sm">
                SM
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#FAFDFB] flex items-center gap-1.5">
                  <span>WEDDING CONCIERGE</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                </h4>
                <p className="text-[10px] text-[#FAEE2F] font-cursive tracking-wide">
                  Sheesh Mahal Resort · 24/7 AI Desk
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close Chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-[#D9F9DF]/60 border-b border-[#9FA1FF]/20 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-[#FAFDFB] hover:bg-[#FAEE2F] text-[#161726] border border-[#9FA1FF]/30 rounded-lg transition-colors cursor-pointer shadow-2xs"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-[#9FA1FF] text-[#161726] flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                    <Bot size={14} />
                  </div>
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#161726] text-[#FAFDFB] rounded-br-xs font-medium'
                      : 'bg-[#D9F9DF]/40 text-[#161726] border border-[#9FA1FF]/25 rounded-bl-xs font-normal'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional Quick Action Buttons inside response */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#161726]/10 flex flex-wrap gap-2">
                      {msg.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={qa.action}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-[#FAEE2F] text-[#161726] rounded-md hover:bg-[#161726] hover:text-[#FAEE2F] transition-colors cursor-pointer shadow-2xs"
                        >
                          <span>{qa.label}</span>
                          <ArrowRight size={10} />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center text-xs text-[#161726]/60 italic pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FA1FF] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FA1FF] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#9FA1FF] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-medium ml-1">Concierge is writing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-[#FAFDFB] border-t border-[#9FA1FF]/20 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about dates, lawns, catering..."
              className="flex-1 bg-white border border-[#9FA1FF]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#161726] placeholder-[#161726]/50 focus:outline-none focus:border-[#161726] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl bg-[#FAEE2F] text-[#161726] disabled:opacity-40 flex items-center justify-center hover:bg-[#161726] hover:text-[#FAEE2F] transition-colors cursor-pointer shrink-0 shadow-sm"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
