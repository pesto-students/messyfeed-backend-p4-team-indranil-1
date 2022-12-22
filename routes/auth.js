import express from "express";
import { verifyToken } from "../verifyToken.js";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js";

// POST /auth/signup
router.post("/signup", verifyToken, signup);

// POST /auth/login
router.post("/signin", verifyToken, signin);

// POST /googlelogin

//export default router;
export default router;
