const { supabase } = require('../config/supabase');

// Get all requests
const getRequests = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .select('id, name, phone, servicetype, description, location, paymentmethod, status, date')
      .order('id', { ascending: false });
    console.log(data);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get requests by status
const getRequestsByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    const { data, error } = await supabase
      .from('requests')
      .select('id, name, phone, servicetype, description, location, paymentmethod, status, date')
      .eq('status', status)
      .order('id', { ascending: false });
    console.log(data);

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Get single request
const getRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('requests')
      .select('id, name, phone, servicetype, description, location, paymentmethod, status, date')
      .eq('id', id)
      .single();
    console.log(data);
    console.log(error);
    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Create request
const createRequest = async (req, res) => {
  try {
    const { name, phone, servicetype, description, location, paymentmethod } = req.body;
    const newRequest = {
      name,
      phone,
      servicetype,
      description,
      location,
      paymentmethod,
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    const { data, error } = await supabase
      .from('requests')
      .insert([newRequest])
      .select();
    console.log(data);
    console.log(error);
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// Update request status
const updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .from('requests')
      .update({ status })
      .eq('id', id)
      .select();
    console.log(data);
    console.log(error); 
    if (error) throw error;
    if (!data.length) {
      return res.status(404).json({ message: 'Request not found' });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete request
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('requests')
      .delete()
      .eq('id', id);
    console.log(error);
    if (error) throw error;
    res.json({ message: 'Request deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getRequests,
  getRequestsByStatus,
  getRequest,
  createRequest,
  updateRequestStatus,
  deleteRequest
};
