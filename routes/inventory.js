const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/inventory");

router.route("/").post(Authentication, createProduct);
router.route("/:id").put(Authentication, updateProduct);
router.route("/:id").delete(Authentication, deleteProduct);

module.exports = router;
