// Vercel Serverless Function: /api/feedback/improve
// Primary AI Review Booster & Procedural Fallback for Sheesh Mahal Resort (sheeshmahalresorts.com)

export const config = {
  maxDuration: 15,
};

// Procedural Fallback Generator (Overtakes if AI API times out or network drops)
// Features totally random human styles: some lazy (1-liners), some detailed, some medium, with intentional typos in small letters.
// Strictly avoids starting reviews with "Sheesh Mahal Resort" - uses diverse real-human starting angles!
export function generateProceduralReview(language: 'hindi' | 'english'): string {
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const roll = Math.random();

  if (language === 'hindi') {
    // 1. LAZY TIER (~35% chance): Ultra short 1-line mobile reaction (8 to 15 words)
    // NEVER starts with "sheesh mahal resort"
    if (roll < 0.35) {
      const lazyReviews = [
        "khana mast tha aur lawn bhi kafi bada h.. best resort in patna",
        "attended wedding here last night.. food was very tasty speacially starter. 5 star",
        "bht badiya arrengement thaa.. champaran mutton was just lajwab",
        "patna me best resort h shadi k liye.. 10/10 experiance",
        "superb lawn and food.. highly recomended in patna!",
        "bhai ki shadi me gye the bht maza aya.. sheesh mahal best h",
        "valet parking smooth thi aur AC hall clean tha.. good experiance",
        "food was so tasty and lawn is massive.. best wedding resort in patna",
        "location easy h opp st xavier aur staff bhi halpful tha.. 5 stars",
        "shadi k liye ekdum mast jagah h.. khana 10/10",
        "cousin reception attend kiya tha, decor lajwab tha.. recomended to all",
        "champaran handi mutton and jalebi rabri was super delishus.. loved it",
        "bht khoobsurat venue h.. lawn lighting top notch thi",
        "shadi attend kiya tha.. khana lajwab aur staff polite tha. 5/5",
        "patna me aisi shandar jagah nahi dekhi.. perfect for royal wedding",
        "decor and khana dono 1st class tha.. fully satisfied with sheesh mahal",
        "live chaat counter aur biryani bht tasty thi.. 5 star review",
        "lawn ka open space kafi bada h, photoshoot k liye best jagah"
      ];
      return pick(lazyReviews).toLowerCase();
    }

    // 2. DETAILED TIER (~25% chance): Rich 3-4 sentence guest memory (35 to 55 words)
    // Starts with event, food, or lawn — NOT venue name
    if (roll > 0.75) {
      const detailedOpeners = [
        "last week cousin ki grand wedding thi ashiana digha road pe.",
        "recently ek relative ka marriage reception attend kiya opp st xavier.",
        "attended a royal wedding ceremony opposite st xavier college gate.",
        "humne brother ka wedding reception celebrate kiya recently."
      ];
      const detailedLawn = [
        "sheesh mahal ka lawn fairy lights aur flower decor sach me royal vibe de rha tha.",
        "open baraat lawn boht bada tha aur mandap setup was looking like a dream.",
        "AC Sheesh ballroom boht spacious tha easily sabhi guests comfortably baith gaye."
      ];
      const detailedFood = [
        "khana boht lajawab tha speacially champaran handi mutton and awadhi biryani, veg kitchen bhi alag tha jo bht acha laga.",
        "catering service top notch thi, live chaat counter aur hot rabri jalebi was pure bliss.",
        "starters se leke dessert tak sab kuch fresh tha, paneer tikka aur mutton authentic taste tha."
      ];
      const detailedService = [
        "valet parking smooth thi aur staff pure time attentive tha.",
        "management team kafi cooperative tha aur service prompt thi.",
        "location reach karna boht easy tha opp st xavier."
      ];
      const detailedClosing = [
        "definitely sheesh mahal patna ka best resort h shadi k liye.. 5 star rating!",
        "overall boht memorable experiance raha, highly recomended to everyone!",
        "grand shadi plan karne ke liye best venue h patna me.. loved it."
      ];
      return `${pick(detailedOpeners)} ${pick(detailedLawn)} ${pick(detailedFood)} ${pick(detailedService)} ${pick(detailedClosing)}`.toLowerCase();
    }

    // 3. CASUAL MEDIUM TIER (~40% chance): 1-2 rambling sentences with diverse starters (18 to 32 words)
    // 5 different start angles: food-first, event-first, lawn-first, parking-first, emotion-first
    const angle = Math.floor(Math.random() * 5);

    if (angle === 0) {
      // Food-first
      const foods = [
        "khana bht swadist thaa speacially live chaat and mutton..",
        "champaran handi mutton aur rabri jalebi was super delishus..",
        "pure veg aur non veg ka separate kitchen arrangement bht acha laga..",
        "awadhi biryani aur paneer starter sabhi guests ko pasand aaya..",
        "starter se leke dessert tak sab fresh aur tasty thaa.."
      ];
      const middles = [
        "sheesh mahal resort me cousin ki shadi attend kiya tha",
        "decor was so beutiful and stage setup looked like a palace",
        "lawn area is massive aur lighting decoration shandar tha",
        "starlit baraat lawn me entry sach me royal lag rha tha"
      ];
      const closings = [
        "best resort in patna for weddings.. 5 stars!",
        "overall bht acha experiance raha.. definitely recomended",
        "puri family khush ho gyi.. 10/10 service",
        "shadi k liye patna me best option h.."
      ];
      return `${pick(foods)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else if (angle === 1) {
      // Event-first
      const events = [
        "cousin ki shadi me gye the last week..",
        "friend ki wedding reception attend kiya opp st xavier..",
        "humne family function celebrate kiya sheesh mahal me..",
        "brother ki marriage ceremony thi last weekend..",
        "relative ka grand reception attend kiya tha.."
      ];
      const middles = [
        "lawn decor was so beutiful and stage setup looked like a palace",
        "khana boht swadist tha speacially champaran mutton aur biryani",
        "AC hall was clean and comfortable seating arrangement tha",
        "valet parking quick thi aur photo spots boht badiya the"
      ];
      const closings = [
        "sheesh mahal resort is definitely the best resort in patna",
        "highly recomended to all friends in patna for weddings",
        "overall bht badiya experiance raha.. 5 star",
        "royal celebration k liye perfect resort h patna me"
      ];
      return `${pick(events)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else if (angle === 2) {
      // Lawn/Decor-first
      const lawns = [
        "lawn decor aur fairy lights sach me beutiful tha..",
        "stage setup and flower arrengement ekdum royal tha..",
        "bht bada aur spacious baraat lawn h..",
        "mandap setup was looking like a dream palace.."
      ];
      const middles = [
        "sheesh mahal me wedding attend kiya, khana bhi lajwab tha",
        "photoshoot ke liye best venue h patna me aur staff halpful tha",
        "champaran mutton aur live chaat counter sabhi guests ko bht pasand aaya",
        "AC ballroom clean tha aur seating arrangement super"
      ];
      const closings = [
        "patna me best resort h shadi k liye.. 10/10",
        "highly recomended venue in patna.. loved it",
        "shadi k liye best option h, 5 star rating!"
      ];
      return `${pick(lawns)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else if (angle === 3) {
      // Parking/Convenience-first
      const parkings = [
        "st xavier gate k samne location reach krna bht easy tha..",
        "valet parking super smooth thi despite huge crowd..",
        "ashiana digha road pe ekdum premier property h..",
        "parking hassle-free thi aur entrance decor royal tha.."
      ];
      const middles = [
        "sheesh mahal me wedding function attend kiya, food was 10/10",
        "lawn area boht spacious h aur staff kafi polite tha",
        "champaran handi meat aur jalebi rabri was pure bliss",
        "stage lighting and ambience was totally 5 star"
      ];
      const closings = [
        "best wedding resort in patna.. definitely recomended",
        "overall great experiance.. full family was happy",
        "shadi plan krne k liye top luxury venue h"
      ];
      return `${pick(parkings)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else {
      // Reaction/Emotion-first
      const reactions = [
        "patna me aisi royal wedding nahi dekhi..",
        "superb arrangement and wonderful royal vibe..",
        "bhai ki shadi k liye book kiya tha, sab relatives tareef kr rhe the..",
        "overall boht memorable experiance raha wedding me.."
      ];
      const middles = [
        "sheesh mahal ka lawn aur lighting decor sach me zabardast tha",
        "khana boht swadist tha speacially mutton aur live chaats",
        "AC banquet hall clean tha aur service prompt thi",
        "valet parking smooth thi aur staff very halpful"
      ];
      const closings = [
        "definitely the best resort in patna for weddings!",
        "10/10 experiance.. highly recomended",
        "royal wedding plan karne ke liye perfect venue"
      ];
      return `${pick(reactions)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    }
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
        "attended cousin reception here, awesome food and ambience",
        "palace vibe and great hospitality.. highly recommended"
      ];
      return pick(lazyReviews).toLowerCase();
    }

    if (roll > 0.75) {
      const detailedOpeners = [
        "attended a royal wedding ceremony opposite st xavier college gate last weekend.",
        "hosted our family marriage reception on ashiana digha road recently.",
        "was at cousin's grand wedding celebration opp st xavier gate."
      ];
      const detailedLawn = [
        "the 45000 sq ft starlit lawn at sheesh mahal was looking breathtaking with royal palace lighting.",
        "centrally air conditioned ballroom was huge and easily accommodated all guests comfortably.",
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
      return `${pick(detailedOpeners)} ${pick(detailedLawn)} ${pick(detailedFood)} ${pick(detailedService)} ${pick(detailedClosing)}`.toLowerCase();
    }

    const angle = Math.floor(Math.random() * 4);
    if (angle === 0) {
      // Food-first
      const foods = [
        "food was delicious speacially champaran handi meat and live chaats..",
        "awadhi biryani and hot crispy jalebis were crowd favorites..",
        "super hygiene with separate pure veg kitchen line was impressive..",
        "starters and desserts both tasted authentic and fresh.."
      ];
      const middles = [
        "attended wedding at sheesh mahal resort last night",
        "lawn decor was so beutiful and stage setup was straight out of a palace",
        "open lawn area was massive with stunning lighting"
      ];
      const closings = [
        "best resort in patna for weddings.. highly recomended!",
        "overall a wonderful 5 star experiance.. 10/10",
        "definitely the top luxury wedding resort in patna"
      ];
      return `${pick(foods)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else if (angle === 1) {
      // Lawn-first
      const lawns = [
        "huge open lawn and fairy lighting looked stunning for family photos..",
        "stage floral decor and mandap setup looked straight out of a palace..",
        "centrally air conditioned ballroom was clean and comfortable..",
        "grand baraat lawn entrance was pure royalty.."
      ];
      const middles = [
        "was at sheesh mahal for cousin's marriage celebration",
        "food was so tasty speacially paneer tikka and mutton",
        "valet parking was effortless and staff was halpful"
      ];
      const closings = [
        "best wedding venue in patna.. 5 stars!",
        "all our family guests were super happy.. loved it",
        "highly recomended to everyone in patna"
      ];
      return `${pick(lawns)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else if (angle === 2) {
      // Location/Parking-first
      const parkings = [
        "location right opp st xavier was super convenient to reach..",
        "valet parking was smooth despite heavy wedding crowd..",
        "ashiana digha road location made arrival hassle free.."
      ];
      const middles = [
        "attended reception at sheesh mahal resort",
        "lawn decor and stage lighting was gorgeous",
        "catering service was top notch with authentic taste"
      ];
      const closings = [
        "hands down the best resort in patna for weddings",
        "great experiance.. 5 star rating!",
        "perfect venue for royal celebrations"
      ];
      return `${pick(parkings)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
    } else {
      // Event-first
      const events = [
        "attended cousin's wedding celebration last weekend..",
        "visited for a friend's marriage reception opp st xavier..",
        "hosted our family celebration at sheesh mahal..",
        "celebrated brother's royal wedding here.."
      ];
      const middles = [
        "lawn decor was so beutiful and food was top notch",
        "champaran mutton and live chaat counters was delicious",
        "AC ballroom easily accommodated everyone and staff was halpful"
      ];
      const closings = [
        "sheesh mahal is definitely the best resort in patna",
        "truly a 5 star royal experiance.. highly recomended!",
        "10/10 service throughout the evening"
      ];
      return `${pick(events)} ${pick(middles)}.. ${pick(closings)}`.toLowerCase();
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
      // Generate Prompt: Real human typing on smartphone, completely random starting words, some lazy, some detailed
      systemPrompt = `You are a normal human wedding guest writing a genuine Google review for Sheesh Mahal Resort in Patna from your smartphone.
Resort context: Sheesh Mahal Resort, Ashiana-Digha Road, opposite St. Xavier's College Gate, Patna. Famous as the best resort in patna for weddings, huge 45,000 sq ft lawn, AC ballroom, Champaran handi meat, Awadhi biryani, hot rabri jalebi, live chaat, valet parking.

CRITICAL INSTRUCTIONS FOR 100% REAL HUMAN VARIATION:
1. NEVER START WITH "Sheesh Mahal Resort" or "Sheesh Mahal"!
   - Real Google reviewers almost NEVER start by typing the resort's name, because they are already on the resort's Google page!
   - RANDOMLY START WITH:
     * Food first (e.g. "khana bht swadist thaa...", "starter se leke main course...", "champaran handi mutton was lajwab...", "food was so delicious...")
     * Event first (e.g. "cousin ki shadi me gye the...", "attended friend's reception last night...", "brother ka wedding function tha...")
     * Lawn / decor first (e.g. "lawn decor aur fairy lights sach me beutiful tha...", "stage setup looked like a royal palace...", "huge open lawn area...")
     * Location / parking first (e.g. "st xavier k samne location reach krna easy tha...", "valet parking was super smooth...", "location opp st xavier...")
     * Direct reaction / vibe first (e.g. "patna me aisi shadi nahi dekhi...", "superb arrangement and royal vibe...", "overall 10/10 experiance...")
   - Mention "sheesh mahal" or "sheesh mahal resort" naturally in the middle or near the end of the review!
2. NO FIXED FORMAT! DO NOT follow any predictable template, bullet points, or formula. Be totally random like real people on Google Reviews!
3. RANDOMLY VARY REVIEWER STYLE FOR EVERY REVIEW:
   - 35% LAZY REVIEW: Ultra short, quick mobile typing (6 to 14 words only). E.g. "khana mast tha aur lawn bhi kafi bada h.. best resort in patna 5 star" or "bht badiya arrengement thaa, speacially mutton was lajwab.. 10/10"
   - 40% CASUAL MEDIUM: 1 or 2 natural rambling sentences (18 to 32 words).
   - 25% DETAILED STORY: 3-4 casual sentences describing the evening, food, and vibe (35 to 55 words).
4. WRITE IN SMALL LETTERS / LOWERCASE. Normal people on smartphones type fast in lowercase without formal capitalization.
5. INTENTIONAL HUMAN ERRORS & CASUAL SLANG:
   - Add intentional minor spelling mistakes & texting shortcuts:
     * Hindi/Hinglish: "bht" or "boht", "h" (for hai), "kr" (for kar), "k" (for ke), "gye" (for gaye), "thaa", "speacially", "beutiful", "arrengement", "halpful", "experiance", "recomended", "delishus", "lajwab", "swadist".
     * English: "beutiful", "speacially", "arrengement", "halpful", "experiance", "recomended", "delishus".
   - Informal grammar, loose run-on thoughts, casual double dots (..), missing commas.
6. SCRIPT:
   - If Hindi: CASUAL HINGLISH USING ENGLISH LETTERS ONLY (e.g. "cousin ki shadi me gye the, lawn decor lajwab tha.. best resort in patna"). ABSOLUTELY ZERO DEVANAGARI CHARACTERS.
   - If English: Everyday casual English typed on a mobile.
7. OUTPUT: Raw review text ONLY. No quotes, no prefix, no explanations.`;

      // Random style roll to actively dictate variety to the LLM
      const styleRoll = Math.random();
      const styleType =
        styleRoll < 0.35
          ? 'lazy ultra-short 1-liner (8 to 14 words only, very brief)'
          : styleRoll < 0.75
          ? 'casual medium 1-2 rambling sentences (18 to 30 words)'
          : 'detailed guest story describing the lawn, food and evening (35 to 50 words)';

      const startingAngles = [
        'start with the food or catering taste',
        'start with the event (cousin/friend/brother wedding)',
        'start with the lawn, lighting or stage decor',
        'start with valet parking or location opposite st xavier',
        'start with a casual direct reaction or emotional praise'
      ];
      const selectedAngle = startingAngles[Math.floor(Math.random() * startingAngles.length)];
      const randomSeed = Math.floor(Math.random() * 1000000);

      userPrompt = `Write a completely random, human Google review in small letters / lowercase for Sheesh Mahal Resort in ${
        isHindi ? 'casual Hinglish (English letters only, no Devanagari)' : 'natural conversational English'
      }. Starting angle: ${selectedAngle} (DO NOT start with "Sheesh Mahal Resort"). Reviewer style: ${styleType}. Add intentional typos and casual mobile grammar. Do NOT follow any fixed format. Seed: ${randomSeed}`;
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

    // Guardrail: If the review still begins with "sheesh mahal resort", strip or rephrase the opening
    if (reviewText.startsWith('sheesh mahal resort ') || reviewText.startsWith('sheesh mahal ')) {
      const cleaned = reviewText.replace(/^sheesh mahal( resort)?\s*(me\b|pe\b|par\b|ke\b|ka\b|is\b|was\b)?\s*/i, '');
      if (cleaned.length > 15) {
        reviewText = cleaned.trim();
      }
    }

    return res.status(200).json({ review: reviewText, isFallback: false });
  } catch {
    clearTimeout(timeoutId);
    // Multi-style procedural generator overtakes if AI is delayed or network issue occurs
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }
}
