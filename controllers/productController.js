const { supabase } = require('../config/supabase');

// Get all products
const getProducts = async (req, res) => {
  console.log('GET /products called');
  try {
    console.log('Querying Supabase for all products...');
    
    const { data, error } = await supabase
      .from('products')
      .select('id, name, description, price, image, category')
      .order('id', { ascending: true });

    console.log('Supabase returned:', { data, error });
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error in getProducts:', error);
    res.status(500).json({ error: error.message });
  }
};

// Get products by category
const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    if (category.toLowerCase() === 'all') {
      return getProducts(req, res);
    }

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category);
    console.log(data);    
    console.log(error);

    if (error) throw error;

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error fetching products for category ${req.params.category}:`, error);
    res.status(500).json({ message: error.message });
  }
};

// Get a single product
const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    console.log(data);
    console.log(error);   
    if (error) throw error;
    if (!data) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create a product
const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    const { data, error } = await supabase
      .from('products')
      .insert([{ name, description, price, image, category }])
      .select();
    console.log(data);
    console.log(error);
    if (error) throw error;

    res.status(201).json(data[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, category } = req.body;

    const { data, error } = await supabase
      .from('products')
      .update({ name, description, price, image, category })
      .eq('id', id)
      .select();
    console.log(data);
    console.log(error);
    if (error) throw error;
    if (!data.length) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(data[0]);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: error.message });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);
    console.log(error);

    if (error) throw error;

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductsByCategory,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
};
