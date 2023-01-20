import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js";
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

//export default router;
export default router;
