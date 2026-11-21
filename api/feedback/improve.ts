// Vercel Serverless Function: /api/feedback/improve
// Primary AI Review Booster & Procedural Fallback for Sheesh Mahal Resort (sheeshmahalresorts.com)

export const config = {
  maxDuration: 15,
};

// Procedural Fallback Generator (Overtakes if AI API times out or network drops)
// Features totally random human styles: some lazy (1-liners), some detailed, some medium, with intentional typos in small letters
export function generateProceduralReview(language: 'hindi' | 'english'): string {
  const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
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
      // Generate Prompt: Real human typing on smartphone, completely random, some lazy, some detailed
      systemPrompt = `You are a normal human wedding guest writing a genuine Google review for Sheesh Mahal Resort in Patna from your smartphone.
Resort context: Sheesh Mahal Resort, Ashiana-Digha Road, opposite St. Xavier's College Gate, Patna. Famous as the best resort in patna for weddings, huge 45,000 sq ft lawn, AC ballroom, Champaran handi meat, Awadhi biryani, hot rabri jalebi, live chaat, valet parking.

CRITICAL INSTRUCTIONS FOR 100% REAL HUMAN VARIATION:
1. NO FIXED FORMAT! DO NOT follow any predictable template, bullet points, or formula. Be totally random like real people on Google Reviews!
2. RANDOMLY VARY REVIEWER STYLE FOR EVERY REVIEW:
   - 35% LAZY REVIEW: Ultra short, quick mobile typing (6 to 14 words only). E.g. "khana mast tha aur lawn bhi kafi bada h.. sheesh mahal resort best h patna me" or "superb lawn and food.. highly recomended in patna 5 stars"
   - 40% CASUAL MEDIUM: 1 or 2 natural rambling sentences (18 to 32 words).
   - 25% DETAILED STORY: 3-4 casual sentences describing the evening, food, and vibe (35 to 55 words).
3. WRITE IN SMALL LETTERS / LOWERCASE. Normal people on smartphones type fast in lowercase without formal capitalization.
4. INTENTIONAL HUMAN ERRORS & CASUAL SLANG:
   - Add intentional minor spelling mistakes & texting shortcuts:
     * Hindi/Hinglish: "bht" or "boht", "h" (for hai), "kr" (for kar), "k" (for ke), "gye" (for gaye), "thaa", "speacially", "beutiful", "arrengement", "halpful", "experiance", "recomended", "delishus", "lajwab", "swadist".
     * English: "beutiful", "speacially", "arrengement", "halpful", "experiance", "recomended", "delishus".
   - Informal grammar, loose run-on thoughts, casual double dots (..), missing commas.
5. SCRIPT:
   - If Hindi: CASUAL HINGLISH USING ENGLISH LETTERS ONLY (e.g. "sheesh mahal resort me cousin ki shadi attend kiya, lawn decor lajwab tha.. best resort in patna"). ABSOLUTELY ZERO DEVANAGARI CHARACTERS.
   - If English: Everyday casual English typed on a mobile.
6. RANDOMIZE FOCUS: Some talk only about food, some only about lawn or stage photos, some about valet parking and location opp St. Xavier, some about brother/sister wedding, some just say it was awesome.
7. OUTPUT: Raw review text ONLY. No quotes, no prefix, no explanations.`;

      // Random style roll to actively dictate variety to the LLM
      const styleRoll = Math.random();
      const styleType =
        styleRoll < 0.35
          ? 'lazy ultra-short 1-liner (8 to 14 words only, very brief)'
          : styleRoll < 0.75
          ? 'casual medium 1-2 rambling sentences (18 to 30 words)'
          : 'detailed guest story describing the lawn, food and evening (35 to 50 words)';

      const randomSeed = Math.floor(Math.random() * 1000000);

      userPrompt = `Write a completely random, human Google review in small letters / lowercase for Sheesh Mahal Resort in ${
        isHindi ? 'casual Hinglish (English letters only, no Devanagari)' : 'natural conversational English'
      }. Reviewer style: ${styleType}. Add intentional typos and casual mobile grammar. Do NOT follow any fixed format. Seed: ${randomSeed}`;
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
    // Multi-style procedural generator overtakes if AI is delayed or network issue occurs
    const procedural = generateProceduralReview(isHindi ? 'hindi' : 'english');
    return res.status(200).json({ review: procedural, isFallback: true });
  }
}
