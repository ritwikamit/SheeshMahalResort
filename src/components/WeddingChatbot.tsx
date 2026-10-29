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
          <X size={20} className="relative z-10 text-[#E88A1A] group-hover:!text-white transition-all duration-200" strokeWidth={2.2} />
        ) : (
          <MessageSquare size={20} className="relative z-10 text-[#E88A1A] group-hover:!text-white transition-all duration-200 group-hover:scale-110" strokeWidth={2.2} />
        )}
      </button>

      {/* Floating Chat Dialog Window */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Wedding Concierge Chatbot"
          className="fixed top-[88px] sm:top-auto bottom-[76px] sm:bottom-24 right-3 sm:right-6 w-[calc(100vw-24px)] sm:w-[380px] max-w-[420px] max-h-[calc(100dvh-174px)] sm:max-h-[min(530px,calc(100vh-180px))] clay-chatbox text-[#1D261E] flex flex-col overflow-hidden z-[70] animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          {/* Header */}
          <div className="px-5 py-3.5 clay-chat-header text-[#FAF6EE] flex items-center justify-between shrink-0 sticky top-0 z-20">
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
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-[#E88A1A] hover:text-[#1D261E] text-white/90 border border-white/20 transition-all flex items-center justify-center cursor-pointer shadow-xs hover:scale-105 active:scale-95"
              aria-label="Close Chat"
            >
              <X size={15} />
            </button>
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2.5 bg-[#FAF6EE]/90 backdrop-blur-xs border-b border-[#26532B]/15 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap px-3 py-1.5 text-[10px] font-black uppercase tracking-wider clay-pill text-[#1D261E] hover:text-white hover:bg-[#E88A1A] transition-all cursor-pointer shadow-2xs hover:scale-105 active:scale-95"
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
                  className={`max-w-[84%] p-3.5 whitespace-pre-line leading-relaxed ${
                    msg.sender === 'user'
                      ? 'clay-chat-bubble-user font-medium'
                      : 'clay-chat-bubble-bot font-normal text-[#1D261E]'
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider clay-btn-gold text-white hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
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
            className="p-3 bg-[#FAF6EE] border-t border-[#26532B]/15 flex items-center gap-2 shrink-0"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about dates, lawns, catering..."
              className="flex-1 clay-chat-input px-4 py-2.5 text-xs text-[#1D261E] placeholder-[#1D261E]/50 focus:outline-none focus:border-[#E88A1A] transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-10 h-10 rounded-xl clay-btn-gold disabled:opacity-40 flex items-center justify-center cursor-pointer shrink-0 shadow-md hover:scale-105 active:scale-95 transition-all text-white"
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
