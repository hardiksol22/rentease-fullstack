import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // 1️⃣ Check if Key exists in environment variables context
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Diagnostic Error: Render par GEMINI_API_KEY missing hai!" });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const bulletproofPrompt = `Context: You are RentEase AI, a helpful rental assistant in India. Keep answers under 2 sentences.
User Query: ${message}`;

    const result = await model.generateContent(bulletproofPrompt);
    const response = await result.response;
    
    // Success response
    res.json({ reply: response.text() });

  } catch (error) {
    console.error("❌ Gemini Bot Error:", error);
    
    // 🔥 MASTER HACK: Yeh line error ko frontend chat widget par force-render kar degi
    res.json({ reply: `❌ Asli Backend Error: ${error.message}` });
  }
};