const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { getAllProducts, getProduct } = require("../controllers/products");

router.route("/").get(Authentication, getAllProducts);
router.route("/:id").get(Authentication, getProduct);

module.exports = router;
