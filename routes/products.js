const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { getAllProducts, getProduct } = require("../controllers/products");

router.route("/").get(getAllProducts);
router.route("/:id").get(getProduct);

module.exports = router;
