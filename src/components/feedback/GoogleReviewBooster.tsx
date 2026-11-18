import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star,
  Sparkles,
  Mic,
  MicOff,
  RotateCcw,
  Wand2,
  Copy,
  ExternalLink,
  Printer,
  Download,
  Check,
  QrCode,
  MapPin,
  ShieldCheck,
  Heart
} from 'lucide-react';
import { SheeshMahalLogo } from '../SheeshMahalLogo.tsx';

// Google Place ID for Sheesh Mahal Resort
const SHEESH_MAHAL_PLACE_ID = 'ChIJo7QGOJJX7TkRxV4GracbWJQ';
const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${SHEESH_MAHAL_PLACE_ID}`;
const FEEDBACK_URL = 'https://www.sheeshmahalresorts.com/feedback';

// Combinatorial Procedural Generator (Zero Network Latency Fallback)
const PROCEDURAL_GENERATOR = {
  hindi: {
    openers: [
      "Sheesh Mahal Resort me cousin ki shadi attend kiya tha,",
      "Last weekend Sheesh Mahal Resort me family wedding function tha,",
      "Patna me Ashiana Digha road pe Sheesh Mahal Resort bohot hi shandaar venue hai,",
      "Humne brother ki shadi ke liye Sheesh Mahal Resort book kiya tha,",
      "Recently ek grand marriage reception attend karne Sheesh Mahal Resort gaye the,",
      "Sheesh Mahal Resort me shadi ka experience sach me royal tha,"
    ],
    highlights: [
      "lawn ka space aur grand lighting decor ekdum lajawab tha.",
      "AC Sheesh ballroom bohot spacious aur clean tha, seating arrangement badhiya tha.",
      "St. Xavier's college ke samne location find karna bohot easy tha aur valet parking bhi smooth thi.",
      "Baraat entry aur sacred mandap setup ka mahaul bohot khoobsurat aur royal tha.",
      "resort ka ambience bohot aesthetic hai, family photography ke liye spots bohot acche the."
    ],
    catering: [
      "Khana sach me lajawab tha, specially Champaran mutton, paneer tikka aur live chaat counter.",
      "Awadhi biryani aur garam rabri jalebi ka taste sabhi guests ko bohot pasand aaya.",
      "Catering me veg aur non-veg dono ka separate kitchen setup bohot acha laga, hygiene top notch tha.",
      "Starter se leke main course aur desserts sab kuch fresh aur bohot swadisht tha."
    ],
    closings: [
      "Patna me royal wedding ke liye best resort hai, 5 star rating!",
      "Management aur staff ka behavior bohot polite aur cooperative tha. Highly recommended!",
      "Overall bohot memorable experience raha, puri family bohot khush hui.",
      "Grand wedding ya reception plan karne ke liye perfect place hai Patna me!"
    ]
  },
  english: {
    openers: [
      "Attended a cousin's grand wedding celebration at Sheesh Mahal Resort last weekend.",
      "We recently hosted a family wedding function at Sheesh Mahal Resort on Ashiana-Digha road.",
      "Visited Sheesh Mahal Resort for a close friend's marriage reception,",
      "Had a truly royal experience attending a multi-day wedding celebration at Sheesh Mahal Resort Patna.",
      "Celebrated a family wedding at Sheesh Mahal Resort opposite St. Xavier's College,"
    ],
    highlights: [
      "The sprawling starlit Baraat lawn and architectural lighting setup looked genuinely majestic.",
      "The centrally air-conditioned Sheesh ballroom was massive, clean, and easily accommodated everyone comfortably.",
      "Location opposite St. Xavier's gate made it hassle-free to reach, and valet parking service was super smooth.",
      "The stage floral decor, mandap pavilion, and wedding aesthetic felt straight out of a palace."
    ],
    catering: [
      "Food quality was outstanding, specially the Champaran handi mutton, live chaat counter, and hot rabri jalebi.",
      "The Awadhi dum biryani and tandoori starters were absolute crowd favorites. Pure desi ghee taste!",
      "Catering hospitality was top-notch with strict separate pure-veg counters and swift service."
    ],
    closings: [
      "Hands down one of Patna's best royal wedding venues. Truly a 5-star experience!",
      "Staff and event coordinators were extremely attentive and courteous throughout the evening. Highly recommended!",
      "A memorable celebration from start to finish. Perfect luxury venue for grand weddings!"
    ]
  }
};

function getProceduralReview(language: 'hindi' | 'english'): string {
  const set = language === 'hindi' ? PROCEDURAL_GENERATOR.hindi : PROCEDURAL_GENERATOR.english;
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(set.openers)} ${pick(set.highlights)} ${pick(set.catering)} ${pick(set.closings)}`;
}

/**
 * Deduplicate speech recognition chunks to eliminate Android / Chromium repeated phrase bug.
 */
function mergeSpeechChunks(baseText: string, newChunk: string): string {
  const base = baseText.trim();
  const chunk = newChunk.trim();
  if (!chunk) return base;
  if (!base) return chunk;

  // Check if chunk is already fully contained at the end of base
  if (base.toLowerCase().endsWith(chunk.toLowerCase())) {
    return base;
  }

  // Check word-level overlapping suffix/prefix (up to 6 words)
  const baseWords = base.split(/\s+/);
  const chunkWords = chunk.split(/\s+/);
  const maxOverlap = Math.min(baseWords.length, chunkWords.length, 6);

  for (let len = maxOverlap; len > 0; len--) {
    const baseSuffix = baseWords.slice(-len).join(' ').toLowerCase();
    const chunkPrefix = chunkWords.slice(0, len).join(' ').toLowerCase();
    if (baseSuffix === chunkPrefix) {
      const remainingChunk = chunkWords.slice(len).join(' ');
      return remainingChunk ? `${base} ${remainingChunk}` : base;
    }
  }

  return `${base} ${chunk}`;
}

export const GoogleReviewBooster: React.FC = () => {
  const [rating, setRating] = useState<number>(5.0);
  const [language, setLanguage] = useState<'hindi' | 'english'>('hindi');
  const [reviewText, setReviewText] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isPolishing, setIsPolishing] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showStandee, setShowStandee] = useState<boolean>(false);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);

  const typewriterTimerRef = useRef<number | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const baseSpeechTranscriptRef = useRef<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Typewriter streaming effect (2 chars every 12ms)
  const streamText = useCallback((fullText: string) => {
    if (typewriterTimerRef.current) {
      window.clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }

    setReviewText('');
    setIsStreaming(true);
    let index = 0;

    typewriterTimerRef.current = window.setInterval(() => {
      index += 2;
      if (index >= fullText.length) {
        setReviewText(fullText);
        setIsStreaming(false);
        if (typewriterTimerRef.current) {
          window.clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
      } else {
        setReviewText(fullText.slice(0, index));
      }
    }, 12);
  }, []);

  // Teardown speech and typewriter timers on unmount
  useEffect(() => {
    return () => {
      if (typewriterTimerRef.current) {
        window.clearInterval(typewriterTimerRef.current);
      }
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Multi-layer Clipboard Fallback
  const copyToClipboard = async (textToCopy: string): Promise<boolean> => {
    if (!textToCopy) return false;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        return true;
      }
    } catch {
      // Fall through to textarea execCommand fallback
    }

    try {
      const el = document.createElement('textarea');
      el.value = textToCopy;
      el.setAttribute('readonly', '');
      el.style.position = 'fixed';
      el.style.left = '-9999px';
      el.style.top = '-9999px';
      document.body.appendChild(el);
      el.select();
      const success = document.execCommand('copy');
      document.body.removeChild(el);
      return success;
    } catch {
      return false;
    }
  };

  // Generate / New Review Action
  const handleGenerate = async () => {
    // Stop speech recognition if listening
    if (isListening && speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    setIsGenerating(true);

    try {
      const res = await fetch('/api/feedback/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          language,
          rating,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          streamText(data.review);
          return;
        }
      }
      // Instant procedural fallback if network fails
      const fallback = getProceduralReview(language);
      streamText(fallback);
    } catch {
      const fallback = getProceduralReview(language);
      streamText(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  // Polish / Improve Current Text
  const handlePolish = async () => {
    if (!reviewText.trim()) return;

    if (isListening && speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    setIsPolishing(true);

    try {
      const res = await fetch('/api/feedback/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'polish',
          text: reviewText,
          language,
          rating,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          streamText(data.review);
          return;
        }
      }
    } catch {
      // Keep existing text if polish API fails
    } finally {
      setIsPolishing(false);
    }
  };

  // Reset Action
  const handleReset = () => {
    if (typewriterTimerRef.current) {
      window.clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }
    if (speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.abort();
      } catch {
        // ignore
      }
      setIsListening(false);
    }
    setIsStreaming(false);
    setReviewText('');
    baseSpeechTranscriptRef.current = '';
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  // Toggle Voice Typing (SpeechRecognition)
  const toggleSpeechRecognition = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert("Voice typing is not supported on this browser. Please type directly into the box.");
      return;
    }

    if (isListening) {
      if (speechRecognitionRef.current) {
        try {
          speechRecognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language === 'hindi' ? 'hi-IN' : 'en-IN';

      baseSpeechTranscriptRef.current = reviewText;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk;
          } else {
            interimTranscript += transcriptChunk;
          }
        }

        if (finalTranscript) {
          baseSpeechTranscriptRef.current = mergeSpeechChunks(
            baseSpeechTranscriptRef.current,
            finalTranscript
          );
          setReviewText(baseSpeechTranscriptRef.current);
        } else if (interimTranscript) {
          setReviewText(
            mergeSpeechChunks(baseSpeechTranscriptRef.current, interimTranscript)
          );
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      speechRecognitionRef.current = recognition;
      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  // 1-Click Copy & Post to Google
  const handlePostToGoogle = async () => {
    let finalPayload = reviewText.trim();

    // If empty when clicked, auto-generate in current language
    if (!finalPayload) {
      finalPayload = getProceduralReview(language);
      setReviewText(finalPayload);
    }

    await copyToClipboard(finalPayload);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);

    // Open Sheesh Mahal's verified Google Write-Review intent in new tab
    window.open(GOOGLE_WRITE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  // Standee Print Action
  const handlePrintStandee = () => {
    window.print();
  };

  // Standee Download PNG Action
  const handleDownloadStandeePNG = () => {
    const standeeEl = document.getElementById('reception-qr-standee');
    if (!standeeEl) return;

    // Use a high-res canvas to render and download
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white palace background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Double Gold Border
    ctx.strokeStyle = '#D4AF37';
    ctx.lineWidth = 14;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Header Text
    ctx.fillStyle = '#1D261E';
    ctx.font = 'bold 54px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SHEESH MAHAL RESORT', canvas.width / 2, 170);

    ctx.fillStyle = '#E88A1A';
    ctx.font = '32px sans-serif';
    ctx.fillText('PATNA’S PREMIER ROYAL WEDDING DESTINATION', canvas.width / 2, 230);

    // Rating Badge
    ctx.fillStyle = '#1D261E';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('★★★★★  4.9 / 5.0 Google Verified', canvas.width / 2, 300);

    ctx.fillStyle = '#555555';
    ctx.font = '28px sans-serif';
    ctx.fillText('Scan to Share Your Royal Experience & Win Celebration Favors', canvas.width / 2, 360);

    // Draw QR Code
    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      // Draw centered 650x650 QR
      ctx.drawImage(qrImg, (canvas.width - 650) / 2, 430, 650, 650);

      // 3-Step Guide
      ctx.fillStyle = '#1D261E';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText('1. Scan QR Code   →   2. Tap 5 Stars   →   3. Share Experience', canvas.width / 2, 1180);

      ctx.fillStyle = '#666666';
      ctx.font = '26px sans-serif';
      ctx.fillText('Opp. St. Xavier’s College Gate, Ashiana–Digha Road, Patna', canvas.width / 2, 1260);
      ctx.fillText('www.sheeshmahalresorts.com/feedback', canvas.width / 2, 1310);

      // Trigger download
      const link = document.createElement('a');
      link.download = 'Sheesh-Mahal-Reception-Standee.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    qrImg.src = '/images/reception-qr.png';
  };

  const hasContent = reviewText.trim().length > 0;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      {/* View Switcher: Interactive Booster vs Counter Standee */}
      <div className="no-print flex items-center justify-between mb-8 pb-4 border-b border-[#E88A1A]/20">
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#E88A1A]/10 text-[#E88A1A] border border-[#E88A1A]/30">
            <Sparkles className="w-3.5 h-3.5" /> Google Review Booster
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1D261E] mt-1 font-spartan">
            Guest Experience & Feedback
          </h1>
        </div>

        <button
          onClick={() => setShowStandee(!showStandee)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[#E88A1A]/40 bg-white hover:bg-[#FAF6EE] text-[#1D261E] transition-all shadow-xs"
        >
          {showStandee ? (
            <>
              <Sparkles className="w-4 h-4 text-[#E88A1A]" />
              <span>Back to Review Form</span>
            </>
          ) : (
            <>
              <QrCode className="w-4 h-4 text-[#E88A1A]" />
              <span>Reception Standee & QR</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================
          MODE 1: INTERACTIVE GOOGLE REVIEW BOOSTER
          ======================================================== */}
      {!showStandee && (
        <div className="no-print bg-white rounded-3xl p-6 sm:p-8 border border-[#E88A1A]/20 shadow-xl space-y-6">
          {/* Header & Rating Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1D261E]">
                Rate Your Royal Celebration
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Loved our hospitality? Tap 5 stars to share your blessing on Google.
              </p>
            </div>

            {/* Interactive 5-Star Selector */}
            <div className="flex items-center gap-1.5 bg-[#FAF6EE] px-4 py-2 rounded-2xl border border-[#E88A1A]/30 self-start sm:self-auto">
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => setRating(starIndex)}
                  className="p-1 hover:scale-115 transition-transform cursor-pointer focus:outline-hidden"
                  title={`${starIndex} Stars`}
                  aria-label={`Rate ${starIndex} stars`}
                >
                  <Star
                    className={`w-6 h-6 sm:w-7 sm:h-7 transition-colors ${
                      starIndex <= rating
                        ? 'fill-[#E88A1A] text-[#E88A1A] drop-shadow-xs'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 font-bold text-sm text-[#1D261E]">
                {rating.toFixed(1)} ★
              </span>
            </div>
          </div>

          {/* Language Switcher Tabs */}
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-wider font-semibold text-gray-400">
              Review Language:
            </span>
            <div className="inline-flex p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setLanguage('hindi')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === 'hindi'
                    ? 'bg-white text-[#1D261E] shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                Hindi (Hinglish)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('english')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  language === 'english'
                    ? 'bg-white text-[#1D261E] shadow-xs'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Review Textarea Container */}
          <div className="relative rounded-2xl border border-gray-200 focus-within:border-[#E88A1A] focus-within:ring-2 focus-within:ring-[#E88A1A]/20 transition-all bg-[#FAF6EE]/40">
            <textarea
              ref={textareaRef}
              rows={5}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={
                language === 'hindi'
                  ? "Yahan apna experience likhein, ya neeche 'Auto-Generate' par tap karein..."
                  : "Type your review here, or tap 'Auto-Generate' below for instant inspiration..."
              }
              className="w-full p-4 sm:p-5 text-sm sm:text-base text-[#1D261E] placeholder:text-gray-400 bg-transparent resize-y outline-hidden font-spartan leading-relaxed"
            />

            {/* Speech Microphone Floating Button */}
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              {isListening && (
                <span className="flex items-center gap-1.5 text-xs text-rose-600 font-medium bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  Listening...
                </span>
              )}

              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-2.5 rounded-full transition-all cursor-pointer shadow-xs ${
                  isListening
                    ? 'bg-rose-600 text-white animate-bounce'
                    : 'bg-white text-[#1D261E] hover:bg-gray-100 border border-gray-200'
                }`}
                title={isListening ? "Stop Voice Typing" : "Start Voice Typing"}
                aria-label="Toggle voice typing"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4 text-[#E88A1A]" />
                )}
              </button>
            </div>
          </div>

          {/* Action Button Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              {/* Reset Button (Visible only when text is present) */}
              {hasContent && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-gray-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-all cursor-pointer"
                  title="Clear text"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}

              {/* Polish Button (Visible only when text is present) */}
              {hasContent && (
                <button
                  type="button"
                  onClick={handlePolish}
                  disabled={isPolishing || isGenerating}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#26532B] bg-[#26532B]/10 hover:bg-[#26532B]/20 border border-[#26532B]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isPolishing ? "Polishing..." : "Polish Draft"}</span>
                </button>
              )}
            </div>

            {/* Dynamic Generator Action Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || isPolishing || isStreaming}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-[#1D261E] bg-[#FAF6EE] hover:bg-[#E88A1A]/15 border border-[#E88A1A]/40 transition-all shadow-xs cursor-pointer disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 text-[#E88A1A]" />
              <span>
                {isGenerating
                  ? "Crafting Review..."
                  : hasContent
                  ? "New Review Idea"
                  : "Auto-Generate Review"}
              </span>
            </button>
          </div>

          {/* Primary High-Conversion 1-Click CTA */}
          <div className="pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={handlePostToGoogle}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#E88A1A] via-[#D4AF37] to-[#E88A1A] hover:brightness-105 active:scale-[0.99] text-[#1D261E] font-bold text-base sm:text-lg transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-3 border border-amber-300"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-800" />
                  <span>Copied! Opening Google Reviews...</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy & Post to Google Review</span>
                  <ExternalLink className="w-4 h-4 ml-1 opacity-70" />
                </>
              )}
            </button>

            <p className="text-center text-xs text-gray-500 mt-2.5">
              Tapping will automatically copy your text and open Sheesh Mahal Resort's official Google review box.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 2 & PRINT: LUXURY RECEPTION COUNTER STANDEE
          ======================================================== */}
      <div
        id="reception-qr-standee"
        className={`${
          showStandee ? 'block' : 'hidden'
        } print:block bg-white rounded-3xl p-8 sm:p-10 border-4 border-double border-[#D4AF37] shadow-2xl text-center space-y-6 max-w-xl mx-auto`}
      >
        {/* Standee Header */}
        <div className="space-y-2">
          <div className="flex justify-center mb-3">
            <SheeshMahalLogo className="w-20 h-20" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D261E] tracking-tight uppercase font-spartan">
            Sheesh Mahal Resort
          </h2>

          <p className="text-xs uppercase tracking-widest text-[#E88A1A] font-bold">
            Patna's Premier Royal Wedding Destination
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-bold text-[#1D261E] mt-1">
            <span className="text-[#E88A1A]">★★★★★</span>
            <span>4.9 / 5.0 Google Verified</span>
          </div>
        </div>

        {/* High-Resolution QR Code */}
        <div className="flex flex-col items-center justify-center p-4 bg-[#FAF6EE] rounded-2xl border border-[#D4AF37]/40 max-w-[320px] mx-auto">
          <img
            src="/images/reception-qr.png"
            alt="Sheesh Mahal Resort Google Feedback QR Code"
            className="w-64 h-64 object-contain rounded-xl"
            width={256}
            height={256}
          />
          <p className="text-[11px] font-bold tracking-wider text-[#1D261E] uppercase mt-2">
            Scan with phone camera
          </p>
        </div>

        {/* 3-Step Guide */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-b border-gray-100 py-4 text-center">
          <div className="space-y-1">
            <div className="w-7 h-7 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-bold text-xs flex items-center justify-center">
              1
            </div>
            <p className="text-xs font-bold text-[#1D261E]">Scan QR</p>
            <p className="text-[10px] text-gray-500">Camera / Lens</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-bold text-xs flex items-center justify-center">
              2
            </div>
            <p className="text-xs font-bold text-[#1D261E]">Tap 5 Stars</p>
            <p className="text-[10px] text-gray-500">Rate Experience</p>
          </div>

          <div className="space-y-1">
            <div className="w-7 h-7 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-bold text-xs flex items-center justify-center">
              3
            </div>
            <p className="text-xs font-bold text-[#1D261E]">Share Review</p>
            <p className="text-[10px] text-gray-500">1-Click Post</p>
          </div>
        </div>

        {/* Footer Landmark & URL */}
        <div className="space-y-1 text-xs text-gray-600">
          <p className="flex items-center justify-center gap-1 font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#E88A1A]" />
            Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna
          </p>
          <p className="text-[11px] text-gray-400">
            {FEEDBACK_URL}
          </p>
        </div>

        {/* Standee Action Controls (Hidden in Print Mode) */}
        <div className="no-print pt-4 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={handlePrintStandee}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#1D261E] hover:bg-[#26532B] text-white font-semibold text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            <Printer className="w-4 h-4 text-[#E88A1A]" />
            <span>Print Standee</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadStandeePNG}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-100 text-[#1D261E] font-semibold text-xs sm:text-sm transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4 text-[#E88A1A]" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
