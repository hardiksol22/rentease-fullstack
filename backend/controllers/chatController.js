import { GoogleGenerativeAI } from '@google/generative-ai';

// ✅ Gemini engine instance initialization
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 🔄 Sahi naam: handleChatMessage (Jo chatRoutes.js dhoondh raha hai)
export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "Gemini API key is missing on Render settings." });
    }

    // Call the fastest gemini-1.5-flash model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: "You are RentEase AI, a super fast and helpful assistant for a rental website in India. Help users rent sofas, beds, and smart TVs. Keep answers strictly under 2 sentences. Be polite and professional. Admin passcode is RentEaseAdmin2026."
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    
    // Safely send response back to frontend chat widget
    res.json({ reply: response.text() });

  } catch (error) {
    console.error("❌ Gemini Bot Error:", error);
    res.status(500).json({ error: "AI Bot is updating its configuration layers." });
  }
};