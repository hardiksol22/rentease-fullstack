import axios from 'axios';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // 1️⃣ Safety Check: Ensure API Key exists
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Alert: Render settings me GEMINI_API_KEY variable nahi mila!" });
    }

    const absolutePrompt = `You are RentEase AI, a super fast and helpful assistant for a rental website in India. Help users rent sofas, beds, and smart TVs. Keep answers strictly under 2 sentences. Be polite and professional.

User Query: ${message}`;

    // 2️⃣ Sending direct HTTP request to v1beta channel
    const googleResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
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

    const aiReply = googleResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (aiReply) {
      res.json({ reply: aiReply });
    } else {
      res.json({ reply: "❌ Alert: Google se raw response khali aaya hai." });
    }

  } catch (error) {
    console.error("❌ Gemini Direct API Node Crash:", error.response?.data || error.message);
    
    // 🔥 MASTER HACK: Extracting the exact text reason from Google's secure payload
    const exactGoogleErrorMessage = error.response?.data?.error?.message 
      || error.response?.data?.error?.status 
      || error.message;

    // We send a 200 OK status but embed the error message directly into the chat stream bubble!
    res.json({ reply: `❌ Asli Google Error: ${exactGoogleErrorMessage}` });
  }
};