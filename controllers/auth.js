const Consumer = require("../models/Consumer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const consumerSignup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      contactNo,
      address,
      city,
      pincode,
      userType,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await Consumer.findOne({ email: email });
    if (!existingUser) {
      const user =
        userType === "individual"
          ? await Consumer.create({
              firstName,
              lastName,
              email,
              password: hashedPassword,
              contactNo,
              address,
              city,
              pincode,
              userType,
            })
          : await Consumer.create({
              firstName,
              lastName,
              email,
              password: hashedPassword,
              contactNo,
              address,
              city,
              pincode,
              userType,
              companyName,
              companyType,
              gstNo,
              panNo,
            });

      res
        .status(200)
        .json({ message: "User created successfully", user: user });
    } else {
      res.status(409).json({ message: "User already exists" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const consumerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const loggedInUser = await Consumer.findOne({ email: email });
    if (loggedInUser) {
      const isMatch = await bcrypt.compare(password, loggedInUser.password);
      if (isMatch) {
        const token = loggedInUser.generateToken();
        res.status(200).json({
          message: "Login successful",
          token: token,
          user: loggedInUser,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const loggedInUser = await Admin.findOne({ username: username });
    if (loggedInUser) {
      const isMatch = await bcrypt.compare(password, loggedInUser.password);
      if (isMatch) {
        const token = loggedInUser.generateToken();
        res.status(200).json({
          message: "Login successful",
          token: token,
          user: loggedInUser,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { consumerSignup, consumerLogin, adminLogin };
