const supabase = require('../config/supabase');

// Get all settings
const getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('settings')
      .select('*');

    if (error) throw error;
    
    // Convert array to object with key-value pairs
    const settingsObject = data.reduce((acc, setting) => {
      acc[setting.key] = setting.value;
      return acc;
    }, {});

    res.json(settingsObject);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single setting
const getSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.json({ key: data.key, value: data.value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update setting
const updateSetting = async (req, res) => {
  try {
    const { key } = req.params;
    const { value } = req.body;

    const { data, error } = await supabase
      .from('settings')
      .update({ value, updated_at: new Date().toISOString() })
      .eq('key', key)
      .select();

    if (error) throw error;
    if (!data.length) {
      return res.status(404).json({ message: 'Setting not found' });
    }

    res.json({ key: data[0].key, value: data[0].value });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Bulk update settings
const updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    const updatePromises = Object.entries(settings).map(([key, value]) => {
      return supabase
        .from('settings')
        .update({ value, updated_at: new Date().toISOString() })
        .eq('key', key)
        .select();
    });

    const results = await Promise.all(updatePromises);
    const errors = results.filter(result => result.error);

    if (errors.length > 0) {
      throw new Error('Some settings failed to update');
    }

    res.json({ message: 'Settings updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getSettings,
  getSetting,
  updateSetting,
  updateSettings
};
