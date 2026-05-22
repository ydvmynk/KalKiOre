🎓 EduGuide AI
AI-Powered Career & Scholarship Guidance System
EduGuide AI is a professional-grade web application designed to help students discover their ideal career paths, eligible entrance exams, and scholarships. By leveraging OCR (Optical Character Recognition) and Generative AI (Google Gemini), it provides a personalized, data-driven roadmap for every student.
🚀 Key Features
🔐 Secure Authentication & Session Management
MERN Auth: Secure Sign-up and Login using JWT (JSON Web Tokens) and Bcrypt password hashing.
Reactive UI: Uses React Context API to instantly update the interface upon login/logout.
📝 Smart Academic Profiling
OCR Marksheet Scanner: Powered by Tesseract.js. Students can upload their marksheet, and the AI automatically extracts their percentage to fill the form.
Multi-Step Dynamic Form: A sleek, progressive profiling system that captures stream, category, state, and income data.
🧠 AI Counselor (Chatbot)
Real-Time Guidance: Integrated with Google Gemini 1.5 Flash API.
Context-Aware: Provides instant advice on exams like JEE, NEET, CUET, and personalized career queries.
📊 Personalized Dashboard
Eligibility Engine: Automatically suggests exams and scholarships based on the user's marks and background.
Save Feature: Bookmark scholarships for later viewing using browser local storage.
PDF Export: Generate and download a high-quality, professional Career Roadmap PDF using jsPDF and html2canvas.
🛠️ Tech Stack
Frontend:
Framework: React.js (Vite)
Styling: Tailwind CSS (Modern "EdTech" Design)
Icons: Lucide React
OCR: Tesseract.js
State Management: React Context API
Backend:
Runtime: Node.js
Framework: Express.js
Database: MongoDB Atlas (Cloud)
Security: JWT, Bcrypt
AI Integration:
Google Gemini AI API
📂 Project Structure
code
Bash
KALKIORE/
├── backend/
│   ├── controllers/    # Business logic (Auth, Profile updates)
│   ├── middleware/     # JWT protection logic
│   ├── models/         # MongoDB Schema (User, Profile)
│   ├── routes/         # API Endpoints
│   └── server.js       # Entry point
├── src/
│   ├── components/     # Navbar, Chatbot, ProtectedRoutes
│   ├── context/        # AuthContext (Instant UI updates)
│   ├── pages/          # Home, Login, Signup, ProfileForm, Dashboard
│   ├── App.jsx         # Routes & Provider wrapping
│   ├── main.jsx        # App initialization
│   └── index.css       # Global styles & Tailwind
├── .env                # API Keys (Gemini)
└── package.json        # Dependencies
⚙️ Installation & Setup
1. Prerequisites
Node.js installed
MongoDB Atlas Account
Google Gemini API Key (Get it from Google AI Studio)
2. Backend Setup
code
Bash
cd backend
npm install
Create a .env file inside the backend folder:
code
Env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string
PORT=5000
Run the server:
code
Bash
npm run dev
3. Frontend Setup
code
Bash
cd ..
npm install
Create a .env file in the root folder:
code
Env
VITE_GEMINI_KEY=your_gemini_api_key
Run the frontend:
code
Bash
npm run dev
🗺️ Future Roadmap

OCR Verification: Multi-language marksheet support.

Email Notifications: Alerts for scholarship and exam application deadlines.

Mentor Connect: Video consultation booking with career experts.

Advanced Analytics: Charts showing job market trends for selected career paths.