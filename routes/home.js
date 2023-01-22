import express from "express";
import {
  addReview,
  getReviews,
  search,
  isReviewed,
} from "../controllers/home.js";
import { body } from "express-validator";

const router = express.Router();

//Search for messes in the area
router.get("/search", search);

//Give a review for the mess
router.post(
  "/review",
  body("email").isEmail(),
  body("review").isLength({ min: 10 }),
  addReview
);

// this api for checking if the custmer is give review to mess allready
router.post("/isReviewed", isReviewed);

//Get all reviews
router.get("/reviews/:id", getReviews);

export default router;
