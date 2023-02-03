import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
const port = process.env.PORT || 8800;
const app = express();

dotenv.config();
app.use(express.json());

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

app.get("/", (req, res) => {
  res.send(`you are live on ${port}...`);
});

app.listen(port, () => {
  connect();
  console.log("server is live.......");
});