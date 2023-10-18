const Cart = require("../models/Cart");
const Product = require("../models/Product");
const User = require("../models/Consumer");

const getCart = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const cart = await Cart.findOne({ userId: loggedInUserId });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const { productId, quantity } = req.body;

    const cart = await Cart.findOne({ userId: loggedInUserId });
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!cart) {
      const newCart = await Cart.create({
        userId: loggedInUserId,
        products: [{ productId, quantity }],
      });
      return res.status(201).json({ cart: newCart });
    }

    const productInCart = cart.products.find(
      (product) => product.productId.toString() === productId
    );

    if (productInCart) {
      productInCart.quantity = quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: loggedInUserId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    cart.products = cart.products.filter(
      (product) => product.productId.toString() !== productId
    );
    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getCart, addToCart, deleteFromCart };
