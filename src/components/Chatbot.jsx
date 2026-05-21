import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! I'm your AI counselor. Ask me anything about your career.", sender: 'ai' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: `User is a student. Advice them on: ${input}` }] }] })
      });
      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { text: aiText, sender: 'ai' }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: "Error connecting to AI. Please check your API key.", sender: 'ai' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all">
          <MessageCircle size={32} />
        </button>
      ) : (
        <div className="bg-white w-[350px] h-[500px] shadow-2xl rounded-3xl flex flex-col border border-gray-100 overflow-hidden animate-fadeIn">
          <div className="bg-blue-600 p-5 text-white flex justify-between items-center">
            <span className="font-bold tracking-wide text-lg">AI Counselor</span>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-500 rounded-lg p-1"><X size={24} /></button>
          </div>
          <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${m.sender === 'user' ? 'bg-blue-600 text-white ml-auto rounded-tr-none' : 'bg-white text-gray-800 mr-auto rounded-tl-none border border-gray-100'}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="bg-white p-3 rounded-2xl mr-auto border border-gray-100"><Loader2 className="animate-spin text-blue-600" size={18} /></div>}
          </div>
          <div className="p-4 bg-white border-t flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask a career question..." className="flex-1 text-sm outline-none bg-gray-100 p-3 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-100 transition" />
            <button onClick={handleSend} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"><Send size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;