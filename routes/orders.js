const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const {
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  createOrder,
  cancelOrder,
  addQuotation,
  payOrder,
} = require("../controllers/orders");

router
  .route("/")
  .get(Authentication, getAllOrders)
  .post(Authentication, createOrder);
router.route("/user").get(Authentication, getUserOrders);
router
  .route("/:id")
  .get(Authentication, getSingleOrder)
  .delete(Authentication, cancelOrder);

router.route("/quotation").post(Authentication, addQuotation);
router.route("/pay").post(Authentication, payOrder);

module.exports = router;
