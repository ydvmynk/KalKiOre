import React, { useContext } from 'react';
import { Search, Bell, User, Menu } from 'lucide-react';
import { AuthContext } from '../context/AuthContext.jsx';

const Topbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="h-20 border-b border-white/5 bg-[#02040a]/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
      {/* Search Bar */}
      <div className="relative w-96 hidden md:block">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input 
          type="text" 
          placeholder="Search exams, colleges, or scholarships..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
        />
      </div>

      {/* User Actions */}
      <div className="flex items-center gap-6 ml-auto">
        <button className="relative p-2 text-slate-400 hover:text-white transition-colors bg-white/5 rounded-xl border border-white/5">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#02040a]"></span>
        </button>
        
        <div className="h-10 w-[1px] bg-white/10 mx-2"></div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-white leading-none">{user?.name || "Student"}</p>
            <p className="text-[10px] text-slate-500 font-black uppercase mt-1 tracking-tighter">Pro Member</p>
          </div>
          <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-cyan-600 rounded-2xl p-[2px] shadow-lg shadow-purple-500/20">
            <div className="w-full h-full bg-[#02040a] rounded-[14px] flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
