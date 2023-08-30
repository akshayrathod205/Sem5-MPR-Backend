const mongoose = require("mongoose");

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
});

const Consumer = mongoose.model("Consumer", ConsumerSchema);
module.exports = Consumer;
