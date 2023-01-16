import express from "express";
import { addReview, getReviews, search } from "../controllers/home.js";
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

//Get all reviews
router.get("/reviews/:id", getReviews);

export default router;
