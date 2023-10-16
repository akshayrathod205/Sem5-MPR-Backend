const express = require("express");
const cors = require("cors");
const connectDB = require("./db/connect");
const authRouter = require("./routes/auth");
const productsRouter = require("./routes/products");
const contactRouter = require("./routes/contact");
const userRouter = require("./routes/users");
const cartRouter = require("./routes/cart");
const inventoryRouter = require("./routes/inventory");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/inventory", inventoryRouter);

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
