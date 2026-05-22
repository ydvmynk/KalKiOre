const opportunities = {
    exams: [
        { name: "IIT-JEE Advanced", minMarks: 85, streams: ["Science"], categories: ["General", "OBC", "SC", "ST"], description: "For Engineering in IITs" },
        { name: "JEE Mains", minMarks: 60, streams: ["Science"], categories: ["General", "OBC", "SC", "ST"], description: "For NITs and IIITs" },
        { name: "NEET", minMarks: 50, streams: ["Science"], categories: ["General", "OBC", "SC", "ST"], description: "For Medical/MBBS" },
        { name: "CUET", minMarks: 50, streams: ["Science", "Commerce", "Arts"], categories: ["General", "OBC", "SC", "ST"], description: "For Central Universities" },
        { name: "NDA Entrance", minMarks: 60, streams: ["Science"], categories: ["General"], description: "Join Indian Defense" },
        { name: "CLAT", minMarks: 45, streams: ["Science", "Commerce", "Arts"], categories: ["General", "OBC", "SC", "ST"], description: "For Law/NLUs" },
        { name: "IPMAT", minMarks: 60, streams: ["Commerce", "Science"], categories: ["General"], description: "IIM Indore Integrated Management" }
    ],
    scholarships: [
        { name: "Inspire Scholarship", minMarks: 80, incomeLimit: 600000, categories: ["General", "OBC", "SC", "ST"], streams: ["Science"], amount: "₹80,000/year" },
        { name: "Post-Matric (SC/ST)", minMarks: 45, incomeLimit: 250000, categories: ["SC", "ST"], streams: ["Science", "Commerce", "Arts"], amount: "Full Fee Waiver" },
        { name: "HDFC Badhte Kadam", minMarks: 60, incomeLimit: 600000, categories: ["General", "OBC", "SC", "ST"], streams: ["Science", "Commerce", "Arts"], amount: "₹15,000 - ₹75,000" },
        { name: "Reliance Foundation", minMarks: 60, incomeLimit: 300000, categories: ["General", "OBC", "SC", "ST"], streams: ["Science", "Commerce", "Arts"], amount: "Up to ₹2 Lakhs" }
    ]
};

module.exports = opportunities;