import express from "express";

const router = express.Router();

//Update mess details
router.put("/mess/:id");

//Create new customer
router.post("/mess/:id/customer");

//Update customer
router.put("/mess/:id/customer/:custId");

//Delete customer
router.delete("/mess/:id/customer/:custId");

//View all customers
router.get("/mess/:id/customers");

//Get a customer
router.get("/mess/:id/customer/:custId");

//Plan subscription
router.post("/mess/:id/subscribe");

//Add new mess plan
router.post("/mess/:id/plan");

//Update a mess plan
router.put("/mess/:id/plan/:planId");

//Delete a mess plan
router.delete("/mess/:id/plan/:planId");

//View all mess plans
router.get("/mess/:id/plans");

//Send OTP to customer
router.post("/mess/:id/sendOtp");

//Validate OTP
router.post("/mess/:id/validateOtp");

export default router;
