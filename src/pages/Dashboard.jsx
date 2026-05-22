import React, { useState, useEffect } from 'react';
import { Award, BookOpen, Target, Download, Heart, UserCircle, Loader2 } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: { 'x-auth-token': token }
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const downloadPDF = () => {
    const input = document.getElementById('report-area');
    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 10, 10, 190, 0);
      pdf.save("My_Career_Roadmap.pdf");
    });
  };

  if (loading) return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#02040a]">
      <Loader2 className="animate-spin text-indigo-500 mb-4" size={40} />
      <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">AI is generating your roadmap...</p>
    </div>
  );

  // If data is still null after loading, show error instead of crashing
  if (!data || !data.user) return <div className="text-white p-10">Error loading profile. Please try logging in again.</div>;

  return (
    <div className="animate-fadeIn max-w-6xl mx-auto pb-20">
      <div id="report-area">
        {/* Profile Header */}
        <div className="glass p-10 rounded-[3rem] border-white/5 flex flex-col md:flex-row justify-between items-center mb-10 gap-8">
          <div className="flex items-center gap-6">
            <div className="bg-indigo-600 p-5 rounded-[2rem] text-white shadow-xl shadow-indigo-500/20">
              <UserCircle size={40} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-white">{data.user.name}</h1>
              <p className="text-indigo-400 font-bold text-sm uppercase tracking-widest mt-1">
                {data.user.profile?.stream} Student • {data.user.profile?.category}
              </p>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="text-center">
              <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Board Score</p>
              <p className="text-3xl font-black text-white">{data.user.profile?.marks12 || data.user.profile?.marks10}%</p>
            </div>
            <button onClick={downloadPDF} className="bg-white text-black px-6 py-3 rounded-2xl font-black flex items-center gap-2 hover:bg-slate-200 transition-all">
              <Download size={18} /> Export PDF
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Exams */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 text-white">
              <Target className="text-indigo-500" /> Eligible Entrance Exams
            </h3>
            <div className="grid gap-4">
              {data.eligibleExams?.length > 0 ? data.eligibleExams.map(ex => (
                <div key={ex.name} className="glass p-6 rounded-[2rem] border-white/5 group hover:border-indigo-500/50 transition-all">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-black text-white">{ex.name}</h4>
                    <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded-full text-[10px] font-black uppercase">High Match</span>
                  </div>
                </div>
              )) : <p className="text-slate-500 italic">No exams matched your current score.</p>}
            </div>
          </section>

          {/* Scholarships */}
          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-3 text-white">
              <Award className="text-emerald-500" /> Matched Scholarships
            </h3>
            <div className="grid gap-4">
              {data.eligibleScholarships?.length > 0 ? data.eligibleScholarships.map(sc => (
                <div key={sc.name} className="glass p-6 rounded-[2rem] border-white/5 border-l-4 border-l-emerald-500 group">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-black text-white">{sc.name}</h4>
                    <Heart size={18} className="text-slate-600 group-hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                  <p className="text-emerald-400 font-bold mt-2 text-sm italic">Verified Eligibility</p>
                </div>
              )) : <p className="text-slate-500 italic">No scholarships matched your profile.</p>}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;