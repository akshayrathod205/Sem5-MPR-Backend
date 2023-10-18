const express = require("express");
const router = express.Router();
const Authentication = require("../middlewares/authentication");
const {
  getAllOrders,
  getSingleOrder,
  getUserOrders,
  createOrder,
  cancelOrder,
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

module.exports = router;
