const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// 1. Load environment variables
dotenv.config();

// --- ADD THIS LINE FOR DEBUGGING ---
console.log("Checking MONGO_URI:", process.env.MONGO_URI);

const app = express();

// 2. Middleware
app.use(express.json()); // Allows the server to understand JSON data
app.use(cors());         // Allows your React app to talk to this server

// 3. Test Route (To check if the server is alive)
app.get('/', (req, res) => {
    res.send("API is running...");
});

// 4. Routes
// We will add app.use('/api/auth', ...) here later

// 5. Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("✅ MongoDB Connected Successfully");
        
        // 6. Start the Server ONLY after DB connects
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(`🚀 Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ MongoDB Connection Error:", err.message);
    });