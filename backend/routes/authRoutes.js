const express = require('express');
const router = express.Router();
const { register, login, updateProfile, getProfile } = require('../controllers/authController');
const auth = require('../middleware/auth');

// @route   POST api/auth/register
router.post('/register', register);

// @route   POST api/auth/login
router.post('/login', login);

// @route   PUT api/auth/profile
// Needs 'auth' middleware to identify WHICH user is updating
router.put('/profile', auth, updateProfile);

// @route   GET api/auth/me
router.get('/me', auth, getProfile);

module.exports = router;