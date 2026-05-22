import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, GraduationCap, Wallet, Target, ChevronRight, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import Tesseract from 'tesseract.js';

export default function ProfileSetup() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    marks10: '', marks12: '', stream: 'Science',
    category: 'General', state: '', familyIncome: '', interests: []
  });

  const handleOCR = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
      const match = text.match(/(\d{2,3}(\.\d+)?)\s*%/);
      if (match) setFormData({ ...formData, marks12: match[1] });
      setLoading(false);
    });
  };

  const submitProfile = async () => {
    const token = localStorage.getItem('token');
    try {
        const res = await fetch('http://localhost:5000/api/auth/profile', {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json', 
                'x-auth-token': token 
            },
            body: JSON.stringify(formData) // formData must contain marks10, marks12, etc.
        });
        
        if (res.ok) {
            navigate('/dashboard');
        } else {
            const errData = await res.json();
            alert("Error: " + errData.msg);
        }
    } catch (err) {
        alert("Backend connection failed.");
    }
};

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 animate-fadeIn">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-black mb-3">Build Your <span className="gradient-text">AI Academic DNA</span></h1>
        <p className="text-slate-400">Step {step} of 3: Personalized guidance requires precise data.</p>
      </div>

      <div className="glass p-10 rounded-[3rem] border-white/5 relative overflow-hidden">
        
        {/* STEP 1: ACADEMICS */}
        {step === 1 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 text-purple-400 mb-2">
              <GraduationCap size={24} /> <h3 className="text-xl font-bold">Academic Performance</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">10th Score (%)</label>
                <input type="number" value={formData.marks10} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-purple-500" placeholder="e.g. 90" onChange={e => setFormData({...formData, marks10: e.target.value})} />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Current Stream</label>
                <select value={formData.stream} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none" onChange={e => setFormData({...formData, stream: e.target.value})}>
                  <option>Science</option><option>Commerce</option><option>Arts</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: SOCIO-ECONOMIC (For Scholarships & Cutoffs) */}
        {step === 2 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 text-cyan-400 mb-2">
              <Wallet size={24} /> <h3 className="text-xl font-bold">Eligibility & Finance</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Social Category</label>
                <select value={formData.category} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none" onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Family Annual Income</label>
                <input type="number" value={formData.familyIncome} className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-cyan-500" placeholder="₹ per annum" onChange={e => setFormData({...formData, familyIncome: e.target.value})} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: OCR & INTERESTS */}
        {step === 3 && (
          <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center gap-3 text-pink-400 mb-2">
              <BrainCircuit size={24} /> <h3 className="text-xl font-bold">Interests & Verification</h3>
            </div>
            
            <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-10 text-center hover:border-pink-500/50 transition-all group">
               <input type="file" id="ocr" className="hidden" onChange={handleOCR} />
               <label htmlFor="ocr" className="cursor-pointer flex flex-col items-center">
                 {loading ? <Loader2 className="animate-spin text-pink-400 mb-4" size={40} /> : <Upload className="text-pink-400 mb-4" size={40} />}
                 <p className="font-bold">Scan 12th Marksheet</p>
                 <p className="text-xs text-slate-500 mt-1">AI will automatically verify your merit score</p>
               </label>
               {formData.marks12 && <div className="mt-4 text-green-400 font-bold">Detected: {formData.marks12}%</div>}
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Select Interests</label>
              <div className="flex flex-wrap gap-3">
                {['Coding', 'Govt Jobs', 'Medical', 'Design', 'Business'].map(tag => (
                  <button 
                    key={tag} 
                    type="button"
                    onClick={() => setFormData({...formData, interests: [...formData.interests, tag]})}
                    className={`px-6 py-2 rounded-full text-xs font-bold border transition-all ${formData.interests.includes(tag) ? 'bg-pink-600 border-pink-500' : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'}`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS */}
        <div className="mt-12 flex justify-between items-center border-t border-white/5 pt-8">
          <button 
            onClick={() => setStep(s => s - 1)} 
            className={`font-bold text-slate-500 hover:text-white transition-colors ${step === 1 && 'invisible'}`}
          >
            Previous
          </button>
          
          <button 
            onClick={() => step < 3 ? setStep(s => s + 1) : submitProfile()}
            className="gradient-btn px-10 py-4 rounded-2xl font-black flex items-center gap-2 group"
          >
            {step === 3 ? "Generate Roadmap" : "Continue Journey"} 
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </div>

      </div>
    </div>
  );
}