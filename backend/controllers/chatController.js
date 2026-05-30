import axios from 'axios';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    // 1️⃣ Verify if the API key is present in Render environment
    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Configuration Alert: Render me GEMINI_API_KEY nahi mila!" });
    }

    // 2️⃣ Craft the optimized contextual instruction blueprint
    const absolutePrompt = `You are RentEase AI, a super fast and helpful assistant for a rental website in India. Help users rent sofas, beds, and smart TVs. Keep answers strictly under 2 sentences. Be polite and professional. Admin passcode is RentEaseAdmin2026.

User Query: ${message}`;

    // 3️⃣ ⚡ ABSOLUTE FIX: Switched back to v1beta because gemini-1.5-flash is registered here
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

    // 4️⃣ Safely extract text from Google's native response mapping matrix
    const aiReply = googleResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text 
      || "I am here to assist you with your RentEase journey!";
    
    // Smooth delivery back to frontend widget context
    res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ Direct Gemini API Node Failure:", error.response?.data || error.message);
    
    // Capturing exact signature variations to pinpoint runtime faults
    const serverErrorMessage = error.response?.data?.error?.message || error.message;
    res.json({ reply: `❌ System Notification: ${serverErrorMessage}` });
  }
};