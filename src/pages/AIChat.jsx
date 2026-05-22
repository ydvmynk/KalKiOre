import React, { useState, useContext, useEffect, useRef } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const AIChat = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([
    { role: 'ai', content: `Namaste ${user?.name || 'Student'}! I am KalKi, your AI career guide. Ready to build your tomorrow?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_KEY}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: `You are KalKi, an expert career counselor for Indian students. Answer this: ${input}` }] }]
        })
      });
      const data = await response.json();
      const aiText = data.candidates[0].content.parts[0].text;
      setMessages(prev => [...prev, { role: 'ai', content: aiText }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "KalKi AI is having trouble connecting. Check your internet." }]);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[calc(100vh-160px)] animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
            <div className="bg-cyan-500/20 p-3 rounded-2xl text-cyan-400 border border-cyan-500/20">
                <Bot size={24} />
            </div>
            <div>
                <h2 className="text-xl font-bold tracking-tight text-white">KalKi AI Counselor</h2>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mt-0.5 italic">Towards Tomorrow</p>
            </div>
        </div>
      </div>

      <div className="flex-1 glass rounded-[2.5rem] p-8 overflow-y-auto space-y-6 mb-6 custom-scrollbar border-white/5">
        {messages.map((m, i) => (
          <div key={i} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${m.role === 'user' ? 'bg-cyan-600 shadow-cyan-900/20' : 'bg-purple-600 shadow-purple-900/20'}`}>
              {m.role === 'user' ? <User size={20} /> : <Bot size={20} />}
            </div>
            <div className={`max-w-[75%] p-5 rounded-[2rem] text-sm leading-relaxed ${
              m.role === 'user' 
              ? 'bg-cyan-600/10 text-white border border-cyan-500/20 rounded-tr-none' 
              : 'bg-white/5 text-slate-300 border border-white/5 rounded-tl-none'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="flex gap-4 animate-pulse"><div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center"><Bot size={20} className="text-slate-500"/></div><div className="bg-white/5 p-4 rounded-2xl border border-white/5 w-24"></div></div>}
        <div ref={chatEndRef} />
      </div>

      <div className="relative">
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask KalKi AI anything about your future..." 
          className="w-full bg-white/5 border border-white/10 rounded-[2rem] py-5 pl-8 pr-20 text-sm outline-none focus:border-cyan-500 focus:bg-white/10 transition-all text-white font-medium"
        />
        <button onClick={handleSend} className="absolute right-3 top-3 bg-cyan-600 hover:bg-cyan-500 p-3 rounded-[1.5rem] transition-all shadow-lg"><Send size={18} /></button>
      </div>
    </div>
  );
};

export default AIChat;