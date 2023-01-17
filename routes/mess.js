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
} from "../controllers/mess.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

// View all mess plans
router.get("/plans", verifyToken, getPlans);

//Register mess
router.post("/", verifyToken, addMess);

//Update mess
router.put("/", verifyToken, updateMess);

//Delete mess
router.delete("/", verifyToken, deleteMess);

//View mess
router.get("/", verifyToken, getMess);

//Add new mess plan
router.post("/plan", verifyToken, addPlan);

//Update a mess plan
router.put("/plan/:id", verifyToken, updatePlan);

//Delete a mess plan
router.delete("/plan/:id", verifyToken, deletePlan);

//View all mess plans
// router.get("/plans", verifyToken, getPlans);

export default router;
