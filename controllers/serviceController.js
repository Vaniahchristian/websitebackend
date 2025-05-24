const { supabase } = require('../config/supabase');

// Get all services
const getServices = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('id, name, description, image')
      .order('id', { ascending: true });

    if (error) throw error;
    console.log("DB RESULT:", data, "ERROR:", error);
    res.json(data);
  } catch (error) {
    console.log("DB RESULT:", data, "ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get single service
const getService = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('services')
      .select('id, name, description, image')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create service
const createService = async (req, res) => {
  try {
    const { name, description, image } = req.body;
    const { data, error } = await supabase
      .from('services')
      .insert([{ name, description, image }])
      .select();

    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update service
const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, image } = req.body;
    const { data, error } = await supabase
      .from('services')
      .update({ name, description, image })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data.length) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getServices,
  getService,
  createService,
  updateService,
  deleteService
};
