import express from "express";
const router = express.Router();
import {
  signup,
  signin,
  changePassword,
  signout,
} from "../controllers/auth.js";
import { verifyToken } from "../verifyToken.js";
import { body } from "express-validator";

// POST /auth/signup
router.post(
  "/signup",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  body("phoneNo").isLength({ min: 10 }),
  signup
);

// POST /auth/login
router.post(
  "/signin",
  body("email").isEmail(),
  body("password").isLength({ min: 4 }),
  signin
);

// POST /googlelogin

//Change Password
router.put("/changePassword", verifyToken, changePassword);

// GET /auth/signout
router.get("/signout", verifyToken, signout);

//export default router;
export default router;
