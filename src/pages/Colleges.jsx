import React from 'react';
import { Search, MapPin, Building2, Star, ArrowUpRight } from 'lucide-react';

const Colleges = () => {
  const colleges = [
    { name: "IIT Bombay", location: "Mumbai, MH", fees: "₹2.2L/yr", cutoff: "Top 500 AIR", rating: 4.9 },
    { name: "Delhi University", location: "New Delhi", fees: "₹15k/yr", cutoff: "98%+", rating: 4.7 },
    { name: "BITS Pilani", location: "Pilani, RJ", fees: "₹5.5L/yr", cutoff: "320+ BITSAT", rating: 4.8 },
  ];

  return (
    <div className="max-w-6xl mx-auto animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-4xl font-black text-white">Top <span className="gradient-text">Colleges</span></h1>
          <p className="text-slate-400 mt-2">Predicted based on your merit and stream.</p>
        </div>
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
          <input type="text" placeholder="Search by name or city..." className="w-full glass py-4 pl-12 pr-4 rounded-2xl outline-none focus:border-purple-500 transition-all text-white" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {colleges.map((col, i) => (
          <div key={i} className="glass rounded-[2.5rem] overflow-hidden border-white/5 group hover:border-purple-500/30 transition-all">
            <div className="h-48 bg-gradient-to-br from-slate-800 to-slate-900 relative">
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <Building2 size={80} className="text-white" />
              </div>
              <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                <Star size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">{col.rating}</span>
              </div>
            </div>
            <div className="p-8">
              <h3 className="text-xl font-black text-white group-hover:text-purple-400 transition-colors">{col.name}</h3>
              <p className="flex items-center gap-1 text-slate-500 text-sm mt-1 font-medium">
                <MapPin size={14} /> {col.location}
              </p>
              <div className="mt-6 flex justify-between items-center pt-6 border-t border-white/5">
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase">Cutoff</p>
                  <p className="font-bold text-white text-sm">{col.cutoff}</p>
                </div>
                <button className="bg-white/5 p-3 rounded-xl hover:bg-purple-600 hover:text-white transition-all">
                  <ArrowUpRight size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colleges;