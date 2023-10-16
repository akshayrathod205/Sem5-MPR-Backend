const Product = require("./models/product");
const Consumer = require("./models/consumer");

const createProduct = async (req, res) => {
  try {
    const {
      name,
      type,
      size,
      batch,
      material,
      productImage,
      dimensionImage,
      quantity,
    } = req.body;
    const product = await Product.create({
      name,
      type,
      size,
      batch,
      material,
      productImage,
      dimensionImage,
      quantity,
    });
    res.status(201).json({ product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const {
      name,
      type,
      size,
      batch,
      material,
      productImage,
      dimensionImage,
      quantity,
    } = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        type,
        size,
        batch,
        material,
        productImage,
        dimensionImage,
        quantity,
      },
      { new: true }
    );
    res.status(200).json({ product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByIdAndDelete(productId);
    res.status(200).json({ product: product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};
