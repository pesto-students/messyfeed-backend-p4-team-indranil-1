import express from "express";
const router = express.Router();
import { signup, signin } from "../controllers/auth.js";

// POST /auth/signup
router.post("/signup", signup);

// POST /auth/login
router.post("/signin", signin);

// POST /googlelogin

//export default router;
export default router;
