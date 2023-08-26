const express = require("express");
const router = express.Router();
const { login } = require("../controllers/auth");

router.route("consumer/signup").post(consumerSignup);
router.route("consumer/login").post(consumerLogin);
router.route("admin/login").post(adminLogin);

module.exports = router;