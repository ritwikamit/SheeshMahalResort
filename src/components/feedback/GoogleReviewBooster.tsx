import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Star,
  Sparkles,
  Mic,
  MicOff,
  RotateCcw,
  Wand2,
  Copy,
  Printer,
  Download,
  Check,
  QrCode,
  MapPin,
  RefreshCw,
  Loader2
} from 'lucide-react';

// Verified Google Place ID for Sheesh Mahal Resort
const SHEESH_MAHAL_PLACE_ID = 'ChIJo7QGOJJX7TkRxV4GracbWJQ';
const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${SHEESH_MAHAL_PLACE_ID}`;
const FEEDBACK_URL = 'https://www.sheeshmahalresorts.com/feedback';

/**
 * Transliterates Devanagari Hindi characters to English / Latin script.
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
      // ignore unmapped marks
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

// Multi-style procedural review generator for seamless offline / fallback parity
// Features totally random human styles: some lazy (1-liners), some detailed, some medium, with intentional typos in small letters
function getProceduralFallback(language: 'hindi' | 'english'): string {
  const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const roll = Math.random();

  if (language === 'hindi') {
    // 1. LAZY TIER (~35% chance): Ultra short 1-line mobile reaction (8 to 15 words)
    if (roll < 0.35) {
      const lazyReviews = [
        "khana mast tha aur lawn bhi kafi bada h.. sheesh mahal resort best h patna me",
        "attended wedding here last night.. food was very tasty speacially starter. 5 star",
        "bht badiya arrengement thaa.. champaran mutton was just lajwab",
        "patna me best resort h shadi k liye.. 10/10 experiance",
        "superb lawn and food.. highly recomended in patna!",
        "bhai ki shadi me gye the bht maza aya.. best resort in patna",
        "valet parking smooth thi aur AC hall clean tha.. good experiance at sheesh mahal",
        "food was so tasty and lawn is massive.. best wedding resort in patna",
        "location easy h opp st xavier aur staff bhi halpful tha.. 5 stars",
        "shadi k liye ekdum mast jagah h.. khana 10/10",
        "cousin reception attend kiya, decor lajwab tha.. recomended to all",
        "champaran handi mutton and jalebi rabri was super delishus.. loved it",
        "bht khoobsurat venue h sheesh mahal.. lawn lighting top notch thi",
        "shadi attend kiya tha.. khana lajwab aur staff polite tha. 5/5",
        "patna me aisi shandar jagah nahi dekhi.. best resort for royal wedding",
        "decor and khana dono 1st class tha.. fully satisfied"
      ];
      return pick(lazyReviews).toLowerCase();
    }

    // 2. DETAILED TIER (~25% chance): Rich 3-4 sentence guest memory (35 to 55 words)
    if (roll > 0.75) {
      const detailedVenues = [
        "last week cousin ki grand wedding attend kiya sheesh mahal resort me ashiana digha road pe.",
        "recently relative ka marriage reception tha sheesh mahal resort patna me.",
        "attended royal wedding ceremony at sheesh mahal resort opposite st xavier college gate."
      ];
      const detailedLawn = [
        "lawn ka fairy lights aur flower decor sach me royal palace vibe de rha tha.",
        "open baraat lawn boht bada tha aur mandap setup was looking like a dream.",
        "AC Sheesh ballroom boht spacious tha easily sabhi 1000 guests accommodate ho gaye."
      ];
      const detailedFood = [
        "khana boht lajawab tha speacially champaran handi mutton and awadhi biryani, veg kitchen bhi alag tha jo bht acha laga.",
        "catering service top notch thi, live chaat counter aur hot rabri jalebi was pure bliss.",
        "starters se leke main course tak sab kuch fresh tha, paneer tikka aur mutton authentic taste tha."
      ];
      const detailedService = [
        "valet parking smooth thi aur staff pure time attentive tha.",
        "management team kafi cooperative tha aur service fast thi.",
        "location reach karna boht easy tha opp st xavier."
      ];
      const detailedClosing = [
        "definitely patna ka best resort h shadi k liye.. 5 star rating!",
        "overall boht memorable experiance raha, highly recomended to everyone!",
        "grand shadi plan karne ke liye best venue h patna me.. loved it."
      ];
      return `${pick(detailedVenues)} ${pick(detailedLawn)} ${pick(detailedFood)} ${pick(detailedService)} ${pick(detailedClosing)}`.toLowerCase();
    }

    // 3. CASUAL MEDIUM TIER (~40% chance): 1-2 rambling sentences with random openers & connectors (18 to 32 words)
    const openers = [
      "sheesh mahal resort me friend ki wedding thi..",
      "went for cousin marriage last week opp st xavier..",
      "humne family reception attend kiya sheesh mahal resort me..",
      "brother ki shadi k liye sheesh mahal book kiya tha..",
      "shadi attend kiya ashiana digha road pe sheesh mahal me..",
      "sister ki marriage ceremony thi last weekend..",
      "sheesh mahal resort patna me function attend kiya tha.."
    ];
    const middles = [
      "decor was so beutiful and stage setup looked like a palace",
      "lawn area is massive aur lighting decoration shandar tha",
      "AC hall was clean and comfortable seating arrangement tha",
      "starlit baraat lawn me entry sach me royal lag rha tha",
      "mandap setup aur flower arrengement ekdum lajwab tha",
      "valet parking quick thi aur photo spots boht badiya the"
    ];
    const foods = [
      "khana bhi bht swadist thaa speacially live chaat and mutton",
      "champaran handi mutton aur rabri jalebi was super delishus",
      "pure veg aur non veg ka separate kitchen arrangement bht acha laga",
      "awadhi biryani aur paneer starter sabhi guests ko pasand aaya",
      "starter se leke dessert tak sab fresh aur tasty thaa"
    ];
    const closings = [
      "best resort in patna for weddings.. 5 star rating!",
      "overall bht acha experiance raha.. definitely recomended",
      "puri family khush ho gyi.. 10/10 service",
      "highly recomended to all friends in patna",
      "shadi k liye patna me best option h..",
      "royal celebration k liye perfect resort h patna me"
    ];

    const connector = pick([" aur ", ".. ", ", "]);
    const bridge = pick([".. ", ", ", " speacially "]);
    return `${pick(openers)} ${pick(middles)}${connector}${pick(foods)}${bridge}${pick(closings)}`.toLowerCase();
  } else {
    // English variations
    if (roll < 0.35) {
      const lazyReviews = [
        "attended wedding here last night.. food was very tasty speacially starters. 5 star",
        "superb lawn and food.. highly recomended in patna!",
        "food was so tasty and lawn is massive.. best wedding resort in patna",
        "location easy to find opp st xavier and staff was very halpful.. 5 stars",
        "best resort in patna for weddings.. 10/10 experiance",
        "grand lawn and royal decor.. loved the whole evening",
        "champaran mutton and jalebi rabri was super delishus.. 5/5",
        "valet parking was smooth and AC ballroom is huge.. recommended",
        "great wedding venue in patna.. royal vibe and polite staff",
        "attended cousin reception here, awesome food and ambience"
      ];
      return pick(lazyReviews).toLowerCase();
    }

    if (roll > 0.75) {
      const detailedVenues = [
        "attended a royal wedding at sheesh mahal resort opposite st xavier college gate last weekend.",
        "hosted our family marriage reception at sheesh mahal resort on ashiana digha road.",
        "was at sheesh mahal resort for my close friend's grand wedding celebration."
      ];
      const detailedLawn = [
        "the 45000 sq ft starlit lawn was looking breathtaking with royal palace lighting.",
        "centrally air conditioned sheesh ballroom was huge and easily accommodated 1200+ guests.",
        "stage floral decor and mandap setup looked straight out of a royal fort."
      ];
      const detailedFood = [
        "food quality was outstanding speacially the champaran mutton and live chaat counters, separate veg kitchen was a big plus.",
        "awadhi dum biryani and hot rabri jalebi was a huge crowd favorite, everything was super fresh.",
        "catering hospitality was top tier with authentic desi ghee flavors in all dishes."
      ];
      const detailedService = [
        "valet parking was seamless despite the large crowd and staff was very halpful.",
        "management was attentive to every small detail throughout the evening.",
        "hospitality team took care of all guests with prompt service."
      ];
      const detailedClosing = [
        "hands down the best resort in patna for royal weddings.. 5 stars!",
        "truly a memorable celebration, highly recomended to everyone in patna!",
        "definitely the top wedding resort in patna.. loved the whole experience."
      ];
      return `${pick(detailedVenues)} ${pick(detailedLawn)} ${pick(detailedFood)} ${pick(detailedService)} ${pick(detailedClosing)}`.toLowerCase();
    }

    const openers = [
      "attended cousin's wedding celebration at sheesh mahal resort..",
      "visited sheesh mahal resort for a marriage reception last night..",
      "hosted a family function at sheesh mahal on ashiana digha road..",
      "went to sheesh mahal resort opposite st xavier gate..",
      "celebrated friend's royal wedding at sheesh mahal patna.."
    ];
    const middles = [
      "lawn decor was so beutiful and stage setup was straight out of a palace",
      "huge open lawn and fairy lighting looked stunning for family photos",
      "AC ballroom was clean and comfortable with great seating arrangement",
      "mandap setup and royal floral arrengement was looking gorgeous",
      "valet parking was effortless and venue atmosphere was pure royalty"
    ];
    const foods = [
      "food was delicious speacially champaran handi meat and live chaats",
      "awadhi biryani and hot crispy jalebis were crowd favorites",
      "super hygiene with separate pure veg kitchen line was impressive",
      "starters and desserts both tasted authentic and fresh",
      "paneer tikka and hot rabri jalebi was just delishus"
    ];
    const closings = [
      "best resort in patna for weddings.. highly recomended!",
      "overall a wonderful 5 star experiance.. 10/10",
      "all our family guests were super happy.. loved it",
      "definitely the top luxury wedding resort in patna",
      "staff was very halpful throughout.. 5 stars"
    ];

    const connector = pick([" and ", ".. ", ", "]);
    const bridge = pick([".. ", ", ", " speacially "]);
    return `${pick(openers)} ${pick(middles)}${connector}${pick(foods)}${bridge}${pick(closings)}`.toLowerCase();
  }
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

  // Typewriter streaming effect (3 chars every 10ms for snappy response)
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
   * Primary AI Review Generator:
   * 1. Calls AI API key first as the primary engine.
   * 2. If AI is delayed, times out, or network fails, procedural dictionary overtakes.
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

    try {
      // 3.5s timeout on client before procedural dictionary overtakes
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

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
        if (data.review) {
          streamText(data.review);
          return;
        }
      }

      // Procedural fallback overtakes if AI response status is not ok
      const fallback = getProceduralFallback(language);
      streamText(fallback);
    } catch {
      // Network issue or timeout -> procedural dictionary overtakes
      const fallback = getProceduralFallback(language);
      streamText(fallback);
    } finally {
      setIsGenerating(false);
    }
  };

  /**
   * Polish Draft:
   * Calls AI to correct ONLY spelling mistakes while preserving raw informal grammar.
   */
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
      const timeoutId = setTimeout(() => controller.abort(), 3500);

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
      // Fallback: cleanup duplicate whitespace only, preserve grammar
      const cleaned = reviewText.replace(/\s+/g, ' ').trim();
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
   * - Passes output through transliterateDevanagariToLatin to eliminate any Devanagari letters.
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
      finalPayload = getProceduralFallback(language);
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

    // Header
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
    <div className="w-full max-w-2xl sm:max-w-3xl mx-auto px-3 sm:px-4 py-2 sm:py-4">
      {/* Top Controls: Standee Switcher (No Logo above form) */}
      <div className="no-print flex items-center justify-between mb-4 pb-2 border-b border-[#E88A1A]/15">
        <span className="text-xs font-bold text-[#26532B]/80 uppercase tracking-wider">
          ★ Google Review Booster
        </span>

        <button
          onClick={() => setShowStandee(!showStandee)}
          className="clay-pill inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-[#1D261E] hover:text-[#E88A1A] cursor-pointer"
        >
          {showStandee ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-[#E88A1A]" />
              <span>Review Form</span>
            </>
          ) : (
            <>
              <QrCode className="w-3.5 h-3.5 text-[#E88A1A]" />
              <span>Reception Standee QR</span>
            </>
          )}
        </button>
      </div>

      {/* ========================================================
          MODE 1: ENLARGED MINIMAL CLAYMORPHIC REVIEW BOOSTER
          ======================================================== */}
      {!showStandee && (
        <div className="no-print clay-card p-6 sm:p-8 space-y-5 rounded-[28px]">
          {/* Rating & Language Selector Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#26532B]/10">
            {/* Interactive 5-Star Selector in Clay Pill */}
            <div className="clay-pill px-3.5 py-1.5 flex items-center gap-1.5">
              <span className="text-xs sm:text-sm font-bold text-[#1D261E] mr-1">Rating:</span>
              {[1, 2, 3, 4, 5].map((starIndex) => (
                <button
                  key={starIndex}
                  type="button"
                  onClick={() => setRating(starIndex)}
                  className="p-0.5 hover:scale-125 transition-transform cursor-pointer focus:outline-hidden"
                  title={`${starIndex} Stars`}
                  aria-label={`Rate ${starIndex} stars`}
                >
                  <Star
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                      starIndex <= rating
                        ? 'fill-[#E88A1A] text-[#E88A1A] drop-shadow-xs'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-1 text-xs sm:text-sm font-black text-[#E88A1A]">
                {rating.toFixed(1)}★
              </span>
            </div>

            {/* Language Switcher Tabs */}
            <div className="inline-flex p-1 bg-[#FAF6EE] rounded-xl border border-white/80 shadow-inner">
              <button
                type="button"
                onClick={() => setLanguage('hindi')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  language === 'hindi'
                    ? 'bg-[#E88A1A] text-white shadow-xs'
                    : 'text-[#1D261E]/70 hover:text-[#1D261E]'
                }`}
              >
                Hinglish
              </button>
              <button
                type="button"
                onClick={() => setLanguage('english')}
                className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  language === 'english'
                    ? 'bg-[#E88A1A] text-white shadow-xs'
                    : 'text-[#1D261E]/70 hover:text-[#1D261E]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Sunken Inset Textarea Container (Enlarged) */}
          <div className="relative clay-inset p-2 rounded-2xl">
            <textarea
              ref={textareaRef}
              rows={5}
              value={reviewText}
              onChange={(e) => setReviewText(transliterateDevanagariToLatin(e.target.value))}
              placeholder={
                language === 'hindi'
                  ? "Type your review in Hinglish, or tap 'Auto-Generate Review' below..."
                  : "Type your review here, or tap 'Auto-Generate Review' below..."
              }
              className="w-full p-3 sm:p-4 text-sm sm:text-base text-[#1D261E] placeholder:text-gray-400 bg-transparent resize-none outline-hidden font-spartan leading-relaxed min-h-[140px]"
            />

            {/* Inset Voice Typing Indicator */}
            <div className="absolute right-2.5 bottom-2.5 flex items-center gap-1.5">
              {isListening && (
                <span className="flex items-center gap-1 text-[10px] text-rose-600 font-bold bg-white/90 px-2 py-0.5 rounded-full border border-rose-200 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-600" />
                  Listening...
                </span>
              )}

              <button
                type="button"
                onClick={toggleSpeechRecognition}
                className={`p-1.5 rounded-lg transition-all cursor-pointer shadow-xs ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse'
                    : 'bg-white hover:bg-gray-100 text-[#1D261E] border border-gray-200'
                }`}
                title="Speak to type in English script"
                aria-label="Voice typing"
              >
                {isListening ? (
                  <MicOff className="w-4 h-4" />
                ) : (
                  <Mic className="w-4 h-4 text-[#E88A1A]" />
                )}
              </button>
            </div>
          </div>

          {/* Action Row: Dynamic Controls */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {hasContent && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="clay-pill px-2.5 py-1 text-xs font-bold text-gray-500 hover:text-rose-600 transition-colors cursor-pointer"
                  title="Clear text"
                >
                  <RotateCcw className="w-3 h-3 inline mr-1" />
                  <span>Clear</span>
                </button>
              )}

              {hasContent && (
                <button
                  type="button"
                  onClick={handlePolish}
                  disabled={isPolishing || isGenerating}
                  className="clay-badge-emerald px-3 py-1 text-xs font-bold transition-all cursor-pointer disabled:opacity-50 flex items-center gap-1"
                >
                  {isPolishing ? (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  ) : (
                    <Wand2 className="w-3 h-3" />
                  )}
                  <span>{isPolishing ? "Fixing Typos..." : "Correct Spelling"}</span>
                </button>
              )}
            </div>

            {/* Primary AI Generator Button */}
            <button
              type="button"
              onClick={handleGenerate}
              disabled={isGenerating || isPolishing}
              className={`clay-btn px-4 py-2 text-xs font-extrabold transition-all cursor-pointer disabled:opacity-50 ${
                hasContent
                  ? 'clay-card-white text-[#1D261E] hover:text-[#E88A1A]'
                  : 'clay-btn-orange text-white'
              }`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin mr-1.5" />
                  <span>AI Writing Review...</span>
                </>
              ) : hasContent ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-[#E88A1A] mr-1.5" />
                  <span>New Review</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-white mr-1.5" />
                  <span>Auto-Generate Review</span>
                </>
              )}
            </button>
          </div>

          {/* 1-Click Post to Google Review CTA */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handlePostToGoogle}
              className="clay-btn-gold w-full py-3 px-4 text-[#1D261E] font-black text-sm sm:text-base flex items-center justify-center gap-2 cursor-pointer transition-transform"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-900" />
                  <span className="text-emerald-950 font-black">Copied! Opening Google Reviews...</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy & Post to Google Review</span>
                </>
              )}
            </button>
            <p className="text-center text-[10px] text-gray-500 mt-1.5">
              Copies your review and opens Sheesh Mahal's official Google review page.
            </p>
          </div>
        </div>
      )}

      {/* ========================================================
          MODE 2: MINIMAL ROYAL RECEPTION COUNTER STANDEE
          - Strictly 1 Single Page Guarantee in Print
          ======================================================== */}
      <div
        id="reception-qr-standee"
        className={`${
          showStandee ? 'flex' : 'hidden'
        } print:flex flex-col items-center bg-white rounded-3xl p-6 sm:p-7 border-4 border-double border-[#D4AF37] shadow-xl text-center max-w-md mx-auto w-full`}
      >
        {/* Standee Header */}
        <div className="w-full space-y-1.5 flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-full mb-1">
            <img
              src="/images/logo-header.webp"
              alt="Sheesh Mahal Resort"
              className="h-12 sm:h-14 w-auto max-w-[200px] object-contain mx-auto"
            />
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-[#1D261E] uppercase font-spartan tracking-tight">
            Sheesh Mahal Resort
          </h2>

          <p className="text-[10px] uppercase tracking-widest text-[#E88A1A] font-bold">
            Patna's Distinguished Royal Wedding Destination
          </p>

          <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-xs font-black text-[#1D261E]">
            <span className="text-[#E88A1A]">★★★★★</span>
            <span>4.9 / 5.0 Google Verified</span>
          </div>
        </div>

        {/* High-Resolution QR Container */}
        <div className="my-3 p-3 bg-[#FAF6EE] rounded-2xl border-2 border-[#D4AF37]/50 flex flex-col items-center">
          <img
            src="/images/reception-qr.png"
            alt="Sheesh Mahal Google Feedback QR Code"
            className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-xl"
            width={224}
            height={224}
          />
          <p className="text-[9px] font-black tracking-widest text-[#1D261E] uppercase mt-1">
            Scan with phone camera
          </p>
        </div>

        {/* 3-Step Illustrated Guide */}
        <div className="w-full grid grid-cols-3 gap-1.5 py-2.5 border-t border-b border-gray-100 text-center">
          <div className="space-y-0.5">
            <div className="w-5 h-5 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-black text-[10px] flex items-center justify-center">
              1
            </div>
            <p className="text-[10px] font-bold text-[#1D261E]">Scan QR</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-5 h-5 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-black text-[10px] flex items-center justify-center">
              2
            </div>
            <p className="text-[10px] font-bold text-[#1D261E]">Tap 5 Stars</p>
          </div>

          <div className="space-y-0.5">
            <div className="w-5 h-5 mx-auto rounded-full bg-[#E88A1A]/15 text-[#E88A1A] font-black text-[10px] flex items-center justify-center">
              3
            </div>
            <p className="text-[10px] font-bold text-[#1D261E]">Share Review</p>
          </div>
        </div>

        {/* Landmark & URL */}
        <div className="w-full pt-1.5 space-y-0.5 text-[10px] text-gray-600">
          <p className="flex items-center justify-center gap-1 font-semibold text-[#1D261E]">
            <MapPin className="w-3 h-3 text-[#E88A1A]" />
            Opposite St. Xavier's College Gate, Ashiana–Digha Road, Patna
          </p>
          <p className="text-[9px] text-gray-400">
            {FEEDBACK_URL}
          </p>
        </div>

        {/* Action Controls (Hidden in Print Mode) */}
        <div className="no-print pt-3 flex flex-wrap items-center justify-center gap-2 w-full">
          <button
            type="button"
            onClick={handlePrintStandee}
            className="clay-btn clay-btn-dark px-3.5 py-1.5 text-white font-bold text-xs"
          >
            <Printer className="w-3.5 h-3.5 text-[#E88A1A] mr-1.5" />
            <span>Print Standee (1 Page)</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadStandeePNG}
            className="clay-btn clay-card-white px-3.5 py-1.5 text-[#1D261E] font-bold text-xs"
          >
            <Download className="w-3.5 h-3.5 text-[#E88A1A] mr-1.5" />
            <span>Download PNG</span>
          </button>
        </div>
      </div>
    </div>
  );
};
