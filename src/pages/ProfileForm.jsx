import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import { Upload, Loader2 } from 'lucide-react';

const ProfileForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isScanning, setIsScanning] = useState(false);
  const [formData, setFormData] = useState({
    name: '', class: '12th', stream: 'Science', marks: '',
    category: 'General', state: '', income: '', interests: ''
  });

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsScanning(true);
    Tesseract.recognize(file, 'eng')
      .then(({ data: { text } }) => {
        const match = text.match(/(\d{2,3}(\.\d+)?)\s*%/);
        if (match) {
          setFormData({ ...formData, marks: match[1] });
          alert(`Successfully scanned! Marks: ${match[1]}%`);
        } else {
          alert("Could not find percentage. Please enter manually.");
        }
        setIsScanning(false);
      });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  const handleSubmit = (e) => { e.preventDefault(); navigate('/dashboard'); };

  return (
    <div className="max-w-2xl mx-auto mt-12 p-10 bg-white shadow-2xl rounded-3xl border border-gray-100">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Build Your Profile</h2>
        <div className="flex justify-center gap-2 mt-4">
          {[1, 2, 3].map(i => <div key={i} className={`h-2 w-16 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-gray-200'}`}></div>)}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div><label className="block text-sm font-bold mb-2">Full Name</label>
            <input type="text" className="w-full p-4 border rounded-xl" placeholder="John Doe" 
              onChange={(e) => setFormData({...formData, name: e.target.value})} /></div>
            <div><label className="block text-sm font-bold mb-2">State</label>
            <input type="text" className="w-full p-4 border rounded-xl" placeholder="Maharashtra" 
              onChange={(e) => setFormData({...formData, state: e.target.value})} /></div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-6 border-2 border-dashed border-blue-200 rounded-2xl bg-blue-50 text-center">
              <label className="cursor-pointer flex flex-col items-center gap-2">
                {isScanning ? <Loader2 className="animate-spin text-blue-600" /> : <Upload className="text-blue-600" />}
                <span className="text-blue-700 font-bold">Scan Marksheet (Auto-fill Marks)</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} />
              </label>
            </div>
            <div><label className="block text-sm font-bold mb-2">Marks Percentage (%)</label>
            <input type="number" value={formData.marks} className="w-full p-4 border rounded-xl" placeholder="e.g. 85" 
              onChange={(e) => setFormData({...formData, marks: e.target.value})} /></div>
            <div><label className="block text-sm font-bold mb-2">Annual Family Income</label>
            <input type="number" className="w-full p-4 border rounded-xl" placeholder="₹" 
              onChange={(e) => setFormData({...formData, income: e.target.value})} /></div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <label className="block text-sm font-bold mb-2">Field of Interest</label>
            <textarea className="w-full p-4 border rounded-xl h-32" placeholder="Tell us what you love (e.g. Space, Coding, Art...)" 
              onChange={(e) => setFormData({...formData, interests: e.target.value})} />
          </div>
        )}

        <div className="flex justify-between pt-6">
          {step > 1 && <button type="button" onClick={prevStep} className="px-8 py-3 font-bold text-gray-500 hover:text-gray-800">Back</button>}
          {step < 3 ? (
            <button type="button" onClick={nextStep} className="ml-auto bg-blue-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg">Next</button>
          ) : (
            <button type="submit" className="ml-auto bg-green-600 text-white px-10 py-3 rounded-xl font-bold hover:bg-green-700 shadow-lg">Generate Guidance</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;