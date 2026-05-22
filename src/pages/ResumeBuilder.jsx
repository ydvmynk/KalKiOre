import React from 'react';
import { FileText, Download, User, Briefcase, GraduationCap } from 'lucide-react';

const ResumeBuilder = () => {
  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-4xl font-black text-white">Resume <span className="gradient-text">Architect</span></h1>
        <button className="gradient-btn px-8 py-3 rounded-2xl font-black flex items-center gap-2">
          <Download size={20} /> Download PDF
        </button>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* Editor Side */}
        <div className="glass p-10 rounded-[2.5rem] border-white/5 space-y-8">
           <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-indigo-400"><User size={20}/> Basic Info</h3>
              <input type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500" />
              <input type="text" placeholder="Professional Summary" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500" />
           </div>
           <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2 text-cyan-400"><GraduationCap size={20}/> Education</h3>
              <input type="text" placeholder="School/University Name" className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white outline-none focus:border-purple-500" />
           </div>
        </div>

        {/* Live Preview Side */}
        <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl text-slate-900 min-h-[600px] hidden lg:block">
           <div className="border-b-4 border-slate-900 pb-6 mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter">Your Name</h2>
              <p className="text-slate-500 font-bold mt-1 tracking-widest uppercase text-xs">Student & Aspiring Professional</p>
           </div>
           <div className="space-y-8">
              <section>
                 <h4 className="font-black uppercase text-sm border-b border-slate-200 pb-2 mb-4">Summary</h4>
                 <p className="text-sm leading-relaxed text-slate-600 italic">Self-motivated student with a strong academic background and interest in technology...</p>
              </section>
              <section>
                 <h4 className="font-black uppercase text-sm border-b border-slate-200 pb-2 mb-4">Education</h4>
                 <div className="flex justify-between font-bold text-sm">
                    <span>Higher Secondary Education</span>
                    <span>2022-2024</span>
                 </div>
              </section>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;