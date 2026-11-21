// Vercel Serverless Function: /api/feedback/improve
// Primary AI Review Booster & Procedural Fallback for Sheesh Mahal Resort (sheeshmahalresorts.com)

export const config = {
  maxDuration: 15,
};

// Procedural Fallback Generator (Overtakes if AI API times out or network drops)
// Features 8 dynamic structural formats, casual lowercase / small letters, and intentional human mobile typos
export function generateProceduralReview(language: 'hindi' | 'english'): string {
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

  if (language === 'hindi') {
    const venues = [
      "sheesh mahal resort",
      "sheesh mahal resort patna",
      "sheesh mahal",
      "sheesh mahal resort ashiana digha road"
    ];
    const events = [
      "cousin ki shadi",
      "friend ki wedding",
      "family reception function",
      "brother ki marriage",
      "sister ki wedding",
      "relative ka reception",
      "family wedding celebration"
    ];
    const highlights = [
      "lawn decor aur fairy lights sach me beutiful tha",
      "AC ballroom bohot spacious aur clean tha",
      "starlit baraat lawn ka setup ekdum royal palace jaisa tha",
      "stage decoration aur floral arrengement lajawab tha",
      "mandap setup aur lighting decor was amazing",
      "valet parking st xavier gate ke samne bohot smooth thi",
      "palace look aur architecture photography ke liye super h"
    ];
    const caterings = [
      "khana bohot swadist tha speacially champaran handi mutton aur live chaat",
      "awadhi biryani aur garam rabri jalebi sabko bohot pasand aayi",
      "veg aur non veg separate kitchen setup dekh kar acha laga",
      "starter se leke dessert tak sab kuch fresh aur tasty tha",
      "paneer tikka aur champaran gosht ka taste lajawab tha",
      "hot crispy jalebis with rabri was delishus"
    ];
    const staff = [
      "staff bohot halpful aur polite tha",
      "management kafi cooperative aur prompt tha",
      "service bohot quick aur attentive thi",
      "hospitality team was really cooperative"
    ];
    const closings = [
      "best resort in patna, 5 star rating!",
      "shadi ke liye patna ka best resort hai..",
      "highly recomended venue in patna for weddings",
      "overall bohot memorable experiance raha..",
      "definitely the best wedding resort in patna",
      "royal celebration ke liye perfect resort in patna",
      "10/10 experiance.. full family was happy!"
    ];

    const format = Math.floor(Math.random() * 8);
    switch (format) {
      case 0:
        return `${pick(venues)} me ${pick(events)} attend kiya.. ${pick(highlights)} aur ${pick(caterings)}. ${pick(closings)}`.toLowerCase();
      case 1:
        return `${pick(venues)} review: 1. ${pick(highlights)}, 2. ${pick(caterings)}, 3. ${pick(staff)}.. ${pick(closings)}`.toLowerCase();
      case 2:
        return `${pick(caterings)}.. ${pick(venues)} me ${pick(events)} tha, ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
      case 3:
        return `${pick(highlights)}.. photoshoot aur family gathering ke liye ${pick(venues)} best resort in patna hai. ${pick(caterings)}. ${pick(closings)}`.toLowerCase();
      case 4:
        return `hum sabne ${pick(venues)} me ${pick(events)} celebrate kiya.. ${pick(staff)} aur ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
      case 5:
        return `${pick(venues)} is definitely the best resort in patna for weddings.. ${pick(caterings)}. ${pick(closings)}`.toLowerCase();
      case 6:
        return `location opposite st xavier find karna bohot easy tha aur ${pick(staff)}.. ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
      case 7:
      default:
        return `last week ${pick(events)} tha ${pick(venues)} me.. ${pick(caterings)}, aur ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
    }
  } else {
    const venues = [
      "sheesh mahal resort",
      "sheesh mahal resort patna",
      "sheesh mahal"
    ];
    const events = [
      "cousin's royal wedding",
      "family marriage reception",
      "friend's wedding celebration",
      "sister's grand wedding",
      "brother's reception ceremony"
    ];
    const highlights = [
      "the 45000 sq ft lawn and fairy lighting decor looked so beutiful",
      "grand AC ballroom was super spacious and clean",
      "palace architecture and stage floral arrengement was breathtaking",
      "valet parking opposite st xavier made arrival effortless",
      "mandap setup and photo spots were straight out of a royal film"
    ];
    const caterings = [
      "food was so tasty speacially the champaran mutton and live chaat counters",
      "awadhi biryani and hot rabri jalebi was a huge hit with all guests",
      "strict separate pure veg kitchen line and top notch hygiene was impressive",
      "starters and main course were both super fresh and delishus",
      "hot crispy jalebis and paneer tikkas were top quality"
    ];
    const staff = [
      "staff was very halpful and courteous throughout the evening",
      "banquet management was prompt and attentive",
      "hospitality team took care of every small detail"
    ];
    const closings = [
      "hands down the best resort in patna for weddings!",
      "truly a 5 star royal experiance.. highly recomended!",
      "best luxury resort in patna, 10/10 service",
      "perfect venue for grand family celebrations in patna",
      "definitely the best wedding resort in patna.. loved it!"
    ];

    const format = Math.floor(Math.random() * 8);
    switch (format) {
      case 0:
        return `attended ${pick(events)} at ${pick(venues)}.. ${pick(highlights)} and ${pick(caterings)}. ${pick(closings)}`.toLowerCase();
      case 1:
        return `${pick(venues)} review: 1. ${pick(highlights)}, 2. ${pick(caterings)}, 3. ${pick(staff)}.. ${pick(closings)}`.toLowerCase();
      case 2:
        return `${pick(caterings)}.. was at ${pick(venues)} for ${pick(events)}, ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
      case 3:
        return `${pick(highlights)}.. for photos and royal vibes ${pick(venues)} is the best resort in patna. ${pick(closings)}`.toLowerCase();
      case 4:
        return `hosted our ${pick(events)} at ${pick(venues)}.. ${pick(staff)} and ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
      case 5:
        return `${pick(venues)} is definitely the best resort in patna for weddings.. ${pick(caterings)}. ${pick(closings)}`.toLowerCase();
      case 6:
        return `location right opp st xavier was super convenient and ${pick(staff)}.. ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
      case 7:
      default:
        return `celebrated ${pick(events)} at ${pick(venues)}.. ${pick(caterings)}, and ${pick(highlights)}. ${pick(closings)}`.toLowerCase();
    }
  }
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

  // Fallback if no API key is configured
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
      // Polish Prompt: ONLY correct spelling mistakes, preserve casual small letters & grammar
      systemPrompt = `You are a helpful spell-checking assistant for mobile Google reviews.
STRICT INSTRUCTIONS:
1. ONLY CORRECT SPELLING MISTAKES (e.g. fix obvious typos like "beutiful" -> "beautiful", "speacially" -> "specially", "arrengement" -> "arrangement", "swadist" -> "swadisht", "halpful" -> "helpful").
2. DO NOT CHANGE CASING TO TITLE CASE. PREFER SMALL LETTERS / CASUAL LOWERCASE.
3. DO NOT CORRECT CASUAL GRAMMAR, RUN-ON SENTENCES, OR INFORMAL MOBILE PHRASING.
4. PRESERVE THE EXACT HUMAN VOICE, SLANG, EMOTION, AND SENTENCE STRUCTURE INTACT.
5. If the text is in Hinglish, KEEP IT STRICTLY IN LATIN / ENGLISH SCRIPT. NEVER output Devanagari script.
6. Return ONLY the polished review text without quotes, explanations, or markdown.`;

      userPrompt = `Please fix only the spelling mistakes in this review, keeping its grammar and small letters natural:\n"${text}"`;
    } else {
      // Generate Prompt: Real human typing on smartphone, small letters, random formats, natural quirks
      systemPrompt = `You are a real human wedding guest writing a short 5-star Google review for Sheesh Mahal Resort in Patna from your smartphone.
Resort context:
- Located opposite St. Xavier's College Gate, Ashiana-Digha Road, Patna.
- Known as the best resort in patna for royal weddings, 45,000 sq ft starlit Baraat lawn, 1,200 AC Sheesh ballroom, Vedic Mandap, smooth valet parking.
- Catering: Royal Awadhi Dum Biryani, Champaran Handi meat, hot rabri jalebi, live chaat stalls, 100% separate pure-veg kitchen.

CRITICAL GOOGLE AUTHENTICITY & MULTI-FORMAT RULES:
1. CASING: WRITE IN SMALL LETTERS / LOWERCASE (casual phone typing). Do NOT capitalize every word, avoid formal Title Case. Small letters feel authentic.
2. RANDOM FORMAT: Pick 1 of these formats at random for every review:
   - Format A: Short punchy 1-2 sentence quick reaction.
   - Format B: Casual note/numbered points (e.g. "sheesh mahal review: 1. lawn decor, 2. food, 3. parking.. best resort in patna").
   - Format C: Food & catering focus (starters, Champaran mutton, rabri jalebi, pure veg separate kitchen).
   - Format D: Lawn & photography focus (huge lawn, stage floral decor, palace vibe for family photos).
   - Format E: Family emotional celebration (brother/sister/cousin wedding, all relatives delighted).
   - Format F: Valet & hospitality focus (location opp St. Xavier, smooth valet parking, polite staff).
3. SCRIPT:
   - If Hindi: CASUAL HINGLISH USING ENGLISH ALPHABET ONLY (e.g., "sheesh mahal resort me cousin ki shadi attend kiya, lawn decor lajawab tha aur khana bohot swadist tha.. best resort in patna"). ZERO DEVANAGARI CHARACTERS.
   - If English: Casual conversational English typed on a smartphone.
4. HUMAN TYPOS & CASUAL GRAMMAR:
   - Intentionally include 1 or 2 minor casual mobile spelling slips (e.g. "beutiful", "speacially", "arrengement", "halpful", "experiance", "recomended", "delishus", "lajwab", "swadist", "boht") and informal grammar fragments.
   - Naturally mention "sheesh mahal resort" and keywords like "best resort in patna".
5. LENGTH: 25 to 55 words. Never identical.
6. OUTPUT: Raw review text only. No quotes, no markdown.`;

      // Random entropy seed & format selector to guarantee unique reviews every time
      const randomSeed = Math.floor(Math.random() * 1000000);
      const formatHints = [
        "short punchy reaction",
        "casual numbered points note",
        "food and catering focus",
        "lawn and photography focus",
        "family emotional celebration",
        "valet parking and hospitality focus"
      ];
      const selectedFormat = formatHints[Math.floor(Math.random() * formatHints.length)];

      userPrompt = `Write a fresh, unidentical 5-star review in mostly small letters / lowercase for Sheesh Mahal Resort in ${
        isHindi ? 'casual Hinglish (English letters only, no Devanagari)' : 'natural conversational English'
      }. Style format: ${selectedFormat}. Include natural typos. Seed: ${randomSeed}`;
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
        temperature: 0.98,
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

    // Ensure casual lowercase tone as requested
    reviewText = reviewText.toLowerCase();

    return res.status(200).json({ review: reviewText, isFallback: false });
  } catch {
    clearTimeout(timeoutId);
    // Multi-format procedural generator overtakes if AI is delayed or network issue occurs
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }
}
