const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');

// 1. Configuration
dotenv.config();
const app = express();

// 2. Middleware
app.use(express.json());
app.use(cors());

// 3. Debugging (Optional but helpful)
console.log("Checking MONGO_URI:", process.env.MONGO_URI);

// 4. API Routes
app.use('/api/auth', authRoutes);

// 5. Test Route
app.get('/', (req, res) => {
    res.send("EduGuide AI Backend is running...");
});

// 6. Database Connection & Server Start
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });