import React, { useState, useRef, useEffect } from 'react';
import { api } from '../../services/api';

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hey there! 📦 I am the RentEase Platform Assistant. Ask me anything about furniture, deposit refunds, or admin secrets!' }
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
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Oops! My connectivity module is refreshing. Try again shortly.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* 💬 Floating Circle Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 animate-bounce group"
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform">💬</span>
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out text-xs font-bold tracking-wide ml-0 group-hover:ml-2 uppercase">AI Support</span>
        </button>
      )}

      {/* 💻 Enterprise Chat Panel View */}
      {isOpen && (
        <div className="w-80 md:w-96 h-[450px] bg-white border border-gray-100 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-2">
              <span className="text-xl">🤖</span>
              <div>
                <h3 className="text-xs font-black tracking-wide uppercase">RentEase Core AI</h3>
                <p className="text-[10px] text-blue-100 font-semibold">Active & Live Support</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white font-black text-sm">✕</button>
          </div>

          {/* Messages Stream Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50/50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs font-medium shadow-sm leading-relaxed ${
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
                <div className="bg-white border border-gray-100 text-gray-400 rounded-2xl rounded-bl-none px-4 py-2 text-[10px] font-bold">
                  Thinking engine processing... ⚡
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Outbound Message Submission Bar */}
          <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about deposits, tenure discounts..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 outline-none focus:border-blue-500 font-medium"
            />
            <button type="submit" className="bg-blue-600 text-white px-3.5 py-2 rounded-xl text-xs font-black hover:bg-blue-700 transition-colors">
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}