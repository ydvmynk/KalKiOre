import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Bot, BookOpen, GraduationCap, 
  Wallet, Calendar, FileText, Settings, LogOut 
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const menu = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'KalKi AI Counselor', icon: Bot, path: '/ai-chat' },
    { name: 'Entrance Exams', icon: BookOpen, path: '/exams' },
    { name: 'Top Colleges', icon: GraduationCap, path: '/colleges' },
    { name: 'Scholarships', icon: Wallet, path: '/scholarships' },
    { name: 'Study Planner', icon: Calendar, path: '/planner' },
    { name: 'Resume Architect', icon: FileText, path: '/resume' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <aside className="w-72 glass border-r border-white/5 flex flex-col h-screen sticky top-0 z-40 sidebar-transition">
      <div className="p-8">
        <div className="flex flex-col">
            <span className="text-3xl font-black tracking-tighter gradient-text italic">KalKiOre</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">Towards Tomorrow</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
        {menu.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
              location.pathname === item.path 
              ? 'bg-gradient-to-r from-purple-600/20 to-cyan-600/20 text-white border border-white/10 shadow-lg shadow-purple-500/5' 
              : 'text-slate-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={20} className={location.pathname === item.path ? 'text-cyan-400' : 'text-slate-500'} />
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="p-6 border-t border-white/5">
        <button 
          onClick={() => { localStorage.clear(); window.location.href = '/'; }}
          className="w-full flex items-center gap-3 px-5 py-3 text-slate-500 hover:text-red-400 font-bold text-sm transition-colors rounded-xl hover:bg-red-400/5"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;