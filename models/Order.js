const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  orderItems: [
    {
      name: { type: String, required: true },
      type: { type: String, required: true },
      size: { type: String, required: true },
      batch: { type: String, required: true },
      material: { type: String, required: true },
      productImage: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  paymentMethod: {
    type: String,
  },
  quotation: {
    type: Number,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
}, { timestamps: true });

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
