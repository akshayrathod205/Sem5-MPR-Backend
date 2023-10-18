const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/inventory");

router.route("/admin/").post(Authentication, createProduct);
router.route("/admin/:id").put(Authentication, updateProduct);
router.route("/admin/:id").delete(Authentication, deleteProduct);

module.exports = router;
