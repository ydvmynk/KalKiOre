import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Simulate signup
    alert("Account created successfully!");
    navigate('/login');
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border border-gray-100 animate-fadeIn">
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-8">Create Account</h2>
        <form onSubmit={handleSignup} className="space-y-5">
          <input type="text" placeholder="Full Name" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition" required />
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg">Sign Up</button>
        </form>
        <div className="mt-8 text-center text-gray-500">
          Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;