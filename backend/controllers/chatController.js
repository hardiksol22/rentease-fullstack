import axios from 'axios';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Alert: Render settings me GEMINI_API_KEY variable missing hai!" });
    }

    // ⚡ HIGHLY OPTIMIZED PROMPT (Token size reduced to prevent account-level throttling)
    const compressedRentEaseContext = `You are RentEase AI, a ChatGPT assistant for "RentEase" full-stack portal in India. Rent furniture & appliances without ownership.
Tech Stack: React.js, Tailwind CSS, Vercel frontend (rentease-fullstack.vercel.app). Node.js, Express.js, MongoDB Atlas database, Render backend (rentease-backend-4uec.onrender.com).
Inventory: 28 pre-seeded items across "Furniture" (Sofas, Beds) & "Appliances" (Smart 4K TVs, Fridges).
Business Rules: Rent calculated dynamically based on tenure picker: 3 months (Standard), 6 months (5% flat discount), 12 months (10% premium discount). Refundable security deposit collected for all items.
Admin Gate: Passcode to access backend dashboard monitors is RentEaseAdmin2026.
Rule: Answer original using this data. Max 2 concise sentences. Be highly professional.

User Query: ${message}`;

    // 🔄 🔥 ORIGINAL LIVE POOL CASCADE: Since gemini-2.0 quota is locked at 0, 
    // we prioritize 1.5-flash models which have completely independent free quota pools!
    const activeModelPools = [
      "gemini-1.5-flash-8b", 
      "gemini-1.5-flash",
      "gemini-2.0-flash"
    ];

    let liveAiReplyText = null;
    let lastRegistryError = "";

    // Strictly original multi-pool routing traversal
    for (const modelInstance of activeModelPools) {
      try {
        const targetGatewayUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelInstance}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const googleResponse = await axios.post(
          targetGatewayUrl,
          { contents: [{ parts: [{ text: compressedRentEaseContext }] }] },
          { headers: { 'Content-Type': 'application/json' }, timeout: 4500 }
        );

        liveAiReplyText = googleResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (liveAiReplyText) {
          console.log(`🎯 Successfully connected via original live model pool: ${modelInstance}`);
          break; // Working live model found! Break loop instantly.
        }
      } catch (err) {
        lastRegistryError = err.response?.data?.error?.message || err.message;
        console.warn(`⚠️ Model pool [${modelInstance}] throttled by Google. Testing next active live channel...`);
      }
    }

    // 2️⃣ Final Stream Outbound Delivery
    if (liveAiReplyText) {
      res.json({ reply: liveAiReplyText });
    } else {
      res.json({ 
        reply: `❌ Google Free Quota Exhausted. Please retry in a few seconds. Reason: ${lastRegistryError}` 
      });
    }

  } catch (error) {
    console.error("Critical AI Gateway Failure:", error.message);
    res.status(500).json({ error: "AI Controller Execution Crash." });
  }
};