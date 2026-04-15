const express = require('express');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config();
const TEAMMATE_URL = process.env.TEAMMATE_API_URL;

const db = require('../models/db')
const Product = require('../models/product');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use(express.static('public'));

// Root test route
app.get('/', (req, res) => res.send('API running'));

// --- PRODUCT ROUTES ---
// CREATE - Add a new product
app.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// READ all - Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read the teammate's products
app.get('/teammate-products', async (req, res) => {
  try {
    // Use the variable here
    const response = await axios.get(TEAMMATE_URL);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching teammate data:", error.message);
    res.status(500).json({ error: "Teammate's store is offline" });
  }
});

// Get all products across both mine and teammate's store
app.get('/all-products', async (req, res) => {
  try {
    // 1. Fetch your data from your MongoDB
    const myProducts = await Product.find();

    // 2. Fetch teammate's data with its own error handling
    try {
      const response = await axios.get(TEAMMATE_URL, { timeout: 5000 }); // 5-second timeout
      teammateProducts = response.data;
    } catch (teamErr) {
      console.error("Teammate store offline or timed out:", teamErr.message);
      // We don't throw an error here; teammateProducts remains an empty array []
    }

    // 3. Combine the two arrays
    const combined = [...myProducts, ...teammateProducts];

    // 4. Send the consolidated JSON
    res.json(combined);

  } catch (err) {
    console.error("Aggregation Error:", err.message);
    res.status(500).json({ error: "Failed to consolidate store data" });
  }
});

// READ one - Get a specific product by its MongoDB _id
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// UPDATE - Modify an existing product
app.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// DELETE - Remove a product
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;

// some error checking which verifies if the PORT has successfully been opened
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use or reserved by Windows.`);
    console.error(`Try running: net stop winnat (as Admin) or change the port.`);
    process.exit(1);
  } else {
    console.error('Server error:', err);
    process.exit(1);
  }
});
