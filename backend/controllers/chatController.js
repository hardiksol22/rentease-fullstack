// backend/controllers/chatController.js
import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Query text stream missing" });
    }

    // Initialize Gemini with secure Environment API Key
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using the optimized, fast and free-tier gemini model
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: `You are RentEase AI, the smart virtual assistant for the RentEase platform. 
      Your job is to assist users and recruiters exploring the site.
      
      Context About RentEase:
      - It is a premium Furniture and Appliances rental platform with 28 products[cite: 5].
      - It features a dynamic tenure pricing model: 3, 6, and 12 months[cite: 7, 43]. 
      - Longer commitments give discounts (6 months gives 5% off, 12 months gives 10% off)[cite: 112, 154].
      - Escrow security deposits are fully refundable after asset retrieval[cite: 96, 109].
      
      Recruiter Testing Features to highlight if asked:
      - Testing UPI Addresses for sandbox checkouts: 'hardiksol@bob' or 'hardiksol@22'[cite: 557].
      - Secret Admin Dashboard gate passcode: 'RentEaseAdmin2026'[cite: 553].
      
      Keep your responses professional, friendly, brief, and beautifully formatted using markdown bullet points if necessary. Avoid giving long paragraphs.`
    });

    // Generate response stream from Gemini
    const result = await model.generateContent(message);
    const aiResponse = result.response.text();

    return res.status(200).json({ success: true, response: aiResponse });
  } catch (error) {
    console.error("❌ Gemini AI Integration Engine Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "AI Engine processing error. Please ensure GEMINI_API_KEY is configured." 
    });
  }
};