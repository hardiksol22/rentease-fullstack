import axios from 'axios';

// Global runtime cache node to store the working model configuration permanently
let workingEndpointCache = null;

export const handleChatMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ reply: "❌ Backend Alert: Render settings me GEMINI_API_KEY missing hai!" });
    }

    const absolutePrompt = `You are RentEase AI, a super fast and helpful assistant for a rental website in India. Help users rent sofas, beds, and smart TVs. Keep answers strictly under 2 sentences. Be polite and professional. Admin passcode is RentEaseAdmin2026.

User Query: ${message}`;

    // 1️⃣ If a working configuration was already discovered, bypass the loop completely
    if (workingEndpointCache) {
      try {
        const cachedResponse = await axios.post(
          `https://generativelanguage.googleapis.com/${workingEndpointCache.version}/models/${workingEndpointCache.model}:generateContent?key=${process.env.GEMINI_API_KEY}`,
          { contents: [{ parts: [{ text: absolutePrompt }] }] },
          { headers: { 'Content-Type': 'application/json' } }
        );
        const cachedReply = cachedResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (cachedReply) {
          return res.json({ reply: cachedReply });
        }
      } catch (cacheErr) {
        console.warn("⚠️ Cached node failed, re-evaluating registry matrix...");
        workingEndpointCache = null; // Reset cache if it fails
      }
    }

    // 2️⃣ ⚡ THE UNSTOPPABLE COMPREHENSIVE COMBINATION MATRIX (Updated for 2026 Ecosystem)
    const apiMatrix = [
      { version: 'v1beta', model: 'gemini-2.0-flash' },
      { version: 'v1',     model: 'gemini-2.0-flash' },
      { version: 'v1beta', model: 'gemini-1.5-flash-latest' },
      { version: 'v1beta', model: 'gemini-1.5-flash-001' },
      { version: 'v1',     model: 'gemini-1.5-flash' },
      { version: 'v1beta', model: 'gemini-1.5-pro' },
      { version: 'v1beta', model: 'gemini-pro' },
      { version: 'v1beta', model: 'gemini-1.5-flash' }
    ];

    let finalAiReply = null;
    let matrixDiagnosticsLog = "";

    // Sequential matrix traversal pipeline
    for (const node of apiMatrix) {
      try {
        const targetUrl = `https://generativelanguage.googleapis.com/${node.version}/models/${node.model}:generateContent?key=${process.env.GEMINI_API_KEY}`;
        
        const googleResponse = await axios.post(
          targetUrl,
          { contents: [{ parts: [{ text: absolutePrompt }] }] },
          { headers: { 'Content-Type': 'application/json' }, timeout: 4000 }
        );

        finalAiReply = googleResponse.data?.candidates?.[0]?.content?.parts?.[0]?.text;
        
        if (finalAiReply) {
          // Lock the working node into global runtime state memory context
          workingEndpointCache = { version: node.version, model: node.model };
          console.log(`🎯 Locked-in successful production channel node: ${node.model} (${node.version})`);
          break;
        }
      } catch (err) {
        const errMsg = err.response?.data?.error?.message || err.message;
        matrixDiagnosticsLog += `[${node.model}-${node.version}: ${errMsg}] | `;
      }
    }

    // 3️⃣ Final Delivery Logic
    if (finalAiReply) {
      res.json({ reply: finalAiReply });
    } else {
      res.json({ 
        reply: `❌ Project Registry Conflict. Please regenerate a new API Key in Google AI Studio. System Logs: ${matrixDiagnosticsLog.substring(0, 150)}...` 
      });
    }

  } catch (error) {
    console.error("Critical Exception:", error.message);
    res.status(500).json({ error: "AI Gateway Lifecycle Execution Crash." });
  }
};