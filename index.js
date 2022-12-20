import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8800;
const app = express();

// All Middlewares 
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// DB Connection 
mongoose.set("strictQuery", true);
const connect = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      throw err;
    });
};

// Default Route
app.get("/", (req, res) => {
  res.send(`you are live on ${port}...`);
});


// All Routes 
app.use("/api/auth", authRoutes);


app.listen(port, () => {
  connect();
  console.log("server is live.......");
});