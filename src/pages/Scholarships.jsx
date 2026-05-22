import React from 'react';
import { Wallet, Award, CheckCircle, ArrowUpRight } from 'lucide-react';

const Scholarships = () => {
  const scholarships = [
    { name: 'Inspire Scholarship', amount: '₹80,000/yr', criteria: 'Top 1% in 12th Board', provider: 'Govt. of India' },
    { name: 'HDFC Badhte Kadam', amount: '₹75,000', criteria: 'Family Income < 6L', provider: 'HDFC Bank' },
    { name: 'Reliance Foundation', amount: '₹2,00,000', criteria: 'Merit-cum-Means', provider: 'Reliance' },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="mb-12">
        <h1 className="text-4xl font-black tracking-tight text-white">Financial <span className="gradient-text">Support</span></h1>
        <p className="text-slate-400 mt-2 font-medium text-lg">Apply for grants and scholarships matched by our AI.</p>
      </div>

      <div className="grid gap-6">
        {scholarships.map((s, i) => (
          <div key={i} className="glass p-8 rounded-[2.5rem] border-white/5 flex flex-col md:flex-row items-center justify-between group hover:border-cyan-500/30 transition-all">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-cyan-600/10 rounded-[1.5rem] flex items-center justify-center text-cyan-400">
                <Award size={32} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">{s.name}</h3>
                <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{s.provider}</p>
              </div>
            </div>

            <div className="flex items-center gap-12 mt-8 md:mt-0 w-full md:w-auto">
              <div className="text-center md:text-right">
                <p className="text-[10px] font-black text-slate-500 uppercase">Award Amount</p>
                <p className="text-2xl font-black text-cyan-400">{s.amount}</p>
              </div>
              <button className="gradient-btn px-8 py-3 rounded-2xl font-black text-sm flex items-center gap-2 flex-1 md:flex-none">
                Apply Now <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;