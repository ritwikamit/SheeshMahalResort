// Vercel Serverless Function: /api/feedback/improve
// Primary AI Review Booster & Procedural Fallback for Sheesh Mahal Resort (sheeshmahalresorts.com)

export const config = {
  maxDuration: 15,
};

// Procedural Fallback Matrix (Overtakes ONLY if AI API times out or fails)
// Features intentional human mobile typing quirks (informal grammar, natural wording)
const PROCEDURAL_MATRIX = {
  hindi: {
    openers: [
      "Sheesh Mahal Resort me cousin ki grand wedding thi,",
      "Last weekend family wedding function me Sheesh Mahal Resort gaye the,",
      "Patna me Ashiana Digha road pe Sheesh Mahal Resort bohot hi royal venue hai,",
      "Humne brother ki shadi ke liye Sheesh Mahal Resort book kiya tha,",
      "Recently ek relative ki marriage reception me Sheesh Mahal Resort gaye the,",
      "Sheesh Mahal Resort me celebration ka experience sach me royal tha,",
      "Friend ki wedding me pehli baar Sheesh Mahal Resort jana hua,",
      "Shadi attend kiya Sheesh Mahal Resort me St. Xavier's college ke samne,",
      "Family ke sath Sheesh Mahal Resort me marriage reception attend kiya,"
    ],
    highlights: [
      "lawn ka open space aur fairy lighting decor sach me majestic tha.",
      "AC Sheesh ballroom bohot spacious aur clean tha, seating arrangement badhiya tha.",
      "St. Xavier's college ke samne location find karna bohot easy tha aur valet parking bhi smooth thi.",
      "Baraat entry, Varmala stage aur sacred mandap setup bohot khoobsurat banaya tha.",
      "resort ka royal palace look aur architecture photography ke liye bohot acha hai.",
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
      "Had a truly palatial experience attending a wedding celebration at Sheesh Mahal Resort Patna.",
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
  const set = language === 'hindi' ? PROCEDURAL_MATRIX.hindi : PROCEDURAL_MATRIX.english;
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

  // Fallback if no API key is available
  if (!apiKey) {
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }

  // 3.5s timeout for AI response before procedural engine overtakes
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 3500);

  try {
    const isPolishing = action === 'polish' && text.trim().length > 0;

    let systemPrompt = '';
    let userPrompt = '';

    if (isPolishing) {
      // Polish Prompt: ONLY correct spelling mistakes, preserve casual grammar & phrasing
      systemPrompt = `You are a helpful spell-checking assistant for mobile Google reviews.
STRICT INSTRUCTIONS:
1. ONLY CORRECT SPELLING MISTAKES (e.g. fix obvious typos like "beutiful" -> "beautiful", "speacially" -> "specially", "arrengement" -> "arrangement", "swadist" -> "swadisht").
2. DO NOT CORRECT CASUAL GRAMMAR, RUN-ON SENTENCES, OR INFORMAL MOBILE PHRASING.
3. PRESERVE THE EXACT HUMAN VOICE, SLANG, EMOTION, AND SENTENCE STRUCTURE INTACT.
4. If the text is in Hinglish, KEEP IT STRICTLY IN LATIN / ENGLISH SCRIPT. NEVER output Devanagari script.
5. Return ONLY the polished review text without quotes, explanations, or markdown.`;

      userPrompt = `Please fix only the spelling mistakes in this review, keeping its grammar and tone natural:\n"${text}"`;
    } else {
      // Generate Prompt: Real human typing on mobile, unidentical every time, natural quirks
      systemPrompt = `You are a real human wedding guest writing a short 5-star Google review for Sheesh Mahal Resort in Patna from your smartphone.
Resort context:
- Located opposite St. Xavier's College Gate, Ashiana-Digha Road, Patna.
- Features: 45,000+ sq ft starlit Baraat lawn, 1,200 AC Sheesh ballroom, consecrated Vedic Mandap, smooth valet parking.
- Catering: Royal Awadhi Dum Biryani, Champaran Handi meat, hot rabri jalebi, live chaat stalls, 100% separate pure-veg kitchen line.

CRITICAL GOOGLE AUTHENTICITY & HUMAN VARIATION RULES:
1. SCRIPT:
   - If Hindi: MUST BE WRITTEN IN CASUAL HINGLISH USING ENGLISH ALPHABET ONLY (e.g., "Sheesh Mahal Resort me cousin ki shadi thi, decor lajawab tha aur khana bohot swadisht tha"). ZERO DEVANAGARI CHARACTERS.
   - If English: Casual conversational English typed on a smartphone.
2. UNIDENTICAL & DIVERSE EVERY TIME:
   - Randomly vary the guest perspective: bride's side, groom's friend, cousin, family reception, or multi-day wedding.
   - Pick different distinct highlights each time (e.g. valet parking ease, Champaran gosht flavor, lawn fairy lights, ballroom AC comfort, mandap floral arch).
3. NATURAL HUMAN QUIRKS:
   - Intentionally include 1 or 2 minor casual mobile spelling slips (e.g. "beutiful", "tasty", "speacially", "arrengement", "recieved", "defintly", "delishus", "lajwab") and informal casual grammar fragments (e.g. "Specially paneer starter was top notch.", "Ambience totally royal.", "Overall very happy with service."). This makes the review pass Google review policy as genuine human experience.
4. LENGTH: 3 to 4 punchy sentences (40 to 65 words).
5. OUTPUT: Output ONLY the raw review text. No quotation marks, no preamble, no markdown.`;

      // Add a randomized entropy seed to ensure AI generates unidentical reviews on every request
      const randomSeed = Math.floor(Math.random() * 1000000);
      userPrompt = `Write a fresh, unidentical 5-star review for Sheesh Mahal Resort in ${
        isHindi ? 'casual Hinglish (English letters only, no Devanagari)' : 'natural conversational English'
      }. Seed: ${randomSeed}`;
    }

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
        max_tokens: 120,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`OpenRouter error status ${response.status}`);
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
    // Procedural generator overtakes if AI is delayed or network issue occurs
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }
}
