const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/auth");
const { dashboardConsumer } = require("../controllers/dashboard");

router.route("/consumer").get(Authentication, dashboardConsumer);

module.exports = router;
