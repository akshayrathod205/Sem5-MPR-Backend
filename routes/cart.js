const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { getCart, addToCart, deleteFromCart } = require("../controllers/cart");

router.route("/").get(Authentication, getCart).post(Authentication, addToCart);
router.route("/:id").delete(Authentication, deleteFromCart);

module.exports = router;
