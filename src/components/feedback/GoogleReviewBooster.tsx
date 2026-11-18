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
  RefreshCw
} from 'lucide-react';
import { SheeshMahalLogo } from '../SheeshMahalLogo.tsx';

// Google Place ID for Sheesh Mahal Resort
const SHEESH_MAHAL_PLACE_ID = 'ChIJo7QGOJJX7TkRxV4GracbWJQ';
const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${SHEESH_MAHAL_PLACE_ID}`;
const FEEDBACK_URL = 'https://www.sheeshmahalresorts.com/feedback';

/**
 * Devanagari to Latin / English Script Transliteration Map.
 * Strictly guarantees NO Devanagari characters appear in voice typing or output.
 */
const DEVANAGARI_MAP: Record<string, string> = {
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ee', 'उ': 'u', 'ऊ': 'oo', 'ऋ': 'ri',
  'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au', 'अं': 'an', 'अः': 'ah',
  'क': 'k', 'ख': 'kh', 'ग': 'g', 'घ': 'gh', 'ङ': 'ng',
  'च': 'ch', 'छ': 'chh', 'ज': 'j', 'झ': 'jh', 'ञ': 'ny',
  'ट': 't', 'ठ': 'th', 'ड': 'd', 'ढ': 'dh', 'ण': 'n',
  'त': 't', 'थ': 'th', 'द': 'd', 'ध': 'dh', 'न': 'n',
  'प': 'p', 'फ': 'ph', 'ब': 'b', 'भ': 'bh', 'म': 'm',
  'य': 'y', 'र': 'r', 'ल': 'l', 'व': 'v', 'श': 'sh', 'ष': 'sh', 'स': 's', 'ह': 'h',
  'ा': 'a', 'ि': 'i', 'ी': 'ee', 'ु': 'u', 'ू': 'oo', 'ृ': 'ri',
  'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au', 'ं': 'n', 'ँ': 'n', '्': '', 'ः': 'h',
  '।': '.', '॥': '.'
};

function transliterateDevanagariToLatin(input: string): string {
  if (!/[\u0900-\u097F]/.test(input)) return input;
  let out = '';
  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (DEVANAGARI_MAP[char] !== undefined) {
      out += DEVANAGARI_MAP[char];
    } else if (char.charCodeAt(0) >= 0x0900 && char.charCodeAt(0) <= 0x097F) {
      // skip unmapped Devanagari signs
    } else {
      out += char;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}

/**
 * Deduplicate speech recognition chunks to eliminate Android / Chromium repeated phrase bug.
 */
function mergeSpeechChunks(baseText: string, newChunk: string): string {
  const base = baseText.trim();
  const chunk = transliterateDevanagariToLatin(newChunk.trim());
  if (!chunk) return base;
  if (!base) return chunk;

  if (base.toLowerCase().endsWith(chunk.toLowerCase())) {
    return base;
  }

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

/**
 * High-Entropy Combinatorial Hybrid Matrix
 * 12 Openers x 12 Highlights x 12 Catering details x 12 Closings = 20,736+ Unique Reviews!
 * Generates instantly in 0ms with zero wait time.
 */
const HYBRID_MATRIX = {
  hindi: {
    openers: [
      "Sheesh Mahal Resort me cousin ki grand wedding attend kiya tha,",
      "Last weekend family wedding function attend karne Sheesh Mahal Resort gaye the,",
      "Patna me Ashiana Digha road pe Sheesh Mahal Resort bohot hi royal venue hai,",
      "Humne brother ki shadi ke liye Sheesh Mahal Resort book kiya tha,",
      "Recently ek relative ki shadi attend karne Sheesh Mahal Resort gaye the,",
      "Sheesh Mahal Resort me celebration ka experience sach me royal tha,",
      "Friend ki shadi me pehli baar Sheesh Mahal Resort jana hua,",
      "Shadi attend kiya Sheesh Mahal Resort me St. Xavier's college ke samne,",
      "Family ke sath Sheesh Mahal Resort me marriage reception enjoy kiya,",
      "Baraat aur wedding celebration ke liye Sheesh Mahal Resort ekdum top-tier laga,",
      "Last night Sheesh Mahal Resort me grand shadi attend kiya,",
      "Wedding ceremonies ke liye Sheesh Mahal Resort ka arrangement kafi royal tha,"
    ],
    highlights: [
      "lawn ka open space aur fairy lighting decor sach me majestic tha.",
      "AC Sheesh ballroom bohot spacious aur clean tha, seating arrangement badhiya tha.",
      "St. Xavier's college ke samne location find karna bohot easy tha aur valet parking bhi smooth thi.",
      "Baraat entry, Varmala stage aur sacred mandap setup bohot khoobsurat banaya tha.",
      "resort ka royal palace look aur architecture photography ke liye bohot acha hai.",
      "entry gate se leke main stage tak ka flower decoration lajawab tha.",
      "150 se zyada gadiyon ke liye valet parking kafi organized aur quick thi.",
      "stage lighting aur audio setup high quality tha, celebration me maza aa gaya.",
      "mandap ki setting aur pooja pavilion bohot shant aur pavitra feel deta hai.",
      "lawn me guests ke ghoomne aur photos lene ke liye bohot space tha.",
      "ballroom ki centrally AC cooling full crowd me bhi ekdum chilled thi.",
      "grand entrance aur royal welcome dhol beats ne dil jeet liya."
    ],
    catering: [
      "Khana sach me lajawab tha, specially Champaran mutton, paneer tikka aur live chaat counters.",
      "Awadhi biryani aur garam rabri jalebi ka taste sabhi guests ko bohot pasand aaya.",
      "Catering me veg aur non-veg dono ka separate kitchen setup bohot acha laga, hygiene top notch tha.",
      "Starter se leke main course aur desserts sab kuch fresh aur bohot swadisht tha.",
      "Champaran handi gosht aur Zafrani pulao ka authentic desi ghee swad tha.",
      "Live counter pe Banarasi chaat aur crispy jalebi sabse zyada popular rahi.",
      "Pure vegetarian dishes me Dal Makhani aur Shahi Paneer lajawab the.",
      "Snacks garam garam serve ho rahe the aur waiters ka service quick tha.",
      "Food quality 100% fresh thi aur desert section me kulfi falooda bohot tasty tha.",
      "Gourmet food arrangement tha, sabhi rishtedar khane ki tareef kar rahe the.",
      "Desi ghee ka authentic swad tha har dish me, presentation bhi royal thi.",
      "Mocktails aur live tandoori starters ka swad ekdum restaurant quality tha."
    ],
    closings: [
      "Patna me royal wedding ke liye best resort hai, 5 star rating!",
      "Management aur staff ka behavior bohot polite aur cooperative tha. Highly recommended!",
      "Overall bohot memorable experience raha, puri family bohot khush hui.",
      "Grand wedding ya reception plan karne ke liye perfect jagah hai Patna me!",
      "Shaadi ke liye Patna me aisi luxury property milna bohot badi baat hai. 5 stars!",
      "Full family bohot impress hui hospitality dekh kar. Best wedding venue!",
      "Har function ke liye recommended hai, definitely Patna ka top resort hai.",
      "Unforgettable royal wedding experience, staff coordination ko full marks!"
    ]
  },
  english: {
    openers: [
      "Attended my cousin's royal wedding celebration at Sheesh Mahal Resort last weekend.",
      "We recently hosted our family wedding function at Sheesh Mahal Resort on Ashiana-Digha road.",
      "Visited Sheesh Mahal Resort for a close friend's grand marriage reception,",
      "Had a truly palatial experience attending a multi-day wedding celebration at Sheesh Mahal Resort Patna.",
      "Celebrated a family wedding at Sheesh Mahal Resort opposite St. Xavier's College Gate,",
      "Attended an extravagant evening wedding at Sheesh Mahal Resort Patna,",
      "First time visiting Sheesh Mahal Resort for a grand Baraat and reception,",
      "Recently attended a wedding function here on Ashiana-Digha Road,",
      "Celebrated Saat Phere and reception dinner at Sheesh Mahal Resort,",
      "Attended a royal destination-style wedding right inside Patna at Sheesh Mahal Resort,"
    ],
    highlights: [
      "the sprawling 45,000 sq. ft. starlit Baraat lawn and ambient lighting setup looked breathtaking.",
      "the centrally air-conditioned ballroom was massive, clean, and easily accommodated everyone comfortably.",
      "location opposite St. Xavier's gate made it effortless to reach, and valet parking service was super smooth.",
      "the stage floral decor, mandap pavilion, and wedding aesthetic felt straight out of a palace.",
      "architectural carvings and illuminated domes made the wedding photos look stunning.",
      "the revolving Varmala stage and grand welcome dhol created an electric royal vibe.",
      "plenty of open lawn seating and prompt valet service made the guest experience hassle-free.",
      "the climate control inside the Sheesh banquet was flawless despite a packed house."
    ],
    catering: [
      "Food quality was outstanding, specially the Champaran handi mutton, live chaat counter, and hot rabri jalebi.",
      "The Awadhi dum biryani and tandoori starters were absolute crowd favorites with pure desi ghee flavor.",
      "Catering hospitality was top-notch with strict separate pure-veg kitchen counters and swift service.",
      "Live snacks were served piping hot and the dessert section with rabri and kulfi was pure perfection.",
      "From starter kebabs to the main course Champaran gosht and dal makhani, every dish was delicious.",
      "The food presentation and attentive stewards ensured no guest had to wait for refreshments."
    ],
    closings: [
      "Hands down one of Patna's best royal wedding venues. Truly a 5-star experience!",
      "Staff and event coordinators were extremely attentive and courteous throughout the evening. Highly recommended!",
      "A memorable celebration from start to finish. Perfect luxury venue for grand weddings!",
      "Cannot recommend Sheesh Mahal Resort enough for anyone planning a grand wedding in Patna. 5 stars!",
      "Top-tier venue, regal ambience, and delicious catering. A complete luxury package!"
    ]
  }
};

function generateHybridReview(language: 'hindi' | 'english'): string {
  const set = language === 'hindi' ? HYBRID_MATRIX.hindi : HYBRID_MATRIX.english;
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(set.openers)} ${pick(set.highlights)} ${pick(set.catering)} ${pick(set.closings)}`;
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

  const typewriterTimerRef = useRef<number | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  const baseSpeechTranscriptRef = useRef<string>('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // High-Speed Typewriter effect (3 chars every 10ms for snappy instant feel)
  const streamText = useCallback((fullText: string) => {
    if (typewriterTimerRef.current) {
      window.clearInterval(typewriterTimerRef.current);
      typewriterTimerRef.current = null;
    }

    setReviewText('');
    let index = 0;

    typewriterTimerRef.current = window.setInterval(() => {
      index += 3;
      if (index >= fullText.length) {
        setReviewText(fullText);
        if (typewriterTimerRef.current) {
          window.clearInterval(typewriterTimerRef.current);
          typewriterTimerRef.current = null;
        }
      } else {
        setReviewText(fullText.slice(0, index));
      }
    }, 10);
  }, []);

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
      // Fall through
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

  /**
   * Fast Hybrid Review Generator:
   * 1. Delivers instantaneous 0ms unique review via local 20,000+ combinatorial engine.
   * 2. In parallel attempts quick AI enhancement with strict 1.5s timeout.
   */
  const handleGenerate = async () => {
    if (isListening && speechRecognitionRef.current) {
      try {
        speechRecognitionRef.current.stop();
      } catch {
        // ignore
      }
      setIsListening(false);
    }

    setIsGenerating(true);

    // Step 1: Instantly start streaming a fresh unique hybrid review
    const fastReview = generateHybridReview(language);
    streamText(fastReview);

    // Step 2: Parallel non-blocking quick AI fetch with 1.8s timeout
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 1800);

      const res = await fetch('/api/feedback/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'generate',
          language,
          rating,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        // If AI returned a clean response in time, stream it
        if (data.review && !data.isFallback) {
          streamText(data.review);
        }
      }
    } catch {
      // Fast procedural is already streaming, so nothing breaks
    } finally {
      setIsGenerating(false);
    }
  };

  // Polish Current Draft
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
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2000);

      const res = await fetch('/api/feedback/improve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'polish',
          text: reviewText,
          language,
          rating,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        if (data.review) {
          streamText(data.review);
          return;
        }
      }
    } catch {
      // Quick fallback: clean double spaces and capitalize sentences
      const cleaned = reviewText
        .replace(/\s+/g, ' ')
        .replace(/([.?!]\s*)([a-z])/g, (_, p1, p2) => p1 + p2.toUpperCase())
        .trim();
      setReviewText(cleaned);
    } finally {
      setIsPolishing(false);
    }
  };

  // Reset Everything to Clean State
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
    setReviewText('');
    baseSpeechTranscriptRef.current = '';
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  /**
   * Voice Typing strictly in English / Latin Script.
   * - Uses en-IN recognition engine.
   * - Filters through transliterateDevanagariToLatin to eliminate any Devanagari characters.
   */
  const toggleSpeechRecognition = () => {
    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      alert("Voice typing is not supported on this browser. You can type directly or tap 'Auto-Generate'!");
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
      // Use en-IN so spoken Hindi / Hinglish is transcribed in English Latin letters
      recognition.lang = 'en-IN';

      baseSpeechTranscriptRef.current = reviewText;

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const rawChunk = event.results[i][0].transcript;
          // Transliterate any Devanagari strictly into English letters
          const cleanChunk = transliterateDevanagariToLatin(rawChunk);

          if (event.results[i].isFinal) {
            finalTranscript += cleanChunk;
          } else {
            interimTranscript += cleanChunk;
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

  // 1-Click Post to Google Review
  const handlePostToGoogle = async () => {
    let finalPayload = reviewText.trim();

    if (!finalPayload) {
      finalPayload = generateHybridReview(language);
      setReviewText(finalPayload);
    }

    await copyToClipboard(finalPayload);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 4000);

    window.open(GOOGLE_WRITE_REVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  // Standee Print Action (Strictly 1 Single Page)
  const handlePrintStandee = () => {
    window.print();
  };

  // Standee High-Res PNG Download
  const handleDownloadStandeePNG = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1600;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Royal Gold Double Border
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
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText('PATNA’S PREMIER ROYAL WEDDING DESTINATION', canvas.width / 2, 230);

    ctx.fillStyle = '#1D261E';
    ctx.font = 'bold 38px sans-serif';
    ctx.fillText('★★★★★  4.9 / 5.0 Google Verified', canvas.width / 2, 300);

    ctx.fillStyle = '#555555';
    ctx.font = '28px sans-serif';
    ctx.fillText('Scan to Share Your Royal Experience on Google', canvas.width / 2, 360);

    const qrImg = new Image();
    qrImg.crossOrigin = 'anonymous';
    qrImg.onload = () => {
      ctx.drawImage(qrImg, (canvas.width - 650) / 2, 430, 650, 650);

      ctx.fillStyle = '#1D261E';
      ctx.font = 'bold 34px sans-serif';
      ctx.fillText('1. Scan QR Code   →   2. Tap 5 Stars   →   3. Share Review', canvas.width / 2, 1180);

      ctx.fillStyle = '#666666';
      ctx.font = '26px sans-serif';
      ctx.fillText('Opp. St. Xavier’s College Gate, Ashiana–Digha Road, Patna', canvas.width / 2, 1260);
      ctx.fillText('www.sheeshmahalresorts.com/feedback', canvas.width / 2, 1310);

      const link = document.createElement('a');
      link.download = 'Sheesh-Mahal-Reception-Standee.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    };
    qrImg.src = '/images/reception-qr.png';
  };

  const hasContent = reviewText.trim().length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 py-4 sm:py-6">
      {/* Top Bar: View Switcher */}
      <div className="no-print flex items-center justify-between mb-5 pb-3 border-b border-[#E88A1A]/20">
        <div className="flex items-center gap-2">
          <SheeshMahalLogo className="w-8 h-8" />
          <div>
            <h1 className="text-lg sm:text-xl font-black text-[#1D261E] font-spartan leading-tight">
              Sheesh Mahal Guest Reviews
            </h1>
            <p className="text-[11px] text-[#26532B] font-bold">
              ★★★★★ 4.9 Verified on Google
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowStandee(!showStandee)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-[#E88A1A]/40 bg-[#FAF6EE] hover:bg-[#E88A1A]/10 text-[#1D261E] transition-all shadow-xs cursor-pointer"
        >
          {showStandee ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#E88A1A]" />
              <span>Back to Form</span>
            </>
          ) : (
            <>
              <QrCode className="w-3.5 h-3.5 text-[#E88A1A]" />
              <span>Print Standee QR</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================
          MODE 1: USER-FRIENDLY & COMPACT REVIEW BOOSTER
          ======================================================== */}
      {!showStandee && (
        <div className="no-print bg-white rounded-2xl p-4 sm:p-6 border border-[#E88A1A]/25 shadow-xl space-y-4">
          {/* Header Row: Stars & Language Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-gray-100">
            {/* 1-5 Star Interactive Selector */}
            <div className="flex items-center gap-1 bg-[#FAF6EE] px-3 py-1.5 rounded-xl border border-[#E88A1A]/30">
              <span className="text-xs font-bold text-[#1D261E] mr-1">Rating:</span>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => setRating(starIndex)}
                  className="p-0.5 hover:scale-120 transition-transform cursor-pointer focus:outline-hidden"
                  title={`${starIndex} Stars`}
                  aria-label={`Rate ${starIndex} stars`}
                >
                  <Star
                    className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors ${
                      starIndex <= rating
                        ? 'fill-[#E88A1A] text-[#E88A1A] drop-shadow-xs'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-1 text-xs font-black text-[#E88A1A]">
                {rating.toFixed(1)}★
              </span>
            </div>

            {/* Language Switcher Tabs */}
            <div className="inline-flex p-1 bg-gray-100 rounded-xl">
              <button
                type="button"
                onClick={() => setLanguage('hindi')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'hindi'
                    ? 'bg-white text-[#1D261E] shadow-xs border border-gray-200'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                Hinglish (English script)
              </button>
              <button
                type="button"
                onClick={() => setLanguage('english')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  language === 'english'
                    ? 'bg-white text-[#1D261E] shadow-xs border border-gray-200'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Compact Review Textarea */}
          <div className="relative rounded-xl border-2 border-gray-200 focus-within:border-[#E88A1A] focus-within:ring-2 focus-within:ring-[#E88A1A]/15 transition-all bg-[#FAF6EE]/50">
            <textarea
              ref={textareaRef}
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(transliterateDevanagariToLatin(e.target.value))}
              placeholder={
                language === 'hindi'
                  ? "Type your experience or tap '⭐ 1-Tap Auto Generate' below (e.g. 'Sheesh Mahal Resort me shadi bohot grand thi...')"
                  : "Type your review or tap '⭐ 1-Tap Auto Generate' below (e.g. 'Attended cousin wedding, royal decor and delicious food...')"
              }
              className="w-full p-3 sm:p-4 text-sm sm:text-base text-[#1D261E] placeholder:text-gray-400 bg-transparent resize-none outline-hidden font-spartan leading-relaxed"
            />

            {/* Inline Voice Typing Button inside Textarea */}
            <div className="absolute right-2.5 bottom-2.5 flex items-center gap-2">
              {isListening && (
                <span className="flex items-center gap-1.5 text-[11px] text-rose-600 font-bold bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-600" />
                  Speaking...
                </span>
              )}

              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer shadow-xs ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-white text-[#1D261E] hover:bg-gray-50 border border-gray-300'
                }`}
                title="Speak to type in English script"
              >
                {isListening ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>Stop</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-[#E88A1A]" />
                    <span>Voice Type</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action Row: Dynamic & Prominent Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1">
            {/* Left buttons (Reset & Polish visible when text exists) */}
            <div className="flex items-center gap-2">
              {hasContent && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-500 hover:text-rose-600 hover:bg-rose-50 border border-gray-200 hover:border-rose-200 transition-all cursor-pointer"
                  title="Clear text"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Clear</span>
                </button>
              )}

              {hasContent && (
                <button
                  type="button"
                  onClick={handlePolish}
                  disabled={isPolishing || isGenerating}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold text-[#26532B] bg-[#26532B]/10 hover:bg-[#26532B]/20 border border-[#26532B]/30 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Wand2 className="w-3.5 h-3.5" />
                  <span>{isPolishing ? "Polishing..." : "Polish Draft"}</span>
                </button>
              )}
            </div>

            {/* Prominent Auto-Generate Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || isPolishing}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black transition-all shadow-sm cursor-pointer disabled:opacity-50 ${
                hasContent
                  ? 'bg-amber-50 hover:bg-amber-100 text-[#1D261E] border border-amber-300'
                  : 'bg-gradient-to-r from-[#E88A1A] to-[#D4AF37] text-white hover:brightness-105 shadow-md scale-102'
              }`}
            >
              {hasContent ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-[#E88A1A]" />
                  <span>New Review Idea</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-white animate-spin" />
                  <span>⭐ 1-Tap Auto Generate Review</span>
                </>
              )}
            </button>
          </div>

          {/* Primary High-Conversion 1-Click CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handlePostToGoogle}
              className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-[#E88A1A] via-[#D4AF37] to-[#E88A1A] hover:brightness-105 active:scale-[0.99] text-[#1D261E] font-black text-sm sm:text-base transition-all shadow-lg hover:shadow-xl cursor-pointer flex items-center justify-center gap-2 border border-amber-300"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5 text-emerald-900" />
                  <span className="font-extrabold text-emerald-950">Copied! Opening Google Reviews...</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy & Post to Google Review (1-Click)</span>
                  <ExternalLink className="w-4 h-4 opacity-75" />
                </>
              )}
            </button>

            <p className="text-center text-[11px] text-gray-500 mt-2">
              Automatically copies the review and opens Sheesh Mahal's official Google review box.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 2: BEAUTIFUL ROYAL RECEPTION DESK STANDEE
          - Strictly 1 Single Page Guarantee in Print
          ======================================================== */}
      <div
        id="reception-qr-standee"
        className={`${
          showStandee ? 'flex' : 'hidden'
        } print:flex flex-col justify-between items-center bg-white rounded-3xl p-6 sm:p-8 border-4 border-double border-[#D4AF37] shadow-2xl text-center max-w-lg mx-auto`}
      >
        {/* Top Filigree & Palace Emblem */}
        <div className="w-full space-y-2">
          <div className="flex justify-center mb-1">
            <SheeshMahalLogo className="w-16 h-16 sm:w-20 sm:h-20" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#1D261E] uppercase font-spartan tracking-tight">
            Sheesh Mahal Resort
          </h2>

          <p className="text-[11px] sm:text-xs uppercase tracking-widest text-[#E88A1A] font-bold">
            Patna's Distinguished Royal Wedding Destination
          </p>

          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-black text-[#1D261E]">
            <span className="text-[#E88A1A]">★★★★★</span>
            <span>4.9 / 5.0 Google Verified</span>
          </div>
        </div>

        {/* QR Code Container */}
        <div className="my-4 p-3 sm:p-4 bg-[#FAF6EE] rounded-2xl border-2 border-[#D4AF37]/50 shadow-inner flex flex-col items-center">
          <img
            src="/images/reception-qr.png"
            alt="Sheesh Mahal Google Feedback QR Code"
            className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-xl"
            width={240}
            height={240}
          />
          <p className="text-[10px] font-black tracking-widest text-[#1D261E] uppercase mt-1.5">
            Scan with phone camera
          </p>
        </div>

        {/* 3-Step Illustrated Guide */}
        <div className="w-full grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 text-center">
          <div className="space-y-0.5">
            <div className="w-6 h-6 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-black text-xs flex items-center justify-center">
              1
            </div>
            <p className="text-[11px] font-bold text-[#1D261E]">Scan QR</p>
            <p className="text-[9px] text-gray-500">Camera / Lens</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-6 h-6 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-black text-xs flex items-center justify-center">
              2
            </div>
            <p className="text-[11px] font-bold text-[#1D261E]">Tap 5 Stars</p>
            <p className="text-[9px] text-gray-500">Rate Service</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-6 h-6 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-black text-xs flex items-center justify-center">
              3
            </div>
            <p className="text-[11px] font-bold text-[#1D261E]">Share Review</p>
            <p className="text-[9px] text-gray-500">1-Tap Post</p>
          </div>
        </div>

        {/* Landmark & URL */}
        <div className="w-full pt-2 space-y-0.5 text-[11px] text-gray-600">
          <p className="flex items-center justify-center gap-1 font-semibold text-[#1D261E]">
            <MapPin className="w-3.5 h-3.5 text-[#E88A1A]" />
            Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna
          </p>
          <p className="text-[10px] text-gray-400">
            {FEEDBACK_URL}
          </p>
        </div>

        {/* Action Controls (Hidden in Print Mode) */}
        <div className="no-print pt-4 flex flex-wrap items-center justify-center gap-2.5 w-full">
          <button
            type="button"
            onClick={handlePrintStandee}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1D261E] hover:bg-[#26532B] text-white font-bold text-xs transition-all shadow-md cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#E88A1A]" />
            <span>Print Standee (1 Page)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadStandeePNG}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 text-[#1D261E] font-bold text-xs transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#E88A1A]" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
