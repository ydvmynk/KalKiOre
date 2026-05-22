# 🎓 EduGuide AI — KalKiOre

> **AI-Powered Career & Scholarship Guidance System for Students**

EduGuide AI is a full-stack web application that helps students discover their ideal career paths, eligible entrance exams, and scholarships. By combining OCR technology and Google Gemini's Generative AI, it delivers a personalized, data-driven roadmap — tailored to every student's academic background and circumstances.

---

## 🚀 Key Features

### 🔐 Secure Authentication & Session Management
- **JWT-based Auth** — Secure sign-up and login with JSON Web Tokens and Bcrypt password hashing.
- **Reactive UI** — Uses React Context API to instantly reflect login/logout state across the app.

### 📝 Smart Academic Profiling
- **OCR Marksheet Scanner** — Powered by [Tesseract.js](https://github.com/naptha/tesseract.js). Students upload their marksheet and the app automatically extracts their percentage, pre-filling the form.
- **Multi-Step Dynamic Form** — A progressive profiling wizard capturing stream, category, state, and income details.

### 🧠 AI Counselor (Chatbot)
- **Real-Time Guidance** — Integrated with the Google Gemini 1.5 Flash API.
- **Context-Aware Responses** — Provides personalized advice on exams like JEE, NEET, CUET, and tailored career queries.

### 📊 Personalized Dashboard
- **Eligibility Engine** — Automatically suggests relevant entrance exams and scholarships based on the student's marks and profile.
- **Save Feature** — Bookmark scholarships for later review using browser local storage.
- **PDF Export** — Generate and download a professional Career Roadmap PDF using [jsPDF](https://github.com/parallax/jsPDF) and [html2canvas](https://github.com/niklasvh/html2canvas).

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | React.js (Vite) |
| **Styling** | Tailwind CSS |
| **Icons** | Lucide React |
| **Animations** | Framer Motion |
| **Charts** | Chart.js + react-chartjs-2 |
| **OCR** | Tesseract.js |
| **State Management** | React Context API |
| **Routing** | React Router DOM v6 |
| **PDF Generation** | jsPDF + html2canvas |
| **Backend Runtime** | Node.js |
| **Backend Framework** | Express.js |
| **Database** | MongoDB Atlas (Cloud) |
| **Security** | JWT + Bcrypt |
| **AI** | Google Gemini 1.5 Flash API |

---

## 📂 Project Structure

```
KalKiOre/
├── backend/
│   ├── controllers/      # Business logic (Auth, Profile updates)
│   ├── middleware/        # JWT protection logic
│   ├── models/            # MongoDB Schemas (User, Profile)
│   ├── routes/            # API Endpoints
│   └── server.js          # Entry point
├── src/
│   ├── components/        # Navbar, Chatbot, ProtectedRoutes
│   ├── context/           # AuthContext (global state management)
│   ├── pages/             # Home, Login, Signup, ProfileForm, Dashboard
│   ├── App.jsx            # Routes & Provider wrapping
│   ├── main.jsx           # App initialization
│   └── index.css          # Global styles & Tailwind imports
├── .env                   # Frontend env variables (Gemini API Key)
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```

---

## ⚙️ Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account and cluster
- A Google Gemini API Key — get one from [Google AI Studio](https://aistudio.google.com/app/apikey)

---

### 1. Clone the Repository

```bash
git clone https://github.com/ydvmynk/KalKiOre.git
cd KalKiOre
```

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend/` folder:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=any_random_secret_string
PORT=5000
```

Start the backend server:

```bash
npm run dev
```

The backend will run at `http://localhost:5000`.

---

### 3. Frontend Setup

```bash
cd ..        # return to root
npm install
```

Create a `.env` file in the **root** folder:

```env
VITE_GEMINI_KEY=your_gemini_api_key
```

Start the frontend dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview the production build |

---

## 🗺️ Future Roadmap

- [ ] **Multi-language OCR** — Support for regional-language marksheets
- [ ] **Email Notifications** — Deadline alerts for scholarships and exam registrations
- [ ] **Mentor Connect** — Book video consultations with career experts
- [ ] **Advanced Analytics** — Job market trend charts for selected career paths
- [ ] **Mobile App** — React Native version for on-the-go guidance

---

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss what you'd like to change, then submit a pull request.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source. See the repository for license details.

---

## 👤 Author

**ydvmynk** — [GitHub Profile](https://github.com/ydvmynk)

---

> _Empowering every student with the right guidance, at the right time._ 🌟
