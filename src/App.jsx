import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import Sidebar from './components/Sidebar.jsx';
import Topbar from './components/Topbar.jsx';

// Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProfileSetup from './pages/ProfileSetup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import AIChat from './pages/AIChat.jsx';
import Exams from './pages/Exams.jsx';
import Scholarships from './pages/Scholarships.jsx';

// This layout wraps pages that need the Sidebar
const PrivateLayout = ({ children }) => {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-[#02040a]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Topbar />
        <main className="flex-1 p-6 md:p-10 overflow-y-auto custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Pages (User must be logged in) */}
          <Route path="/setup" element={<PrivateLayout><ProfileSetup /></PrivateLayout>} />
          <Route path="/dashboard" element={<PrivateLayout><Dashboard /></PrivateLayout>} />
          <Route path="/ai-chat" element={<PrivateLayout><AIChat /></PrivateLayout>} />
          <Route path="/exams" element={<PrivateLayout><Exams /></PrivateLayout>} />
          <Route path="/scholarships" element={<PrivateLayout><Scholarships /></PrivateLayout>} />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}