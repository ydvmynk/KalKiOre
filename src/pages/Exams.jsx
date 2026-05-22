import React, { useState } from 'react';
import { Search, Filter, Calendar, ExternalLink, ChevronRight } from 'lucide-react';

const Exams = () => {
  const [filter, setFilter] = useState('All');

  const examData = [
    { id: 1, name: 'JEE Advanced', category: 'Engineering', date: 'June 02, 2024', eligibility: '85%+', link: 'https://jeeadv.ac.in/' },
    { id: 2, name: 'NEET UG', category: 'Medical', date: 'May 05, 2024', eligibility: '50%+', link: 'https://neet.nta.nic.in/' },
    { id: 3, name: 'CUET UG', category: 'General', date: 'May 15, 2024', eligibility: 'Passing marks', link: 'https://cuet.samarth.ac.in/' },
    { id: 4, name: 'CLAT', category: 'Law', date: 'Dec 03, 2024', eligibility: '45%+', link: 'https://consortiumofnlus.ac.in/' },
    { id: 5, name: 'BITSAT', category: 'Engineering', date: 'May 20, 2024', eligibility: '75% in PCM', link: 'https://www.bitsadmission.com/' },
    { id: 6, name: 'IPMAT', category: 'Management', date: 'May 23, 2024', eligibility: '60%+', link: 'https://www.iimidr.ac.in/' },
  ];

  const filteredExams = filter === 'All' ? examData : examData.filter(e => e.category === filter);

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Competitive <span className="gradient-text">Exams</span></h1>
          <p className="text-slate-400 mt-2 font-medium">Explore entrance tests based on your academic stream.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input type="text" placeholder="Search exams..." className="glass pl-10 pr-4 py-2 rounded-xl text-sm outline-none focus:border-purple-500 transition-all w-64" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-3 mb-10">
        {['All', 'Engineering', 'Medical', 'Management', 'Law', 'General'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest transition-all border ${
              filter === cat 
              ? 'bg-purple-600 border-purple-500 text-white shadow-lg shadow-purple-500/20' 
              : 'glass border-white/5 text-slate-400 hover:border-white/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Exam Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExams.map(exam => (
          <div key={exam.id} className="glass p-6 rounded-[2rem] border-white/5 hover:border-purple-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/5 rounded-full -mr-12 -mt-12 group-hover:bg-purple-600/10 transition-colors"></div>
            
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black bg-white/5 text-slate-400 px-3 py-1 rounded-lg border border-white/5 uppercase tracking-tighter">
                {exam.category}
              </span>
              <Calendar className="text-purple-400" size={18} />
            </div>

            <h3 className="text-2xl font-black mb-2 group-hover:text-purple-400 transition-colors">{exam.name}</h3>
            <p className="text-slate-500 text-sm font-medium mb-6">Eligibility: <span className="text-slate-300">{exam.eligibility}</span></p>
            
            <div className="flex items-center justify-between pt-6 border-t border-white/5">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-500 uppercase">Deadline</span>
                <span className="text-sm font-bold text-white">{exam.date}</span>
              </div>
              <a 
                href={exam.link} 
                target="_blank" 
                rel="noreferrer"
                className="bg-white/5 p-3 rounded-xl hover:bg-purple-600 hover:text-white transition-all text-slate-400"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;