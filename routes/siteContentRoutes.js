const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Get site content by section
router.get('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('section', section)
      .single();

    console.log('Fetched content:', data);

    if (error) throw error;
    if (!data) {
      console.error('Content not found for section:', section);
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
