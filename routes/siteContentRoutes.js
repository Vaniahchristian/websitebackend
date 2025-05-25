const express = require('express');
const router = express.Router();
const { supabase } = require('../config/supabase');

// Get all site content
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('section, content');

    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Combine all sections into a single object
    const combinedContent = data.reduce((acc, item) => {
      if (item.section === 'hero') acc.hero = item.content;
      if (item.section === 'about') acc.about = item.content;
      if (item.section === 'howItWorks') acc.howItWorks = item.content;
      if (item.section === 'footer') acc.footer = item.content;
      return acc;
    }, {
      hero: { title: '', subtitle: '' },
      about: { title: '', content: '' },
      howItWorks: { title: '', subtitle: '', steps: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] },
      footer: {
        businessHours: { weekdays: '', saturday: '', sunday: '' },
        contact: { address: '', phone: '', email: '' }
      }
    });

    res.json(combinedContent);
  } catch (error) {
    console.error('Error fetching site content:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update site content section
router.patch('/:section', async (req, res) => {
  try {
    const { section } = req.params;
    const content = req.body;

    // First try to update
    let { data, error } = await supabase
      .from('site_content')
      .update({ content })
      .eq('section', section)
      .select();

    // If no rows were updated, insert new row
    if (error || !data || data.length === 0) {
      const { data: insertData, error: insertError } = await supabase
        .from('site_content')
        .insert([{ section, content }])
        .select();

      if (insertError) throw insertError;
      data = insertData;
    }

    // Fetch all content after update
    const { data: allData, error: fetchError } = await supabase
      .from('site_content')
      .select('section, content');

    if (fetchError) throw fetchError;

    // Combine all sections into a single object
    const combinedContent = allData.reduce((acc, item) => {
      if (item.section === 'hero') acc.hero = item.content;
      if (item.section === 'about') acc.about = item.content;
      if (item.section === 'howItWorks') acc.howItWorks = item.content;
      if (item.section === 'footer') acc.footer = item.content;
      return acc;
    }, {
      hero: { title: '', subtitle: '' },
      about: { title: '', content: '' },
      howItWorks: { title: '', subtitle: '', steps: [{ title: '', description: '' }, { title: '', description: '' }, { title: '', description: '' }] },
      footer: {
        businessHours: { weekdays: '', saturday: '', sunday: '' },
        contact: { address: '', phone: '', email: '' }
      }
    });

    res.json(combinedContent);
  } catch (error) {
    console.error('Error updating site content:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
