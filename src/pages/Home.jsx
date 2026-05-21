import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] text-center px-6 bg-gradient-to-b from-white to-blue-50">
      <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-8 animate-bounce">
        <Sparkles size={16} /> New: AI Career Roadmap Generator
      </div>
      
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight max-w-4xl">
        Shape Your Future with <span className="text-blue-600">AI-Powered</span> Guidance
      </h1>
      
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mb-10 leading-relaxed">
        Discover the best career paths, scholarships, and entrance exams personalized just for you. 
        Don't let confusion stop your dreams. Get your roadmap in 2 minutes.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <button 
          onClick={() => navigate('/get-started')}
          className="bg-blue-600 text-white px-10 py-4 rounded-2xl text-lg font-bold hover:bg-blue-700 transition shadow-xl flex items-center gap-2 group"
        >
          Start My Journey <ArrowRight className="group-hover:translate-x-1 transition" />
        </button>
        
        <button 
          onClick={() => navigate('/login')}
          className="bg-white text-gray-700 border-2 border-gray-200 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition"
        >
          Login to Account
        </button>
      </div>

      <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50">
        <div className="font-bold text-xl italic text-gray-400 text-center">#JEE</div>
        <div className="font-bold text-xl italic text-gray-400 text-center">#NEET</div>
        <div className="font-bold text-xl italic text-gray-400 text-center">#CUET</div>
        <div className="font-bold text-xl italic text-gray-400 text-center">#Scholarships</div>
      </div>
    </div>
  );
};

export default Home;
