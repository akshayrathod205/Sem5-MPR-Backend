const Consumer = require("../models/Consumer");
const Product = require("../models/Product");

const dashboardConsumer = async (req, res) => {
  try {
    const consumerId = req.user.payload.userId;
    const consumer = await Consumer.findById(consumerId);
    console.log(consumer);
    const products = await Product.find({ consumer: consumerId });
    const name = consumer.firstName;
    res.status(200).json({ name: name, products: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { dashboardConsumer };
