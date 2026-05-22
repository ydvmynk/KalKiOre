const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profile: {
    marks10: Number,
    marks12: Number,
    stream: String,      // Science, Commerce, Arts
    category: String,    // General, OBC, SC, ST, EWS
    state: String,
    familyIncome: Number,
    interests: [String], // Coding, Medical, etc.
    targetGoal: String   // Engineering, Govt Job, etc.
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);