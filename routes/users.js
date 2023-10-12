const express = require("express");
const router = express.Router();
const Authentication = require("../middleware/Authentication");
const { getUser, updateUser } = require("../controllers/users");

router.route("/").get(Authentication, getUser).put(Authentication, updateUser);

module.exports = router;
