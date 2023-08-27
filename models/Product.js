const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  material: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
  },
  dimensionImage: {
    type: String,
  },
  quantity: {
    type: [],
    required: true,
  },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
