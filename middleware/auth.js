const { supabase } = require('../config/supabase');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.header('Authorization');
    const token = authHeader?.replace('Bearer ', '');
    if (!token) {
      console.log('No token found');
      return res.status(401).json({ error: 'No token, authorization denied' });
    }

    // Verify token and get user from Supabase Auth
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data?.user) {
      console.log('Token is invalid or user not found');
      return res.status(401).json({ error: 'Token is invalid or user not found' });
    }

    // Attach user info to request
    req.user = {
      id: data.user.id,
      email: data.user.email
    };
    next();
  } catch (error) {
    console.log('Token is invalid');
    res.status(401).json({ error: 'Token is invalid' });
  }
};

module.exports = authMiddleware;
