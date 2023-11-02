const express = require("express");
const router = express.Router();
const {
  consumerSignup,
  consumerLogin,
  adminSignup,
  adminLogin,
} = require("../controllers/auth");

router.route("/consumer/signup").post(consumerSignup);
router.route("/consumer/login").post(consumerLogin);
router.route("/admin/signup").post(adminSignup);
router.route("/admin/login").post(adminLogin);

module.exports = router;
