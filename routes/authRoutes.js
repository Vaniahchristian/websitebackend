const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { supabase } = require('../config/supabase');
const authMiddleware = require('../middleware/auth');

// Login with Supabase Auth
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
    // Use Supabase Auth to sign in
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log(data);
    console.log(error);
    if (error || !data.session || !data.user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
    res.json({
      user: {
        id: data.user.id,
        email: data.user.email
      },
      token: data.session.access_token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get current user from Supabase Auth
router.get('/me', authMiddleware, async (req, res) => {
  try {
    // req.user is set by authMiddleware using Supabase Auth
    res.json({
      id: req.user.id,
      email: req.user.email
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout (just for consistency, actual token invalidation should be handled on client)
router.post('/logout', authMiddleware, (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
