import React, { useState } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! I'm your AI counselor. Ask me anything about your career.", sender: 'ai' }]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const apiKey = import.meta.env.VITE_GEMINI_KEY;
    console.log("Vite is using API Key:", apiKey ? "Found (Starts with " + apiKey.substring(0, 5) + ")" : "NOT FOUND");

    const userMsg = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          contents: [{ parts: [{ text: `You are a career guide. Answer briefly: ${input}` }] }] 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        console.error("Google API Error Details:", data);
        throw new Error(data.error?.message || "API Request Failed");
      }

      const aiText = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { text: aiText, sender: 'ai' }]);
    } catch (err) {
      console.error("Chatbot Catch Error:", err.message);
      setMessages(prev => [...prev, { text: `Error: ${err.message}. Check console for details.`, sender: 'ai' }]);
    }
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {!isOpen ? (
        <button onClick={() => setIsOpen(true)} className="bg-indigo-600 text-white p-5 rounded-full shadow-2xl hover:scale-110 transition-all shadow-indigo-300">
          <MessageCircle size={32} />
        </button>
      ) : (
        <div className="bg-white w-[380px] h-[550px] shadow-2xl rounded-[2rem] flex flex-col border border-slate-100 overflow-hidden animate-fadeIn">
          <div className="bg-indigo-600 p-6 text-white flex justify-between items-center">
            <div>
              <p className="font-bold text-lg leading-none tracking-tight">EduGuide AI</p>
              <p className="text-xs text-indigo-200 mt-1 flex items-center gap-1 italic">Counselor Online</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-indigo-500 rounded-xl p-2 transition-colors"><X size={20} /></button>
          </div>
          
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
            {messages.map((m, i) => (
              <div key={i} className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${m.sender === 'user' ? 'bg-indigo-600 text-white ml-auto rounded-tr-none' : 'bg-white text-slate-800 mr-auto rounded-tl-none border border-slate-100'}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="bg-white p-3 w-12 rounded-2xl border border-slate-100 shadow-sm ml-4"><Loader2 className="animate-spin text-indigo-600" size={18} /></div>}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input value={input} onChange={(e) => setInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSend()} placeholder="Ask a question..." className="flex-1 text-sm outline-none bg-slate-100 p-4 rounded-2xl focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all border-none" />
            <button onClick={handleSend} disabled={loading} className="bg-indigo-600 text-white p-4 rounded-2xl hover:bg-indigo-700 disabled:bg-slate-300 transition shadow-lg"><Send size={20} /></button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;