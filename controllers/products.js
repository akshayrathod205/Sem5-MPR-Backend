const Consumer = require("../models/Consumer");
const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const consumerId = req.user.payload.userId;
    const consumer = await Consumer.findById(consumerId);
    console.log(consumer);
    const products = await Product.find({});
    res.status(200).json({ products: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json({ product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllProducts };
