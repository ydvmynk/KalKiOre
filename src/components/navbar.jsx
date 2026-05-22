import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { GraduationCap, LogOut, LayoutDashboard, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { user, token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-indigo-600 p-2.5 rounded-2xl group-hover:rotate-6 transition-all shadow-lg shadow-indigo-200">
              <GraduationCap className="text-white" size={28} />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">EduGuide<span className="text-indigo-600">AI</span></span>
          </Link>

          <div className="flex items-center gap-4 md:gap-10">
            <Link to="/" className="text-sm font-bold text-slate-500 hover:text-indigo-600 transition hidden sm:block">Home</Link>
            
            {token ? (
              <div className="flex items-center gap-3 md:gap-6">
                <Link to="/dashboard" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-indigo-600 px-4 py-2 bg-slate-50 rounded-xl transition">
                  <LayoutDashboard size={18} /> <span className="hidden md:inline">Dashboard</span>
                </Link>
                
                <div className="flex items-center gap-2 pl-4 border-l border-slate-200">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'S'}
                  </div>
                  <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 md:gap-6">
                <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-indigo-600 transition">Sign In</Link>
                <Link to="/signup" className="bg-slate-900 text-white px-6 py-3 rounded-2xl text-sm font-bold hover:bg-black transition shadow-xl shadow-slate-200">
                  Join Free
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;