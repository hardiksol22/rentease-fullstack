import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey there! 📦 Ask me anything about RentEase!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');
    setLoading(true);

    try {
      const data = await api.sendChatMessage(userText);
      if (data.success) {
        setMessages((prev) => [...prev, { sender: 'bot', text: data.response }]);
      }
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Connection refresh needed. Try again!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 font-sans">
      {/* 💬 Floating Circle Action Button (Slightly Smaller) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-xl flex items-center justify-center transition-all transform hover:scale-105 animate-bounce group"
        >
          <span className="text-xl group-hover:rotate-12 transition-transform">💬</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-[11px] font-bold tracking-wide ml-0 group-hover:ml-2 uppercase">AI Support</span>
        </button>
      )}

      {/* 💻 Sleek & Compact Chat Panel */}
      {isOpen && (
        <div className="w-72 md:w-80 h-[380px] bg-white border border-gray-100 rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-150">
          {/* Header (Tighter padding) */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-3 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🤖</span>
              <div>
                <h3 className="text-[11px] font-black tracking-wide uppercase">RentEase AI</h3>
                <p className="text-[9px] text-blue-100 font-medium">Live Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white font-bold text-xs px-1">✕</button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2.5 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-xl px-3 py-2 text-[11px] font-medium shadow-sm leading-relaxed ${
                  msg.sender === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-white border border-gray-100 text-gray-400 rounded-xl rounded-bl-none px-3 py-1.5 text-[10px] font-medium">
                  Thinking... ⚡
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSendMessage} className="p-2 bg-white border-t border-gray-100 flex items-center gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[11px] text-gray-900 outline-none focus:border-blue-500 font-medium"
            />
            <button type="submit" className="bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold hover:bg-blue-700 transition-colors">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}