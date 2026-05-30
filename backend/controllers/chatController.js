import axios from 'axios';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // 1️⃣ Safety Check: Ensure API Key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Alert: Render settings me GEMINI_API_KEY variable nahi mila!" });
    }

    const absolutePrompt = `You are RentEase AI, a super fast and helpful assistant for a rental website in India. Help users rent sofas, beds, and smart TVs. Keep answers strictly under 2 sentences. Be polite and professional. Admin passcode is RentEaseAdmin2026.

User Query: ${message}`;

    // 🔄 🔥 MULTI-MODEL FALLBACK MATRIX: Google jise bhi accept karega, bot use utha lega
    const modelsToTry = [
      "gemini-1.5-flash-latest",
      "gemini-pro",
      "gemini-1.5-flash"
    ];

    let aiReply = null;
    let lastGoogleError = null;

    // Loop through available models until one successfully hits
    for (const modelName of modelsToTry) {
      try {
        const googleResponse = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          {
            contents: [
              {
                parts: [{ text: absolutePrompt }]
              }
            ]
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );

        aiReply = googleResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (aiReply) {
          console.log(`🎯 Successfully connected using registry node: ${modelName}`);
          break; // Match found! Break loop instantly
        }
      } catch (err) {
        console.warn(`⚠️ Model node [${modelName}] rejected by Google Registry. Trying backup...`);
        lastGoogleError = err.response?.data?.error?.message || err.message;
      }
    }

    // 2️⃣ Final execution delivery pipeline
    if (aiReply) {
      res.json({ reply: aiReply });
    } else {
      res.json({ reply: `❌ All fallback routes exhausted. Google Registry Error: ${lastGoogleError}` });
    }

  } catch (error) {
    console.error("❌ Critical Chat Controller Exception:", error.message);
    res.status(500).json({ error: "AI Bot failed to parse execution layers." });
  }
};