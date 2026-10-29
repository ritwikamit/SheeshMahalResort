import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, ArrowRight } from 'lucide-react';
import { RESORT_CONTACT } from '../data/resortData.ts';
import { sendChatMessage, ChatMessage } from '../services/aiChatService.ts';

interface WeddingChatbotProps {
  onOpenInquiry: () => void;
}

export const WeddingChatbot: React.FC<WeddingChatbotProps> = ({ onOpenInquiry }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const initialGreeting: ChatMessage = {
    id: 'welcome',
    sender: 'bot',
    text: "Namaste! I am Raj, your personal wedding concierge at Sheesh Mahal Resort. How may I assist your royal wedding planning in Patna today?",
    timestamp: 'Just now',
    quickActions: [
      {
        label: 'Check Muhurat Dates',
        action: () => onOpenInquiry()
      },
      {
        label: 'Chat on WhatsApp',
        action: () => window.open(`https://wa.me/${RESORT_CONTACT.whatsappNumber}?text=Hello%20Raj,%20I%20would%20like%20to%20inquire%20about%20booking%20wedding%20dates%20at%20Sheesh%20Mahal%20Resort.`, '_blank')
      }
    ]
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialGreeting]);

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

  const handleSend = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput('');
    setIsTyping(true);

    try {
      const replyData = await sendChatMessage(text, newHistory, onOpenInquiry);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: replyData.text,
        timestamp: 'Just now',
        quickActions: replyData.quickActions
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Minimalist Chat Trigger Button: Exactly matches ScrollToTop size (w-12 h-12 sm:w-14 sm:h-14) in the same line */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center clay-btn-dark border-2 border-[#E88A1A]/60 hover:scale-105 active:scale-95 cursor-pointer group shrink-0"
        aria-label="Chat with Raj - Wedding Concierge"
        title="Chat with Raj"
      >
        {isOpen ? (
          <X size={20} className="relative z-10 text-[#E88A1A] transition-transform duration-200" strokeWidth={2} />
        ) : (
          <MessageSquare size={20} className="relative z-10 text-[#E88A1A] transition-transform duration-200 group-hover:scale-110" strokeWidth={2} />
        )}
      </button>

      {/* Floating Chat Dialog Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Wedding Concierge Chatbot"
          className="fixed top-[88px] sm:top-auto bottom-[76px] sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[380px] max-w-[420px] max-h-[calc(100dvh-174px)] sm:max-h-[min(520px,calc(100vh-190px))] clay-card text-[#1D261E] flex flex-col overflow-hidden z-[70] animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="px-5 py-3.5 bg-[#1D261E] text-[#FAF6EE] border-b border-[#26532B]/20 flex items-center justify-between shrink-0 sticky top-0 z-20">
            <div className="flex items-center gap-3">
              <div className="relative shrink-0">
                <img
                  src="/images/raj-concierge.jpg"
                  alt="Raj - Sheesh Mahal Wedding Concierge"
                  className="w-10 h-10 rounded-full object-cover border-2 border-[#E88A1A] shadow-sm"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#25D366] border-2 border-[#1D261E]"></span>
              </div>
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-[#FAF6EE] flex items-center gap-1.5">
                  <span>RAJ</span>
                  <span className="text-[10px] text-[#E88A1A] font-semibold tracking-normal normal-case">· Wedding Concierge</span>
                </h4>
                <p className="text-[10px] text-[#E88A1A] font-cursive tracking-wide">
                  Sheesh Mahal Resort · 24/7 Royal Desk
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
          <div className="px-4 py-2 bg-[#26532B]/60 border-b border-[#26532B]/20 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-[#FAF6EE] hover:bg-[#E88A1A] text-[#1D261E] border border-[#26532B]/30 rounded-lg transition-colors cursor-pointer shadow-2xs"
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
                  <img
                    src="/images/raj-concierge.jpg"
                    alt="Raj"
                    className="w-7 h-7 rounded-full object-cover border border-[#E88A1A]/70 shrink-0 mt-0.5 shadow-xs"
                  />
                )}

                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl whitespace-pre-line leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#1D261E] text-[#FAF6EE] rounded-br-xs font-medium'
                      : 'bg-[#26532B]/40 text-[#1D261E] border border-[#26532B]/25 rounded-bl-xs font-normal'
                  }`}
                >
                  <p>{msg.text}</p>

                  {/* Optional Quick Action Buttons inside response */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-[#1D261E]/10 flex flex-wrap gap-2">
                      {msg.quickActions.map((qa, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={qa.action}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider bg-[#E88A1A] text-[#1D261E] rounded-md hover:bg-[#1D261E] hover:text-[#E88A1A] transition-colors cursor-pointer shadow-2xs"
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
              <div className="flex gap-2 items-center text-xs text-[#1D261E]/60 italic pl-9">
                <span className="w-1.5 h-1.5 rounded-full bg-[#26532B] animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#26532B] animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#26532B] animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] font-medium ml-1">Raj is typing...</span>
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
            className="p-3 bg-[#FAF6EE] border-t border-[#26532B]/20 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about dates, lawns, catering..."
              className="flex-1 bg-white border border-[#26532B]/30 rounded-xl px-3.5 py-2.5 text-xs text-[#1D261E] placeholder-[#1D261E]/50 focus:outline-none focus:border-[#1D261E] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl clay-btn-orange disabled:opacity-40 flex items-center justify-center cursor-pointer shrink-0"
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
