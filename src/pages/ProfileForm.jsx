import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import { Upload, Loader2, CheckCircle2, ChevronRight, ChevronLeft, Info } from 'lucide-react';

const ProfileForm = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [isScanning, setIsScanning] = useState(false);
    const [formData, setFormData] = useState({
        class: '12th', stream: 'Science', marks: '',
        category: 'General', state: '', income: '', interests: ''
    });

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setIsScanning(true);
        Tesseract.recognize(file, 'eng').then(({ data: { text } }) => {
            const match = text.match(/(\d{2,3}(\.\d+)?)\s*%/);
            if (match) setFormData({ ...formData, marks: match[1] });
            setIsScanning(false);
        });
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('http://localhost:5000/api/auth/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json', 'x-auth-token': token },
                body: JSON.stringify(formData)
            });
            if (res.ok) navigate('/dashboard');
        } catch (err) { alert("Backend Error"); }
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] shadow-2xl border border-white overflow-hidden">
                <div className="bg-indigo-600 p-10 text-white">
                    <h2 className="text-3xl font-black italic">EduGuide AI Profiler</h2>
                    <p className="text-indigo-100 mt-2 font-medium">Providing accurate matches based on Indian Reservation & Merit rules.</p>
                </div>

                <div className="p-10">
                    <div className="flex items-center gap-4 mb-10">
                        {[1, 2, 3].map(num => (
                            <div key={num} className={`flex-1 h-2 rounded-full transition-all ${step >= num ? 'bg-indigo-600' : 'bg-slate-100'}`}></div>
                        ))}
                    </div>

                    <form onSubmit={handleFinalSubmit} className="space-y-8">
                        {step === 1 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Social Category</label>
                                        <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none font-semibold" onChange={e => setFormData({ ...formData, category: e.target.value })}>
                                            <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Academic Stream</label>
                                        <select className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none font-semibold" onChange={e => setFormData({ ...formData, stream: e.target.value })}>
                                            <option>Science</option><option>Commerce</option><option>Arts</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Current State</label>
                                    <input type="text" placeholder="e.g. Delhi, Karnataka..." className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" onChange={e => setFormData({ ...formData, state: e.target.value })} />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div className="border-4 border-dashed border-indigo-50 rounded-[2rem] p-10 text-center bg-indigo-50/20 group hover:border-indigo-200 transition-all">
                                    <input type="file" id="ocr" className="hidden" accept="image/*" onChange={handleFileUpload} />
                                    <label htmlFor="ocr" className="cursor-pointer flex flex-col items-center">
                                        {isScanning ? <Loader2 className="animate-spin text-indigo-600 mb-4" size={40} /> : <Upload className="text-indigo-600 mb-4" size={40} />}
                                        <p className="text-lg font-black text-indigo-900">Upload Marksheet</p>
                                        <p className="text-indigo-400 text-sm mt-1">Our AI will read your percentage instantly</p>
                                    </label>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Percentage (%)</label>
                                    <input type="number" value={formData.marks} placeholder="85.5" className="w-full p-5 bg-slate-900 text-white rounded-2xl text-2xl font-black text-center outline-none" onChange={e => setFormData({ ...formData, marks: e.target.value })} />
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="space-y-6 animate-fadeIn">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Annual Family Income (INR)</label>
                                    <input type="number" placeholder="₹ 4,00,000" className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none font-bold" onChange={e => setFormData({ ...formData, income: e.target.value })} />
                                    <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1"><Info size={12}/> Required for EWS and Scholarship eligibility.</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Interest Keywords</label>
                                    <input type="text" placeholder="Coding, Space, Management..." className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 border-none" onChange={e => setFormData({ ...formData, interests: e.target.value })} />
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between items-center pt-8">
                            <button type="button" onClick={() => setStep(step - 1)} className={`font-bold text-slate-400 hover:text-slate-900 ${step === 1 && 'invisible'}`}>Back</button>
                            <button type={step === 3 ? "submit" : "button"} onClick={() => step < 3 && setStep(step + 1)} className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-indigo-200 hover:bg-indigo-700 transition-all flex items-center gap-2">
                                {step === 3 ? "Generate Professional Roadmap" : "Continue"} <ChevronRight size={20} />
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileForm;