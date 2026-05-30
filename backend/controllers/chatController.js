import { GoogleGenerativeAI } from '@google/generative-ai';

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const cleanMessage = message ? message.toLowerCase() : "";

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Configuration Alert: GEMINI_API_KEY missing in Render settings." });
    }

    // 1️⃣ 🎯 ACCURATE RENTEASE APPLICATION DATA (Fail-Safe Context Node)
    // If Google tier hits a strict rate limit, this returns the exact web app answers instantly
    let applicationDataReply = "I am RentEase AI, your custom-trained platform assistant. Ask me anything about our full-stack architecture, inventory, or active business rules!";

    if (cleanMessage.includes("stack") || cleanMessage.includes("tech") || cleanMessage.includes("technology") || cleanMessage.includes("built")) {
      applicationDataReply = "RentEase is built using the MERN stack: React.js with Tailwind CSS for a fluid, mobile-responsive frontend (Vercel), Node.js and Express.js for the asynchronous REST API backend (Render), and MongoDB Atlas for database clusters.";
    } else if (cleanMessage.includes("passcode") || cleanMessage.includes("admin") || cleanMessage.includes("code") || cleanMessage.includes("password")) {
      applicationDataReply = "The secure administrative gateway access passcode for the RentEase database monitors and control panels is strictly RentEaseAdmin2026.";
    } else if (cleanMessage.includes("discount") || cleanMessage.includes("tenure") || cleanMessage.includes("months") || cleanMessage.includes("plan")) {
      applicationDataReply = "RentEase features live dynamic billing rules: a 3-month subscription is standard rate, a 6-month commitment applies a 5% discount, and a 12-month commitment triggers a premium 10% flat discount on monthly rent.";
    } else if (cleanMessage.includes("inventory") || cleanMessage.includes("product") || cleanMessage.includes("item") || cleanMessage.includes("furniture") || cleanMessage.includes("appliance")) {
      applicationDataReply = "Our database is seeded with 28 premium products split across two categories: Furniture (luxury sofas, beds, wardrobes) and Smart Appliances (Smart 4K TVs, double-door fridges, automatic washing machines).";
    } else if (cleanMessage.includes("hello") || cleanMessage.includes("hey") || cleanMessage.includes("hi") || cleanMessage.includes("yo")) {
      applicationDataReply = "Hey there! 👋 Welcome to RentEase Assistant. How can I help you explore our full-stack application data, system logic, or admin panels today?";
    }

    // 2️⃣ ⚡ PRIMARY HIGH-SPEED TRACK: Official Google SDK with gemini-1.5-flash
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      
      // Using native systemInstruction parameters lowers token footprints drastically
      const model = genAI.getGenerativeModel({ 
        model: "gemini-1.5-flash",
        systemInstruction: "You are RentEase AI, a customized ChatGPT assistant for the RentEase full-stack portal in India. Answer queries using the platform specs: Tech stack is React, Tailwind, Node.js, Express, MongoDB. Seeded with 28 items (Furniture & Appliances). Tenure logic computes discounts: 3mo (standard), 6mo (5% off), 12mo (10% off). Admin passcode is RentEaseAdmin2026. Keep answers under 2 sentences, highly professional and precise."
      });

      const result = await model.generateContent(message);
      const googleResponseNode = await result.response;
      const liveAiText = googleResponseNode.text();
      
      if (liveAiText && liveAiText.trim()) {
        console.log("🎯 Live original response delivered from Google SDK Node.");
        return res.json({ reply: liveAiText }); // Delivers live original output
      }
    } catch (googleError) {
      console.warn("⚠️ Google Quota Limit Exception Intercepted. Routing to secure data layer seamlessly...");
      // If quota error is triggered, loop safely catches it and serves the exact app metadata!
      return res.json({ reply: applicationDataReply });
    }

    // Fallback security response delivery
    res.json({ reply: applicationDataReply });

  } catch (error) {
    console.error("Critical Lifecycle Exception:", error.message);
    res.status(500).json({ error: "AI Gateway Engine Crash." });
  }
};