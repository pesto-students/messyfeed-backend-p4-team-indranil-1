import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import messRoutes from "./routes/mess.js";
import customerRoutes from "./routes/customers.js";
import homeRoutes from "./routes/home.js";
import userRoutes from "./routes/users.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 8800;
const app = express();

// All Middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    parameterLimit: 100000,
    extended: true,
  })
);
app.use(
  bodyParser.json({
    limit: "200mb",
  })
);

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
  res.send(`you are live on Messyfeed...`);
});

// All Routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/user", userRoutes);
app.use("/api/user/mess", messRoutes);
app.use("/api/user/mess/customer", customerRoutes);

app.listen(port, () => {
  connect();
  console.log(`server is live on`);
});
