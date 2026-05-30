import axios from 'axios';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Alert: Render me GEMINI_API_KEY variable nahi mila!" });
    }

    // 🔥 MASTER CORE CONTEXT INJECTION: Providing complete RentEase system architecture blueprint to the AI
    const customRentEaseContextPrompt = `
You are RentEase AI, an advanced customized ChatGPT assistant exclusively engineered for the "RentEase" full-stack web application in India. You possess absolute knowledge of this application's entire architecture, database layout, and operational rules.

Here is the official RentEase Web App Specification Blueprint you must use to answer queries:
1. PLATFORM OVERVIEW: RentEase is a premium subscription-based full-stack marketplace allowing users across India to rent high-quality Furniture and Smart Appliances without the burden of ownership.
2. PRODUCTION TECH STACK: 
   - Frontend: React.js styled with Tailwind CSS, utilizing a fully fluid mobile-responsive grid configuration (collapsing dynamically from grid-cols-1 on mobile to grid-cols-4 on desktop monitors). Hosted on Vercel (rentease-fullstack.vercel.app).
   - Backend: Node.js with Express.js REST APIs running asynchronously. Hosted on Render (rentease-backend-4uec.onrender.com).
   - Database: MongoDB Atlas cloud clusters securely connected via Mongoose ODM layers.
3. INVENTORY SEEDING LOGISTICS: The database is fully pre-seeded with 28 premium items categorized strictly into two divisions: "Furniture" (Sofas, Beds, Wardrobes, Dining sets) and "Appliances" (Smart 4K TVs, Double-Door Fridges, Automatic Washing Machines, Air Fryers). 
4. LIVE BUSINESS LOGIC & PRICING RULES: 
   - Every product has a base monthly rent and a 100% refundable security deposit bond.
   - Dynamic Lease Commitments: Users can choose 3 lease options via a tenure picker:
     * 3 Months: Standard subscription rate.
     * 6 Months: 5% flat discount automatically applied to monthly rent.
     * 12 Months: 10% premium discount automatically applied to monthly rent.
5. ADMINISTRATIVE SECURITY GATEWAY: The master administrative bypass passcode to access the backend control panels and database monitors is strictly: RentEaseAdmin2026. Keep this secure.

OPERATIONAL INSTRUCTIONS FOR RESPONSE GENERATION:
- Use the above blueprint data to provide 100% original, accurate, and context-specific replies about RentEase.
- Keep your responses concise, highly professional, polite, and strictly under 2 or 3 sentences max.
- Always sound like the premium support engine of RentEase India.

User Query: ${message}`;

    // ⚡ Direct high-speed connection execution channel using the recommended v1beta REST node
    const googleResponse = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: customRentEaseContextPrompt }]
          }
        ]
      },
      {
        headers: { 'Content-Type': 'application/json' },
        timeout: 5000
      }
    );

    const aiReply = googleResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text 
      || "Welcome to RentEase! I can assist you with our premium furniture and appliance subscription packages.";

    res.json({ reply: aiReply });

  } catch (error) {
    console.error("❌ Context AI Gateway Failure:", error.response?.data || error.message);
    const serverErrorMessage = error.response?.data?.error?.message || error.message;
    
    // Fallback error messaging to ensure user experience does not shatter during demo
    res.json({ reply: `❌ RentEase AI Engine Notification: ${serverErrorMessage}. Please check your API Quota allocation layers.` });
  }
};