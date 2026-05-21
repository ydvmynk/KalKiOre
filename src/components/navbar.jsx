import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center p-4 md:p-6 bg-white shadow-sm border-b sticky top-0 z-40">
      {/* Logo */}
      <Link to="/" className="flex items-center gap-2 text-xl md:text-2xl font-bold text-blue-600">
        <GraduationCap size={32} />
        <span>EduGuide AI</span>
      </Link>
      
      {/* Navigation Links */}
      <div className="flex items-center gap-4 md:gap-8 font-medium">
        <Link to="/" className="text-gray-600 hover:text-blue-600 transition hidden sm:block">Home</Link>
        <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 transition hidden sm:block">Dashboard</Link>
        
        <div className="flex gap-3 md:gap-5 items-center border-l pl-4 md:pl-8">
          <Link to="/login" className="text-gray-600 hover:text-blue-600 font-semibold">
            Login
          </Link>
          <Link to="/get-started" className="bg-blue-600 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md whitespace-nowrap">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;