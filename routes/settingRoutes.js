const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Update user email
router.patch('/profile', async (req, res) => {
  try {
    const { email } = req.body;
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
    // Update email using Supabase Auth
    const { data, error } = await supabase.auth.updateUser(
      { email },
      { accessToken: token }
    );
    if (error) throw error;
    res.json({ message: 'Email updated successfully', data });
  } catch (error) {
    console.error('Error updating email:', error);
    res.status(500).json({ error: error.message });
  }
});


// Change password
router.patch('/password', async (req, res) => {
  try {
    const { newPassword } = req.body;
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'No token, authorization denied' });
    }
    // Update password using Supabase Auth
    const { data, error } = await supabase.auth.updateUser(
      { password: newPassword },
      { accessToken: token }
    );
    if (error) throw error;
    res.json({ message: 'Password updated successfully', data });
  } catch (error) {
    console.error('Error changing password:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
