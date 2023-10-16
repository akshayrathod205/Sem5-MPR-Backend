const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { dashboardConsumer } = require("../controllers/dashboard");

router.route("/consumer").get(Authentication, dashboardConsumer);

module.exports = router;
