import express from "express";
import {} from "../controllers/auth.js";
import {
  deleteReview,
  deleteUser,
  getUser,
  updateUser,
  changePassword,
} from "../controllers/user.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//get an User
router.get("/", verifyToken, getUser);

//Update User
router.put("/", verifyToken, updateUser);

//Change Password
router.put("/changePassword", verifyToken, changePassword);

//Delete User
router.delete("/", verifyToken, deleteUser);

//Delete the review
router.delete("/review/:id", verifyToken, deleteReview);

export default router;
