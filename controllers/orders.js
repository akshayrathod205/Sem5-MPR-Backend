const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/Consumer");
const Cart = require("../models/Cart");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isPaid: false });
    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSingleOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserOrders = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const order = await Order.findOne({
      userId: loggedInUserId,
      isPaid: false,
      quotation: { $exists: true },
    });
    res.status(200).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const cart = await Cart.findOne({ userId: loggedInUserId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    const cartProducts = cart.products;
    const orderItems = [];
    for (let i = 0; i < cartProducts.length; i++) {
      const product = await Product.findById(cartProducts[i].productId);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      orderItems.push({
        name: product.name,
        type: product.type,
        size: product.size,
        batch: product.batch,
        material: product.material,
        productImage: product.productImage,
        quantity: 1,
      });
    }

    const order = await Order.create({
      userId: loggedInUserId,
      orderItems,
    });
    await cart.deleteOne();
    res.status(201).json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const createOrder = async (req, res) => {
//   try {
//     const loggedInUserId = req.user.payload.userId;
//     console.log(loggedInUserId);

//     const cart = await Cart.findOne({ userId: loggedInUserId });

//     if (!cart) {
//       return res.status(404).json({ error: "Cart not found" });
//     }

//     let orderItems = [];
//     const cartProducts = cart.products;
//     cartProducts.forEach(async (product) => {
//       const productFull = await Product.findById(product.productId);
//       orderItems.push({
//         name: productFull.name,
//         type: productFull.type,
//         size: productFull.size,
//         batch: productFull.batch,
//         material: productFull.material,
//         productImage: productFull.productImage,
//         quantity: 1,
//       });
//     });

//     const order = await Order.create({
//       userId: loggedInUserId,
//       orderItems,
//     });

//     await cart.deleteOne();

//     res.status(201).json({ order });
//   } catch (error) {
//     console.error("Error in createOrder:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

const cancelOrder = async (req, res) => {
  try {
    const loggedInUserId = req.user.payload.userId;
    const { orderId } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (order.userId.toString() !== loggedInUserId) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    await order.remove();
    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addQuotation = async (req, res) => {
  try {
    const { orderId, quotation } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.quotation = quotation;
    await order.save();
    res.status(200).json({ message: "Quotation added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const payOrder = async (req, res) => {
  try {
    const { orderId, paymentMethod } = req.body;
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    order.paymentMethod = paymentMethod;
    order.isPaid = true;
    await order.save();
    res.status(200).json({ message: "Payment successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  createOrder,
  cancelOrder,
  addQuotation,
  payOrder,
};
