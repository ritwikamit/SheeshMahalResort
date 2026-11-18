// Vercel Serverless Function: /api/feedback/improve
// Guest Review Booster for Sheesh Mahal Resort (sheeshmahalresorts.com)

export const config = {
  maxDuration: 15,
};

// Combinatorial Procedural Generator (Instant Fallback & Offline Diversity)
const PROCEDURAL_GENERATOR = {
  hindi: {
    openers: [
      "Sheesh Mahal Resort me cousin ki shadi attend kiya tha,",
      "Last weekend Sheesh Mahal Resort me family wedding function tha,",
      "Patna me Ashiana Digha road pe Sheesh Mahal Resort bohot hi shandaar venue hai,",
      "Humne brother ki shadi ke liye Sheesh Mahal Resort choose kiya tha,",
      "Recently ek grand marriage reception attend karne Sheesh Mahal Resort gaye the,",
      "Sheesh Mahal Resort me shadi ka experience sach me royal tha,"
    ],
    highlights: [
      "lawn ka space aur grand lighting decor ekdum lajawab tha.",
      "AC Sheesh ballroom bohot spacious aur clean tha, stage arrangement bhi royal tha.",
      "St. Xavier's college gate ke bilkul samne location dhundhna bohot easy tha aur valet parking bhi smooth thi.",
      "Baraat entry aur sacred mandap setup ka mahaul bohot khoobsurat aur grand tha.",
      "resort ka ambience bohot aesthetic hai, family photos aur video ke liye perfect spots the."
    ],
    catering: [
      "Khana sach me lajawab tha, specially Champaran meat, paneer tikka aur live chaat counters.",
      "Awadhi biryani aur garam rabri jalebi ka taste sabhi guests ko bohot pasand aaya.",
      "Catering me veg aur non-veg dono ka separate kitchen setup bohot acha laga, hygiene top notch tha.",
      "Starter se leke main course aur desserts sab kuch fresh aur bohot swadisht tha."
    ],
    closings: [
      "Patna me royal wedding ke liye best resort hai, 5 star rating!",
      "Management aur staff ka behavior bohot polite aur cooperative tha. Highly recommended!",
      "Overall bohot memorable celebration raha, puri family bohot khush hui.",
      "Grand wedding ya reception plan karne ke liye perfect jagah hai Patna me!"
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

export function generateProceduralReview(language: 'hindi' | 'english'): string {
  const set = language === 'hindi' ? PROCEDURAL_GENERATOR.hindi : PROCEDURAL_GENERATOR.english;
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

  // Read OpenRouter API key securely from priority env vars
  const apiKey =
    process.env.ReviewBotSheeshMahal ||
    process.env.OPENROUTER_API_KEY ||
    process.env.Openrouter_key ||
    process.env.OPENROUTER_KEY;

  if (!apiKey) {
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }

  // 3-second strict timeout AbortController for instant UI responsiveness
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3000);

  try {
    const isPolishing = action === 'polish' && text.trim().length > 0;

    const systemPrompt = `You are a real wedding guest writing a short, authentic 5-star Google review for Sheesh Mahal Resort in Patna.
Resort context:
- Located opposite St. Xavier's College Gate, Ashiana-Digha Road, Patna.
- Features: 45,000+ sq ft starlit Baraat lawn, 1,200-capacity central AC Sheesh ballroom, consecrated Vedic Mandap, smooth valet parking.
- Catering: Royal Awadhi Dum Biryani, Champaran Handi meat, hot rabri jalebi, live chaat stalls, 100% separate pure-veg kitchen.

STRICT INSTRUCTIONS:
1. LANGUAGE:
   - If language is 'hindi': MUST be written in casual Hinglish using English letters / Latin alphabet ONLY (e.g. "Sheesh Mahal Resort me shadi attend kiya, lawn decor lajawab tha aur khana bohot tasty tha"). NEVER output Devanagari script (no हिन्दी अक्षर).
   - If language is 'english': Natural conversational English typed on a smartphone.
2. AUTHENTICITY & VOICE:
   - Emulate a real guest typing from their phone with natural flow and human warmth.
   - Mention 1-2 specific details naturally (e.g., valet parking, Champaran mutton, lawn lighting, or courteous staff).
   - Keep length to 3-4 punchy sentences (40-75 words).
${isPolishing ? '3. POLISHING: Polish the guest draft by fixing typos and smoothing grammar while strictly preserving all their personal thoughts and mentions. Do NOT make it sound like marketing PR.' : '3. FRESH REVIEW: Generate a brand new, highly authentic 5-star review.'}
4. OUTPUT:
   - Return ONLY the final review text. No quotes, no preamble, no markdown.`;

    const userPrompt = isPolishing
      ? `Guest draft to polish (${isHindi ? 'Hinglish Latin script only' : 'English'}):\n"${text}"`
      : `Generate a 5-star review in ${isHindi ? 'casual Hinglish (Latin letters only, no Devanagari)' : 'conversational English'}.`;

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
        max_tokens: 220,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenRouter returned status ${response.status}`);
    }

    const data = await response.json();
    let reviewText = data.choices?.[0]?.message?.content?.trim();

    // Guardrail: If Hindi returned Devanagari by mistake, fallback to Hinglish procedural
    if (isHindi && /[\u0900-\u097F]/.test(reviewText || '')) {
      reviewText = generateProceduralReview('hindi');
    }

    if (!reviewText) {
      throw new Error('Empty AI response');
    }

    return res.status(200).json({ review: reviewText, isFallback: false });
  } catch (err) {
    clearTimeout(timeoutId);
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }
}
