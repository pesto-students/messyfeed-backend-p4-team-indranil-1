import express from "express";
import {
  deleteReview,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Update User
router.put("/:id", verifyToken, updateUser);

//Delete User
router.delete("/:id", verifyToken, deleteUser);

//get an User
router.get("/:id", verifyToken, getUser);

//Delete the review
router.delete("/review/:id", verifyToken, deleteReview);

export default router;
