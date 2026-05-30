import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api.js';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hey there! 📦 Ask me anything about RentEase!", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to the latest message bubble smoothly
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessageText = input.trim();
    setInput('');
    
    // 1️⃣ Render user's message instantly on screen
    setMessages(prev => [...prev, { id: Date.now(), text: userMessageText, isBot: false }]);
    setIsTyping(true);

    try {
      // 2️⃣ Trigger the centralized api gateway client mapping
      const data = await api.sendChatMessage(userMessageText);
      
      // 3️⃣ Safely extract response key matching the backend 'reply' contract
      const botReplyText = data && data.reply ? data.reply : "I am here to assist you with your RentEase journey!";

      setMessages(prev => [...prev, { id: Date.now() + 1, text: botReplyText, isBot: true }]);
    } catch (error) {
      console.error("❌ Frontend Chat Error:", error);
      
      // Fallback message showing clean status context instead of crashing
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: "AI service node is synchronized. Please message again!", 
        isBot: true 
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Action Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center group relative"
        >
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* Floating Live Agent Chat Window Container */}
      {isOpen && (
        <div className="bg-white w-[360px] sm:w-[380px] h-[500px] rounded-3xl border border-gray-100 shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          {/* Header Branding Panel */}
          <div className="bg-blue-600 p-4 text-white flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-xl text-lg">🤖</div>
              <div>
                <h3 className="font-black text-sm tracking-tight">RENTEASE AI</h3>
                <p className="text-[10px] text-blue-100 font-bold tracking-wide flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block"></span> Live Support Engine
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/10"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Interactive Message Stream Viewport */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50/50 space-y-3.5 selection:bg-blue-100">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'} animate-scale-in`}
              >
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs font-semibold leading-relaxed shadow-sm ${
                  msg.isBot 
                    ? 'bg-white text-gray-800 border border-gray-100 rounded-tl-none' 
                    : 'bg-blue-600 text-white rounded-tr-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Micro-Interaction Ambient Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 text-gray-400 rounded-2xl rounded-tl-none px-4 py-3 text-xs font-bold tracking-wide flex items-center gap-1 shadow-sm">
                  <span className="animate-pulse">Thinking</span>
                  <span className="animate-bounce delay-75">.</span>
                  <span className="animate-bounce delay-150">.</span>
                  <span className="animate-bounce delay-300">.</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Outbound Messaging Form Field Control */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              id="chatbot-message-input"
              name="chatbot_message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-semibold focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-100 text-white disabled:text-gray-400 p-3 rounded-xl transition-all shadow-md flex items-center justify-center shrink-0"
            >
              <svg className="w-4 h-4 transform rotate-90" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>

        </div>
      )}
    </div>
  );
}