const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const ConsumerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  contactNo: {
    type: Number,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  pincode: {
    type: Number,
    required: true,
  },
  userType: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
  },
  companyType: {
    type: String,
  },
  gstNo: {
    type: String,
  },
  panNo: {
    type: String,
  },
  currentOrders: {
    type: Array,
    default: [],
  },
  pastOrders: {
    type: Array,
    default: [],
  },
});

ConsumerSchema.methods.generateToken = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const Consumer = mongoose.model("Consumer", ConsumerSchema);
module.exports = Consumer;
