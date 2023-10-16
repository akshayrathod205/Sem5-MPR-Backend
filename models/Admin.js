const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const AdminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
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

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;
