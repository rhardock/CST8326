const mongoose = require('mongoose');

// Define the Product schema for the e-commerce application
const productSchema = new mongoose.Schema({
  storeId: {
    type: String,
    required: true,
    trim: true
  },
  storeName: {
    type: String,
    required: true,
    trim: true
  },
  productId: {
    type: String,
    required: true,
    trim: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0 // Prevents accidental negative pricing
  }
}, {
  timestamps: true // Automatically manages createdAt and updatedAt fields
});

// This tells MongoDB that the combination of storeId AND productId must be unique
productSchema.index({ storeId: 1, productId: 1 }, { unique: true });

// Export the Product model
// Mongoose will automatically look for a collection named 'products' in MongoDB Atlas
module.exports = mongoose.model('Product', productSchema);
