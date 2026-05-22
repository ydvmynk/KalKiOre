import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext.jsx';
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Save to Context & LocalStorage
        login(data.token, data.user.name);
        
        // BETTER CHECK: See if marks10 or marks12 exists
        const hasProfile = data.user.profile && (data.user.profile.marks10 || data.user.profile.marks12);
        
        if (!hasProfile) {
          navigate('/setup');
        } else {
          navigate('/dashboard');
        }
      } else {
        alert(data.msg || "Invalid Credentials");
      }
    } catch (error) {
      alert("Error: Backend is not responding.");
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex items-center justify-center p-6">
      <div className="max-w-md w-full glass p-10 rounded-[3rem] border-white/5 animate-fadeIn">
        <div className="text-center mb-10">
          <div className="inline-flex p-3 bg-indigo-500/20 rounded-2xl text-indigo-400 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-white">Welcome Back</h2>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input 
            type="email" 
            placeholder="Email Address" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500" 
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white outline-none focus:border-indigo-500" 
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required 
          />
          <button type="submit" className="w-full gradient-btn text-white py-4 rounded-2xl font-black flex justify-center items-center gap-2 group">
            Sign In <ArrowRight size={20} />
          </button>
        </form>
        <p className="mt-8 text-center text-slate-500 text-sm">
          New student? <Link to="/signup" className="text-indigo-400 font-bold hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;