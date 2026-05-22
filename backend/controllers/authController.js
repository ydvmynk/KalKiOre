const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. Register User
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user = new User({ name, email, password: hashedPassword });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// 2. Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid Credentials" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        res.json({ token, user: { id: user._id, name: user.name, email: user.email, profile: user.profile } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// 3. Update Profile (Marks, Stream, etc.)
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: { profile: req.body } },
            { new: true }
        );
        res.json(user.profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

// 4. Get Profile (Calculates Predictions)
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        const p = user.profile;

        // Prediction Logic
        const exams = [
            { name: "JEE Mains", min: 75, stream: "Science" },
            { name: "NEET", min: 50, stream: "Science" },
            { name: "CUET", min: 50, stream: "Arts" },
            { name: "CLAT", min: 45, stream: "Arts" }
        ].filter(ex => p && p.marks12 >= ex.min && ex.stream === p.stream);

        const scholarships = [
            { name: "Inspire Scholarship", merit: 80, income: 600000 },
            { name: "Post-Matric SC/ST", merit: 45, income: 250000 }
        ].filter(sc => p && p.marks12 >= sc.merit && p.familyIncome <= sc.income);

        res.json({ user, eligibleExams: exams, eligibleScholarships: scholarships });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};