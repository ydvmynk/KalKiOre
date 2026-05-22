import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap, Globe, Target, MessageSquare, BarChart3, ChevronRight } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050816] text-white overflow-x-hidden font-sans">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#050816]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-6 px-8">
          <div className="flex flex-col group cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-black italic tracking-tighter">KalKiOre</span>
            <span className="text-[8px] font-bold text-purple-400 uppercase tracking-widest leading-none">Towards Tomorrow</span>
          </div>

          <div className="hidden md:flex gap-10 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] items-center">
            <a href="/" className="hover:text-cyan-400 transition">Home</a>
            <a href="#features" className="hover:text-cyan-400 transition">Features</a>
            <div className="flex items-center gap-6 ml-4 border-l border-white/10 pl-10">
                <button onClick={() => navigate('/login')} className="hover:text-purple-400 transition">Login</button>
                <button onClick={() => navigate('/signup')} className="bg-white text-black px-6 py-2.5 rounded-full font-black hover:bg-cyan-400 transition shadow-xl shadow-white/5">Signup</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative pt-48 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-[10px] font-black text-purple-400 uppercase tracking-widest animate-pulse">
            <Sparkles size={12} /> Shaping the Future of Education
          </div>
          
          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-6">
            KalKiOre: Your <br /> 
            <span className="gradient-text">Tomorrow, Decoded.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
            Stop guessing your career. Let KalKiOre's AI analyze your merit and socio-economic profile to find the perfect exams, scholarships, and colleges.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <button 
              onClick={() => navigate('/signup')}
              className="gradient-btn px-12 py-5 rounded-[2rem] text-lg font-black flex items-center justify-center gap-3 group"
            >
              Get Started <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="glass px-12 py-5 rounded-[2rem] text-lg font-black hover:bg-white/10 transition-all"
            >
              Student Login
            </button>
          </div>
        </div>
      </main>

      {/* Feature Section */}
      <section id="features" className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI Eligibility", desc: "Real-time matching with 500+ Indian exams based on your category and marks." },
              { title: "OCR Verification", desc: "Upload marksheet and get verified profile scores instantly." },
              { title: "Scholarship Vault", desc: "Access curated list of govt. and private grants worth ₹100 Cr+." }
            ].map((f, i) => (
              <div key={i} className="glass p-10 rounded-[3rem] border-white/5 hover:border-purple-500/30 transition-all">
                <h3 className="text-2xl font-black mb-4 tracking-tight text-white">{f.title}</h3>
                <p className="text-slate-400 font-medium leading-relaxed text-sm">{f.desc}</p>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Home;