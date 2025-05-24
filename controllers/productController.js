const supabase = require('../config/supabase');

// Get all products
const getProducts = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, image, category')
      .order('id', { ascending: true });
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, image, category')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!data) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, image, category')
      .eq('category', category)
      .order('id', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;
    const { data, error } = await supabase
      .from('products')
      .insert([{ name, description, price, image, category }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;
    const { data, error } = await supabase
      .from('products')
      .update({ name, description, price, image, category })
      .eq('id', id)
      .select();

    if (error) throw error;
    if (!data.length) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getProducts,
  getProduct,
  getProductsByCategory,
  createProduct,
  updateProduct,
  deleteProduct
};
