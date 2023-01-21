import express from "express";
import {
  addMess,
  addPlan,
  deleteMess,
  deletePlan,
  getMess,
  getPlans,
  updateMess,
  updatePlan,
  getMessPlans,
  getMessWithToken,
  getReviewsWithToken,
} from "../controllers/mess.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// View all mess plans
router.get("/plans", verifyToken, getPlans);

// all plans for for all users
router.get("/plans/:id", getMessPlans);

//Get reviews
router.get("/reviews", verifyToken, getReviewsWithToken);

//View mess
router.get("/", verifyToken, getMessWithToken);

router.get("/:id", getMess);

//Register mess
router.post("/", verifyToken, addMess);

//Add new mess plan
router.post("/plan", verifyToken, addPlan);

//Update mess
router.put("/", verifyToken, updateMess);

//Update a mess plan
router.put("/plan/:id", verifyToken, updatePlan);

//Delete mess
router.delete("/", verifyToken, deleteMess);

//Delete a mess plan
router.delete("/plan/:id", verifyToken, deletePlan);

export default router;
