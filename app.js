import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db/connect.js  ";
dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

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
