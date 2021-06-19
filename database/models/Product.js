const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

  price: Number,
  newPrice: Number,
  merchant: String,
  url: String,
  asin: String,
  brand: String,
  category: String,
  imageURL: String,
  name: String,
  votes: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
