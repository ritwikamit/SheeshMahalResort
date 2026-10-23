// Vercel Serverless Function: /api/chat
// Communicates with OpenRouter API using the Openrouter_key environment variable
// With intelligent fallback guaranteeing 100% uptime and accurate responses

export const config = {
  maxDuration: 25,
};

function getFallbackReply(query: string): string {
  const q = (query || '').toLowerCase().trim();

  // Strict Out of Context Refusal
  const offTopic = [
    'write code', 'python', 'javascript', 'html code', 'css code', 'react code',
    'function(', 'def ', 'algorithm', 'debug', 'sql query', 'homework',
    'solve equation', 'math problem', 'calculus', 'who is the president',
    'who won the match', 'cricket score', 'ipl score', 'capital of',
    'translate this to', 'write an essay', 'crypto', 'bitcoin', 'stock market',
    'weather in tokyo', 'weather in london', 'who is elon musk',
    'donald trump', 'narendra modi', 'taj mahal hotel', 'marriott', 'hyatt'
  ];
  if (offTopic.some(kw => q.includes(kw))) {
    return "As the royal wedding concierge for Sheesh Mahal Resort, I can only assist with inquiries regarding our luxury wedding venues, royal catering, wedding packages, and celebrations here in Patna. How may I assist your wedding preparations today?";
  }

  // Greetings & Identity
  if (q === 'hi' || q === 'hello' || q === 'hey' || q === 'namaste' || q === 'pranam') {
    return "Namaste! How may I assist your royal wedding planning in Patna today?";
  }
  if (q.includes('who are you') || q.includes('who is raj') || q.includes('your name') || q.includes('kaun ho')) {
    return "I am Raj, your dedicated royal wedding concierge at Sheesh Mahal Resort in Patna. How may I assist your celebration?";
  }

  // Hindi / Hinglish Inquiries
  if (q.includes('shaadi') || q.includes('shadi') || q.includes('vivah') || q.includes('karna hai') || q.includes('chahiye') || q.includes('kahan') || q.includes('kharcha') || q.includes('kitna')) {
    return "शीश महल रिसॉर्ट (Sheesh Mahal Resort) पटना में शाही शादियों के लिए सबसे प्रतिष्ठित और भव्य स्थल है:\n\n• 45,000+ वर्ग फुट का विशाल शाही मैदान (2,000+ अतिथियों के लिए लॉन)\n• 1,200 अतिथियों के लिए सेंट्रली वातानुकूलित (AC) शीश बॉलरूम\n• 100% शुद्ध देसी घी में निर्मित अवधी और पारंपरिक बिहारी व्यंजन (वेज और नॉन-वेज के लिए अलग किचन)\n• 24 घंटे लगातार जनरेटर बैकअप, वैदिक मंडप और ऑन-साइट वैलेट पार्किंग\n\nशुभ लगन और मुहूर्त की तारीखें तेज़ी से बुक हो रही हैं। क्या आप तारीख की उपलब्धता या पैकेज की जानकारी चाहते हैं?";
  }

  // Capacity / Lawns
  if (q.includes('capacity') || q.includes('guest') || q.includes('people') || q.includes('how many') || q.includes('size') || q.includes('lawn')) {
    return "Sheesh Mahal Resort spans over 45,000 sq. ft. of palatial celebration grounds, comfortably hosting from 200 up to 2,000+ wedding guests:\n\n• Shahi Utsav Lawn: 800 – 2,000+ guests for grand Baraats & starlit receptions\n• The Sheesh Banquet: 500 – 1,200 guests (fully air-conditioned royal ballroom)\n• Vedic Mandap Courtyard: Up to 300 seated family\n• Poolside & Cabana Courtyard: 200 – 500 guests for Haldi/Sangeet.";
  }

  // Catering
  if (q.includes('cater') || q.includes('food') || q.includes('menu') || q.includes('veg') || q.includes('non-veg') || q.includes('champaran') || q.includes('biryani')) {
    return "Our in-house Shahi Banqueting features stone-ground heritage recipes prepared in pure desi ghee by master royal chefs:\n\n• Royal Awadhi & Mughlai: Zafrani Gosht Dum Biryani, Galouti & Kakori Kebabs\n• Traditional Bihari Heritage: Authentic Champaran Handi Gosht, Litti Chokha with Ghee\n• Live Street Stations: Banarasi Tamatar Chaat, 5-Water Golgappa\n• Shahi Mithai: Live Rabri Jalebi, Moong Dal Halwa.\n\nStrict 100% separate kitchen lines are maintained for pure vegetarian and gourmet non-vegetarian preparation.";
  }

  // Location / Directions
  if (q.includes('where') || q.includes('location') || q.includes('address') || q.includes('reach') || q.includes('map') || q.includes('direction') || q.includes('digha')) {
    return "Sheesh Mahal Resort is situated on the prime Ashiana–Digha corridor in Patna:\n\n📍 Address: Opposite Gate of St. Xavier's College, near Bharat Petrol Pump, Ashiana-Digha Road, Mica Colony, Digha, Patna, Bihar 800011\n• Landmark: Directly opposite St. Xavier's College Gate (Ashiana–Digha Road, NOT Bailey Road).\n• Travel: 20 mins from Patna Junction (8.4 km), 22 mins from Airport (9.2 km).\n• Verified Google Maps: https://maps.app.goo.gl/4cLP3LqdCvT1H9qT6";
  }

  // Booking & Pricing
  if (q.includes('book') || q.includes('date') || q.includes('price') || q.includes('package') || q.includes('cost') || q.includes('rate') || q.includes('muhurat') || q.includes('lagan')) {
    return "Auspicious Lagan and Muhurat dates for 2026–2027 are booking rapidly! We offer three bespoke royal packages:\n\n1. Shahi Utsav Package (300–500 Guests): Ballroom/Lawn, 45-dish multi-cuisine dinner feast, stage & mandap decor, 1 bridal suite, valet.\n2. Imperial Palace Package (600–1,200 Guests): Ballroom + Consecrated Mandap, 65-dish royal feast, hydraulic Varmala stage, cold-pyro reveals, Baraat Dhol welcome, 2 luxury suites.\n3. Royal Residency Retreat (Up to 2,000+ Guests): Complete 3-day resort takeover.\n\nWould you like our wedding desk to check date availability for your family?";
  }

  // Default resort concierge welcome (No repetitive intro)
  return "Whether you wish to know about our 45,000 sq. ft. wedding grounds, starlit Baraat lawns, 1,200-guest AC ballroom, in-house royal Awadhi & Bihari catering, or available 2026–2027 Lagan dates—I am glad to assist. How may I help your wedding preparations?";
}

export default async function handler(req: any, res: any) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
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

  const { messages, userMessage } = req.body || {};
  const currentQuery = userMessage || (Array.isArray(messages) && messages.length > 0 ? messages[messages.length - 1].text : '');

  const openrouterKey =
    process.env.Openrouter_key ||
    process.env.OPENROUTER_KEY ||
    process.env.VITE_OPENROUTER_KEY ||
    process.env.openrouter_key;

  if (!openrouterKey) {
    const fallbackText = getFallbackReply(currentQuery);
    return res.status(200).json({ text: fallbackText, isFallback: true });
  }

  try {
    const systemPrompt = `
You are RAJ, the Senior Royal Wedding Concierge at Sheesh Mahal Resort in Patna, Bihar.
You represent Sheesh Mahal Resort with supreme elegance, warmth, and hospitality.

=======================================================
STRICT BEHAVIORAL & PERSONA GUIDELINES:
=======================================================
1. CONVERSATION FLOW & NO REPETITIVE INTRODUCTIONS (CRITICAL RULE):
   - NEVER start normal replies with "Namaste! I am Raj, your royal wedding concierge at Sheesh Mahal Resort..." or repeat who you are in every message.
   - The user already sees your name and avatar in the chat interface and received the initial welcome message.
   - Answer the guest's questions directly, warmly, and helpfully with royal grace.
   - Only introduce yourself by name if the user explicitly asks "Who are you?", "What is your name?", or "Who is Raj?".
   - For simple greetings like "hi", reply naturally: "Namaste! How may I assist your wedding planning today?" without any biographical preamble.

2. GREETING & TONE:
   - Speak with refined charm, polite confidence, and deep wedding expertise.
   - Always speak from the first-person perspective of Sheesh Mahal Resort ("Our resort spans...", "We offer...", "Our Shahi Utsav Lawn...", "Our chefs prepare...").
   - You are fluent in English, Hindi, and Hinglish. If the user writes in Hindi or Hinglish, warmly answer in Hindi or Hinglish.
   - Warmly welcome polite conversation, brief greetings, and all questions about our venue.

3. POINT OF VIEW:
   - You represent Sheesh Mahal Resort exclusively.
   - Highlight our venue's grand scale (45,000+ sq. ft., up to 2,000+ guests), climate-controlled Sheesh Banquet, consecrated Vedic Mandap, starlit lawns, and in-house royal Awadhi/Bihari catering.
   - Guide prospective brides, grooms, and parents towards booking their wedding dates and scheduling a venue walkthrough or tasting.

=======================================================
STRICT OUT-OF-CONTEXT REFUSAL:
=======================================================
You are ONLY authorized to answer inquiries directly regarding Sheesh Mahal Resort, our venues, lawns, wedding packages, auspicious Lagan dates, catering menus, location/directions in Patna, wedding decor, and celebrations at our resort.

IF AND ONLY IF THE USER ASKS SOMETHING COMPLETELY UNRELATED TO WEDDINGS OR RESORTS:
- Software programming, coding, math problems, calculus, homework
- World news, geopolitics, elections, crypto, stock markets
- Other unrelated hotels, general trivia, requests to write essays/poems about unrelated topics

ONLY in those clear off-topic cases, refuse politely with:
"As the royal wedding concierge for Sheesh Mahal Resort, I can only assist with inquiries regarding our luxury wedding venues, royal catering, wedding packages, and celebrations here in Patna. How may I assist your wedding preparations today?"

=======================================================
AUTHENTIC RESORT KNOWLEDGE BASE:
=======================================================
1. RESORT PROFILE:
• Name: Sheesh Mahal Resort (Patna's Premier Royal Wedding Resort & Banquets)
• Physical Address: Opposite Gate of St. Xavier's College, near Bharat Petrol Pump, Mica Colony, Yadav Colony, Digha, Patna, Bihar 800011
• Crucial Landmark: Directly opposite St. Xavier's College Gate on Ashiana–Digha Road (near Bharat Petrol Pump, Digha, Patna. Note: NOT on Bailey Road / Danapur).
• Operating Hours: Open 24 Hours for Wedding Consultations & Walkthroughs
• Primary Phone Desk: +91 76319 29292
• Secondary Phone Desk: +91 73608 00001
• Official WhatsApp Desk: +917360800001
• Verified Google Maps Link: https://maps.app.goo.gl/4cLP3LqdCvT1H9qT6
• Total Grounds: Over 45,000+ sq. ft. of royal celebration grounds dedicated exclusively to luxury Indian weddings, Baraats, Varmalas, and receptions.

2. VENUES & SPACES:
• THE SHEESH BANQUET: 500 to 1,200 Guests | 12,000 Sq. Ft. Indoor Ballroom with crystal chandeliers, 40x20ft stage, central AC.
• SHAHI UTSAV LAWN: 800 to 2,000+ Guests | 25,000 Sq. Ft. Landscaped Garden for starlit weddings & mega Baraats.
• ROYAL MANDAP PAVILION: Up to 300 Seated Family | 4,000 Sq. Ft. Sacred Pavilion with consecrated havan smoke airflow ventilation.
• COURTYARD & POOLSIDE: 200 to 500 Guests | 8,000 Sq. Ft. for vibrant Haldi & Mehndi carnivals.

3. ROYAL CATERING & GASTRONOMY:
• Strict 100% physically separated vegetarian and non-vegetarian preparation lines.
• Awadhi Zafrani Dum Biryani, Galouti & Kakori Kebabs, Authentic Bihari Champaran Handi Gosht, Litti Chokha with pure desi ghee, live Chaat & 5-water Golgappa, live Rabri-Jalebi, and Moong Dal Halwa.

4. WEDDING PACKAGES:
• Shahi Utsav Package (300-500 Guests)
• Imperial Palace Package (600-1,200 Guests)
• Royal Residency Retreat (Up to 2,000+ Guests)

5. LOGISTICS:
• 100% uninterrupted heavy-duty industrial diesel generator backup.
• Secure on-site parking with complimentary uniformed valet attendants.
• 2026–2027 Lagan / Muhurat dates are booking rapidly.
`.trim();

    let chatMessages: any[] = [{ role: 'system', content: systemPrompt }];

    if (Array.isArray(messages) && messages.length > 0) {
      chatMessages = [
        { role: 'system', content: systemPrompt },
        ...messages.map((m: any) => ({
          role: m.sender === 'bot' ? 'assistant' : 'user',
          content: m.text
        }))
      ];
    } else if (userMessage) {
      chatMessages.push({ role: 'user', content: userMessage });
    }

    // Resilient candidate models on OpenRouter
    const candidateModels = [
      'google/gemini-2.0-flash-001',
      'meta-llama/llama-3.3-70b-instruct',
      'google/gemini-2.0-flash-lite-preview-02-05:free',
      'meta-llama/llama-3.1-8b-instruct:free',
      'mistralai/mistral-small-3.2-24b-instruct:free',
      'openrouter/auto'
    ];

    for (const model of candidateModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openrouterKey}`,
            'HTTP-Referer': 'https://sheeshmahalresort.vercel.app',
            'X-Title': 'Sheesh Mahal Resort Wedding Concierge',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: chatMessages,
            temperature: 0.3,
            max_tokens: 500
          })
        });

        if (response.ok) {
          const data = await response.json();
          const replyText = data.choices?.[0]?.message?.content;
          if (replyText) {
            return res.status(200).json({ text: replyText });
          }
        }
      } catch (err) {
        // Try next candidate model
      }
    }

    // If OpenRouter models were busy or unavailable, return the rich concierge fallback
    const fallbackText = getFallbackReply(currentQuery);
    return res.status(200).json({ text: fallbackText, isFallback: true });
  } catch (error: any) {
    console.error('API /api/chat error:', error);
    const fallbackText = getFallbackReply(currentQuery);
    return res.status(200).json({ text: fallbackText, isFallback: true });
  }
}
