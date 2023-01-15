import express from "express";
import {
  addCustomer,
  allCustomers,
  deleteCustomer,
  getCustomer,
  updateCustomer,
  sendOtp,
  validateOtp,
} from "../controllers/customer.js";

import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//Send OTP to customer
router.put("/sendOtp", verifyToken, sendOtp);

//Validate OTP
router.put("/validateOtp", verifyToken, validateOtp);

//Create new customer
router.post("/", verifyToken, addCustomer);

//Update customer
router.put("/:id", verifyToken, updateCustomer);

//Delete customer
router.delete("/:id", verifyToken, deleteCustomer);

//View all customers
router.get("/all", verifyToken, allCustomers);

//Get a customer
router.get("/:id", verifyToken, getCustomer);

export default router;
