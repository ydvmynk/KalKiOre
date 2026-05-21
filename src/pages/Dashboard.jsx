import React, { useState, useEffect } from 'react';
import { CheckCircle, BookOpen, Award, Map, Heart, Download } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const Dashboard = () => {
  const [savedScholarships, setSavedScholarships] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedScholarships')) || [];
    setSavedScholarships(saved);
  }, []);

  const toggleSave = (sch) => {
    let updated;
    if (savedScholarships.includes(sch)) {
      updated = savedScholarships.filter(item => item !== sch);
    } else {
      updated = [...savedScholarships, sch];
    }
    setSavedScholarships(updated);
    localStorage.setItem('savedScholarships', JSON.stringify(updated));
  };

  const downloadPDF = () => {
    const input = document.getElementById('roadmap-content');
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("Career_Roadmap.pdf");
    });
  };

  const results = {
    exams: ['JEE Mains', 'BITSAT', 'CUET', 'NDA'],
    scholarships: ['Inspire Scholarship', 'HDFC Badhte Kadam', 'Reliance Foundation', 'PM Scholarship'],
    careers: ['Software Engineer', 'Aerospace Engineer', 'Data Scientist']
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10 animate-fadeIn">
      <div className="flex justify-between items-center border-b pb-6">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Your AI Guidance</h1>
          <p className="text-gray-500">Personalized recommendations based on your profile.</p>
        </div>
        <button onClick={downloadPDF} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition">
          <Download size={20} /> Download PDF Roadmap
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-blue-500">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-blue-600"><BookOpen /> Eligible Exams</h2>
          <div className="space-y-3">
            {results.exams.map(e => <div key={e} className="p-3 bg-blue-50 rounded-lg text-blue-800 font-medium flex items-center gap-2"><CheckCircle size={16}/> {e}</div>)}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-green-500">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-green-600"><Award /> Scholarships</h2>
          <div className="space-y-3">
            {results.scholarships.map(s => (
              <div key={s} className="p-3 bg-green-50 rounded-lg text-green-800 font-medium flex justify-between items-center">
                <span>{s}</span>
                <button onClick={() => toggleSave(s)}>
                  <Heart size={20} fill={savedScholarships.includes(s) ? "#ef4444" : "none"} color={savedScholarships.includes(s) ? "#ef4444" : "#10b981"} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-t-4 border-purple-500">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-600"><Map /> Career Paths</h2>
          <div className="space-y-3">
            {results.careers.map(c => <div key={c} className="p-3 bg-purple-50 rounded-lg text-purple-800 font-medium text-center">{c}</div>)}
          </div>
        </div>
      </div>

      <div id="roadmap-content" className="bg-white p-10 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold mb-8">Personalized Preparation Roadmap</h2>
        <div className="relative border-l-4 border-blue-100 ml-4 space-y-12">
          <div className="pl-8 relative">
            <div className="absolute -left-[11px] top-1 w-5 h-5 bg-blue-600 rounded-full shadow"></div>
            <h4 className="text-xl font-bold">Phase 1: Concept Building</h4>
            <p className="text-gray-600 mt-2">Master NCERT syllabus for your core subjects. Complete 80% of theory by September.</p>
          </div>
          <div className="pl-8 relative">
            <div className="absolute -left-[11px] top-1 w-5 h-5 bg-blue-600 rounded-full shadow"></div>
            <h4 className="text-xl font-bold">Phase 2: Applications & Testing</h4>
            <p className="text-gray-600 mt-2">Apply for all eligible scholarships. Start taking weekly mock tests for JEE/CUET.</p>
          </div>
        </div>
      </div>

      {savedScholarships.length > 0 && (
        <div className="bg-white p-8 rounded-2xl shadow-md border-2 border-red-100">
          <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2"><Heart fill="red"/> Saved Scholarships</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {savedScholarships.map(item => (
              <div key={item} className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 font-semibold text-center">{item}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;