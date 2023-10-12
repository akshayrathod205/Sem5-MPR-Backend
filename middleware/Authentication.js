const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(authHeader);
    const token = authHeader.split(" ")[1];
    console.log(token);
    if (token) {
      const payload = jwt.verify(token, process.env.JWT_SECRET);
      req.user = { payload };
      console.log(req.user);
      next();
    } else {
      res.status(403).json({ message: "Access Denied!" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = authenticationMiddleware;
