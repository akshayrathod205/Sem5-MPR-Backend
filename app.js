const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const dashboardRouter = require("./routes/dashboard");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("api/v1/auth", authRouter);
app.use("api/v1/dashboard", dashboardRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
