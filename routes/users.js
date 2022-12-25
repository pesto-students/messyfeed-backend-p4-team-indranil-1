import express from "express";
import { addMess } from "../controllers/user.js";
import {} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Register mess
router.post("/", verifyToken, addMess);

export default router;
