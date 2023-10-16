const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { getAllProducts, getProduct } = require("../controllers/dashboard");

router.route("/").get(Authentication, getAllProducts);
router.route("/:id").get(Authentication, getProduct);

module.exports = router;
