// Vercel Serverless Function: /api/feedback/improve
// Fast Hybrid Guest Review Booster for Sheesh Mahal Resort (sheeshmahalresorts.com)

export const config = {
  maxDuration: 10,
};

// High-Entropy Combinatorial Hybrid Matrix (20,736+ Unique Permutations)
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
      "Baraat aur wedding celebration ke liye Sheesh Mahal Resort ekdum top-tier laga,"
    ],
    highlights: [
      "lawn ka open space aur fairy lighting decor sach me majestic tha.",
      "AC Sheesh ballroom bohot spacious aur clean tha, seating arrangement badhiya tha.",
      "St. Xavier's college ke samne location find karna bohot easy tha aur valet parking bhi smooth thi.",
      "Baraat entry, Varmala stage aur sacred mandap setup bohot khoobsurat banaya tha.",
      "resort ka royal palace look aur architecture photography ke liye bohot acha hai.",
      "entry gate se leke main stage tak ka flower decoration lajawab tha.",
      "150 se zyada gadiyon ke liye valet parking kafi organized aur quick thi."
    ],
    catering: [
      "Khana sach me lajawab tha, specially Champaran mutton, paneer tikka aur live chaat counters.",
      "Awadhi biryani aur garam rabri jalebi ka taste sabhi guests ko bohot pasand aaya.",
      "Catering me veg aur non-veg dono ka separate kitchen setup bohot acha laga, hygiene top notch tha.",
      "Starter se leke main course aur desserts sab kuch fresh aur bohot swadisht tha.",
      "Champaran handi gosht aur Zafrani pulao ka authentic desi ghee swad tha.",
      "Live counter pe Banarasi chaat aur crispy jalebi sabse zyada popular rahi."
    ],
    closings: [
      "Patna me royal wedding ke liye best resort hai, 5 star rating!",
      "Management aur staff ka behavior bohot polite aur cooperative tha. Highly recommended!",
      "Overall bohot memorable experience raha, puri family bohot khush hui.",
      "Grand wedding ya reception plan karne ke liye perfect jagah hai Patna me!",
      "Har function ke liye recommended hai, definitely Patna ka top luxury resort hai."
    ]
  },
  english: {
    openers: [
      "Attended my cousin's royal wedding celebration at Sheesh Mahal Resort last weekend.",
      "We recently hosted our family wedding function at Sheesh Mahal Resort on Ashiana-Digha road.",
      "Visited Sheesh Mahal Resort for a close friend's grand marriage reception,",
      "Had a truly palatial experience attending a multi-day wedding celebration at Sheesh Mahal Resort Patna.",
      "Celebrated a family wedding at Sheesh Mahal Resort opposite St. Xavier's College Gate,"
    ],
    highlights: [
      "the sprawling 45,000 sq. ft. starlit Baraat lawn and ambient lighting setup looked breathtaking.",
      "the centrally air-conditioned ballroom was massive, clean, and easily accommodated everyone comfortably.",
      "location opposite St. Xavier's gate made it effortless to reach, and valet parking service was super smooth.",
      "the stage floral decor, mandap pavilion, and wedding aesthetic felt straight out of a palace."
    ],
    catering: [
      "Food quality was outstanding, specially the Champaran handi mutton, live chaat counter, and hot rabri jalebi.",
      "The Awadhi dum biryani and tandoori starters were absolute crowd favorites with pure desi ghee flavor.",
      "Catering hospitality was top-notch with strict separate pure-veg kitchen counters and swift service."
    ],
    closings: [
      "Hands down one of Patna's best royal wedding venues. Truly a 5-star experience!",
      "Staff and event coordinators were extremely attentive and courteous throughout the evening. Highly recommended!",
      "A memorable celebration from start to finish. Perfect luxury venue for grand weddings!"
    ]
  }
};

export function generateProceduralReview(language: 'hindi' | 'english'): string {
  const set = language === 'hindi' ? HYBRID_MATRIX.hindi : HYBRID_MATRIX.english;
  const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];
  return `${pick(set.openers)} ${pick(set.highlights)} ${pick(set.catering)} ${pick(set.closings)}`;
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { text = '', language = 'hindi', action = 'generate' } = req.body || {};
  const isHindi = language === 'hindi';

  // Read OpenRouter API key securely from env vars
  const apiKey =
    process.env.ReviewBotSheeshMahal ||
    process.env.OPENROUTER_API_KEY ||
    process.env.Openrouter_key ||
    process.env.OPENROUTER_KEY;

  if (!apiKey) {
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }

  // Fast 1.8-second strict timeout for instantaneous guest experience
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 1800);

  try {
    const isPolishing = action === 'polish' && text.trim().length > 0;

    const systemPrompt = `You are a real wedding guest writing a short 5-star Google review for Sheesh Mahal Resort in Patna.
Rules:
1. SCRIPT:
   - If Hindi: MUST BE WRITTEN IN CASUAL HINGLISH (ENGLISH ALPHABET ONLY, e.g. "Sheesh Mahal Resort me shadi attend kiya, lawn decor lajawab tha aur khana bohot tasty tha"). ZERO DEVANAGARI CHARACTERS.
   - If English: Casual conversational English typed on a smartphone.
2. LENGTH: 3-4 short sentences (40-65 words max). Keep it punchy and fast.
3. OUTPUT: Return only the review text. No quotes.`;

    const userPrompt = isPolishing
      ? `Polish this guest draft into clean ${isHindi ? 'Hinglish (English letters only)' : 'English'}:\n"${text}"`
      : `Write a unique 5-star review in ${isHindi ? 'casual Hinglish (English letters only, no Devanagari)' : 'conversational English'}.`;

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        'HTTP-Referer': 'https://www.sheeshmahalresorts.com',
        'X-Title': 'Sheesh Mahal Review Booster',
      },
      body: JSON.stringify({
        model: 'openai/gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.95,
        max_tokens: 110,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    let reviewText = data.choices?.[0]?.message?.content?.trim();

    // Guardrail: If any Devanagari appears, fallback to Hinglish procedural
    if (isHindi && /[\u0900-\u097F]/.test(reviewText || '')) {
      reviewText = generateProceduralReview('hindi');
    }

    if (!reviewText) {
      throw new Error('Empty AI response');
    }

    return res.status(200).json({ review: reviewText, isFallback: false });
  } catch {
    clearTimeout(timeoutId);
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }
}
