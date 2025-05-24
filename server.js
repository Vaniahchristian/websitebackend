const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoutes = require('./routes/productRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const siteContentRoutes = require('./routes/siteContentRoutes');
const settingRoutes = require('./routes/settingRoutes');

app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/site-content', siteContentRoutes);
app.use('/api/settings', settingRoutes);

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to FreshShine Cleaning API' });
});

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
