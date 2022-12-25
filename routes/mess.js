import express from "express";
import {
  addCustomer,
  addPlan,
  allCustomers,
  deleteCustomer,
  deletePlan,
  getCustomer,
  getPlans,
  sendOtp,
  updateCustomer,
  updateMess,
  updatePlan,
  validateOtp,
} from "../controllers/mess.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Update mess details
router.put("/:id", verifyToken, updateMess);

//Create new customer
router.post("/customer", verifyToken, addCustomer);

//Update customer
router.put("/customer/:custId", verifyToken, updateCustomer);

//Delete customer
router.delete("/customer/:custId", verifyToken, deleteCustomer);

//View all customers
router.get("/customers", verifyToken, allCustomers);

//Get a customer
router.get("/customer/:custId", verifyToken, getCustomer);

//Add new mess plan
router.post("/plan", verifyToken, addPlan);

//Update a mess plan
router.put("/plan/:planId", verifyToken, updatePlan);

//Delete a mess plan
router.delete("/plan/:planId", verifyToken, deletePlan);

//View all mess plans
router.get("/plans", verifyToken, getPlans);

//Send OTP to customer
router.post("/sendOtp", verifyToken, sendOtp);

//Validate OTP
router.post("/validateOtp", verifyToken, validateOtp);

export default router;
