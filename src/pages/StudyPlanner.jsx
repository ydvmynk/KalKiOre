import React from 'react';
import { Calendar as CalendarIcon, CheckCircle, Clock, Plus } from 'lucide-react';

const StudyPlanner = () => {
  const tasks = [
    { title: "Complete Physics Chapter 4", time: "10:00 AM", status: "Done" },
    { title: "Solve JEE PYQs (2022)", time: "02:00 PM", status: "Pending" },
    { title: "Chemistry Revision", time: "06:00 PM", status: "Pending" },
  ];

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-4xl font-black text-white">Study <span className="gradient-text">Planner</span></h1>
          <p className="text-slate-400 mt-2">AI-optimized schedule for exam readiness.</p>
        </div>
        <button className="gradient-btn p-4 rounded-2xl shadow-xl">
          <Plus size={24} className="text-white" />
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {tasks.map((t, i) => (
            <div key={i} className="glass p-6 rounded-3xl border-white/5 flex items-center justify-between group hover:bg-white/5 transition-all">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${t.status === 'Done' ? 'bg-green-500/20 text-green-400' : 'bg-white/5 text-slate-400'}`}>
                  <CheckCircle size={20} />
                </div>
                <div>
                  <h4 className={`font-bold ${t.status === 'Done' ? 'text-slate-500 line-through' : 'text-white'}`}>{t.title}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-1"><Clock size={12}/> {t.time}</p>
                </div>
              </div>
              <button className="text-slate-600 hover:text-white transition-colors">Edit</button>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border-white/5 text-center">
             <CalendarIcon size={40} className="text-purple-500 mx-auto mb-4" />
             <h3 className="text-xl font-black text-white">May 2024</h3>
             <p className="text-slate-500 text-sm mt-1">12 Tasks Remaining</p>
             <div className="mt-6 h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-1/3 shadow-[0_0_10px_#4f46e5]"></div>
             </div>
             <p className="text-[10px] font-black text-indigo-400 uppercase mt-3 tracking-widest">33% Completed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudyPlanner;