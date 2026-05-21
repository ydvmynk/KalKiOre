const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // Profile data (optional at signup, filled later)
  profile: {
    class: String,
    stream: String,
    marks: Number,
    category: String,
    state: String,
    income: Number,
    interests: [String]
  },
  savedScholarships: [String]
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);