const express = require("express");
const router = express.Router();
const Authenication = require("../middleware/auth");
const { dashboardConsumer } = require("../controllers/dashboard");

router.route("/consumer").get(Authenication, dashboardConsumer);

module.exports = router;
