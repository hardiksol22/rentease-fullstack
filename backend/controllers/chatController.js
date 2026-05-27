// backend/controllers/chatController.js

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: "Query string stream missing" });
    }

    const query = message.toLowerCase();
    let response = "";

    // Advanced Contextual NLP Routing Rules for RentEase Architecture
    if (query.includes("hi") || query.includes("hello") || query.includes("hey")) {
      response = "Hello! Welcome to RentEase AI Assistant. How can I help you optimize your premium furniture or appliance lease today? 😊";
    } else if (query.includes("furniture") || query.includes("sofa") || query.includes("bed") || query.includes("chair")) {
      response = "RentEase offers premium, high-density foam sofas, solid wood beds, and ergonomic office configurations under our Furniture catalog. Select your tenure tier (3, 6, 12 months) for optimized pricing structures!";
    } else if (query.includes("appliance") || query.includes("tv") || query.includes("fridge") || query.includes("ac") || query.includes("washing")) {
      response = "Our Smart Appliances fleet includes 4K Smart TVs, multi-door invertor refrigerators, and split AC units. All appliances come with complimentary free maintenance coverage!";
    } else if (query.includes("tenure") || query.includes("month") || query.includes("duration") || query.includes("price")) {
      response = "RentEase operates on an inverse tenure billing matrix: choosing longer lease commitments (e.g., 12 Months) automatically unlocks lower monthly installments and reduces escrow security deposits.";
    } else if (query.includes("deposit") || query.includes("security") || query.includes("money")) {
      response = "Every rent assignment requires a minor Escrow Safety Deposit. Don't worry! This amount is completely refundable and is safely processed back to your verified VPA within 48 hours of asset retrieval.";
    } else if (query.includes("upi") || query.includes("checkout") || query.includes("pay") || query.includes("hardik")) {
      response = "To simulate secure order placements on our sandbox network, advance to the Checkout page, choose Instant UPI, and verify using mock VPA identities like 'hardiksol@bob' or 'hardiksol@22'.";
    } else if (query.includes("admin") || query.includes("passcode") || query.includes("secret")) {
      response = "Authorized Personnel can access the Executive Cockpit via the Navbar Shield Icon. Register an admin account using the protected gate passcode: 'RentEaseAdmin2026'.";
    } else {
      response = "Interesting question! As the RentEase Virtual Agent, I can tell you that our platform supports Role-Based Access Control, live MERN item streams, and dynamic order pipelines. Let me know if you want to test our checkout checkout configurations!";
    }

    return res.status(200).json({ success: true, response });
  } catch (error) {
    console.error("❌ Chatbot system glitch:", error);
    return res.status(500).json({ success: false, message: "Internal assistant runtime interruption" });
  }
};